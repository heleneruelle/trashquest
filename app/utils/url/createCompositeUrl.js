/**
 * Creates a composite URL with the specified i18n instance, path, and options for language and search parameters.
 *
 * @param {Object} i18n - The i18n instance (must have `language` property).
 * @param {string} path - The relative path for the URL (e.g., "/dashboard").
 * @param {Object} options - Optional parameters.
 * @param {string} [options.language] - The desired language for the URL (e.g., "en", "fr"). Overrides i18n.language if provided.
 * @param {Object} [options.searchParams] - An object representing query parameters (e.g., { id: 123, filter: "active" }).
 * @returns {string} - The full URL (e.g., "/en/dashboard?id=123&filter=active").
 */
function createCompositeUrl(i18n, path, options = {}) {
  const { language, searchParams = {} } = options;

  if (!i18n || !i18n.language) {
    throw new Error(
      "A valid i18n instance with a 'language' property is required."
    );
  }

  const resolvedLanguage = language || i18n.language;

  if (!resolvedLanguage) {
    throw new Error(
      'Unable to resolve the language from i18n or the options object.'
    );
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  const queryString = new URLSearchParams(searchParams).toString();

  return queryString
    ? `/${resolvedLanguage}${normalizedPath}?${queryString}`
    : `/${resolvedLanguage}${normalizedPath}`;
}

export default createCompositeUrl;
