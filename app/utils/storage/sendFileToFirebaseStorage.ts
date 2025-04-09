import { bucket } from '../auth/firebaseAdminAuth';
import { v4 as uuidv4 } from 'uuid'; // Pour générer un jeton unique

async function sendFileToFirebaseStorage(
  file: File | null | string,
  fileName: string,
  folder = 'images'
): Promise<{ success: boolean; downloadUrl?: string }> {
  try {
    if (!file || typeof file === 'string') {
      return { success: false };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const storagePath = `${folder}/${fileName}`;
    const fileRef = bucket.file(storagePath);

    const accessToken = uuidv4();

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        firebaseStorageDownloadTokens: accessToken,
      },
      public: true,
    });

    const [downloadUrl] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    return { success: true, downloadUrl };
  } catch (error) {
    return { success: false };
  }
}

export default sendFileToFirebaseStorage;
