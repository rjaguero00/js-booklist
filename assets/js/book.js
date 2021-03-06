//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() { }

//Add book to list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
    //Append row to booklist
    list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function (message, className) {
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);
    //Timeout after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}



//Event Listeners for add book
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        //Get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value

        //Instantiate book
        const book = new Book(title, author, isbn);

        //Instantiate UI
        const ui = new UI();

        //Validate
        if (title === '' || author === '' || isbn === '') {
            //Error Alert
            ui.showAlert('Please fill in all fields', 'error');
        } else {
            //Add book to list
            ui.addBookToList(book);

            //Add to Local Storage
            addBook(book);

            //Success
            ui.showAlert('Book Added!', 'success');

            //Clear Fields
            ui.clearFields();

        }

        e.preventDefault();
    });

//DOM load event
document.addEventListener('DOMContentLoaded', displayBooks());

//Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function (e) {
    //Instantiate UI
    const ui = new UI();
    //Delete book
    ui.deleteBook(e.target);

    //Remove from Local storage
    removeBooks(e.target.parentElement.previousElementSibling.textContent);

    //Show message
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});

//Get books to local storage
function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

//Add book to local Storage
function addBook(book) {
    const books = getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

//Display books from local storage
function displayBooks() {
    const books = getBooks();

    books.forEach(function (book) {
        const ui = new UI;

        //Add book to UI
        ui.addBookToList(book);
    })
}

//Remove book from local storage
function removeBooks(isbn) {
    const books = getBooks();


    books.forEach(function (book, index) {
        if (book.isbn === isbn) {
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
}

//Responsive navbar
function openDrawerMenu() {
    var x = document.getElementById("mainNavBar");
    if (x.className === "navBar") {
        x.className += " responsive";
    } else {
        x.className = "navBar";
    }
}

