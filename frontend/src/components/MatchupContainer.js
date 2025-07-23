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

function MatchupContainer({name, api}) {
    const latest = useLatest();
    
    return (
        <div className="matchupContainer" onClick={""}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/${latest}/img/champion/${api}.png`} />
            <p>{name}</p>
        </div>
    );
}

export default MatchupContainer;