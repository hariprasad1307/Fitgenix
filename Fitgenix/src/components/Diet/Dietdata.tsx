import React, { useState } from "react";
import "../../Styles/diet.css";

interface DietdataProps {
  senddata: (
    name: string,
    height: string,
    weight: string,
    age: string,
    gender: string,
    workout: string,
    change: string
  ) => void;
}

const Dietdata: React.FC<DietdataProps> = ({ senddata }) => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [workout, setWorkout] = useState("bulking");
  const [change, setChange] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(change) > 4) {
      alert("Max weight change allowed is 4kg/month");
      return;
    }
    senddata(name, height, weight, age, gender, workout, change);
  };

  return (
    <div className="DietFormContainer">
      {/* Title + Tagline */}
      <h2 className="DietFormTitle">🍽 Create your Personalized Diet Form</h2>
      <p className="DietFormTagline">
        “Fuel your body, not just fill it – discover your perfect balance ✨”
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="DietForm">
        <input
          type="text"
          placeholder="Person's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select value={workout} onChange={(e) => setWorkout(e.target.value)}>
          <option value="bulking">Bulking</option>
          <option value="weight_loss">Weight Loss</option>
        </select>

        <input
          type="number"
          placeholder="Weight Change (kg/month)"
          value={change}
          onChange={(e) => setChange(e.target.value)}
          required
        />

        <button type="submit" className="SubmitButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dietdata;
