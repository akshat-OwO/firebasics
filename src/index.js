import { initializeApp } from 'firebase/app';

import {
    addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, where
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

// query
const q = query(colRef, orderBy('createdAt'));

// real time collection data
onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id })
    });
    console.log(books);
});


// adding Documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    }).then(() => {
        addBookForm.reset()
    });
});


// deleting Documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        });
});