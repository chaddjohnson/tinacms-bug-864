export default () => {
  if (typeof window !== 'undefined') {
    window.location.replace('/wholesale');
  }

  return null;
};
