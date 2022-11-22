// Logouts users from their profile
const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // If logged out successfully, redirects to home page. If not successful, it alerts the user with the response error
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

// When logout button is clicked, it will log the user out of their profile
document.querySelector("#logout").addEventListener("click", logout);
