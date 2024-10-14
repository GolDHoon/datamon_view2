'use client';
import CryptoJS from "crypto-js";

function generateRandomIV(): CryptoJS.lib.WordArray {
    return CryptoJS.lib.WordArray.random(16);
}

function encryptData(data: string, key: string, iv: CryptoJS.lib.WordArray): string {
    const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), { iv: iv });
    return encrypted.toString();
}

function decryptData(encryptedData: string, key: string, iv: CryptoJS.lib.WordArray): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(key), { iv: iv });
    return CryptoJS.enc.Utf8.stringify(decrypted);
}

export function setSession(key: string, data: string): void {
    if (typeof window !== 'undefined') {  // 클라이언트 사이드에서만 실행
        const iv = generateRandomIV();
        const encryptedData = encryptData(data, `${process.env.NEXT_PUBLIC_CRYPTO_KEY}`, iv);
        sessionStorage.setItem(key, encryptedData);
        sessionStorage.setItem(`${key}_iv`, iv.toString());
    }
}

export function getSession(key: string): string | null {
    if (typeof window !== 'undefined') {  // 클라이언트 사이드에서만 실행
        const storedEncryptedData = sessionStorage.getItem(key);
        const storedIV = sessionStorage.getItem(`${key}_iv`);

        if (storedEncryptedData && storedIV) {
            const iv = CryptoJS.enc.Hex.parse(storedIV);
            return decryptData(storedEncryptedData, `${process.env.NEXT_PUBLIC_CRYPTO_KEY}`, iv);
        }
    }
    return null;
}