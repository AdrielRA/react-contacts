import CryptoJS from "crypto-js";

export const encryptData = (data: unknown, salt: string) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();

export const decryptData = (cipherText: string, salt: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, salt);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};
