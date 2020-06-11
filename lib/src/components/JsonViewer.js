import React from 'react';

const JsonViewer = ({ value }) => (
  <pre>
    <code>{JSON.stringify(value, null, 2)}</code>
  </pre>
);

export default JsonViewer;
