// Define the function to generate a random delay
function randomDelay() {
  return Math.floor(Math.random() * 2000) + 1000; // Returns a random number between 1000 and 3000 milliseconds (1-3 seconds)
}

// Define a function to create a Promise with a random delay
function createPromise(name) {
  return new Promise((resolve) => {
    const delay = randomDelay();
    setTimeout(() => {
      console.log(`${name} resolved after ${delay / 1000} seconds`);
      resolve({ name, delay });
    }, delay);
  });
}

// Create an array of Promises
const promises = [
  createPromise('Promise 1'),
  createPromise('Promise 2'),
  createPromise('Promise 3')
];

// Get the table body element
const output = document.getElementById('output');

// Add loading row
const loadingRow = `<tr><td colspan="2">Loading...</td></tr>`;
output.insertAdjacentHTML('beforeend', loadingRow);

// Use Promise.all to wait for all Promises to resolve
Promise.all(promises)
  .then((results) => {
    // Clear the loading row
    output.innerHTML = '';

    // Populate the table with results
    results.forEach((result, index) => {
      const promiseName = result.name;
      const timeTaken = (result.delay / 1000).toFixed(3);
      const row = `<tr><td>${promiseName}</td><td>${timeTaken}</td></tr>`;
      output.insertAdjacentHTML('beforeend', row);
    });

    // Calculate and add the total time taken
    const totalTimeTaken = (results.reduce((total, current) => total + current.delay, 0) / 1000).toFixed(3);
    const totalRow = `<tr><td>Total</td><td>${totalTimeTaken}</td></tr>`;
    output.insertAdjacentHTML('beforeend', totalRow);
  })
  .catch((error) => {
    console.error('One or more promises failed', error);
  });
