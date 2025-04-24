const songs = [
  {
    id: 1,
    title: "Royalty",
    artists: ["Maestro Chives", "Egzod", "Neoni"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/374fc4ba-fe39-4bcf-9cf0-74c87c879ed0/artwork-440x440.jpg"
  },
  {
    id: 2,
    title: "Mortals",
    artists: ["Warriyo", "Laura Brehm"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/17534773-8bd9-419c-b46d-d500a4af33df/artwork-440x440.jpg"
  },
  {
    id: 3,
    title: "Mortals Funk Remix",
    artists: ["Warriyo", "LXNGVX"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/af32fef8-3cc4-4fc1-ad89-542b61dc5c32/artwork-440x440.jpg"
  },
  {
    id: 4,
    title: "Carry On",
    artists: ["Lost Sky", "Anna Yvette"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/c0b09b5c-dc08-4b52-840b-16fd6177abea/artwork-440x440.jpg"
  },
  {
    id: 5,
    title: "FreeFall",
    artists: ["RIENK", "NCT"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/7e68e248-c2bc-4789-b135-3bd9427ff293/artwork-440x440.jpg"
  },
  {
    id: 6,
    title: "Signs",
    artists: ["NAYM"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/56fac9bd-8fea-450c-b6d3-2f8e43b71987/artwork-440x440.jpg"
  },
  {
    id: 7,
    title: "The Riot",
    artists: ["NIVIRO"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/2cf0dd0d-5ce0-4499-9e56-757a489c565a/artwork-440x440.jpg"
  },
  {
    id: 8,
    title: "Magnetic",
    artists: ["Springs!"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/aeb8fc77-e783-45a5-bacf-11125d5ef87e/artwork-440x440.jpg"
  },
  {
    id: 9,
    title: "Happier Now",
    artists: ["SadBois", "Gabriel Eli"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/bf1d7a07-68b2-4df0-be90-74702bbf547c/artwork-440x440.jpg"
  },
  {
    id: 10,
    title: "Baby Sweet-Tail Remix",
    artists: ["intouch", "Tails"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/a3f5a63e-a1d1-43c6-bef0-0de783935d36/artwork-440x440.jpg"
  },
  {
    id: 11,
    title: "on and on",
    artists: ["BAYZY", "Sayfro"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/92ffbc67-fdd1-46e9-b336-8a2e0297ffce/artwork-440x440.jpg"
  },
  {
    id: 12,
    title: "Like Rain",
    artists: ["Rameses B"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/53db7c26-7485-4836-a92e-e472ac008bbc/artwork-440x440.jpg"
  },
  {
    id: 13,
    title: "Desperate",
    artists: ["NEFFEX", "Tokyo Machine"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/060a1672-81c6-46d3-96c8-2a67724ea060/artwork-440x440.jpg"
  },
  {
    id: 14,
    title: "EXECUTIONER",
    artists: ["DJ FKU"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/80fbe8f9-08bc-4c9c-ac72-f154fa9471dd/artwork-440x440.jpg"
  },
  {
    id: 15,
    title: "Back To Default",
    artists: ["Immy Odon"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/105a9966-1cfa-421c-9bb5-9ac05814d434/artwork-440x440.jpg"
  },
  {
    id: 16,
    title: "Delta",
    artists: ["DJ FKU"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/694df456-d295-4d14-af16-5a7376f04a48/artwork-440x440.jpg"
  },
  {
    id: 17,
    title: "BANDIDO FUNK",
    artists: ["Emin Nilsen", "Kamran747"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/0f5a8a32-93a5-4833-8761-d316110d0388/artwork-440x440.jpg"
  },
  {
    id: 18,
    title: "Heroes Tonight x Dreams pt.II Mashup",
    artists: ["Sara Skinner", "Lost Sky", "Johnning", "Janji"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/c8ed7eba-8a08-46fa-9355-40e0d655afd7/artwork-440x440.jpg"
  },
  {
    id: 19,
    title: "Why So Serious",
    artists: ["Sync", "Roby Fayer", "Eytan Peled"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/443f9de1-cb71-4d9c-bb68-07a1ad3f454c/artwork-440x440.jpg"
  },
  {
    id: 20,
    title: "Ruins",
    artists: ["DJ FKU", "LXNGVX"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/72367e72-5464-4beb-8cf1-e4d99776617f/artwork-440x440.jpg"
  },
  {
    id: 21,
    title: "Safe & Sound",
    artists: ["Different Heaven"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/f3672f10-a607-489a-9833-82cdfa9ad295/artwork-440x440.jpg"
  },
  {
    id: 22,
    title: "Far Away (Phantom Sage Remix)",
    artists: ["Different Heaven", "Phantom Sage"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/2aa30ea1-2b12-492b-91c8-dab34b1f3d17/artwork-440x440.jpg"
  },
  {
    id: 23,
    title: "Invinvible (Speed Up)",
    artists: ["DEAR KEV"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/4afdadd0-da31-41ae-9e8a-49d48c2970a8/artwork-440x440.jpg"
  },
  {
    id: 24,
    title: "On & On (Ft. Daniel Levi)",
    artists: ["Cartoon", "Daniel Levi", "Jeja"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/df98e91f-730c-471b-bfdb-9348b75825fd/artwork-440x440.jpg"
  },
  {
    id: 25,
    title: "Dreams pt.II(Ft. Sara Skinner)",
    artists: ["Lost Sky", "Sara Skinner"],
    cover: "https://linkstorage.linkfire.com/medialinks/images/a4e762aa-8519-4892-90d6-6728e403be44/artwork-440x440.jpg"
  },
];

// Mendapatkan elemen-elemen DOM yang digunakan untuk kontrol UI
const songListId = document.getElementById("pop_song");
const menuSong = document.getElementById("menu_song");
let index = 0;  // Indeks lagu yang sedang diputar
let masterPlay = document.getElementById('masterPlay');
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
let wave = document.getElementsByClassName('wave')[0];
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

// Membuat objek audio untuk pemutaran musik
const music = new Audio();

// Menampilkan daftar lagu (dari indeks 5 hingga 25)
songs.slice(5, 25).forEach((item) => {
  const songDiv = document.createElement("li");
  songDiv.className = "songItem";
  songDiv.innerHTML = `
    <div class="img_play">
      <img src="${item.cover}" alt="${item.cover}">
      <i class="bi playListPlay bi-play-circle-fill" id=${item.id}></i>
    </div>
    <h5>${item.title}<br><div class="subtitle">${item.artists.join(", ")}</div></h5>
  `;
  songListId.appendChild(songDiv);
});

// Menangani pemutaran lagu dan kontrol interaksi UI
document.addEventListener('DOMContentLoaded', () => {
  const vol_icon = document.getElementById("vol_icon");
  const vol = document.getElementById("vol");
  const vol_bar = document.getElementsByClassName('vol_bar')[0];
  let index = 0; // Menyimpan indeks lagu yang sedang diputar

  // Fungsi untuk menghentikan lagu yang sedang diputar
  const pauseCurrentSong = () => {
    if (!music.paused) {
      music.pause();
      masterPlay.classList.add('bi-play-fill');
      masterPlay.classList.remove('bi-pause-fill');
      wave.classList.remove('active2');
    }
  };

  // Fungsi untuk mengganti lagu dan mengupdate UI
  const changeSong = (songIndex) => {
    const song = songs[songIndex];

    pauseCurrentSong(); // Hentikan lagu saat ini
    seek.value = 0;
    bar2.style.width = `0%`;
    dot.style.left = `0%`;

    document.getElementById('poster_master_play').src = song.cover;
    document.getElementById('title').innerHTML = `${song.title}<br><div class="subtitle">${song.artists.join(", ")}</div>`;
    music.src = `audio/${song.id}.mp3`;
    index = songIndex;

    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    music.addEventListener('loadedmetadata', () => {
      seek.max = Math.floor(music.duration);
      let min = Math.floor(music.duration / 60);
      let sec = Math.floor(music.duration % 60);
      if (sec < 10) sec = `0${sec}`;
      currentEnd.innerText = `${min}:${sec}`;
    });

    music.addEventListener('timeupdate', () => {
      let current = music.currentTime;
      seek.value = Math.floor(current);

      let min = Math.floor(current / 60);
      let sec = Math.floor(current % 60);
      if (sec < 10) sec = `0${sec}`;
      currentStart.innerText = `${min}:${sec}`;

      let progress = (current / music.duration) * 100;
      bar2.style.width = `${progress}%`;
      dot.style.left = `${progress}%`;
    });

    seek.addEventListener('input', () => {
      music.currentTime = seek.value;
    });

    music.volume = 0.1; // Setel volume
    music.play(); // Mulai memutar lagu
  };

  // Menangani klik pada daftar lagu
  document.querySelectorAll('.songItem').forEach((element, songIndex) => {
    element.addEventListener('click', () => {
      changeSong(songIndex); // Mengganti lagu saat item lagu diklik
    });
  });

  // Mengubah lagu ketika lagu selesai diputar
  music.addEventListener("ended", () => {
    index++;
    if (index >= songs.length) {
      index = 0; // Kembali ke lagu pertama jika mencapai akhir
    }
    changeSong(index);
  });

  // Fungsi untuk tombol 'back' dan 'next'
  let back = document.getElementById("back");
  let next = document.getElementById("next");

  back.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = songs.length - 1; // Kembali ke lagu terakhir jika berada di awal
    }
    changeSong(index); // Ganti lagu ketika tombol back ditekan
  });

  next.addEventListener("click", () => {
    index++;
    if (index >= songs.length) {
      index = 0; // Kembali ke lagu pertama jika mencapai akhir
    }
    changeSong(index); // Ganti lagu ketika tombol next ditekan
  });

  // Fungsi untuk kontrol play/pause
  masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
      music.play();
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');
      wave.classList.add('active2');
    } else {
      music.pause();
      masterPlay.classList.add('bi-play-fill');
      masterPlay.classList.remove('bi-pause-fill');
      wave.classList.remove('active2');
    }
  });

  // Fungsi untuk mengatur volume
  vol.addEventListener("change", () => {
    if (vol.value == 0) {
      vol_icon.classList.remove("bi-volume-down-fill");
      vol_icon.classList.add("bi-volume-mute-fill");
      vol_icon.classList.remove("bi-volume-up-fill");
    }
    if (vol.value > 0) {
      vol_icon.classList.add("bi-volume-down-fill");
      vol_icon.classList.remove("bi-volume-mute-fill");
      vol_icon.classList.remove("bi-volume-up-fill");
    }
    if (vol.value > 50) {
      vol_icon.classList.remove("bi-volume-down-fill");
      vol_icon.classList.remove("bi-volume-mute-fill");
      vol_icon.classList.add("bi-volume-up-fill");
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
  });
});

// Menampilkan daftar lagu pada menu samping
for (let index = 0; index < 5 && index < songs.length; index++) {
  const song = songs[index];
  const songDiv = document.createElement("li");
  songDiv.className = "songItem";
  songDiv.innerHTML = `
    <span>0${index + 1}</span>
    <img src="${song.cover}" alt="album cover" />
    <h5>${song.title}<br><div class="subtitle">${song.artists.join(", ")}</div></h5>
  `;
  menuSong.appendChild(songDiv);
}

// Fungsi untuk membuat semua ikon play menjadi ikon play default
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
    element.classList.add('bi-play-circle-fill');
    element.classList.remove('bi-pause-circle-fill');
  })
}

// Fungsi untuk mengatur ulang latar belakang item lagu
const makeAllBackgrounds = () => {
  Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
    element.style.background = "rgb(105, 105, 170, 0)";
  })
}

// Menangani aksi ketika lagu selesai diputar
music.addEventListener("ended", () => {
  masterPlay.classList.add("bi-play-fill")
  masterPlay.classList.remove("bi-pause-fill")
  wave.classList.remove("active2")
})

// Menangani interaksi dengan pop-up profil
document.addEventListener('DOMContentLoaded', () => {
  const profilePopup = document.getElementById('profilePopup');
  const profileIcon = document.getElementById('pp');
  const usernameEl = document.getElementById('username');
  const storedUsername = localStorage.getItem('username');

  usernameEl.textContent = storedUsername || 'Guest'; // Menampilkan nama pengguna

  // Toggle pop-up profil ketika ikon profil diklik
  profileIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    profilePopup.classList.toggle('show');
  });

  // Menyembunyikan pop-up profil jika area lain diklik
  document.addEventListener('click', function (e) {
    if (!profilePopup.contains(e.target) && e.target !== profileIcon) {
      profilePopup.classList.remove('show');
    }
  });
});

// Fungsi untuk logout
function signOut() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  localStorage.removeItem('username');
  window.location.href = '/frontpage';
}

// Fungsi untuk menghapus akun
async function deleteAcc() {
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    alert("You are not logged in.");
    return;
  }

  try {
    // Konfirmasi penghapusan akun
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    const res = await fetch(`/user`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(`Error: ${data.error || "Something went wrong"}`);
      return;
    }

    // Hapus token dan data pengguna
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("username");

    alert("Account deleted successfully.");
    window.location.href = "/frontpage";
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete account.");
  }
}
