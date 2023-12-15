const validateNameLength = (name) => {
  if (name.length < 8 || name.length > 15 || /\s/.test(name)) {
    return false;
  }

  return true;
};

module.exports = { validateNameLength };
