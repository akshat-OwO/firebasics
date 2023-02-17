import { initializeApp } from 'firebase/app';

import {
    collection,
    getDocs, getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyApUNPNrr-NiTc0hl3C-60cw7knfu0sQD0",
    authDomain: "something-unique-9b932.firebaseapp.com",
    projectId: "something-unique-9b932",
    storageBucket: "something-unique-9b932.appspot.com",
    messagingSenderId: "749115447002",
    appId: "1:749115447002:web:39a8954d760c46756977e3",
    measurementId: "G-Q9RD61ET2Y"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach(doc => {
            books.push({ ...doc.data(), id: doc.id })
        });
        console.log(books);
    })
    .catch(err => {
        console.log(err.message);
    });