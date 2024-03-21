import React, { useEffect, useState } from 'react';
import '../SubmissionList.css';
import { useHistory, useNavigate } from 'react-router-dom';

const StudentPortal = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeCorrespoding, setAgreeCorrespoding] = useState(false);
  const [areaOfInterest, setAreaOfInterest] = useState('developer');
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  const emailValidation = (email) => {
    console.log(email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLocation(`${latitude},${longitude}`);
        },
        error => {
          console.log("🚀 ~ getLocation ~ error:", error)
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation
    if (!fullName) {
      alert('Please fill the full name');
      return;
    }else if(!email && emailValidation(email)) {
      alert('Please fill the valid email');
      return
    }else if (!emailValidation(email)) {
      alert('Invalid email address');
      return;
    } else if(!dob) {
      alert('Please fill the date of birth');
      return
    }
  
    const dobDate = new Date(dob);
    const today = new Date();
    const minDobDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  
    if (dobDate > minDobDate) {
      alert('Date of birth must be at least 16 years ago');
      return;
    }
  
    // Data object with form fields
    const data = {
      prospect: {
        full_name: fullName,
        email: email,
        date_of_birth: dob,
        subject_area: areaOfInterest,
        marketing_updates: agreeMarketing,
        correspondence_in_welsh: agreeCorrespoding, 
        gps_location: currentLocation ? currentLocation : "Location not provided" 
      }
    };
  

    fetch('http://localhost:3000/prospects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert('Student Details Submitted Successfully');
        console.log('User data sent successfully');
        setTimeout(() => {
            navigate('/dashboard'); // Redirect to '/dashboard'
          }, 1000);
        // Reset the form after successful submission
        setFullName('');
        setEmail('');
        setDob('');
        setAgreeMarketing(false);
        setAgreeCorrespoding(false);
        setAreaOfInterest('developer');
      } else {
        alert('Failed to send user data');
      }
    })
    .catch(error => {
      alert('Form submission failed')
      alert('Error sending user data:', error);
    });
  };
  
  return (
    <div className="user-registration-form" style={{ marginTop: '5rem' }}>
      <h2 className='text-2xl font-bold'>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <br />
        <label>
          Area of Interest:
          <select value={areaOfInterest} onChange={(e) => setAreaOfInterest(e.target.value)}>
          <option value="">Select an Area of Interest</option>
          <option value="Business and Management">Business and Management</option>
          <option value="Engineering and Technology">Engineering and Technology</option>
          <option value="Arts and Humanities">Arts and Humanities</option>
          <option value="Sciences and Mathematics">Sciences and Mathematics</option>
          <option value="Social Sciences">Social Sciences</option>
          <option value="Education and Teaching">Education and Teaching</option>
          <option value="Health Sciences">Health Sciences</option>
          <option value="Law and Legal Studies">Law and Legal Studies</option>
          <option value="Creative Industries">Creative Industries</option>
          <option value="Computing and IT">Computing and IT</option>
          </select>
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={agreeMarketing}
            onChange={(e) => setAgreeMarketing(e.target.checked)}
          />
          Do you agree to receive marketing updates?
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={agreeCorrespoding}
            onChange={(e) => setAgreeCorrespoding(e.target.checked)}
          />
          Do you want correspondence in Welsh?
        </label>
        <br />
        <button className='bg-red-500 text-white p-2 rounded' type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default StudentPortal;