const micromatch = require('micromatch')
const path = require('path')

const extract = (absolutePaths, { include, exclude }) => {
  const cwd = process.cwd()

  const relativePaths = absolutePaths.map(file => path.relative(cwd, file))

  const match = micromatch.not(micromatch(relativePaths, include), exclude)

  return match
}

const makeCommands = files => {
  if (files.length === 0) {
    return []
  }

  const filesArg = files.join(' ')

  return [`prettier --write ${filesArg}`, `git add ${filesArg}`]
}

module.exports = {
  '**/*': absolutePaths => {
    // コマンドの表示用に `[file]` という文字列が引数として渡されるので
    // そのときは特別にファイルの抽出処理を通さない
    // (lint-staged が [この関数を普通に実行したときの返り値の数 <=
    // コマンド表示用で実行したときの返り値の数] を期待しているので
    // それに従わないとエラーになる)
    const files =
      absolutePaths[0] === '[file]'
        ? ['[file]']
        : extract(absolutePaths, {
            include: [
              '**/*.js{,x}',
              '**/*.ts{,x}',
              '**/*.{s,}css',
              '**/*.json',
              '**/*.graphql',
              '**/*.y{,a}ml',
            ],
            exclude: ['docs/graphql/*'],
          })

    return makeCommands(files)
  },
}
