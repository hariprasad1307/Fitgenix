import React, { useState } from 'react';
import '../../Styles/auth.css';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  islogin: boolean;
  setislogin: (value: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({ islogin, setislogin }) => {
  const [name, setName] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_TYPESCRIPT_URI;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordSignup !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('API URL:', apiUrl);

    fetch(`${apiUrl}/auth/register`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:name,
        email: emailSignup,
        phonenumber: phoneNumber,
        gender: gender,
        password: passwordSignup
      })
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      return data;
    })
    .then((data) => {
      console.log(data);
      alert('Registration Successful!');
      navigate('/login');  // ✅ navigate only if success
    })
    .catch((err) => {
      alert(err.error);  // ❌ show error in alert if failed
    });
  };

  return (
    <div className='LoginContainer'>
      <div className='LoginTitle'>SIGNUP FITGENIX</div>
      <form onSubmit={handleSubmit}>
        <div className='InputGroup'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className={name ? 'Active' : ''}>Name</label>
        </div>

        <div className='InputGroup'>
          <input
            type='email'
            value={emailSignup}
            onChange={(e) => setEmailSignup(e.target.value)}
            required
          />
          <label className={emailSignup ? 'Active' : ''}>Email</label>
        </div>

        <div className='InputGroup'>
          <input
            type='tel'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label className={phoneNumber ? 'Active' : ''}>Phone Number</label>
        </div>

        <div className=' GenderGroup'>
          <label>Gender:</label>
          <div className='GenderOptions'>
            <label>
              <input
                type='radio'
                name='gender'
                value='Male'
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>

            <label>
              <input
                type='radio'
                name='gender'
                value='Female'
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>

            <label>
              <input
                type='radio'
                name='gender'
                value='Other'
                checked={gender === 'Other'}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>

        <div className='InputGroup'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={passwordSignup}
            onChange={(e) => setPasswordSignup(e.target.value)}
            required
          />
          <label className={passwordSignup ? 'Active' : ''}>Password</label>
          <span
            className='EyeIcon'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className='InputGroup'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label className={confirmPassword ? 'Active' : ''}>Confirm Password</label>
          <span
            className='EyeIcon'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <input type='submit' value='Signup' className='SubmitButton' />
      </form>

      <div className='LoginLinks'>
        <p>
          Already have an account?{' '}
          <span className='LinkText' onClick={() => setislogin(true)}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;