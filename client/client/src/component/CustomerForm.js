import React, { useState, useEffect } from 'react';
import './CustomerForm.css'; // Assuming you have a CSS file for styling

const API_BASE_URL = 'http://localhost:5000/api';

const CustomerForm = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  // Use useEffect to pre-populate form for editing
  useEffect(() => {
    if (customer) {
      // Set form data with existing customer details
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        phoneNumber: customer.phoneNumber || '',
      });
    } else {
      // Reset form for a new customer
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (customer && customer.id) {
        // Handle PUT request for editing an existing customer
        await fetch(`${API_BASE_URL}/customers/${customer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Handle POST request for creating a new customer
        await fetch(`${API_BASE_URL}`/customers, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      onSave(); // Call the onSave function to update the list or navigate away
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const formTitle = customer ? 'Edit Customer' : 'Create New Customer';

  return (
    <div className="customer-form-container">
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">Save</button>
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
