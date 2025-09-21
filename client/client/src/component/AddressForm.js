import React, { useState, useEffect } from 'react';
// import './AddressForm.css'; // Assuming you have a CSS file for styling

const API_BASE_URL = 'http://localhost:5000/api';

const AddressForm = ({ customerId, address, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    address_details: '',
    city: '',
    state: '',
    pin_code: '',
  });

  // Use useEffect to pre-populate the form for editing an existing address
  useEffect(() => {
    if (address) {
      setFormData({
        address_details: address.address_details || '',
        city: address.city || '',
        state: address.state || '',
        pin_code: address.pin_code || '',
      });
    } else {
      // Reset form for adding a new address
      setFormData({
        address_details: '',
        city: '',
        state: '',
        pin_code: '',
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (address && address.id) {
        // Handle PUT request for editing an existing address
        await fetch(`${API_BASE_URL}/customers/${customerId}/addresses/${address.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Handle POST request for adding a new address
        await fetch(`${API_BASE_URL}/customers/${customerId}/addresses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      onSave(); // Call onSave to update the address list or navigate away
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const formTitle = address ? 'Edit Address' : 'Add New Address';

  return (
    <div className="address-form-container">
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address_details">Address Details</label>
          <input
            type="text"
            id="address_details"
            name="address_details"
            value={formData.address_details}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin_code">PIN Code</label>
          <input
            type="text"
            id="pin_code"
            name="pin_code"
            value={formData.pin_code}
            onChange={handleChange}
            required
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

export default AddressForm;