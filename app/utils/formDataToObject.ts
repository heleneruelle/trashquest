function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export default formDataToObject;
