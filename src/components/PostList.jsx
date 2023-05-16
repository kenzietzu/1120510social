import { Text } from '@chakra-ui/react'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firestore'
import Post from './Post'
import { useCollectionData } from "react-firebase-hooks/firestore"

const PostList = () => {
  const collectionRef = collection(db, "posts");    
  const q = query(collectionRef, orderBy("date", "desc"));
  const [posts, loading, error, snapshot] = useCollectionData(q);
  
  if (loading) return <Text>Loading...</Text>
  return (
    <>
      {posts.map(doc => {
        return <Post key={doc.id} {...doc} />
      })}
    </>
  )
}

export default PostList