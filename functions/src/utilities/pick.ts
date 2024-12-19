/**
 * Creates an object composed of the picked object properties.
 * @param {T} object - The source object.
 * @param {Array<keyof T>} keys - The property names to pick.
 * @returns {Partial<T>} The new object with picked properties.
 */
export function pick<T extends object>(
  object: T,
  keys: (keyof T)[]
): Partial<T> {
  return keys.reduce((obj, key) => {
    if (key in object) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);
}
