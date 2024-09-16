function fixIdInArray(arr) {
  return arr.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });
}

module.exports = {
  fixIdInArray,
};
