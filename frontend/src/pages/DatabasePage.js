import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import axios from "axios"

import ChampionContainer from "../components/ChampionContainer";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

const DatabasePage = () => {
    const navigate = useNavigate();
    const [champions, setChampions] = useState([]);
    const [error, setError] = useState(null);

useEffect(() => {
  axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
    .then(res => {
      const latest = res.data[0];
      return axios.get(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`);
    })
    .then(res => {
      const championList = Object.values(res.data.data).map(champ => ({
        name: champ.name,
        api: champ.id
      }));
      setChampions(championList);
    })
    .catch(err => console.error("FAILED TO FETCH", err));
}, []);

    return (
    <div className="database-page">
      <Navbar />
      <div className="database-page-content">
        <h1>LoL Matchup Database</h1>
        <div className="contentDivider"></div>
        <Searchbar />
        <div className="championList">
          {champions.map((champion) => (
            <ChampionContainer name={champion.name} api={champion.api}/>
          ))}
        </div>
      </div>
    </div>
    );
};

export default DatabasePage