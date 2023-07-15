# Alex Snow School 👋
### GPT-3 နဲ့ Google Translate ကို သုံးပြီး မြန်မာလို စာရေးကြည့်ကြမယ်။ 

**မှတ်ချက် - localhost မှ တဆင့်အသုံးပြုလိုသူများသည် [OpenAI](https://beta.openai.com/playground) အကောင့်အပြင် [Notion API integration](https://www.notion.so/help/guides/connect-tools-to-notion-api) ကို နာလည်ဖို့ လိုအပ်ပါသည်။ Next.js ဖြင့် ရေးဖြင့် ရေသားထားသောကြောင့် Next.js နှင့် React.js အခြေခံ ရှိသူများအတွက် ပိုမိုနာလည်းမှု ရစေမှာဖြစ်ပါသည်။**

### Setting up locally
1. Clone the repo
```{r, engine='bash', count_lines}
git clone https://github.com/alexsnowschool/burmese-gpt3-playground.git
```
2. Go to directory and install requirement libraries
```{r, engine='bash', count_lines}
cd burmese-gpt3-playground && npm install
```
3. Update .env file with specfic keys
```{r, engine='bash', count_lines}
OPENAI_API_KEY=<PLACEHOLDER>
NOTION_API_KEY=<PLACEHOLDER>
NOTION_DATABASE_ID=<PLACEHOLDER>
```
4. Run locally
```{r, engine='bash', count_lines}
npm run dev
```
5. Go to localhost:3000 to test
```
> scratchpad@0.1.0 dev
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /home/alexsnow/Documents/personal/playground/burmese-gpt3-playground/.env
event - compiled client and server successfully in 500 ms (156 modules)
```

![Sample UI](/assets/burmese_ai.png)