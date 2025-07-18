import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import axios from "axios"

import ChampionContainer from "../components/ChampionContainer";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

const ChampionMatchupPage = () => {
    const navigate = useNavigate();
    const [champions, setChampions] = useState([]);

    const {name} = useParams();
    const [apiName, setApiName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/champion", {
            params: { name }
        })
        .then(response => setApiName(response.data.api)) 
        .catch(error => console.error("ERROR FETCHING API: ", error));
    }, [name]);

    const formatChampions = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
    <div className="database-page">
      <Navbar />
      <div className="database-page-content">
        <div className="titlebar">
            <div className="titlebar-champion">
                <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${apiName}.png`} />
                <p>{formatChampions(name)} Matchups</p>
            </div>
        </div>
        <div className="contentDivider"></div>
        <Searchbar />
        <div className="championList">
          {champions.map((champion) => (
            <React.Fragment key={champion.name}>
              <ChampionContainer name={champion.name} api={champion.api}/>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    );
};

export default ChampionMatchupPage;