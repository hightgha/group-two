import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { updatePassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import { ref, set } from 'firebase/database';
export const app = initializeApp({
  apiKey: 'AIzaSyCDoUMfv-TeUdvXCzkxwp1466BBhAkKj00',
  authDomain: 'project-group-two.firebaseapp.com',
  projectId: 'project-group-two',
  storageBucket: 'project-group-two.appspot.com',
  messagingSenderId: '566237440640',
  appId: '1:566237440640:web:a864ef7a90fe886f29d465',
  measurementId: 'G-6TTPZEQ4H1',
  databaseURL: 'https://project-group-two-default-rtdb.europe-west1.firebasedatabase.app/',
});
export const auth = getAuth(app);
export const database = getDatabase(app);
console.log(database);

export async function createUser(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log('user created');
}
async function signInUser(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log('login user');
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    const uid = user.uid;
    console.log('signed in');
  } else {
    // User is signed out
    console.log('signed out');
  }
});
function updateProData(displayName, photoURL) {
  updateProfile(auth.currentUser, { displayName, photoURL })
    .then(() => {
      // Profile updated!
    })
    .catch((error) => {
      // An error occurred
    });
}
function changePassword(newPassword) {
  const user = auth.currentUser;
  updatePassword(user, newPassword)
    .then(() => {
      // Update successful.
    })
    .catch((error) => {
      // An error ocurred
    });
}

function sendEmailVerif() {
  sendEmailVerification(auth.currentUser).then(() => {
    alert('Email verification sent!');
  });
}
function signOutUser() {
  signOut(auth);
}
signOutUser();

function writeRoomStatus(roomNumber, bookedName) {
  set(ref(database, `/rooms/${roomNumber}`), {
    roomNumber,
    bookedName,
  });
}
