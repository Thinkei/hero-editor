import { Node } from 'slate';
import { LINK } from '../constants';

export default (node) => {
  if (node?.type !== LINK) return null;
  return Node.string(node);
};
