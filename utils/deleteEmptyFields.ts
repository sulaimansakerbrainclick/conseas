function deleteEmptyFields(data: any) {
  const newData: any = { ...data };

  for (const key of Object.keys(newData)) {
    if (newData[key] === "" || newData[key] === null) {
      delete newData[key];
    }
  }

  return newData;
}

export default deleteEmptyFields;
