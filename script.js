let char1 = new Knight('Antonio');
let char2 = new Knight('Maya');

const stage =  new Stage(
    char1,
    char2,
    document.querySelector('#char1'),
    document.querySelector('#char2')

);
console.log(char1)
stage.start();
