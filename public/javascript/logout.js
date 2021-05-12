// DOM selection
const logoutBtnEl = document.querySelector('#logout');


if (logoutBtnEl) {

  logoutBtnEl.addEventListener('click', async  event => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  });
}