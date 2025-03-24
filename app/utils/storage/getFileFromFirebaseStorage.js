import { bucket } from '../auth/firebaseAdminAuth';

async function getFileFromFirebaseStorage(fileName, folder = 'images') {
  const filePath = `${folder}/${fileName}`;

  const file = bucket.file(filePath);
  const [exists] = await file.exists();

  if (!exists) {
    throw new Error(
      `getFileFromFirebaseStorage: file with name ${fileName} does not exist`
    );
  }

  const [fileMetadata] = await file.getMetadata();
  const downloadUrl = fileMetadata.mediaLink;

  const [signedUrl] = await file.getSignedUrl({
    action: 'read',
    expires: '03-09-2491',
  });

  const [fileBuffer] = await file.download();

  return { downloadUrl, fileBuffer, signedUrl };
}

export default getFileFromFirebaseStorage;
