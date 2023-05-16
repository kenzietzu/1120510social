import { Box, Container, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import Main from './Main'
import Side from './Side'

const Dashboard = () => {

  return (
    <Container maxWidth="1000px">
        <HStack mt="20px" align="start" spacing="10px">
            <Box w="700px" bgColor="gray.50" p="40px"><Main/></Box>
            <Box w="300px" bgColor="gray.100" p="40px" borderRightRadius="15px"><Side /></Box>
        </HStack>
    </Container>
  )
}

export default Dashboard