import React from 'react';
import './CustomerDetails.css'; // Assume you have a CSS file for styling

const CustomerDetails = ({ customer, onBack }) => {
  if (!customer) {
    return <p>No customer selected.</p>;
  }

  // Mock addresses for the customer
  const addresses = [
    { id: 101, street: '123 Main St', city: 'Anytown', zip: '12345' },
    { id: 102, street: '456 Oak Ave', city: 'Otherville', zip: '67890' },
  ];

  return (
    <>
    <div className="customer-details-container">
      <button onClick={onBack} className="back-button">← Back to List</button>
      <h2>Customer Details</h2>
      <div className="details-card">
        <h3>{customer.name}</h3>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Status:</strong> <span className={`status ${customer.status.toLowerCase()}`}>{customer.status}</span></p>
      </div>

      <div className="addresses-section">
        <h3>Addresses</h3>
        {addresses.length > 0 ? (
          <ul className="address-list">
            {addresses.map(address => (
              <li key={address.id} className="address-item">
                <p>{address.street}</p>
                <p>{address.city}, {address.zip}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No addresses found for this customer.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default CustomerDetails;