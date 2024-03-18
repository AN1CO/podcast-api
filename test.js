const assert = require("assert");
const { processLogs } = require("./index.js");

async function runTests() {
  await processLogs();
  console.log("✅ processLogs function ran without errors");

  assert.strictEqual(
    analyticsReceived.length,
    expectedWithoutAudioApiData.length,
    "number of analytics events received"
  );

  console.log("✅ correct number of analytics events received");

  expectedWithoutAudioApiData.forEach((expected, index) => {
    // Ignore fields we expect in the later test
    const { episodeTitle, seriesName, editors, ...notIgnoredFields } =
      analyticsReceived[index];

    try {
      assert.deepEqual(notIgnoredFields, expected);
    } catch (err) {
      console.error(`Assertion failed for index ${index}`);
      throw err;
    }
  });

  console.log("✅ extracted fields from log data correctly");

  expectedWithAudioApiData.forEach((expected, index) => {
    try {
      assert.deepEqual(analyticsReceived[index], expected);
    } catch (err) {
      console.error(`Assertion failed for index ${index}`);
      throw err;
    }
  });

  console.log("✅ loaded values from Audio API correctly");

  console.log("✨ All tests passed ✨");
}

/** FIXTURE DATA - PLEASE DO NOT MODIFY **/

const expectedWithoutAudioApiData = [
  {
    requestIp: "172.30.182.228",
    userAgent: "Spotify/8.6.70.1102%20Android/30%20(SM-N976V)",
    episodeId: "6169ec274cedfd00097fcac6",
  },
  {
    requestIp: "172.30.182.228",
    userAgent: "Spotify/8.6.70.1102%20Android/30%20(SM-N976V)",
    episodeId: "6169ec274cedfd00097fcac6",
  },
  {
    requestIp: "172.28.93.52",
    userAgent:
      "AppleCoreMedia/1.0.0.18F72%20(iPhone;%20U;%20CPU%20OS%2014_6%20like%20Mac%20OS%20X;%20en_us)",
    episodeId: "6169ec274cedfd00097fcac6",
  },
  {
    requestIp: "172.28.93.52",
    userAgent:
      "AppleCoreMedia/1.0.0.18F72%20(iPhone;%20U;%20CPU%20OS%2014_6%20like%20Mac%20OS%20X;%20en_us)",
    episodeId: "6169ec274cedfd00097fcac6",
  },
  {
    requestIp: "7b3d:3527:e227:7eda:c2b4:2097:769c:80dc",
    userAgent: "Spotify/8.6.68%20iOS/15.0.1%20(iPhone12,5)",
    episodeId: "6169ec274cedfd00097fcac6",
  },
  {
    requestIp: "172.16.60.182",
    userAgent:
      "Mozilla/5.0%20(X11;%20Linux%20x86_64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/94.0.4606.81%20Safari/537.36",
    episodeId: "6169ec274cedfd00097fcac6",
  },
  {
    requestIp: "172.30.66.165",
    userAgent: "Podcasts/1575.2.2%20CFNetwork/1240.0.4%20Darwin/20.6.0",
    episodeId: "610b5c3ec9e77c0008e35c5f",
  },
  {
    requestIp: "172.30.66.165",
    userAgent: "Podcasts/1575.2.2%20CFNetwork/1240.0.4%20Darwin/20.6.0",
    episodeId: "60cab0b44cedfd0008158c69",
  },
  {
    requestIp: "172.22.66.223",
    userAgent: "Podcasts/1575.2.2%20CFNetwork/1240.0.4%20Darwin/20.6.0",
    episodeId: "60cbb6c646e0fb000846fa8b",
  },
  {
    requestIp: "172.29.183.103",
    userAgent: "Podcasts/1575.2.2%20CFNetwork/1240.0.4%20Darwin/20.6.0",
    episodeId: "6143d59846e0fb0008fb52e5",
  },
];

const expectedWithAudioApiData = [
  {
    requestIp: "172.30.182.228",
    userAgent: "Spotify/8.6.70.1102%20Android/30%20(SM-N976V)",
    episodeId: "6169ec274cedfd00097fcac6",
    episodeTitle: "The NBA’s Kyrie problem ",
    seriesName: "Post Reports",
    editors: [
      "Maggie Penman",
      "Alexis Diao",
      "Reena Flores",
      "Jordan-Marie Smith",
      "Linah Mohammad",
      "Rennie Svirnovskiy",
      "Ariel Plotnick",
      "Emma Talkoff",
      "Sabby Robinson",
      "Sean Carter",
    ],
  },
  {
    requestIp: "172.30.182.228",
    userAgent: "Spotify/8.6.70.1102%20Android/30%20(SM-N976V)",
    episodeId: "6169ec274cedfd00097fcac6",
    episodeTitle: "The NBA’s Kyrie problem ",
    seriesName: "Post Reports",
    editors: [
      "Maggie Penman",
      "Alexis Diao",
      "Reena Flores",
      "Jordan-Marie Smith",
      "Linah Mohammad",
      "Rennie Svirnovskiy",
      "Ariel Plotnick",
      "Emma Talkoff",
      "Sabby Robinson",
      "Sean Carter",
    ],
  },
  {
    requestIp: "172.28.93.52",
    userAgent:
      "AppleCoreMedia/1.0.0.18F72%20(iPhone;%20U;%20CPU%20OS%2014_6%20like%20Mac%20OS%20X;%20en_us)",
    episodeId: "6169ec274cedfd00097fcac6",
    episodeTitle: "The NBA’s Kyrie problem ",
    seriesName: "Post Reports",
    editors: [
      "Maggie Penman",
      "Alexis Diao",
      "Reena Flores",
      "Jordan-Marie Smith",
      "Linah Mohammad",
      "Rennie Svirnovskiy",
      "Ariel Plotnick",
      "Emma Talkoff",
      "Sabby Robinson",
      "Sean Carter",
    ],
  },
  {
    requestIp: "172.28.93.52",
    userAgent:
      "AppleCoreMedia/1.0.0.18F72%20(iPhone;%20U;%20CPU%20OS%2014_6%20like%20Mac%20OS%20X;%20en_us)",
    episodeId: "6169ec274cedfd00097fcac6",
    episodeTitle: "The NBA’s Kyrie problem ",
    seriesName: "Post Reports",
    editors: [
      "Maggie Penman",
      "Alexis Diao",
      "Reena Flores",
      "Jordan-Marie Smith",
      "Linah Mohammad",
      "Rennie Svirnovskiy",
      "Ariel Plotnick",
      "Emma Talkoff",
      "Sabby Robinson",
      "Sean Carter",
    ],
  },
  {
    requestIp: "7b3d:3527:e227:7eda:c2b4:2097:769c:80dc",
    userAgent: "Spotify/8.6.68%20iOS/15.0.1%20(iPhone12,5)",
    episodeId: "6169ec274cedfd00097fcac6",
    episodeTitle: "The NBA’s Kyrie problem ",
    seriesName: "Post Reports",
    editors: [
      "Maggie Penman",
      "Alexis Diao",
      "Reena Flores",
      "Jordan-Marie Smith",
      "Linah Mohammad",
      "Rennie Svirnovskiy",
      "Ariel Plotnick",
      "Emma Talkoff",
      "Sabby Robinson",
      "Sean Carter",
    ],
  },
  {
    requestIp: "172.16.60.182",
    userAgent:
      "Mozilla/5.0%20(X11;%20Linux%20x86_64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/94.0.4606.81%20Safari/537.36",
    episodeId: "6169ec274cedfd00097fcac6",
    episodeTitle: "The NBA’s Kyrie problem ",
    seriesName: "Post Reports",
    editors: [
      "Maggie Penman",
      "Alexis Diao",
      "Reena Flores",
      "Jordan-Marie Smith",
      "Linah Mohammad",
      "Rennie Svirnovskiy",
      "Ariel Plotnick",
      "Emma Talkoff",
      "Sabby Robinson",
      "Sean Carter",
    ],
  },
  {
    requestIp: "172.30.66.165",
    userAgent: "Podcasts/1575.2.2%20CFNetwork/1240.0.4%20Darwin/20.6.0",
    episodeId: "610b5c3ec9e77c0008e35c5f",
    episodeTitle:
      "La Florida y la pandemia. Bolsonaro y el Tribunal Electoral. Colombia, el fútbol y la violencia",
    seriesName: "El Washington Post",
    editors: ["Cecilia Favela"],
  },
  {
    requestIp: "172.30.66.165",
    userAgent: "Podcasts/1575.2.2%20CFNetwork/1240.0.4%20Darwin/20.6.0",
    episodeId: "60cab0b44cedfd0008158c69",
    episodeTitle:
      "Hoy, episodio especial. Los 50 años de la Guerra contra las Drogas. La cumbre Biden-Putin",
    seriesName: "El Washington Post",
    editors: ["John F. Burnett"],
  },
  {
    requestIp: "172.22.66.223",
    userAgent: "Podcasts/1575.2.2%20CFNetwork/1240.0.4%20Darwin/20.6.0",
    episodeId: "60cbb6c646e0fb000846fa8b",
    episodeTitle: "Washington’s revolving door hits Biden on the way in",
    seriesName: "Can He Do That?",
    editors: ["Arjun Singh", "Charla Freeland"],
  },
  {
    requestIp: "172.29.183.103",
    userAgent: "Podcasts/1575.2.2%20CFNetwork/1240.0.4%20Darwin/20.6.0",
    episodeId: "6143d59846e0fb0008fb52e5",
    episodeTitle: "America’s Song, Part 2",
    seriesName: "Post Reports",
    editors: [
      "Maggie Penman",
      "Alexis Diao",
      "Reena Flores",
      "Jordan-Marie Smith",
      "Linah Mohammad",
      "Rennie Svirnovskiy",
      "Ariel Plotnick",
      "Robin Amer",
    ],
  },
];

runTests().catch((err) => {
  console.error(err);
  console.error("❌ some tests failed");
  process.exit(-1);
});
