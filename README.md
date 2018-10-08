# Time Log Aggregator

Scans through text and extracts time descriptions and durations using the
un-patented Grizzle Format!


## Usage

**cli**
```
./index.js ./file.txt
```

**module**

```js
const timeLog = require('time-log-aggregator')
const fs = require('fs')
const file = fs.readFileSync('./foo/bar.txt', 'utf8')
const times = timeLog(file)
```
