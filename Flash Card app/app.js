// const filter = document.getElementById('filter');
const addWordBtn = document.getElementById('add-word-btn');
const searchBtn = document.getElementById('search-word-go');
const vocabList = document.getElementById('vocabulary-list');
const searchInput = document.getElementById("filter-word");

let words = [];
// replaced the random id with a predictable id starting at 0.
// 1. eaiser to work with b/c it's a whole number that is incrementing in a sequential and predictable way
// 2. Math.Random() has the posibility of generating the same id twice
// NOTE: if you want to generate whole numbers with Math.Random() you'll need to use Math.floor() or Math.Ceil() 
// you would also need to provide a range b/c by default Math.random() picks a random number between 0-1. with floor and ceil
// in use, the number would then always be either 0 or 1. I'll put an example at the bottom of the file of working with Math.Random()
// |
// if you don't want duplicate numbers (not only when working with the Math class but also in general) use a set (let mySet = new Set())
let id = 0;
let searchTerm = '';

const renderVocabList = (operation, elementId) => {
  const listRoot = document.getElementById('vocabulary-list');
  const newVocabWord = document.createElement('li');
  const nodeList = [...vocabList.children] // list of li elements in vocab ul

  // added extra ADD and DELETE parameter b/c in the case of deleting an element we need to use the 
  // id of the word contained in the word object (elementId) to compare to the id of the delete button (which matches the id of the word obj)
  // that was clicked and that belongs to the li that we want to remove to know when to delete that html
  // |
  // to summarize, if delete button has an id of 1, when we click it, deleteWordHandler gets called.
  // this function removes wordObj with id 1 from the words list.
  // renderVocabList is then called.
  // we tell renderVocabList that we want to delete an html element that has the id of 1 in this case.
  // we loop through the list elements and look for one that has a div that has a button that has an id of 1.
  // when we find a match, we then delete that list element 

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
  }
};

// function gets called anytime a change occurs in the input - backspace, space, letter key, etc.
// function then loops over all vocab words and compares to the search term
// |
// the includes method checks for the existence of a matching sub-string between the string you're calling the method on 
// and the string argument that you're passing in - this means that if the target string has any consecutive, in order, arrangement
// of letters as the provided string argument, it will return true which meets the criteria that you wanted for the search feature
const inputHandler = (e) => {

  searchTerm = e.target.value;

  // using the spread operator (...) into an array to create nodeList so that the forEach iterator method can be used.
  // |
  // without doing this I believe that looping in this way is not possible because ".children" doesn't return
  // an actual js array even though it looks like it is an array. Should verify this online
  const nodeList = [...vocabList.children];

  // here we're just looping over the list elements and comparing the inner html of the h3 element to the searchTerm
  nodeList.forEach(li => {

    let listDiv = li.children[0] // the div element inside the li element
    let vocabWord = listDiv.children[0].innerHTML // listDiv.children[0] evaluates to the h3 element which contains the term in its innerHTML
    
    // not matching so needs to be hidden
    if(!vocabWord.includes(searchTerm)){
      console.log('doesnt match')
      li.classList.add('hide');
    }
    // is matching so needs to be revealed
    else{
      console.log('does match')
      li.classList.remove('hide');
    }

    // NOTE: every list element will either have the hide class added or removed.
    // if it already doesn't have the hide class then removing doesn't cause any errors so no check needed and vice versa 
  })
}

// updates the words array then calls render so that html reflects the state of the array
const addWordHandler = () => {
  const word = document.getElementById('word-input').value;
  const definition = document.getElementById('definition-input').value;
  const inputs = document.querySelectorAll('input');
  if (word.trim() === '' || definition.trim() === '') {
    return;
  };

  vocabularyWord = {
    word,
    definition,
    id
  };

  words.push(vocabularyWord);
  renderVocabList('ADD');
  inputs.forEach((input) => (input.value = ''));
  id++;
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

// NOTE: searchWordHandler is no longer needed since the dynamic search was implemented 
// will leave it commented however in case you want to mess with it 


// const searchWordHandler = (e) => {
//   const filterWord = document.getElementById('filter-word').value;

//   if (filterWord.trim() === '') {
//     alert('Please Enter a Word');
//     return;
//   };

//   const wordFound = words.filter(wordObj => {
//     return wordObj.word === filterWord.trim();
//   })

//   console.log(wordFound)

//   let wordIds = []
//   for (let i of words) {
//     if (i.word !== filterWord) {
//       // listItem.classList.add('hide');
//       wordIds.push(i.id)
//     } 
//     // else {
//     //   listItem.classList.remove('hide');
//     // }
//   };

//   console.log(wordIds)
//   hideWords(wordIds)
// };

// Math.random() generates a number from 0 - 1
// by multiplying by 10 the largest number you can get is 10 (if Math.random() generates a 1)
// the smallest possibility is 0 (if Math.random() generates a 0)
// it can produce anything in between - say for example if Math.random() generated 0.5 then 
// you'd get 5 as the output
// |
// Math.floor() ensures that you get a whole number b/c Math.random() could generate 0.123 which when multiplied
// by 10 would yeild some number with a fractional part (1.23). Math.floor() would take that number and round down to
// give you 1
let randomNum = Math.floor(Math.random() * 10);
console.log(randomNum)

addWordBtn.addEventListener('click', addWordHandler);
searchBtn.addEventListener('click', searchWordHandler);
vocabList.addEventListener('click', deleteWordHandler);
searchInput.addEventListener('input', inputHandler)