let select = document.querySelector(".select-heading")
let options = document.querySelector(".options")
let arrow = document.querySelector(".select-heading img")
let option = document.querySelectorAll(".option")
let selecttext = document.querySelector(".select-heading span")

select.addEventListener("click", () => {
    options.classList.toggle("active-options")
    arrow.classList.toggle("rotate")
})
option.forEach((item) => {
    item.addEventListener("click", () => {
        selecttext.innerText = item.innerText
    })
})

// ChatBot
let prompt = document.querySelector(".prompt")
let chatbtn = document.querySelector(".input-area button")
let chatcontainer = document.querySelector(".chat-container")
let h1 = document.querySelector(".h1")
let chatimg = document.querySelector("#chat-img")
let chatbox = document.querySelector(".chat-box")
let userMessage = ""

chatimg.addEventListener("click",()=>{
    chatbox.classList.toggle("actve-chat-box");
    if(chatbox.classList.contains("actve-chat-box")){
        chatimg.src = "fitness_photo/cross.svg";
    }
    else{
        chatimg.src = "fitness_photo/chatbot.svg";
    }
})
function createChatBox(html, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}
function showLoading() {
    const html = `<p class="text"></p> <img src="fitness_photo/load.gif" class="loading" width="20px">`;
    let aiChatbox = createChatBox(html, "ai-chat-box");
    chatcontainer.appendChild(aiChatbox)
    generateApiResponse(aiChatbox);
}
chatbtn.addEventListener("click", () => {
    userMessage = prompt.value;
    h1.style.display = "none";
    const html = `<p class="text"></p>`;
    let userChatbox = createChatBox(html, "user-chat-box");
    userChatbox.querySelector(".text").innerText = userMessage;
    chatcontainer.appendChild(userChatbox)
    prompt.value = "";
    setTimeout(showLoading, 500);
})
let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCSjeQdn6ZgXdoshjQKhVtdBtA7jDg5eM0";

async function generateApiResponse(aiChatbox) {
    const textElement = aiChatbox.querySelector(".text");
    try {
        const response = await fetch(Api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ "role": "user", 
                    "parts": [{ "text": `${userMessage} in 50 words` }] }]
            })
        });
        const data = await response.json();
        const apiResponse=data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText=apiResponse;
    }
    catch (error) {
        console.error(error);
        }
    finally{
        aiChatbox.querySelector(".loading").style.display ="none";
    }
}

//virtual-assistant

let virtualAssistant = document.querySelector(".virtual-assistant");
let speakPage = document.querySelector(".speak-page");
let content = document.querySelector(".speak-page h1");

virtualAssistant.addEventListener("click",()=>{
    recognition.start();
    speakPage.style.display="flex";
})
function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    // text_speak.lang = "en-US";
    text_speak.lang = "hi-GB";
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult=(event)=>{
    speakPage.style.display = "none";
    let currentIndex = event.resultIndex;
    let transcript =event.results[currentIndex][0].transcript;
    content.innerText =transcript;
    takeCommand(transcript.toLowerCase())
}
function takeCommand(message){
    if(message.includes("open") && message.includes("chat")){
        speak("Opening chatbox");
        chatbox.classList.add("actve-chat-box");
        chatimg.src = "fitness_photo/cross.svg";
    }
    else if(message.includes("close") && message.includes("chat")){
        speak("close chatbox");
        chatbox.classList.remove("actve-chat-box");
        chatimg.src = "fitness_photo/chatbot.svg";
    }
    else if(message.includes("back")){
        speak("OKay sir");
        window.open("http://127.0.0.1:5500/back.html","_self");
    }
    else if(message.includes("chest")){
        speak("OKay sir");
        window.open("http://127.0.0.1:5500/chest.html","_self");
    }
    else if(message.includes("leg")){
        speak("OKay sir");
        window.open("http://127.0.0.1:5500/leg.html","_self");
    }
    else if(message.includes("shoulder")){
        speak("OKay sir");
        window.open("http://127.0.0.1:5500/shoulder.html","_self");
    }
    else if(message.includes("biceps") || message.includes("triceps")){
        speak("OKay sir");
        window.open("http://127.0.0.1:5500/shoulder.html","_self");
    }
    else if(message.includes("all workout")){
        speak("OKay sir");
        window.open("http://127.0.0.1:5500/workout.html","_self");
    }
    else if(message.includes("home")){
        speak("OKay sir");
        window.open("http://127.0.0.1:5500/index.html","_self");
    }
}
