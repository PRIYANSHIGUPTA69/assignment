

import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp(
    {
        apiKey: "AIzaSyAoJCSLcPr8ZHXeA8LINnnf3XmSUnyRV4g",
        authDomain: "assignment-d357e.firebaseapp.com",
        projectId: "assignment-d357e",
        storageBucket: "assignment-d357e.appspot.com",
        messagingSenderId: "494921839119",
        appId: "1:494921839119:web:7940eeb605fc5977b9a97a"
      }
)

export const firestore = firebase.firestore();
export const database ={
    inventory:firestore.collection('inventory'),
    items:firestore.collection('items'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();