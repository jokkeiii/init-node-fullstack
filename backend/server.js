console.log("Backend Server Started!\n");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(
    cors({
        origin: ["http://127.0.0.1:5500"],
    })
);

// port constant
const PORT = 5000;

const cities = [
    { id: 1, city: "Oslo", country: "Norway" },
    { id: 2, city: "Helsinki", country: "Finland" },
    { id: 3, city: "Stockholm", country: "Sweden" },
];

// app.use((request, response, next) => {
//     console.log("Time:", Date.now());
//     response.header("Access-Control-Allow-Origin", "*");
//     next();
// });
// app.get("/", (request, response) => {
//     response.send("Hello from Backend");
// });
// // return api message
// app.get("/api/", (request, response) => {
//     response.send("Hello from Backend API!\n");
// });
// return all cities
app.get("/api/cities", (request, response) => {
    response.json(cities);
});
// // return city with id if found
// app.get("/api/cities/:id", (request, response) => {
//     const id = parseInt(request.params.id);
//     const city = cities.find((item) => item.id === id);
//     // city is not found
//     if (!city) {
//         response.status(404).send("City not found!");
//     } else response.send(city);
// });

// app.get("/test/:id/:name", (request, response) => {
//     response.send(request.params);
// });

app.listen(PORT, () => {
    console.log(`Backend Server is running on port ${PORT}!`);
});
