
const randomStringifiedNumberOfLength = (digits) => {
    let result = '';
        for (let i = 0; i < digits; i++) {
          result += Math.floor(Math.random() * 9).toString();
        }
    return result;
};

module.exports = { randomStringifiedNumberOfLength };