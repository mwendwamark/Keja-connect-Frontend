// src/services/authService.js
export const signupStudent = async (data) => {
  const response = await fetch("http://localhost:3000/student-signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const signupLandlord = async (data) => {
  const response = await fetch("http://localhost:3000/landlord-signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const loginStudent = async (data) => {
  const response = await fetch("http://localhost:3000/student-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const loginLandlord = async (data) => {
  const response = await fetch("http://localhost:3000/landlord-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const logoutStudent = async () => {
  await fetch("http://localhost:3000/student-logout", { method: "DELETE" });
};

export const logoutLandlord = async () => {
  await fetch("http://localhost:3000/landlord-logout", { method: "DELETE" });
};
