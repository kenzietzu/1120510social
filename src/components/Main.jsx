import { Box, Button, Divider, Flex, Heading, Spacer, Textarea } from '@chakra-ui/react'
import React from 'react'
import { Form, useActionData } from 'react-router-dom'
import PostList from './PostList'

export const postAction = async({request}) => {
  const formData = await request.formData();
  const post = formData.get("post");
  return post
}

const Main = () => {
  const postData = useActionData();
  console.log(postData);

  return (
    <>
      <Box>
        <Heading size="lg">+ Add New Post</Heading>
        <Form method="post">
          <Textarea type="textarea" name="post" mt="20px"></Textarea>
          <Flex w="100%">
            <Spacer/>
            <Button type="submit" mt="10px">Send</Button>
          </Flex>
        </Form>
      </Box>
      <Divider my="20px"/>
      <PostList />
    </>
  )
}

export default Main