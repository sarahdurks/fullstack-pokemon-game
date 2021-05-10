const start = Date.now();

function checkLocalStorage () {
    var localStorageArray = localStorage.getItem('randomArray') || []
    if (locaStorageArray.length === 0 && start){
    for (i = 0; i<20; i++) {
    localStorageArray.push(Math.floor(Math.random()* 10))
    }
    }
    localStorage.setItem('randomArray', localStorageArray)
    return localStorageArray
    }