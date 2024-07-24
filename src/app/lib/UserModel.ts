import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
  links: [{
    id: {
      type: Number
    },
    name: {
      type: String
    },
    url: {
      type: String
    },
    color: {
      type: String
    },
    icon: {
      type: String
    },
  }]
});

// Pre-save middleware to hash the password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check the password
userSchema.methods.checkPassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
