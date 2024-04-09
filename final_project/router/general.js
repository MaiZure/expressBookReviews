const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
      if (!isValid(username)) {
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  let booksbyauthor = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
      if (books[isbn]["author"] === author) {
      booksbyauthor.push({"isbn":isbn,
                         "author":books[isbn]["author"],
                         "reviews":books[isbn]["reviews"]});
      }});
  res.send({booksbyauthor});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title
  let booksbytitle = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
      if (books[isbn]["title"] === title) {
      booksbytitle.push({"isbn":isbn,
                         "author":books[isbn]["author"],
                         "reviews":books[isbn]["reviews"]});
      }});
  res.send({booksbytitle});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

//Task 10
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(books));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

});
  
//Task 11 -- Async by ISBN
public_users.get('/books/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(books[isbn]));
      });

      get_books.then(() => console.log("Promise for Task 11 resolved"));

});

//Task 12 -- Async by Author
public_users.get('/books/author/:author',function (req, res) {
    const author = req.params.author
	let booksbyauthor = [];
	let isbns = Object.keys(books);
    const get_books = new Promise((resolve, reject) => {
        isbns.forEach((isbn) => {
        if (books[isbn]["author"] === author) {
           booksbyauthor.push({"isbn":isbn,
                         "author":books[isbn]["author"],
                         "reviews":books[isbn]["reviews"]});
        }});
		res.send({booksbyauthor});
      });
      get_books.then(() => console.log("Promise for Task 12 resolved"));
});


//Task 13 -- Async by Author
public_users.get('/books/title/:title',function (req, res) {

    const title = req.params.title
    let booksbytitle = [];
    let isbns = Object.keys(books);
    const get_books = new Promise((resolve, reject) => {
        isbns.forEach((isbn) => {
        if (books[isbn]["title"] === title) {
        booksbytitle.push({"isbn":isbn,
                         "author":books[isbn]["author"],
                         "reviews":books[isbn]["reviews"]});
      }});
      res.send({booksbytitle});
    });
    get_books.then(() => console.log("Promise for Task 13 resolved"));
});  


module.exports.general = public_users;
