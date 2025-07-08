function ChampionContainer({name, img}) {

    return (
        <div className="championContainer">
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${name}.png`} />
            <p>{name}</p>
        </div>
    );
}

export default ChampionContainer;