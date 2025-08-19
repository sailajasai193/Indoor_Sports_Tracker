// AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import '../Styles/AdminCheckInOut.css';

function AdminPage() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [sport, setSport] = useState('Badminton');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    
    try {

      const response = await axios.get('http://localhost:5000/api/facilities/checkins');
      const checkInData = response.data
        .flatMap((facility) =>
          facility.checkedInStudents.map((student) => ({
            ...student,
            sport: facility.name,
          }))
        );
      setStudents(checkInData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCheckIn = async () => {
    if (!name || !rollNumber || !sport) {
      alert("Please fill in all details before checking in.");
      return;
    }
    const existingCheckIn = students.find(
      (student) => student.rollNo === rollNumber
    );
  
    if (existingCheckIn) {
      if (existingCheckIn.sport === sport) {
        alert("You are already checked into this court.");
      } else {
        alert(
          `You are already checked into ${existingCheckIn.sport}. Please check out before checking into a new court.`
        );
      }
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/facilities/checkin', {
        name,
        rollNumber,
        sport,
      });
      alert("Successfully checked in.");
      setName('');
      setRollNumber('');
      fetchStudents();
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (studentId, sport) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/facilities/checkout/${studentId}/${sport}`
      );
  
      // Assuming the API returns a success message or status
      if (response.status === 200) {
        alert("Successfully checked out.");
        fetchStudents(); // Refresh the student list after checkout
      } else {
        alert("Failed to check out. Please try again.");
      }
    } catch (error) {
      console.error('Error checking out:', error);
      alert("Error occurred during checkout. Please try again.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Check-In/Check-Out</h2>

      <div className="check-in-out-carousel">
        <Slider {...settings}>
          <div className="section check-in-section">
            <h3>Check In</h3>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rollNumber">Roll Number</label>
              <input
                id="rollNumber"
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="sport">Sport</label>
              <select
                id="sport"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
              >
                <option value="Badminton">Badminton</option>
                <option value="Table Tennis">Table Tennis</option>
                <option value="Squash">Squash</option>
                <option value="Gym">Gym</option>
                <option value="FoosBall">Foos Ball</option>
              </select>
            </div>
            <button className="submit-button" onClick={handleCheckIn}>
              Check In
            </button>
          </div>

          <div className="section check-out-section">
            <h3>Check Out</h3>
            <div className="student-list">
              {students.map((student) => (
                <div key={student._id} className="student-item">
                  <p>
                    {student.name} ({student.rollNo}) - {student.sport}
                  </p>
                  <button
                    className="checkout-button"
                    onClick={() => handleCheckOut(student._id, student.sport)}
                  >
                    Check Out
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default AdminPage;

