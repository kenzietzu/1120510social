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
import Comments from './Comments'

  
  const Post = ({text, date, likes, id, uid}) => {
      const {user, authUser, authLoading} = useAuth();
      const { isOpen: isOpenLike, onOpen: onOpenLike, onClose: onCloseLike } = useDisclosure();
      const ownerQ = query(doc(db, "users", uid));
      const [owner, loading, error, snapshot] = useDocumentData(ownerQ);
    //   const [liker, setLiker] = useState(null);
    //   const getPostLiker = async(userid) => {
    //       const q = query(doc(db, "users", userid));
    //       const snapshot = await getDoc(q);
    //       const data = snapshot.data();
    //       setLiker(data);
    //   }

    const isLiked = likes.includes(user?.id);

    const toggleLike = async() => {
        const docRef = doc(db, "posts", id);
        try {
            if (isLiked) {
                await updateDoc(docRef, {
                    likes: arrayRemove(user.id)
                });
            } else {
                await updateDoc(docRef, {
                    likes: arrayUnion(user.id)
                });
            }
        } catch(error) {
            alert(error.message)
        }
    }

  return (
    <>
    <Flex mb="20px" bg="gray.100" p="10px">
        <ProfileAvatar size="lg" src={owner?.avatar}/>
        <Box ml="10px">
            <Code>@{owner?.username}</Code>
            <Text>posted {formatDistanceToNow(date)} ago</Text>
        </Box>
        <Spacer />
        <IconButton opacity="20%" colorScheme="gray" variant="ghost" isRound mx="8px" icon={<RxCross2 size="xs" />} />
    </Flex>
    <Box mb="20px">
     <Text fontSize="2xl">{text}</Text>
    </Box>
    <Flex mb="30px" align="center">
        <IconButton onClick={toggleLike} colorScheme="yellow" variant="ghost" isRound mx="6px" icon={isLiked ? <AiFillMeh size="xs" />:<AiOutlineMeh size="xs" />} />
        <Button variant="ghost" fontSize="xl" color="yellow.700" onClick={onOpenLike}>meh {likes.length}</Button>
        <Modal isOpen={isOpenLike} onClose={onCloseLike} size="4xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>meh</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* {likes.map(userid => {
                        return (
                            <Flex align="center" mb="10px" ml="20px">
                                <ProfileAvatar size="lg" src={userid}/>
                                <Text ml="10px">{userid}</Text>
                            </Flex>
                        )
                    })} */}
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Comments />
    </Flex>
    </>
  )
}

export default Post