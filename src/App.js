import React, { useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Footer from './components/Footer';
import NavBar from './components/NavBar';

import Invoices from './containers/Invoices';
import InvoiceDetails from './containers/InvoiceDetails';
import InvoiceCreate from './containers/InvoiceCreate'
import Clients from './containers/Clients';
import ClientCreate from './containers/ClientCreate';
import Profiles from './containers/Profiles';


function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect()
    }
  }, [isAuthenticated, isLoading])

  if (isLoading || !isAuthenticated) {
    return (
      <div className='w-screen h-screen flex justify-center align-middle bg-sky-500'>
        <h1 className='m-auto text-6xl'>Loading...</h1>
      </div>
    )
  }

    return (
      <div className="min-h-screen flex flex-col bg-sky-500">
        <h1 className="text-4xl font-bold py-12 text-center">A2Z INVOICE GENERATOR</h1>
        <NavBar />
        <Routes>
          
        <Route exact path="/" element={<Invoices />} />
        <Route exact path="/invoices" element={<Invoices />} />
        <Route exact path="/invoices/create" element={<InvoiceCreate />} />
        <Route path="/invoices/:invoiceid" element={<InvoiceDetails />} />

        <Route exact path="/clients" element={<Clients />} />
        <Route exact path="/clients/create" element={<ClientCreate />} />

        <Route exact path="/profiles" element={<Profiles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
