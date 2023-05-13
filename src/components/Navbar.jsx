import { Box, Button, Flex, HStack, Link, Spacer, Text } from '@chakra-ui/react'
import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../lib/firestore'
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/auth';


const Navbar = () => {
    const {user, authUser, authLoading} = useAuth();
    console.log(user);

    const handleLogout = async() => {
        await signOut(auth);
        alert("You've signed out!")
    }
  if (authLoading) return <Text px="20px" py="10px">Loading</Text>;
  return (
    <Flex w="100%" h="50px" px="20px" py="10px" justify="center">
        <HStack w="1000px">
            <Link fontWeight="bold" href="/">Home</Link>
            <Spacer/>
            {authUser
            ? <Button onClick={handleLogout}>Logout</Button>
            : <Button><Link href="/login">Login</Link></Button>}
        </HStack>
    </Flex>
  )
}

export default Navbar