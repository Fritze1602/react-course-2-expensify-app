// const person = {
//     // name: 'Fritz',
//     age: 25,
//     location: {
//         city: 'HAM',
//         temp: 5
//     }
// }

// // const name = person.name;
// // const age = person.age;

// const { name : firstname = 'Anonymous', age } = person;

// console.log(`${firstname} is ${age} years old `)


// const { city, temp:temperature } = person.location

// if (temperature && temperature) {
//     console.log(`its ${temperature} in ${city}`)
// }

// const book = {
//     title: 'Ego is Enemy',
//     author: 'Ryan Holiday',
//     publisher : {
//         // name: 'Penguin'
//     }
// }

// const { name : publisherName = 'self published' } = book.publisher

// console.log(publisherName) 
// selfPublished Default

const address = [];

const [, city = 'Hamburg', , zip ] = address;

console.log(`You are in ${city}`)



const item =['Coffee', 2, 3.2, 3.5];

const [product, , mediumPrice] = item

console.log(`A Medium ${product} (hot) costs ${mediumPrice}`);

