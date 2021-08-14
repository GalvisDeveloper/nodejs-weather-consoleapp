const fs = require("fs");
const axios = require("axios");

class Searches {
  history = [];
  dbPath = "./db/database.json";

  constructor() {
    this.readFromDB();
  }

  get historyCapitalized() {
    return this.history.map((place) => {
      let words = place
        .split(" ")
        .map((p) => p[0].toUpperCase() + p.substring(1));

      return words.join(" ");
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 10,
      language: "es",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  async searchCity(city = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      // ({}) return an implicit object
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lat: place.center[0],
        lon: place.center[1],
      }));
    } catch (error) {
      console.log(error.response.data.message);
      return [];
    }
  }

  async placeWeather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const resp = await instance.get();

      const { weather, main } = resp.data;
      const { temp, temp_min, temp_max } = main;
      const [{ description }] = weather;

      return {
        temp,
        temp_min,
        temp_max,
        description,
      };
    } catch (error) {
      console.log(
        `\n ${error.response.data.message.red} ${
          "can't get the weather info".red
        }`
      );
      return [];
    }
  }

  //TODO: Move into history places
  addHistory(place = "") {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.history = this.history.splice(0, 9);

    this.history.unshift(place.toLocaleLowerCase());
    this.saveInDB();
  }

  saveInDB() {
    const payload = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readFromDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.history = data.history;
  }
}

module.exports = Searches;
