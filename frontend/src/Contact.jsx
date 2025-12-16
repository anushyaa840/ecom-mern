import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${form.name}, your message has been sent!`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
        <button className="btn" type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
