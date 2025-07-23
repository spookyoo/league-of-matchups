import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import axios from "axios"

import MatchupContainer from "../components/MatchupContainer";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

const ChampionMatchupPage = () => {
    const [latest, setLatest] = useState("");

    const {name} = useParams();
    const [apiName, setApiName] = useState("");
    const [champId, setChampId] = useState("");
    const [matchups, setMatchups] = useState([]);

    const [opponentId, setOpponentId] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [champMap, setChampMap] = useState({});


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

          const champMapObj = {};
          allChamps.forEach(champ => {
            champMapObj[champ.key] = {
              name: champ.name,
              api: champ.id,
            };
          });
          setChampMap(champMapObj);

          if (match) {
            setApiName(match.id);
            setChampId(match.key);
          } else {
            console.error("CHAMP NOT FOUND");
          }
        })
        .catch(err => console.error("ERROR FETCHING", err));
    }, [name]);

    useEffect(() => {
      if (!champId) return;

      axios.get("http://localhost:3000/matchups", {
        params: { playerId: champId }
      })
      .then(response => {
        const converted = response.data
          .map((matchup) => {
            const champ = champMap[matchup.opponentId];
            if (!champ) return null;

            return {
              name: champ.name,
              api: champ.api,
              difficulty: matchup.difficulty
            };
          })
        .filter(matchup => matchup !== null);
        setMatchups(converted);
      })
      .catch(error => console.error("ERROR FETCHING MATCHUPS: ", error));
    }, [champId, champMap]);

    const formatChampions = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log("Submitting with:", {
        playerId: champId,
        opponentId,
        difficulty,
      });

      axios.post("http://localhost:3000/matchups", {
        playerId: parseInt(champId, 10),
        opponentId: parseInt(opponentId, 10),
        difficulty: parseInt(difficulty, 10),
      })
      .then(response => {
        setOpponentId("");
        setDifficulty("");
      })
      .catch(error => {
        console.error("FAILED TO SUBMIT:", error);
        alert("ERROR SUBMITTING");
      });
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
            {matchups.map((matchup) => (
            <MatchupContainer name={matchup.name} api={matchup.api} difficulty={matchup.difficulty}
            />
          ))}
          <div className="insertContainer">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="opp"
                value={opponentId}
                onChange={(e) => setOpponentId(e.target.value)}
                />
              <input
                type="text"
                placeholder="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ChampionMatchupPage;