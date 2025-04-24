require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const ejs = require("ejs")
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId, AuthMechanism } = require('mongodb');
const path = require('path');
const cookieParser = require('cookie-parser');

// Membuat koneksi ke MongoDB menggunakan URI yang terdapat di variabel lingkungan
const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'backendProject'; // Nama database yang akan digunakan

// Membuat instance aplikasi Express
const app = express();

// Menentukan port yang akan digunakan untuk menjalankan aplikasi
const PORT = process.env.PORT || 3000;

// Menggunakan middleware untuk menangani CORS
app.use(cors());

// Menggunakan middleware untuk mengparse cookies
app.use(cookieParser());

// Middleware untuk parsing request body dengan format JSON
app.use(express.json());

// Menyajikan file audio statis dari folder 'public/audio'
app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

// Fungsi untuk menjalankan koneksi ke database MongoDB
async function run() {
  try {
    // Menghubungkan ke MongoDB
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');

    // Mengakses database yang digunakan
    const db = client.db(dbName);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

// Memulai koneksi ke MongoDB saat aplikasi dijalankan
run();

// Menyeting EJS sebagai engine untuk rendering views
app.set('view engine', 'ejs');

// Menentukan lokasi folder views yang berisi file EJS
app.set('views', path.join(__dirname, 'views'));

// Menyajikan file statis dari folder 'public'
app.use(express.static('public'));

// Fungsi untuk merender halaman dengan layout tertentu
const renderWithLayout = (res, view, options = {}) => {
  ejs.renderFile(
    path.join(__dirname, 'views', `${view}.ejs`),
    options,
    (err, str) => {
      if (err) return res.status(500).send(err.message);
      res.render('layout', { ...options, body: str });
    }
  );
};

// Route untuk halaman Sign In
app.get('/signin', (req, res) => {
  res.render('signin_page', { title: 'Sign In' });
});

// Route untuk halaman Sign Up
app.get('/signup', (req, res) => {
  res.render('signup_page', { title: 'Sign Up' });
});

// Route untuk halaman depan atau front page
app.get('/frontpage', (req, res) => {
  res.render('frontpage', { title: 'Front Page' });
});

// Middleware untuk autentikasi
const authMiddleware = (req, res, next) => {
  // Mengambil token dari cookies
  const token = req.cookies?.token;

  // Jika token tidak ada, arahkan ke halaman frontpage
  if (!token) {
    console.warn("No token found in cookies");
    return res.redirect("/frontpage");
  }

  try {
    // Memverifikasi token menggunakan secret yang ada di .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    // Jika token tidak valid atau kadaluwarsa, arahkan ke halaman frontpage
    console.warn("Invalid or expired token");
    return res.redirect("/frontpage");
  }
};

// Route untuk halaman 'userplaylist' yang membutuhkan autentikasi
app.get('/userplaylist', authMiddleware, (req, res) => {
  renderWithLayout(res, "userplaylist", {
    title: "Playlist"
  });
});

// Route untuk halaman 'searchresult' yang menampilkan hasil pencarian berdasarkan query
app.get('/searchresult', authMiddleware, async (req, res) => {
  const query = req.query.q || '';

  renderWithLayout(res, 'searchresult', {
    title: 'Search',
    query
  });
});

// Route untuk halaman utama atau 'home' yang membutuhkan autentikasi
app.get('/', authMiddleware, (req, res) => {
  // Render halaman 'home' dengan data title yang sesuai
  renderWithLayout(res, 'home', { title: 'Home' });
});

// Variabel untuk menyimpan token akses Spotify dan waktu kadaluarsanya
let spotifyAccessToken = null;
let tokenExpiresAt = 0; // UNIX timestamp

// Fungsi untuk mendapatkan token akses Spotify yang valid
const getSpotifyAccessToken = async () => {
  const now = Date.now();

  // Jika token masih berlaku (belum kadaluarsa), kembalikan token yang ada
  if (spotifyAccessToken && now < tokenExpiresAt) {
    return spotifyAccessToken;
  }

  // Jika token sudah kadaluarsa, dapatkan token baru
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      grant_type: 'client_credentials',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
    },
  });

  // Simpan token akses dan waktu kadaluarsa (dengan buffer 1 menit)
  spotifyAccessToken = response.data.access_token;
  tokenExpiresAt = now + (response.data.expires_in * 1000) - 60000;

  return spotifyAccessToken;
};

// Endpoint untuk melakukan pencarian lagu di Spotify berdasarkan query 'q'
app.get('/search', async (req, res) => {
  const { q } = req.query; // Mendapatkan query pencarian dari URL
  if (!q) {
    // Jika parameter 'q' tidak ada, kembalikan error
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Mendapatkan token akses Spotify
    const accessToken = await getSpotifyAccessToken();
    
    // Melakukan pencarian di API Spotify
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q,
        type: 'track',
        limit: 10,
      },
    });

    // Menyusun data lagu-lagu yang ditemukan dan mengembalikannya dalam format yang diinginkan
    const tracks = response.data.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      audio: track.preview_url,
      poster: track.album.images[0]?.url,
    }));

    // Mengirimkan hasil pencarian dalam bentuk JSON
    res.json(tracks);
  } catch (error) {
    // Jika terjadi error saat mengakses Spotify API, kirimkan response error
    res.status(500).json({ error: 'Failed to fetch data from Spotify API' });
  }
});

// Endpoint untuk mendaftarkan user baru
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Mengecek apakah username sudah ada di database
    const existing = await usersCollection.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already exists' });

    // Meng-hash password menggunakan bcrypt sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Menyimpan user baru ke dalam database dengan role default "user"
    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword,
      role: "user"
    });

    const userId = result.insertedId;

    // Membuat token JWT untuk autentikasi, token ini akan berlaku selama 1 hari
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Mengirimkan respons yang berisi token dan informasi pengguna yang baru terdaftar
    res.json({
      redirect: '/',
      token,
      username,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint untuk login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Cari user berdasarkan username
    const user = await usersCollection.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // Bandingkan password yang dikirim dengan yang di-hash di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Buat JWT token jika login berhasil
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Kirim token dan username sebagai respon
    res.json({
      redirect: '/',
      token: token,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Route untuk mendapatkan playlist pengguna yang terautentikasi
app.get('/playlist', authMiddleware, async (req, res) => {
  try {
    const db = client.db(dbName);
    const playlistCollection = db.collection('playlist');

    // Mencari playlist pengguna berdasarkan userId (yang terdekripsi dari token JWT)
    const user = await playlistCollection.findOne({ userId: new ObjectId(req.userId) });
    
    // Mengirimkan tracks yang ada pada playlist pengguna atau array kosong jika tidak ada
    res.json(user?.tracks || []); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

// Route untuk menambahkan track ke playlist pengguna yang terautentikasi
app.post('/playlist', authMiddleware, async (req, res) => {
  const newTrack = req.body;

  try {
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const playlistCollection = db.collection('playlist');

    const userId = new ObjectId(req.userId);

    // Memastikan user ada di database
    const user = await usersCollection.findOne({ _id: userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Mencari playlist pengguna
    let userPlaylist = await playlistCollection.findOne({ userId });

    if (!userPlaylist) {
      // Jika playlist belum ada, buat playlist baru dengan track yang baru ditambahkan
      userPlaylist = {
        userId,
        tracks: [newTrack],
      };
      await playlistCollection.insertOne(userPlaylist);
      return res.status(201).json({ message: 'Track added to new playlist' });
    }

    // Cek jika track sudah ada di playlist
    if (userPlaylist.tracks.some(track => track.id === newTrack.id)) {
      return res.status(400).json({ error: 'Track already in playlist' });
    }

    // Memastikan jumlah track tidak melebihi 100
    if (userPlaylist.tracks.length >= 100) {
      return res.status(400).json({ error: 'Playlist limit reached' });
    }

    // Menambahkan track baru ke playlist
    await playlistCollection.updateOne(
      { userId },
      { $push: { tracks: newTrack } } 
    );

    res.status(201).json({ message: 'Track added to playlist' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to add track' });
  }
});

// Route untuk menghapus track dari playlist pengguna berdasarkan trackId
app.delete('/playlist/:trackId', authMiddleware, async (req, res) => {
  const trackId = req.params.trackId;
  
  try {
    const db = client.db(dbName);
    const playlistCollection = db.collection('playlist');

    // Menghapus track berdasarkan trackId dari playlist pengguna
    const result = await playlistCollection.updateOne(
      { userId: new ObjectId(req.userId) },
      { $pull: { tracks: { id: trackId } } }
    );

    if (result.modifiedCount === 0) {
      // Jika tidak ada track yang dihapus, berarti track tidak ditemukan
      return res.status(404).json({ error: "Track not found in playlist." });
    }

    res.json({ message: "Track removed from playlist." });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove track." });
  }
});

// Route untuk menghapus pengguna dan playlist-nya dari database
app.delete('/user', authMiddleware, async (req, res) => {
  const data = req.body;
  try {
    const db = client.db(dbName);
    const playlistCollection = db.collection('playlist');
    const userCollection = db.collection('users');

    // Menghapus user dari koleksi 'users'
    const userDelete = await userCollection.deleteOne({
      _id: new ObjectId(req.userId)
    });

    // Menghapus playlist yang terkait dengan user dari koleksi 'playlist'
    await playlistCollection.deleteOne(
      { userId: new ObjectId(req.userId) }
    );

    if (userDelete.deletedCount === 0) {
      // Jika user tidak ditemukan untuk dihapus
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User and related playlist deleted successfully." }); 
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user or playlist." });
  }
});


// Route untuk menghapus user dan playlist yang terkait dengan user tersebut
app.delete('/user/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const db = client.db(dbName);
    const playlistCollection = db.collection('playlist'); 
    const userCollection = db.collection('users');

    // Menghapus user dari koleksi 'users' berdasarkan userId
    const userDelete = await userCollection.deleteOne({
      _id: new ObjectId(userId)
    });

    // Menghapus playlist yang terkait dengan userId
    await playlistCollection.deleteOne({ userId: new ObjectId(userId) });

    // Jika tidak ada user yang dihapus, mengembalikan status 404
    if (userDelete.deletedCount === 0) {
      return res.status(404).json({ error: "User tidak ditemukan." });
    }

    // Mengembalikan pesan sukses jika user dan playlist berhasil dihapus
    res.json({ message: "User berhasil dihapus." });
  } catch (err) {
    // Jika terjadi error, mengembalikan status 500
    res.status(500).json({ error: "Gagal menghapus user." });
  }
});

// Middleware untuk memverifikasi apakah user adalah admin
const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;
    const db = client.db(dbName);
    const userCollection = db.collection("users");
    const userData = await userCollection.findOne({ _id: new ObjectId(userId) }); 

    // Jika user tidak ditemukan, mengembalikan status 400
    if (!userData) {
      return res.status(400).json({ error: "User tidak ditemukan" });
    }

    // Jika role user adalah 'admin', lanjutkan ke middleware berikutnya atau handler route
    if (userData.role === 'admin') {
      return next();
    }

    return res.redirect("/");

  } catch (error) {
    console.error('Error di admin middleware:', error)
    return res.status(500).json({ error: 'Server error' });
  }
};

// Route untuk menampilkan dashboard admin dengan data user dan playlist
app.get('/admin_dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  const db = client.db(dbName);

  // Mengambil semua data user tanpa menyertakan password
  const users = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();

  // Mengambil data playlist dan menggabungkannya dengan data username dari koleksi 'users' menggunakan agregasi
  const playlists = await db.collection('playlist').aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    {
      $unwind: {
        path: "$userInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 1,
        tracks: 1,
        username: "$userInfo.username"
      }
    }
  ]).toArray();

  // Merender halaman dashboard admin dengan data user dan playlist
  res.render('admin_dashboard', { users, playlists });
});

// Route untuk menghapus playlist berdasarkan playlistId
app.delete("/admin/playlist/:playlistId", async (req, res) => {
  const { playlistId } = req.params;

  try {
    const db = client.db(dbName);
    const playlist = db.collection('playlist');
    console.log(playlistId);

    const id = new ObjectId(playlistId);

    // Menghapus playlist berdasarkan _id
    const deletePlaylist = await playlist.deleteOne({ _id: id });

    // Jika tidak ada playlist yang dihapus, mengembalikan status 400
    if (deletePlaylist.deletedCount === 0) {
      return res.status(400).json({ message: 'Tidak ada playlist yang ditemukan untuk dihapus.' });
    }

    // Mengembalikan pesan sukses jika playlist berhasil dihapus
    return res.status(200).json({ message: "Playlist berhasil dihapus." });
  } catch (error) {
    console.error('Error menghapus playlist:', error); 
    res.status(500).json({ error: "Gagal menghapus playlist." });
  }
});

// Route untuk mengubah role user menjadi admin atau user
app.patch('/set-admin', authMiddleware, adminMiddleware, async (req, res) => {
  const { userIds } = req.body;

  // Memeriksa apakah userIds adalah array
  if (!Array.isArray(userIds)) {
    return res.status(400).json({ error: 'Permintaan tidak valid: harap kirimkan array user IDs' });
  }

  try {
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const objectIds = userIds.map(id => new ObjectId(id));

    // Mengambil data user berdasarkan userIds
    const users = await usersCollection.find({ _id: { $in: objectIds } }).toArray();

    // Memisahkan user menjadi dua grup: yang akan dipromosikan jadi admin dan yang akan didemote jadi user
    const promoteToAdmin = [];
    const demoteToUser = [];

    // Menentukan user yang akan dipromosikan atau didemote berdasarkan role mereka
    users.forEach(user => {
      if (user.role === 'admin') {
        demoteToUser.push(user._id);
      } else {
        promoteToAdmin.push(user._id);
      }
    });

    // Memperbarui role user yang dipromosikan ke admin
    const promoteResult = await usersCollection.updateMany(
      { _id: { $in: promoteToAdmin } },
      { $set: { role: 'admin' } }
    );

    // Memperbarui role user yang didemote ke user
    const demoteResult = await usersCollection.updateMany(
      { _id: { $in: demoteToUser } },
      { $set: { role: 'user' } }
    );

    // Mengembalikan pesan yang menunjukkan berapa banyak user yang dipromosikan dan didemote
    res.status(200).json({
      message: `Update user: ${promoteResult.modifiedCount} dipromosikan menjadi admin, ${demoteResult.modifiedCount} didemote menjadi user`,
    });

  } catch (err) {
    console.error('Error dalam mengubah role admin:', err);
    res.status(500).json({ error: 'Gagal mengubah role user' });
  }
});

// Menjalankan server pada port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
