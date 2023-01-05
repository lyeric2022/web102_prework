/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    gameCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img"/>
            <div class="game-card-info">
                <h2 id="game-card-name">${games[i].name}</h2>
                <p id="game-card-description">${games[i].description}</p>
                <p> Backers: ${games[i].backers}</p>
            </div>
        `;

    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributors = GAMES_JSON.reduce((acc, arr) => {
  return acc + arr.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <p> ${totalContributors.toLocaleString("en-US")} </p>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, arr) => {
  return acc + arr.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
    <p> $${totalRaised.toLocaleString("en-US")} </p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = `
    <p> ${totalGames.toLocaleString("en-US")} </p>
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((arr) => {
    return arr.pledged < arr.goal;
  });

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fullyFundedGames = GAMES_JSON.filter((arr) => {
    return arr.pledged >= arr.goal;
  });

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fullyFundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.reduce((acc, arr) => {
  return arr.pledged < arr.goal ? acc + 1 : acc;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
let textOfDescription = `A total of ${totalRaised.toLocaleString(
  "en-US"
)} has been raised for ${totalGames.toLocaleString("en-US")} games. `;

textOfDescription +=
  unfundedGames === 1
    ? `Currently, there is 1 unfunded game. `
    : `Currently, there are ${unfundedGames} unfunded games. `;
textOfDescription += `We need your help to fund these games!`;

// create a new DOM element containing the template string and append it to the description container
const descriptionCard = document.createElement("p");
descriptionCard.textContent = textOfDescription;
descriptionContainer.appendChild(descriptionCard);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...others] = sortedGames;

console.log(firstGame.name);
console.log(secondGame.name);

// add the image and name of the first game to the firstGameContainer element
firstGameContainer.innerHTML += `
    <img src="${firstGame.img}" class="top-img"/>
    <p> ${firstGame.name} </p>
`;

/************************************************************************************
 * code for how to do it per instructions "create a new element to hold the name of the top pledge game, then append it to the correct element":
 * let topPledgedGameElement = document.createElement("p");
 * topPledgedGameElement.textContent = firstGame.name;
 * firstGameContainer.appendChild(topPledgedGameElement);
 */

// do the same for the runner up item
secondGameContainer.innerHTML += `
    <img src="${secondGame.img}" class="top-img"/>
    <p> ${secondGame.name} </p>
`;

/************************************************************************************
 * Additional features (Not a part of the challenges)
 */

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {
  // Get the value of the search input
  const searchTerm = searchInput.value;

  // Filter the games based on the search term
  const filteredGames = GAMES_JSON.filter((game) => {
    return game.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Clear the games from the page
  deleteChildElements(gamesContainer);

  // Add the filtered games to the page
  addGamesToPage(filteredGames);
});
