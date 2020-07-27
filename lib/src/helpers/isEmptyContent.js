// This does not include validation
// https://docs.slatejs.org/concepts/10-normalizing#built-in-constraints
export default (content) =>
  content?.length === 1 &&
  content[0]?.type === 'paragraph' &&
  content[0]?.children?.length === 1 &&
  content[0]?.children[0]?.text === '';
