const addParamsToUrlSearch = (params, searchParams) => {
  for (const [key, value] of Object.entries(params)) {
    if (searchParams.get(key)) {
      searchParams.delete(key);
    }
    if (value) {
      searchParams.append(key, value);
    }
  }
  return searchParams;
};

export default addParamsToUrlSearch;
