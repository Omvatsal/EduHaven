import User from "../Model/UserModel.js";
import { generateUniqueUsername } from "../utils/generateUsername.js";

// a script to add missing usernames in old users
export async function handleMissingUsernames() {
  const usersWithoutUsername = await User.find({
    $or: [
      { Username: { $exists: false } },
      { Username: null },
      { Username: "" },
    ],
  });

  for (const user of usersWithoutUsername) {
    const base = user.Email.split("@")[0];
    user.Username = await generateUniqueUsername(base);
    await user.save();
    console.log(`✅ Updated ${user.Email} → ${user.Username}`);
  }
}
