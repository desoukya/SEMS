Companies.deny({
  // No need to insert, update or delete anything now
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});
