import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
//import loginImage from "../assets/login-image.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email && password;


  
  const handleLogin = async () => {
    try {
      if (!isFormValid) {
        alert("Please fill all fields");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/home");// You can redirect to home/dashboard
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      
      <div className="form-section">
        <div className="form">
          <h2>Welcome to FitGenix</h2>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} disabled={!isFormValid}>
            Login
          </button>
          <br/>
          <p>
            Don’t have an account?{" "}
            <span className="link" onClick={() => navigate("/signup")}>Sign Up</span>
          <br></br>
            Forgot Password?{" "}
            <span className="link" onClick={() => navigate("/forgot-password")}>Reset </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
