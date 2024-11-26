import "../CSS/style.css";

const DOMSelectors = {
  button: document.querySelector(`.button`),
  container: document.querySelector(`.container-box`),
  reset: document.querySelector(`#reset`),

  griffindor: document.querySelector(`#griffindor`),
  slytherin: document.querySelector(`#slytherin`),
  hufflepuff: document.querySelector(`#hufflepuff`),
  ravenclaw: document.querySelector(`#ravenclaw`),
};

//standard function that creates cards for flowers on screen and can accept different arrays
function createCards(hpData) {
  DOMSelectors.container.innerHTML = "";
  hpData.forEach((character) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card bg-neutral">
        <img class="card-img" src="${character.image}" alt="Image of ${character.fullName}" />
        <h2 class="card-title bg-rgb(184, 134, 11)">Name: ${character.fullName}</h2>
        <h3 class="card-price">Birthdate: ${character.birthdate}</h3>
        <h3 class="card-desc">House: ${character.hogwartsHouse}</h3>
        <h3 class="card-desc">Actor: ${character.interpretedBy}</h3>
      </div>`
    )
  );
}
// gets data
// shows the data (usually happens while getting data)

async function normalData() {
  // fetch returns a promise -- promises that someimte in the future it returns something
  try {
    const response = await fetch(
      "https://potterapi-fedeperin.vercel.app/es/characters"
    );
    // guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const hpData = await response.json(); // json"ified" with data we can use
      console.log(hpData);
      createCards(hpData);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that information");
  }
}
normalData();
//hpData is the name for the jsonified data
// Upon loading website, all cards show on screen

async function griffindorData() {
  // fetch returns a promise -- promises that someimte in the future it returns something
  try {
    const response = await fetch(
      "https://potterapi-fedeperin.vercel.app/es/characters"
    );
    // guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const griffindor = await response.json(); // json"ified" with data we can use
      //if the character's house is griffindor-- save that info as another data
      if (griffindor.hogwartsHouse === "Griffindor") {
        data = griffindor;
      }

      createCards(data);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that information");
  }
}
