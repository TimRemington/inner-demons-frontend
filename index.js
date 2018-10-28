document.addEventListener(`DOMContentLoaded`, () => {

});

const goalsDropdown = document.querySelector('#goalsDropdown');
const weaponsDropdown = document.querySelector('#weaponsDropdown');
const monstersDropdown = document.querySelector('#monstersDropdown');

function makeCard(drop) {
  drop.appendChild(makeDiv('card'));
}

function makeDiv(cl) {
  let div = document.createElement('div');
  cl.forEach(x => {
    div.classList.add(x);
  });
  return div;
}
