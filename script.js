const courseData = {
  HTML: {
    basicTopics: ["Introduction", "Headings & Paragraphs", "Forms", "Tables", "Media Tags"],
    advancedTopics: ["Semantic HTML", "Forms Validation", "SEO", "Accessibility"]
  },
  CSS: {
    basicTopics: ["Selectors", "Box Model", "Flexbox", "Grid", "Colors & Fonts"],
    advancedTopics: ["Animations", "Variables", "Media Queries", "Transitions"]
  },
  Python: {
    basicTopics: ["Syntax", "Variables", "Loops", "Functions"],
    advancedTopics: ["OOP", "Modules", "File Handling"]
  }
};


let unlocked = false;

function loadCourse(courseName) {
  const content = document.getElementById("course-content");
  const course = courseData[courseName];
  if (!course) return;

  const topics = unlocked
    ? course.basicTopics.concat(course.advancedTopics)
    : course.basicTopics;

  // Each topic now uses handleTopicCheck()
  const listItems = topics.map(topic =>
    `<li>
      <label>
        <input type="checkbox" onchange="handleTopicCheck(this, '${courseName}', '${topic}')" data-course="${courseName}">
        ${topic}
      </label>
    </li>`
  ).join("");

  const lockedMsg = !unlocked
    ? `<p class="locked-msg">🔒 Unlock to access advanced topics</p>`
    : "";

  content.innerHTML = `
   <div>
      <h3>${courseName} Progress</h3>
      ${lockedMsg}
      <ul>${listItems}</ul>
      <div class="progress-circle" id="progress-${courseName}">0%</div>
    </div>
  `;

  content.classList.remove("course-content-animate");
  void content.offsetWidth;
  content.classList.add("course-content-animate");
}

function handleTopicCheck(checkbox, courseName, topic) {
  updateProgress(checkbox, courseName);
  showTopicDetail(topic);
}


function updateProgress(checkbox, courseName) {
  const checkboxes = document.querySelectorAll(`input[data-course="${courseName}"]`);
  const total = checkboxes.length;
  const completed = [...checkboxes].filter(cb => cb.checked).length;
  const percent = Math.floor((completed / total) * 100);

  const circle = document.getElementById(`progress-${courseName}`);
  circle.textContent = `${percent}%`;
  circle.style.background = `conic-gradient(#00e0ff ${percent}%, #ccc ${percent}% 100%)`;
}




function unlockAdvancedContent() {
  unlocked = true;
  alert("🎉 Advanced content unlocked!");

  const premiumSection = document.getElementById("premium-section");
  if (premiumSection) {
    premiumSection.classList.remove("hidden");

    // Re-animate
    void premiumSection.offsetWidth;
    premiumSection.classList.add("animate");

    // Animate cards
    const cards = premiumSection.querySelectorAll('.premium-card');
    cards.forEach(card => {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    });
  }
}

function closePremiumModal() {
  const premiumSection = document.getElementById("premium-section");
  if (premiumSection) {
    premiumSection.classList.add("hidden");
  }
}



function addCustomSkill() {
  const skillName = prompt("Enter your custom skill name:").trim();

  if (!skillName) {
    alert("Please enter a valid skill name.");
    return;
  }

  // Avoid duplicates
  if (courseData[skillName]) {
    alert("Skill already exists!");
    return;
  }

  // Add to courseData with sample beginner topics
  courseData[skillName] = {
    basicTopics: ["Basics", "Setup", "First Steps"],
    advancedTopics: ["Advanced Usage", "Projects", "Deployment"]
  };

  // Create new card
  const card = document.createElement("div");
  card.className = "course-card";
  card.onclick = () => loadCourse(skillName);

  card.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="${skillName}" />
    <h3>${skillName}</h3>
  `;

  // Add to course cards
  document.querySelector(".course-cards").appendChild(card);

  // Auto-open it
  loadCourse(skillName);
}
function openSigninModal() {
  document.getElementById("signinModal").classList.remove("hidden");
}

function closeSigninModal() {
  document.getElementById("signinModal").classList.add("hidden");
}
function openSigninModal() {
  document.getElementById("signinModal").classList.remove("hidden");
}

function closeSigninModal() {
  document.getElementById("signinModal").classList.add("hidden");
}

function openSignupModal() {
  document.getElementById("signupModal").classList.remove("hidden");
}

function closeSignupModal() {
  document.getElementById("signupModal").classList.add("hidden");
}

function switchToSignup() {
  closeSigninModal();
  openSignupModal();
}

function switchToSignin() {
  closeSignupModal();
  openSigninModal();
}

function openCompilerModal() {
  document.getElementById("compilerModal").classList.remove("hidden");
}

function closeCompilerModal() {
  document.getElementById("compilerModal").classList.add("hidden");
}
function openChatbot() {
  document.getElementById("chatbotModal").classList.remove("hidden");
}

function closeChatbot() {
  document.getElementById("chatbotModal").classList.add("hidden");
}
async function handleUserMessage(event) {
  event.preventDefault();
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  // Append user message
  const chatWindow = document.querySelector(".chat-window");
  chatWindow.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = "";

  // Show loading...
  chatWindow.innerHTML += `<p><strong>Bot:</strong> <em>Typing...</em></p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Fetch response from ChatGPT API ("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")
 const response = await fetch("/.netlify/functions/chatgpt", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message })
});
const data = await response.json();
const reply = data.reply;

  // Replace typing with real reply
  chatWindow.lastElementChild.innerHTML = `<strong>Bot:</strong> ${reply}`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
//challenges//
function showchallenges() {
      const section = document.getElementById("challenges");
      // Toggle display
      section.style.display = section.style.display === "block" ? "none" : "block";
    }

    const questions = {
  HTML: [
    "Explain semantic HTML with examples.",
    "What’s the difference between <section> and <div>?",
    "How does the <form> tag work and what are input types?",
    "What are meta tags and why are they important?",
    "How do you embed audio and video in HTML?"
  ],
  CSS: [
    "What is the difference between relative, absolute, and fixed positioning?",
    "Explain the box model with an example.",
    "How does Flexbox differ from Grid layout?",
    "How do media queries help in responsive design?",
    "Explain z-index and stacking context in CSS."
  ],
  Python: [
    "What are Python decorators and how are they used?",
    "Explain list comprehension with an example.",
    "What is the difference between deep copy and shallow copy?",
    "How does exception handling work in Python?",
    "What are lambda functions and where are they used?"
  ]
};

function openChallengeModal() {
  document.getElementById("challengeModal").classList.remove("hidden");
}

function closeChallengeModal() {
  document.getElementById("challengeModal").classList.add("hidden");
}

function openQuestionModal(topic) {
  const list = document.getElementById("questionList");
  const title = document.getElementById("questionTitle");

  title.textContent = `${topic} Challenge Questions`;
  list.innerHTML = "";

  questions[topic].forEach(q => {
    const li = document.createElement("li");
    li.textContent = q;
    list.appendChild(li);
  });

  closeChallengeModal();
  document.getElementById("questionModal").classList.remove("hidden");
}

function closeQuestionModal() {
  document.getElementById("questionModal").classList.add("hidden");
}

const topicDetails = {
  "Introduction": "Learn what HTML is and how web pages are structured                .",
  "Headings & Paragraphs": "Understand how to use headings (h1-h6) and paragraphs.",
  "Forms": "Learn to collect user data using form elements.",
  "Tables": "Organize data into rows and columns with tables.",
  "Media Tags": "Embed images, audio, and video using HTML tags.",
  "Selectors": "Use CSS selectors to target HTML elements.",
  "Box Model": "Understand padding, border, and margin in CSS layout.",
  "Flexbox": "Create responsive layouts using flex containers.",
  "Grid": "Build complex two-dimensional layouts using CSS Grid.",
  "Colors & Fonts": "Style text and background using CSS colors and fonts.",
  "Syntax": "Learn how Python code is structured and interpreted.",
  "Variables": "Store and use data in Python using variables.",
  "Loops": "Repeat code using 'for' and 'while' loops.",
  "Functions": "Group logic together into reusable blocks."
};

function showTopicDetail(topic) {
  const modal = document.getElementById("topicDetailModal");
  const text = document.getElementById("topicDetailText");
  text.textContent = topicDetails[topic] || "Details coming soon!";
  modal.classList.remove("hidden");
}

function closeTopicDetail() {
  document.getElementById("topicDetailModal").classList.add("hidden");
}

