import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
//import signupImage from "../assets/signup-image.jpeg";


const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // (can be stored separately)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = username && email && password;

  const handleSignup = async () => {
    try {
      if (!isFormValid) {
        alert("Please fill all fields");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <div className="form">
          <h2>Create Your FitGenix Account</h2>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignup} disabled={!isFormValid}>
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Signup;
