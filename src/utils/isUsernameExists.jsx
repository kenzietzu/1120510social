import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firestore';

const isUsernameExists = async(username) => {
    const collectionRef = collection(db, "users");
	const q =  query(collectionRef, where("username", "==", username));
	const snapshot = await getDocs(q);
  
    return snapshot.size > 0;
}

export default isUsernameExists