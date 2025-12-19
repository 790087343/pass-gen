/**
 * 评估密码强度
 * @param {string} password - 要评估的密码
 * @returns {Object} 包含强度和得分的对象
 */
export function calculatePasswordStrength(password) {
  if (!password || password.length === 0) {
    
    return { strength: 'none', score: 0, label: '无' };
  }

  let score = 0;
  const checks = {
    length: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumbers: false,
    hasSymbols: false,
    hasNoRepeats: false,
  };

  // 长度检查
  if (password.length >= 8) {
    score += 1;
    checks.length = true;
  }
  if (password.length >= 12) {
    score += 1;
  }
  if (password.length >= 16) {
    score += 1;
  }
  if (password.length >= 20) {
    score += 1;
  }

  // 字符类型检查
  if (/[a-z]/.test(password)) {
    score += 1;
    checks.hasLowercase = true;
  }
  if (/[A-Z]/.test(password)) {
    score += 1;
    checks.hasUppercase = true;
  }
  if (/[0-9]/.test(password)) {
    score += 1;
    checks.hasNumbers = true;
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
    checks.hasSymbols = true;
  }

  // 字符多样性检查
  const uniqueChars = new Set(password).size;
  const diversityRatio = uniqueChars / password.length;
  if (diversityRatio > 0.7) {
    score += 1;
    checks.hasNoRepeats = true;
  }

  // 确定强度等级
  let strength, label;
  if (score <= 2) {
    strength = 'weak';
    label = '弱';
  } else if (score <= 4) {
    strength = 'fair';
    label = '一般';
  } else if (score <= 6) {
    strength = 'good';
    label = '强';
  } else {
    strength = 'strong';
    label = '极强';
  }

  return {
    strength,
    score: Math.min(score, 8), // 最大分数为 8
    label,
    checks,
  };
}

/**
 * 获取强度对应的颜色
 * @param {string} strength - 强度等级
 * @returns {string} Tailwind CSS 颜色类
 */
export function getStrengthColor(strength) {
  const colors = {
    none: 'bg-gray-300 dark:bg-gray-600',
    weak: 'bg-red-500',
    fair: 'bg-orange-500',
    good: 'bg-yellow-500',
    strong: 'bg-green-500',
  };
  return colors[strength] || colors.none;
}

