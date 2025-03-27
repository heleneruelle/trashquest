const mergeArrays = (...arrays) => arrays.flatMap((arr) => arr ?? []);

export default mergeArrays;
