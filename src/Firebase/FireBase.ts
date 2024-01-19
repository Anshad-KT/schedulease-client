// Import necessary functions from Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Successfully signed in with Google:', result);
    return result.user
  } catch (error:any) {
    console.error('Google Sign-In Error:', error.message);
  }
};

// Sign Out function
const signOutUser = async () => {
  try {
    const result = await signOut(auth);
    console.log('User signed out successfully');
    return result
  } catch (error: any) {
    console.error('Sign Out Error:', error.message);
  }
};



const observeAuthStateLoggedInSignup = () => {
    
    return new Promise<boolean>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('User is signed in:', user.displayName);
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
  };
  
  


export { signInWithGoogle, signOutUser, observeAuthStateLoggedInSignup };
