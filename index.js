require("dotenv").config();

const apiBaseUrl = process.env.AUDIO_API_BASE_URL;

require("isomorphic-fetch"); // Polyfills the browser Fetch API in Node.js

/**
 * The promise-based Node FS library is provided for reading files
 * https://nodejs.org/docs/latest-v14.x/api/fs.html
 */
const fs = require("fs/promises");
// alternative to just get local data
const { readFileSync } = require("fs");
const tsvFileData = readFileSync("./data/logs.tsv").toString();

async function processLogs() {
  // tsv file breaks every item by line break
  const tsvLines = tsvFileData.split("\n");
  // for some reason \t wasnt working, think vscode changed the spacing
  const podcastData = tsvLines.map((item) => item.split("  "));
  // filter to only the ones that have GET http requests
  const filteredGETRequests = podcastData.filter((item) => item[5] === "GET");

  const jsonPodcastRequestData = filteredGETRequests.map((item) => {
    const episodeID = item[7].split("/")[4];
    return {
      requestIp: item[4],
      userAgent: item[10],
      episodeId: episodeID,
    };
  });

  // theres some dupes, so im filtering
  const uniqPodcastRequestData = jsonPodcastRequestData.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (item) =>
          item.episodeId === value.episodeId &&
          item.userAgent === value.userAgent &&
          item.requestIp === value.requestIp
      )
  );

  return uniqPodcastRequestData;
}

// create a function to make an API call
async function makeAPICall(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

// create a function to make multiple API calls in parallel
async function makeMultipleAPICalls(endpoints) {
  const promises = endpoints.map(makeAPICall);
  const responses = await Promise.all(promises);
  return responses;
}

async function fetchAndBuildEpisodesData() {
  let logsData = [];
  let responses = [];

  try {
    logsData = await processLogs();
  } catch (err) {
    console.log(err);
  }

  // lessen the amount of calls, theres instances of same ep id but different user agent
  const uniqEndpoints = [
    ...new Set(logsData.map((item) => apiBaseUrl + item.episodeId)),
  ];

  try {
    responses = await makeMultipleAPICalls(uniqEndpoints);
  } catch (err) {
    console.log(err);
  }

  // combine response data with logs data into new arr of objects
  const newItemsData = logsData.map((logItem) => {
    let matchedItem = responses.find(
      (resItem) => resItem.id === logItem.episodeId
    );

    return {
      ...logItem,
      ...{
        episodeTitle: matchedItem.title,
        seriesName: matchedItem.seriesMeta.seriesName,
        editors: matchedItem.credits.editors,
      },
    };
  });

  return newItemsData;
}

const MAX_BATCH_SIZE = 3;
let analyticsReceived = [];

async function postAnalytics(analyticsObject) {
  // Pretend this is a network call that takes some time to return
  const randomResponseTime = Math.floor(Math.random() * 300); // Between 0 and 300ms
  await new Promise((resolve) => setTimeout(resolve, randomResponseTime));

  if (Array.isArray(analyticsObject)) {
    if (analyticsObject.length > MAX_BATCH_SIZE) {
      throw new Error(
        `Analytics batch must be ${MAX_BATCH_SIZE} items or less`
      );
    }

    analyticsReceived.push(...analyticsObject);
  } else {
    analyticsReceived.push(analyticsObject);
  }
}

// Top-level await is not available, so we'll wrap the all the async code into a promise here
fetchAndBuildEpisodesData().catch((err) => {
  console.error(err);
  console.error("❌ some tests failed");
  process.exit(-1);
});
