import ancients from './data/ancients.js';
import cards from './data/mythicCards/index.js';
import difficulties from './data/difficulties.js';
console.log(ancients);
console.log(cards);
console.log(difficulties);

const ancientsCont = document.querySelector('.ancients-cont'),
    diffCont = document.querySelector('.diff-cont'),
    deckCont = document.querySelector('.deck-cont')

//show ancients
const showAncients = () => {
    ancients.forEach((el,id)=>{
        let div = document.createElement("div");
        div.classList.add("ancient");
        div.classList.add(el.name);
        div.style.backgroundImage = `url(${el.cardFace})`
        ancientsCont.appendChild(div);
    })
}
showAncients();