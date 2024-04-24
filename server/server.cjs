const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

app.use(cors()); // Enable CORS for all routes

// Define the data
const data = {
  "status": {
    "statusList": [
      {
        "status": {
          "cont_id": 258,
          "name": "Sin nombre",
          "temp": 25,
          "defrost": true,
          "arranque_comp": false,
          "bateria": true,
          "alarma": true,
          "defrost_status": false
        },
        "clients": [
          {
            "name": "Nuevo cliente",
            "id": 58
          },
          {
            "name": "Test 2",
            "id": 2
          }
        ]
      },
      {
        "status": {
          "cont_id": 1,
          "name": "Test",
          "temp": 21.38,
          "defrost": false,
          "arranque_comp": false,
          "bateria": false,
          "alarma": true,
          "defrost_status": true
        },
        "clients": [
          {
            "name": "Test",
            "id": 123456
          },
          {
            "name": "Test 2",
            "id": 2
          },
          {
            "name": "Testeando link",
            "id": 123
          }
        ]
      }
    ]
  }
}

// Define a route to handle GET requests
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
