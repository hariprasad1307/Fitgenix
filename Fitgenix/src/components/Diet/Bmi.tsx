import React from "react";
import "../../Styles/diet.css";

interface BmiProps {
  height: string;
  weight: string;
}

const Bmi: React.FC<BmiProps> = ({ height, weight }) => {
  const h = parseFloat(height) / 100;
  const w = parseFloat(weight);
  const bmi = (w / (h * h)).toFixed(2);
  const idealMin = (18.5 * h * h).toFixed(1);
  const idealMax = (24.9 * h * h).toFixed(1);

  return (
    <div className="InfoCard">
      <h3>Body Mass Index (BMI)</h3>
      <p>BMI: {bmi}</p>
      <p>
        Ideal Weight Range: {idealMin}kg - {idealMax}kg
      </p>
    </div>
  );
};

export default Bmi;
