import { List, ListItem } from "@mui/material";
import { useState, useEffect } from "react";
import { weatherAPI } from "../../../data/weatherApi";
import ListCity from "../ListCity";

export type weatherCity = {
  id_insee: number;
  nom: string;
  codeDepartement: string;
  codesPostaux: string;
  insee: string;
};

const SearchLocation: React.FC = () => {
  const [citySearch, setCitySearch] = useState("");
  const [cityChoice, setCityChoice] = useState<weatherCity[]>();
  const [UseCity, setUseCity] = useState<weatherCity[]>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const citySearched = event.target.value;
    setCitySearch(citySearched);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    weatherAPI.searchCity(citySearch).then(async (reponse) => {
      console.log("bonjour");
      setCityChoice(reponse);
    });
  };
  const handleUseCity = () => {
    weatherAPI.selectCity().then(async (reponse) => {
      console.log("bonjour");
      setUseCity(reponse);
    });
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mt-4 ml-4">
          <input
            type="text"
            className="border border-white bg-transparent p-3 flex-grow placeholder-white focus:outline-none"
            placeholder="Ville"
            onChange={handleChange}
          />
          <button className="bg-[#3C47E9] py-3 px-5 hover:bg-[#3C47E9]/70">
            Rechercher
          </button>
        </div>
      </form>
      <div>{UseCity}</div>
      <div>
        <button className="hover:border border-gray-250 ml-4 mt-5 w-full flex justify-between align-top">
          {cityChoice !== undefined && (
            <List>
              {cityChoice.map((item) => (
                <ListCity key={item.id_insee} data={item}>
                  {item.nom}
                </ListCity>
              ))}
            </List>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchLocation;
