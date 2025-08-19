import Facility from '../models/Facility.js';

// Fetch all facilities
export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOccupancy = async (req, res) => {
  try {
    const facilities = await Facility.find().select('name currentOccupancy maxOccupancy');
    const occupancyData = facilities.reduce((acc, facility) => {
      acc[facility.name.toLowerCase()] = {
        count: facility.currentOccupancy,
        maxOccupancy: facility.maxOccupancy
      };
      return acc;
    }, {});

    res.status(200).json(occupancyData);
  } catch (error) {
    console.error('Error fetching occupancy data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update occupancy of a specific facility
export const updateOccupancy = async (req, res) => {
  const { sport, occupancy } = req.body;

  try {
    const facility = await Facility.findOne({ name: sport });
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    facility.currentOccupancy = occupancy;
    await facility.save();
    res.status(200).json({ message: 'Occupancy updated successfully', facility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check-in functionality
export const checkIn = async (req, res) => {
  const { name, rollNumber, sport } = req.body;

  try {
    const facility = await Facility.findOne({ name: sport });
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    if (facility.currentOccupancy >= facility.maxOccupancy) {
      return res.status(400).json({ message: 'Facility is full' });
    }

    facility.currentOccupancy += 1;
    facility.checkedInStudents.push({ name, rollNo: rollNumber });

    await facility.save();
    res.status(200).json({ message: 'Check-in successful', facility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check-out functionality
export const checkOut = async (req, res) => {
  const { studentId, sport } = req.params;

  try {
    
      const facility = await Facility.findOne({ name: sport });
      if (!facility) {
        return res.status(404).json({ message: 'Facility not found' });
      }
  
      // Find the student in the checkedInStudents array
      const studentIndex = facility.checkedInStudents.findIndex(
        (student) => student._id.toString() === studentId
      );
  
      if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Update current occupancy and remove the student
      facility.currentOccupancy -= 1;
      facility.checkedInStudents.splice(studentIndex, 1); // Remove the student from the array

    await facility.save();
    res.status(200).json({ message: 'Check-out successful', facility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get check-ins for all facilities
export const getCheckIns = async (req, res) => {
  try {
    const facilities = await Facility.find().select('name checkedInStudents');
    res.status(200).json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
