const board = document.getElementById('board');
const triesDisplay = document.getElementById('tries');
const resetBtn = document.getElementById('reset-btn');


const imagePaths = [
    'Gambar/img1.jpg', 
    'Gambar/img2.jpg', 
    'Gambar/img3.jpg', 
    'Gambar/img4.jpg', 
    'Gambar/img5.jpg', 
    'Gambar/img6.jpg', 
    'Gambar/img7.jpg', 
    'Gambar/img8.jpg'
];
// --- --- --- --- --- --- ---

let cards = [...imagePaths, ...imagePaths];
let flippedCards = [];
let matchedCount = 0;
let tries = 0;
let isBoardLocked = false; 

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = '';
    shuffle(cards).forEach(imagePath => {
        const card = document.createElement('div');
        card.classList.add('card');
        

        card.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">
                <img src="${imagePath}" alt="Memory Card">
            </div>
        `;
       
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
   
    if (isBoardLocked) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        tries++;
        triesDisplay.innerText = tries;
        checkMatch();
    }
}

function checkMatch() {
    isBoardLocked = true; 
    
    const [card1, card2] = flippedCards;
    

    const img1Src = card1.querySelector('.card-back img').getAttribute('src');
    const img2Src = card2.querySelector('.card-back img').getAttribute('src');

    if (img1Src === img2Src) {
        card1.classList.add('matched', 'flipped');
        card2.classList.add('matched', 'flipped');
        flippedCards = [];
        matchedCount++;
        isBoardLocked = false;
        
        
        if (matchedCount === imagePaths.length) {
            setTimeout(() => alert(`Yey Menang! Total percobaan: ${tries}`), 500);
        }
    } else {
        
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isBoardLocked = false; 
        }, 1000);
    }
}

resetBtn.addEventListener('click', () => {
    tries = 0;
    matchedCount = 0;
    triesDisplay.innerText = tries;
    createBoard();
});


createBoard();
