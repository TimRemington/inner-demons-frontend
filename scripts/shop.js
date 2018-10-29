document.addEventListener('DOMContentLoaded', () => {

  const setHere = document.querySelector('#setHere');


  document.addEventListener('click', event => {
    if (/buy/.test(event.target.id)) {
      buyItem(event.target);
    }
  })
});

axios.get(`http://localhost:3000/users/1`)
  .then(result => {
    let userWeapons = result.data.weapons;
    axios.get(`http://localhost:3000/weapons`)
    .then(result => {
      let allWeaps = result.data.map(x => x.id);
      let weapsToGen = allWeaps.filter(y => {
        return !userWeapons.includes(y)
      });
      Promise.all(weapsToGen.map(z => {
        return axios.get(`http://localhost:3000/weapons/${z}`)
      }))
      .then(result => {
        let weaponsData = result.map(i => i.data)
        makeWeaponsCard(weaponsData);
      });
    });
  });

function makeWeaponsCard(data) {
  data.forEach(x => {
    let col = setHere.appendChild(makeDiv(['col']));
    let item = col.appendChild(makeDiv(['card']));
    item.appendChild(makeImg(x.image));
    item.appendChild(makeDiv(['card-body', 'text-center']))
      .innerHTML = `<h5 class = 'text-center mx-auto'>${x.name}</h5>
  <p class = 'text-center mx-auto'>${x.description}</p>
  <p class = 'text-center mx-auto'>Attack: ${x.attack}</p>
  <p class = 'text-center mx-auto'>Chaos: ${x.chaos}</p>
  <p class = 'text-center mx-auto'>Cost: ${x.cost} Gold</p>
  <a class='btn btn-dark mx-auto text-center text-white' id=buy${x.id}cost${x.cost}>BUY</a>`
  });
}

function makeDiv(cl) { // make a div with a given class list array
  let div = document.createElement('div');
  cl.forEach(x => {
    div.classList.add(x)
  });
  return div;
}

function makeImg(src) { // make an image
  let image = document.createElement('img');
  image.classList.add('card-img-top');
  image.setAttribute('src', src);
  return image;
}

function makeError(msg) {
  let setError = document.querySelector('#errorMsg');
  setError.innerHTML = `<p class = 'text-center mx-auto pt-3'>${msg}<p>`;
  setError.classList.add('bg-danger');
}

function clearError() {
  let setError = document.querySelector('#errorMsg');
  setError.innerHTML = '';
  setError.classList.remove('bg-danger');
}

function buyItem(item) { // send request to backend
  clearError();
  let info = item.id.replace(/buy/, '').split('cost');
  let id = parseInt(info[0]);
  let cost = parseInt(info[1]);
  axios.get(`http://localhost:3000/users/1`).then(result => {
    let preGold = result.data.gold;
    if (preGold < cost) makeError('Not enough gold, bucko!');
    else {
      document.getElementById(item.id).innerText = 'BOUGHT'
      document.getElementById(item.id).id = 'x';
      item.classList.remove('btn-dark');
      item.classList.add('btn-primary');
      let newGold = preGold - cost;
      axios.patch(`http://localhost:3000/users/1`, {gold: newGold});
      axios.post(`http://localhost:3000/weapons_users`, {user_id: 1, weapon_id: id})
      .then(result => {
        console.log(result);
      });
    }
  })
}
