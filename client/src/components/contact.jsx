import React, { useState } from "react";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>We'd love to hear from you. Please fill out this form.</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <CiLocationOn size={24} />
              <div>
                <h3>Address</h3>
                <p>1 RBK, Bloc B24, Elgazala Technopark,</p>
                <p>Raoued, Arianna, 2088 Arianna Tunisie.</p>
              </div>
            </div>

            <div className="contact-item">
              <CiPhone size={24} />
              <div>
                <h3>Phone</h3>
                <p>+216 20 25 25</p>
              </div>
            </div>

            <div className="contact-item">
              <CiMail size={24} />
              <div>
                <h3>Email</h3>
                <p>CoolStore@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
                rows="5"
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
