import ancients from './data/ancients.js';
import cards from './data/mythicCards/index.js';
import difficulties from './data/difficulties.js';
console.log(ancients);
console.log(cards);
console.log(difficulties);

const ancientsCont = document.querySelector('.ancients-cont'),
    diffCont = document.querySelector('.diff-cont'),
    deckCont = document.querySelector('.deck-cont'),
    msgBox = document.querySelector('.message-box')

let curAncient = ancients[0];
console.log(curAncient);
//show ancients
const showAncients = () => {
    ancients.forEach((el, id) => {
        let div = document.createElement("div");
        div.classList.add("ancient");
        div.classList.add(el.name);
        div.style.backgroundImage = `url(${el.cardFace})`
        ancientsCont.appendChild(div);
        div.addEventListener('click', () => {
            curAncient = ancients[id];
            console.log(curAncient);
            showMessage('Choose your rank!');
            showDiff();
        })
    })
}


const showMessage = (txt) => {
    msgBox.innerHTML = txt
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
    })
    diffCont.appendChild(ul);
}

showAncients();
