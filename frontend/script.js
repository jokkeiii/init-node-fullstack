"use strict";
const apiUrl = "http://localhost:5000/api/cities";

// search form
const searchForm = document.getElementById("city-form");
// event listener to search form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchForm.reset();
});

const formThis = () => {
    const city = {
        city: form.elements["city"].value,
        country: form.elements["country"].value,
    };

    addCity(city);

    form.elements["city"].value = "";
    form.elements["country"].value = "";
};

const addCity = async (city) => {
    try {
        const response = await fetch(
            apiUrl +
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(city),
                }
        );
    } catch (error) {
        console.log(error);
    }
};

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
