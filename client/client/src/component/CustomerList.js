import React, { useState, useEffect } from 'react';


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchCustomers(searchTerm);
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchTerm, customers]);

  // Fetches all customers
  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers/');
      const data = await response.json();
      console.log(data)
      const updateData =  data => ({
        firstName: data.first_name,
        lastNameName: data.last_name,
        PhoneNumber: data.phone_number,
    })
      setCustomers(updateData);
      setFilteredCustomers(updateData);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  //Searches for customers based on a query
  const searchCustomers = async (query) => {
    try {
      const response = await fetch('http://localhost:5000/api/customers/');;
      const data = await response.json();
      setFilteredCustomers(data);
    } catch (error) {
      console.error('Error searching customers:', error);
    }
  };

  return (
    <div className="customer-list-container">
      <h1>Customer List</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
       <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;


