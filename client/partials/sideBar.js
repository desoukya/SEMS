Template.header.helpers({
  isActive(route) {
    if (isCurrentRoute(route)) {
      return 'active';
    }
    return '';
  },
});