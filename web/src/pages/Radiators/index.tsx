import { Grid } from '@mui/material';
import SideBar from '../../components/Weather/SideBar';
import { useAppSelector } from '../../store/store';

import { ConnectedObject } from '../../types/ConnectedObject';
import { Cache } from '../../types/Cache';

import RadiatorCard from '../../components/RadiatorCard';

export default function Radiators() {
   // const [temperature, setTemperature] = useState(10);
  // const [temperatureColor, setTemperatureColor] = useState('cold')

  // const increaseTemperature = () => {	
  //   const newTemperature = temperature + 1;
  //   setTemperature(newTemperature);
  
  //   if (newTemperature >= 15) {
  //     setTemperatureColor('hot');
  //   }
  
  //   if (newTemperature > 35) {
  //     setTemperature(35)
  //   }
  // }

  // const decreaseTemperature = () => {
  //   const newTemperature = temperature - 1;
  //   setTemperature(newTemperature)

  //   if (newTemperature < 15) {
  //     setTemperatureColor('cold')
  //   }

  //   if (newTemperature < -25) {
  //     setTemperature(-25)
  //   }
  // }
  const { radiators, cache } = useAppSelector((store) => store.object)

  const displayRadiators = radiators.map(
    (radiator: ConnectedObject) =>
      <RadiatorCard
        key={radiator.id_client}
        radiator={radiator}
        cache={cache.find((element: Cache) => {
          return radiator.id_client === element.id_client
        }) as Cache} />
  )

  return (
      // <div className="bg-[#100E1D] flex flex-col lg:flex-row">
    //   <div> <SideBar /></div>
    //   <div className='temp-container'>
    //     <div className='temperature-display-container'>
    //       <div className={`temperature-display ${temperatureColor}`}>{temperature}°C</div>
    //     </div>
    //     <div className='button-container'>
    //       <button className='button' onClick={increaseTemperature}>+</button>
    //       <button className='button' onClick={decreaseTemperature}>-</button>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-screen text-white">
      <div className='flex'>
        {displayRadiators}
      </div>
      <Grid>
        <SideBar />
      </Grid>
    </div>
  );
}