document.addEventListener('DOMContentLoaded', () => {

  const setHere = document.querySelector('#setHere');
  const weaponsData = [{
      id: 1,
      name: 'Disappointing Glance',
      description: 'The look that hurts the most.',
      attack: 2,
      chaos: 1,
      image: 'https://placekitten.com/300/300',
      cost: 10
    },
    {
      id: 2,
      name: 'Shoe',
      description: 'Just a shoe',
      attack: 2,
      chaos: 1,
      image: 'https://placekitten.com/300/300',
      cost: 10
    },
    {
      id: 3,
      name: 'Fist',
      description: 'Your right hand curled into a ball.  Dude, find a new weapon.',
      attack: 2,
      chaos: 1,
      image: 'https://placekitten.com/300/300',
      cost: 10
    }
  ];

  makeWeaponsCard(weaponsData)
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
  <a class='btn btn-dark mx-auto text-center text-white' id=$battle{x.id}>BUY</a>`
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
