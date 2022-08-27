import ancients from './data/ancients.js';
import cards from './data/mythicCards/index.js';
import difficulties from './data/difficulties.js';
//console.log(ancients);
//console.log(cards);
//console.log(difficulties);

const ancientsCont = document.querySelector('.ancients-cont'),
    diffCont = document.querySelector('.diff-cont'),
    deckCont = document.querySelector('.deck-cont'),
    msgBox = document.querySelector('.message-box'),
    statusBar = document.querySelector('.status-bar'),
    stagesCont = document.querySelector('.stages-cont'),
    cardCount = document.querySelectorAll('.card-count'),
    shuffleCont = document.querySelector('.shuffle-button-cont'),
    shuffleButton = document.querySelector('.shuffle-button'),
    cardDeckDom = document.querySelector('.card-deck'),
    currentCard = document.querySelector('.current-card')

let curAncient = '',
    curDiff = '',
    strStatus = '',
    curStage = '',
    arrStagesCount = [],
    cardDeck = []

console.log(curAncient);
//show ancients
const showAncients = () => {
    ancients.forEach((el, id) => {
        let div = document.createElement("div");
        div.classList.add("ancient");
        div.classList.add(el.name);
        div.style.backgroundImage = `url(${el.cardFace})`
        ancientsCont.appendChild(div);
        div.addEventListener('click', (elem) => {
            curAncient = ancients[id];
            console.log(curAncient);
            //div.style.transform = `translate(${id*(-370)}px,0px)`;
            showMessage('Choose your rank!');
            showDiff();
            showStatus();
            unvisAncient(id);
            setStagesArr();
            showStages();
        }, { once: true })
    })
}

//unvisible other ancients
const unvisAncient = (id) => {
    const ancientDiv = document.querySelectorAll('.ancient');
    ancientDiv.forEach((el, id2) => {
        if (id2 != id) el.classList.add('unvisible')
        else el.classList.add('active');
    })
}

const showMessage = (txt) => {
    msgBox.innerHTML = txt
}
const showStatus = () => {
    statusBar.innerHTML = curAncient.name + ' [' + curDiff.name + '] ' + curStage;
}

//show difficult chooser
const showDiff = () => {
    let ul = document.createElement("ul");
    ul.classList.add("diff-list");
    difficulties.forEach((el, id) => {
        let li = document.createElement("li");
        li.classList.add("diff-item");
        li.innerHTML = el.name;
        ul.appendChild(li);
        li.addEventListener('click', (el) => {
            curDiff = difficulties[id];
            ul.classList.add('unvisible');
            showMessage('Shuffle the cards');
            shuffleCont.classList.remove('unvisible');
            showStatus();
        }, { once: true })
    })
    diffCont.appendChild(ul);
}
//set stages
const setStagesArr = () => {
    arrStagesCount = [...Object.values(curAncient.firstStage), ...Object.values(curAncient.secondStage), ...Object.values(curAncient.thirdStage)];
}
//show stages
const showStages = () => {
    cardCount.forEach((el, id) => {
        el.innerHTML = arrStagesCount[id];
    });
    stagesCont.classList.remove('unvisible');
}
//shuffle LMFAO - Party Rock Anthem
shuffleButton.addEventListener('click',() => {
    cardDeck = setDecksByStages();
    console.log(cardDeck);
    shuffleCont.classList.add('unvisible');
    showMessage('Let the journey begin!');
    cardDeckDom.classList.remove('unvisible');

}, { once: true })

const filterDeckByDiffs = (deck) => {
    switch (curDiff.id) {
    case 'easiest':
        return [...deck.filter(el => el.difficulty == 'easy').sort(() => Math.random()-.5),...deck.filter(el => el.difficulty == 'normal').sort(() => Math.random()-.5)];
    case 'easy':
        return deck.filter(el => el.difficulty != 'hard').sort(() => Math.random()-.5);
    case 'normal':
        return deck.sort(() => Math.random()-.5);
    case 'hard':
        return deck.filter(el => el.difficulty != 'easy').sort(() => Math.random()-.5);
    case 'hardest':
        return [...deck.filter(el => el.difficulty == 'hard').sort(() => Math.random()-.5),...deck.filter(el => el.difficulty == 'normal').sort(() => Math.random()-.5)];
    }
}

const setDecksByStages = () => {
    const greenDeck = filterDeckByDiffs(cards.greenCards),
    brownDeck = filterDeckByDiffs(cards.brownCards),
    blueDeck = filterDeckByDiffs(cards.blueCards);
    

    let firstStageDeck = [...greenDeck.splice(0, curAncient.firstStage.greenCards),
                         ...brownDeck.splice(0, curAncient.firstStage.brownCards),
                         ...blueDeck.splice(0, curAncient.firstStage.blueCards)],
        secondStageDeck = [...greenDeck.splice(0, curAncient.secondStage.greenCards),
                            ...brownDeck.splice(0, curAncient.secondStage.brownCards),
                            ...blueDeck.splice(0, curAncient.secondStage.blueCards)],
        thirdStageDeck = [...greenDeck.splice(0, curAncient.thirdStage.greenCards),
                            ...brownDeck.splice(0, curAncient.thirdStage.brownCards),
                            ...blueDeck.splice(0, curAncient.thirdStage.blueCards)];               

    return ([...firstStageDeck.sort(()=> Math.random()-.5),
        ...secondStageDeck.sort(()=> Math.random()-.5),
        ...thirdStageDeck.sort(()=> Math.random()-.5)]).reverse();
}

//begin the game
cardDeckDom.addEventListener('click', () => {
    currentCard.classList.remove('unvisible');
    if (cardDeck.length>1) showMessage('Take another one card')
    else {
        showMessage('Finish the game');
        cardDeckDom.style.backgroundImage = 'url(./assets/mythicCardBackgroundEmpty.png)'
    }
    const nextCard = getNextCard();
    currentCard.style.backgroundImage = `url(${nextCard.cardFace})`

})

//get the card
const getNextCard = () => {
    const curCard = cardDeck.pop();
    console.log(curCard);
    if(curCard) {
        switch (curCard.color) {
            case 'green':
                if (arrStagesCount[0] > 0) arrStagesCount[0]--
                else if (arrStagesCount[3]>0) arrStagesCount[3]--
                else arrStagesCount[6]--;
                break;
            case 'brown':
                if (arrStagesCount[1] > 0) arrStagesCount[1]--
                else if (arrStagesCount[4]>0) arrStagesCount[4]--
                else arrStagesCount[7]--;
                break;
            case 'blue':
                if (arrStagesCount[2] > 0) arrStagesCount[2]--
                else if (arrStagesCount[5]>0) arrStagesCount[5]--
                else arrStagesCount[8]--;
                break;
        }
        showStages();
        return curCard;
    } else {
        showMessage('You WIN!!!');
        statusBar.innerHTML = '(refresh the page if you want to play one more time)'
        cardDeckDom.classList.add('unvisible');
        currentCard.classList.add('unvisible');
        return false;
    }
}
showAncients();
