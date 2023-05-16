import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { Form, Link as RouterLink, redirect } from 'react-router-dom'
import { auth } from '../lib/firestore';

export const loginAction = async ({ request }) => {
	const res = await request.formData();
	const data = {
		email: res.get("email"),
        password: res.get("password")
	}
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        alert("Successfully logged in!");
    } catch(error) {
        alert(error.message);
    } 
    return redirect("/")
}

const Login = () => {

  return (
    <>
        <Center mt="200px">
            <Box direction="column">
                <Heading textAlign="center" mb="20px">Login</Heading>
                <Form method="post" replace> 
                    <FormControl isRequired> 
                        <FormLabel>EMAIL</FormLabel>
                        <Input type="email" name="email" bg="white" w="250px" />
                        <FormHelperText></FormHelperText>
                    </FormControl> 
                    <FormControl isRequired> 
                        <FormLabel>PASSWORD</FormLabel>
                        <Input type="password" name="password" bg="white" />
                        <FormHelperText></FormHelperText>
                    </FormControl> 
                    <Button type="submit" w="100%" mt="20px">SUBMIT</Button>
                </Form>
                <Text mt="20px">Don't have an account yet? <Link as={RouterLink} to="/register" color="red">Register</Link> here!</Text>
            </Box>
		</Center>
    </>
  )
}

export default Login