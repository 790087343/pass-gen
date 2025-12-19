export type PasswordConfig = {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
  excludeAmbiguous: boolean
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>/?'

const SIMILAR = 'O0Il1'
const AMBIGUOUS = '{}[]()/\\\'"`~,;:.<>'

export function generatePassword(config: PasswordConfig): string {
  let pool = ''

  if (config.includeUppercase) pool += UPPERCASE
  if (config.includeLowercase) pool += LOWERCASE
  if (config.includeNumbers) pool += NUMBERS
  if (config.includeSymbols) pool += SYMBOLS

  if (!pool) {
    throw new Error('至少选择一种字符类型')
  }

  if (config.excludeSimilar) {
    pool = pool
      .split('')
      .filter((ch) => !SIMILAR.includes(ch))
      .join('')
  }

  if (config.excludeAmbiguous) {
    pool = pool
      .split('')
      .filter((ch) => !AMBIGUOUS.includes(ch))
      .join('')
  }

  let result = ''
  for (let i = 0; i < config.length; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    result += pool[idx]
  }
  return result
}
