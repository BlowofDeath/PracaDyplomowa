const searchHelper = (array, search) => {
  search = search.toLowerCase();
  const arrayLowerCase = array.map((element) => String(element).toLowerCase());
  let isArrayContain = false;
  arrayLowerCase.forEach((element) => {
    if (element.includes(search)) isArrayContain = true;
  });

  return isArrayContain;
};

export default searchHelper;
