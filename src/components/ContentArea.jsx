import React from 'react';
import { motion } from 'framer-motion';

const ContentArea = ({ selectedTopic }) => {
  // 如果没有选中任何知识点，显示欢迎界面
  if (!selectedTopic) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="text-6xl mb-6">🧮</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">欢迎来到数学小探险！</h2>
        <p className="text-gray-500 max-w-md">
          从左侧选择一个知识点开始学习吧～<br />
          每个知识点都配有生动的互动内容，<br />
          完成勾选后可以导出课程表哦！
        </p>
      </div>
    );
  }

  const topicName = selectedTopic.name || '未命名知识点';
  const topicId = selectedTopic.id || '';

  // 📚 在这里配置每个知识点的详细内容
  const contentMap = {
    // 小数的再认识 (kp-0) —— 已配置视频链接
    'kp-0': {
      description: `
        【小数的意义】
        小数是十进制分数的另一种表示形式。分母是10、100、1000……的分数，都可以用小数表示。
        例如：0.1 表示十分之一，0.01 表示百分之一，0.001 表示千分之一。
        小数的计数单位有：十分之一（0.1）、百分之一（0.01）、千分之一（0.001）……
        每相邻两个计数单位之间的进率是 10，即 10 个 0.01 是 0.1，10 个 0.1 是 1。

        【小数的大小比较】
        比较两个小数大小时：
        1. 先看整数部分，整数部分大的那个数就大；
        2. 如果整数部分相同，再看十分位，十分位大的那个数就大；
        3. 如果十分位也相同，再看百分位，依此类推。
      `,
      example: '比较 0.3 和 0.25 的大小。',
      steps: [
        '1. 整数部分：0 和 0 相同。',
        '2. 十分位：0.3 的十分位是 3，0.25 的十分位是 2，3 > 2，所以 0.3 > 0.25。'
      ],
      // ✅ 已添加你提供的B站视频链接
      videoUrl: 'https://www.bilibili.com/video/BV1DMyBBqEfd/?share_source=copy_web&vd_source=d688e5ec9995d43feff03506f03faa88'
    }
    // 如果你以后要添加其他知识点，在这里继续加（注意上一行末尾加英文逗号）
    // 例如：
    // 'kp-1': {
    //   description: '这里是另一个知识点的讲解',
    //   example: '示例内容',
    //   steps: ['步骤1', '步骤2'],
    //   videoUrl: 'https://www.bilibili.com/video/xxxxx'
    // }
  };

  // 获取当前知识点的内容，如果没有配置则显示默认内容
  const content = contentMap[topicId] || {
    description: '这是一个知识点，点击左侧的复选框可以标记为已学。',
    example: '暂无示例'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 h-full overflow-y-auto"
    >
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{topicName}</h2>
        <p className="text-sm text-gray-400 mb-4">编号 {topicId}</p>
        
        <div className="prose max-w-none">
          {/* 显示详细描述 */}
          <p className="text-gray-600 whitespace-pre-line">{content.description}</p>
          
          {/* 显示示例（如果有） */}
          {content.example && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm font-medium text-blue-700">📝 示例</p>
              <p className="text-gray-700">{content.example}</p>
            </div>
          )}
          
          {/* 显示解题步骤（如果有） */}
          {content.steps && content.steps.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm font-medium text-green-700">📐 解题步骤</p>
              <ul className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                {content.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 🎬 显示视频按钮（如果配置了视频链接） */}
          {content.videoUrl && (
            <div className="mt-4">
              <a 
                href={content.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-5 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                🎬 看动漫讲解视频
              </a>
              <p className="text-xs text-gray-400 mt-1">点击按钮将跳转到B站观看</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-xs text-gray-300">
          💡 提示：你可以在此处扩展每个知识点的详细内容
        </div>
      </div>
    </motion.div>
  );
};

export default ContentArea;