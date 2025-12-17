import { useState, useEffect } from 'react';
import { generatePassword, generatePasswords } from './utils/passwordGenerator';
import PasswordDisplay from './components/PasswordDisplay';
import PasswordConfig from './components/PasswordConfig';
import BatchPasswordList from './components/BatchPasswordList';
import ThemeToggle from './components/ThemeToggle';

const defaultConfig = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeSimilar: false,
  excludeAmbiguous: false,
};

function App() {
  const [config, setConfig] = useState(() => {
    // 从 localStorage 加载配置
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('passwordConfig');
        return saved ? JSON.parse(saved) : defaultConfig;
      }
    } catch (error) {
      console.error('加载配置失败:', error);
    }
    return defaultConfig;
  });

  const [password, setPassword] = useState('');
  const [batchPasswords, setBatchPasswords] = useState([]);
  const [batchCount, setBatchCount] = useState(5);
  const [showBatch, setShowBatch] = useState(false);

  // 保存配置到 localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('passwordConfig', JSON.stringify(config));
      }
    } catch (error) {
      console.error('保存配置失败:', error);
    }
  }, [config]);

  const handleGenerate = () => {
    try {
      const newPassword = generatePassword(config);
      setPassword(newPassword);
      setShowBatch(false);
    } catch (error) {
      alert(error.message || '生成密码失败，请检查配置');
    }
  };

  const handleBatchGenerate = () => {
    try {
      const passwords = generatePasswords(config, batchCount);
      setBatchPasswords(passwords);
      setShowBatch(true);
      setPassword(''); // 清空单个密码
    } catch (error) {
      alert(error.message || '生成密码失败，请检查配置');
    }
  };

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
  };

  // 验证配置是否有效
  const isConfigValid = () => {
    return (
      config.includeUppercase ||
      config.includeLowercase ||
      config.includeNumbers ||
      config.includeSymbols
    );
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <header className="mb-4 sm:mb-8" role="banner">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                密码生成器
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                安全、易用的在线密码生成工具 - 免费生成强密码，保护您的账户安全
              </p>
            </div>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main role="main">
          {/* 安全提示 */}
          <section className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg" aria-label="安全提示">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>🔒 安全提示：</strong>
              所有密码均在您的浏览器本地生成，不会上传到任何服务器。建议使用密码管理器保存生成的密码。
            </p>
          </section>

          {/* 密码配置 */}
          <section className="mb-6" aria-label="密码配置">
            <PasswordConfig config={config} onConfigChange={handleConfigChange} />
          </section>

          {/* 生成按钮 */}
          <section className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3" aria-label="生成操作">
            <button
              onClick={handleGenerate}
              disabled={!isConfigValid()}
              className="btn-primary w-full sm:flex-1 sm:min-w-[120px] touch-manipulation min-h-[44px] text-base"
              type="button"
              aria-label="生成单个密码"
            >
              生成密码
            </button>
            <div className="flex gap-2 w-full sm:flex-1 sm:min-w-[200px]">
              <label htmlFor="batch-count" className="sr-only">批量生成数量</label>
              <input
                id="batch-count"
                type="number"
                min="1"
                max="50"
                value={batchCount}
                onChange={(e) => setBatchCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                className="input-field w-20 sm:w-24 text-center touch-manipulation min-h-[44px]"
                aria-label="批量生成密码数量"
              />
              <button
                onClick={handleBatchGenerate}
                disabled={!isConfigValid()}
                className="btn-secondary flex-1 touch-manipulation min-h-[44px] text-base"
                type="button"
                aria-label="批量生成密码"
              >
                批量生成
              </button>
            </div>
          </section>

          {/* 密码显示 */}
          {!showBatch && (
            <section className="mb-6" aria-label="生成的密码">
              <PasswordDisplay password={password} />
            </section>
          )}

          {/* 批量密码列表 */}
          {showBatch && (
            <section className="mb-6" aria-label="批量生成的密码列表">
              <BatchPasswordList passwords={batchPasswords} />
            </section>
          )}

          {/* 使用建议 */}
          <article className="card bg-gray-50 dark:bg-gray-900/50" aria-label="使用建议">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              💡 使用建议
            </h2>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 密码长度建议至少 12 位，重要账户建议 16 位以上</li>
              <li>• 包含多种字符类型（大小写字母、数字、特殊字符）可提高安全性</li>
              <li>• 不要重复使用相同的密码</li>
              <li>• 定期更换密码，特别是重要账户</li>
              <li>• 使用密码管理器（如 1Password、LastPass）来安全存储密码</li>
            </ul>
          </article>
        </main>

        {/* 页脚 */}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400" role="contentinfo">
          <p>密码生成器 v1.0 | 所有操作均在本地完成，保护您的隐私</p>
          <p className="mt-2">
            <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">首页</a>
            <span className="mx-2">|</span>
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400">关于</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

