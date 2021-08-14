const inquirer = require("inquirer");

require("colors");

/**
 * Menu Options
 */
const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "What do you wish to do?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Search city`,
      },
      {
        value: 2,
        name: `${"2.".green} History`,
      },
      {
        value: 0,
        name: `${"0.".green} Close`,
      },
    ],
  },
];

/**
 * Menu Options displayed once u run the app for the first time, thanks to inquirer
 */
const inquirerMenu = async (req, res) => {
  console.clear();
  console.log("=====================".green);
  console.log("   Choose an Option  ".cyan);
  console.log("=====================\n".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

/**
 * Wait for the user action in the menu option, to take control of it
 */
const inquirerPause = async (req, res) => {
  const pauseEvt = [
    {
      type: "input",
      name: "pause",
      message: `Press ${"ENTER".yellow} to continue`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(pauseEvt);
};

/**
 * Method that allows the user to type or move through menu with keyboard
 */
const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) "Please enter a value";
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

/**
 * Method that prints whole tasks to be selected for deletion
 */
const listPlaces = async (places = []) => {
  const choices = places.map((place, idx) => {
    const i = `${idx + 1}.`.green;
    return {
      value: place.id,
      name: `${i} ${place.name}`,
    };
  });

  choices.push({
    value: "0",
    name: "0. ".green + "Cancelar",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Place selection",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);

  return id;
};

/**
 * Method that displays a list of tasks to be done in a group (Complete or Delete)
 */
const displayChecklist = async (tasks = []) => {
  const choices = tasks.map((task, idx) => {
    const i = `${idx + 1}.`.green;
    return {
      value: task.id,
      name: `${i} ${task.desc}`,
      checked: task.completedAt ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selections",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(questions);

  return ids;
};

/**
 * Handle confirmation method
 */
const confirm = async (message) => {
  const question = [
    {
      type: "confirm", // return a boolean
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  listPlaces,
  confirm,
  displayChecklist,
};
