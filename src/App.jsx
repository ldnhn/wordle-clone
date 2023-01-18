import "./App.css";
import wordList from "../src/wordleList.json";
import { useState, useEffect } from "react";
import { Heading, Center } from "@chakra-ui/react";

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

      // TO DO: add keyboard
      // try other ways to handle word not in list

      if (event.key === "Enter") {
        if (!isWordInList(currentGuess)) {
          //setIsValidWord(false);
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

  // get a random word from static file wordleList.json
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
      <Center>
        <Heading as="h3" size="lg">
          Wordle Clone
        </Heading>
      </Center>
      <div className="bar"></div>

      {triesCount === 6 && (
        <div className="chosenWord" id="answer">
          {chosenWord}
        </div>
      )}

      {isGameOver && <div className="chosenWord">Great!</div>}

      {!isWordInList(currentGuess) && currentGuess.length === 5 && (
        <div className="warning">word not in list</div>
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

function Line({ guess, isFinal, chosenWord, isValidWord }) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    let className = "tile";

    // add zoom animation to tiles when typing
    if (char != null) {
      className = "not-null";
    }

    // add color to tiles
    if (isFinal) {
      className = "tile";

      // add jiggle animation
      if (!isWordInList(guess)) {
        className += " jiggle";
      } else {
        let animationDelayDuration = " animation-delay-" + i * 200;
        className += animationDelayDuration;

        // add colors
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
