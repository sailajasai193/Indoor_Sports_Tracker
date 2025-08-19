// models/Facility.js
import mongoose from 'mongoose';

const checkedInSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  checkInTime: { type: Date, default: Date.now },
});

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  maxOccupancy: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
  checkedInStudents: [checkedInSchema], // Array of checked-in students
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;

