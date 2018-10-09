#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const extractTimeRanges = require('./extractor')

if (require.main === module) {
  let file
  try {
    file = fs.readFileSync(process.argv[2], 'utf8')
  } catch (err) {
    process.stdout.write(`unable to access file "${process.argv[2]}"`)
    process.exit(1)
  }
  const result = extractTimeRanges(file)
  process.stdout.write(JSON.stringify(result, null, 2))
} else {
  module.exports = extractTimeRanges
}
