import React, { useState } from "react";
import Bmi from "../components/Diet/Bmi";
import Bmr from "../components/Diet/Bmr";
import Tdee from "../components/Diet/Tdee";
import Dietdata from "../components/Diet/Dietdata";
import "../styles/diet.css";

const Diet = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_TYPESCRIPT_URI;
  const pythonApiUrl = import.meta.env.VITE_BACKEND_PYTHON_URI;

  const [dietName, setDietName] = useState("");
  const [dietHeight, setDietHeight] = useState("");
  const [dietWeight, setDietWeight] = useState("");
  const [dietAge, setDietAge] = useState("");
  const [dietGender, setDietGender] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [weightChange, setWeightChange] = useState("");
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [targetCalories, setTargetCalories] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const setdata = (
    name: string,
    height: string,
    weight: string,
    age: string,
    gender: string,
    workout: string,
    change: string
  ) => {
    setDietName(name);
    setDietHeight(height);
    setDietWeight(weight);
    setDietAge(age);
    setDietGender(gender);
    setWorkoutType(workout);
    setWeightChange(change);
    setVisible(true);
  };

  const generateFood = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${pythonApiUrl}/recommend?calories=${targetCalories}`
      );
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };
  const saveDiet = async () => {
  if (!recommendations) return;
  try {
    setSaving(true);
    const res = await fetch(`${apiUrl}/diets/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: dietName,
        height: dietHeight,
        weight: dietWeight,
        age: dietAge,
        gender: dietGender,
        workout: workoutType,
        weight_change: weightChange,
        calories: targetCalories,
        plan: recommendations.recommendations,
      }),
    });

    const data = await res.json();
    alert(data.message || "Diet plan saved!");
  } catch (err) {
    console.error("Error saving diet:", err);
    alert("Failed to save diet plan.");
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="DietContainer">
      {/* Two Column Layout */}
      <div className="DietMain">
        {/* Left: Form */}
        <Dietdata senddata={setdata} />

        {/* Right: Results */}
        {visible && (
          <div className="DietResults">
            <h2 style={{ color: "#ffdf00" }}>Diet Plan for {dietName}</h2>

            <Bmi height={dietHeight} weight={dietWeight} />
            <Bmr
              height={dietHeight}
              weight={dietWeight}
              age={dietAge}
              gender={dietGender}
            />
            <Tdee
              height={dietHeight}
              weight={dietWeight}
              age={dietAge}
              gender={dietGender}
              workout={workoutType}
              change={weightChange}
              onCaloriesCalculated={setTargetCalories}
            />
          </div>
        )}
      </div>

      {/* Generate Food Button */}
      {visible && (
        <button onClick={generateFood} className="GenerateButton">
          {loading ? "Generating..." : "Generate Food Plan"}
        </button>
      )}

      {/* Food Plan Table */}
      {recommendations && (
        <>
        <table className="FoodPlanTable">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Food</th>
              <th>Calories</th>
              <th>Proteins (g)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(recommendations.recommendations).map(
              ([meal, items]: any) =>
                items.map((item: any, idx: number) => (
                  <tr key={`${meal}-${idx}`}>
                    <td>{meal.replace("_", " ")}</td>
                    <td>{item.food}</td>
                    <td>{item.calories}</td>
                    <td>{item.proteins}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        <button onClick={saveDiet} className="GenerateButton">
            {saving ? "Saving..." : "Save Diet"}
          </button>
        </>
      )}
    </div>
  );
};

export default Diet;
