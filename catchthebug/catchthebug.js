const limit = 500;
const upSpeed = 50;
let interval = 2000;
let score = 0;
let timer;

let bgReady = false;
let bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    bgReady = true;
};

let render = function(){

    let c = document.getElementById('canvas');
    let ctx = c.getContext('2d');

    c.width = 900;
    c.height = 600;
    c.style.margin = '0px';
    c.style.borderStyle = 'none';

    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0, 900, 600);
    }
}

function resetSpeed(){
    clearInterval(timer);
    interval = 2000;
    timer = setInterval(moveBug, interval);

    displaySpeed();
}


function resetScore(){
    score = 0;
    document.getElementById('score').innerText = score;
}

function moveBug(){
    let obj = document.getElementById('bug');
    let bgObj = document.getElementById('canvas');
    let bug = document.getElementById('bug');
    let width = Math.random()*(bgObj.clientHeight -bug.width);
    let height = Math.random()*(bgObj.clientHeight-bug.height);

    while(height < 20){  // avoid
        height = Math.random()*(bgObj.clientHeight-bug.height);
    }
    obj.style.left = width+'px';
    obj.style.top = height+'px';
}

function displaySpeed(){
    let sp = document.getElementById('currentSpeed');
    sp.innerText = 'Current Speed: '+(interval*0.001).toFixed(2)+' second';
}

function displayCatch(){
    displaySpeed();
    let p = document.createElement('p');
    p.innerText = 'HIT';
    p.setAttribute('class', 'hit');
    let score = document.getElementById('score');
    score.after(p);
    setTimeout(function(){
        p.remove();
    },300);
}

function catchBug(){
    score += 10;
    document.getElementById('score').innerText = score;

    clearInterval(timer);

    interval -= upSpeed;
    if(interval < limit){
        interval = limit;
    }

    moveBug();
    timer = setInterval(moveBug, interval);
    displayCatch();
}

function gameStop(){

    let obj = document.getElementById('stop');
    obj.classList.toggle('pause');

    if(obj.classList.contains('pause')){
        clearInterval(timer);
        document.getElementById('bug').removeEventListener('click', catchBug);
        obj.innerText = 'Game resume';
    } else {
        timer = setInterval(moveBug, interval);
        document.getElementById('bug').addEventListener('click', catchBug);
        obj.innerText = 'Game pause';
    }
}

function setUpPage(){

    render();
    moveBug();

    timer = setInterval(moveBug, interval);

    document.getElementById('bug').addEventListener('click', catchBug);
    document.getElementById('rScore').addEventListener('click', resetScore);
    document.getElementById('rSpeed').addEventListener('click', resetSpeed);
    document.getElementById('stop').addEventListener('click', gameStop);
}

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent)  {
    window.attachEvent("onload", setUpPage);
}