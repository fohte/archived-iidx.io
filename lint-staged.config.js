const micromatch = require('micromatch')
const path = require('path')

module.exports = {
  '**/*': absolutePaths => {
    const cwd = process.cwd()
    const relativePaths = absolutePaths.map(file => path.relative(cwd, file))

    const match = micromatch.not(
      micromatch(relativePaths, [
        '**/*.js{,x}',
        '**/*.ts{,x}',
        '**/*.{s,}css',
        '**/*.json',
        '**/*.graphql',
        '**/*.y{,a}ml',
      ]),
      ['docs/graphql/*'],
    )

    if (match.length === 0) {
      return []
    }

    const matchStr = match.join(' ')

    return [`prettier --write ${matchStr}`, `git add ${matchStr}`]
  },
}
