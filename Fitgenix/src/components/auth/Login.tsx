import React, { useState } from 'react';
import '../../Styles/auth.css';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  islogin: boolean;
  setislogin:(value:boolean)=>void;
  setAuth: (auth: boolean) => void;
}


const Login:React.FC<LoginProps> = ({ islogin, setislogin, setAuth }) => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_TYPESCRIPT_URI;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', emailLogin, 'Password:', passwordLogin);
    console.log('API URL:', apiUrl);
    // Navigate to the dashboard or another page on successful login
    fetch(`${apiUrl}/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailLogin,
        password: passwordLogin
      })
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      return data;
    })
    .then((data) => {
      console.log(data);
      setAuth(true);  
      navigate('/');
    })
    .catch((err) => {
      alert(err.message);
    });


  };

  return (
    <div className='LoginContainer'>
      <div className='LoginTitle'>LOGIN FITGENIX</div>
      <form onSubmit={handleSubmit}>
        <div className='InputGroup'>
          <input
            type='email'
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            required
          />
          <label className={emailLogin ? 'Active' : ''}>Email</label>
        </div>

        <div className='InputGroup'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            required
          />
          <label className={passwordLogin ? 'Active' : ''}>Password</label>
          <span
            className='EyeIcon'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <input type='submit' value='Login' className='SubmitButton' onClick={handleSubmit} />
      </form>

      <div className='LoginLinks'>
        <p>
          Didn't register? <span className='LinkText' onClick={()=>{setislogin(false)}}>Signup here</span>
        </p>
        <p>
          <span className='LinkText'>Forgot Password?</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
