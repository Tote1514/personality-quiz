import { useState, useEffect } from 'react'

import Header from './components/Header';
import UserForm from './components/UserForm';
import Question from "./components/Question";
import Results from './components/Results';
import { UserProvider } from './components/UserContext';

import './App.css'
import { Route, Routes } from 'react-router-dom';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtWork] = useState(null);
  

    const questions = [
      {
        question: "What's your favorite color?",
        options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
      },
      {
        question: "What's your favorite season?",
        options: ["Spring 🌸", "Summer ☀️", "Autumn 🍂", "Winter ❄️"],
      },
      {
        question: "What's your favorite time of day?",
        options: ["Morning 🌅", "Afternoon ☀️", "Evening 🌇", "Night 🌙"],
      }
  ];

  const keywords = {
      Fire: "fire",
      Water: "water",
      Earth: "earth",
      Air: "air",
  };

  const elements = {
      "Red 🔴": "Fire",
      "Blue 🔵": "Water",
      "Green 🟢": "Earth",
      "Yellow 🟡": "Air",
      "Spring 🌸": "Earth",
      "Summer ☀️": "Fire",
      "Autumn 🍂": "Air",
      "Winter ❄️": "Water",
      "Morning 🌅": "Fire",
      "Afternoon ☀️": "Earth",
      "Evening 🌇": "Air",
      "Night 🌙": "Water",
  };

  function handleAnswer(answer) {
      setAnswers([...answers, answer]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function handleUserFormSubmit(name) {
      setUserName(name);
  };

  function determineElement(answers) {
      const counts = {};

      console.log("Answers:", answers);
      answers.forEach(function(answer) {
        const element = elements[answer];
        counts[element] = (counts[element] || 0) + 1;
      });

      const temp = Object.keys(counts).reduce(function(a, b) {
        return counts[a] > counts[b] ? a : b
      });

      console.log("Determined Element:", temp);
      return temp;
  };

  const fetchArtwork = async (element)=>{

    if (element === "") {
      setArtWork(null);
      return;
    }

    console.log("Element:", element);

    const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";

    const url = `${apiUrl}${element}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {

        if (data.total > 0) {
          const randomIndex = Math.floor(Math.random() * data.total);
          const objectId = data.objectIDs[randomIndex];
          return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
        } 
        else {
          throw new Error("No artwork found");
        }
      })
      .then(response => response.json())
      .then(artworkData => {
        setArtWork(artworkData);
      })
      .catch(error => {
        console.error("Error fetching artwork:", error);
        setArtWork(null);
      });

  };

  useEffect(
     () => {
      if (currentQuestionIndex === questions.length) {
          const selectedElement = determineElement(answers);
          setElement(selectedElement);
          fetchArtwork(keywords[selectedElement]);
        }
    },
    [currentQuestionIndex]
  );



  return (
    <UserProvider value ={{name: userName, setName: setUserName}}>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route path='/quiz' element={
          currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question}
                        options={questions[currentQuestionIndex].options}
                        onAnswer={handleAnswer} />)
              : <Results element={element} artwork={artwork} />
        }/>
      </Routes>
    </UserProvider>
  )
}

export default App
