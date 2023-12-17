export const initializeNanoid = async () => {
  const nanoidModule = await import('nanoid');
  return nanoidModule.customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
};
