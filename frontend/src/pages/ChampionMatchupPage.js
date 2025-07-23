import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import axios from "axios"

import ChampionContainer from "../components/ChampionContainer";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

const ChampionMatchupPage = () => {
    const navigate = useNavigate();
    const [champions, setChampions] = useState("");
    const [latest, setLatest] = useState("");

    const {name} = useParams();
    const [apiName, setApiName] = useState("");
    const [champId, setChampId] = useState("");
    const [matchups, setMatchups] = useState("");

    useEffect(() => {
      let version = ""
      fetch("https://ddragon.leagueoflegends.com/api/versions.json")
        .then(res => res.json())
        .then(versions => {
          version = versions[0];
          setLatest(version);
          return fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
        })
        .then(res => res.json())
        .then(data => {
          const allChamps = Object.values(data.data);
          const match = allChamps.find(champ => champ.name.toLowerCase() === name.toLowerCase());

          if (match) {
            setApiName(match.id);
          } else {
            console.error("CHAMP NOT FOUND");
          }
        })
        .catch(err => console.error("Error fetching Riot data:", err));
    }, [name]);

    useEffect(() => {
      if (!champId) return;

      axios.get("http://localhost:3000/matchups", {
        params: { playerId: champId }
      })
      .then(response => {
        setMatchups(response.data);
      })
      .catch(error => console.error("ERROR FETCHING MATCHUPS: ", error));
    }, [champId]);

    const formatChampions = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
    <div className="database-page">
      <Navbar />
      <div className="database-page-content">
        <div className="titlebar">
            <div className="titlebar-champion">
              {latest && apiName && (
                <img src={`https://ddragon.leagueoflegends.com/cdn/${latest}/img/champion/${apiName}.png`} />
              )}
                <p>{formatChampions(name)} Matchups</p>
            </div>
        </div>
        <div className="contentDivider"></div>
        <Searchbar />
        <div className="championList">
        </div>
      </div>
    </div>
    );
};

export default ChampionMatchupPage;