import React from 'react';

const styles = {
  jsonViewer: {
    padding: 16,
    borderRadius: 4,
    background: 'linen',
  },
};

const JsonViewer = ({ value }) => (
  <pre style={styles.jsonViewer}>
    <code>{JSON.stringify(value, null, 2)}</code>
  </pre>
);

export default JsonViewer;
