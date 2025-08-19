// routes/facilityRoutes.js
import express from 'express';
import { getAllFacilities, updateOccupancy, checkIn, checkOut,getCheckIns, getOccupancy } from '../controllers/facilityController.js';

const router = express.Router();

router.get('/', getAllFacilities); // Get all facilities
router.get('/occupancy', getOccupancy); // New occupancy route
router.post('/update', updateOccupancy); // Update occupancy count
router.post('/checkin', checkIn); // Check-in route for Admin
router.post('/checkout', checkOut); // Check-out route for Admin
router.get('/checkins', getCheckIns);
router.post('/checkins', checkIn);
router.post('/checkout/:studentId/:sport', checkOut); // Updated route

export default router;

