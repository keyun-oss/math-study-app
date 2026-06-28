import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';

const ExportButton = ({ allItems, checkedItems }) => {
  const handleExport = () => {
    const uncheckedItems = allItems.filter((item) => !checkedItems[item.id]);
    if (uncheckedItems.length === 0) {
      alert('🎉 太棒啦！所有知识点都已掌握，无需导出！');
      return;
    }
    const headers = ['大分类', '子分类', '知识点名称', '年级', '状态'];
    const rows = uncheckedItems.map((item) => [item.category, item.subCategory, item.name, item.grade, '未掌握']);
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `数学课程表_未掌握知识点_${new Date().toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport}
      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 
                 bg-gradient-to-r from-primary to-primary-dark text-white text-xs sm:text-sm
                 rounded-2xl font-medium shadow-lg shadow-primary/30
                 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]
                 active:scale-[0.98] transition-all duration-200">
      <Download size={16} />
      <span className="hidden sm:inline">导出课程表</span>
      <span className="sm:hidden">导出</span>
      <FileSpreadsheet size={14} className="hidden sm:block opacity-70" />
    </button>
  );
};

export default ExportButton;
