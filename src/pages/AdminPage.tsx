import React, { useState, useEffect, useRef } from "react";

//Components
import { Header } from "../components/Header";
import WorkoutList from "../components/ShowWorkout";
import AddWorkout from "../components/AddWorkout";

import "../styles/workout.css";
import { IWorkout, TWorkoutActivity } from "../types/WorkoutType";

interface UserWorkouts {
  username: string;
  workoutList: [];
}

interface AdminPageProps {
  products: IWorkout[];
  setProducts: (newProducts: IWorkout[]) => void;
}

const AdminPage = ({ setProducts, products }: AdminPageProps) => {
  const [userWorkouts, setUserWorkouts] = useState<UserWorkouts[]>([]);
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      for (let i = 0; i < localStorage.length; i++) {
        const key: string | null = localStorage.key(i);
        if (key?.includes("workouts")) {
          const user: UserWorkouts = {
            username: key.replace(" workouts", ""),
            workoutList: localStorage.getItem(key)!.split(",") as [],
          };
          setUserWorkouts((oldvalue) => [...oldvalue, user]);
        }
      }
    }
  }, [setUserWorkouts]);

  return (
    <div>
      <Header />
      <h1>Översikt</h1>
      {/* <WorkoutList /> */}
      <p>Inga pass är bokade...</p>
      <ul>
        {userWorkouts.map((user, index) => {
          return (
            <li key={`nameid-${index}`}>
              <p>{user.username}</p>
              <ul>
                {user.workoutList.map((workout, wIndex) => {
                  return (
                    <li key={`workout-${index}${wIndex}`}>
                      <p>{workout}</p>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <div>
        <br></br>
        <br></br>
        <h3>Lägga till ett pass:</h3>
        <AddWorkout products={products} setProducts={setProducts} />
        <div className="workoutlist-container">
          {products.map((product: any) => {
            return (
              <div className="workoutlist-item" key={product.id}>
                <h4> {product.name}</h4>
                <p> {product.time}</p>
                <p>{product.weekDay}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
