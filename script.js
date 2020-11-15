const myApp = {};
myApp.$player =$('.player');
myApp.$dealer =$('.dealer');
myApp.$modal = $('.modal');
myApp.$resultsText = $('.resultsText');
myApp.$readMoreArrow = $('.arrow i');
myApp.$bankElement = $('.bank');
myApp.playerBank = 1000;
myApp.$currentBetElement = $('.currentBet');
myApp.playerBet = '';


// Store the drawn cards
myApp.hand = {
    player:[0],
    dealer:[0],
}
// Sum of the drawn cards array
myApp.results = {
    player:'',
    dealer:'',
}
//All the possible cards variations
myApp.cards = {
    suits:['&spades;','&diams;','&hearts;','&clubs;'],
    ranks:[2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
}

myApp.init = function(){
    $('.rules').hide();
} 
//Handle betting errors
myApp.betErrorHandler = function(e){
    e.preventDefault();
    const errorMessage = $('.error');
    const betInputVal = parseInt($('#betInput').val());

    if(betInputVal < 1){
        errorMessage.text("Your bet has to be at least 1$, dummy");
    } else if(myApp.playerBank < 1){
        errorMessage.text("I'm going to have to ask you to leave. (Your bank is dry AF)");
    }
    else if(betInputVal > myApp.playerBank){
        errorMessage.text("You're sure you got that much money, pal?");
    }
    else {
        errorMessage.empty();
        myApp.setBet();
    }
}
//Set bet
myApp.setBet = function(){
    myApp.playerBet = $('#betInput').val();
    myApp.$currentBetElement.text(myApp.playerBet);
    myApp.playerBank -= myApp.playerBet; 
    myApp.$bankElement.text(myApp.playerBank);
    console.log(myApp.playerBet, myApp.playerBank);
    myApp.startGame();
}
//Reset all the data and make an initial draw
myApp.startGame = function(){
    myApp.$player.empty();
    myApp.$dealer.empty();

    myApp.hand.player = [0];
    myApp.hand.dealer = [0];
    
    myApp.results.player = '';
    myApp.results.dealer = '';
    $('.modal').slideUp('slow');

    for(let i = 0;i < 2;i++){
        myApp.dealCards(myApp.$dealer);
        myApp.dealCards(myApp.$player);
    }  

    $('.dealer div:nth-child(2)').attr('class', 'hidden card');
}
//Insert cards to the DOM
myApp.dealCards = function(side){
    let rank = myApp.getRandomSign('ranks');
    let suit = myApp.getRandomSign('suits');

    const cardHtml = `<div class="card">
                        <span class="rank">${rank}</span>
                        <span class="topSuit"> ${suit}</span>
                        <span class="suit"> ${suit}</span>
                    </div>`;
    side.append(cardHtml);

    myApp.setCardScore(side.attr('class'), rank);

    myApp.results.player = myApp.countHand(myApp.hand.player);
    myApp.results.dealer = myApp.countHand(myApp.hand.dealer);

    $('.playerScoreIndicator').text(myApp.results.player);

    if(myApp.over21(myApp.results.player)){
        myApp.gameOver('successfully lost. Bravo!');
    }
}
//Generates random rank or suit for the card
myApp.getRandomSign = function(sign) {
    const randomIndex = myApp.getRandomNumber(myApp.cards[sign].length)
    const randomSign = myApp.cards[sign][randomIndex];
    return randomSign;
}
//Generates random number from zero to the specified parameter
myApp.getRandomNumber = function(number){
    return Math.floor(Math.random() * number);
}
//Updates drawn cards data
myApp.setCardScore = function(side, rank ){
    if(!isNaN(rank)){
        myApp.hand[side].push(rank);
    } 
    else if (rank === 'A') {
        myApp.hand[side].push(11);
    } 
    else if(rank === 'J'||rank === 'Q'||rank === 'K') {
        myApp.hand[side].push(10);
    }
} 
//Calculates the score (the sum of all the cards drawn)
myApp.countHand = function(hand){
    const sum = hand.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
    })
    return sum;
}
//Overdraft verification
myApp.over21 = function(score){
    if(score > 21) {
        return true;
    }
}
//When player's turn is over calculate the winner or draw the crad for the dealer if needed
myApp.standHandler = function(){
    const player = myApp.results.player;
    const dealer = myApp.results.dealer;

    $('.dealer div:nth-child(2)').attr('class', 'card');
    $('.dealerScoreIndicator').text(myApp.results.dealer);

    if(dealer > player && dealer <= 21) {
        myApp.gameOver('successfully lost. Bravo!');
    } 
    else if(dealer > 21){
        myApp.gameOver('unfortunately, won.');
    }
    else if(dealer === player){
        myApp.gameOver('luckily for you, tied.');
        
    }
    else if(dealer < player) {
        myApp.dealCards(myApp.$dealer);
        myApp.standHandler();
    }
}
//Display the winner
myApp.gameOver = function(phrase){
    myApp.$resultsText.text(`You have ${phrase}`); 
    switch (phrase) {
        case 'successfully lost. Bravo!':
            break;
        case 'unfortunately, won.':
            myApp.playerBank += myApp.playerBet * 1.5; 
            break;
        case 'luckily for you, tied.':
            myApp.playerBank += myApp.playerBet; 
            break;        
    }

    myApp.$currentBetElement.empty();
    myApp.$bankElement.text(myApp.playerBank);
    $('.rules').hide();
    $('.arrow i').attr('class','fas fa-chevron-right');

    $('.modal').slideDown('slow');
}

//Event listeners
myApp.eventListeners = function(){
    $('.hit').on('click', function(){   
    myApp.dealCards(myApp.$player);
    })

    $('.stand').on('click', myApp.standHandler);

    $('form').on('submit', myApp.betErrorHandler);

    $('.readRules').on('click', ()=> {
        if(myApp.$readMoreArrow.attr('class') === 'fas fa-chevron-right'){
            $('.rules').slideDown();
            $('.arrow i').attr('class','fas fa-chevron-down');
        } else if (myApp.$readMoreArrow.attr('class') === 'fas fa-chevron-down'){
            $('.rules').slideUp();
            $('.arrow i').attr('class','fas fa-chevron-right');
        } 
    })

}
//Document ready
$(function(){
    myApp.init(); 
    myApp.eventListeners();
    myApp.$bankElement.text(myApp.playerBank);    
})





















