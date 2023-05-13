import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { Form, Link as RouterLink, useActionData } from 'react-router-dom'
import { useLogin } from '../hooks/auth';

export const loginAction = async ({ request }) => {
	const res = await request.formData();
	const data = {
		email: res.get("email"),
        password: res.get("password")
	}
    return data
}

const Login = () => {
    const { login, isloading } = useLogin();
    const data = useActionData();
    console.log(data);

    const handleLogin = () => {
        if (data) {
            login({
                email: data.email,
                password: data.password
            });
        }
    }

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
                    <Button type="submit" w="100%" mt="20px" onClick={handleLogin}>SUBMIT</Button>
                </Form>
                <Text mt="20px">Don't have an account yet? <Link as={RouterLink} to="/register" color="red">Register</Link> here!</Text>
            </Box>
		</Center>
    </>
  )
}

export default Login