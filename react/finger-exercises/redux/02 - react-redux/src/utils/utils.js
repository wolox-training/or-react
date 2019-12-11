export default function filterByName(books, value) {
  return books.filter(book => book.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
}
