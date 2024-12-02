import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { getBookByVision } from '../book/service/BookService';
import { BooksResponse } from '../../types/Book';

export const pickImageCamera: () => Promise<BooksResponse> = async () => {
  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const book = await analyzeImage(result.assets[0].uri);
      return book;
    }
    throw new Error('Image picking was canceled or no assets found');
  } catch (error) {
    throw new Error('Failed to pick image from camera');
  }
};

export const analyzeImage = async (
  imageUri: string
): Promise<BooksResponse> => {
  try {
    const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const requestData = {
      requests: [
        {
          image: {
            content: base64ImageData,
          },
          features: [{ type: 'TEXT_DETECTION' }],
        },
      ],
    };

    const bookId = await getBookByVision(requestData);
    return bookId.data;
  } catch (error) {
    throw new Error('Failed to analyze image');
  }
};
