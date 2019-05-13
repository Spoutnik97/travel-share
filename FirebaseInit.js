import firebase from 'firebase';
import '@firebase/firestore';
import firebaseConfig from './keys/firebase';

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.log(err.message);
}
