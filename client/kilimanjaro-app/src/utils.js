
/** 
 * Mutation functions for immutable arrays
 */

export function addArrayElement(array, element) {
  return array.concat(element);
}

export function updateArrayElement(array, index, element) {
  return [ ...array.slice(0, index), element, ...array.slice(index + 1) ];
}

export function removeArrayElement(array, index) {
  return [ ...array.slice(0, index), ...array.slice(index + 1) ];
}

export function mapArrayToObject(array, key) {
  return array.map(x => ({ [x[key]]: x })).reduce(
    (obj, x) => Object.assign(obj, x), {}
  ); 
}


/**
 * UUID generation function
 */
export function generateUUIDv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
    c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
