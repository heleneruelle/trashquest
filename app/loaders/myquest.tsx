import { LoaderFunctionArgs } from '@remix-run/node';

async function myQuestsLoader({ request }: LoaderFunctionArgs) {
  return null;
}

export default myQuestsLoader;
