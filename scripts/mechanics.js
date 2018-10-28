document.addEventListener('DOMContentLoaded', () => {

  checkDate();

  document.addEventListener('click', event => {
    if (/and/.test(event.target.id)) {
      completeTask(event.target);
    } else if (/complete/.test(event.target.id)) {
      // completeGoal(event.target);
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
  // axios.patch(`url/${userId}`, {gold: arr[1], points_toward_pass: 1});
}

function completeGoal(item) {
  item.classList.remove('btn-dark');
  item.classList.add('btn-primary');
  let nums = item.id.replace(/complete/, ''); // remove the word complete from the id
  let xp = parseInt(nums.split('tasks')[0]); // get the experience from the id
  // axios.patch(`url/${userId}`, {experience: xp});
}

function checkTasks(item) {
  let nums = item.id.replace(/complete/, ''); // remove the word complete from the id
  let tasks = nums.split('tasks')[1].split(''); // get the array of tasks associated with the goal
  tasks.forEach(x => { // make sure all tasks are set to true
    if (!localStorage.getItem(x)){
      return;
    } else {
      completeGoal(item);
    }
  })

}
