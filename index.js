let books = [
  {
    id: 1,
    title: 'Example book title',
    author: 'Jim Ntare & Abel Herrera',
  },
];

const booksContainer = document.getElementById('books');
const addBookForm = document.querySelector('#add-book');

let bookShelf = '';
function preserveBookShelf() {
  bookShelf = JSON.stringify(books);
  window.localStorage.setItem('bookShelf', bookShelf);
}

function populateBooks() {
  if (window.localStorage.getItem('bookShelf')) {
    const storage = window.localStorage.getItem('bookShelf');
    books = JSON.parse(storage);
  }
  books.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList = 'card';

    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('p');
    const removeBtn = document.createElement('button');

    // eslint-disable-next-line no-use-before-define
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

function removeBook(item) {
  books = books.filter((book) => book.id !== item.id);
  booksContainer.innerHTML = '';
  preserveBookShelf();
  populateBooks();
}

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  if (title !== '' && author !== '') {
    const uniqueId = document.querySelector('#title').value + Math.floor(Math.random() * 1000);
    books.push({ id: uniqueId, title: document.querySelector('#title').value, author: document.querySelector('#author').value });
    booksContainer.innerHTML = '';
    preserveBookShelf();
    populateBooks();
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  } else {
    alert('Please enter title and/or author');
  }
});
