import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import HeroLogo from '../assets/herologo.jpg';
import '../Styles/auth.css';

const Hero = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className='HeroContainer'
      style={{
        backgroundImage: `url(${HeroLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLogin ? <Login islogin={isLogin} setislogin={setIsLogin} /> : <Signup islogin={isLogin} setislogin={setIsLogin} />}
      
      
    </div>
  );
};

export default Hero;
