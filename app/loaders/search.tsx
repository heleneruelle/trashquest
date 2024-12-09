import { LoaderFunctionArgs } from '@remix-run/node';
import addParamsToUrlSearch from '~/utils/url/addParamsToUrlSearch';

async function searchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    throw new Response('Missing query parameter', { status: 400 });
  }

  const country = url.searchParams.get('country');
  const language = url.searchParams.get('language');
  const proximity = url.searchParams.get('proximity');
  const types = url.searchParams.get('types');

  const mapboxUrl = process.env.MAPBOX_API_URL;
  const mapboxParams = new URLSearchParams({
    q: query,
    access_token: process.env.MAPBOX_ACCESS_TOKEN || '',
  });

  const additionalParams = { country, language, proximity, types };

  addParamsToUrlSearch(additionalParams, mapboxParams);

  const fullUrl = `${mapboxUrl}?${mapboxParams.toString()}`;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Response('Failed to fetch Mapbox search data', {
      status: response.status,
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export default searchLoader;
