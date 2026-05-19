const searchInput = document.querySelector("#noteSearch");
const noteCards = document.querySelectorAll(".note-card");
const emptyState = document.querySelector("#emptyState");
const searchCount = document.querySelector("#searchCount");
const themeToggle = document.querySelector("#themeToggle");
const typewriter = document.querySelector("#typewriter");
const counters = document.querySelectorAll("[data-count]");
const revealItems = document.querySelectorAll(".reveal");
const siteBg = document.querySelector("#siteBg");
const bgParticles = document.querySelector("#bgParticles");
const qaInput = document.querySelector("#qaInput");
const qaAsk = document.querySelector("#qaAsk");
const qaClear = document.querySelector("#qaClear");
const qaAnswer = document.querySelector("#qaAnswer");
const questionButtons = document.querySelectorAll("[data-question]");

const savedTheme = localStorage.getItem("aiLearningTheme");

if (savedTheme === "dark") {
  document.body.classList.add("theme-dark");
}

const updateThemeText = () => {
  if (!themeToggle) {
    return;
  }

  themeToggle.textContent = document.body.classList.contains("theme-dark") ? "浅色" : "深色";
};

updateThemeText();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
    localStorage.setItem(
      "aiLearningTheme",
      document.body.classList.contains("theme-dark") ? "dark" : "light"
    );
    updateThemeText();
  });
}

if (searchInput && noteCards.length > 0) {
  const updateSearch = () => {
    const keyword = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    noteCards.forEach((card) => {
      const text = `${card.textContent} ${card.dataset.keywords || ""}`.toLowerCase();
      const isVisible = text.includes(keyword);
      card.style.display = isVisible ? "" : "none";

      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (searchCount) {
      searchCount.textContent = `当前显示 ${visibleCount} 条笔记`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  };

  searchInput.addEventListener("input", updateSearch);
  updateSearch();
}

if (typewriter) {
  const words = ["AI 辅助建站", "本地代码实现", "GitHub Pages 发布", "动态炫酷升级"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const word = words[wordIndex];
    typewriter.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
      charIndex += 1;
      setTimeout(type, 120);
      return;
    }

    if (!deleting && charIndex === word.length) {
      deleting = true;
      setTimeout(type, 1200);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(type, 55);
      return;
    }

    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  };

  type();
}

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 24));

  const tick = () => {
    current = Math.min(target, current + step);
    counter.textContent = current;

    if (current < target) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        entry.target.querySelectorAll("[data-count]").forEach((counter) => {
          if (!counter.dataset.done) {
            counter.dataset.done = "true";
            animateCounter(counter);
          }
        });
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

counters.forEach((counter) => {
  if (!counter.closest(".reveal")) {
    animateCounter(counter);
  }
});

if (siteBg && bgParticles && !siteBg.dataset.ready) {
  siteBg.dataset.ready = "true";

  const leafColors = [
    "rgba(174, 58, 42, 0.78)",
    "rgba(196, 108, 42, 0.76)",
    "rgba(210, 156, 74, 0.78)",
    "rgba(92, 44, 34, 0.7)"
  ];

  for (let i = 0; i < 32; i += 1) {
    const particle = document.createElement("span");
    const size = Math.random() * 10 + 6;
    particle.className = "bg-particle";
    particle.style.width = `${size}px`;
    particle.style.height = `${Math.max(4, size * 0.48)}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.background = leafColors[Math.floor(Math.random() * leafColors.length)];
    particle.style.borderRadius = "80% 20% 70% 30%";
    particle.style.setProperty("--leaf-drift", `${Math.random() * 160 - 80}px`);
    particle.style.animationDuration = `${Math.random() * 12 + 12}s`;
    particle.style.animationDelay = `${Math.random() * 14}s`;
    bgParticles.appendChild(particle);
  }

  for (let i = 0; i < 58; i += 1) {
    const snow = document.createElement("span");
    const size = Math.random() * 3 + 1;
    snow.className = "bg-snow";
    snow.style.width = `${size}px`;
    snow.style.height = `${size}px`;
    snow.style.left = `${Math.random() * 100}%`;
    snow.style.setProperty("--snow-drift", `${Math.random() * 90 - 45}px`);
    snow.style.animationDuration = `${Math.random() * 12 + 10}s`;
    snow.style.animationDelay = `${Math.random() * 12}s`;
    bgParticles.appendChild(snow);
  }
}

const localKnowledgeBase = [
  {
    title: "GitHub 是什么？",
    keywords: ["github", "仓库", "代码", "开源", "star", "fork"],
    answer:
      "GitHub 是一个保存代码、管理项目、查找开源资源和发布网站的平台。我用 GitHub 保存 ai-learning-site 网站文件，并通过 GitHub Pages 把网站发布成可以访问的网址。"
  },
  {
    title: "Codex 是什么？",
    keywords: ["codex", "ai 编程", "写代码", "改代码"],
    answer:
      "Codex 是会写代码、改代码、解释代码的 AI 编程助手。它适合帮助新手拆解任务、生成网页代码、解释错误，并一步步优化项目。"
  },
  {
    title: "Gemini CLI 是什么？",
    keywords: ["gemini", "gemini cli", "命令行"],
    answer:
      "Gemini CLI 是用命令行和 Gemini AI 对话的工具。我学会了安装 Node.js、修复 PowerShell 执行策略问题，并成功启动 Gemini CLI。"
  },
  {
    title: "OpenClaw 有什么用？",
    keywords: ["openclaw", "gateway", "dashboard", "网关"],
    answer:
      "OpenClaw 是一个本地 AI 网关，可以连接不同模型提供商，并通过 Dashboard 进行聊天测试。我已完成 Gateway、Dashboard 和模型配置。"
  },
  {
    title: "DeepSeek V4 Flash 是什么？",
    keywords: ["deepseek", "v4", "flash", "模型"],
    answer:
      "DeepSeek V4 Flash 是我在 OpenClaw 中接入的 AI 模型，用来完成聊天测试和后续代码辅助。它让 OpenClaw 可以通过 API Key 调用模型回答问题。"
  },
  {
    title: "教学卡片 1 学到了什么？",
    keywords: ["教学卡片 1", "卡片1", "打开那扇门", "科学上网", "数字基础设施", "海外账号"],
    answer:
      "教学卡片 1 的核心是建立数字基础设施，包括科学上网、海外账号、浏览器插件、网络检测工具和国际支付认知。它的本质不是只学某个工具，而是学会进入全球信息环境。"
  },
  {
    title: "教学卡片 2 学到了什么？",
    keywords: ["教学卡片 2", "卡片2", "认识你的新同事", "提示词", "markdown", "json", "ai 工具"],
    answer:
      "教学卡片 2 的核心是认识 AI 工具体系，并学会指挥 AI。重点包括提示词、Markdown、JSON、GitHub、Notion、Obsidian 和个人知识管理。"
  },
  {
    title: "教学卡片 3 学到了什么？",
    keywords: ["教学卡片 3", "卡片3", "api", "http", "rag", "知识库", "多模态", "工作流", "comfyui"],
    answer:
      "教学卡片 3 的核心是从使用 AI 走向调用 AI。重点包括 HTTP 请求、API、多模态内容生成、ComfyUI 节点式工作流、RAG、向量空间和知识库。"
  },
  {
    title: "这个网站是怎么上线的？",
    keywords: ["上线", "github pages", "发布", "网址", "部署"],
    answer:
      "这个网站先在本地生成 index.html、notes.html、about.html、achievements.html、qa.html、style.css 和 script.js，然后上传到 GitHub 仓库，最后用 GitHub Pages 发布上线。"
  },
  {
    title: "我的联系方式是什么？",
    keywords: ["联系", "邮箱", "email", "jason"],
    answer:
      "我的联系邮箱是 fangjiaguode@gmail.com。这个网站主题是“我的 AI 学习过程”，用来展示学习成果、项目过程和 AI 工具实践。"
  }
];

const answerQuestion = (question) => {
  if (!qaAnswer) {
    return;
  }

  const text = question.trim().toLowerCase();

  if (!text) {
    qaAnswer.innerHTML = `
      <p class="eyebrow">Answer</p>
      <h2>请先输入一个问题</h2>
      <p>例如：GitHub 是什么？教学卡片 3 学到了什么？OpenClaw 有什么用？</p>
    `;
    return;
  }

  const matched = localKnowledgeBase
    .map((item) => {
      const score = item.keywords.reduce((total, keyword) => {
        return text.includes(keyword.toLowerCase()) ? total + 1 : total;
      }, 0);
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score)[0];

  if (!matched || matched.score === 0) {
    qaAnswer.innerHTML = `
      <p class="eyebrow">Answer</p>
      <h2>暂时没有找到答案</h2>
      <p>可以换个关键词试试，例如：GitHub、OpenClaw、DeepSeek、教学卡片 1、API、RAG、GitHub Pages。</p>
    `;
    return;
  }

  qaAnswer.innerHTML = `
    <p class="eyebrow">Answer</p>
    <h2>${matched.title}</h2>
    <p>${matched.answer}</p>
  `;
};

if (qaInput && qaAsk) {
  qaAsk.addEventListener("click", () => answerQuestion(qaInput.value));

  qaInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      answerQuestion(qaInput.value);
    }
  });
}

if (qaClear && qaInput && qaAnswer) {
  qaClear.addEventListener("click", () => {
    qaInput.value = "";
    answerQuestion("");
    qaInput.focus();
  });
}

questionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question || "";

    if (qaInput) {
      qaInput.value = question;
    }

    answerQuestion(question);
  });
});
