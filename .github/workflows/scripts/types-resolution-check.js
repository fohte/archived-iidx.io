const fs = require('fs')
const path = require('path')

const repoRoot = path.join(__dirname, '../../..')

const packages = JSON.parse(
  fs.readFileSync(path.join(repoRoot, 'frontend/package.json')),
)

const deps = { ...packages.dependencies, ...packages.devDependencies }
const typePackages = Object.keys(deps).reduce((acc, key) => {
  if (/^@types\//.test(key)) {
    acc[key] = deps[key]
  }

  return acc
}, {})

const _diff = (xs, ys) => xs.filter(x => !new Set(ys).has(x))

const diff = (xs, ys) => _diff(xs, ys).concat(_diff(ys, xs))

const packageDiffs = diff(
  Object.keys(typePackages),
  Object.keys(packages.resolutions),
)

if (packageDiffs.length !== 0) {
  console.error('missing packages:', ...packageDiffs)
  process.exit(1)
}
