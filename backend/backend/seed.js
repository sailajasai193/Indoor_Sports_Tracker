// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Facility from './models/Facility.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedFacilities = async () => {
  const facilities = [
    { name: 'Badminton', maxOccupancy: 20 },
    { name: 'Table Tennis', maxOccupancy: 10 },
    { name: 'Squash', maxOccupancy: 5 },
    { name: 'Gym', maxOccupancy: 50 }
  ];

  await Facility.insertMany(facilities);
  console.log('Facilities seeded!');
  mongoose.connection.close();
};

seedFacilities().catch(error => console.error(error));
