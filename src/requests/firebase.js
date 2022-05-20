import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { updatePassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { get, ref, set } from 'firebase/database';

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

export async function createUser(email, password) {
  let user, err;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((error) => {
      err = error;
    });
  return err || user;
}
export async function signInUser(email, password) {
  let user, err;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((error) => {
      err = error;
    });
  return err || user;
}

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

async function sendEmailVerif() {
  await sendEmailVerification(auth.currentUser).then(() => {
    alert('Email verification sent!');
  });
}
export function signOutUser() {
  signOut(auth);
}

export async function getUserData(username) {
  const snapshot = await get(ref(database, `/users/${username}`));
  return await snapshot.val();
}

export function writeUserData({ username, email, displayName, gender }) {
  set(ref(database, `/users/${username}`), {
    username,
    email,
    displayName,
    gender,
    avatar: Math.round(Math.random() * 4),
    permission: 'user',
  });
}
