const phoneNumberRegex = /^(0|62)[0-9]{9,12}$/;

export const validationNumber = (phoneNumber: any) => {
  return phoneNumberRegex.test(phoneNumber);
};

export const isValidString = (string: string): boolean => {
  return !/\d/.test(string);
};

export const isValidationInt = (value: string): boolean => {
  // Menghapus spasi dan memastikan hanya angka yang tersisa
  const sanitizedValue = value.trim();
  return /^[0-9]+$/.test(sanitizedValue) && parseInt(sanitizedValue, 10) > 0;
};

export const isValidationIntWithZero = (value: string): boolean => {
  // Menghapus spasi dan memastikan hanya angka yang tersisa
  const sanitizedValue = value.trim();
  return /^[0-9]+$/.test(sanitizedValue);
};

export const isValidProductId = (productId: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(productId);
};
