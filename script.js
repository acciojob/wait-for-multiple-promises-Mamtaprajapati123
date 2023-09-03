// script.js

function randomDelay() {
  return Math.floor(Math.random() * 2000) + 1000; // Random number between 1000 and 3000 milliseconds (1-3 seconds)
}

function createPromise(name) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    setTimeout(() => {
      const success = Math.random() < 0.8; // Simulate 80% success rate
      if (success) {
        console.log(`${name} resolved after ${delay / 1000} seconds`);
        resolve(delay);
      } else {
        console.error(`${name} failed`);
        reject(`${name} failed`);
      }
    }, delay);
  });
}

Promise.all([
  createPromise('Promise 1'),
  createPromise('Promise 2'),
  createPromise('Promise 3')
])
  .then((values) => {
    const output = document.getElementById('output');
    output.innerHTML = '';

    values.forEach((value, index) => {
      const promiseName = `Promise ${index + 1}`;
      const timeTaken = `${(value / 1000).toFixed(3)}`;
      const row = `<tr><td>${promiseName}</td><td>${timeTaken}</td></tr>`;
      output.insertAdjacentHTML('beforeend', row);
    });

    const totalTimeTaken = `${(
      values.reduce((total, current) => total + current) / 1000
    ).toFixed(3)}`;
    const totalRow = `<tr><td>Total</td><td>${totalTimeTaken}</td></tr>`;
    output.insertAdjacentHTML('beforeend', totalRow);
  })
  .catch((error) => {
    console.error('One or more promises failed', error);
  });
