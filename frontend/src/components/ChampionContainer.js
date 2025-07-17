function ChampionContainer({name, onClick}) {
    return (
        <div className="championContainer" onClick={onClick}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${name}.png`} />
            <p>{name}</p>
        </div>
    );
}

export default ChampionContainer;