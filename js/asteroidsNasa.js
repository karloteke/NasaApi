/*const fillUrlParams = () => {
const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-04-04&end_date=2023-04-04&api_key=eSrdcJqzrhfKIcvAYj29MEXKZFJGdDTLLn01sXnI`;
return url;
}*/
const fillUrlParams = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  const todayFormatted = `${year}-${month}-${day}`;
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${todayFormatted}&end_date=${todayFormatted}&api_key=eSrdcJqzrhfKIcvAYj29MEXKZFJGdDTLLn01sXnI`;
  return url;
}

const asteroidList = (asteroids) => {
// console.log('Creating items...');
const list = document.querySelector('#asteroids_list');
list.innerHTML = '';
const newElement = document.createElement('div');
asteroids?.forEach((asteroid) => {
    let asteroidHtml = `
      <div class="list-element list-asteroids">
        <div>
          <h2 class="title-asteroid"><strong>${asteroid.name}</strong></h2>
          <p><strong>Tamaño estimado: </strong>${asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m</p>
          <p><strong>Distancia mínima de acercamiento: </strong>${asteroid.close_approach_data[0].miss_distance.kilometers} km</p>
          <p><strong>¿Es peligroso? </strong>${asteroid.is_potentially_hazardous_asteroid ? 'Sí' : 'No'}<p>
        </div>
      </div>
    `;
    newElement.innerHTML += asteroidHtml;
});
list.appendChild(newElement);
}

fetch(fillUrlParams())
  .then(response => response.json())
  .then(data => {
    const asteroidData = data.near_earth_objects[Object.keys(data.near_earth_objects)[0]];
    asteroidList(asteroidData);
  });


/*fetch(fillUrlParams())
.then(response => response.json())
.then(data => {
  const asteroidData = data.near_earth_objects['2023-04-04'];
  asteroidList(asteroidData);
})*/


