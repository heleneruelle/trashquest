const addParamsToUrlSearch = (params, searchParams) => {
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.append(key, value);
    }
  }
  return searchParams;
};

export default addParamsToUrlSearch;
