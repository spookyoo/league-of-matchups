import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    return (    
        <div className="navbar" onClick={() => navigate(`/matchups`)}>
            <p>League of Matchups</p>
        </div>
    );
}

export default Navbar;