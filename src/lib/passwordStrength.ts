export type StrengthChecks = {
  length: boolean
  hasLowercase: boolean
  hasUppercase: boolean
  hasNumbers: boolean
  hasSymbols: boolean
  hasNoRepeats: boolean
}

export type StrengthResult = {
  strength: 'none' | 'weak' | 'fair' | 'good' | 'strong'
  score: number
  label: string
  checks: StrengthChecks
}

export function calculatePasswordStrength(password: string): StrengthResult {
  if (!password || password.length === 0) {
    return { strength: 'none', score: 0, label: '无', checks: {
      length: false,
      hasLowercase: false,
      hasUppercase: false,
      hasNumbers: false,
      hasSymbols: false,
      hasNoRepeats: false,
    } }
  }

  let score = 0
  const checks: StrengthChecks = {
    length: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumbers: false,
    hasSymbols: false,
    hasNoRepeats: false,
  }

  if (password.length >= 8) {
    score += 1
    checks.length = true
  }
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  if (password.length >= 20) score += 1

  if (/[a-z]/.test(password)) {
    score += 1
    checks.hasLowercase = true
  }
  if (/[A-Z]/.test(password)) {
    score += 1
    checks.hasUppercase = true
  }
  if (/[0-9]/.test(password)) {
    score += 1
    checks.hasNumbers = true
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1
    checks.hasSymbols = true
  }

  const uniqueChars = new Set(password).size
  const diversityRatio = uniqueChars / password.length
  if (diversityRatio > 0.7) {
    score += 1
    checks.hasNoRepeats = true
  }

  let strength: StrengthResult['strength']
  let label: string
  if (score <= 2) {
    strength = 'weak'
    label = '弱'
  } else if (score <= 4) {
    strength = 'fair'
    label = '一般'
  } else if (score <= 6) {
    strength = 'good'
    label = '强'
  } else {
    strength = 'strong'
    label = '极强'
  }

  return {
    strength,
    score: Math.min(score, 8),
    label,
    checks,
  }
}
