import React, { useState } from "react";
import {showCalendar} from "./Calendar"

// Date-picker
// import { endOfWeek, isWithinInterval, startOfWeek, format } from "date-fns";
import { DayPicker, Row, RowProps } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { sv } from "date-fns/locale";

// Styles
import "../styles/workout.css";

//Types
import { IWorkout } from "../types/WorkoutType";
// import { TWeekdays } from "../types/CalendarType";

// DB
import { Workouts } from "../db/Workouts";


const WorkoutList: React.FC = () => {
  // const [products, setProducts] = useState(initialWorkoutDB);
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [count, setCount] = useState(0);
  const [selectedWorkout, setSelectedWorkout] = useState<string[]>([]);

  

  const increment = () => {
    setCount((count) => count + 1);
  };

  const handledWorkoutChange = (workoutName: string) => {
    setSelectedWorkout([...selectedWorkout, workoutName]);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
  };


  // const renderTodaysWorkouts = () => {
  //   console.log(selectedDay?.getDay());

  //   if (selectedDay && selectedDay.getDay() === 5) {
  //     return <>{renderWorkouts()}</>;
  //   } else {
  //     return null;
  //   }
  // };

  // const renderWorkouts = () => {
  //   return Workouts.map((workout: IWorkout) => (
  //     <div className="workout-container" key={workout.id}>
  //       <h3>{workout.name}</h3>
  //       <p>Time: {workout.time}</p>
  //       <p>day: {workout.weekDay}</p>
  //       <button
  //         onClick={() => {
  //           handledWorkoutChange(workout.name);
  //           increment();
  //         }}>
  //         Boka
  //       </button>
  //     </div>
  //   ));
  // };


  return (
    <div>
      <div>
        {localStorage.getItem("role") === "USER" ? (
          <div className="booked-workout-container">
            <p>
              Du har <span className="count">{count}</span> bokade pass{" "}
            </p>
            <span>v</span>
          </div>
        ) : (
          <div className="admin-title">
            <h2>Översikt</h2>
          </div>
        )}
      </div>
      <div>
        <ul className="selected-workout">
          {selectedWorkout.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
      <div className="calendar-container">
        <div>
          <DayPicker
            className="DayPicker"
            selected={selectedDay}
            onDayClick={handleDayClick}
            components={{ Row: showCalendar }}
            showOutsideDays
            mode="single"
            onSelect={setSelectedDay}
            // footer={footer}
            weekStartsOn={1}
            locale={sv}
          />
        </div>
        <h1>Workout List</h1>
        {/* <div>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.time}</p>
                <p>{product.weekDay}</p>
                {localStorage.getItem("role") === "USER" ? (
                  <button>Boka</button >
                ) : (
                  <button>Ta bort pass</button >
                )}
                
              </div>
            )
          })}
        </div> */}
        {/* <div>{renderTodaysWorkouts()}</div> */}
      </div>
      {/* < AdminPage setproduct ={setProducts} product = {products}/> */}
    </div>
    
  );
};

export default WorkoutList;
