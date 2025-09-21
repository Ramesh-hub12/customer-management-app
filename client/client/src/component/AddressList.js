import React, { useState, useEffect } from 'react';
import AddressForm from './AddressForm'; 

const API_BASE_URL = 'http://localhost:5000/api/customers';

const AddressList = ({ customerId }) => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [view, setView] = useState('list'); 

  useEffect(() => {
    if (customerId) {
      fetchAddresses();
    }
  }, [customerId]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${customerId}/addresses`);
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error('Failed to fetch addresses');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setView('form');
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchAddresses(); // Re-fetch addresses to update the list
      } else {
        console.error('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSave = () => {
    setView('list');
    setEditingAddress(null);
    fetchAddresses(); // Refresh the list after saving
  };

  const handleCancel = () => {
    setView('list');
    setEditingAddress(null);
  };

  if (view === 'form') {
    return (
      <AddressForm
        customerId={customerId}
        address={editingAddress}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="address-list-container">
      <h3>Addresses</h3>
      <button onClick={() => setView('form')} className="add-button">
        + Add New Address
      </button>
      {addresses.length > 0 ? (
        <ul className="address-list">
          {addresses.map(address => (
            <li key={address.id} className="address-item">
              <div className="address-details">
                <p>{address.address_details}</p>
                <p>{address.city}, {address.state}, {address.pin_code}</p>
              </div>
              <div className="address-actions">
                <button onClick={() => handleEdit(address)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(address.id)} className="delete-button">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No addresses found for this customer.</p>
      )}
    </div>
  );
};

export default AddressList;