// Mendapatkan elemen form sign-in
const form = document.getElementById("signin-form");

// Menambahkan event listener saat form disubmit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Mengambil nilai dari input username dan password
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Melakukan permintaan POST ke server untuk login
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // Jika respons tidak berhasil (status bukan 200-299)
    if (!response.ok) {
      const error = await response.text();
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
      return;
    }

    // Jika login berhasil, ambil data respons berupa JSON
    const data = await response.json();

    // Menyimpan token ke dalam cookie untuk sesi yang lebih lama
    document.cookie = `token=${data.token}; path=/; max-age=86400`;
    localStorage.setItem("username", data?.username)

    // Jika server memberikan URL untuk redirect setelah login berhasil
    if (data.redirect) {
      // Redirect client-side
      alert("Sign In Success, redirecting after enter")
      window.location.href = data.redirect;
    }
  } catch (err) {
    console.error("Error logging in:", err);
    alert("Something went wrong.");
  }
});