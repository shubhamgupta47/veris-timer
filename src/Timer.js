import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [inputTime, setInputTime] = useState(3);

  const [time, setTime] = useState({
    minutes: inputTime,
    seconds: 0,
    isRunning: false
  });

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setTime({
      ...time,
      minutes: inputTime,
      seconds: 0
    })
  }, [inputTime])

  const startTimer = () => {
    let myInterval = setInterval(() => {
      setTime((time) => {
        const updatedTime = { ...time };
        if (time.seconds > 0) {
          updatedTime.seconds--;
        }

        if (time.seconds === 0) {
          if (time.minutes === 0) {
            clearInterval(myInterval);
          } else if (time.minutes > 0) {
            updatedTime.minutes--;
            updatedTime.seconds = 59;
          }
        }

        return { ...updatedTime, isRunning: true };
      });
    }, 1000);
    setTimer(myInterval);
  };

  const pauseTimer = () => {
    clearInterval(timer);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime({
      minutes: inputTime,
      seconds: 0,
    });
  };

  return (
    <div className="container" style={{ padding: "10rem 18rem" }}>
      <div className="mb-3" >
        <label htmlFor="exampleFormControlInput1" className="form-label">Enter start time:</label>
        <input
          type="number"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter start time(in mins)"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <span>(default is 3 mins)</span>
      </div>
      <h1 className='timer'>
        {time.hours < 10 && time.hours !== 0
          ? `0${time.hours}:`
          : time.hours >= 10 && `${time.hours}:`}
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </h1>
      <div className="btn-example">
        <button type="button" onClick={startTimer} className="btn btn-primary m-2">{time.isRunning ? "Continue" : "Start"}</button>
        <button type="button" onClick={pauseTimer} className="btn btn-warning m-2">Pause</button>
        <button type="button" onClick={stopTimer} className="btn btn-danger m-2">Stop</button>
      </div>
    </div>
  );
};

export default Timer;