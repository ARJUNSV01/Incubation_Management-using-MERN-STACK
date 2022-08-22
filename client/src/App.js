import React from 'react';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminLogin from './components/AdminLogin';
import AdminDetailsContext from './contexts/AdminContext';
import UserDetailsContext from './contexts/UserContext';
import AdminBookingSlotsPage from './pages/AdminBookingSlotsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RecordTrackPage from './pages/RecordTrackPage';
import UserHomePage from './pages/UserHomePage';
import UserLoginPage from './pages/UserLoginPage';
import UserProcessingPage from './pages/UserProcessingPage';
import UserSignUpPage from './pages/UserSignUpPage';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <UserDetailsContext>
     <Routes>
       <Route exact path='/' element={<UserLoginPage/>}/>
       <Route path='/signup' element={<UserSignUpPage/>}/>
       <Route path='/home' element={<UserHomePage/>}/>
       <Route path ='/processing' element={<UserProcessingPage/>}/>
     </Routes>
     </UserDetailsContext>
     <AdminDetailsContext>
     <Routes>
     <Route path='/admin/dashboard' element={<AdminDashboardPage/>} />
     <Route path='/admin' element={<AdminLogin/>}/>
     <Route path='/admin/recordlist' element={<RecordTrackPage/>}/>
     <Route path='/admin/bookingslots' element={<AdminBookingSlotsPage/>}/>
     </Routes>
     </AdminDetailsContext>
     </BrowserRouter>
    </div>
  );
}

export default App;
