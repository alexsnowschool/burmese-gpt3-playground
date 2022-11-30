import Head from "next/head";
import Image from "next/image";
import schoolLogo from "../assets/logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
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
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>မြန်မာလို့ GPT-3 ဇာတ်လမ်း တိုလေတွေ ရေးစမ်းကြည်မယ်။ | @alexsnowschool</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>စာရေးကြစို့</h1>
          </div>
          <div className="header-subtitle">
            <h2>စိတ်ထဲမှာ ပေါ်လာတဲ့ ကောင်းစဥ်လေတွေကို  ဇာတ်လမ်း အနေနဲ့ စမ်းရေးကြည့်ကြမယ်။</h2>
            <h2> ဥပမာ - မြန်မာ နိုင်ငံ၏ အထက်တန်းလွှာကိုအခြေခံထားတဲ့ ဝတ္ထုတိုလေ ရေးပေးပါ။</h2>
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
              {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {/* New code I added here */}
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a href="https://alexsnowschool.org/" target="_blank" rel="noreferrer">
          <div className="badge">
            <Image src={schoolLogo} alt="school logo" />
            <p>Alex Snow School</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
