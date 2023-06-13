/**
 * 简单的加密
 */
export function compile(code: string) {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c;
}

/**
 * 简单的解密
 */
export function unCompile(code: string) {
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}
