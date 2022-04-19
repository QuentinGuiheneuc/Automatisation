import { List } from "@mui/material";
import { weatherAPI } from "../../../data/weatherApi";

const handleCityChange = (data: object) => {
  console.log(data);
  weatherAPI.saveCity(data).then(async (reponse) => {
    console.log(reponse);
  });
};

export default function ListCity({ data }: any, name: string) {
  return (
    <List >
      <button
        type="button"
        onClick={() => {
          handleCityChange(data);
        }}
      >
        {data.nom}
      </button>
    </List>
  );
}
