document.addEventListener('DOMContentLoaded', () => {

  const setHere = document.querySelector('#setHere');

  axios.get(`http://localhost:3000/users/1`)
    .then(result => {
      let userMonsters = result.data.monsters;
      axios.get(`http://localhost:3000/monsters`)
      .then(result => {
        let allMons = result.data.map(x => x.id);
        let monsToGen = allMons.filter(y => {
          return !userMonsters.includes(y)
        });
        Promise.all(monsToGen.map(z => {
          return axios.get(`http://localhost:3000/monsters/${z}`)
        }))
        .then(result => {
          let monstersData = result.map(i => i.data)
          makeMonsterCard(monstersData);
        });
      });
    });

  document.addEventListener('click', event => {
    if (/battle/.test(event.target.id)) {
      startBattle(event.target);
    }
  });

});

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

function addClasses(item, arr){
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
  if (item.style.opacity === 0.1) {
    item.style.opacity = 0;
    clearInterval(fadeOut)
  }
}
