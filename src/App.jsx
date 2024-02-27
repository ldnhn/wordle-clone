import "./App.css";
import wordList from "../src/wordleList.json";
import { useState, useEffect } from "react";
import { Heading, Center, Box, Text, Flex, Divider } from "@chakra-ui/react";

import KeyboardRow from "./components/keyboardRow";
import WelcomePanel from "./components/WelcomePanel";
import { isWordInList, Line } from "./utils";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [triesCount, setTriesCount] = useState(0);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) return;

      if (event.key === "Enter") {
        if (currentGuess.length !== 5) return;

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setTriesCount(triesCount + 1);
        setCurrentGuess("");
        if (currentGuess === chosenWord) setIsGameOver(true);
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) return;

      const isLetter = event.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) setCurrentGuess((oldGuess) => oldGuess + event.key);
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver, chosenWord, guesses, triesCount]);

  useEffect(() => {
    const fetchChosenWord = () => {
      const random = wordList[Math.floor(Math.random() * wordList.length)];
      setChosenWord(random);
    };
    fetchChosenWord();
  }, []);

  let firstRowKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  let secondRowKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  let thirdRowKeys = ["z", "x", "c", "v", "b", "n", "m"];

  useEffect(() => {
    const modalShownBefore = localStorage.getItem("modalShownBefore");
    if (!modalShownBefore) {
      setTimeout(() => {
        setShowModal(false);
        localStorage.setItem("modalShownBefore", "true");
      }, 2500);
    } else {
      setShowModal(false);
    }
  }, []);

  return (
    <>
      <Center>
        <Heading as="h3" size="lg">
          Wordle Clone
        </Heading>
      </Center>
      <Divider />
      {showModal && <WelcomePanel />}

      {triesCount === 6 && !isGameOver && (
        <Center>
          <Center
            color="white"
            bg="gray.700"
            borderRadius="md"
            pos="absolute"
            top={10}
          >
            <Text as="b" textTransform="uppercase" p={1}>
              {chosenWord}
            </Text>
          </Center>
        </Center>
      )}

      {isGameOver && (
        <Center>
          <Center
            color="white"
            bg="green.600"
            borderRadius="md"
            pos="absolute"
            top={10}
          >
            <Text as="b" p={1}>
              {triesCount === 6 ? "Won!" : "Great!"}
            </Text>
          </Center>
        </Center>
      )}

      {triesCount < 6 &&
        !isWordInList(currentGuess, wordList) &&
        currentGuess.length === 5 && (
          <Center>
            <Center
              color="white"
              bg="red.600"
              borderRadius="md"
              pos="absolute"
              top={10}
            >
              <Text as="b" p={1}>
                Word not in list
              </Text>
            </Center>
          </Center>
        )}

      <Center w="100%" mt={10} p={5}>
        <Box display="flex" flexDirection="column" gap="5px">
          {guesses.map((guess, i) => {
            const isCurrentGuess =
              i === guesses.findIndex((val) => val == null);
            return (
              <Line
                guess={isCurrentGuess ? currentGuess : guess ?? ""}
                isFinal={!isCurrentGuess && guess != null}
                chosenWord={chosenWord}
                wordList={wordList}
              />
            );
          })}
        </Box>
      </Center>

      {[firstRowKeys, secondRowKeys, thirdRowKeys].map((rowKeys, rowIndex) => (
        <Center key={`row-${rowIndex}`}>
          <Flex gap={1} mt={1} id={`row${rowIndex + 1}`}>
            {rowKeys.map((item) => (
              <KeyboardRow key={item} id={item} text={item} />
            ))}
          </Flex>
        </Center>
      ))}
    </>
  );
}

export default App;
