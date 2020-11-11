const myApp = {};
$player =$('.player');
$dealer =$('.dealer');

myApp.score = {
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

myApp.getRandomNumber = function(number){
    return Math.floor(Math.random() * number);
}

myApp.getRandomSign = function(sign) {
    const randomIndex = myApp.getRandomNumber(myApp.cards[sign].length)
    const randomSign = myApp.cards[sign][randomIndex];
    return randomSign;
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

    myApp.results.player = myApp.countHand(myApp.score.player);
    myApp.results.dealer = myApp.countHand(myApp.score.dealer);

    myApp.scoreCheck(myApp.results.player);
}

myApp.setCardScore = function(side, rank ){
    if(!isNaN(rank)){
        myApp.score[side].push(rank);
    } 
    else if (rank === 'A') {
        myApp.score[side].push(11);
    } 
    else if(rank === 'J'||'Q'||'K') {
        myApp.score[side].push(10);
    }
} 

myApp.countHand = function(hand){
    const sum = hand.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
    })
    return sum;
}

myApp.scoreCheck = function(score){
    if(score > 21) {
        console.log('you lost');
    }
}

myApp.standHandler = function(){
    if(myApp.results.dealer > myApp.results.player) {
        console.log('you lost')
    } else {
        myApp.dealCards($dealer);
        s
    }
}

myApp.calculateResults = function(){
    
}





//Event listeners
$('.hit').on('click', function(){
    myApp.dealCards($player);
})

$('.stand').on('click', myApp.standHandler)


for(let i = 0; i < 2; i++) {
    myApp.dealCards($player);
    myApp.dealCards($dealer);
}












