import JSEncrypt from 'jsencrypt/bin/jsencrypt'

/**
 * 公钥用于加密数据
 */
const PUBLIC_KEY =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKLqzcWmOzbfj64K8ZIgOdH\n' +
  'nzkXSOVOZbFu/TJhZ7rFAN+eaGkl3C4buccQd/EjEsj9ir7ijT7h96MCAwEAAQ=='

/**
 * 私钥用于解密数据
 */
const PRIVATE_KEY =
  'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAqhHyZfSsYourNxaY\n' +
  '7Nt+PrgrxkiA50efORdI5U5lsW79MmFnusUA355oaSXcLhu5xxB38SMSyP2KvuKN\n' +
  'PuH3owIDAQABAkAfoiLyL+Z4lf4Myxk6xUDgLaWGximj20CUf+5BKKnlrK+Ed8gA\n' +
  'kM0HqoTt2UZwA5E2MzS4EI2gjfQhz5X28uqxAiEA3wNFxfrCZlSZHb0gn2zDpWow\n' +
  'cSxQAgiCstxGUoOqlW8CIQDDOerGKH5OmCJ4Z21v+F25WaHYPxCFMvwxpcw99Ecv\n' +
  'DQIgIdhDTIqD2jfYjPTY8Jj3EDGPbH2HHuffvflECt3Ek60CIQCFRlCkHpi7hthh\n' +
  'YhovyloRYsM+IS9h/0BzlEAuO0ktMQIgSPT3aFAgJYwKpqRYKlLDVcflZFCKY7u3\n' +
  'UP8iWi1Qw0Y='

/**
 * 使用公钥加密文本
 * @param {string} text - 要加密的文本
 * @returns {string} 加密后的文本
 */
export const encrypt = (text: string): string => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY) // 设置公钥
  return encryptor.encrypt(text) // 对数据进行加密
}

/**
 * 使用私钥解密文本
 * @param {string} text - 要解密的文本
 * @returns {string} 解密后的文本
 */
export const decrypt = (text: string): string => {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(PRIVATE_KEY) // 设置私钥
  return encryptor.decrypt(text) // 对数据进行解密
}
