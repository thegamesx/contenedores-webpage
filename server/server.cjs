const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

app.use(cors()); // Enable CORS for all routes

// Define the data
const data = [
  {
    name: "000",
    temp: -10,
    compresor: false,
    evaporacion: false,
    defrost: true,
    arranque_comp: false,
    bateria: true,
    alarma: false,
    defrost_status: true,
  },
  {
    name: "001",
    temp: -18,
    compresor: false,
    evaporacion: false,
    defrost: true,
    arranque_comp: true,
    bateria: true,
    alarma: false,
    defrost_status: false,
  },
  {
    name: "002",
    temp: -10,
    compresor: false,
    evaporacion: false,
    defrost: true,
    arranque_comp: false,
    bateria: true,
    alarma: true,
    defrost_status: true,
  },
];

// Define a route to handle GET requests
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
