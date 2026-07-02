function generateUniqueImageName(imageName) {
  const timestamp = Date.now(); // current time in ms
  const randomStr = Math.random().toString(36).substring(2, 8);

  return `${timestamp}-${randomStr}-${imageName}`;
}

export {generateUniqueImageName}