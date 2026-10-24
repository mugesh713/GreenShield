let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");
let authNav = document.querySelector("#auth-nav");

if (authNav && localStorage.getItem("greenshield_session") === "true") {
  const userName = localStorage.getItem("greenshield_user") || "Farmer";
  const profile = document.createElement("span");
  const profileIcon = document.createElement("i");
  const logoutButton = document.createElement("button");

  profile.className = "profile-chip";
  profileIcon.className = "fas fa-user-circle";
  profile.append(profileIcon, document.createTextNode(` ${userName}`));
  logoutButton.className = "logout-button";
  logoutButton.type = "button";
  logoutButton.textContent = "Log out";
  authNav.replaceChildren(profile, logoutButton);
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("greenshield_session");
    localStorage.removeItem("greenshield_user");
    window.location.replace("auth/login.html");
  });
}

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};
