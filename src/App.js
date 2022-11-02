import './App.css';
import Footer from './containers/Footer';
import NavBar from './containers/NavBar';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';
import Users from './components/Users';
import Invoices from './components/Invoices';
import Clients from './components/Clients';
import Profiles from './components/Profiles';
import Logout from './components/Logout';

function App() {
  return (
    <div className="App">
      <h1>A2Z INVOICE GENERATOR</h1>
      <NavBar />
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Invoices" element={<Invoices />} />
      <Route exact path="/Clients" element={<Clients />} />
      <Route exact path="/Users" element={<Users />} />
      <Route exact path="/Profiles" element={<Profiles />} />      
      <Route exact path="/Signup" element={<Signup />} />
      <Route exact path="/Logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
