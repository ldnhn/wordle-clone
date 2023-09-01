import "./App.css";
import wordList from "../src/wordleList.json";
import { useState, useEffect } from "react";
import {
  Heading,
  Center,
  Box,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";

import KeyboardRow from "./components/keyboardRow";
import WelcomePanel from "./components/WelcomePanel";
import { isWordInList } from "./utils";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [triesCount, setTriesCount] = useState(0);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) {
        return;
      }

      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setTriesCount(triesCount + 1);
        setCurrentGuess("");

        const isWinning = currentGuess === chosenWord;
        if (isWinning) {
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
    const fetchChosenWord = async () => {
      const random = await wordList[
        Math.floor(Math.random() * wordList.length)
      ];
      setChosenWord(random);
    };
    fetchChosenWord();
  }, []);

  let firstRowKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  let secondRowKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  let thirdRowKeys = ["z", "x", "c", "v", "b", "n", "m"];

  useEffect(() => {
    setTimeout(() => setShowModal(false), 5000);
  });

  return (
    <Box>
      <Center>
        <Heading as="h3" size="lg">
          Wordle Clone
        </Heading>
      </Center>

      <Divider />

      {triesCount === 6 && !isGameOver && (
        <Center>
          <Box color="white" bg="gray.700" borderRadius="md">
            <Text as="b" textTransform="uppercase">
              {chosenWord}
            </Text>
          </Box>
        </Center>
      )}

      {showModal && <WelcomePanel/>}

      {triesCount === 6 && isGameOver && (
        <Center>
          <Box color="white" bg="green.600" borderRadius="md">
            <Text as="b" textTransform="uppercase">
              Great!
            </Text>
          </Box>
        </Center>
      )}

      {isGameOver && triesCount < 6 && (
        <Center>
          <Box color="white" bg="green.600" borderRadius="md">
            <Text as="b">Great!</Text>
          </Box>
        </Center>
      )}

      {!isWordInList(currentGuess, wordList) && currentGuess.length === 5 && (
        <Center>
          <Box color="white" bg="red.600" borderRadius="md">
            <Text as="b">Word not in list</Text>
          </Box>
        </Center>
      )}

      <Box bg='tomato' w='100%' p={4} color='white'>
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="5px"
            // pos="absolute"
          >
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
          </Box>
        </Box>
      </Box>

      <Box >
        <Center>
          <Flex gap={1} mt={1} id="rowOne">
            {firstRowKeys.map((item) => (
              <KeyboardRow key={item} id={item} text={item} />
            ))}
          </Flex>
        </Center>
        <Center>
          <Flex gap={1} mt={1} id="rowTwo">
            {secondRowKeys.map((item) => (
              <KeyboardRow key={item} id={item} text={item} />
            ))}
          </Flex>
        </Center>
        <Center>
          <Flex gap={1} mt={1} id="rowThree">
            {thirdRowKeys.map((item) => (
              <KeyboardRow key={item} id={item} text={item} />
            ))}
          </Flex>
        </Center>
      </Box>

    </Box>
  );
}

export default App;

function Line({ guess, isFinal, chosenWord }) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    let className = "tile";
    let animationDelayDuration = " delay-" + i * 200;

    if (char != null) {
      className = "not-null-tile";
    }

    if (isFinal) {
      className = "tile";

      // if (guess === chosenWord) {
      //   className += " win";
      // }

      if (!isWordInList(guess, wordList)) {
        className += " jiggle";
      } else {
        className += animationDelayDuration;

        if (char === chosenWord[i]) {
          className += " correct";
          document.getElementById(char).style.background = "#5a9c51";
          document.getElementById(char).style.color = "white";
        } else if (chosenWord.includes(char)) {
          className += " close";
          document.getElementById(char).style.background = "#bea647";
          document.getElementById(char).style.color = "white";
        } else {
          className += " incorrect";
          document.getElementById(char).style.background = "#65696b";
          document.getElementById(char).style.color = "white";
        }
      }
    }

    tiles.push(
      <Box key={i} className={className}>
        {char}
      </Box>
    );
    className = "tile";
  }
  return (
    <Box display="flex" gap="5px">
      {tiles}
    </Box>
  );
}
