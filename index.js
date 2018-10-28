document.addEventListener(`DOMContentLoaded`, () => {
  const goalsDropdown = document.querySelector('#goalsDropdown');
  const weaponsDropdown = document.querySelector('#weaponsDropdown');
  const monstersDropdown = document.querySelector('#monstersDropdown');
  const userName = document.querySelector('#userName');
  const userLevel = document.querySelector('#userLevel');
  const userXP = document.querySelector('#userXP');
  const userWeapons = document.querySelector('#userWeapons');
  const userMonsters = document.querySelector('#userMonsters');
  const userHP = document.querySelector('#userHP');
  const userPasses = document.querySelector('#userPasses');
  const userGold = document.querySelector('#userGold');

  const userData = {
          id: 1,
          name: 'TimRemingtonSux',
          level: 1,
          gold: 10,
          hp: 10,
          xp: 0,
          points_toward_pass: 0,
          passes: 0,
          image: ''
        }
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
          image: 'https://placekitten.com/150/150'
        },
        {
          id: 2,
          name: 'Shoe',
          description: 'Just a shoe',
          attack: 2,
          chaos: 1,
          image: 'https://placekitten.com/150/150'
        },
        {
          id: 3,
          name: 'Fist',
          description: 'Your right hand curled into a ball.  Dude, find a new weapon.',
          attack: 2,
          chaos: 1,
          image: 'https://placekitten.com/150/150'
        }]
  const monstersData = [{
          id: 1,
          name: 'Matt Damon',
          description: 'He who brings suffering to the world',
          attack: 5,
          hp: 45,
          image: 'https://placekitten.com/150/150'
        },
        {
          id: 2,
          name: 'Skeleton Minion',
          description: 'Spooky horn-playing skeletal monster',
          attack: 2,
          hp: 10,
          image: 'https://placekitten.com/150/150'
        },
        {
          id: 3,
          name: 'Crab',
          description: 'The small creature lumbers across the room, pinching at your toes.',
          attack: 1,
          hp: 5,
          image: 'https://placekitten.com/150/150'
        }];

  setUser(userData);
  makeGoalCard(goalsData);
  makeWeaponsCard(weaponsData);
  makeMonstersCard(monstersData);
});

function setUser (userData) {
  userName.innerText += userData.name;
  userLevel.innerHTML += userData.level;
  userXP.innerHTML += userData.xp;
  userHP.innerHTML += userData.hp;
  userGold.innerHTML += userData.gold;
  userPasses.innerHTML += userData.passes;
}

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
    let row1 = item.appendChild(makeDiv(['row']));
    let col1 = row1.appendChild(makeDiv(['col']));
    col1.appendChild(makeImg(x.image));
    let col2 = row1.appendChild(makeDiv(['col']));
    col2.innerHTML += `<strong>${x.name}</strong>
    <p>${x.description}</p>
    <p><strong>Attack: </strong>${x.attack}</p>
    <p><strong>Chaos: </strong>${x.chaos}</p>`;
  });
}

function makeMonstersCard(data) {
  data.forEach(x => {
    let item = monstersDropdown.appendChild(makeDiv(['card', 'card-body']));
    let row1 = item.appendChild(makeDiv(['row']));
    let col1 = row1.appendChild(makeDiv(['col']));
    col1.appendChild(makeImg(x.image));
    let col2 = row1.appendChild(makeDiv(['col']));
    col2.innerHTML += `<strong>${x.name}</strong>
    <p>${x.description}</p>
    <p><strong>Attack: </strong>${x.attack}</p>
    <p><strong>HP: </strong>${x.hp}</p>`;
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
