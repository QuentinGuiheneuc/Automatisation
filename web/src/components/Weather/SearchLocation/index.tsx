import { List, ListItem } from "@mui/material";
import { useState } from "react";
import { weatherAPI } from "../../../data/weatherApi";

export type weatherCity = {
  id_insee: number,
  nom: string,
  codeDepartement: string,
  codesPostaux: string,
  insee: string
}

const SearchLocation: React.FC = () => {

  const [citySearch, setCitySearch] = useState("");
  const [cityChoice, setCityChoice] = useState<weatherCity[]>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const citySearched = event.target.value
    setCitySearch(citySearched)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    weatherAPI.searchCity(citySearch)
      .then(async (reponse) => {
        console.log("bonjour")
        setCityChoice(reponse)
      })
  }

  return (
    <div className="text-black">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between my-5 space-x-4">
          <input
            type="text"
            className="border border-gray-150 bg-transparent p-3 flex-grow"
            placeholder="Ville"
            onChange={handleChange}
          />
          <button className="bg-[#3C47E9] py-3 px-5 hover:bg-[#3C47E9]/70">
            Rechercher
          </button>
        </div>
      </form>

      <div className="mt-20">
        <button className="hover:border border-gray-250 px-4 py-6 w-full flex justify-between" >
          {cityChoice !== undefined &&
            <List>
              {cityChoice.map((item) => (
                <ListItem key={item.id_insee}>{item.nom}</ListItem>
              ))}
            </List>}
        </button>
      </div>

    </div>
  );
};

export default SearchLocation;