const withId = (id) => (editor) => {
  editor.id = id;

  return editor;
};

export default withId;
