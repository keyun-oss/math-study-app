import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

const categoryIcons = {
  '数与代数': '🔢',
  '图形与几何': '📐',
  '统计与概率': '📊',
  '综合与实践': '🧩',
};

const Sidebar = ({
  tree, checkedItems, onToggleCheck, onSelectTopic, selectedTopic,
  searchQuery, onSearchChange, expandedCategories, onToggleCategory,
  expandedSubCategories, onToggleSubCategory, checkedCount, totalCount, progressPercent,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 sm:p-4 border-b border-primary-light/20 bg-gradient-to-r from-green-50/50 to-blue-50/50">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          <input type="text" placeholder="搜索知识点..." value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border-2 border-primary-light/40
                       focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none
                       transition-all placeholder:text-gray-300" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
              initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }} />
          </div>
          <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{checkedCount}/{totalCount}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
        {Object.keys(tree).length === 0 && searchQuery && (
          <div className="text-center py-8 text-gray-400">
            <Search size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">未找到匹配的知识点</p>
          </div>
        )}
        {Object.entries(tree).map(([category, subCategories]) => (
          <div key={category} className="mb-1">
            <button onClick={() => onToggleCategory(category)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-2xl text-sm font-semibold
                         transition-all duration-200 group
                         ${expandedCategories[category] ? 'bg-primary/10 text-primary-dark' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-base">{categoryIcons[category] || '📁'}</span>
              <span className="flex-1 text-left">{category}</span>
              <motion.div animate={{ rotate: expandedCategories[category] ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedCategories[category] && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  className="overflow-hidden ml-2 pl-3 border-l-2 border-primary-light/30">
                  {Object.entries(subCategories).map(([subCat, items]) => {
                    const subKey = `${category}|${subCat}`;
                    const checkedInSub = items.filter((i) => checkedItems[i.id]).length;
                    return (
                      <div key={subKey} className="my-1">
                        <button onClick={() => onToggleSubCategory(subKey)}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-xl text-xs transition-all
                            ${expandedSubCategories[subKey] ? 'text-primary-dark font-medium' : 'text-gray-500 hover:text-gray-700'}`}>
                          {expandedSubCategories[subKey] ? <ChevronDown size={14} className="shrink-0" /> : <ChevronRight size={14} className="shrink-0" />}
                          <span className="flex-1 text-left">{subCat}</span>
                          <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{checkedInSub}/{items.length}</span>
                        </button>
                        <AnimatePresence>
                          {expandedSubCategories[subKey] && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-3">
                              {items.map((item, idx) => (
                                <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.03 }}
                                  className={`flex items-center gap-2 px-2 py-1.5 rounded-xl cursor-pointer transition-all duration-150 group
                                    ${selectedTopic?.id === item.id ? 'bg-primary/10 shadow-sm' : 'hover:bg-gray-50'}`}
                                  onClick={() => onSelectTopic(item)}>
                                  <button onClick={(e) => { e.stopPropagation(); onToggleCheck(item.id); }}
                                    className={`shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                                      ${checkedItems[item.id] ? 'bg-primary border-primary scale-110' : 'border-gray-300 hover:border-primary'}`}>
                                    {checkedItems[item.id] && (
                                      <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white">
                                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    )}
                                  </button>
                                  <span className={`flex-1 text-xs truncate ${selectedTopic?.id === item.id ? 'text-primary-dark font-medium' : 'text-gray-600'}
                                    ${checkedItems[item.id] ? 'line-through opacity-60' : ''}`}>{item.name}</span>
                                  <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full shrink-0">{item.grade}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-primary-light/20 text-center">
        <p className="text-[10px] text-gray-400">📚 学海无涯，快乐成长 ✨</p>
      </div>
    </div>
  );
};

export default Sidebar;
