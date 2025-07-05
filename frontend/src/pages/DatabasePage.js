import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import axios from "axios"

const DatabasePage = () => {
    const navigate = useNavigate();
    const [champions, setChampions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/champions")
        .then(res => {
            if (!res.ok) throw new Error("FAILED TO FETCH");
            return res.json();
        })
        .then(data => setChampions(data))
        .catch(err => {
            console.error("ERROR FETCHING: ", err);
            setError("Could not load champions");
        });
    }, []);

    return (
    <div className="database-page">
      <div className="navbar">
        <h1>LEAGUE OF MATCHUPS</h1>
      </div>
      <div className="main"></div>
        <h3>Choose a champion</h3>
        <div className="championList">
          {champions.map((champion) => (
            <button key={champion.name} className="championButton">
              {champion.name}
            </button>
          ))}
        </div>
    </div>
    );
};

export default DatabasePage