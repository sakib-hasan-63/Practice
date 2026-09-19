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

const login = async () => {
  try {
    const result = await loginUser(
      "sakib",
      "12345"
    );

    console.log(result);

  } catch (error) {
    console.error(error.message);
  }
};

login();