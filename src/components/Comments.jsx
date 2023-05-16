import { Box, Button, Code, Divider, Flex, FormControl, FormLabel, Heading, IconButton, Input, Spacer, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../hooks/auth'
import ProfileAvatar from './ProfileAvatar'
import { formatDistanceToNow } from "date-fns"
import { AiOutlineMeh, AiFillMeh, AiOutlineMessage, AiFillMessage } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"
import { arrayRemove, arrayUnion, doc, getDoc, query, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firestore'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { useDocumentData} from "react-firebase-hooks/firestore"
import CommentsList from './CommentsList'

const Comments = () => {
    const { isOpen: isOpenComment, onOpen: onOpenComment, onClose: onCloseComment } = useDisclosure();

  return (
    <>
        <IconButton onClick={onOpenComment} colorScheme="yellow" variant="ghost" isRound mx="6px" icon={<AiOutlineMessage size="xs" />} />
        <Text fontSize="xl" color="yellow.700">0</Text>

        <Modal isOpen={isOpenComment} onClose={onCloseComment} size="4xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Text mb="10px"><CommentsList/></Text>
                        <Box>
                            <form>
                                <FormControl>
                                    <FormLabel>Write a comment</FormLabel>
                                    <Textarea minRows={3} mb="10px" placeholder="..."/>
                                    <Flex>
                                        <Spacer />
                                        <Button colorScheme='blue' mr={3}>Send</Button>
                                    </Flex>
                                </FormControl>
                            </form>
                        </Box>
                    </Box>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default Comments

