import React, { useState, useEffect } from 'react';
import './CustomerList.css'; // Assuming you have a CSS file for styling

// A mock API function to simulate fetching customer data
// In a real application, you'd fetch this from a backend
const fetchCustomers = () => {
  return [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', status: 'Active' },
    { id: 4, name: 'Mary Williams', email: 'mary.williams@example.com', status: 'Active' },
    { id: 5, name: 'David Brown', email: 'david.brown@example.com', status: 'Inactive' },
    { id: 6, name: 'Laura Garcia', email: 'laura.garcia@example.com', status: 'Active' },
    { id: 7, name: 'Robert Miller', email: 'robert.miller@example.com', status: 'Active' },
  ];
};

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // useEffect hook to fetch initial data on component mount
  useEffect(() => {
    const allCustomers = fetchCustomers();
    setCustomers(allCustomers);
    setFilteredCustomers(allCustomers);
  }, []); // The empty dependency array ensures this runs only once

  // useEffect hook to handle filtering whenever searchTerm or statusFilter changes
  useEffect(() => {
    const filtered = customers.filter(customer => {
      const matchesSearchTerm = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
      return matchesSearchTerm && matchesStatus;
    });
    setFilteredCustomers(filtered);
  }, [searchTerm, statusFilter, customers]);

  return (
    <div className="customer-list-container">
      <h1>Customer List</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <ul className="customer-list">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(customer => (
            <li key={customer.id} className="customer-item">
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p>{customer.email}</p>
              </div>
              <span className={`status ${customer.status.toLowerCase()}`}>
                {customer.status}
              </span>
            </li>
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </ul>
    </div>
  );
};

export default CustomerList;