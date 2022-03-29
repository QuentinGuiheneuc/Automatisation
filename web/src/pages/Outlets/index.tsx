import { useParams } from 'react-router-dom';

export default function Outlets() {
  const { outlets } = useParams()
  return (
    <div className="w-full h-screen text-white">
      <span>Outlets / {outlets}</span>
    </div>
  );
}