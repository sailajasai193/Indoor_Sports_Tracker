import React from 'react';
import '../Styles/About.css';

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About Our Website</h2>
            <div className="about-data">
                <div className="about-feature">
                    <h3>Secure Access</h3>
                    <p>SportTrack offers a secure login system for both administrators and users with role-based access control, ensuring data privacy and control.</p>
                </div>
                <div className="about-feature">
                    <h3>Real-time Occupancy</h3>
                    <p>Stay informed with live updates on facility availability and current occupancy status, allowing you to make informed decisions about your activities.</p>
                </div>
                <div className="about-feature">
                    <h3>Efficient Management</h3>
                    <p>Our easy check-in/check-out system simplifies facility management for administrators, enabling them to optimize usage and resources.</p>
                </div>
            </div>
            <div className="contact-details">
                <p>Contact Us: sports@iitdh.ac.in | Phone: +1 234 567 890</p>
            </div>
        </div>
    );
}

export default About;
