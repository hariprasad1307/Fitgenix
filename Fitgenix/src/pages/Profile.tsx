import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import type { CalendarHeatmapValue } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../styles/profile.css";

const Profile: React.FC = () => {
  const [values, setValues] = useState<CalendarHeatmapValue[]>([]);

  useEffect(() => {
    const today = new Date();
    const past90 = new Date(today);
    past90.setDate(today.getDate() - 90);

    const data: CalendarHeatmapValue[] = [];
    for (let d = new Date(past90); d <= today; d.setDate(d.getDate() + 1)) {
      data.push({
        date: d.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 5),
      });
    }
    setValues(data);
  }, []);

  return (
    <div className="profile-container">
      <h2 style={{ color: "#ffdf00", marginBottom: "20px" }}>
        Your Consistency Dashboard
      </h2>

      <CalendarHeatmap
        startDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
        endDate={new Date()}
        values={values}
        classForValue={(value?: CalendarHeatmapValue) => {
          if (!value || !value.count) return "color-empty";
          return `color-github-${value.count}`;
        }}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default Profile;
