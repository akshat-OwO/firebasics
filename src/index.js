import { initializeApp } from 'firebase/app';

import {
    addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where
} from 'firebase/firestore';

import {
    createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from 'firebase/auth';

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
const auth = getAuth();

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

// get a single document
const docRef = doc(db, 'books', 'k4z2I7PWw2vdHeFbu6It');

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
});

// updating document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateForm.id.value);
    updateDoc(docRef, {
        title: 'updated title'
    })
    .then(() => {
        updateForm.reset();
    });
});

// signing users up
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((Credential) => {
            // console.log('user created:', Credential.user);
            signupForm.reset();
        })
        .catch(err => {
            console.log(err.message);
        });
});

// logging in and out
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // console.log('user signed out');
        })
        .catch(err => {
            console.log(err.message);
        });
});

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('user logged in:', cred.user);
        })
        .catch(err => {
            console.log(err.message);
        });
});

// suscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user);
})