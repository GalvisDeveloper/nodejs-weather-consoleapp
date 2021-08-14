require("dotenv").config();

const {
  inquirerMenu,
  inquirerPause,
  readInput,
  listPlaces,
} = require("./helpers/inquirer");
const Searches = require("./models/searches");

require("colors");

const main = async () => {
  const searches = new Searches();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // display message
        console.log("Search city selected");

        // lookin for the places
        const input = await readInput("City: ");
        const places = await searches.searchCity(input);

        // select the place
        const idSelected = await listPlaces(places);

        if (idSelected === "0") continue;

        const placeSelected = await places.find((p) => p.id === idSelected);

        const { name, lat, lon } = placeSelected;

        // Save in db
        searches.addHistory(name);

        // weather
        const weather = await searches.placeWeather(lat, lon);
        const { temp, temp_min, temp_max, description } = weather;

        // show results
        console.log("\n City information: \n".green);
        console.log("City: ".blue, name.yellow);
        console.log("Lat: ".blue, lat);
        console.log("Lon: ".blue, lon);
        console.log("Temperature: ".blue, temp ? temp : "Wrong temp");
        console.log("Temp_Min: ".blue, temp_min ? temp_min : "Wrong temp min");
        console.log("Temp_Max: ".blue, temp_max ? temp_max : "Wrong temp max");
        console.log(
          "What's the weather like?: ".blue,
          description ? description.yellow : "Can't get the weather info"
        );

        break;

      case 2:
        searches.historyCapitalized.forEach((place, i) => {
          const idx = `${i + 1}.`.green;
          console.log(idx + " " + place);
        });

        searches.readFromDB();

        break;

      default:
        break;
    }

    if (opt !== 0) await inquirerPause();
  } while (opt !== 0);
};

main();
