# Exercise: Podcast API
Data processing for analytics on podcasts.

## Requirements

1. Get the server log data
    * the data you need will be in a file at `./data/logs.tsv`
    * The logs are formatted in TSV (tab-separated values) format

2. Filter to only production podcast downloads
    * URL path will start with `/washpost-production/` (URL path is the 8th field in the TSV)
    * GET requests only (request method is the 6th field)
    * Status code will be 200 OK or 206 Partial Content (status is the 9th field)

3. Extract the following data from each log entry:
    * Request IP address (5th field)
    * User agent (11th field)
    * Podcast episode ID (from URL path, 8th field)
        * URL paths are in the format: `/washpost-production/<SERIES ID>/<PUB DATE>/<EPISODE ID>/<other file data...>`

4. Fetch the following data for each episode from the Audio API
    * Episode title (`title`)
    * Series name (`seriesMeta.seriesName`)
    * List of editors' names (`name` field in `credits.editors` array)

5. Push an object with the data you collected from the logs and the Audio API to a mocked Analytics API. Entries should be pushed in the same order that they appear in the log file.
    * `requestIp`
    * `userAgent`
    * `episodeId`
    * `episodeTitle`
    * `seriesName`
    * `editors`

The Analytics API is mocked with an async function called postAnalytics() that will simulate sending data to an analytics server. It accepts one parameter, an object in the format described above.

## TODO

* update tests