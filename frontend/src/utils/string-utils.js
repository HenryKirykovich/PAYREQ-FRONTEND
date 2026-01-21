export function upCase(s) {
  try {
    return s.toUpperCase();
  } catch (err) {
    return s;
  }
};
