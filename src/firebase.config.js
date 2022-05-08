// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCeWMHWZiDy5aCPr2k2GPnn1OLigckNMFM',
  authDomain: 'house-market-709dc.firebaseapp.com',
  projectId: 'house-market-709dc',
  storageBucket: 'house-market-709dc.appspot.com',
  messagingSenderId: '1074540211584',
  appId: '1:1074540211584:web:106b03e96b02be2a6f6565',
  measurementId: 'G-HL3M2M5LSY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
