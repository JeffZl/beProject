// Mengambil elemen form
const form = document.querySelector("form");

// Menambahkan event listener pada form saat disubmit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Mengambil nilai input dari field username, password, dan confirm password
  const username = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();
  const cPassword = document.getElementById("cPassword").value.trim();

  // Regular expression untuk validasi password (min 8 karakter, harus ada huruf besar, kecil, dan angka)
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  // Validasi jika password tidak memenuhi kriteria
  if (!regex.test(password)) {
    alert("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
    return;
  }

  try {
    // Validasi jika password dan confirm password tidak cocok
    if (password !== cPassword) {
      alert("Password and Confirm Password's not match");
      return;
    }

    // Mengirimkan permintaan POST ke server untuk melakukan sign-up
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // Menangani jika server merespons dengan status selain 200 (misalnya 400 atau 500)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      alert("Signup failed: " + errorText);
      return;
    }

    // Jika server merespons dengan data JSON yang berisi informasi token dan username
    const data = await response.json();
    document.cookie = `token=${data.token}; path=/; max-age=86400`;
    localStorage.setItem("username", data?.username);

    // Jika server memberikan URL untuk redirect setelah sign-up berhasil
    if (data.redirect) {
      alert("Sign Up Success, redirecting after enter");
      window.location.href = data.redirect;
    }

  } catch (err) {
    // Menangani jika terjadi error saat melakukan request
    console.error("Signup error:", err);
    alert("Something went wrong. Please try again.");
  }
});
