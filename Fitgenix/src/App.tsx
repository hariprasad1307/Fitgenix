import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import Hero from './pages/Hero'
import Myprofile from './components/profile/myprofile';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/myprofile" element={<Myprofile />} />
        

      </Routes>
    </Router>
      
    </>
  )
}

export default App
