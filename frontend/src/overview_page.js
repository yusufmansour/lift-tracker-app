import React, { useEffect, useState } from 'react';
import exerciseData from './exercises.json'; // Change to your actual JSON file name
import Navbar from './navbar';
import { useUser } from "./user_context";
import { useNavigate } from "react-router-dom";


const OverviewGrid = () => {
  const { user, login, logout, checkLoggedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    // Simulating an asynchronous operation (e.g., fetching data from an API)
    // Call the fetchData function when the component mounts
    checkLoggedIn(user)
    
    // You can also clean up any subscriptions or effects here if needed
    // For example, if you're using WebSocket, you might close the connection here

  }, []); 
  console.log(user)
  if (!user) {
    navigate("/");
  }
  
  const [exerciseStates, setExerciseStates] = useState(() =>
    exerciseData.map((exercise) => ({ id: exercise.id, title:exercise.title, isCompleted: false }))
  );
  console.log(exerciseData);

  const handleToggle = (id) => {
    setExerciseStates((prevStates) =>
      prevStates.map((exercise) =>
        exercise.id === id ? { ...exercise, isCompleted: !exercise.isCompleted } : exercise
      )
    );
  };


  const ExerciseButton = ({ id, title, isCompleted }) => {
    const buttonStyle = {
      backgroundColor: isCompleted ? 'cornflowerblue' : '#b6ccf5',
      border: null,
      color: "white",
      width: '100px',
      height: '60px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
    };

    return (
      <button style={buttonStyle} onClick={() => handleToggle(id)}>
        {title}
      </button>
    );
  };

  return (
    <div>
      <Navbar/>
      {exerciseStates.map((exercise) => (
        <ExerciseButton
          key={exercise.id}
          id={exercise.id}
          title={exercise.title}
          isCompleted={exercise.isCompleted}
        />
      ))}
    </div>
  );
};

export default OverviewGrid;
