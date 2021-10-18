const books = [
  {
    id: 1,
    title: 'awesome books',
    author: 'Jim Ntare',
  },
  {
    id: 2,
    title: 'awesome books',
    author: 'Abel Herrera',
  },
];

function removeBook(item) {
  console.log(item);
}

const booksContainer = document.getElementById('books');
const addBookForm = document.querySelector('#add-book');
function populateBooks() {
  books.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList = 'card';
    
    const bookTitle = document.createElement('h3');
  const bookAuthor = document.createElement('p');
  const removeBtn = document.createElement('button');

  removeBtn.addEventListener('click', () => removeBook(book));
  
  bookTitle.innerHTML = book.title;
  bookAuthor.innerHTML = book.author;
  removeBtn.innerHTML = 'Remove';
  
  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(bookAuthor);
  bookContainer.appendChild(removeBtn);
  booksContainer.appendChild(bookContainer);
});
}
populateBooks();

addBookForm.addEventListener('submit',(event) => {
  event.preventDefault()
  const uniqueId = document.querySelector('#title').value + Math.floor(Math.random() * 1000)
  books.push({id: uniqueId,title: document.querySelector('#title').value, author: document.querySelector('#author').value})
  booksContainer.innerHTML = '';
  populateBooks();
})

