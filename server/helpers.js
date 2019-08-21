const randomStringifiedNumberOfLength = digits => {
  let result = "";
  for (let i = 0; i < digits; i++) {
    result += Math.floor(Math.random() * 9).toString();
  }
  return result;
};

const concatOnlyUnique = (arr1, arr2, cb) => {
  // console.log(arr1, "1", "2", arr2);
   return arr1.concat(arr2.filter(element => {
    for (let i = 0; i < arr1.length; i++) {
      // console.log(element.id, arr1[i].id);
      if (element.id === arr1[i].id) {
        // console.log(arr1);
        console.log(element.id, arr1[i]);
        return false;
      }
    }
   return true;
  }));
};

module.exports = { randomStringifiedNumberOfLength, concatOnlyUnique };
