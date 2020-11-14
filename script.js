const myApp = {};
myApp.$player =$('.player');
myApp.$dealer =$('.dealer');
myApp.$modal = $('.modal');
myApp.$resultsText = $('.resultsText');
myApp.$readMoreArrow = $('.arrow i');


myApp.hand = {
    player:[0],
    dealer:[0],
}

myApp.results = {
    player:'',
    dealer:'',
}

myApp.cards = {
    suits:['&spades;','&diams;','&hearts;','&clubs;'],
    ranks:[2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
}

myApp.init = function(){
    $('.rules').hide();
}  

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
    console.log(myApp.$secondDealerCard);
    $('.dealer div:nth-child(2)').attr('class', 'hidden card');
}

myApp.dealCards = function(side){
    let rank = myApp.getRandomSign('ranks');
    let suit = myApp.getRandomSign('suits');

    const cardHtml =`<div class="card">
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

myApp.getRandomSign = function(sign) {
    const randomIndex = myApp.getRandomNumber(myApp.cards[sign].length)
    const randomSign = myApp.cards[sign][randomIndex];
    return randomSign;
}

myApp.getRandomNumber = function(number){
    return Math.floor(Math.random() * number);
}

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

myApp.countHand = function(hand){
    const sum = hand.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
    })
    return sum;
}

myApp.over21 = function(score){
    if(score > 21) {
        return true;
    }
}

myApp.standHandler = function(){
    const player = myApp.results.player;
    const dealer = myApp.results.dealer;

    $('.dealer div:nth-child(2)').attr('class', 'card');
    $('.dealerScoreIndicator').text(myApp.results.dealer);



    if(dealer > player && dealer <= 21) {
        myApp.gameOver('successfully lost. Bravo!');
    } 
    else if(dealer > 21){
        myApp.gameOver('unfortunately, won');
    }
    else if(dealer === player){
        myApp.gameOver('luckily for you, tied.');
    }
    else if(dealer < player) {
        myApp.dealCards(myApp.$dealer);
        myApp.standHandler();
    }
}

myApp.gameOver = function(verb){
    myApp.$resultsText.text(`You have ${verb}`); 
    $('.modal').slideDown('slow');
}

//Event listeners
myApp.eventListeners = function(){
    $('.hit').on('click', function(){   
    myApp.dealCards(myApp.$player);
    })

    $('.stand').on('click', myApp.standHandler);

    $('.startGameButton').on('click', myApp.startGame);

    $('.resultsButton').on('click', ()=> {
        if(myApp.$readMoreArrow.attr('class') === 'fas fa-chevron-right'){
            $('.rules').slideDown();
            $('.arrow i').attr('class','fas fa-chevron-down');
        } else if (myApp.$readMoreArrow.attr('class') === 'fas fa-chevron-down'){
            $('.rules').slideUp();
            $('.arrow i').attr('class','fas fa-chevron-right');
        } 
    })
}

$(function(){
    myApp.init(); 
    myApp.eventListeners();
})



















