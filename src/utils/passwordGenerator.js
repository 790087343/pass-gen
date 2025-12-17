/**
 * 使用加密安全的随机数生成器生成密码
 * @param {Object} options - 密码生成选项
 * @param {number} options.length - 密码长度
 * @param {boolean} options.includeUppercase - 包含大写字母
 * @param {boolean} options.includeLowercase - 包含小写字母
 * @param {boolean} options.includeNumbers - 包含数字
 * @param {boolean} options.includeSymbols - 包含特殊字符
 * @param {boolean} options.excludeSimilar - 排除相似字符
 * @param {boolean} options.excludeAmbiguous - 排除歧义字符
 * @returns {string} 生成的密码
 */
export function generatePassword(options) {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
    excludeSimilar = false,
    excludeAmbiguous = false,
  } = options;

  // 字符集定义
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // 相似字符和歧义字符
  const similarChars = '0O1lI';
  const ambiguousChars = '{}[]()/\\\'"`~,;:.<>';

  // 构建字符池
  let charset = '';

  if (includeUppercase) {
    charset += uppercase;
  }
  if (includeLowercase) {
    charset += lowercase;
  }
  if (includeNumbers) {
    charset += numbers;
  }
  if (includeSymbols) {
    charset += symbols;
  }

  // 排除相似字符
  if (excludeSimilar) {
    charset = charset.split('').filter(char => !similarChars.includes(char)).join('');
  }

  // 排除歧义字符
  if (excludeAmbiguous) {
    charset = charset.split('').filter(char => !ambiguousChars.includes(char)).join('');
  }

  // 确保至少选择了一种字符类型
  if (charset.length === 0) {
    throw new Error('至少需要选择一种字符类型');
  }

  // 使用 Web Crypto API 生成加密安全的随机数
  const randomValues = new Uint32Array(Math.max(length, 4));
  crypto.getRandomValues(randomValues);

  // 确保至少包含每种选中的字符类型中的一个字符
  const requiredChars = [];
  let randomIndex = 0;
  
  if (includeUppercase) {
    let chars = uppercase;
    if (excludeSimilar) chars = chars.split('').filter(c => !similarChars.includes(c)).join('');
    if (excludeAmbiguous) chars = chars.split('').filter(c => !ambiguousChars.includes(c)).join('');
    if (chars.length > 0) {
      const idx = randomValues[randomIndex % randomValues.length] % chars.length;
      requiredChars.push(chars[idx]);
      randomIndex++;
    }
  }
  if (includeLowercase) {
    let chars = lowercase;
    if (excludeSimilar) chars = chars.split('').filter(c => !similarChars.includes(c)).join('');
    if (excludeAmbiguous) chars = chars.split('').filter(c => !ambiguousChars.includes(c)).join('');
    if (chars.length > 0) {
      const idx = randomValues[randomIndex % randomValues.length] % chars.length;
      requiredChars.push(chars[idx]);
      randomIndex++;
    }
  }
  if (includeNumbers) {
    let chars = numbers;
    if (excludeSimilar) chars = chars.split('').filter(c => !similarChars.includes(c)).join('');
    if (excludeAmbiguous) chars = chars.split('').filter(c => !ambiguousChars.includes(c)).join('');
    if (chars.length > 0) {
      const idx = randomValues[randomIndex % randomValues.length] % chars.length;
      requiredChars.push(chars[idx]);
      randomIndex++;
    }
  }
  if (includeSymbols) {
    let chars = symbols;
    if (excludeSimilar) chars = chars.split('').filter(c => !similarChars.includes(c)).join('');
    if (excludeAmbiguous) chars = chars.split('').filter(c => !ambiguousChars.includes(c)).join('');
    if (chars.length > 0) {
      const idx = randomValues[randomIndex % randomValues.length] % chars.length;
      requiredChars.push(chars[idx]);
      randomIndex++;
    }
  }

  // 生成密码
  let password = '';
  for (let i = 0; i < length; i++) {
    if (i < requiredChars.length) {
      // 先填充必需的字符
      password += requiredChars[i];
    } else {
      // 从字符池中随机选择
      const randomIndex = randomValues[i] % charset.length;
      password += charset[randomIndex];
    }
  }

  // 打乱密码字符顺序（Fisher-Yates 洗牌算法）
  const passwordArray = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join('');
}

/**
 * 批量生成密码
 * @param {Object} options - 密码生成选项
 * @param {number} count - 生成数量
 * @returns {string[]} 生成的密码数组
 */
export function generatePasswords(options, count = 1) {
  const passwords = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generatePassword(options));
  }
  return passwords;
}

