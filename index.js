const bookStand = document.querySelector('#books')
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class BookShelf {
  constructor(books = []) {
    this.books = books
  }
  set addBook(uniqueId) {
    const newBook = new Book(document.querySelector('#title').value, document.querySelector('#title').value, uniqueId)
    this.books.unshift(newBook)
    this.preserveData()
    fillBookShelf()
  };
  set removeBook(book) {
    this.books = this.books.filter((el) => el.id !== book.id)
    this.preserveData()
    fillBookShelf()
  }
  preserveData() {
    let data = JSON.stringify(this.books)
    window.localStorage.setItem('data', data)
  }
}

let bookShelf = new BookShelf()
document.querySelector('#add-book').addEventListener('submit', (event) => {
  event.preventDefault()
  const uniqueId = document.querySelector('#title').value + Math.floor(Math.random() * 1000)
  bookShelf.addBook = uniqueId
})

function fillBookShelf() {
  bookStand.innerHTML = '';
  if (window.localStorage.getItem('data')) {
    const storage = window.localStorage.getItem('data');
    bookShelf.books = JSON.parse(storage);
  }
  bookShelf.books.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList = 'card';
    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('p');
    const removeBtn = document.createElement('button');
    // eslint-disable-next-line no-use-before-define
    removeBtn.addEventListener('click', () => bookShelf.removeBook = book);
    bookTitle.innerHTML = book.title;
    bookAuthor.innerHTML = book.author;
    removeBtn.innerHTML = 'Remove';

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(removeBtn);
    bookStand.appendChild(bookContainer);
  });
}

fillBookShelf();