// DOM selection
const signupNameEl = document.querySelector('.username-signup');
const signupEmailEl = document.querySelector('.email-signup');
const signupPwdEl = document.querySelector('.password-signup');
const signupBtnEl = document.querySelector('#signupbtn');

//   Event listener for sign up button
signupBtnEl.addEventListener('click', async (event) => {

    event.preventDefault();

    const username = signupNameEl.value.trim();
    const email = signupEmailEl.value.trim();
    const password = signupPwdEl.value.trim();

    if (username && email && password) {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            // check the response status
            if (response.ok) {
                document.location.replace('/team');
                // alert('Sign-Up successful');

            } else {
                alert(response.statusText);
            }
        }
        catch (e) {
            console.log(e);
        }

    }
});
