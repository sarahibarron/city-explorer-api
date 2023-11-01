const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
const data = require("./data/weather.json");

app.get("/", (_, response) => response.json("Root route."));

app.get("/weather", (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const searchQuery = request.query.searchQuery;

  const filteredCity = data.find((city) => {
    return city.city_name === searchQuery;
  });

  const wrangledData = filteredCity.data.map((day) => {
    return {
      description: day.weather.description,
      date: day.datetime,
    };
  });

  response.json(wrangledData);
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));

// test http://localhost:8080/weather?lon=2.3200410217200766&lat=48.8588897&searchQuery=Paris
