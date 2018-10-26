// + При натиску на кнопку старт вона має пропадати, а блоку з класом game має додаватися властивість diplay: flex.
// + Коли намалювалися карти запускається тег аудіо з файлом normal.MP3
// + Запустити файл аудіо можна через конструкцію document.querySelector(клас тега).play()
// + При кліку на карту вона має перевертатися (додати клас flip)
// + Коли клацнули на другу карту відбувається їхнє порівняння по атрибуту data-name
// + Якщо карти співпали їм дається opacity = 0;
// + Якщо карти різні в них забираєтья клас flip
// + При кліку на карту активується аудіофайл flip.MP3
// + Для того щоб звук відтворювався при кліку відразу без затримки потрібно вибрати файл чеерез js і додати йому поде currentTime = 0;
// (document.querySelector(клас).currentTime = 0)

// function win() {
//     let allOpacityCard = document.querySelectorAll('.flip');
//     if (allOpacityCard.length === 24) {
//         let res = confirm('You win!!! \n Play again?');
//         if (res) {
//             location.reload();
//         } else {
//             clearInterval(ID);
//             alert('Comeback soon');
//             document.querySelector('.game').style.display = 'none';
//             document.querySelector('.timer').style.display = 'none';
//             // clearInterval(ID);
//         }
//     }
// }

//-------------------------------------------------------------------------
let startBtn = document.querySelector('.start');

let allCards = [...document.querySelectorAll('.card')];

let ID;
let startFn = () => {
    document.querySelector('.timer').style.display = 'block';
    ID = setInterval(timerDiv, 200);
    startBtn.style.display = 'none';
    document.querySelector('.game').style.display = 'flex';

    allCards.map(el => el.style.order = Math.floor(Math.random() * 24));

    document.querySelector('.track').play();
};

startBtn.addEventListener('click', startFn);

//--------------------------------------------------------------------

allCards.map(el => el.addEventListener('click', flipCard));

let firstCard;
let secondCard;
let hasFlipped = false;
let blockClick = false;

function flipCard() {
    //!!!!!!!!!!!!!!!
    if (blockClick === true) {
        return;
    } else {
        this.classList.add('flip');
        document.querySelector('.flipSound').currentTime = 0;
        document.querySelector('.flipSound').play();

        if (!hasFlipped) {
            firstCard = this;
            hasFlipped = true;
            // console.log(firstCard);
        } else {
            blockClick = true;
            secondCard = this;
            hasFlipped = false;
            // console.log(secondCard);

            if (firstCard.dataset.name === secondCard.dataset.name && firstCard !== secondCard) {
                setTimeout(opacity, 300);
            } else {
                setTimeout(removeFlip, 700);
            }
        }

        // setTimeout(win, 700);

        function win() {
            let allOpacityCard = document.querySelectorAll('.flip');
            if (allOpacityCard.length === 24) {
                let res = confirm('You win!!! \n Play again?');
                if (res) {
                    location.reload();
                } else {
                    clearInterval(ID);
                    alert('Comeback soon');
                    document.querySelector('.game').style.display = 'none';
                    document.querySelector('.timer').style.display = 'none';
                    // clearInterval(ID);
                }
            }
        }
        setTimeout(win, 100);
    }
}

function opacity() {
    firstCard.style.opacity = '0';
    secondCard.style.opacity = '0';
    document.querySelector('.correct').currentTime = 0;
    document.querySelector('.correct').play();
    blockClick = false;
}

function removeFlip() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    blockClick = false;
}

// -------- timer -----------------------------------------


/*
let finishTime = (Date.now() + 100000)/1000;

function startTimer() {
    let timer = finishTime - Date.now()/1000;
    document.querySelector('.timer').style.width = Math.floor(timer)+'%';
    if (document.querySelector('.timer').style.width === '0%') {
        let result = confirm('You loose!!! \n Try again?');
        if (result) {
            location.reload();
        } else {
            alert('You looooooose!!! again');
            document.querySelector('.game').style.display = 'none';
        }
    }
}
*/

let width = 600;

function timerDiv() {
    width -= 2;
    document.querySelector('.timer').style.width = `${width}px`;
    if (width === 0) {
        let result = confirm('You loose!!! \n Try again?');
        if (result) {
            location.reload();
        } else {
            alert('You looooooose!!! again');
            document.querySelector('.game').style.display = 'none';
        }
    }
}
