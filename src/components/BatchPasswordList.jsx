import { useState } from 'react';

export default function BatchPasswordList({ passwords, onCopy }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (password, index) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      if (onCopy) onCopy();
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  if (!passwords || passwords.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        批量生成的密码 ({passwords.length} 个)
      </h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {passwords.map((password, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
              {index + 1}.
            </span>
            <code className="flex-1 font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
              {password}
            </code>
            <button
              onClick={() => handleCopy(password, index)}
              className="btn-secondary text-xs py-1 px-2 whitespace-nowrap"
              type="button"
            >
              {copiedIndex === index ? '已复制!' : '复制'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

