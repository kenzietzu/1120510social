import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Spacer, Textarea } from '@chakra-ui/react'
import { doc, setDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import reactTextareaAutosize from 'react-textarea-autosize'
import { useAuth } from '../hooks/auth'
import { db } from '../lib/firestore'
import PostList from './PostList'

const Main = () => {
  const {user, authUser, authLoading} = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const handleAddPost = async(data) => {
    try {
      const id = crypto.randomUUID();
      const docRef = doc(db, "posts", id);
      const payload = {
          id: id,
          uid: authUser.uid,
          text: data.post,
          likes: [],
          date: Date.now(),
      } 
      await setDoc(docRef, payload)
      reset();
      alert("Post added!");
    } catch(error) {
        alert(error.message);
    } 
  };

  return (
    <>
      <Box>
        <Heading size="lg">+ Add New Post</Heading>
        <form onSubmit={handleSubmit(handleAddPost)}>
          <FormControl>
            <FormLabel></FormLabel>
            <Textarea as={reactTextareaAutosize} resize="none" type="textarea" placeholder="What's on your mind?" name="post" mt="20px" {...register("post") }></Textarea>
          </FormControl>
          <Flex w="100%">
            <Spacer/>
            <Button type="submit" mt="10px">Send</Button>
          </Flex>
        </form>
      </Box>
      <Divider my="20px"/>
      <PostList />
    </>
  )
}

export default Main