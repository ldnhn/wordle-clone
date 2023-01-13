import "./App.css";
import wordList from "../src/wordleList.json";
import { useState, useEffect } from "react";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [triesCount, setTriesCount] = useState(0);

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) {
        return;
      }

      if (event.key === "Enter") {
        if (!isWordInList(currentGuess)) {
          //setCurrentGuess("");
        }

        if (currentGuess.length !== 5) {
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setTriesCount(triesCount + 1);
        setCurrentGuess("");

        const isCorrect = chosenWord === currentGuess;
        if (isCorrect) {
          setIsGameOver(true);
        }
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) {
        return;
      }

      const isLetter = event.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) {
        setCurrentGuess((oldGuess) => oldGuess + event.key);
      }
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver, chosenWord, guesses, triesCount]);

  useEffect(() => {
    const fetchWord = async () => {
      const randomWord = await wordList[
        Math.floor(Math.random() * wordList.length)
      ];
      setChosenWord(randomWord);
    };
    fetchWord();
  }, []);

  return (
    <div className="app" onFocus={true}>
      <div className="title">Wordle Clone</div>
      <div className="bar"></div>

      {triesCount === 6 && (
        <div className="chosenWord" id="answer">
          {chosenWord}
        </div>
      )}

      {isGameOver && (
        <div className="chosenWord" id="answer">
          Great!
        </div>
      )}

      <div className="tiles-container">
        <div className="table">
          {guesses.map((guess, i) => {
            const isCurrentGuess =
              i === guesses.findIndex((val) => val == null);
            return (
              <Line
                guess={isCurrentGuess ? currentGuess : guess ?? ""}
                isFinal={!isCurrentGuess && guess != null}
                chosenWord={chosenWord}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

function isWordInList(guess) {
  if (wordList.includes(guess)) return true;
  return false;
}

function Line({ guess, isFinal, chosenWord }) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    let className = "tile";
    if (char != null) {
      className = "not-null";
    }

    if (isFinal) {
      if (!isWordInList(guess)) {
        className = "tile";
        className += " jiggle";
      } else {
        className = "tile";
        let animationDelayDuration = " animation-delay-" + i * 200;
        className += animationDelayDuration;

        if (char === chosenWord[i]) {
          className += " correct";
        } else if (chosenWord.includes(char)) {
          className += " close";
        } else {
          className += " incorrect";
        }
      }
    }

    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
    className = "tile";
  }
  return <div className="line">{tiles}</div>;
}
