import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Sparkles } from 'lucide-react';

const ProgressOverview = ({ checkedCount, totalCount, progressPercent }) => {
  const getLevel = () => {
    if (progressPercent === 100) return { label: '🏆 数学小大师', color: 'text-yellow-500' };
    if (progressPercent >= 75) return { label: '🌟 数学小达人', color: 'text-primary' };
    if (progressPercent >= 50) return { label: '💪 努力小勇士', color: 'text-blue-500' };
    if (progressPercent >= 25) return { label: '🌱 成长小树苗', color: 'text-green-500' };
    return { label: '🚀 出发小探险家', color: 'text-gray-500' };
  };
  const level = getLevel();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm border border-primary-light/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy size={20} className={level.color} />
          <span className={`text-sm font-bold ${level.color}`}>{level.label}</span>
        </div>
        <span className="text-2xl font-black text-primary">{progressPercent}%</span>
      </div>
      <div className="h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden relative">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-blue-400"
          initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }} />
        {progressPercent > 0 && progressPercent < 100 && (
          <motion.div className="absolute top-0 h-full w-2 bg-white/40 rounded-full"
            animate={{ left: [`${progressPercent - 5}%`, `${progressPercent + 5}%`], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400"><Target size={12} className="inline mr-1" />已掌握 {checkedCount}/{totalCount} 个知识点</span>
        {progressPercent === 100 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs font-bold text-yellow-500 flex items-center gap-1">
            <Sparkles size={14} /> 全部完成！
          </motion.span>
        )}
      </div>
    </div>
  );
};

export default ProgressOverview;
