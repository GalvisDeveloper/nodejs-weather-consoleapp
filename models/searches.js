const axios = require("axios");

class Searches {
  history = ["Cucuta", "Bucaramanga", "Bogota"];

  constructor() {
    //TODO: readDB if it exists
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
      //TODO: request http

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      // console.log(resp.data);
      // ({}) return an implicit object
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lat: place.center[0],
        lon: place.center[1],
      }));

      // return cities that are close to search
    } catch (error) {
      let err = error.response.data.message;
      console.log(err);
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
      console.log(error);
    }
  }
}

module.exports = Searches;
