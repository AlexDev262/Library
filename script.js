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
let isReadText = document.querySelector(".isRead-text");


let library = [];

//Update Read Status
function updateRead(e) {
    Book.prototype.isRead = e.checked;
    console.log(e.checked);
   
    // displayBooks();


}

//change read status 
checkbox.addEventListener("change", (e) => {
    updateRead(e.target); 
    
    isReadText.textContent = e.target.checked ? "Yes" : "No";
    
})

//constructor
function Book(bookTitle, bookAuthor, bookPages, isRead) {
    this.bookTitle = bookTitle ? bookTitle : "N/A";
    this.bookAuthor = bookAuthor ? bookAuthor : "N/A";
    this.bookPages = bookPages ? bookPages : "0";
    this.isRead = isRead;
    this.Id = crypto.randomUUID();
}

//add book to library
function addBookToLibrary() {
    library.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead.checked));
}

//display books
function displayBooks() {
    let displayHTML = "";
    for (let i=library.length-1; i>=0; i--) {
        displayHTML += `
        <div class="book">
            <div class="book-front">
                <h2>${library[i].bookTitle}</h2>
            </div>
            <div class="book-back">
                <p>Book Title: ${library[i].bookTitle}</p>
                <p>Book Author: ${library[i].bookAuthor}</p>
                <p>Book Pages: ${library[i].bookPages}</p>
                <p>Read: <span class="isRead-text">${library[i].isRead ? "Yes" : "No"}</span><input type="checkbox" class="checkbox" ${library[i].isRead ? "checked" : ""}><button class="toggle"><div class="toggle-knob"></div></button></p>
                <button class="delete">🗑️Delete</button> 
            </div>
        </div>`;
    }
    isReadText = document.querySelector(".isRead-text");
    display.innerHTML = displayHTML;
}

//open modal
newBook.addEventListener("click", () => {
    bookForm.reset();
    modal.showModal();
   
})

//close modal
modal.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.close();
    }
})

//add and display book to library
addBook.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    modal.close();
    displayBooks();
})