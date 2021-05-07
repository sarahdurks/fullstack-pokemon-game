// DOM selection
const usernameEl = document.querySelector('.username-login');
const passwordEl = document.querySelector('.password-login');
const loginButtonEl = document.querySelector('#loginbtn');

//   Event listener for Login button

loginButtonEl.addEventListener('click', async (event) => {
  event.preventDefault();
  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();
  // console.log(username, password);
  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        // alert('Login Succesful');
        document.location.replace('/draftpage');
      } else {
        alert(response.statusText);
      }
    }
    catch (e) {
      console.log(e);
    }
  }
});



