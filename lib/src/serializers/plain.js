import { Node } from 'slate';

// TODO: wip
const plainSerializer = (nodes) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

export default plainSerializer;
