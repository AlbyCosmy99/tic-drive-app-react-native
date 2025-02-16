const isPlateNumber = (plate: string, country: string = 'IT'): boolean => {
    const platePatterns: { [key: string]: RegExp } = {
      IT: /^[A-Z]{2}\d{3}[A-Z]{2}$/,  // Italian plates: AB123CD
      FR: /^[A-Z]{2}-\d{3}-[A-Z]{2}$/, // French plates: AB-123-CD
      DE: /^[A-Z]{1,3}-[A-Z]{1,2}-\d{1,4}$/, // German plates: B-AB-1234
      US: /^[A-Z0-9]{1,7}$/, // Generic US plates (varies by state)
      UK: /^[A-Z]{2}\d{2} [A-Z]{3}$/, // UK plates: AB12 XYZ
    };
  
    const regex = platePatterns[country.toUpperCase()];
    return regex ? regex.test(plate) : false;
  };

   export default isPlateNumber