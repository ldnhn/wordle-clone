import {
    Slide,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Center,
    Heading,
    Text,
    Divider,
    UnorderedList,
    ListItem,
  } from '@chakra-ui/react';
import React from 'react';


const WelcomePanel = () => {
    return (
        <>
          <Slide direction="top" in style={{ zIndex: 10 }}>
            <Modal isOpen>
              <ModalOverlay />
              <ModalContent>
                <Center>
                  <ModalHeader>
                    <Heading as="h3" size="lg">
                      Welcome
                    </Heading>
                  </ModalHeader>
                </Center>
                <ModalBody>
                  <Center>
                    <Text>
                      You got
                      <span style={{ fontWeight: "bold" }}> 6 guesses </span>
                      to find a{" "}
                      <span style={{ fontWeight: "bold" }}>
                        five-letter-word
                      </span>
                      .
                    </Text>
                  </Center>
                  <Divider />

                  <Center>
                    <UnorderedList>
                      <ListItem>
                        <Text as="b" color="#5a9c51">
                          Correct position.
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text as="b" color="#bea647">
                          Wrong position.
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text as="b" color="#65696b">
                          Wrong letter.
                        </Text>
                      </ListItem>
                    </UnorderedList>
                  </Center>

                  <Divider />
                  <br />
                  <Center>
                    <Text as="b">Good luck!</Text>
                  </Center>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Slide>
        </>
    )
}

export default WelcomePanel;