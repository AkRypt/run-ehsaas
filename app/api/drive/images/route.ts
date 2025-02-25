// import { drive } from '@/config';

import { drive } from '@/drive-server';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// const auth = new google.auth.GoogleAuth({
//   credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//   },
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
// });

// const drive = google.drive({ version: 'v3', auth });

export async function GET() {
  try {

    const response = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, webContentLink, thumbnailLink, createdTime)',
      orderBy: 'createdTime desc'
    });

    const files = response?.data?.files;

    if (!files || files.length === 0) {
      return NextResponse.json([]);
    }

    // Get download URLs for each file
    const images = await Promise.all(files.map(async (file) => {
      // Generate a direct download URL using the files.get method
      const downloadResponse = await drive.files.get({
        fileId: file.id!,
        alt: 'media',
        acknowledgeAbuse: true,
      }, {
        responseType: 'stream'
      });

      // Get the authorization header
      const authHeader = downloadResponse.config.headers?.Authorization;

      return {
        id: file.id,
        name: file.name,
        fullQualityUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
        fullQualityUrlWithKey: `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${process.env.GOOGLE_API_KEY}`,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
        fullThumbnailUrl: file.thumbnailLink,
        createdTime: file.createdTime
      }
    }));

    // Transform the response to include direct download URLs
    // const images = files?.map(file => ({
    //   id: file.id,
    //   name: file.name,
    //   fullQualityUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
    //   thumbnailUrl: file.thumbnailLink,
    //   createdTime: file.createdTime
    // }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}