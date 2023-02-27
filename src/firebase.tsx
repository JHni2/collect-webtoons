// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBhrG-2lliqD_ddvgZGwL-HRRldngE98pw',
  authDomain: 'collect-webtoons.firebaseapp.com',
  projectId: 'collect-webtoons',
  storageBucket: 'collect-webtoons.appspot.com',
  messagingSenderId: '328194434203',
  appId: '1:328194434203:web:0975459124ef1605dcd23e',
  measurementId: 'G-759JW4N6LR',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
