import React from 'react';
import { Text } from 'slate';
import isUrl from 'is-url';
import getUrl from '../helpers/getUrl';
import y from '../helpers/why';

const isRoot = Array.isArray;

const makeReactTransformer = (rules) =>
  y((reactTransformer) => (node, key) => {
    if (isRoot(node)) return node.map(reactTransformer);

    if (Text.isText(node)) return rules.leaf(node, key);

    const children = node.children.map(reactTransformer);

    return rules.element(node, children, key);
  });

const defaultRules = {
  leaf: (node, key) => {
    let children = node.text;

    if (node.bold) children = <strong key={key}>{children}</strong>;

    if (node.italic) children = <em key={key}>{children}</em>;

    if (node.underline) children = <u key={key}>{children}</u>;

    return <span key={key}>{children}</span>;
  },

  element: (node, children, key) => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p
            key={key}
            style={{ margin: 0, lineHeight: 1.5, minHeight: '1.5em' }}
          >
            {children}
          </p>
        );

      case 'heading-one':
        return <h1 key={key}>{children}</h1>;

      case 'heading-two':
        return <h2 key={key}>{children}</h2>;

      case 'link':
        // eslint-disable-next-line no-case-declarations
        const nodeText = getUrl(node);

        return isUrl(nodeText) ? (
          <a key={key} href={nodeText} target="_blank">
            {children}
          </a>
        ) : (
          <span key={key}>{children}</span>
        );

      case 'mention':
        return (
          <span
            key={key}
            style={{
              padding: '2px 4px',
              background: '#eeeeee',
              borderRadius: 4,
            }}
          >
            @{node.data.name}
          </span>
        );

      case 'bulleted-list':
        return <ul key={key}>{children}</ul>;

      case 'numbered-list':
        return <ol key={key}>{children}</ol>;

      case 'list-item':
        return <li key={key}>{children}</li>;

      default:
        return <div key={key}>{children}</div>;
    }
  },
};

const defaultReactTransformer = makeReactTransformer(defaultRules);

export default makeReactTransformer;

export { makeReactTransformer, defaultReactTransformer };
