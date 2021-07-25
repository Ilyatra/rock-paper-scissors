const variant = {
    "камень" : 1, "ножницы" : 2, "бумага" : 3
}
const variantRev = {
    1 : "камень", 2 : "ножницы", 3 : "бумага"
}
function playerPlay() {
    let playerSelection = "камень"
    while (!variant[playerSelection]) {
        playerSelection = prompt("Введите камень, ножницы или бумага","").toLowerCase();
    }
    return playerSelection;
}

function playRound(playerSelection, computerSelection) {
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

function computerPlay() {
    return Math.floor(Math.random() * 3) + 1;
}

function declareDraw(playerSelection, computerSelection) {
    console.log(`Вы и компьютер выбрали ${computerSelection == 3 ? "бумагу": playerSelection}, ничья`); 
}

function declareWin(userWin, playerSelection, computerSelection) {
    if (userWin) {
        console.log(`Вы выбрали ${variant[playerSelection] == 3 ? 
            "бумагу,": playerSelection + ","} компьютер - ${computerSelection == 3 ? "бумагу": variantRev[computerSelection]}, ${playerSelection} ${computerSelection == 3 ? "побеждают бумагу": "побеждает " + variantRev[computerSelection]} - победа за вами!`);  
    }else{
        console.log(`Вы выбрали ${variant[playerSelection] == 3 ? 
            "бумагу,": playerSelection + ","} компьютер - ${computerSelection == 3 ? "бумагу": variantRev[computerSelection]}, ${variantRev[computerSelection]} ${variant[playerSelection] == 3 ? "побеждают бумагу": "побеждает " + playerSelection} - победа за компьютером`);
    }
}

function game() {
    let total = [0,0,0];
    for (let i = 0; i < 5; i++) {
        total[playRound(playerPlay(), computerPlay())] += 1;
    }
    if (total[0] > total[1]){
        console.log("Вы победили по итогу пяти матчей");
    }else if(total[0] < total[1]){
        console.log("Вы проиграли по итогу пяти матчей");
    }else{
        console.log("По итогу пяти матчей - ничья")
    }
}

game();

