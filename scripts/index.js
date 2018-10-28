document.addEventListener(`DOMContentLoaded`, () => {
  const goalsDropdown = document.querySelector('#goalsDropdown');
  const weaponsDropdown = document.querySelector('#weaponsDropdown');
  const monstersDropdown = document.querySelector('#monstersDropdown');

  const goalsButton = document.querySelector('#goalsButton');
  const weaponsButton = document.querySelector('#weaponsButton');
  const monstersButton = document.querySelector('#monstersButton');

  const userName = document.querySelector('#userName');
  const userLevel = document.querySelector('#userLevel');
  const userXP = document.querySelector('#userXP');
  const userWeapons = document.querySelector('#userWeapons');
  const userMonsters = document.querySelector('#userMonsters');
  const userHP = document.querySelector('#userHP');
  const userPasses = document.querySelector('#userPasses');
  const userGold = document.querySelector('#userGold');
  const userImg = document.querySelector('#userImg');

  const goalsData = [{
      id: 1,
      name: 'Lose Weight',
      xp: 200,
      tasks: [{
          id: 1,
          name: 'Work out every day',
          description: 'Go to the gym and do things.',
          gold: 10
        },
        {
          id: 2,
          name: 'Diet',
          description: 'Stick to your diet for the day.',
          gold: 10
        }
      ]
    },
    {
      id: 2,
      name: 'Learn to Play Guitar',
      xp: 100,
      tasks: [{
          id: 3,
          name: 'Practice',
          description: 'Practice your instrument.',
          gold: 10
        },
        {
          id: 4,
          name: 'Learn Something New',
          description: 'Learn a thing.',
          gold: 10
        }
      ]
    },
    {
      id: 3,
      name: 'Learn a Language',
      xp: 100,
      tasks: [{
          id: 5,
          name: 'Practice',
          description: 'Find 20 minutes and practice.',
          gold: 10
        },
        {
          id: 6,
          name: 'Learn something new',
          description: 'Learn a new word or phrase.',
          gold: 10
        }
      ]
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
    }
  ]
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
    }
  ];

  // let weaponsToUse = weaponsData.filter(x => {
  //   return userData.weapons.includes(x.id)
  // });
  // let monstersToUse = monstersData.filter(x => {
  //   return userData.monsters.includes(x.id)
  // });

  axios.get(`http://localhost:3000/users/1`).then(result => {
    let user = result.data
    setUser(user);
    axios.get(`http://localhost:3000/weapons`).then(result => {
      let weps = result.data.filter(x=> {
        return user.weapons.includes(x.id);
      });
      makeWeaponsCard(weps)
      axios.get(`http://localhost:3000/monsters`).then(result => {
        let mons = result.data.filter(y => {
          return user.monsters.includes(y.id);
        });
        makeMonstersCard(mons);
      });
    });
  });

  // makeWeaponsCard(weaponsToUse);
  // makeMonstersCard(monstersToUse);
});

function setUser(userData) { // set the data in the user bio card
  userName.innerText += userData.name;
  userLevel.innerHTML += userData.level;
  userXP.innerHTML += userData.xp;
  userHP.innerHTML += userData.hp;
  userGold.innerHTML += userData.gold;
  userPasses.innerHTML += userData.passes;
  userMonsters.innerHTML += userData.monsters.length;
  userWeapons.innerHTML += userData.weapons.length;
  userImg.setAttribute('src', userData.image)
}

function makeGoalCard(data) { //make the cards in the dropdown for goals
  data.forEach(x => {
    let ids = x.tasks.map(y => y.id);
    let item = goalsDropdown.appendChild(makeDiv(['card', 'card-body']))
    let row1 = item.appendChild(makeDiv(['row']));
    let col1 = row1.appendChild(makeDiv(['col']));
    let col2 = row1.appendChild(makeDiv(['col']));
    col1.innerHTML += `Goal: ${x.name}`;
    col2.appendChild(makeButton('complete', x.xp, ids.join(''))) //set the button's id as the word complete, the experience from the goal, and the tasks associated with the goal.
    let row2 = item.appendChild(makeDiv(['row']));
    let col3 = row2.appendChild(makeDiv(['col']));
    let col4 = row2.appendChild(makeDiv(['col']));
    col3.innerHTML += `\nExperience: ${x.xp}`
    col4.appendChild(makeButton('remove', x.id));
    let row3 = item.appendChild(makeDiv(['row']));
    row3.innerHTML += '<strong>Click tasks to complete them.</strong>'
    addTasks(x.tasks, row3);
  });
}

function addTasks(data, item) {
  data.forEach(x => {
    item.appendChild(makeDiv(['col']))
      .innerHTML = `<a class = 'btn btn-dark text-white' id=${x.id}and${x.gold}>${x.name}</a>`
  });
}

function makeWeaponsCard(data) { //make the cards in the dropdown for weapons
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

function makeMonstersCard(data) { //make the cards in the dropdown for monsters
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

function makeImg(src) { // make an image for the weapons and monsters dropdowns
  let image = document.createElement('img');
  image.classList.add('weaponImg');
  image.setAttribute('src', src);
  return image;
}

function makeDiv(cl) { // make a div with a given class list array
  let div = document.createElement('div');
  cl.forEach(x => {
    div.classList.add(x);
  });
  return div;
}

function makeButton(type, id, tasks) { // make a button with given type and id
  let button = document.createElement('button');
  if (tasks) {
    button.id = `${type}${id}tasks${tasks}`
  } else {
    button.id = `${type}${id}`;
  }
  button.classList.add('btn');
  button.classList.add('btn-dark');
  button.classList.add('goalBut');
  button.innerText = type.toUpperCase();
  return button;
}
