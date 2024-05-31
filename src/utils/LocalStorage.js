/**
 * Function to get an item from local storage.
 *
 * @param {String} key - what item needs to be fetched
 * @returns {String | Array | Object}
 */
export const getItemFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(`${key}`));
};

/**
 * Function to set an item in local storage.
 *
 * @param {String} key - what item needs to be set
 * @param {String | Object} value - the value of the item being set
 * @returns {void}
 */
export const setItemInLocalStorage = (key, value) => {
  localStorage.setItem(`${key}`, JSON.stringify(value));
};
