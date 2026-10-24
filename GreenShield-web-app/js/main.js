let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");
let authNav = document.querySelector("#auth-nav");

if (authNav) {
  const isLoggedIn = localStorage.getItem("greenshield_session") === "true";
  const userName = isLoggedIn ? (localStorage.getItem("greenshield_user") || "Farmer") : "Guest";
  const profile = document.createElement("span");
  const profileIcon = document.createElement("i");

  profile.className = "profile-chip";
  profileIcon.className = "fas fa-user-circle";
  profile.append(profileIcon, document.createTextNode(` ${userName}`));

  if (isLoggedIn) {
    const logoutButton = document.createElement("button");
    logoutButton.className = "logout-button";
    logoutButton.type = "button";
    logoutButton.textContent = "Log out";
    authNav.replaceChildren(profile, logoutButton);
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("greenshield_session");
      localStorage.removeItem("greenshield_user");
      window.location.reload();
    });
  } else {
    const loginLink = document.createElement("a");
    const signupLink = document.createElement("a");
    loginLink.href = "auth/login.html";
    loginLink.textContent = "Log in";
    signupLink.href = "auth/signup.html";
    signupLink.className = "nav-cta";
    signupLink.innerHTML = 'Sign up <i class="fas fa-arrow-right"></i>';
    authNav.replaceChildren(profile, loginLink, signupLink);
  }
}

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};
