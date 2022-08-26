import ancients from './data/ancients.js';
import cards from './data/mythicCards/index.js';
import difficulties from './data/difficulties.js';
console.log(ancients);
console.log(cards);
console.log(difficulties);

const ancientsCont = document.querySelector('.ancients-cont'),
    diffCont = document.querySelector('.diff-cont'),
    deckCont = document.querySelector('.deck-cont'),
    msgBox = document.querySelector('.message-box'),
    statusBar = document.querySelector('.status-bar'),
    stagesCont = document.querySelector('.stages-cont'),
    cardCount = document.querySelectorAll('.card-count'),
    shuffleCont = document.querySelector('.shuffle-button-cont'),
    shuffleButton = document.querySelector('.shuffle-button')

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
        })
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
    console.log(arrStagesCount)
}
//shuffle LMFAO - Party Rock Anthem
shuffleButton.addEventListener('click',() => {
    if (curDiff.id == 'very easy') {

    } else if (curDiff.id == 'easy') {
        cardDeck = [...cards.blueCards,...cards.brownCards,...cards.greenCards].filter(el => el.difficulty != 'hard')  
    } else if (curDiff.id == 'medium') {

    } else if (curDiff.id == 'hard') {
        cardDeck = [...cards.blueCards,...cards.brownCards,...cards.greenCards].filter(el => el.difficulty != 'easy') 
    } else if (curDiff == 'very hard') {
        
    }
    console.log(cardDeck);
})
showAncients();
