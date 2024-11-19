// gets data
// shows the data (usually happens while getting data)
//

async function testData() {
  // fetch returns a promise -- promises that someimte in the future it returns something
  try {
    const response = await fetch(
      "https://potterapi-fedeperin.vercel.app/es/characters?search=Ron%20Weasley"
    );
    // guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json(); // json"ified" with data we can use
      console.log(data);
      document.querySelector("h1").textContent = data[0].fullName;
      //
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that information");
  }
}
testData();

function getData() {}