import {TicDriveImage} from '@/types/files/TicDriveImage';

const getUserMainImage = (images: TicDriveImage[]) => {
  return images.find(image => image.isMainImage);
};

export default getUserMainImage;
