import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';
import CustomerForm from './CustomerForm';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import './App.css'; // Main App styling

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/customers/new">Add Customer</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/customers/:id/edit" element={<CustomerForm />} />
            <Route path="/customers/:id/addresses" element={<AddressList />} />
            <Route path="/customers/:id/addresses/new" element={<AddressForm />} />
            <Route path="/customers/:id/addresses/:addressId/edit" element={<AddressForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;