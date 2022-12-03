import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Footer from './components/Footer';

import Home from './containers/Home'
import Invoices from './containers/Invoices';
import InvoiceDetails from './containers/InvoiceDetails';
import InvoiceCreate from './containers/InvoiceCreate';
import InvoiceEdit from './containers/InvoiceEdit';
import Clients from './containers/Clients';
import ClientCreate from './containers/ClientCreate';
import ClientEdit from './containers/ClientEdit'
import ProfileEdit from './containers/ProfileEdit';
import Header from './components/Header';

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();

  console.warn(user)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect()
    }
  }, [isAuthenticated, isLoading])

  if (isLoading || !isAuthenticated) {
    return (
      <div className='flex grow h-screen justify-center content-center  animate-pulse'><p className='text-center m-auto text-4xl'>Loading...</p></div>
    )
  }

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/invoices" element={<Invoices />} />
          <Route exact path="/invoices/create" element={<InvoiceCreate />} />
          <Route path="/invoices/:invoiceid" element={<InvoiceDetails />} />
          <Route path="/invoices/:invoiceid/edit" element={<InvoiceEdit />} />

          <Route exact path="/clients" element={<Clients />} />
          <Route exact path="/clients/create" element={<ClientCreate />} />
          <Route exact path="/clients/:clientid/edit" element={<ClientEdit />} />

          <Route exact path="/profile" element={<ProfileEdit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
