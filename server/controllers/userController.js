const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Cart } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, firstName, lastName, isNewsletter } =
        req.body;

      // Validate required fields
      if (!email || !password || !firstName || !lastName) {
        return next(
          ApiError.badRequest(
            "Email, password, last and first name must be provided",
            "MISSING_REQUIRED_FIELDS"
          )
        );
      }

      if (email.startsWith('deleted_')) {
      return next(ApiError.badRequest("This email cannot be used.", "INVALID_EMAIL"));
    }

      // Check if user already exists
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest(
            "User with provided email exists already",
            "MISSING_REQUIRED_FIELDS"
          )
        );
      }

      // Hash password
      const hashPassword = await bcrypt.hash(password, 5);

      // Create user
      const user = await User.create({
        email,
        password: hashPassword,
        firstName,
        lastName,
        role: "ADMIN",
        newsletter: !!isNewsletter,
        newsletterConsentDate: isNewsletter ? new Date() : null,
      });

      // Create cart for the user
      await Cart.create({ userId: user.id });

      // Generate JWT token
      const token = generateJwt(user.id, user.role);

      // Save token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.sendStatus(204);
    } catch (e) {
      return next(ApiError.internal("Registration failed: " + e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, isRemember } = req.body;

      // Basic input validation
      if (!email || !password) {
        return next(
          ApiError.badRequest(
            "Email and password must be provided.",
            "MISSING_REQUIRED_FIELDS"
          )
        );
      }

      // Search for user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(
          ApiError.badRequest(
            "User with this email was not found.",
            "USER_NOT_FOUND"
          )
        );
      }
      if (user.isDeleted) {
        return next(ApiError.badRequest("Account has been deleted.", "USER_NOT_FOUND"));
      }

      // Compare hashed passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(
          ApiError.badRequest("Incorrect password.", "INVALID_PASSWORD")
        );
      }

      // Generate JWT token
      const token = generateJwt(user.id, user.role);

      // Save token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: isRemember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 30 Days, when remember else 1 Day
      });
      return res.sendStatus(204);
    } catch (e) {
      return next(
        ApiError.internal("Login failed: " + e.message, "INTERNAL_ERROR")
      );
    }
  }

  logout(req, res, next) {
    res.clearCookie("token");
    return res.sendStatus(204);
}

  async getAll(req, res, next) {
    const users = await User.findAll();
    return res.json(users);
  }

  async check (req, res, next) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "role", "firstName", "lastName"]
    });

    if (!user || user.isDeleted) {
      return res.status(401).json({ message: "User not found or deleted." });
    }

    return res.json(user);
  } catch (e) {
    return next(ApiError.internal("Authorization check failed"));
  }
};

  async deleteAccount(req, res, next) {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return next(
        ApiError.badRequest(
          "User with this userId was not found.",
          "USER_NOT_FOUND"
        )
      );
    }

    // Delete user cart
    await Cart.destroy({ where: { userId } });
    
    // Edit email and mark as delete
    user.email = `deleted_${user.id}_${user.email}`;
    user.isDeleted = true;
    user.deletedAt = new Date();
    await user.save();

    // Clear auth token
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.sendStatus(204);

  } catch (e) {
    return next(ApiError.internal("Account deletion failed", "INTERNAL"));
  }
}
}

module.exports = new UserController();
