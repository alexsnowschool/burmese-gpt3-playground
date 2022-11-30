import { Configuration, OpenAIApi } from "openai";
const translate = require("@iamtraction/google-translate");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  const translated = await translate(`${req.body.userInput}`, {
    from: "my",
    to: "en",
  });
  console.log(translated);
  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `${basePromptPrefix}${translated.text}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();
  const translatedEnglishBurmese = await translate(`${basePromptOutput.text}`, {
    from: "en",
    to: "my",
  });
  res.status(200).json({ output: translatedEnglishBurmese });
};

export default generateAction;
