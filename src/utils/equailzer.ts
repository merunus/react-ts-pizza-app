export const equals = (a: object[], b: object[]) =>
  a.length === b.length &&
  a.every((v, i) => {
    return JSON.stringify(v) === JSON.stringify(b[i]);
  });
