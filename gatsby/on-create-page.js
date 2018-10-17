module.exports = function onCreatePage({ page, actions }) {
  const { createPage } = actions

  if (page.path.startsWith(`/messages`)) {
    page.matchPath = `/messages/:messageId`
    createPage(page)
  }
}
