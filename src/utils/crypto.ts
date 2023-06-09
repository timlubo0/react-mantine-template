import CryptoJS from 'crypto-js';
                                    
 export const encryptData = (data: any) =>
   CryptoJS.AES.encrypt(JSON.stringify(data), `${process.env.REACT_APP_KEY}`).toString();

 export const decryptData = (ciphertext: string) => {
   const bytes = CryptoJS.AES.decrypt(ciphertext, `${process.env.REACT_APP_KEY}`);
   try {
     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
   } catch (err) {
     return null;
   }
 };