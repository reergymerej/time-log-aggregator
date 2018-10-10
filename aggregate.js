const groupTimes = (times) => {
  const groups = {}

  times.forEach(time => {
    const { description, start, end, durationMinutes } = time
    const group = groups[description] || (groups[description] = {
      description,
      durationMinutes: null,
      chunks: [],
    })

    if (durationMinutes) {
      group.durationMinutes = group.durationMinutes
        ? group.durationMinutes + durationMinutes
        : durationMinutes
    }

    group.chunks.push({
      start,
      end,
      durationMinutes,
    })
  })

  return Object.keys(groups).map(key => groups[key])
}

const byDurationDesc = (a, b) => {
  return b.durationMinutes - a.durationMinutes
}

const sortTimes = (times) => times.sort(byDurationDesc)

const aggregate = (times) => sortTimes(groupTimes(times))

module.exports = aggregate
