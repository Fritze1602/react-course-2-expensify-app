import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCLNgTfIaCvEGZMKHbkq7mjic0fBWuqBMQ",
    authDomain: "expensify-9cf43.firebaseapp.com",
    databaseURL: "https://expensify-9cf43.firebaseio.com",
    projectId: "expensify-9cf43",
    storageBucket: "expensify-9cf43.appspot.com",
    messagingSenderId: "198697638830",
    appId: "1:198697638830:web:8b114b622fc4896722863f"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref('expenses').on("child_removed", (snapshot)=>{
    console.log(snapshot.key, snapshot.val());
})

database.ref('expenses').on('child_changed', (snapshot)=>{
    console.log(snapshot.key, snapshot.val())
})

database.ref('expenses').on('child_added', (snapshot)=>{
    console.log(snapshot.key, snapshot.val())
})

database.ref('expenses').push({
    description: 'yellow bears',
    note: '',
    amount: 195,
    createdAt: 235624560
});

// database.ref('expenses')
//     .once('value')
//     .then((snapshot)=>{
//        const expenses = [];
//        snapshot.forEach((childSnapshot)=>{
//            expenses.push({
//                id: childSnapshot.key,
//                ...childSnapshot.val()
//            })
//        })
//        console.log(expenses);
//     })
 
// const onValueChange = database.ref('expenses').on('value', (snapshot)=>{
//     const expenses = [];
//     snapshot.forEach((childSnapshot)=>{
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
// });