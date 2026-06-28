const CSV_DATA = `大分类,子分类,知识点名称,年级
数与代数,数的认识,小数的再认识（意义、大小比较）,5上
数与代数,加减法,小数的加减运算,5上
数与代数,乘法,小数乘法计算,5上
数与代数,数的运算,小数四则混合运算与实际应用,5上
数与代数,代数初步,用字母表示数量关系,5上
数与代数,代数初步,用字母表示运算律和公式,5上
数与代数,整数认识,2、3、5的倍数特征,5上
数与代数,整数认识,找因数与找质数,5上
数与代数,整数认识,最大公因数与最小公倍数,5上
图形与几何,图形的认识,三角形的分类特征,5上
图形与几何,图形的认识,三角形内角和,5上
图形与几何,图形的认识,三角形三边关系,5上
图形与几何,图形的认识,多边形内角和,5上
图形与几何,图形的认识,认识底和高（平行四边形、三角形、梯形）,5上
图形与几何,图形测量,比较图形面积,5上
图形与几何,图形测量,平行四边形、三角形、梯形的面积,5上
图形与几何,图形测量,组合图形面积,5上
图形与几何,图形的位置与运动,轴对称再认识,5上
图形与几何,图形的位置与运动,平移,5上
图形与几何,图形的位置与运动,欣赏与设计,5上
统计与概率,概率,判断游戏规则的公平性,5上
统计与概率,概率,可能性的大小（摸球游戏）,5上
综合与实践,图形运动与设计,小小设计师（轴对称与平移图案设计）,5上
综合与实践,综合应用,鸡兔同笼（假设法解题）,5上
综合与实践,面积测量实践,多少落叶能铺满（不规则图形面积估算）,5上`;

export function parseCSV() {
  const lines = CSV_DATA.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map((line, index) => {
    const values = line.split(',');
    return {
      id: `kp-${index}`,
      category: values[0]?.trim(),
      subCategory: values[1]?.trim(),
      name: values[2]?.trim(),
      grade: values[3]?.trim(),
    };
  });
}

export function buildKnowledgeTree() {
  const items = parseCSV();
  const tree = {};
  items.forEach((item) => {
    if (!tree[item.category]) tree[item.category] = {};
    if (!tree[item.category][item.subCategory]) tree[item.category][item.subCategory] = [];
    tree[item.category][item.subCategory].push(item);
  });
  return tree;
}

export function getAllKnowledgePoints() {
  return parseCSV();
}
