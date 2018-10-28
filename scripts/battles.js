document.addEventListener('DOMContentLoaded', () => {

  const setHere = document.querySelector('#setHere');
  const monstersData = [{
      id: 1,
      name: 'Matt Damon',
      description: 'He who brings suffering to the world',
      attack: 5,
      hp: 45,
      image: 'https://placekitten.com/250/250'
    },
    {
      id: 2,
      name: 'Skeleton Minion',
      description: 'Spooky horn-playing skeletal monster',
      attack: 2,
      hp: 10,
      image: 'https://placekitten.com/250/250'
    },
    {
      id: 3,
      name: 'Crab',
      description: 'The small creature lumbers across the room, pinching at your toes.',
      attack: 1,
      hp: 5,
      image: 'https://placekitten.com/250/250'
    },
  ];

  makeMonsterCard(monstersData)
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
