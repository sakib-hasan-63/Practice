// DAY 5 — Promises + Async/Await + API
// File: day-5-api.js

const fetchUsers = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status}`
      );
    }

    const users = await response.json();

    return users;

  } catch (error) {
    console.error(
      "Failed to fetch users:",
      error.message
    );

    return [];
  }
};

const displayUsers = async () => {
  const users = await fetchUsers();

  const formattedUsers = users
    .filter(user => user.id <= 5)
    .map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      city: user.address.city,
      company: user.company.name
    }));

  console.table(formattedUsers);

  // HTML UI Render Logic (Tailwind UI Cards)
  const usersContainer = document.getElementById("usersContainer");
  if (usersContainer) {
    if (formattedUsers.length === 0) {
      usersContainer.innerHTML = `<p class="text-red-500 font-medium col-span-full">Failed to load users.</p>`;
      return;
    }

    usersContainer.innerHTML = "";
    formattedUsers.forEach(user => {
      const card = document.createElement("div");
      card.className = "bg-slate-50 border-l-4 border-emerald-500 p-4 rounded-lg shadow-sm space-y-1";
      card.innerHTML = `
        <h3 class="font-bold text-slate-800">#${user.id} ${user.name}</h3>
        <p class="text-xs text-slate-600"><span class="font-semibold text-slate-700">Email:</span> ${user.email}</p>
        <p class="text-xs text-slate-600"><span class="font-semibold text-slate-700">City:</span> ${user.city}</p>
        <p class="text-xs text-slate-600"><span class="font-semibold text-slate-700">Company:</span> ${user.company}</p>
      `;
      usersContainer.appendChild(card);
    });
  }
};

displayUsers();


// Promise Example

const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {

    setTimeout(() => {

      if (
        username === "sakib" &&
        password === "12345"
      ) {
        resolve({
          success: true,
          message: "Login successful"
        });
      } else {
        reject(
          new Error("Invalid credentials")
        );
      }

    }, 1000);
  });
};

const login = async (user = "sakib", pass = "12345") => {
  const statusDiv = document.getElementById("loginStatus");
  if (statusDiv) {
    statusDiv.className = "mt-4 p-3 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 block";
    statusDiv.innerText = "Authenticating...";
  }

  try {
    const result = await loginUser(user, pass);
    console.log(result);

    if (statusDiv) {
      statusDiv.className = "mt-4 p-3 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-800 block";
      statusDiv.innerText = `Success: ${result.message}`;
    }

  } catch (error) {
    console.error(error.message);

    if (statusDiv) {
      statusDiv.className = "mt-4 p-3 rounded-lg text-sm font-medium bg-rose-100 text-rose-800 block";
      statusDiv.innerText = `Error: ${error.message}`;
    }
  }
};

login();

// Input Button Click Handler
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const u = document.getElementById("usernameInput").value.trim();
      const p = document.getElementById("passwordInput").value.trim();
      login(u, p);
    });
  }
});