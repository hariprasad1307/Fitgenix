import {useState} from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Hero from './pages/Hero'
import { Navigate } from 'react-router-dom';
import Diet from "./pages/Diet";
import MyDiets from "./pages/MyDiets";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AppLayout from './Layout/AppLayout';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Hero page */}
        <Route path="/hero" element={<Hero setAuth={setIsAuthenticated} />} />

        {/* Protected Layout */}
        {isAuthenticated ? (
          <Route element={<AppLayout setAuth={setIsAuthenticated} />}>
            <Route path="/" element={<Diet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mydiets" element={<MyDiets />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/hero" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
