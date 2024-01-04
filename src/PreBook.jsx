import React, { useState } from 'react';
import validator from 'validator';
import TIGER from './images/tiger.png';

export default function PreBook() {
  const [user, setUser] = useState({
    fname: '',
    email: '',
    phone: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { fname, email, phone } = user;

      // Replace with your Formspree endpoint
      const targetURL = 'https://formspree.io/f/xgegeyyy';

      if (!validator.isEmail(email)) {
        window.alert('Invalid Email');
        return;
      }

      const res = await fetch(targetURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname,
          email,
          phone,
        }),
      });

      if (res.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.log(error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="container-prebook">
      <h1 className="heading-prebook">Pre-Book Your Slot</h1>
      {submissionStatus === 'success' ? (
        <p className="thank-you-message">Thank you for submitting the form!</p>
      ) : (
        <form>
          <div className="ui divider"></div>
          <div className="ui form">
            <p className="pre-heading">Fill out the following details to pre-booking of your slot!!!</p>
            <div className="field">
              <label>Name</label>
              <br />
              <input
                className="input-pre"
                type="text"
                onChange={handleInputs}
                value={user.fname}
                name="fname"
                placeholder="Enter Full-Name"
                required={true}
              />
            </div>
            <br />
            <div className="field">
              <label>Email</label>
              <br />
              <input
                className="input-pre"
                type="text"
                onChange={handleInputs}
                value={user.email}
                name="email"
                placeholder="Enter Email"
                required={true}
              />
            </div>
            <br />
            <div className="field">
              <label>Phone</label>
              <br />
              <input
                className="input-pre"
                type="text"
                onChange={handleInputs}
                value={user.phone}
                name="phone"
                placeholder="Phone Number"
                required={true}
              />
            </div>
            <div className="btn-btn">
              <button className="pre-btn" type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="make-in-india">
        <img src={TIGER} alt="made-in-india" className="make-in-india-img" />
      </div>
    </div>
  );
}
