import { weatherAPI } from "../../../data/weatherApi";

const handleCityChange = (donner: object) => {
  weatherAPI.saveCity(donner).then(async (reponse) => {
    console.log(reponse);
  });
};

export default function ListCity({ donner }: any, name: string) {
  return (
    <li className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root">
      <button
        type="button"
        onClick={() => {
          handleCityChange(donner);
        }}
      >
        {donner.nom}
      </button>
    </li>
  );
}
