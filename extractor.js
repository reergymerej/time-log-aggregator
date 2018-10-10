// Find lines with timestamp.
const getTimes = (text) => {
  const times = []
  const regex = (/^\w{3}\s+\w{3}\s+\d{1,2} (\d{2}:\d{2}:\d{2}) \w{3} \d{4} (.+)/gm)
  let matches = regex.exec(text)
  while (matches) {
    const time = matches[1]
    const description = matches[2]
    times.push({
      time,
      description,
    })
    matches = regex.exec(text)
  }

  return times
}

const isEndTime = (time) => {
  return time.description === 'stop'
}

// returns minutes
const subtractTimes = (end, start) => {
  const endParts = end.split(':').map(x => parseInt(x, 10))
  const startParts = start.split(':').map(x => parseInt(x, 10))
  const hours = endParts[0] - startParts[0]
  const minutes = endParts[1] - startParts[1]
  return minutes + hours * 60
}

const getTimeRanges = (times) => {
  return times.reduce((accumulator, time) => {
    if (isEndTime(time)) {
      const previous = accumulator[accumulator.length - 1]
      previous.end = time.time
      previous.durationMinutes = subtractTimes(previous.end, previous.start)
    } else {
      accumulator.push({
        description: time.description,
        start: time.time,
      })
    }
    return accumulator
  }, [])
}

const extractTimeRanges = (text) => {
  const times = getTimes(text)
  return getTimeRanges(times)
}

module.exports = extractTimeRanges
