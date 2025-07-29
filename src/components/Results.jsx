import { useContext } from "react";
import { UserContext } from "./UserContext";
import "./Results.css";

export default function Results({element, artwork}){

    const { name } = useContext(UserContext);
    return (
        <div className="answer">
            <p>
                <strong>{name}</strong>, your element is : {element}
            </p>
            {artwork ?(
            <div className="artwork">
                <h2>{artwork.title}</h2>
                <img src={artwork.primaryImage} alt={artwork.title}  />
                <p>{artwork.artistDisplayName}</p> 
                <p>{artwork.objectDate}</p>
            </div>) 
            : (
                <p>Not artwork found</p>
            )}
        </div>
    );
}