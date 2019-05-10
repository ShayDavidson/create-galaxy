export function isNotUndefined(val) {
  return val !== undefined;
}

export function immutableIndexUpdate(array, index, newValue) {
  return Object.assign([], array, {
    [index]: newValue,
  });
}

export function immutableIndexSwitch(array, index, withIndex) {
  return Object.assign([], array, {
    [index]: array[withIndex],
    [withIndex]: array[index],
  });
}
