import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PageProfile from "./components/profile/PageProfile";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Login />}/>
              <Route path="register" element={<Register />}/>
              <Route path="/home/:id" element={<Dashboard />}/>
              <Route path="/users/:id" element={<PageProfile />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
