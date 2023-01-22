import "./App.css";
import wordList from "../src/wordleList.json";
import { useState, useEffect } from "react";
import { Heading, Center, Box, Text, Flex } from "@chakra-ui/react";

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
    <div onFocus={true} h={100}>
      <Center>
        <Heading as="h3" size="lg" mb={3} mt={2}>
          Wordle Clone
        </Heading>
      </Center>
      <div className="bar"></div>

      {triesCount === 6 && !isGameOver && (
        <Center>
          <Box color="white" p={3} mt={1} bg="gray.700" borderRadius="md">
            <Text as="b" textTransform="uppercase">
              {chosenWord}
            </Text>
          </Box>
        </Center>
      )}

      {triesCount === 6 && isGameOver && (
        <Center>
          <Box color="white" p={3} mt={1} bg="green.600" borderRadius="md">
            <Text as="b" textTransform="uppercase">
              Great!
            </Text>
          </Box>
        </Center>
      )}

      {isGameOver && triesCount < 6 && (
        <Center>
          <Box color="white" p={3} mt={1} bg="green.600" borderRadius="md">
            <Text as="b">Great!</Text>
          </Box>
        </Center>
      )}

      {!isWordInList(currentGuess) && currentGuess.length === 5 && (
        <Center>
          <Box color="white" p={3} mt={1} bg="red.600" borderRadius="md">
            <Text as="b">Word not in list</Text>
          </Box>
        </Center>
      )}

      <div className="tiles-container" mt={10}>
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

      <Box
        pos="fixed"
        bottom={0}
        mb={14}
        left="50%"
        className="keyboard-container"
      >
        <Center>
          <Flex gap={1} mt={1}>
            <Box id="q" w={6} h={6} textAlign="center" rounded="sm">
              q
            </Box>
            <Box id="w" w={6} h={6} textAlign="center" rounded="sm">
              w
            </Box>
            <Box id="e" w={6} h={6} textAlign="center" rounded="sm">
              e
            </Box>
            <Box id="r" w={6} h={6} textAlign="center" rounded="sm">
              r
            </Box>
            <Box id="t" w={6} h={6} textAlign="center" rounded="sm">
              t
            </Box>
            <Box id="y" w={6} h={6} textAlign="center" rounded="sm">
              y
            </Box>
            <Box id="u" w={6} h={6} textAlign="center" rounded="sm">
              u
            </Box>
            <Box id="i" w={6} h={6} textAlign="center" rounded="sm">
              i
            </Box>
            <Box id="o" w={6} h={6} textAlign="center" rounded="sm">
              o
            </Box>
            <Box id="p" w={6} h={6} textAlign="center" rounded="sm">
              p
            </Box>
          </Flex>
        </Center>
        <Center>
          <Flex gap={1} mt={1}>
            <Box id="a" w={6} h={6} textAlign="center" rounded="sm">
              a
            </Box>
            <Box id="s" w={6} h={6} textAlign="center" rounded="sm">
              s
            </Box>
            <Box id="d" w={6} h={6} textAlign="center" rounded="sm">
              d
            </Box>
            <Box id="f" w={6} h={6} textAlign="center" rounded="sm">
              f
            </Box>
            <Box id="g" w={6} h={6} textAlign="center" rounded="sm">
              g
            </Box>
            <Box id="h" w={6} h={6} textAlign="center" rounded="sm">
              h
            </Box>
            <Box id="j" w={6} h={6} textAlign="center" rounded="sm">
              j
            </Box>
            <Box id="k" w={6} h={6} textAlign="center" rounded="sm">
              k
            </Box>
            <Box id="l" w={6} h={6} textAlign="center" rounded="sm">
              l
            </Box>
          </Flex>
        </Center>
        <Center>
          <Flex gap={1} mt={1}>
            <Box id="z" w={6} h={6} textAlign="center" rounded="sm">
              z
            </Box>
            <Box id="x" w={6} h={6} textAlign="center" rounded="sm">
              x
            </Box>
            <Box id="c" w={6} h={6} textAlign="center" rounded="sm">
              c
            </Box>
            <Box id="v" w={6} h={6} textAlign="center" rounded="sm">
              v
            </Box>
            <Box id="b" w={6} h={6} textAlign="center" rounded="sm">
              b
            </Box>
            <Box id="n" w={6} h={6} textAlign="center" rounded="sm">
              n
            </Box>
            <Box id="m" w={6} h={6} textAlign="center" rounded="sm">
              m
            </Box>
          </Flex>
        </Center>
      </Box>
      <Center pos="fixed" left="49%" bottom={0} pb={1}>
        by nl
      </Center>
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
      <div key={i} className={className}>
        {char}
      </div>
    );
    className = "tile";
  }
  return <div className="line">{tiles}</div>;
}
