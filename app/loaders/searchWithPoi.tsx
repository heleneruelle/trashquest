import { LoaderFunctionArgs } from '@remix-run/node';
import searchLoader from './search';
import poiSearchLoader from './poiSearch';
import poisToVm from '~/utils/tovm/poisToVm';

async function searchWithPoi(loaderArgs: LoaderFunctionArgs) {
  const { request } = loaderArgs;
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    throw new Response('Missing query parameter', { status: 400 });
  }

  const rawSearchData = await searchLoader(loaderArgs);
  const searchData = await rawSearchData.json();

  const poi = url.searchParams.get('poi');
  let poiData = null;
  if (poi === 'true') {
    const rawPoiData = await poiSearchLoader(loaderArgs);
    poiData = await rawPoiData.json();
  }

  return { searchData, poiData: poiData ? poisToVm(poiData) : poiData };
}

export default searchWithPoi;
