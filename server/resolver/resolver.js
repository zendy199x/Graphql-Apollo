const { books, authors } = require("../data/static");

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) =>
      books.find((book) => book.id.toString() === args.id),
    // {
    //   id: 1,
    //   name: "Titanic",
    //   genre: "Romantic",
    //   authorId: 1,
    // }
    authors: () => authors,
    author: (parent, args) =>
      authors.find((author) => author.id.toString() === args.id),
  },
  Book: {
    author: (parent, args) => {
      // console.log(parent);
      return authors.find(author => author.id === parent.authorId)
    },
  },
  Author: {
    books: (parent, args) => {
      // console.log(parent)
      // { 
      //   id: 2,
      //   name: 'Zendy',
      //   age: '28'
      // }
      return books.filter(book => book.authorId ===  parent.id)
    }
  }
};

module.exports = resolvers;
