import { Avatar } from '@chakra-ui/react'
import React from 'react'

const ProfileAvatar = ({size, src}) => {
  return (
    <Avatar name="Charlie" size={size} bg="gray.400" src={src} />
  )
}

export default ProfileAvatar