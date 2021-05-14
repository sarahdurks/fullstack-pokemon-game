// DOM selection
const emailEl = document.querySelector('.email-login');
const passwordEl = document.querySelector('.password-login');
const loginButtonEl = document.querySelector('#loginbtn');

//   Event listener for Login button

loginButtonEl.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();
  // console.log(email, password);
  if (!email || !password) {
    alert("You must enter an email and password")
  }
  else if (email && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        document.location.replace('/team');
      } else {
        alert("Incorrect email or password, please try again!");
      }
    }
    catch (e) {
      console.log(e);
    }
  }
});



