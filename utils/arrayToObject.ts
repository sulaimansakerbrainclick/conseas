function arrayToObject<T>(array: T[]) {
  const result: any = {};

  Object.entries(array).forEach(([key, value]) => {
    if (value) {
      result[key] = value;
    }
  });

  return result;
}

export default arrayToObject;
