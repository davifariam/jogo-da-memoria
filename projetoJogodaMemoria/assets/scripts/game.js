let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function () {
        return this.cards.every(card => card.flipped);
    },

    jollys: ['luffyjolly', 'zorojolly', 'sanjijolly', 'namijolly', 'usoppjolly', 'chopperjolly', 'robinjolly', 'frankyjolly', 'brookjolly', 'jinbeijolly'],

    cards: null,

    createCardsFromJollys: function () {
        this.cards = [];

        this.jollys.forEach((jolly) => {
            this.cards.push(this.createPairFromJolly(jolly));
        });

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromJolly: function (jolly) {
        return [{
            id: this.createIdWithJolly(jolly),
            icon: jolly,
            flipped: false,
        }, {
            id: this.createIdWithJolly(jolly),
            icon: jolly,
            flipped: false,
        }];
    },

    createIdWithJolly: function (jolly) {
        return jolly + parseInt(Math.random() * 1000);
    },

    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
};

function restart() {
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
    game.createCardsFromJollys();
    initializeCards(game.cards);
}
