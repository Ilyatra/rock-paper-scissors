const panel = document.querySelector('.selection-panel');
const whoWinField = document.querySelector('.results__who-win');
const variant = {
    'камень' : 1, 
    'ножницы' : 2, 
    'бумага' : 3,
}
const translate = {
    'rock' : 'камень',
    'scissors' : 'ножницы',
    'paper' : 'бумага',
}
const variantRev = {
    1 : "камень", 2 : "ножницы", 3 : "бумага"
}

panel.addEventListener('click', (e)=> {
    if (e.target.tagName !== 'BUTTON') return;
    let playerSelection = translate[e.target.name];
    scoring(playRound(playerSelection, computerPlay()));
    console.log(e.target.name);
})

const playRound = function playRound(playerSelection, computerSelection) {
    if (variant[playerSelection] === computerSelection) {
        declareDraw(playerSelection, computerSelection);
        return 2;
    }else if (variant[playerSelection] + 1 === computerSelection || 
        variant[playerSelection] - 2 == computerSelection) {
        declareWin(true, playerSelection, computerSelection);
        return 1;
    }else{
        declareWin(false, playerSelection, computerSelection);
        return 0;
    }
}

const computerPlay = function computerPlay() {
    return Math.floor(Math.random() * 3) + 1;
}

const declareDraw = function declareDraw(playerSelection, computerSelection) {
    whoWinField.innerHTML = `Вы и компьютер выбрали ${computerSelection == 3 ? "бумагу": playerSelection}, ничья`;
}

const declareWin = function declareWin(userWin, playerSelection, computerSelection) {
    if (userWin) {
        whoWinField.innerHTML = `Вы выбрали ${variant[playerSelection] == 3 ? "бумагу,": playerSelection + ","} компьютер - ${computerSelection == 3 ? "бумагу": variantRev[computerSelection]}, ${playerSelection} ${computerSelection == 3 ? "побеждают бумагу": "побеждает " + variantRev[computerSelection]} - победа за вами!`;
    }else{
        whoWinField.innerHTML = `Вы выбрали ${variant[playerSelection] == 3 ? "бумагу,": playerSelection + ","} компьютер - ${computerSelection == 3 ? "бумагу": variantRev[computerSelection]}, ${variantRev[computerSelection]} ${variant[playerSelection] == 3 ? "побеждают бумагу": "побеждает " + playerSelection} - победа за компьютером`;
    }
}

const scoring = function scoring(winner) {
    switch(winner) {
        case 0: 
            let comp = document.querySelector('.total-score__computer');
            comp.innerHTML++;
            if (comp.innerHTML == 5) gameRestart('компьютер победил');
            break;
        case 1:
            let player = document.querySelector('.total-score__player');
            player.innerHTML++;
            if (player.innerHTML == 5) gameRestart('игрок победил');
            break;
        case 2:
            document.querySelector('.total-score__draw').innerHTML++;
            break;
    }
}

const gameRestart = function gameRestart(msg) {
    document.querySelector('.total-score__player').innerHTML = '0';
    document.querySelector('.total-score__computer').innerHTML = '0';
    document.querySelector('.total-score__draw').innerHTML = '0';
    alert(msg);
}