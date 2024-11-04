const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Cashier", "Inventory Manager", "Accountant","Users"],
      required: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
    sessionTokens: [
      {
        token: {
          type: String,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Function to assign permissions based on role
const assignPermissions = (role) => {
  const permissionsMap = {
    Admin: ["view_all", "edit_all", "delete_all"],
    Cashier: ["view_sales", "process_sales"],
    "Inventory Manager": ["view_inventory", "edit_inventory", "order_stock"],
    Accountant: ["view_financial_reports", "process_refunds"],
  };
  return permissionsMap[role] || [];
};
userSchema.pre("save", async function (next) {
  // Set permissions based on role if they are not set
  if (!this.permissions || this.permissions.length === 0) {
    this.permissions = assignPermissions(this.role);
  }
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
