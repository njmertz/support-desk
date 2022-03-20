import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';
import AllTickets from './pages/AllTickets';
import Ticket from './pages/Ticket';
import Users from './pages/Users';
import User from './pages/User';

function App() {
  return <>
  <Router>
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-ticket" element={<PrivateRoute />}>
          <Route path='/new-ticket' element={<NewTicket />} />
        </Route>
        <Route path="/tickets" element={<PrivateRoute />}>
          <Route path='/tickets' element={<Tickets />} />
        </Route>
        <Route path="/tickets/all" element={<PrivateRoute />}>
          <Route path='/tickets/all' element={<AllTickets />} />
        </Route>        
        <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
          <Route path='/ticket/:ticketId' element={<Ticket />} />
        </Route> 
        <Route path="/users" element={<PrivateRoute/>}>
          <Route path="/users" element={<Users />} />
        </Route> 
        <Route path="/user/:userId" element={<PrivateRoute/>}>
          <Route path="/user/:userId" element={<User />} />
        </Route>             
      </Routes>
    </div>
  </Router>
  <ToastContainer />
  </>;
}

export default App;
