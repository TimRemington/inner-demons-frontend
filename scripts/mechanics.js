document.addEventListener('DOMContentLoaded', () => {

  checkDate();

  document.addEventListener('click', event => {
    if (/and/.test(event.target.id)) {
      completeTask(event.target);
    } else if (/complete/.test(event.target.id)) {
      checkTasks(event.target);
    }
  });

});

function checkDate() { // make sure the date is today. if it's not, clear storage
  let today = new Date().getDate();
  if (parseInt(localStorage.getItem('date')) !== today) {
    localStorage.clear();
    localStorage.setItem('date', today); // set the date as today
  }
}

function completeTask(item) {
  item.classList.remove('btn-dark');
  item.classList.add('btn-primary');
  let arr = item.id.split('and'); // remove the word and from the id
  let gold = parseInt(arr[1]); // get the gold from the id
  let id = parseInt(arr[0]); // get the task's id from the button's id
  localStorage.setItem(id, true);
  axios.get(`http://localhost:3000/users/${1}`)
  .then(result => {
    let preGold = parseInt(result.data.gold);
    let newGold = preGold+gold;
    let prePass = parseInt(result.data.points_toward_pass);
    let newPass = prePass++;
    axios.patch(`http://localhost:3000/users/${1}`, {gold: newGold, points_toward_pass: newPass})
    .then(result => {
      console.log(result);
    });
  })

}

function completeGoal(item) {
  item.classList.remove('btn-dark');
  item.classList.add('btn-primary');
  localStorage.setItem(item.id, true);
  let nums = item.id.replace(/complete/, ''); // remove the word complete from the id
  let xp = parseInt(nums.split('tasks')[0]); // get the experience from the id
  axios.get(`http://localhost:3000/users/${1}`)
  .then(result => {
    let preXp = parseInt(result.data.xp);
    let newXp = result.data.xp+xp
    axios.patch(`http://localhost:3000/users/${1}`, {xp: newXp})
    .then(result => {
      console.log(result);
    });
  });
}

function checkTasks(item) {
  let count = 0;
  let nums = item.id.replace(/complete/, ''); // remove the word complete from the id
  let tasks = nums.split('tasks')[1].split(''); // get the array of tasks associated with the goal
  tasks.forEach(x => { // make sure all tasks are set to true
    if (!localStorage.getItem(x)) count++;
  });
  if(localStorage.getItem(item.id)) count++
  if (count === 0) {
    completeGoal(item);
  }

}
