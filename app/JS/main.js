import "../CSS/style.css";

const DOMSelectors = {
  button: document.querySelector(`.button`),
  container: document.querySelector(`.container-box`),
  reset: document.querySelector(`#reset`),
};

// gets data
// shows the data (usually happens while getting data)

async function testData() {
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
testData();
//hpData is the name for the jsonified data

//standard function that creates cards for flowers on screen and can accept different arrays
function createCards(hpData) {
  DOMSelectors.container.innerHTML = "";
  hpData.forEach((character) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
        <img class="card-img" src="${character.image}" alt="Image of ${character.fullName}" />
        <h2 class="card-title">Name: ${character.fullName}</h2>
        <h3 class="card-price">Birthdate: ${character.birthdate}</h3>
        <h3 class="card-desc">House: ${character.hogwartsHouse}</h3>
        <h3 class="card-desc">Actor: ${character.interpretedBy}</h3>
      </div>`
    )
  );
}

// Upon loading website, all cards show on screen
