import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY || "sir-youtube-studio-aes-key-32-chars-long";

function getKey(): Buffer {
  return crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
}

export interface EncryptedData {
  encryptedText: string;
  iv: string;
  tag: string;
}

/**
 * Encrypts sensitive string and returns compact hex string "encryptedText:iv:tag"
 */
export function encryptToken(text: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag().toString("hex");

  return `${encrypted}:${iv.toString("hex")}:${tag}`;
}

/**
 * Decrypts either a compact hex string or an EncryptedData object
 */
export function decryptToken(encrypted: string | EncryptedData): string {
  let encryptedText: string;
  let iv: string;
  let tag: string;

  if (typeof encrypted === "string") {
    const parts = encrypted.split(":");
    if (parts.length === 3) {
      [encryptedText, iv, tag] = parts;
    } else {
      // Mock / fallback
      return encrypted;
    }
  } else {
    encryptedText = encrypted.encryptedText;
    iv = encrypted.iv;
    tag = encrypted.tag;
  }

  try {
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      getKey(),
      Buffer.from(iv, "hex")
    );

    decipher.setAuthTag(Buffer.from(tag, "hex"));

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (err) {
    return encryptedText;
  }
}
