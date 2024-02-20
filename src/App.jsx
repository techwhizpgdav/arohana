import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './Pages/NavbarPage';
import Home from './Pages/HomePage';
import Footer from './Pages/FooterPage';
import CompetitionDetailsPage from './Components/Events/CompetitionDetailsPage';
import EventByCategories from './Components/Events/EventByCategories';
import Teams from './Pages/TeamsPage';
import Sponsors from './Pages/SponsorsPage';
import Timeline from './Pages/TimelinePage';
import LoginPage from './Pages/LoginPage';
import Signup from './Components/Signup/Signup';
import Tutorial from './Components/Tutorial/Tutorial';
import Tutorial2 from './Components/Tutorial/Tutorial2';
import Thanks from './Components/Thanks/Thanks';
import Verify from './Components/Verify/Verify';
import Dashboard from '../src/Pages/DashBoardPage';
import RegistrationForm from './Components/RegisterEvents/RegisterForm';
import Categories from './Components/Events/Categories';


const AppLayout = () => (
  <div>
    <Navbar />
    <div className='min-h-screen'>
      <Outlet />
    </div>
    <Footer />
  </div>
)

const appRouters = () => (
  <Router  basename='/'>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />} />
        <Route path="sponsors" element={<Sponsors />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="registration" element={<Tutorial />} />
        <Route path="tutorial" element={<Tutorial2 />} />
        <Route path="thanks" element={< Thanks />} />
        <Route path="verify" element={<  Verify />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="event-registration" element={<RegistrationForm />} />
        <Route path='categories' element={<Categories />} />
        <Route path="categories/:id/:name" element={<EventByCategories />} />
        <Route path="competition/:id" element={<CompetitionDetailsPage />} />
        <Route path="*" element={<Home />} />

      </Route>
    </Routes>
  </Router>
)

export default appRouters;