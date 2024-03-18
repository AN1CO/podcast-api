require("dotenv").config();

const apiBaseUrl = process.env.AUDIO_API_BASE_URL;

require("isomorphic-fetch"); // Polyfills the browser Fetch API in Node.js

/**
 * The promise-based Node FS library is provided for reading files
 * https://nodejs.org/docs/latest-v14.x/api/fs.html
 */
const fs = require("fs/promises");
// alternative to just get local data
// const { readFileSync } = require("fs");
// const tsvFileData = readFileSync("./data/logs.tsv").toString();

exports.processLogs = async function () {
  let tsvFileData = "";
  // get logs tsv data through promise
  try {
    const data = await fs.readFile("./data/logs.tsv", {
      encoding: "utf8",
    });
    tsvFileData = data;
  } catch (err) {
    console.log(err);
  }

  // tsv file breaks every item by line break
  const tsvLines = tsvFileData.split("\n");
  // for some reason \t wasnt working
  const podcastData = tsvLines.map((item) => item.split("  "));
  //get only the ones that have GET http requests
  const filteredGETRequests = podcastData.filter((item) => item[5] === "GET");

  const jsonPodcastRequestData = filteredGETRequests.map((item) => {
    const episodeID = item[7].split("/")[4];
    return {
      requestIp: item[4],
      userAgent: item[10],
      episodeId: episodeID,
    };
  });
  return jsonPodcastRequestData;
};

// Create a function to make an API call.
async function makeAPICall(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

// Create a function to make multiple API calls in parallel.
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

  const uniqEndpoints = [
    ...new Set(logsData.map((item) => apiBaseUrl + item.episodeId)),
  ];

  try {
    responses = await makeMultipleAPICalls(uniqEndpoints);
  } catch (err) {
    console.log(err);
  }

  console.log("responses", responses);
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
