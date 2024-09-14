// src/services/authService.ts

interface User {
  email: string;
  password: string;
}

const USERS_KEY = "registered_users"; // Key for storing users array in local storage

// Save user to local storage on registration
export const saveUserToLocalStorage = (newUser: User) => {
  const users = getAllUsersFromLocalStorage();

  // Check if the user already exists
  const userExists = users.some((user) => user.email === newUser.email);
  if (!userExists) {
    // Add the new user to the users array
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } else {
    throw new Error("User already exists.");
  }
};

// Retrieve all users from local storage
export const getAllUsersFromLocalStorage = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Check if login credentials are correct
export const checkUserCredentials = (
  email: string,
  password: string
): boolean => {
  const users = getAllUsersFromLocalStorage();
  const user = users.find((user) => user.email === email);
  return user !== undefined && user.password === password;
};
