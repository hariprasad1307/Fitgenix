import React from "react";
import "../../Styles/diet.css";

interface BmrProps {
  height: string;
  weight: string;
  age: string;
  gender: string;
}

const Bmr: React.FC<BmrProps> = ({ height, weight, age, gender }) => {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  const a = parseInt(age);

  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * w + 6.25 * h - 5 * a + 5;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * a - 161;
  }

  return (
    <div className="InfoCard">
      <h3>Basal Metabolic Rate (BMR)</h3>
      <p>{bmr.toFixed(0)} kcal/day</p>
    </div>
  );
};

export default Bmr;
