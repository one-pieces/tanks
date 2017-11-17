const weightW = 1; // 平移权重
const weightWH = 1; // 斜移权重

let row = 0; // 地图总行数
let col = 0; // 地图总列数
let map = [];
let openList = [];
let closeList = [];
let startPos = {}; // 开始点
let endPos = {}; // 结束点

// Node 类
function Node(x, y, parent) {
  this.x = x;
  this.y = y;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.parent = parent;
}

function countH(sNode, eNode) {
  const w = Math.abs(sNode.x - eNode.x);
  const h = Math.abs(sNode.y - eNode.y);
  const cost = Math.min(w, h) * weightWH + Math.abs(w -h) * weightW;
  return cost;
}

function countFGH(sNode, eNode, cost) {
  const h = countH(sNode, eNode);
  const g = sNode.parent.g + cost;
  const f = h + g;
  sNode.f = f;
  sNode.h = h;
  sNode.g = g;
}
// 检测列表是否包含指定节点，如果包含则返回该节点
function isContains(list, x, y) {
  return list.find(item => item.x == x && item.y == y);
}
function initMap() {
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];
  row = 19;
  col = 19;
}

function printMap() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      console.log(map[i][j]);
    }
    console.log('');
  }
}

function compare(n1, n2) {
  return n1.f < n2.f;
}

function checkMove(x, y, parent, end, cost) {
  if (map[x][y] == 1) {
    return;
  }
  if (!isContains(closeList, x, y)) {
    return;
  }
  const sNode = isContains(openList, x, y);
  if (sNode) {
    // 是否存在更小的G值
    if (parent.g + cost < sNode.g) {
      sNode.parent = parent;
      sNode.g = parent.g + cost;
      sNode.f = sNode.g + sNode.h;
    }
  } else {
    const node = new Node(x, y, parent);
    countFGH(node, end, cost);
    openList.push(node);
  }
}
function printPath(node) {
  if (node.parent !== null) {
    printPath(node.parent);
  }
  // 将走过的点标记为2
  map[node.x][node.y] = 2;
  console.log('->', node.x, node.y);
}
// 错误 -1，没找到 0，找到 1
function startSearch(start, end) {
  if (start.x < 0 || start.y < 0 || start.x >= row || start.y >= col
    || end.x < 0 || end.y < 0 || end.x >= row || end.y >= col) {
    return -1;
  }
  if (map[start.x][start.y] == 1 || map[end.x[end.y]] == 1) {
    return -1;
  }

  start.h = countH(start, end);
  start.f = start.h + start.g;
  // 查找算法
  openList.push(start);
  let root = null;
  let find = 0;
  while (openList.length > 0) {
    root = openList[0];
    if (root.x == end.x && root.y == end.y) {
      find = 1;
      break;
    }
    // 上下左右
    if (root.x > 0) {
      checkMove(root.x - 1, root.y, root, end, weightW);
    }
    if (root.y > 0) {
      checkMove(root.x, root.y - 1, root, end, weightW);
    }
    if (root.x < row - 1) {
      checkMove(root.x + 1, root.y, root, end, weightW);
    }
    if (root.y < col - 1) {
      checkMove(root.x, root.y + 1, root ,end, weightW);
    }
    closeList.push(root);
    // 删除数组第一个元素
    openList.shift();
    // 根据F值从小到大排序
    openList.sort(compare);
  }
  if (find) {
    printPath(root);
    console.log('');
  }
  printMap();
  openList = [];
  closeList = [];
  return find;
}

function main() {

}
export default {

}