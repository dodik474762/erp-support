import { useEffect, useState } from "react";

const CountdownTimer = (props: any) => {
  // Initial time in seconds (1 hour)
  const {initTime = 60 * 60, onComplete = () => {}} = props;
  const initialTime = initTime;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime: number) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          onComplete('Timer completed!');
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="text-end">
      <p>{`${hours}h ${minutes}m ${seconds}s`}</p>
    </div>
  );
};

export default CountdownTimer;
