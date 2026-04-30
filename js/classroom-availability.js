(function () {
  "use strict";

  const STORAGE_KEY = "cas.room-status.v1";
  const AUTH_KEY = "cas.admin-authenticated";
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin";
  const ROOMS = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
  ];

  function createDefaultStatus() {
    return ROOMS.reduce((status, roomId) => {
      status[roomId] = "available";
      return status;
    }, {});
  }

  function normalizeStatus(value) {
    return value === "filled" ? "filled" : "available";
  }

  function readRoomStatus() {
    const status = createDefaultStatus();

    try {
      const savedStatus = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

      if (
        savedStatus &&
        typeof savedStatus === "object" &&
        !Array.isArray(savedStatus)
      ) {
        ROOMS.forEach((roomId) => {
          status[roomId] = normalizeStatus(savedStatus[roomId]);
        });
      }
    } catch (error) {
      return status;
    }

    return status;
  }

  function saveRoomStatus(status) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  }

  function getRoomLabel(card) {
    const label = card.closest("td")?.querySelector("[data-room-name]");
    return label ? label.textContent.trim() : "ruangan";
  }

  function updateRoomCard(roomId, status) {
    const card = document.querySelector(`[data-room-id="${roomId}"]`);

    if (!card) {
      return;
    }

    const isFilled = status === "filled";
    const statusText = card.querySelector("[data-status-text]");
    const statusIcon = card.querySelector("[data-status-icon]");
    const toggleButton = card.querySelector("[data-toggle-room]");

    card.classList.toggle("kotak", !isFilled);
    card.classList.toggle("kotakmerah", isFilled);

    if (statusText) {
      statusText.textContent = isFilled ? "Filled" : "Available";
    }

    if (statusIcon) {
      statusIcon.src = isFilled ? "img/uncheck.png" : "img/check.png";
      statusIcon.alt = isFilled ? "Filled" : "Available";
    }

    if (toggleButton) {
      toggleButton.setAttribute(
        "aria-label",
        `Ubah status ${getRoomLabel(card)} menjadi ${
          isFilled ? "Available" : "Filled"
        }`
      );
    }
  }

  function renderAvailability() {
    const status = readRoomStatus();

    ROOMS.forEach((roomId) => {
      updateRoomCard(roomId, status[roomId]);
    });
  }

  function setupAvailabilityPage(options = {}) {
    const editable = Boolean(options.editable);

    renderAvailability();

    if (editable) {
      document.querySelectorAll("[data-toggle-room]").forEach((button) => {
        button.addEventListener("click", () => {
          const card = button.closest("[data-room-id]");

          if (!card) {
            return;
          }

          const roomId = card.dataset.roomId;
          const status = readRoomStatus();
          status[roomId] = status[roomId] === "filled" ? "available" : "filled";
          saveRoomStatus(status);
          updateRoomCard(roomId, status[roomId]);
        });
      });
    }

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        renderAvailability();
      }
    });
  }

  function formatIndonesianDateTime(date) {
    const dateText = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(date);

    const timeText = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(date);

    return `${dateText}, ${timeText} WIB`;
  }

  function setupClock() {
    const clock = document.querySelector("[data-cas-clock]");

    if (!clock) {
      return;
    }

    const updateClock = () => {
      clock.textContent = formatIndonesianDateTime(new Date());
    };

    updateClock();
    window.setInterval(updateClock, 1000);
  }

  function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  }

  function setupLoginPage() {
    if (isAuthenticated()) {
      window.location.replace("admin-dashboard.html");
      return;
    }

    const form = document.querySelector("[data-login-form]");

    if (!form) {
      return;
    }

    const username = form.querySelector("#username");
    const password = form.querySelector("#password");
    const errorMessage = form.querySelector("[data-login-error]");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const isValid =
        username.value.trim() === ADMIN_USERNAME &&
        password.value === ADMIN_PASSWORD;

      if (isValid) {
        sessionStorage.setItem(AUTH_KEY, "true");
        window.location.href = "admin-dashboard.html";
        return;
      }

      sessionStorage.removeItem(AUTH_KEY);
      errorMessage.classList.remove("d-none");
      username.setAttribute("aria-invalid", "true");
      password.setAttribute("aria-invalid", "true");
      password.value = "";
      password.focus();
    });

    [username, password].forEach((field) => {
      field.addEventListener("input", () => {
        errorMessage.classList.add("d-none");
        username.removeAttribute("aria-invalid");
        password.removeAttribute("aria-invalid");
      });
    });
  }

  function setupAdminPage() {
    if (!isAuthenticated()) {
      window.location.replace("admin-login.html");
      return;
    }

    setupAvailabilityPage({ editable: true });

    const logoutButton = document.querySelector("[data-logout-button]");

    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem(AUTH_KEY);
        window.location.href = "admin-login.html";
      });
    }
  }

  function setupPage() {
    const page = document.body.dataset.page;

    setupClock();

    if (page === "public") {
      setupAvailabilityPage();
    }

    if (page === "login") {
      setupLoginPage();
    }

    if (page === "admin") {
      setupAdminPage();
    }
  }

  document.addEventListener("DOMContentLoaded", setupPage);
})();
