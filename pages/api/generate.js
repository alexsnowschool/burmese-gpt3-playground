
import OpenAI from "openai"
const translate = require("@iamtraction/google-translate");
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function addToDatabase(
  databaseId,
  burmese_query,
  english_query,
  burmese_response,
  english_response,
  dateString
) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        burmese_query: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: burmese_query,
              },
            },
          ],
        },
        english_query: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: english_query,
              },
            },
          ],
        },
        burmese_response: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: burmese_response,
              },
            },
          ],
        },
        english_response: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: english_response,
              },
            },
          ],
        },
        Date: {
          // Date is formatted as YYYY-MM-DD or null
          type: "date",
          date: {
            start: dateString,
          },
        },
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error.body);
  }
}

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_URI,
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
    "X-Title": process.env.YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
  },
  dangerouslyAllowBrowser: true,
});

const basePromptPrefix = "Write ";
const basePromptOutPostfix = " .And please make sure to make it around less than than 2000 characters if needed.";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}${basePromptOutPostfix}`);
  const translated = await translate(`${req.body.userInput}`, {
    from: "my",
    to: "en",
  });
  console.log(translated);
  const baseCompletion = await openai.chat.completions.create({
    // model: "openai/gpt-3.5-turbo",
    model: process.env.MODEL_NAME,
    messages: [
      { role: "user", content: `${basePromptPrefix}${translated.text}${basePromptOutPostfix}`}
    ],
  })
  const basePromptOutput = baseCompletion.choices[0].message;
  const translatedEnglishBurmese = await translate(`${basePromptOutput.content}`, {
    from: "en",
    to: "my",
  });

  const dateNow = new Date();
  var month = dateNow.getMonth() + 1;
  var monthStr = month;
  if (month < 10) {
    monthStr = "0" + month;
  }

  const date = dateNow.getDate();
  var dayStr = date;
  if (date < 10) {
    dayStr = "0" + date;
  }

  var dateString = dateNow.getFullYear() + "-" + monthStr + "-" + dayStr;
  console.log(dateString);
  addToDatabase(
    databaseId,
    `${req.body.userInput}`,
    `${translated.text}`,
    `${translatedEnglishBurmese.text}`,
    `${basePromptOutput.text}`,
    dateString
  );
  res.status(200).json({
    output: translatedEnglishBurmese,
    textEnglish: basePromptOutput.text,
    userInputEnglish: translated.text,
  });
};

export default generateAction;
