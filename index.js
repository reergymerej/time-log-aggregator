#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const extractTimeRanges = require('./extractor')
const aggregate = require('./aggregate')

const main = (file) => {
  const timeRanges = extractTimeRanges(file)
  const aggregated = aggregate(timeRanges)
  return aggregated
}

if (require.main === module) {
  let file
  try {
    file = fs.readFileSync(process.argv[2], 'utf8')
  } catch (err) {
    process.stdout.write(`unable to access file "${process.argv[2]}"`)
    process.exit(1)
  }
  const result = main(file)
  process.stdout.write(JSON.stringify(result, null, 2))
} else {
  module.exports = main
}
