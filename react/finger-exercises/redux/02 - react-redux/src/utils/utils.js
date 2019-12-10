export default function filterByName(arr, value) {
  return arr.filter(function (a) {
    return a.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  })
}