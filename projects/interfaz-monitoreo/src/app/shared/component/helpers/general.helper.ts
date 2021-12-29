export const isEmpty = (value: any) => {
  if (value === null) {
    return true;
  }

  if (typeof value === 'string' || typeof value.splice === 'function' || Array.isArray(value)) {
    return !value.length;
  }

  for (const k in value) {
    if (Object.prototype.hasOwnProperty.call(value, k)) {
      return false;
    }
  }

  return true;
};
