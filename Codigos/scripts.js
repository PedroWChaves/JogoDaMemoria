const cards = document.querySelectorAll('.memory-card');
const flippedCards = [];
let matches = 0;   // flipped pairs
let noMatches = 0; // pairs that didn't match

(function initialization(){
    cards.forEach(e => {
        e.addEventListener("click", flipCard);                    // add click event
        e.style.order = Math.floor(Math.random() * cards.length); // random position
    })
})()

function flipCard(){
    if(flippedCards.length >= 2 || flippedCards.find(card => this === card))
        return;
    
    this.classList.add("flip");
    flippedCards.push(this);

    if (flippedCards.length == 2){
        if(isMatch()){
            matches++;
            disableCards()
        }
        else{
            noMatches++;
            unflipCards();
        }
    }
}

let isMatch = () => (flippedCards[0].dataset.framework === flippedCards[1].dataset.framework);

function disableCards(){
    flippedCards.forEach(e => {
        e.removeEventListener("click", flipCard);
    })
    flippedCards.splice(0, 2); // remove cards from list

    if(matches == (cards.length / 2)) // check if game is over
        gameOver();
}

function unflipCards(){
    setTimeout(function(){
        flippedCards.forEach(e => {
            e.classList.remove("flip");
        })
        flippedCards.splice(0, 2); // remove cards from list
    }, 1500);   
}

function gameOver(){
    // announce game over
    setTimeout(function(){
        alert(`Você venceu com ${noMatches} tentativas erradas!\n\nO jogo será reiniciado.`)
    }, 500)

    // restart game
    setTimeout(function(){
        cards.forEach(e => {
            e.classList.remove("flip");
            e.addEventListener("click", flipCard);
            e.style.order = Math.floor(Math.random() * cards.length);
        })
        matches = 0;
        noMatches = 0;
    }, 1000)
} 
