module.exports = function onCreatePage({ page, actions }) {
  const { createPage } = actions

  if (page.path.startsWith(`/threads`)) {
    page.matchPath = `/threads/:threadId`
    createPage(page)
  }
}
