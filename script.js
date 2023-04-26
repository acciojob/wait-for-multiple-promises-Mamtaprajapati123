// Get the table element and the tbody element
const table = document.querySelector('table');
const tbody = table.querySelector('tbody');

// Create an array of 3 Promises that resolve after a random time between 1 and 3 seconds
const promises = [
  new Promise(resolve => setTimeout(() => resolve(Math.random() * 2 + 1), Math.random() * 2000 + 1000)),
  new Promise(resolve => setTimeout(() => resolve(Math.random() * 2 + 1), Math.random() * 2000 + 1000)),
  new Promise(resolve => setTimeout(() => resolve(Math.random() * 2 + 1), Math.random() * 2000 + 1000))
];

// Add a row that spans 2 columns with the text "Loading..."
const loadingRow = tbody.querySelector('tr');
loadingRow.innerHTML = '<td colspan="2">Loading...</td>';

// Wait for all the Promises to resolve using Promise.all()
Promise.all(promises)
  .then(results => {
    // Remove the loading row
    tbody.removeChild(loadingRow);
    
    // Create a row for each Promise and its time taken to resolve
    results.forEach((time, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>Promise ${index + 1}</td><td>${time.toFixed(3)}</td>`;
      tbody.appendChild(row);
    });
    
    // Create a row for the total time taken to resolve all Promises
    const totalTime = results.reduce((total, time) => total + time, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    tbody.appendChild(totalRow);
  });
