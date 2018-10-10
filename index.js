#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const extractTimeRanges = require('./extractor')
const aggregate = require('./aggregate')

const summarize = (timeBlock) => `${timeBlock.description}: ${timeBlock.durationMinutes}`
const print = (aggregated, totalDuration) => {
  const summarized = aggregated.map(summarize)
  const list = JSON.stringify(summarized, null, 2)
  return `${list} \ntotal minutes: ${totalDuration}`
}

const main = (file, returnPrinted) => {
  const timeRanges = extractTimeRanges(file)
  const aggregated = aggregate(timeRanges)
  if (returnPrinted) {
    const durationSum = aggregated.reduce((accumulator, value) => accumulator + value.durationMinutes, 0)
    const result = print(aggregated, durationSum)
    return result
  } else {
    return aggregated
  }
}

if (require.main === module) {
  let file
  try {
    file = fs.readFileSync(process.argv[2], 'utf8')
  } catch (err) {
    process.stdout.write(`unable to access file "${process.argv[2]}"`)
    process.exit(1)
  }
  const result = main(file, true)
  process.stdout.write(result)
} else {
  module.exports = main
}
