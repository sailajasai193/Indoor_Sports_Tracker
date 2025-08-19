// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  checkedInFacilities: [
    {
      sport: String,
      name: String,
      rollNo: String,
      checkedIn: Boolean
    }
  ],
});

export default mongoose.model('User', userSchema);
