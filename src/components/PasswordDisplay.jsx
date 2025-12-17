import { useState } from 'react';
import { calculatePasswordStrength, getStrengthColor } from '../utils/passwordStrength';

export default function PasswordDisplay({ password, onCopy }) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const strength = calculatePasswordStrength(password);
  const strengthColor = getStrengthColor(strength.strength);

  const handleCopy = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if (onCopy) onCopy();
      } catch (err) {
        console.error('复制失败:', err);
      }
    }
  };

  return (
    <div className="card">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            生成的密码
          </label>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            type="button"
          >
            {isVisible ? '隐藏' : '显示'}
          </button>
        </div>
        <div className="relative">
          <input
            type={isVisible ? 'text' : 'password'}
            value={password || ''}
            readOnly
            className="input-field pr-24 font-mono text-lg"
            placeholder="点击生成按钮创建密码"
          />
          <button
            onClick={handleCopy}
            disabled={!password}
            className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary text-sm py-1.5 px-3"
            type="button"
          >
            {copied ? '已复制!' : '复制'}
          </button>
        </div>
      </div>

      {password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">密码强度:</span>
            <span className="font-medium">{strength.label}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${strengthColor}`}
              style={{ width: `${(strength.score / 8) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

