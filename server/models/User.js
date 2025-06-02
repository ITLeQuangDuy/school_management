import pool from "../config/database.js";
import bcrypt from "bcrypt";

class User {
  static async findUserByEmail(email) {
    try {
      const [row] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return row[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createUser(userData) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      // insert to database
      await pool.query(
        "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
        [userData.name, userData.email, hashedPassword]
      );

      return { message: "Login successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async comparePassword(password, hashedPassword) {
    if (!password || !hashedPassword) {
      throw new Error("Password or hashedPassword is missing");
    }
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default User;
