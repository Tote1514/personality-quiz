import { Link } from "react-router-dom";
import "./Header.css"


function Header(){
    return (
        <div className="header">
            <h1>Which Element Are you?</h1>
            <p>(Based on completely random things)</p>
            <div className="links-nav">
                <Link to={"/"}>Home</Link>
                <Link to={"/quiz"}>Quiz</Link>
            </div>
        </div>
    )
}

export default Header;