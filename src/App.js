//TODO: STEP 1 - Import the useState hook.
import React, {useState, useEffect} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);



  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  function secToMinSec(seconds){
    let mins = null;
    let secs = null;
    
    mins = (Math.floor(seconds / 60)).toString();
    secs = (seconds % 60).toString();

    return `${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`
}


  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  



  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{secToMinSec(seconds)}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button 
            onClick = {() => setHomeScore(homeScore + 7)}
            className="homeButtons__touchdown">Home Touchdown</button>
          <button 
            onClick = {() => setHomeScore(homeScore + 3)}
            className="homeButtons__fieldGoal">Home Field Goal</button>
          <button
            onClick = {() => setIsActive(!isActive)}>
              Start/stop timer
          </button>
          <button 
            onClick = {reset}>
            Reset timer
          </button>
        </div>
        <div className="awayButtons">
          <button 
            onClick = {() => setAwayScore(awayScore + 7)}
            className="awayButtons__touchdown">Away Touchdown</button>
          <button
            onClick = {() => setAwayScore(awayScore + 3)}
            className="awayButtons__fieldGoal">Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
