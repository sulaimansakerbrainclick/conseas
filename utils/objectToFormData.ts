function objectToFormData(obj: Object) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  return formData;
}

export default objectToFormData;
