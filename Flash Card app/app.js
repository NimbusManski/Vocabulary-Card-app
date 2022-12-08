// const filter = document.getElementById('filter');
const addWordBtn = document.getElementById('add-word-btn');
const searchBtn = document.getElementById('search-word-go');
const deleteBtn = document.getElementById('delete-btn');

let words = [];

const addWordHandler = () => {
  const word = document.getElementById('word-input').value;
  const definition = document.getElementById('definition-input').value;
  const inputs = document.querySelectorAll('input');
  if (word.trim() === '' || definition.trim() === '') {
    return;
  }

  vocabularyWord = {
    word: [word],
    definition: [definition],
    id: Math.random(),
  };

  words.push(vocabularyWord);
  console.log(vocabularyWord);

  renderVocabList(vocabularyWord.word, vocabularyWord.definition);

  inputs.forEach((input) => (input.value = ''));
};

const renderVocabList = (word, definition) => {
  const listRoot = document.getElementById('vocabulary-list');
  const newVocabWord = document.createElement('li');

  newVocabWord.innerHTML = `
<div id="list__item">
<h3>${word}</h3>
<p>${definition}</p>
<button id="delete-btn">X</button>
</div>`;
  listRoot.appendChild(newVocabWord);
};

const searchWordHandler = () => {
  const filterWord = document.getElementById('filter-word').value;
  const listItem = document.getElementById('list__item').value;
  if (filterWord.trim() === '') {
    alert('Item not found');
    return;
  };

  for (let i of words) {
    if (i !== words[words.word]) {
      listItem.classList.add('hide');
    } else {
      listItem.classList.remove('hide');
    }
  };
};

addWordBtn.addEventListener('click', addWordHandler);
searchBtn.addEventListener('click', searchWordHandler);
