/**
 * 密码生成选项接口
 */
export interface PasswordOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeSimilar: boolean;
    excludeAmbiguous: boolean;
}

/**
 * 使用加密安全的随机数生成器生成密码
 */
export function generatePassword(options: PasswordOptions): string {
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

    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

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
    const requiredChars: string[] = [];
    let randomIndex = 0;

    const getRequiredChar = (source: string) => {
        let chars = source;
        if (excludeSimilar) chars = chars.split('').filter(c => !similarChars.includes(c)).join('');
        if (excludeAmbiguous) chars = chars.split('').filter(c => !ambiguousChars.includes(c)).join('');
        if (chars.length > 0) {
            const idx = randomValues[randomIndex % randomValues.length] % chars.length;
            requiredChars.push(chars[idx]);
            randomIndex++;
        }
    };

    if (includeUppercase) getRequiredChar(uppercase);
    if (includeLowercase) getRequiredChar(lowercase);
    if (includeNumbers) getRequiredChar(numbers);
    if (includeSymbols) getRequiredChar(symbols);

    // 生成密码
    let password = '';
    for (let i = 0; i < length; i++) {
        if (i < requiredChars.length) {
            password += requiredChars[i];
        } else {
            const idx = randomValues[i % randomValues.length] % charset.length;
            password += charset[idx];
        }
    }

    // 打乱密码字符顺序 (Fisher-Yates)
    const passwordArray = password.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = randomValues[i % randomValues.length] % (i + 1);
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
}

/**
 * 批量生成密码
 */
export function generatePasswords(options: PasswordOptions, count: number = 1): string[] {
    const passwords: string[] = [];
    for (let i = 0; i < count; i++) {
        passwords.push(generatePassword(options));
    }
    return passwords;
}
