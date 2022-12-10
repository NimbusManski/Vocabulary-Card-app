// const filter = document.getElementById('filter');
const addWordBtn = document.getElementById('add-word-btn');
const searchBtn = document.getElementById('search-word-go');
const vocabList = document.getElementById('vocabulary-list');

let words = [];
let id = 0;

const renderVocabList = (operation, elementId) => {
  const listRoot = document.getElementById('vocabulary-list');
  const newVocabWord = document.createElement('li');
  const nodeList = [...vocabList.children] // list of li elements in vocab ul
  console.log(nodeList)

  if (operation === 'ADD') {
    let wordObj = words[words.length - 1];
    newVocabWord.innerHTML =
      `
      <div id="list__item">
        <h3>${wordObj.word}</h3>
        <p>${wordObj.definition}</p>
        <button class="delete-btn" id=${wordObj.id}>Delete</button>
      </div>
    `;
    listRoot.append(newVocabWord);
  }

  if (operation === 'DELETE') {
    console.log('id of element to delete: ', elementId)
    nodeList.forEach((li, i) => {
      let listDiv = li.children[0] // the div element inside the li element
      let listDivBtnId = listDiv.children[2].id // button is always third element (index 2) inside of div element. getting id from button element

      if(listDivBtnId == elementId){
        listRoot.removeChild(li)
      }
    })

    console.log(words)
  }
};

// updates the words array then calls render so that html reflects the state of the array
const addWordHandler = () => {
  const word = document.getElementById('word-input').value;
  // console.log(word)
  const definition = document.getElementById('definition-input').value;
  // console.log(definition)
  const inputs = document.querySelectorAll('input');
  if (word.trim() === '' || definition.trim() === '') {
    return;
  }

  vocabularyWord = {
    word,
    definition,
    id
  };

  words.push(vocabularyWord);
  // console.log(vocabularyWord);
  // console.log(words)
  renderVocabList('ADD');

  inputs.forEach((input) => (input.value = ''));
  id++
};

// updates the words array then calls render so that html reflects the state of the array
const deleteWordHandler = (e) => {
  let elementId = e.target.id;
  let wordsCpy = [...words];
  wordsCpy.forEach((wordObj, i) => {
    if(wordObj.id == elementId){
      wordsCpy.splice(i, 1)
    }
  })
  words = wordsCpy;
  renderVocabList('DELETE', elementId);
}

const searchWordHandler = (e) => {
  const filterWord = document.getElementById('filter-word').value;
  console.log(filterWord)
  // const listItem = document.getElementById('list__item').value;
  if (filterWord.trim() === '') {
    alert('Please Enter a Word');
    return;
  };

  const wordFound = words.filter(wordObj => {
    console.log(wordObj.word)
    console.log(filterWord)
    console.log(wordObj.word === filterWord)
    return wordObj.word === filterWord.trim();
  })

  console.log(wordFound)

  wordFound.length ? 
  alert(`Word: ${wordFound[0].word}\nDefinition: ${wordFound[0].definition}`)
  :
  alert(`${filterWord} was not found in your vocabulary list`)
  
  // for (let i of words) {
  //   if (i !== words[words.word]) {
  //     listItem.classList.add('hide');
  //   } else {
  //     listItem.classList.remove('hide');
  //   }
  // };
};

addWordBtn.addEventListener('click', addWordHandler);
searchBtn.addEventListener('click', searchWordHandler);
vocabList.addEventListener('click', deleteWordHandler);