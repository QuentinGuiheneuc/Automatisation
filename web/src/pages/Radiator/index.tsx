import { useParams } from 'react-router-dom';


export default function Radiator() {
  const { radiator } = useParams()
  return (
    <div className="w-full h-screen text-white">
      <span>Radiators / {radiator}</span>
    </div>
  );
}