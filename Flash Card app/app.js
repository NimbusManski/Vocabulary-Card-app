// const filter = document.getElementById('filter');
const addWordBtn = document.getElementById('add-word-btn');
const searchBtn = document.getElementById('search-word-go');
const vocabList = document.getElementById('vocabulary-list');
const searchInput = document.getElementById("filter-word");

let words = [];
let id = 0;
let searchTerm = '';

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

const revealAllListItems = () => {
  const nodeList = [...vocabList.children] // list of li elements in vocab ul

}

const inputHandler = (e) => {

  searchTerm = e.target.value;
  const nodeList = [...vocabList.children];
  nodeList.forEach(li => {
    let listDiv = li.children[0] // the div element inside the li element
    let vocabWord = listDiv.children[0].innerHTML // button is always third element (index 2) inside of div element. getting id from button element
    
    if(!vocabWord.includes(searchTerm)){
      console.log('doesnt match')
      li.classList.add('hide');
    }
    else{
      console.log('does match')
      li.classList.remove('hide');
    }
  })
}

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

const hideWords = (wordIds) => {
  const listRoot = document.getElementById('vocabulary-list');
  const newVocabWord = document.createElement('li');
  const nodeList = [...vocabList.children] // list of li elements in vocab ul
  
  nodeList.forEach((li, i) => {
    let listDiv = li.children[0] // the div element inside the li element
    let listDivBtnId = listDiv.children[2].id // button is always third element (index 2) inside of div element. getting id from button element
    // console.log(wordIds.includes(0))
    if(wordIds.includes(parseInt(listDivBtnId, 10))){
      console.log('here')
      li.classList.add('hide');
    }
  })
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

  let wordIds = []
  for (let i of words) {
    if (i.word !== filterWord) {
      // listItem.classList.add('hide');
      wordIds.push(i.id)
    } 
    // else {
    //   listItem.classList.remove('hide');
    // }
  };

  console.log(wordIds)
  hideWords(wordIds)
};

addWordBtn.addEventListener('click', addWordHandler);
searchBtn.addEventListener('click', searchWordHandler);
vocabList.addEventListener('click', deleteWordHandler);
searchInput.addEventListener('input', inputHandler)