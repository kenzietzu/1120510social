import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firestore';
import isUsernameExists from '../utils/isUsernameExists';

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

export const useRegister = () => {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const signup = async({username, email, password}) => {
        setLoading(true);
        const usernameExists = await isUsernameExists(username);
        if (usernameExists) {
            alert("Username exists");
            setLoading(false);
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                const docRef = doc(db, "users", res.user.uid) 
                const payload = {
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    avatar: "",
                    date: Date.now(),
                } 
                await setDoc(docRef, payload)
                alert("Successfully registered!")
                navigate("/login");
            } catch(error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        }
    } 
  
    return { signup, isLoading };
}

export const useLogin = () => {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const login = async({email, password}) => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            alert("Successfully logged in!")
            navigate("/");
        } catch(error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    } 
  
    return { login, isLoading };
}