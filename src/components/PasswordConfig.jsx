export default function PasswordConfig({ config, onConfigChange }) {
  const handleChange = (key, value) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className="card space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          密码长度: {config.length}
        </label>
        <input
          type="range"
          min="8"
          max="128"
          value={config.length}
          onChange={(e) => handleChange('length', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>8</span>
          <span>128</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          包含字符类型:
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.includeUppercase}
              onChange={(e) => handleChange('includeUppercase', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              大写字母 (A-Z)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.includeLowercase}
              onChange={(e) => handleChange('includeLowercase', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              小写字母 (a-z)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.includeNumbers}
              onChange={(e) => handleChange('includeNumbers', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              数字 (0-9)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.includeSymbols}
              onChange={(e) => handleChange('includeSymbols', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              特殊字符 (!@#$%^&*等)
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          排除选项:
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.excludeSimilar}
              onChange={(e) => handleChange('excludeSimilar', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              排除相似字符 (0/O, 1/l/I)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.excludeAmbiguous}
              onChange={(e) => handleChange('excludeAmbiguous', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              排除歧义字符 ({ } [ ] ( ) / \ 等)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

