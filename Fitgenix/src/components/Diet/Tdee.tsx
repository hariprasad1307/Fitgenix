import React, { useEffect, useMemo } from "react";
import "../../Styles/diet.css";

interface TdeeProps {
  height: string;
  weight: string;
  age: string;
  gender: string;
  workout: string; // 'bulking' or 'weight_loss'
  change: string;  // kg per month
  onCaloriesCalculated: (calories: number) => void;
}

const Tdee: React.FC<TdeeProps> = ({
  height,
  weight,
  age,
  gender,
  workout,
  change,
  onCaloriesCalculated,
}) => {
  const h = parseFloat(height || "0");
  const w = parseFloat(weight || "0");
  const a = parseInt(age || "0", 10);
  const c = Math.min(4, Math.abs(parseFloat(change || "0")));

  const { bmr, tdee, targetCalories } = useMemo(() => {
    if (!h || !w || !a) return { bmr: 0, tdee: 0, targetCalories: 0 };

    const calcBmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const assumedActivityFactor = 1.55;
    const calcTdee = calcBmr * assumedActivityFactor;

    const dailyKcalChange = (c * 7700) / 30;
    const calcTarget =
      workout === "bulking"
        ? calcTdee + dailyKcalChange
        : calcTdee - dailyKcalChange;

    return { bmr: calcBmr, tdee: calcTdee, targetCalories: Math.round(calcTarget) };
  }, [h, w, a, gender, workout, c]);

  useEffect(() => {
    if (targetCalories && typeof onCaloriesCalculated === "function") {
      onCaloriesCalculated(targetCalories);
    }
  }, [targetCalories, onCaloriesCalculated]);

  return (
    <div className="InfoCard">
      <h3>Total Daily Energy Expenditure (TDEE)</h3>
      <p>Maintenance Calories: {tdee ? Math.round(tdee) : "—"} kcal/day</p>
      <p>
        Target Calories for {workout === "bulking" ? "Bulking" : "Weight Loss"}:{" "}
        {targetCalories ? targetCalories : "—"} kcal/day
      </p>
      <p>BMR: {bmr ? Math.round(bmr) : "—"} kcal/day</p>
    </div>
  );
};

export default Tdee;
