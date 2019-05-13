import Firebase from 'firebase';
import '@firebase/firestore';
import firebaseConfig from './keys/firebase';

// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (err) {
//   console.log(err.message);
// }

let app = Firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
