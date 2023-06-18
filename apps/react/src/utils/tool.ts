/**
 * 简单的加密
 */
export function compile(code: string) {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c;
}

/**
 * 简单的解密
 */
export function unCompile(code: string) {
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

type TreeInput = {
  id: number;
  parent?: number;
};

/**
 * 把数据转为树形数据
 */
export function flatToTree<T extends TreeInput>(data: T[]) {
  type TreeNode = TreeInput & T & { children?: T[] };

  const map: Record<number, TreeNode> = {};
  const treeData: TreeNode[] = [];

  for (const item of data) {
    const node = {
      ...item,
      children: [],
    };
    map[item.id] = node;
  }

  for (const item of data) {
    const node = map[item.id];
    if (item.parent === undefined) {
      treeData.push(node);
    } else {
      map[item.parent]?.children?.push(node);
    }
  }

  for (const value of Object.values(map)) {
    if (value.children?.length === 0) {
      delete value.children;
    }
  }

  return treeData;
}
