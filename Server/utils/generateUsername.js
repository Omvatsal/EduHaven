import User from "../Model/UserModel.js";

// generate a simple username from email
export async function generateUniqueUsername(base) {
  let username = base.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(); // sanitize
  let count = 1;

  while (await User.exists({ Username:username })) {
    username = `${username}${count}`;
    count++;
  }

  return username;
}