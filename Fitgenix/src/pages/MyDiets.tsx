import React, { useEffect, useState } from "react";
import "../Styles/mydiets.css";
interface FoodItem {
  food: string;
  calories: number;
  proteins: number;
}

interface Plan {
  morning: FoodItem[];
  snack_morning: FoodItem[];
  lunch: FoodItem[];
  snack_evening: FoodItem[];
  dinner: FoodItem[];
}

interface Diet {
  _id: string;
  name: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  workout: string;
  weight_change: number;
  calories: number;
  plan: Plan;
  createdAt: string;
}

const MyDiets: React.FC = () => {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/diets")
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mydiets-container">
      <h2 className="mydiets-title">My Fitness Journey</h2>

      {diets.length === 0 ? (
        <div className="mydiets-empty">
          <i className="fas fa-dumbbell" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffdf00' }}></i>
          <p>No diets saved yet. Start your fitness journey by creating a new diet plan!</p>
        </div>
      ) : (
        diets.map((diet) => (
          <div
            key={diet._id}
            className="diet-card"
            onClick={() => toggleExpand(diet._id)}
          >
            <h3>
              <span>{diet.name}</span>
              <span className="meal-badge">{diet.workout}</span>
            </h3>
            
            <div className="diet-info">
              <span>
                <i className="fas fa-fire"></i>
                {diet.calories} kcal
              </span>
              <span>
                <i className="fas fa-calendar"></i>
                {new Date(diet.createdAt).toLocaleDateString()}
              </span>
              <span>
                <i className="fas fa-weight"></i>
                {diet.workout === "bulking" ? "+" : "-"}{diet.weight_change} kg goal
              </span>
            </div>

            {expandedId === diet._id && (
              <div className="FoodPlanTable-container expand-animation">
                <table className="FoodPlanTable">
                  <thead>
                    <tr>
                      <th>Meal Type</th>
                      <th>Food Items</th>
                      <th>Calories</th>
                      <th>Proteins (g)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(diet.plan).map(([meal, items]) =>
                      (items as FoodItem[]).map((food, fIdx) => (
                        <tr key={`${diet._id}-${meal}-${fIdx}`}>
                          <td>{meal.replace(/_/g, ' ')}</td>
                          <td>{food.food}</td>
                          <td>{food.calories}</td>
                          <td>{food.proteins}g</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyDiets;
