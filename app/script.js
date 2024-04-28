import React, { useMemo, useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState();
  const [timer, setTimer] = useState(null);

  const formetTime = useMemo( () => {
    let ss =  time % 60;
    const mm =  Math.floor(time/60);

    ss = ss < 10 ? `0${ss}` : ss;

    return `${mm} : ${ss}`;
  }, [time]);

  const startTimer = (e) => {
    e.preventDefault();
    setTime(1200);
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(time => {
        console.log('set interval time ' + time);
        if (time === 0){
          playBell();
          setStatus( status => {
            if (status === 'work'){
              setTime(20);
              return 'rest';
            } else {
              setTime(1200);
              return 'work';
            }
          });
        }
        return time - 1;
      });
      console.log('time ' + time);
    }, 1000));
  };
  
  const stopTimer = (e) => {
    e.preventDefault();
    setStatus('off');
    clearInterval(timer);
    setTime(1200);
  };

  const closeHandler = (e) => {
    e.preventDefault();
    window.close();
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {
        status === 'off' && 
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      }
      { status === 'work' && <img src="./images/work.png" />}
      { status === 'rest' && <img src="./images/rest.png" />}
      { status != 'off' &&
        <div className="timer">
        {formetTime}
      </div>
      }
      { status === 'off' && <button onClick={ e => startTimer(e)} className="btn">Start</button>}
      { status != 'off' && <button onClick={e => stopTimer(e)} className="btn">Stop</button>}
      <button onClick={e => closeHandler(e)} className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
