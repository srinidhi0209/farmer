import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");

    alert("Thank you for your feedback! ");
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Email: support@farmtohome.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>Address: Farm Market Road, Hyderabad</p>

      <h2 style={{ marginTop: "30px" }}>Send Us Your Feedback</h2>
      {!submitted ? (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Message</label>
          <textarea
            placeholder="Write your feedback here..."
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      ) : (
        <p className="thank-you"> Thanks for your feedback! We’ll get back soon.</p>
      )}
    </div>
  );
}

export default Contact;
