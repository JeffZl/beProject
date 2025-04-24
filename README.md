# Anggota Kelompok
- Excell Hanzovin Hakim - 535240085
- Jeffly - 535240091
- Andrean - 535240092
# 🎵 Jaxe Music Player Backend

**Jaxe** adalah aplikasi pemutar musik berbasis web yang terhubung dengan **Spotify API** untuk mendapatkan data musik dan mengelola playlist pengguna. Meskipun data lagu diambil dari Spotify, audio yang diputar tetap bersumber dari file lokal karena keterbatasan akses Spotify Premium. Backend ini dibangun menggunakan **Node.js**, **Express**, **MongoDB**, dan **EJS**, serta menggunakan **JWT** untuk autentikasi.

---

## ✨ Fitur Utama

- **🔐 Login/Signup**: Autentikasi pengguna menggunakan email dan password.
- **🎧 Playlist Pribadi**: Buat, lihat, dan kelola playlist pengguna.
- **🛠️ Dashboard Admin**: Admin dapat mengelola lagu dan playlist.
- **🎶 Spotify API Integration**: Mendapatkan metadata lagu dari Spotify.
- **💾 Local Storage Playback**: Menyimpan status pemutaran (lagu, waktu, volume) secara lokal di browser pengguna.

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/username/jaxe-music-player.git
cd jaxe-music-player
npm install
```

### 2. Konfigurasi Environment Variables

Buat file `.env` di root folder dan isi dengan:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Menjalankan Server

```bash
npm start
```

Aplikasi akan berjalan di: [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Folder

```
/views         → Halaman EJS untuk SSR
/public        → File statis (CSS, JS, gambar)
```

---

## 📡 API Endpoint

### 🔐 Autentikasi

- **POST /login** – Login pengguna  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **POST /signup** – Daftar pengguna baru  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "username": "username"
  }
  ```

### 🎵 Playlist & Lagu

- **GET /playlist** – Mendapatkan playlist pengguna
- **POST /playlist** – Menambahkan lagu ke playlist
- **GET /song/:id** – Mengambil detail lagu berdasarkan ID
- **GET /searchresult** – Mencari lagu melalui query Spotify

---

## 👤 Panduan Pengguna

1. **Sign Up**  
   - Klik *Sign Up* di halaman utama  
   - Masukkan email, username, dan password (minimal 8 karakter, termasuk huruf besar, kecil, angka, dan simbol)

2. **Login**  
   - Klik *Login* dan masukkan email serta password

3. **Beranda**  
   - Menampilkan rekomendasi lagu lokal (tanpa copyright)

4. **Kelola Playlist**  
   - Klik menu *Playlist* untuk melihat/mengelola playlist  
   - Cari lagu melalui *search bar*, klik tombol `+` untuk menambahkannya

5. **Keluar / Hapus Akun**  
   - Klik avatar pengguna di kanan atas, pilih *Sign Out* atau *Delete Account*

---

## 🧰 Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend Rendering**: EJS Templates
- **Authentication**: JSON Web Token (JWT)
- **API**: Spotify Web API
- **Storage**: Local Storage untuk playback status

---


## 🛠️ Admin Dashboard


Pengguna dengan role `admin` memiliki akses ke **Admin Dashboard** yang memungkinkan pengelolaan user dan playlist dengan fitur-fitur sebagai berikut:

- **🛠️ [Dashboard Admin](http://localhost:3000/admin_dashboard)**: Admin dapat mengelola lagu, playlist, dan user.

### 🔎 Filter Pengguna
Admin dapat memfilter daftar pengguna berdasarkan:
- **All Users**: Menampilkan semua pengguna.
- **Admin Users**: Menampilkan hanya pengguna dengan peran admin.
- **Non-Admin Users**: Menampilkan hanya pengguna biasa (user).

### 👥 Manajemen Role
- Admin dapat memilih satu atau beberapa pengguna dan:
  - **Set as Admin**: Mengubah peran menjadi `admin`.
  - **Demote to User**: Menurunkan peran menjadi `user`.

### 🗑️ Hapus Akun
- Tersedia tombol **Delete Account** untuk setiap pengguna.
- Digunakan untuk menghapus akun pengguna secara permanen dari sistem.

### 🎶 Manajemen Playlist
- Di bagian bawah dashboard, admin dapat melihat semua playlist yang dibuat pengguna.
- Setiap entri playlist menampilkan:
  - **Username** pembuat playlist.
  - Jumlah **Tracks** dalam playlist.
  - Tombol **Delete Playlist** untuk menghapus playlist tersebut dari sistem.
