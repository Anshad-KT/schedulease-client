

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Create from './Pages/Create/Create';
import Room from './Pages/Room/Room';
import Join from './Pages/Join/Join';
import {UserProtectedRouter,UserProtectedRouterAuthentication} from './Services/protectedRoute';
import Login from './Pages/Login/Login';
import End from './Pages/End/End';
import Confirmation from './Pages/Confirmation/Confirmation';
function App() {
  return (
    <>
    <Router>
      <Routes>
    
       <Route path='/signup' element={ <UserProtectedRouterAuthentication><Signup /></UserProtectedRouterAuthentication>} />
       <Route path='/login' element={ <UserProtectedRouterAuthentication><Login /></UserProtectedRouterAuthentication>} />
      <Route path='/' element={  <UserProtectedRouter><Home /></UserProtectedRouter>} />
       <Route path='/create' element={ <UserProtectedRouter><Create /></UserProtectedRouter>} />
        <Route path='/video/:roomId/:username' element={<Room />} />
        <Route path='/join/:roomId/:username' element={<Join />} />
        <Route path='/end' element={<End />} />
         <Route path='/confirm/:id/:userId' element={<Confirmation />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
