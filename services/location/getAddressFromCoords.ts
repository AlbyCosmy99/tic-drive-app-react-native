import * as Location from 'expo-location';

const countryTranslations: Record<string, {it: string; en: string}> = {
  Italy: {it: 'Italia', en: 'Italy'},
  France: {it: 'Francia', en: 'France'},
  Germany: {it: 'Germania', en: 'Germany'},
  Spain: {it: 'Spagna', en: 'Spain'},
  'United States': {it: 'Stati Uniti', en: 'United States'},
  'United Kingdom': {it: 'Regno Unito', en: 'United Kingdom'},
};

const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
  languageCode: 'it' | 'en' = 'it',
): Promise<string> => {
  try {
    const [address] = await Location.reverseGeocodeAsync({latitude, longitude});

    if (address) {
      const translatedCountry =
        countryTranslations[address.country ?? '']?.[languageCode] ??
        address.country;

      return `${address.city}, ${address.postalCode}, ${translatedCountry}`;
    } else {
      return 'Indirizzo non trovato';
    }
  } catch (error) {
    console.error('Error getting address:', error);
    return "Errore durante il recupero dell'indirizzo";
  }
};

export default getAddressFromCoords;
