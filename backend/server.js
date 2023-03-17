console.log("Backend Server Started!\n");

const express = require("express");
const cors = require("cors");
const { request, response } = require("express");

const app = express();

// what is used
app.use(
    express.json(),
    cors({
        origin: ["http://127.0.0.1:5500"],
    })
);

// port constant
const PORT = 5000;

// define port that will be used
app.listen(PORT, () => {
    console.log(`Backend Server is running on port ${PORT}!`);
});

// defined cities
const CITIES = [
    { id: 1, city: "Oslo", country: "Norway" },
    { id: 2, city: "Helsinki", country: "Finland" },
    { id: 3, city: "Stockholm", country: "Sweden" },
];

// // use access control..?
// app.use((request, response, next) => {
//     console.log("Time:", Date.now());
//     response.header("Access-Control-Allow-Origin", "*");
//     next();
// });

// root request
app.get("/", (request, response) => {
    response.send("Hello from Backend");
});

// return api message
app.get("/api/", (request, response) => {
    response.send("Hello from Backend API!\n");
});

// return all cities
app.get("/api/cities", (request, response) => {
    response.json(CITIES);
});

// return city with id if found
app.get("/api/cities/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const city = CITIES.find((item) => item.id === id);
    // city is not found
    if (!city) {
        response.status(404).send("City not found!");
    } else response.send(city);
});

// test get
app.get("/test/:id/:name", (request, response) => {
    response.send(request.params);
});

// post a city
app.post("/api/cities", (request, response) => {
    // log the reques
    console.log("BODY: ", request.body);
    // make it a object and add id
    const city = {
        id: CITIES.length + 1,
        city: request.body.city,
        country: request.body.country,
    };
    // push it to the server object
    CITIES.push(city);
    // send the info (with id) as a response
    response.send(city);
});

// delete a city
app.delete("/api/cities/:id", (request, response) => {
    console.log("\nDELETE CALLED\n");
    const id = parseInt(request.params.id);
    const city = CITIES.find((item) => item.id === id);
    // city is not found
    if (!city) {
        response.status(404).send("City not found!");
    } else {
        const cityIndex = CITIES.indexOf(city);
        response.send(city);
        CITIES.slice(cityIndex, 1);
        console.log("\nCity deleted!\n");
    }
});
