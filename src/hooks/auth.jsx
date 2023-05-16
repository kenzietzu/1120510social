import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firestore';

export const useAuth = () => {
    const [authUser, authLoading, authError] = useAuthState(auth);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            setLoading(true);
            const docRef = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data());
            setLoading(false);
        }
        if (!authLoading) {
            if (authUser) fetchUser();
            else setLoading(false);
        }
    }, [authLoading]);

    return {user, authUser, authLoading};
}