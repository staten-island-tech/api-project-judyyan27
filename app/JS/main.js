import "../CSS/style.css";

const DOMSelectors = {
  button: document.querySelector(`.button`),
  container: document.querySelector(`.container-box`),
  reset: document.querySelector(`#reset`),

  gryffindor: document.querySelector(`#griffindor`),
  slytherin: document.querySelector(`#slytherin`),
  hufflepuff: document.querySelector(`#hufflepuff`),
  ravenclaw: document.querySelector(`#ravenclaw`),

  characters: document.querySelector(`#characters`),
  books: document.querySelector(`#books`),
  spells: document.querySelector(`#spells`),
};

function createCards(hpData) {
  DOMSelectors.container.innerHTML = "";
  hpData.forEach((character) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="character-card color-lightgrey ">
        <img class="card-img" src="${character.image}" alt="Image of ${character.fullName}" />
        <h3 class="text-4xl card-name color-brown">Name: ${character.fullName}</h3>
        <h3 class="card-price color-brown">Birthdate: ${character.birthdate}</h3>
        <h3 class="card-desc color-brown">House: ${character.hogwartsHouse}</h3>
        <h3 class="card-desc color-brown">Actor: ${character.interpretedBy}</h3>
      </div>`
    )
  );
}

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
      return hpData;
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that information");
  }
}
normalData();
//hpData is the name for the jsonified data
// Upon loading website, all cards show on screen

DOMSelectors.characters.addEventListener("click", function () {
  DOMSelectors.container.innerHTML = "";
  normalData();
});

function createBooks(hpData) {
  DOMSelectors.container.innerHTML = "";
  hpData.forEach((book) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="book-card">
        <img class="object-scale-down" src="${book.cover}" alt="Image of ${book.originalTitle} Movie Poster">
        <h2 class="card-name color-blue">${book.title}</h2>
        <h3 class="card-price color-blue">Release Date: ${book.releaseDate}</h3>
        <h4 class="card-desc color-blue">Description: ${book.description}</h4>
        <h4 class="card-desc color-blue">Number of Pages: ${book.pages}</h4>
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
      `<div class="card spell-card bg-rose-50 w-80 h-80">
        <h2 class="card-description color-magenta">Spell name: ${spell.spell}</h2>
        <h3 class="card-price color-magenta">Use: ${spell.use}</h3>`
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

function show_gryffindor(hpData) {
  const gryffindor_characters = hpData.filter((hogwartsHouse) =>
    hogwartsHouse.hogwartsHouse.includes("Gryffindor")
  );

  gryffindor_characters.forEach((character) => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card character-card w-56">
          <img class="object-scale-down" src="${character.cover}" alt="Image of ${character.originalTitle} Movie Poster">
          <h2 class="card-name">${character.title}</h2>
          <h3 class="card-price">Release Date: ${character.releaseDate}</h3>
          <h4 class="card-desc">Description: ${character.description}</h4> 
          <h4 class="card-desc">Number of Pages: ${character.pages}</h4> 
        </div>`
    );
  });
}

DOMSelectors.gryffindor.addEventListener("click", function () {
  DOMSelectors.container.innerHTML = ""; // Clear previous cards
  show_gryffindor(hpData); // Filter and display Gryffindor characters
});
