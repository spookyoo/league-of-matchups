import { useNavigate } from 'react-router-dom';

function ChampionContainer({name, api}) {
    const navigate = useNavigate();
    return (
        <div className="championContainer" onClick={() => navigate(`/matchups/${name.toLowerCase().replace(/'/g, "")}`)}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${api}.png`} />
            <p>{name}</p>
        </div>
    );
}

export default ChampionContainer;