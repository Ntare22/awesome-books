let books = [{
  id: 1,
  title: 'Example book title',
  author: 'Jim Ntare & Abel Herrera',
}, ];

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}


function removeBook(item) {
  books = books.filter(book => book.id !== item.id);
  booksContainer.innerHTML = '';
  preserveBookShelf();
  populateBooks();
}

const booksContainer = document.getElementById('books');
const addBookForm = document.querySelector('#add-book');

function populateBooks() {
  if (window.localStorage.getItem('bookShelf')) {
    let storage = window.localStorage.getItem('bookShelf')
    books = JSON.parse(storage)
  }
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

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault()
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  if (title !== '' && author !== '') {
    const uniqueId = document.querySelector('#title').value + Math.floor(Math.random() * 1000)
    let newBook = new Book(document.querySelector('#title').value,document.querySelector('#author').value,uniqueId)
    books.push(newBook)
    booksContainer.innerHTML = '';
    preserveBookShelf();
    populateBooks();
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  } else {
    alert('Please enter title and/or author')
  }
})

let bookShelf = ''

function preserveBookShelf() {
  bookShelf = JSON.stringify(books)
  window.localStorage.setItem('bookShelf', bookShelf)
}