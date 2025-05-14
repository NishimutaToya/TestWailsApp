import './style.css';
import './app.css';

import logo from './assets/images/logo-universal.png';
import { Greet, RunScript } from '../wailsjs/go/main/App';  // ← RunScript を追加

document.querySelector('#app').innerHTML = `
    <img id="logo" class="logo">
    <div class="result" id="result">Please enter your name below 👇</div>
    <div class="input-box" id="input">
      <input class="input" id="name" type="text" autocomplete="off" />
      <button class="btn" onclick="greet()">Greet</button>
      <button class="btn" id="notifyButton">通知を表示</button> <!-- 追加 -->
    </div>
    <pre id="logArea" style="background: #f4f4f4; padding: 1em; margin-top: 1em; border: 1px solid #ccc;"></pre>
`;
document.getElementById('logo').src = logo;

let nameElement = document.getElementById("name");
nameElement.focus();
let resultElement = document.getElementById("result");

// Greet ボタン処理
window.greet = function () {
    let name = nameElement.value;
    if (name === "") return;
    Greet(name)
        .then((result) => {
            resultElement.innerText = result;
        })
        .catch((err) => {
            console.error(err);
        });
};

// 通知ボタンの処理（RunScript）
const notifyBtn = document.getElementById("notifyButton");
const logArea = document.getElementById("logArea");

notifyBtn.addEventListener("click", async () => {
    console.log("🚀 ボタンが押された！");
    try {
        const result = await RunScript();
        console.log("✅ RunScript 結果:", result);
        logArea.textContent = result;
    } catch (error) {
        console.error("❌ RunScript エラー:", error);
        logArea.textContent = "エラー: " + error;
    }
});
