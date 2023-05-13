import { Button, Center, Code, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import ProfileAvatar from './ProfileAvatar'

const Side = () => {
  const {user, authUser, authLoading} = useAuth();


  if (authLoading) return <Text px="20px" py="10px">Loading</Text>;
  return ( 
    <Center>
      <VStack>
        <ProfileAvatar />
        <Code>@{user?.username}</Code>
        <Button><Link>Edit Profile</Link></Button>
      </VStack>
    </Center>
  )
}

export default Side