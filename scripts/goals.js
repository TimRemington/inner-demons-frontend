document.addEventListener('DOMContentLoaded', () => {

  const setHere = document.querySelector('#setHere');
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

  makeGoalsCard(goalsData);

  function makeGoalsCard(data) {
    data.forEach(x => {
      let item = setHere.appendChild(makeDiv(['card'])).appendChild(makeDiv(['card-body', 'text-left']));
      let tasks = x.tasks.map(y => y.name);
      let row1 = item.appendChild(makeDiv(['row']));
      row1.appendChild(makeDiv(['col'])).innerHTML = `Goal: ${x.name}<br>`;
      row1.appendChild(makeDiv(['col'])).appendChild(makeButton('add', x.id));
      let row2 = item.appendChild(makeDiv(['row']));
      row2.appendChild(makeDiv(['col'])).innerHTML += `Experience: ${x.xp}<br>`
      let row3 = item.appendChild(makeDiv(['row']));
      row3.appendChild(makeDiv(['col'])).innerHTML += `Tasks: ${tasks.join(', ')}`
    });
  }

  function makeDiv(cl) { // make a div with a given class list array
    let div = document.createElement('div');
    cl.forEach(x => {
      div.classList.add(x)
    });
    return div;
  }

  function makeButton(type, id) { // make a button with given type and id
    let button = document.createElement('button');
    button.id = `${type}${id}`;
    button.classList.add('btn');
    button.classList.add('btn-dark');
    button.classList.add('goalBut');
    button.innerText = type.toUpperCase();
    return button;
  }


});
