import { LoaderFunctionArgs } from '@remix-run/node';
import addParamsToUrlSearch from '~/utils/url/addParamsToUrlSearch';

async function poiSearchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    throw new Response('Missing query parameter in poi search', {
      status: 400,
    });
  }

  const country = url.searchParams.get('country');
  const language = url.searchParams.get('language');
  const proximity = url.searchParams.get('proximity');

  const mapboxSearchUrl = process.env.MAPBOX_SEARCH_API_URL;
  const mapboxParams = new URLSearchParams({
    q: query,
    access_token: process.env.VITE_MAPBOX_ACCESS_TOKEN || '',
  });

  addParamsToUrlSearch(
    { country, language, proximity, types: 'poi' },
    mapboxParams
  );
  const poiResponse = await fetch(
    `${mapboxSearchUrl}?${mapboxParams.toString()}`
  );

  if (!poiResponse.ok) {
    throw new Response('Failed to fetch Mapbox poi search data', {
      status: poiResponse.status,
    });
  }

  const data = await poiResponse.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export default poiSearchLoader;
