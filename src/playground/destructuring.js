const person = {
  name: 'Andrew',
  age: 26,
  location: {
    city: 'Philly',
    temp: 92
  }
};

// Destructuring and setting up defaults
const { name: nombre = 'Anonymous', age } = person;
console.log(`${nombre} is ${age}`);

// Destructuring with renaming code
const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}`);
}

const book = {
  title: 'Ego is the enemy',
  author: 'Steve Holiday',
  publisher: {
    name: 'Penguin'
  }
};

const { name: publisherName = 'Self-published' } = book.publisher;
console.log(publisherName);

// Destructuring arrays.
const address = ['1299 South Juniper St', 'Philadelphia', 'PA', '19147'];
const [, cityA, state] = address;

console.log(`Your are in ${cityA}, ${state}.`);
