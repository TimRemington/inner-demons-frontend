document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#usernameField');
  const button = document.querySelector('#subBut');
  const fullForm = document.querySelector('#fullForm');

  if (localStorage.getItem('user')) {
    fullForm.setAttribute('hidden', true);
  }

  fullForm.addEventListener('submit', event => {
    event.preventDefault();
    axios.get(`http://localhost:3000/users`)
    .then(result => {
      let users = result.data.filter(x => {
        return x.name === form.value
      });
      localStorage.setItem('user', users[0].id)
      location.replace('../index.html')
    });
  });

});
