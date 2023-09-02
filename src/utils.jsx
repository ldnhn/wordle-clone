import { Box } from "@chakra-ui/react";

export function isWordInList(word, wordList) {
    return wordList.includes(word);
}

export function Line({ guess, isFinal, chosenWord, wordList }) {
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
  