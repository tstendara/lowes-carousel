
const randomStringifiedNumberOfLength = (digits) => {
    let result = '';
        for (let i = 0; i < digits; i++) {
          result += Math.floor(Math.random() * 9).toString();
        }
    return result;
};

const removeCarouselDupes = (arr) => {
  return arr.filter((element, index, array) => {
    let prev = array[index - 1] || {id:0};
    return element.id === prev.id ? false : true;
  })
}

module.exports = { randomStringifiedNumberOfLength, removeCarouselDupes };