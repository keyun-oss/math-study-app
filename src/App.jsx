import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { buildKnowledgeTree, getAllKnowledgePoints } from './data/knowledgeData';
import { useLocalStorage } from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import ExportButton from './components/ExportButton';

function App() {
  const [checkedItems, setCheckedItems] = useLocalStorage('checkedKnowledgePoints', {});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useLocalStorage('expandedCategories', {});
  const [expandedSubCategories, setExpandedSubCategories] = useLocalStorage('expandedSubCategories', {});

  const knowledgeTree = useMemo(() => buildKnowledgeTree(), []);
  const allItems = useMemo(() => getAllKnowledgePoints(), []);

  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return knowledgeTree;
    const result = {};
    Object.entries(knowledgeTree).forEach(([category, subCategories]) => {
      const filteredSub = {};
      Object.entries(subCategories).forEach(([subCat, items]) => {
        const filteredItems = items.filter((item) =>
          item.name.includes(searchQuery) || subCat.includes(searchQuery) || category.includes(searchQuery)
        );
        if (filteredItems.length > 0) filteredSub[subCat] = filteredItems;
      });
      if (Object.keys(filteredSub).length > 0) result[category] = filteredSub;
    });
    return result;
  }, [knowledgeTree, searchQuery]);

  const totalCount = allItems.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  const toggleCheck = useCallback((id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, [setCheckedItems]);

  const selectTopic = useCallback((item) => {
    setSelectedTopic(item);
    if (window.innerWidth < 640) setSidebarOpen(false);
  }, []);

  const toggleCategory = useCallback((cat) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }, [setExpandedCategories]);

  const toggleSubCategory = useCallback((key) => {
    setExpandedSubCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  }, [setExpandedSubCategories]);

  useEffect(() => {
    const cats = Object.keys(knowledgeTree);
    if (Object.keys(expandedCategories).length === 0) {
      const defaults = {};
      cats.forEach((c) => { defaults[c] = true; });
      setExpandedCategories(defaults);
    }
  }, [knowledgeTree, expandedCategories, setExpandedCategories]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-primary-light/30 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-primary-light/20 rounded-2xl transition-colors"
            >
              {sidebarOpen ? <X size={20} className="text-primary-dark" /> : <Menu size={20} className="text-primary-dark" />}
            </button>
            <div className="flex items-center gap-2">
              <Sparkles size={22} className="text-primary" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                数学小探险 <span className="text-sm font-normal text-gray-400">五年级上册</span>
              </h1>
            </div>
          </div>
          <ExportButton allItems={allItems} checkedItems={checkedItems} />
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-0 sm:px-3 gap-0 sm:gap-4 py-3 sm:py-4 relative">
        <AnimatePresence>
          {!sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sidebar-overlay sm:hidden"
              onClick={() => setSidebarOpen(true)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              key="sidebar"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed sm:relative z-30 sm:z-0 left-0 top-14 sm:top-0 bottom-0 w-[300px] sm:w-[320px] 
                         bg-white rounded-none sm:rounded-3xl shadow-xl sm:shadow-md
                         flex flex-col overflow-hidden shrink-0 border-r sm:border border-primary-light/20"
            >
              <Sidebar
                tree={filteredTree}
                checkedItems={checkedItems}
                onToggleCheck={toggleCheck}
                onSelectTopic={selectTopic}
                selectedTopic={selectedTopic}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                expandedCategories={expandedCategories}
                onToggleCategory={toggleCategory}
                expandedSubCategories={expandedSubCategories}
                onToggleSubCategory={toggleSubCategory}
                checkedCount={checkedCount}
                totalCount={totalCount}
                progressPercent={progressPercent}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        <motion.main
          layout
          className="flex-1 min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-100px)]
                     bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl
                     shadow-sm border border-primary-light/20 overflow-hidden"
        >
          <ContentArea selectedTopic={selectedTopic} />
        </motion.main>
      </div>
    </div>
  );
}

export default App;