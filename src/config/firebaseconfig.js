import firebase from '@react-native-firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB4AflN8j0b0vxcDErOdqev80NahbnJ2k8',
  authDomain: 'manipulacao-833d1.firebaseapp.com',
  databaseURL: 'https://manipulacao-833d1-default-rtdb.firebaseio.com',
  projectId: 'manipulacao-833d1',
  storageBucket: 'manipulacao-833d1.appspot.com',
  messagingSenderId: '28791682199',
  appId: '1:28791682199:web:23e5f7e3cd4b391e6565d2',
  measurementId: 'G-YCYCCGVNH4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
