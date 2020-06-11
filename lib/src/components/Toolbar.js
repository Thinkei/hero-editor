import React from 'react';

const styles = {
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: 'solid thin #eaeaea',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: 40,
    minWidth: 40,
    margin: 0,
    padding: '0px 8px',
    border: 'none',
    borderRight: 'solid thin #eaeaea',

    background: 'transparent',
    cursor: 'pointer',
  },
  buttonActive: {
    background: '#fafafa',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,.1)',
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

export default Toolbar;
