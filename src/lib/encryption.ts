import CryptoJS from 'crypto-js';

export function encryptText(text: string, password: string): string {
  return CryptoJS.AES.encrypt(text, password).toString();
}

export function decryptText(encryptedText: string, password: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch {
    return null;
  }
}
