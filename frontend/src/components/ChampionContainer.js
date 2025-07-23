import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function useLatest() {
    const [latest, setLatest] = useState("");

    useEffect(() => {
        fetch("https://ddragon.leagueoflegends.com/api/versions.json")
        .then(res => res.json())
        .then(data => setLatest(data[0]))
  }, []);

  return latest
}

function ChampionContainer({name, api}) {
    const navigate = useNavigate();
    const latest = useLatest();
    
    return (
        <div className="championContainer" onClick={() => navigate(`/matchups/${name.toLowerCase().replace(/'/g, "")}`)}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/${latest}/img/champion/${api}.png`} />
            <p>{name}</p>
        </div>
    );
}

export default ChampionContainer;