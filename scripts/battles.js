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
  <a class='btn btn-dark mx-auto text-center text-white' id=$battle{x.id}>BATTLE</a>`
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
