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

  form: document.querySelector(`form`),
  hpButton: document.querySelector(`#findhp`),
  hpName: document.querySelector(`#name`),
};

DOMSelectors.hpButton.addEventListener("click", async function (event) {
  event.preventDefault();
  DOMSelectors.container.innerHTML = "";
  let name = DOMSelectors.hpName.value;
  search(name);
});

async function search(name) {
  console.log(name);
  try {
    let response = await fetch(
      `https://potterapi-fedeperin.vercel.app/es/characters?search=${name}`
    );
    // guard clause
    if (response.status != 200) {
      throw new Error(response);
    }
    const search = await response.json(); // json"ified" with data we can use
    console.log(search);

    if (search.length === 0) {
      DOMSelectors.container.innerHTML = `<h2 class=text-black">No characters found for "${name}" Check your spelling or search a different name.</h2>`;
    } else if (search.length > 0) {
      console.log(response);
      createCards(search);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that information");
    DOMSelectors.container.innerHTML = `<h2 class=text-black>Something went wrong. Check your spelling.</h2>`;
  }
}

function createCards(hpData) {
  DOMSelectors.container.innerHTML = "";
  hpData.forEach((character) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="character-card color-lightgrey ">
        <img class="card-img" src="${character.image}" alt="Portrait of ${character.fullName}" />
        <h2 class="text-4xl card-name color-brown">Name: ${character.fullName}</h2>
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
      "https://potterapi-fedeperin.vercel.app/en/characters"
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
        <img class="object-scale-down" src="${book.cover}" alt="Book cover illustration of ${book.originalTitle}">
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
        <h2 class="card-description color-magenta">${spell.spell}</h2>
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
  DOMSelectors.container.innerHTML = ""; //clear previous cards

  for (let i = 0; i < hpData.length; i++) {
    // Check if the current character's house is Gryffindor
    if (hpData[i].hogwartsHouse === "Gryffindor") {
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="card gryffindor character-card w-56">
          <img class="card-img" src="${hpData[i].image}" alt="Portrait of ${hpData[i].fullName}" />
          <h2 class="text-4xl card-name text-orange">Name: ${hpData[i].fullName}</h2>
          <h3 class="card-price text-orange">Birthdate: ${hpData[i].birthdate}</h3>
          <h3 class="card-desc text-orange">House: ${hpData[i].hogwartsHouse}</h3>
          <h3 class="card-desc text-orange">Actor: ${hpData[i].interpretedBy}</h3>
        </div>`
      );
    }
  }
}

DOMSelectors.gryffindor.addEventListener("click", async function () {
  const hpData = await normalData(); // Fetches the data
  show_gryffindor(hpData); // Filter and display Gryffindor characters
});

function show_slytherin(hpData) {
  DOMSelectors.container.innerHTML = ""; //clear previous cards

  for (let i = 0; i < hpData.length; i++) {
    // Check if character house is Slytherin
    if (hpData[i].hogwartsHouse === "Slytherin") {
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="card slytherin character-card w-56">
          <img class="card-img" src="${hpData[i].image}" alt="Portrait of ${hpData[i].fullName}" />
          <h2 class="text-4xl card-name text-green">Name: ${hpData[i].fullName}</h2>
          <h3 class="card-price text-green">Birthdate: ${hpData[i].birthdate}</h3>
          <h3 class="card-desc text-green">House: ${hpData[i].hogwartsHouse}</h3>
          <h3 class="card-desc text-green">Actor: ${hpData[i].interpretedBy}</h3>
        </div>`
      );
    }
  }
}

DOMSelectors.slytherin.addEventListener("click", async function () {
  const hpData = await normalData(); // Fetches the data
  show_slytherin(hpData); // Filter and display slytherin characters
});

function show_hufflepuff(hpData) {
  DOMSelectors.container.innerHTML = "";
  //clear previous cards

  for (let i = 0; i < hpData.length; i++) {
    // Check if current character house is hufflepuff
    if (hpData[i].hogwartsHouse === "Hufflepuff") {
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="card hufflepuff character-card w-56">
          <img class="card-img" src="${hpData[i].image}" alt="Portrait of ${hpData[i].fullName}" />
          <h2 class="text-4xl card-name text-yellow">Name: ${hpData[i].fullName}</h2>
          <h3 class="card-price text-yellow">Birthdate: ${hpData[i].birthdate}</h3>
          <h3 class="card-desc text-yellow">House: ${hpData[i].hogwartsHouse}</h3>
          <h3 class="card-desc text-yellow">Actor: ${hpData[i].interpretedBy}</h3>
        </div>`
      );
    }
  }
}

DOMSelectors.hufflepuff.addEventListener("click", async function () {
  const hpData = await normalData();
  // Fetches the data
  show_hufflepuff(hpData);
});

function show_ravenclaw(hpData) {
  DOMSelectors.container.innerHTML = "";
  //clear previous cards

  for (let i = 0; i < hpData.length; i++) {
    // Check if current character house is ravenclaw
    if (hpData[i].hogwartsHouse === "Ravenclaw") {
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="card ravenclaw character-card w-56">
          <img class="card-img" src="${hpData[i].image}" alt="Portrait of ${hpData[i].fullName}" />
          <h2 class="text-4xl card-name text-indigo">Name: ${hpData[i].fullName}</h2>
          <h3 class="card-price text-indigo">Birthdate: ${hpData[i].birthdate}</h3>
          <h3 class="card-desc text-indigo">House: ${hpData[i].hogwartsHouse}</h3>
          <h3 class="card-desc text-indigo">Actor: ${hpData[i].interpretedBy}</h3>
        </div>`
      );
    }
  }
}

DOMSelectors.ravenclaw.addEventListener("click", async function () {
  const hpData = await normalData();
  // Fetches the data
  show_ravenclaw(hpData);
});
