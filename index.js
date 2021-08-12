const {
  inquirerMenu,
  inquirerPause,
  readInput,
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
        console.log("Search city selected");
        // display message
        const place = await readInput("City: ");
        await searches.searchCity(place);

        // lookin for the places
        // select the place
        // weather
        // show results
        console.log("\n City information: \n".green);
        console.log("City: ");
        console.log("Lat: ");
        console.log("Lng: ");
        console.log("Temperature: ");
        console.log("Min: ");
        console.log("Max: ");

        break;
      case 2:
        console.log("History selected");
        break;
      default:
        break;
    }

    if (opt !== 0) await inquirerPause();
  } while (opt !== 0);
};

main();
