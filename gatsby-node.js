exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/works/)) {
    page.matchPath = '/works/*';
    createPage(page);
  }
};
