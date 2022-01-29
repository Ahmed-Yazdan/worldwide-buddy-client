import { useEffect, useState } from 'react';
import initializeAuthentication from '../Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const singInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)
        .then(result => {
            setUser(result.user)
        }).finally( ()=>setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        })
        return () => unsubscribed;
    }, []);

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
    }

    return {
        user,
        error,
        singInUsingGoogle,
        logOut,
        isLoading
    }
}

export default useFirebase;