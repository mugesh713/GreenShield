const USERS_KEY = "greenshield_users";
const SESSION_KEY = "greenshield_session";

document.querySelectorAll("[data-password-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const input = document.getElementById(toggle.dataset.passwordToggle);
    const icon = toggle.querySelector("i");
    const isVisible = input.type === "text";

    input.type = isVisible ? "password" : "text";
    icon.classList.toggle("fa-eye", isVisible);
    icon.classList.toggle("fa-eye-slash", !isVisible);
    toggle.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
  });
});

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function setMessage(message, text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#b34e35" : "#3f7d58";
}

document.querySelectorAll("[data-auth-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = form.querySelector(".form-message");
    const formType = form.dataset.authForm;
    const email = form.elements.email.value.trim().toLowerCase();
    const password = form.elements.password.value;
    const users = getUsers();

    if (formType === "signup") {
      if (users.some((user) => user.email === email)) {
        setMessage(message, "This email is already registered. Please log in.", true);
        return;
      }

      if (password !== form.elements.confirmPassword.value) {
        setMessage(message, "Passwords do not match. Please try again.", true);
        return;
      }

      users.push({
        name: form.elements.name.value.trim(),
        email,
        password
      });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      setMessage(message, "Account created. Redirecting to login...");
      form.reset();
      window.setTimeout(() => {
        window.location.replace("login.html");
      }, 900);
      return;
    }

    const user = users.find((savedUser) => savedUser.email === email && savedUser.password === password);
    if (!user) {
      setMessage(message, "Incorrect email or password.", true);
      return;
    }

    localStorage.setItem(SESSION_KEY, "true");
    localStorage.setItem("greenshield_user", user.name || user.email);
    setMessage(message, "Login successful. Redirecting...");
    form.reset();
    window.setTimeout(() => {
      window.location.replace("../index.html");
    }, 500);
  });
});
