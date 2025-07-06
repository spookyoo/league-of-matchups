import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import axios from "axios"

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