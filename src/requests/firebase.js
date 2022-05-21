import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { updatePassword } from 'firebase/auth';
import { getDatabase, update } from 'firebase/database';
import { get, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

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
  let result;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      result = userCredential.user;
    })
    .catch((error) => {
      result = error;
    });
  return result;
}
export async function signInUser(email, password) {
  let result;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      result = userCredential.user;
    })
    .catch((error) => {
      result = error;
    });
  return result;
}

export async function updateUserData(displayName, photoURL) {
  let result;
  await updateProfile(auth.currentUser, { displayName, photoURL })
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
}
export function changePassword(newPassword) {
  const user = auth.currentUser;
  updatePassword(user, newPassword)
    .then(() => {
      // Update successful.
    })
    .catch((error) => {
      // An error ocurred
    });
}

export async function sendEmailVerif() {
  return await sendEmailVerification(auth.currentUser);
}
export function signOutUser() {
  signOut(auth);
}

export async function getUserData(username) {
  const snapshot = await get(ref(database, `/users/${username}`));
  return await snapshot.val();
}

export function writeUserData({ username, email, displayName, gender, avatar }) {
  set(ref(database, `/users/${username}`), {
    username,
    email,
    displayName,
    gender,
    avatar,
    permission: 'user',
  });
}
export async function getHotelNumbers() {
  const snapshot = await get(ref(database, `/hotel`));
  return await snapshot.val();
}
export const hotelRef = ref(database, '/hotel');

export async function setRoomInfo(roomNumber, roomInfo) {
  const floor = String(roomNumber).slice(0, -1) - 1;
  const room = String(roomNumber).slice(-1) - 1;
  const roomRef = ref(database, `/hotel/${floor}/${room}`);
  const uid = uuidv4();
  const logRef = ref(database, `/logs/${uid}`);
  const result = await update(roomRef, roomInfo);
  const logResult = await update(logRef, roomInfo);
  return [result, logResult];
}
