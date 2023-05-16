import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import { Form, redirect } from 'react-router-dom'
import isUsernameExists from '../utils/isUsernameExists';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firestore';
import { doc, setDoc } from 'firebase/firestore';

export const registerAction = async ({ request }) => {
	const res = await request.formData();
    const data = {
        username: res.get("username"),
        email: res.get("email"),
        password: res.get("password"),
    }
    const usernameExists = await isUsernameExists(data.username);
        if (usernameExists) {
            alert("Username exists");
            return null;
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
                const docRef = doc(db, "users", res.user.uid) 
                const payload = {
                    id: res.user.uid,
                    username: data.username.toLowerCase(),
                    avatar: "",
                    date: Date.now(),
                } 
                await setDoc(docRef, payload)
                alert("Successfully registered!")
            } catch(error) {
                alert(error.message);
            } 
        }
    return redirect("/login");
}

const Register = () => {

  return (
    <>
        <Center mt="200px">
            <Box direction="column">
                <Heading textAlign="center" mb="20px">Register</Heading>
                <Form method="post" replace> 
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