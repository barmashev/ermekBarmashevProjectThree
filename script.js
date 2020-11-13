const myApp = {};
myApp.$player =$('.player');
myApp.$dealer =$('.dealer');
myApp.$modal = $('.modal');
myApp.$resultsText = $('.resultsText');


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

myApp.dealCards = function(side){
    let rank = myApp.getRandomSign('ranks');
    let suit = myApp.getRandomSign('suits');

    const cardHtml =`<div class="card">
                        <span class="rank">${rank}</span>
                        <span class="suit"> ${suit}</span>
                    </div>`;
    side.append(cardHtml);

    myApp.setCardScore(side.attr('class'), rank);

    myApp.results.player = myApp.countHand(myApp.hand.player);
    myApp.results.dealer = myApp.countHand(myApp.hand.dealer);

    if(myApp.over21(myApp.results.player)){
        myApp.gameOver('lost');
    }
}

myApp.getRandomNumber = function(number){
    return Math.floor(Math.random() * number);
}

myApp.getRandomSign = function(sign) {
    const randomIndex = myApp.getRandomNumber(myApp.cards[sign].length)
    const randomSign = myApp.cards[sign][randomIndex];
    return randomSign;
}

myApp.setCardScore = function(side, rank ){
    if(!isNaN(rank)){
        myApp.hand[side].push(rank);
    } 
    else if (rank === 'A') {
        myApp.hand[side].push(11);
    } 
    else if(rank === 'J'||'Q'||'K') {
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

    myApp.over21('dealer', dealer);

    if(dealer > player && dealer <= 21) {
        myApp.gameOver('lost');
    } 
    else if(dealer > 21){
        myApp.gameOver('won');
    }
    else {
        myApp.dealCards(myApp.$dealer);
        console.log('dealer drawing');
        myApp.standHandler();
    }
}

myApp.init = function(){
    myApp.$player.empty();
    myApp.$dealer.empty();

    myApp.hand.player = [0];
    myApp.hand.dealer = [0];
    
    myApp.results.player = '';
    myApp.results.dealer = '';
    $('.modal').slideUp('slow');
    myApp.clickHit();
    myApp.clickStand();

    for(let i = 0; i < 2; i++) {
        myApp.dealCards(myApp.$player);
        myApp.dealCards(myApp.$dealer);
    }
}

myApp.startGame = function(){
    $('.startGame').on('click', myApp.init);
}  

myApp.gameOver = function(verb){
    setTimeout(() => {
        myApp.$resultsText.text(`You have ${verb}`);
        

        $('.modal').slideDown('slow');

        myApp.startGame();

    }, 1000);
}


//Event listeners


myApp.clickHit = function(){
    $('.hit').on('click', function(){
    myApp.dealCards(myApp.$player);
})
}    

myApp.clickStand = function(){
    $('.stand').on('click', myApp.standHandler);
}    


$(function(){
    myApp.startGame(); 
})












