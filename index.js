document.addEventListener(`DOMContentLoaded`, () => {
  const goalsDropdown = document.querySelector('#goalsDropdown');
  const weaponsDropdown = document.querySelector('#weaponsDropdown');
  const monstersDropdown = document.querySelector('#monstersDropdown');
  const goalsData = [{
      id: 1,
      name: 'Lose Weight',
      xp: 200
    },
    {
      id: 2,
      name: 'Learn to Play Guitar',
      xp: 100
    },
    {
      id: 3,
      name: 'Learn a Language',
      xp: 100
    }
  ]
  const weaponsData = [{
          id: 1,
          name: 'Disappointing Glance',
          description: 'The look that hurts the most.',
          attack: 2,
          chaos: 1,
          image: 'https://placekitten.com/50/50'
        },
        {
          id: 2,
          name: 'Shoe',
          description: 'Just a shoe',
          attack: 2,
          chaos: 1,
          image: 'https://placekitten.com/50/50'
        },
        {
          id: 3,
          name: 'Fist',
          description: 'Your right hand curled into a ball.  Dude, find a new weapon.',
          attack: 2,
          chaos: 1,
          image: 'https://placekitten.com/50/50'
        }]

  makeGoalCard(goalsData);
  makeWeaponsCard(weaponsData);
});



function makeGoalCard(data) {
  data.forEach(x => {
    let item = goalsDropdown.appendChild(makeDiv(['card', 'card-body']))
    let row1 = item.appendChild(makeDiv(['row']));
    let col1 = row1.appendChild(makeDiv(['col']));
    let col2 = row1.appendChild(makeDiv(['col']));
    col1.innerHTML += `Goal: ${x.name}`;
    col2.appendChild(makeButton('complete', x.id))
    let row2 = item.appendChild(makeDiv(['row']));
    let col3 = row2.appendChild(makeDiv(['col']));
    let col4 = row2.appendChild(makeDiv(['col']));
    col3.innerHTML += `\nExperience: ${x.xp}`
    col4.appendChild(makeButton('remove', x.id));
  });
}

function makeWeaponsCard(data) {
  data.forEach(x => {
    let item = weaponsDropdown.appendChild(makeDiv(['card', 'card-body']));
    item.appendChild(makeImg(x.image))
    item.innerHTML += `<strong>${x.name}</strong>
    <p>${x.description}</p>
    <p><strong>Attack: </strong>${x.attack}</p>
    <p><strong>Chaos: </strong>${x.chaos}</p>`;
  });
}

function makeImg(src) {
  let image = document.createElement('img');
  image.classList.add('weaponImg');
  image.setAttribute('src', src);
  return image;
}

function makeDiv(cl) {
  let div = document.createElement('div');
  cl.forEach(x => {
    div.classList.add(x);
  });
  return div;
}

function makeButton(type, id) {
  let button = document.createElement('button');
  button.id = `${type}${id}`;
  button.classList.add('btn');
  button.classList.add('btn-dark');
  button.classList.add('goalBut');
  button.innerText = type.toUpperCase();
  return button;
}
