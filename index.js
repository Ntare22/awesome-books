const bookStand = document.querySelector('#books');

function fillBookShelf() {
  bookStand.innerHTML = '';
  if (window.localStorage.getItem('data')) {
    const storage = window.localStorage.getItem('data');
    // eslint-disable-next-line no-use-before-define
    bookShelf.books = JSON.parse(storage);
  }
  // eslint-disable-next-line no-use-before-define
  bookShelf.books.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList = 'card';
    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('p');
    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      bookShelf.removeBook = book;
    });
    bookTitle.innerHTML = book.title;
    bookAuthor.innerHTML = book.author;
    removeBtn.innerHTML = 'Remove';

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(removeBtn);
    bookStand.appendChild(bookContainer);
  });
}

class BookShelf {
  constructor(books = []) {
    this.books = books;
  }

  set addBook(uniqueId) {
    const newBook = { title: document.querySelector('#title').value, author: `By: ${document.querySelector('#title').value}`, id: uniqueId };
    this.books.unshift(newBook);
    this.preserveData();
    fillBookShelf();
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  set removeBook(book) {
    this.books = this.books.filter((el) => el.id !== book.id);
    this.preserveData();
    fillBookShelf();
  }

  preserveData() {
    const data = JSON.stringify(this.books);
    window.localStorage.setItem('data', data);
  }
}

const bookShelf = new BookShelf();
document.querySelector('#add-book').addEventListener('submit', (event) => {
  event.preventDefault();
  const uniqueId = document.querySelector('#title').value + Math.floor(Math.random() * 1000);
  bookShelf.addBook = uniqueId;
});

fillBookShelf();