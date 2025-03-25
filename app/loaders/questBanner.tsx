import { LoaderFunctionArgs } from '@remix-run/node';
import getFileFromFirebaseStorage from '~/utils/storage/getFileFromFirebaseStorage';

async function questBannerLoader({ request }: LoaderFunctionArgs) {
  try {
    const { signedUrl } = await getFileFromFirebaseStorage(
      'trashquest_banner.webp',
      'quest-assets'
    );

    return Response.json({
      success: true,
      questBanner: signedUrl,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export default questBannerLoader;
