/** 插入节点到 fragment 中 */
export function attachNodesToFragment(
  nodes: Element[],
  fragment?: DocumentFragment
): DocumentFragment {
  const frag = fragment || document.createDocumentFragment();
  nodes.forEach(el => frag.appendChild(el));
  return frag;
}

/** 愚公移山：搬运节点 */
export function foolishMan(
  nodes: Element[],
  target: Element,
  usingFragment: boolean
): void {
  if (usingFragment) {
    const frag = attachNodesToFragment(nodes);
    target.appendChild(frag);
  } else {
    nodes.forEach(t => target.appendChild(t));
  }
}

/** 精卫填海：填充节点 */
export function jingwei(
  count: number,
  target: Element,
  usingFragment: boolean
): void {
  const nodes = Array(count)
    .fill(null)
    .map(t => {
      const node = document.createElement("div");
      node.classList.add("item");
      return node;
    });
  foolishMan(nodes, target, usingFragment);
}
