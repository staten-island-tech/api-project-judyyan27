import "../CSS/style.css";

const DOMSelectors = {
  button: document.querySelector(`.button`),
  container: document.querySelector(`.container-box`),
  reset: document.querySelector(`#reset`),

  griffindor: document.querySelector(`#griffindor`),
  slytherin: document.querySelector(`#slytherin`),
  hufflepuff: document.querySelector(`#hufflepuff`),
  ravenclaw: document.querySelector(`#ravenclaw`),

  characters: document.querySelector(`#characters`),
  books: document.querySelector(`#books`),
  spells: document.querySelector(`#spells`),
};

async function normalData() {
  // fetch returns a promise -- promises that someimte in the future it returns something
  try {
    let response = await fetch(
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
    let response = await fetch(
      "https://potterapi-fedeperin.vercel.app/es/characters"
    );
    // guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      let griffindor = await response.json(); // json"ified" with data we can use
      //if the character's house is griffindor-- save that info as another data
      let gdata = griffindor.filter(
        (house) => house.hogwartsHouse === "Griffindor"
      );
      createCards(gdata);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that information");
  }
}

DOMSelectors.griffindor.addEventListener("click", function () {
  DOMSelectors.container.innerHTML = "";
  griffindorData();
});

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

function createBooks(hpData) {
  DOMSelectors.container.innerHTML = "";
  hpData.forEach((book) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card bg-rose-50 w-80 h-80">
        <img class="card-img" src="${book.cover}" alt="Image of ${book.originalTitle} Movie Poster" />
        <h2 class="card-title bg-rgb(184, 134, 11)">${book.title}</h2>
        <h3 class="card-price">Release Date: ${book.releaseDate}</h3>
        <h3 class="card-desc">Description: ${book.description}</h3>
        <h3 class="card-desc">Number of Pages: ${book.pages}</h3>
      </div>`
    )
  );
}

async function bookData() {
  // fetch returns a promise -- promises that someimte in the future it returns something
  try {
    let response = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/books"
    );
    // guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const books = await response.json(); // json"ified" with data we can use
      console.log(books);
      createBooks(books);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that information");
  }
}

DOMSelectors.books.addEventListener("click", function () {
  DOMSelectors.container.innerHTML = "";
  bookData();
});

function createSpells(hpData) {
  DOMSelectors.container.innerHTML = "";
  hpData.forEach((spell) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card bg-rose-50 w-80 h-80">
        <h2 class="card-title bg-rgb(184, 134, 11)">Spell ame: ${spell.spell}</h2>
        <h3 class="card-price">Use: ${spell.use}</h3>`
    )
  );
}

async function spellsData() {
  // fetch returns a promise -- promises that someimte in the future it returns something
  try {
    let response = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/spells"
    );
    // guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const spells = await response.json(); // json"ified" with data we can use
      console.log(spells);
      createSpells(spells);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that information");
  }
}

DOMSelectors.spells.addEventListener("click", function () {
  DOMSelectors.container.innerHTML = "";
  spellsData();
});
