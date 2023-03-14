"use strict";
const apiUrl = "http://localhost:5000/api/cities";

const populateTable = (data) => {
    const table = document.getElementById("cities");

    data.map((item) => {
        const row = document.createElement("tr");

        const idColumn = document.createElement("td");
        idColumn.className = "column-id";
        idColumn.innerHTML = '<a href="./city.html">' + item.id + "</a>";
        idColumn.onclick = () => {
            sessionStorage.setItem("cityId", item.id);
        };
        row.appendChild(idColumn);

        const cityColumn = document.createElement("td");
        cityColumn.className = "column-city";
        cityColumn.innerHTML = item.city;
        row.appendChild(cityColumn);

        const countryColumn = document.createElement("td");
        countryColumn.className = "column-country";
        countryColumn.innerHTML = item.country;
        row.appendChild(countryColumn);

        table.appendChild(row);
    });
};

const fetchCities = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        populateTable(data);
    } catch (error) {
        console.log(error);
    }
};

fetchCities();
