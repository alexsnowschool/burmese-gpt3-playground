import Head from "next/head";
import Image from "next/image";
import schoolLogo from "../assets/logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [userInputEnglish, setUserInputEnglish] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [apiOutputEnglish, setApiOutputEnglish] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output, textEnglish, userInputEnglish } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setApiOutputEnglish(`${textEnglish}`);
    setUserInputEnglish(`${userInputEnglish}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>
          မြန်မာလို့ ရည်စားစာတိုလေးတွေ ရေးကြမယ်။ | @alexsnowschool
        </title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <div className="badge-container grow">
              <a
                href="https://alexsnowschool.org/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="badge">
                  <Image src={schoolLogo} alt="school logo" />
                  <p>Alex Snow School</p>
                </div>
              </a>
            </div>
          </div>
          <div className="header-title">
            <h2>Lovely yours (ချစ်ရပါသော..)</h2>
          </div>
          <div className="header-subtitle">
            <div>
              <h1></h1>
            </div>
            <h2>
              စိတ်ထဲမှာ ပေါ်လာတဲ့ ကိုယ် crush လေရဲ့ personality တွေ
              ပြောပြပြီး flirt လုပ်လို ကောင်းမယ့် ရည်စားစာတိုလေးတွေ
              ရေးခိုင်မယ်။
            </h2>
            <h2> ဥပမာ - အခုလက်ရှိ ကြိုက်နေတဲ့ ကောင်မလေးက အရမ်း introvert ဖြစ်ပြီး စာဖတ်ရတာ ကြိုက်တယ်။</h2>
            <h2>
              မှတ်ချက် - မေးထားတွေကို သိမ်းထားတာဖြစ်တာမို့ ညစ်ညမ်းသော စာများကို
              မရေးစေချင်ပါဘူး။
            </h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="တစ်ခုခု စရေးကြည့်မယ်။"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />
        <div className="prompt-buttons">
          <a
            className={
              isGenerating ? "generate-button loading" : "generate-button"
            }
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>ရေးခိုင်မယ်။</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>ပို့လိုကောင်းမယ့် ရည်စားစာ</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
            <div className="output-header-container">
              <div className="output-header">
                <h3>English Version</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutputEnglish}</p>
            </div>
          </div>
          
        )}
        {/* {apiOutputEnglish && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output - English</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutputEnglish}</p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Home;
