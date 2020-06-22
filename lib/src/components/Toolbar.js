import React from 'react';

const styles = {
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: 30,
    minWidth: 30,
    margin: 5,
    padding: 0,
    border: 'none',

    background: 'transparent',
    borderRadius: 4,
    cursor: 'pointer',
  },
  buttonActive: {
    background: '#f5f5f5',
  },
  separator: {
    margin: '10px 5px',
    borderRight: 'solid thin #eaeaea',
  },
};

const Toolbar = ({ children }) => <div style={styles.toolbar}>{children}</div>;

Toolbar.Button = ({ active, ...props }) => (
  <button
    {...props}
    style={{
      ...styles.button,
      ...(active ? styles.buttonActive : undefined),
    }}
  />
);

Toolbar.Separator = () => <div style={styles.separator} />;

export default Toolbar;
