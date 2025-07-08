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
        axios.get("http://localhost:3000/champions")
            .then(response => {
                setChampions(response.data);
            })
            .catch(error => {
                console.error("ERROR FETCHING: ", error);
                setError("Could not load champions");
            });
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
            // <button key={champion.name} className="championButton">
            //   {champion.name}
            // </button>
            <ChampionContainer name={champion.name}/>
          ))}
        </div>
      </div>
    </div>
    );
};

export default DatabasePage