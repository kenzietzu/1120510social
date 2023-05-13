import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import { Form } from 'react-router-dom'
import { useRegister } from '../hooks/auth';
import { useActionData } from "react-router-dom";

export const registerAction = async ({ request }) => {
	const res = await request.formData();
    const data = {
        username: res.get("username"),
        email: res.get("email"),
        password: res.get("password"),
    }
    return data
}

const Register = () => {
    const { signup, isloading } = useRegister();
    const data = useActionData();

    const handleRegister = () => {
        if (data) {
            signup({
                username: data.username,
                email: data.email,
                password: data.password
            });
        }
    }
    

  return (
    <>
        <Center mt="200px">
            <Box direction="column">
                <Heading textAlign="center" mb="20px">Register</Heading>
                <Form method="post" onSubmit={handleRegister}> 
                    <FormControl isRequired> 
                        <FormLabel>USERNAME</FormLabel>
                        <Input type="text" name="username" bg="white" w="250px" />
                        <FormHelperText></FormHelperText>
                    </FormControl>                 
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
            </Box>
		</Center>
    </>
  )
}

export default Register