/* ==========================================================================
   Main Lifecycle & Initialization
   ========================================================================== */
window.addEventListener('load', () => {
    // Cinematic Preloader Sequence
    setTimeout(() => {
        document.body.classList.add('page-loaded');
        
        // Remove preloading class to restore scroll
        setTimeout(() => {
            document.body.classList.remove('preloading');
        }, 1000); // Wait for transition to finish
    }, 2800); // Wait for letters and progress bar to finish
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Icons
    lucide.createIcons();
    
    // 2. Core Features
    initThemeToggle();
    initLocalClock();
    renderProjects();
    generateContributionHeatmap();
    initMobileNav();
    initChatWidget();
    initVisitorCounter();
    initRandomQuote();
});

/* ==========================================================================
   Theme Switching Engine
   ========================================================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Read stored preference, fallback to dark theme
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark-theme";
    body.className = savedTheme;

    themeToggle.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.classList.replace("dark-theme", "light-theme");
            localStorage.setItem("portfolio-theme", "light-theme");
        } else {
            body.classList.replace("light-theme", "dark-theme");
            localStorage.setItem("portfolio-theme", "dark-theme");
        }
    });
}

/* ==========================================================================
   Indian Standard Time (IST) Clock
   ========================================================================== */
function initLocalClock() {
    const clockElement = document.getElementById("local-time");
    
    function updateClock() {
        try {
            const options = {
                timeZone: 'Asia/Kolkata',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            };
            const formatter = new Intl.DateTimeFormat('en-US', options);
            const timeString = formatter.format(new Date()).toLowerCase();
            clockElement.textContent = `${timeString} IST`;
        } catch (e) {
            // Fallback to client browser local time if timeZone option fails
            const d = new Date();
            let hours = d.getHours();
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            clockElement.textContent = `${hours}:${minutes} ${ampm} Local`;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* ==========================================================================
   Mobile Navigation Hamburger
   ========================================================================== */
function initMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    navToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        const isOpen = navbar.classList.contains("active");
        navToggle.innerHTML = isOpen ? `<i data-lucide="x"></i>` : `<i data-lucide="menu"></i>`;
        lucide.createIcons();
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbar.classList.contains("active")) {
                navbar.classList.remove("active");
                navToggle.innerHTML = `<i data-lucide="menu"></i>`;
                lucide.createIcons();
            }
        });
    });
}

/* ==========================================================================
   Dynamic Project Showcase Mapping
   ========================================================================== */
const projectsData = [
    {
        title: "Resume Analysis Tool using NLP",
        description: "An NLP pipeline featuring text pre-processing and TF-IDF vectorization. Compares resumes with job descriptions using Cosine Similarity metrics, served via an interactive Streamlit UI dashboard.",
        tags: ["Python", "Scikit-learn", "TF-IDF", "Cosine Similarity", "Streamlit"],
        github: "https://github.com/Shhhreyaaa/AI-Resume_Roaster",
        featured: true
    },
    {
        title: "IPL First Innings Score Predictor",
        description: "Built a regression model utilizing Random Forest algorithms. Evaluated using RMSE, this model dynamically predicts first innings cricket scores using real-time match state features.",
        tags: ["Python", "Random Forest", "Scikit-learn", "Flask", "Pandas"],
        github: "https://github.com/Shhhreyaaa/IPL_Score_Predictor",
        featured: false
    },
    {
        title: "Customer Satisfaction Prediction",
        description: "Analyzed structured client historical records, executing detailed data prep and cleaning. Deployed classification algorithms through a Flask interface to predict levels of user satisfaction.",
        tags: ["Python", "Scikit-learn", "Pandas", "Flask", "Model Evaluation"],
        github: "https://github.com/Shhhreyaaa/Customer-satisfaction-prediction",
        featured: false
    },
    {
        title: "Indian Food Recipe Explorer",
        description: "A functional data explorer that charts recipe items categorized by regional origin, ingredients profiles, and meal diet rules using Matplotlib visual indicators and Streamlit.",
        tags: ["Python", "Streamlit", "Pandas", "Data Visualization"],
        github: "https://github.com/Shhhreyaaa/Indian-Food-Explorer",
        featured: false
    },
    {
        title: "gemini-cli-gsoc",
        description: "Designed a command-line terminal shell wrapper program in TypeScript. Integrates Google's Gemini LLM developer API endpoints to allow prompt queries directly from terminal windows.",
        tags: ["TypeScript", "NodeJS", "Google Gemini API", "CLI Development"],
        github: "https://github.com/Shhhreyaaa/gemini-cli-gsoc",
        featured: false
    }
];

function getTechIcon(tag) {
    const key = tag.toLowerCase().trim();
    if (key.includes("python")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14"><path d="M11.93 1.01c-2.45 0-4.3.17-5.5.5-.96.26-1.58.74-1.9 1.47-.35.8-.33 1.83-.33 3v2h8v1H4.23c-1.32 0-2.3.26-2.92.83C.68 9.38.5 10.36.5 11.83c0 1.54.2 2.5.88 3.09.6.53 1.53.58 2.85.58h1.77v-2.5c0-1.5 1-2.5 2.5-2.5h5v-2h-8V6.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5-.67 1.5-1.5v-1c0-1.1-.03-2.1-.38-2.9-.3-.66-.88-1.1-1.83-1.37-1-.3-2.42-.22-4.37-.22z" fill="#3776AB"/><path d="M12.07 22.99c2.45 0 4.3-.17 5.5-.5.96-.26 1.58-.74 1.9-1.47.35-.8.33-1.83.33-3v-2h-8v-1h7.97c1.32 0 2.3-.26 2.92-.83.63-.57.81-1.55.81-3.02 0-1.54-.2-2.5-.88-3.09-.6-.53-1.53-.58-2.85-.58H18v2.5c0 1.5-1 2.5-2.5 2.5h-5v2h8v2c0 .83-.67 1.5-1.5 1.5h-5c-.83 0-1.5.67-1.5 1.5v1c0 1.1.03 2.1.38 2.9.3.66.88 1.1 1.83 1.37 1 .3 2.42.22 4.37.22z" fill="#FFD343"/><circle cx="9" cy="3.5" r="0.75" fill="#fff"/><circle cx="15" cy="20.5" r="0.75" fill="#fff"/></svg>`;
    }
    if (key.includes("typescript")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="#3178C6"><rect width="24" height="24" rx="3"/><path d="M20 18.2c-.4.7-.9 1.2-1.7 1.5-.7.3-1.6.4-2.5.4-1.2 0-2.2-.3-2.9-.9-.7-.6-1.1-1.5-1.1-2.7h2.2c0 .7.2 1.2.5 1.5.3.3.8.5 1.4.5.5 0 1-.1 1.2-.4.3-.3.4-.6.4-1 0-.4-.1-.7-.4-.9-.3-.2-.7-.4-1.4-.7l-1-.4c-1.1-.4-1.9-.9-2.4-1.5-.5-.6-.7-1.4-.7-2.3 0-1.1.4-2 1.1-2.6.7-.6 1.7-.9 2.9-.9 1.1 0 2 .2 2.7.7.7.5 1.1 1.2 1.3 2.2h-2.2c-.1-.5-.3-.9-.6-1.1-.3-.2-.7-.3-1.2-.3-.5 0-.9.1-1.1.3-.3.2-.4.5-.4.8 0 .3.1.5.3.7.2.2.6.3 1.2.6l1 .4c1.3.5 2.1 1.1 2.6 1.8.5.7.8 1.5.8 2.5 0 1.1-.3 2-1 2.7zm-9.3-9.1v1.8H7.9v8.5H5.7v-8.5H3v-1.8h7.7z" fill="#ffffff"/></svg>`;
    }
    if (key.includes("scikit-learn") || key.includes("scikit")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#F8981D" stroke-width="2"><circle cx="6" cy="18" r="3" fill="#F8981D"/><circle cx="18" cy="6" r="3" fill="#3776AB"/><line x1="8.5" y1="15.5" x2="15.5" y2="8.5" stroke="#a0a0a0" stroke-width="1.5"/></svg>`;
    }
    if (key.includes("pandas")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#150458" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#150458"/><line x1="9" y1="3" x2="9" y2="21" stroke="#150458" stroke-width="1.5"/><line x1="15" y1="3" x2="15" y2="21" stroke="#150458" stroke-width="1.5"/><line x1="3" y1="9" x2="21" y2="9" stroke="#150458" stroke-width="1.5"/><line x1="3" y1="15" x2="21" y2="15" stroke="#150458" stroke-width="1.5"/></svg>`;
    }
    if (key.includes("flask")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6M10 3v3M14 3v3M7 21h10a2 2 0 0 0 2-2.3L16 7H8L5.1 18.7A2 2 0 0 0 7 21z"/></svg>`;
    }
    if (key.includes("streamlit")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="#FF4B4B"><path d="M12 2L2 22h20L12 2zm0 4.8l7.2 12.4H4.8L12 6.8z"/></svg>`;
    }
    if (key.includes("nodejs") || key.includes("node")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="#339933"><path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2z"/></svg>`;
    }
    if (key.includes("gemini")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="#1A73E8"><path d="M12 2a1 1 0 0 1 .897.553l1.834 3.716 4.101.596a1 1 0 0 1 .554 1.706l-2.968 2.893.7 4.084a1 1 0 0 1-1.451 1.054L12 18.63l-3.667 1.928a1 1 0 0 1-1.451-1.054l.7-4.084-2.968-2.893a1 1 0 0 1 .554-1.706l4.101-.596 1.834-3.716A1 1 0 0 1 12 2z"/></svg>`;
    }
    if (key.includes("random forest") || key.includes("forest")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#228B22" stroke-width="2"><path d="M12 2L8 8h3v6H9v4h6v-4h-2V8h3L12 2z"/></svg>`;
    }
    if (key.includes("visualization")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#00BCD4" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`;
    }
    if (key.includes("cli")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FF5722" stroke-width="2"><path d="m5 9 4 3-4 3M11 15h8"/></svg>`;
    }
    if (key.includes("evaluation") || key.includes("eval")) {
        return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#4CAF50" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
    }
    return `<svg class="proj-tag-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#9C27B0" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>`;
}

function renderProjects() {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";

    projectsData.forEach(p => {
        const card = document.createElement("div");
        card.className = `project-card card ${p.featured ? 'featured' : ''}`;

        const tagsHTML = p.tags.map(t => `
            <span class="proj-tag">
                ${getTechIcon(t)}
                <span>${t}</span>
            </span>
        `).join("");

        card.innerHTML = `
            <div class="project-header-row">
                <div class="folder-icon">
                    <i data-lucide="folder"></i>
                </div>
                <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="repo-link">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    <span>Repo</span>
                </a>
            </div>
            <div class="project-body">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });

    // Re-create icons for folders and repo links
    lucide.createIcons();
}

/* ==========================================================================
   GitHub Contributions Heatmap Simulation Grid
   ========================================================================== */
/* ==========================================================================
   GitHub Contributions Heatmap Engine (Live Fetch & Fallback)
   ========================================================================== */
async function generateContributionHeatmap() {
    const grid = document.getElementById("heatmap-grid");
    if (!grid) return;
    grid.innerHTML = "";
    
    const username = "Shhhreyaaa";
    try {
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json?flat=true`);
        if (!response.ok) throw new Error("Failed to fetch contribution data");
        const data = await response.json();
        
        const contributions = data.contributions;
        if (!contributions || contributions.length === 0) throw new Error("No contributions found");
        
        // Align the grid to start on a Sunday
        let startIndex = 0;
        while (startIndex < contributions.length) {
            const date = new Date(contributions[startIndex].date);
            if (date.getUTCDay() === 0) {
                break;
            }
            startIndex++;
        }
        
        const displayContributions = contributions.slice(startIndex);
        const total = data.totalContributions || 0;
        
        // Update total text
        const countTextNode = document.querySelector(".contributions-count");
        if (countTextNode) {
            countTextNode.innerHTML = `<strong id="contrib-total">${total}</strong> contributions in the last year`;
        } else {
            const totalEl = document.getElementById("contrib-total");
            if (totalEl) totalEl.textContent = total;
        }
        
        // Map API contribution levels to CSS classes
        const levelMap = {
            "NONE": 0,
            "FIRST_QUARTILE": 1,
            "SECOND_QUARTILE": 2,
            "THIRD_QUARTILE": 3,
            "FOURTH_QUARTILE": 4
        };
        
        // Append cells to grid
        displayContributions.forEach(day => {
            const cell = document.createElement("div");
            const levelKey = (day.contributionLevel || "NONE").toUpperCase();
            const level = levelMap[levelKey] !== undefined ? levelMap[levelKey] : 0;
            
            cell.className = `heatmap-cell level-${level}`;
            
            // Format tooltip text for hover interaction
            const formattedDate = new Date(day.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric"
            });
            cell.setAttribute("title", `${day.contributionCount} contributions on ${formattedDate}`);
            
            grid.appendChild(cell);
        });
        
    } catch (error) {
        console.warn("GitHub Heatmap Fetch failed, falling back to simulation:", error);
        generateMockContributionHeatmap();
    }
}

function generateMockContributionHeatmap() {
    const grid = document.getElementById("heatmap-grid");
    if (!grid) return;
    grid.innerHTML = "";
    
    const cellCount = 53 * 7;
    let currentSum = 0;
    const cellsData = [];

    for (let i = 0; i < cellCount; i++) {
        let level = 0;
        const colIndex = Math.floor(i / 7);
        const rand = Math.random();
        
        if (colIndex > 5 && colIndex < 15) {
            level = rand < 0.2 ? 0 : rand < 0.5 ? 1 : rand < 0.75 ? 2 : rand < 0.92 ? 3 : 4;
        } else if (colIndex > 25 && colIndex < 38) {
            level = rand < 0.15 ? 0 : rand < 0.4 ? 1 : rand < 0.7 ? 2 : rand < 0.9 ? 3 : 4;
        } else {
            level = rand < 0.65 ? 0 : rand < 0.85 ? 1 : rand < 0.95 ? 2 : 3;
        }

        const contributionWeight = level === 0 ? 0 : level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 5 : 8;
        currentSum += contributionWeight;
        cellsData.push(level);
    }

    const countTextNode = document.querySelector(".contributions-count");
    if (countTextNode) {
        countTextNode.innerHTML = `<strong id="contrib-total">${currentSum}</strong> contributions in 2026`;
    } else {
        const totalEl = document.getElementById("contrib-total");
        if (totalEl) totalEl.textContent = currentSum;
    }

    cellsData.forEach(lvl => {
        const cell = document.createElement("div");
        cell.className = `heatmap-cell level-${lvl}`;
        grid.appendChild(cell);
    });
}

/* ==========================================================================
   Quick Message Chat Simulation
   ========================================================================== */
function initChatWidget() {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");

    // Quick Message Suggestion Pills
    const quickMsgBtns = document.querySelectorAll(".quick-msg-btn");
    quickMsgBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            chatInput.value = btn.textContent.trim();
            chatForm.dispatchEvent(new Event("submit", { cancelable: true }));
        });
    });

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        // Append Sent Message bubble
        appendChatBubble(messageText, "sent", "now");
        chatInput.value = "";
        
        // Scroll body
        chatBody.scrollTop = chatBody.scrollHeight;

        // Simulate reply after a short delay
        setTimeout(() => {
            const replyText = "Awesome! Let me open an email draft so you can send that over 🚀";
            appendChatBubble(replyText, "received", "now");
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Redirect to Mailto after brief pause
            setTimeout(() => {
                const subject = encodeURIComponent("Portfolio Message from visitor");
                const body = encodeURIComponent(`Hi Shreya,\n\nI visited your portfolio and wanted to reach out regarding:\n\n"${messageText}"\n\nBest regards,\n[Your Name]`);
                window.location.href = `mailto:shreyasomi775@gmail.com?subject=${subject}&body=${body}`;
            }, 1200);

        }, 1000);
    });

    function appendChatBubble(text, side, time) {
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${side}`;
        
        bubble.innerHTML = `
            <div class="bubble-content">${escapeHTML(text)}</div>
            <span class="bubble-time">${time}</span>
        `;
        
        chatBody.appendChild(bubble);
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

/* ==========================================================================
   Visitor Counter Logic
   ========================================================================== */
function initVisitorCounter() {
    const visitorVal = document.getElementById('visitor-count-val');
    const visitorSuffix = document.getElementById('visitor-suffix');
    if (!visitorVal || !visitorSuffix) return;

    let count = localStorage.getItem('portfolio_visitor_count');
    if (!count) {
        count = 627;
        localStorage.setItem('portfolio_visitor_count', count);
    } else {
        if (!sessionStorage.getItem('portfolio_visited')) {
            count = parseInt(count) + 1;
            localStorage.setItem('portfolio_visitor_count', count);
            sessionStorage.setItem('portfolio_visited', 'true');
        }
    }
    visitorVal.textContent = count;
    
    // Dynamic ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (i) => {
        let j = i % 10, k = i % 100;
        if (j == 1 && k != 11) return "st";
        if (j == 2 && k != 12) return "nd";
        if (j == 3 && k != 13) return "rd";
        return "th";
    };
    visitorSuffix.textContent = getOrdinalSuffix(parseInt(count));
}

/* ==========================================================================
   Random Tech Quotes Engine
   ========================================================================== */
function initRandomQuote() {
    const quoteText = document.getElementById('random-quote-text');
    const quoteAuthor = document.getElementById('random-quote-author');
    if (!quoteText || !quoteAuthor) return;

    const quotes = [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            author: "Martin Fowler"
        },
        {
            text: "First, solve the problem. Then, write the code.",
            author: "John Johnson"
        },
        {
            text: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci"
        },
        {
            text: "Talk is cheap. Show me the code.",
            author: "Linus Torvalds"
        },
        {
            text: "Design is not just what it looks like and feels like. Design is how it works.",
            author: "Steve Jobs"
        },
        {
            text: "Software is a great combination between artistry and engineering.",
            author: "Bill Gates"
        },
        {
            text: "Make it simple, but significant.",
            author: "Don Draper"
        },
        {
            text: "Computers are useless. They can only give you answers.",
            author: "Pablo Picasso"
        },
        {
            text: "The best error message is the one that never shows up.",
            author: "Thomas Fuchs"
        }
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    // Smooth transition
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';

    setTimeout(() => {
        quoteText.textContent = `"${selectedQuote.text}"`;
        quoteAuthor.textContent = `— ${selectedQuote.author}`;
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 150);
}
