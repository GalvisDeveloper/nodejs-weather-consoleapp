const axios = require("axios");

class Searches {
  history = ["Cucuta", "Bucaramanga", "Bogota"];

  constructor() {
    //TODO: readDB if it exists
  }

  async searchCity(city = "") {
    try {
      //TODO: request http
      // console.log("Ciudad " + city);
      const resp = await axios.get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/C%C3%BAcuta.json?access_token=pk.eyJ1IjoiZ2FsdmlzZGV2ZWxvcGVyIiwiYSI6ImNrczg4MzlxaDF5YWkzMXBpdHl1cXhzdTEifQ.0zBtG8vzHRTA_siX-A40aQ&language=es&limit=10"
      );
      console.log(resp.data);
      return []; // return cities that are close to search
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = Searches;
