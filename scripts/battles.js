document.addEventListener('DOMContentLoaded', () => {

  if(!localStorage.getItem('user')) {
    location.replace('intro.html')
  }

  const setHere = document.querySelector('#setHere');
  const url = 'https://fathomless-chamber-53771.herokuapp.com';
  const theUser = localStorage.getItem('user');

  let currentWeapon;
  let currentEnemy;
  let currentAlly;

  axios.get(`${url}/users/${theUser}`)
    .then(result => {
      let userMonsters = result.data.monsters;
      axios.get(`${url}/monsters`)
        .then(result => {
          let allMons = result.data.map(x => x.id);
          let monsToGen = allMons.filter(y => {
            return !userMonsters.includes(y)
          });
          if (monsToGen.length === 0) {
            setHere.innerHTML = `<h3 class = 'text-center text-white'>No available raid bosses!</h3>`
          } else {
          Promise.all(monsToGen.map(z => {
              return axios.get(`${url}/monsters/${z}`)
            }))
            .then(result => {
              let monstersData = result.map(i => i.data)
              makeMonsterCard(monstersData);
            });
          }
        });
    });

  document.addEventListener('click', event => {
    if (/battle/.test(event.target.id)) {
      startBattle(event.target);
    } else if (/weapon/.test(event.target.id)) {
      chooseWeapon(event.target);
      battlePhaseThree();
    } else if (/monster/.test(event.target.id)) {
      chooseMonster(event.target);
    } else if (/fight/.test(event.target.id)) {
      battlePhaseFour();
    }
  });

});

const theUser = localStorage.getItem('user');

function makeMonsterCard(data) {
  data.forEach(x => {
    let col = setHere.appendChild(makeDiv(['col']));
    let item = col.appendChild(makeDiv(['card']));
    item.appendChild(makeImg(x.image));
    item.appendChild(makeDiv(['card-body', 'text-center']))
      .innerHTML = `<h5 class = 'text-center mx-auto'>${x.name}</h5>
  <p class = 'text-center mx-auto'>${x.description}</p>
  <p class = 'text-center mx-auto'>Difficulty: ${x.attack}</p>
  <a class='btn btn-dark mx-auto text-center text-white' id=battle${x.id}>BATTLE</a>`
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

function addClasses(item, arr) {
  arr.forEach(x => {
    item.classList.add(x);
  });
}

function startBattle(item) {
  let id = parseInt(item.id.replace(/battle/, ''));
  setHere.style.opacity = 0;
  setHere.innerHTML = '';
  addClasses(setHere, ['bg-dark', 'text-white', 'p-4'])
  setHere.innerHTML = `<p class = 'text-center mx-auto mt-3'>An enemy has appeared!</p>`
  fadeMeIn(setHere);
  setTimeout(() => fadeMeOut(setHere), 2000);
  setTimeout(() => setHere.innerHTML = '', 4000);
  axios.get(`${url}/monsters/${id}`)
    .then(result => {
      let enemy = result.data;
      currentEnemy = enemy;
      setTimeout(() => battlePhaseTwo(enemy), 4000);
    })
}

function battlePhaseTwo(enemy) {
  setHere.style.opacity = 1;
  setHere.classList.remove('row');
  setHere.innerHTML += `<h5 class = "mx-auto text-center">Choose a weapon!</h5><br>`
  axios.get(`${url}/users/${theUser}`)
    .then(result => {
      let wepsToUse = result.data.weapons;
      Promise.all(wepsToUse.map(x => {
          return axios.get(`${url}/weapons/${x}`)
        }))
        .then(result => {
          let weapons = result.map(y => y.data);
          showWeapons(weapons);
        });
    });
}

function battlePhaseThree() {
  setHere.innerHTML = '';
  setHere.innerHTML = `<h5 class = "mx-auto text-center">Choose an ally!</h5><br>`
  axios.get(`${url}/users/${theUser}`)
    .then(result => {
      let monsToUse = result.data.monsters;
      Promise.all(monsToUse.map(x => {
          return axios.get(`${url}/monsters/${x}`)
        }))
        .then(result => {
          let monsters = result.map(y => y.data);
          showMonsters(monsters);
        });
    });
}

function battlePhaseFour() {
  axios.get(`${url}/users/${theUser}`)
    .then(result => {
      let thisUser = result.data;
      setHere.innerHTML = `<h3 class='mx-auto text-center'>${thisUser.name} versus ${currentEnemy.name}</h3>`;
      dukeItOut(currentAlly, currentWeapon, currentEnemy, thisUser);
    });
}

function showMonsters(arr) {
  arr.forEach(monster => {
    setHere.innerHTML += `<button class='btn btn-dark' id=monster${monster.id}>${monster.name} | Attack: ${monster.attack} | HP: ${monster.hp}</button>`
    setHere.innerHTML += '<br>'
  });
}

function showWeapons(arr) {
  arr.forEach(weapon => {
    setHere.innerHTML += `<button class='btn btn-dark' id=weapon${weapon.id}>${weapon.name} | Attack: ${weapon.attack} | Chaos: ${weapon.chaos}</button>`
    setHere.innerHTML += '<br>'
  });
}

function chooseWeapon(item) {
  let weaponId = item.id.replace(/weapon/, '');
  axios.get(`${url}/weapons/${weaponId}`)
    .then(result => {
      currentWeapon = result.data;
    });
}

function chooseMonster(item) {
  let monsterId = item.id.replace(/monster/, '');
  axios.get(`${url}/monsters/${monsterId}`)
    .then(result => {
      currentAlly = result.data;
      makeFightButton();
    });
}

function makeFightButton() {
  addClasses(setHere, ['mx-auto', 'text-center'])
  setHere.innerHTML = `<h3 class='btn btn-danger mx-auto text-center' id='fight'>FIGHT!</h3>`
}

//Fade-in function
function fadeMeIn(item) {
  let op = 0.01;
  let fadeIn = setInterval(function() {
    item.style.opacity = op;
    op += 0.02;
  }, 25);
  setTimeout(() => {
    item.style.opacity = 1;
    clearInterval(fadeIn);
  }, 1000);
}

//Fade-out function
function fadeMeOut(item) {
  let op = 1;
  item.style.opacity = 1;
  let fadeOut = setInterval(function() {
    item.style.opacity = op;
    op -= 0.02;
  }, 25);
  setTimeout(() => {
    item.style.opacity = 0;
    clearInterval(fadeOut)
  }, 2000);
}
