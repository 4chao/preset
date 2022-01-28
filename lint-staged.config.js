module.exports = {
  '*.{vue,js,ts}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  '*.{scss,less,styl,css,html}': ['prettier --write'],
  '*.md': ['prettier --write'],
}
