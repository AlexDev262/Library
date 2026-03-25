const display = document.querySelector(".library");
const addBook = document.querySelector(".add-book");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const isRead = document.querySelector("#radio-read");
const newBook = document.querySelector(".new-book");
const modal = document.querySelector(".book-dialog");
const bookForm = document.querySelector(".book-form");
const checkbox = document.querySelector(".checkbox");


let library = [];

//Constructor
class Book {
    constructor(bookTitle, bookAuthor, bookPages, isRead) {
        this.bookTitle = bookTitle ? bookTitle : "N/A";
        this.bookAuthor = bookAuthor ? bookAuthor : "N/A";
        this.bookPages = bookPages ? bookPages : "0";
        this.isRead = isRead;
        this.id = crypto.randomUUID();
    } 
}

//Detect Window Resize
window.addEventListener('resize', () => {
    toggleButton();
}) 

//Toggle Create Book Button 
function toggleButton(){
    if(!isDisplayFilled()) {
        newBook.disabled = false;
    } else {
        newBook.disabled = true;
    }
    
}


//Delete a Book
display.addEventListener('click', (e) => {
    if(e.target.matches('button')) {
        for (let i=0; i<library.length; i++) {
            if(library[i].id === e.target.dataset.id) {
                library.splice(i, 1);
            }
        }
        displayBooks();
        if(library.length>1){
            toggleButton();
        }
    }
})

//Update read status 
display.addEventListener("change", (e) => {
    if (e.target.matches('.checkbox')) {
        for (let i=0; i<library.length; i++) {
            if (library[i].id === e.target.dataset.id) {
                library[i].updateStatus(e.target.checked); 
                const status = e.target.previousElementSibling;
                status.textContent = library[i].isRead ? "Yes" : "No";
                break;
            } 
        }
    }
})


//Detect Overflow
function isDisplayFilled() {
    const book = document.querySelector(".book-card");
    const bookHeight = book.offsetHeight;
    const bookWidth = book.offsetWidth;
    const cardsNumber = display.children.length;
    const libraryGap = window.innerHeight * 0.02;
    const libraryPadding = window.innerHeight * 0.05;

    let columns = Math.floor((display.clientWidth - libraryPadding + libraryGap) / (bookWidth + libraryGap));
    let rows = Math.floor((display.clientHeight - window.innerHeight * 0.06) / bookHeight); 
    let capacity = rows * columns;
    // console.log(`rows: ${rows} columns: ${columns} capacity: ${capacity}`);
    
    return cardsNumber >= capacity;
    
}

//Book prototype function
Book.prototype.updateStatus = function(newStatus){
    this.isRead = newStatus;
}

//Add book to library
function addBookToLibrary() {
    library.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead.checked));
}

//Display books
function displayBooks() {
    let displayHTML = "";
    for (let i=library.length-1; i>=0; i--) {
        displayHTML += `
        <div class="book-card">
            <div class="book-front">
                <h2>${library[i].bookTitle}</h2>
            </div>
            <div class="book-back">
                <p><b>Book Title: </b> ${library[i].bookTitle}</p>
                <p><b>Book Author: </b> ${library[i].bookAuthor}</p>
                <p><b>Book Pages: </b> ${library[i].bookPages}</p>
                <p class="isRead-p">Read: <span class="isRead-text">${library[i].isRead ? "Yes" : "No"}</span><input data-id="${library[i].id}" type="checkbox" class="checkbox" ${library[i].isRead ? "checked" : ""}><button class="toggle"><div class="toggle-knob"></div></button></p>
                <button class="delete" data-id="${library[i].id}">🗑️Delete</button> 
            </div>
        </div>`;
    }
    display.innerHTML = displayHTML;
}

//Open modal
newBook.addEventListener("click", () => {
    bookForm.reset();
    modal.showModal(); 
})

//Close modal
modal.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.close();
    }
})

//Add and display book to library
addBook.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    modal.close();
    displayBooks();
    toggleButton();
})