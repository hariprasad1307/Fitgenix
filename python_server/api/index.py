# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.cluster import KMeans
import os
import pandas as pd
from mangum import Mangum


app = FastAPI()

# 👇 allow your React app (http://localhost:5173) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://fitgenix.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



BASE_DIR = os.path.dirname(os.path.abspath(__file__))

df = pd.read_csv(os.path.join(BASE_DIR, "../food.csv"))
df_exercises = pd.read_excel(
    os.path.join(BASE_DIR, "../Gym Exercises Dataset.xlsx"),
    sheet_name="Sheet1"
)

# ------------------ FOOD ENDPOINT ------------------
@app.get("/recommend")
def recommend(calories: int = 3200):
    meal_target = 850  
    snack_target = (calories - 3 * meal_target) // 2  

    recommendations = {
        "morning": [], "snack_morning": [],
        "lunch": [], "snack_evening": [], "dinner": []
    }
    used_foods = set()

    def pick_meal(meal_col, target):
        total = 0
        items = []
        choices = df[(df[meal_col] == 1) & (~df['Food_items'].isin(used_foods))].copy()
        choices = choices.sample(frac=1) 
        for _, row in choices.iterrows():
            if total + row['Calories'] > target + 50:
                continue
            items.append({
                "food": row['Food_items'],
                "calories": int(row['Calories']),
                "proteins": float(row['Proteins'])
            })
            used_foods.add(row['Food_items'])
            total += row['Calories']
            if total >= target - 50:
                break
        return items, total

    recommendations["morning"], _ = pick_meal("Breakfast", meal_target)
    recommendations["lunch"], _ = pick_meal("Lunch", meal_target)
    recommendations["dinner"], _ = pick_meal("Dinner", meal_target)

    snack_choices = df[(df['Calories'] < 200) & (df['Proteins'] > 2) & (~df['Food_items'].isin(used_foods))]
    snack_choices = snack_choices.sample(frac=1)

    def pick_snacks(target):
        total = 0
        items = []
        for _, row in snack_choices.iterrows():
            if total + row['Calories'] > target + 50:
                continue
            items.append({
                "food": row['Food_items'],
                "calories": int(row['Calories']),
                "proteins": float(row['Proteins'])
            })
            used_foods.add(row['Food_items'])
            total += row['Calories']
            if total >= target - 50:
                break
        return items, total

    recommendations["snack_morning"], _ = pick_snacks(snack_target)
    recommendations["snack_evening"], _ = pick_snacks(snack_target)

    total_cal = sum(sum(item["calories"] for item in meal) for meal in recommendations.values())
    return {"recommendations": recommendations, "total_calories": total_cal}


# ------------------ RULE-BASED WORKOUT ENDPOINT ------------------
@app.get("/getworkout")
def get_workout(goal: str = "bulking"):
    valid = df_exercises[df_exercises["Equipment"].isin(["Body Only", "Dumbbell"])].copy()
    if goal.lower() == "bulking":
        valid = pd.concat([
            valid[valid["Equipment"] == "Dumbbell"],
            valid[valid["Equipment"] == "Body Only"].sample(frac=0.5, random_state=42)
        ])
    elif goal.lower() == "weightloss":
        valid = pd.concat([
            valid[valid["Equipment"] == "Body Only"],
            valid[valid["Equipment"] == "Dumbbell"].sample(frac=0.5, random_state=42)
        ])

    valid = valid.sort_values(by="Rating")
    n = len(valid)
    week_splits = [
        valid.iloc[: n//4],
        valid.iloc[n//4 : n//2],
        valid.iloc[n//2 : 3*n//4],
        valid.iloc[3*n//4 : ]
    ]

    workout_plan = {}
    major_muscles = ["Chest","Back","Legs","Shoulders","Biceps","Triceps","Abdominals"]

    for i, week_df in enumerate(week_splits, start=1):
        count = random.randint(7, 8)
        chosen = []
        for muscle in major_muscles:
            muscle_df = week_df[week_df["muscle_gp"].str.contains(muscle, case=False, na=False)]
            if not muscle_df.empty:
                chosen.append(muscle_df.sample(1).iloc[0])
        if len(chosen) < count:
            extra = week_df.drop([x.name for x in chosen], errors="ignore")
            if not extra.empty:
                chosen += list(extra.sample(min(count - len(chosen), len(extra))).itertuples())
        workout_plan[f"week{i}"] = [
            {
                "exercise": row.Exercise_Name,
                "equipment": row.Equipment,
                "rating": float(row.Rating),
                "muscle": row.muscle_gp,
                "url": row.Description_URL
            }
            for row in chosen
        ]
    return {"goal": goal, "workout_plan": workout_plan}


# ------------------ ML-BASED WORKOUT ENDPOINT ------------------
def train_clusters():
    data = df_exercises[df_exercises["Equipment"].isin(["Body Only","Dumbbell"])].copy()
    le_muscle = LabelEncoder()
    le_equip = LabelEncoder()
    data["muscle_encoded"] = le_muscle.fit_transform(data["muscle_gp"].astype(str))
    data["equip_encoded"] = le_equip.fit_transform(data["Equipment"].astype(str))
    features = data[["muscle_encoded","equip_encoded","Rating"]]
    X = StandardScaler().fit_transform(features)
    kmeans = KMeans(n_clusters=7, random_state=42, n_init="auto")
    data["cluster"] = kmeans.fit_predict(X)
    return data

@app.get("/mlworkout")
def get_ml_workout(goal: str = "bulking"):
    data = train_clusters()
    data = data.sort_values(by="Rating")

    n = len(data)
    week_splits = [
        data.iloc[: n//4],
        data.iloc[n//4 : n//2],
        data.iloc[n//2 : 3*n//4],
        data.iloc[3*n//4 :]
    ]

    workout_plan = {}
    for i, week_df in enumerate(week_splits, start=1):
        count = random.randint(7, 8)
        chosen = []
        clusters = week_df["cluster"].unique()
        for c in clusters:
            c_df = week_df[week_df["cluster"] == c]
            if not c_df.empty:
                chosen.append(c_df.sample(1).iloc[0])
        if len(chosen) < count:
            extra = week_df.drop([x.name for x in chosen], errors="ignore")
            if not extra.empty:
                chosen += list(extra.sample(min(count - len(chosen), len(extra))).itertuples())
        workout_plan[f"week{i}"] = [
            {
                "exercise": row.Exercise_Name,
                "equipment": row.Equipment,
                "rating": float(row.Rating),
                "muscle": row.muscle_gp,
                "cluster": int(row.cluster),
                "url": row.Description_URL
            }
            for row in chosen
        ]
    return {"goal": goal, "ml_workout_plan": workout_plan}

handler = Mangum(app)

