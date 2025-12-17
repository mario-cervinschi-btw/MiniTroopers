/*
0. In your HTML, import this JavaScript file. Bonus points: try to do it from the <head> without blocking the <body> rendering.
*/
document.addEventListener("DOMContentLoaded", function () {
  /*
1. Variable scopes: based on MDN an exampl, makee how function scope, block scope, and global scope:
* https://developer.mozilla.org/en-US/docs/Glossary/Scope
*/
  const z = "|got global scope|";

  function scopeExercise() {
    // function scope
    let x = "|got function scope|";

    x = x + z;
    // block scope
    if (true) {
      const y = "|got block scope|";
      x = x + y;
    }

    // return y; // should give an error
    return x;
  }

  console.log("1. Scope exercise:", scopeExercise());

  /*
2. Strings: Display the bio of Ada Lovelace in the form of "Hello, my name is Ada Lovelace, I was born 36 years ago."
*/
  const firstName = "Ada";
  const lastName = "Lovelace";
  const age = 36;

  // or using +
  console.log(
    `2. Bio: Hello, my name is ${firstName} ${lastName}, I was born ${age} years ago.`
  );

  /*
3. Objects: Declare an object, access/update properties, add a new property, delete a property, and iterate keys.
*/
  const person = {
    name: "Ada",
    age: 36,
    skills: ["math", "programming"],
    address: { city: "London", country: "UK" },
  };

  console.log(
    `3. Log the person\`s name and city: ${person.name} from ${person.address.city}`
  );

  // 3.2 update properties
  person.age = 37;
  console.log(`3. Update age: ${person.age}`);

  // 3.3 add new property
  person.role = "Politician";
  console.log(`3. Add role: ${person.role}`);

  delete person.address.country;
  console.log(`3. Delete country:`);
  console.log(person);

  // 3.4 iterate keys
  console.log(
    "3. Iterate keys:" /* iterate over the object's keys and values and log them */
  );

  for (let [key, value] of Object.entries(person)) {
    console.log(key, ": ", value);
  }

  /*
4. Write a function that makes a string sentence cased - starts with capital letter and ends with "."
* Don't focus on edge cases for now (like multiple spaces, punctuation, etc), it needs only to handle this string.
*/
  const sentence = "   hello there GENERAL KENOBI   ";

  function toSentenceCase(str) {
    // removing spaces from start and end of sentence
    str = str.trim().toLowerCase();
    // splitting the words into an array and then converting it into a string
    // to remove spaces between words
    str = str.split(/\s+/).join(" ");
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str + ".";
  }

  console.log("4. Sentence-cased sentence:", toSentenceCase(sentence));

  /*
5. Iterate the greeting, log the current character, index and 🎅.
*/
  const greeting = "Ho Ho Ho! Merry Christmas!";

  console.log("5. Indexed iteration:");
  [...greeting].forEach((index, el) => {
    console.log(`Index ${index}: ${el} 🎅`);
  });

  /** Array Methods **/
  /*
6. Write a function that receives the array below as parameters and returns a new array which has all the elements added with 2
*/
  var strArr = ["13", "2", "34", "14", "5", "86", "3.46"];

  function addInNewArray(arr) {
    return arr.map((num) => +num + 2);
  }

  console.log("6. Add in new array: ", addInNewArray(strArr));

  /* 
7. Implement a function that receives an array of objects and a key name and returns an array with all the values corresponding to the key of the objects in the array.
*/
  const mappings = [
    { id: 1, color: "magenta", height: 15, width: 20, distance: 10 },
    { id: 2, color: "red", height: 5, width: 30, distance: 15 },
    { id: 3, color: "green", height: 7, width: 9, distance: 8 },
    { id: 4, color: "gray", height: 2, width: 3, distance: 3 },
    { id: 5, color: "blue", height: 10, width: 10, distance: 2 },
    { id: 6, color: "crimson", height: 7, width: 8, distance: 16 },
  ];

  // getting only objects that actually have the key attribute
  // otherwise returning empty array
  function pluck(arr, key) {
    return arr.filter((obj) => key in obj).map((obj) => obj[key]);
  }

  console.log("7.", pluck(mappings, "color")); // => ['magenta', 'red', 'green' .......];

  /*
9. Implement a function that returns the area of all elements in the above array, area = height * width.
*/
  function calculateArea(arr) {
    return arr.map((obj) => ({ id: obj.id, area: obj.height * obj.width }));
  }
  console.log("9. (where is 8?)", calculateArea(mappings));

  /*
10. Write a function that returns a subset of the above array where the elements have an area smaller or equal to 100
*/
  function filterArr(arr) {
    const areaArr = calculateArea(arr);
    return areaArr.filter((obj) => obj.area <= 100);
  }
  console.log("10.", filterArr(mappings));

  /*
11. Implement a function called reject, which receives an array and an iterator function.
The iterator function receives each element in the array as a parameter and must return true or false. 
If it returns true, the element will not be included by the parent function in the resulting array.
If returns false it will be included.
*/
  function iterator(obj) {
    return obj.height < 10;
  }

  function reject(arr, iter) {
    return arr.filter((obj) => !iter(obj));
  }

  console.log("11.", reject(mappings, iterator)); // return an array of objects with height < 10

  /*
12. Write a function that return the element with the color 'magenta', null otherwise.
*/
  function findColor(arr, color) {
    const found = arr.find((obj) => obj.color === color);
    return found || null;
  }

  console.log("12.", findColor(mappings, "magenta"));

  /*
13. Write a function that returns true if all elements in the array have the area > = 10, false otherwise.
*/
  function getAreasAreBigger(mappings, area) {
    return calculateArea(mappings).every((obj) => obj.area >= 10);
  }
  console.log("13.", getAreasAreBigger(mappings, 10));

  /*
14. Write a function that returns true if at least one of the array elements has the color 'green'; false otherwise.
*/
  function returnAtLeastOneIsOfColor(mappings, color) {
    return findColor(mappings, color) ? true : false;
  }
  console.log("14.", returnAtLeastOneIsOfColor(mappings, "balarie"));

  /*
15. Write a function that returns the total distance (the sum of the element distances).
*/
  function getTotalDistance(mappings) {
    return mappings.reduce((sum, obj) => {
      return sum + obj.distance;
    }, 0);
  }
  console.log("15. Sum of distances: ", getTotalDistance(mappings));

  /*
16. Write a function that returns an object that counts how many times each color appears in the object array. {red: 2, blue: 1, etc ...}
*/
  function getNumberOfColors(mappings) {
    let colorCounter = {};

    mappings.forEach((element) => {
      colorCounter[element.color]
        ? colorCounter[element.color]++
        : (colorCounter[element.color] = 1);
    });

    return colorCounter;
  }
  console.log("16. Number of colors: ", getNumberOfColors(mappings));

  /*
17. Write a function that returns an array with all elements having a unique color. Any element after the first one that has a color that would repeat is not included in the array.
*/
  function getUniqueColors(mappings) {
    const colorCounter = getNumberOfColors(mappings);

    return mappings.filter((element) => colorCounter[element.color] === 1);
  }
  console.log("17. Unique Colors: ", getUniqueColors(mappings));

  /*
18. Write a function which inverts two numbers.
*/
  let a = 5,
    b = 8;

  function invertNumbers() {
    [a, b] = [b, a];
  }
  invertNumbers();

  console.log("18. A:", a, "B:", b);

  /*
19. Using the array below, get a variable that contains an array of objects structured like this:
[
  {subject: 'Chemistry', time: '9AM', teacher: 'Mr. Darnick'},
  ...
]
*/
  const classes = [
    ["Chemistry", "9AM", "Mr. Darnick"],
    ["Physics", "10:15AM", "Mrs. Lithun"],
    ["Math", "11:30AM", "Mrs. Vitalis"],
  ];

  function Timetable(subject, time, teacher) {
    this.subject = subject;
    this.time = time;
    this.teacher = teacher;
  }

  const objClasses = [];
  classes.forEach((el) => {
    [subject, time, name] = el;

    objClasses.push(new Timetable(subject, time, name));
  });

  console.log("19.", objClasses);

  //extra testing after document loaded
  document.getElementById("bob").addEventListener("click", function () {
    console.log("clicked");
  });
});
