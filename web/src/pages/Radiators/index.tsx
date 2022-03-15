import { useState } from 'react';
import './styles.css'

export default function Radiators() {
  const [temperature, setTemperature] = useState(10);
  const [temperatureColor, setTemperatureColor] = useState('cold')

  const increaseTemperature = () => {	
    const newTemperature = temperature + 1;
    setTemperature(newTemperature);
  
    if (newTemperature >= 15) {
      setTemperatureColor('hot');
    }
  
    if (newTemperature > 35) {
      setTemperature(35)
    }
  }

  const decreaseTemperature = () => {
    const newTemperature = temperature - 1;
    setTemperature(newTemperature)

    if (newTemperature < 15) {
      setTemperatureColor('cold')
    }

    if (newTemperature < -25) {
      setTemperature(-25)
    }
  }

  return (
    <div className="w-full h-screen text-white">
      <span>Radiators</span>
      <div className='temp-container'>
        <div className='temperature-display-container'>
          <div className={`temperature-display ${temperatureColor}`}>{temperature}°C</div>
        </div>
        <div className='button-container'>
          <button className='button' onClick={increaseTemperature}>+</button>
          <button className='button' onClick={decreaseTemperature}>-</button>
        </div>
      </div>
    </div>
  );
}