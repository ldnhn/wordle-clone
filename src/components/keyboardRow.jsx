import { Box } from '@chakra-ui/react';

const KeyboardRow = ({ id, text }) => (
  <Box
    id={id}
    w={6}
    h={6}
    textAlign="center"
    rounded="sm"
    fontWeight="semibold"
    color="gray.600"
  >
    {text}
  </Box>
);

export default KeyboardRow;