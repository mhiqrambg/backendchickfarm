const validateNameLength = (name) => {
  if (name.length < 3 || name.length > 25) {
    return false;
  }
  return true;
};

module.exports = { validateNameLength };
