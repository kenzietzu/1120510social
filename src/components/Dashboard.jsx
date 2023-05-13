import { Box, Container, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { useActionData } from 'react-router-dom'
import Main from './Main'
import Side from './Side'

const Dashboard = () => {
  // const postData = useActionData();

  return (
    <Container maxWidth="1000px">
        <Flex mt="20px">
            <Box w="700px" bgColor="gray.100" p="40px"><Main/></Box>
            <Box w="300px" bgColor="gray.100" p="40px" ml="20px"><Side /></Box>
        </Flex>
    </Container>
  )
}

export default Dashboard