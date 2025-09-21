import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CustomerList from './component/CustomerList.js';
// import CustomerDetails from './component/CustomerDetails.js';
import CustomerForm from './component/CustomerForm.js';
import AddressForm from './component/AddressForm.js';
import AddressList from './component/AddressList.js';
import './App.css'; 

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <nav className='header'>
            <Link to="/" className='home'>Home</Link>
            <Link to="/customers/new" className='add-customers'>Add Customer</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            {/* <Route path="/customers/:id" element={<CustomerDetails />} /> */}
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