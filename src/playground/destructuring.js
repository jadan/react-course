const person = {
  name: 'Andrew',
  age: 26,
  location: {
    city: 'Philly',
    temp: 92
  }
};

const { name, age } = person;
console.log(`${name} is ${age}`);

// Destructuring with renaming code
const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}`);
}

