import './App.css';
import React, { Suspense } from 'react'
import { Route, Routes, Switch, BrowserRouter as Router, } from 'react-router-dom';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import Navbar from './components/Navbar';
const  Home  =  React.lazy(() => import('./pages/Home'));

const App = () => {

  return (
    <div style={{height:'100vh', background:'#62B6B7'}}>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Suspense fallback={<div style={{marginTop:100}}>Loading...</div>}>
            <Home />
          </Suspense>} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App