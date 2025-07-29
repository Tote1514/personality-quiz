import { useState, useEffect } from 'react'

import Header from './components/Header';
import UserForm from './components/UserForm';
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
      // Continue mapping all your possible options to a keyword
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
      answers.forEach(function(answer) {
        const element = elements[answer];
        counts[element] = (counts[element] || 0) + 1;
      });
      return Object.keys(counts).reduce(function(a, b) {
        return counts[a] > counts[b] ? a : b
      });
  };

  const fetchArtwork = (element)=>{

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
      </Routes>
    </UserProvider>
  )
}

export default App
