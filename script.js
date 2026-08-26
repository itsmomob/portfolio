// ─── CLOCK ───
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 10000);

// ─── COLLAGE ITEMS ───
const collageItems = [
    { id: 'iate', label: 'IATE Sketches', sub: 'Luxembourg · 2025', icon: 'images/iate-sketch-1.jpg', folder: 'work' },
    { id: 'hanabee', label: 'HanaBee', sub: 'Tuscany · 2024', icon: 'images/hanabee-brand-1.jpg', folder: 'work' },
    { id: 'polo', label: 'Polo Positivo', sub: 'Remote · 2017-2023', icon: 'images/polo-positivo-1.jpg', folder: 'work' },
    { id: 'cactus', label: 'Cactus Magazine', sub: 'Milan · 2023', icon: 'images/cactus-magazine-1.jpg', folder: 'work' },
    { id: 'coffee', label: 'Coffee Table Books', sub: 'Remote · Ongoing', icon: 'images/coffee-table-book-1.jpg', folder: 'work' },
    { id: 'vlog', label: 'Vlog Seoul', sub: 'Seoul · 2024', icon: 'images/vlog-seoul.jpg', folder: 'work' },
    { id: 'newsletter', label: 'Monthly Newsletter', sub: 'Remote · Ongoing', icon: 'images/newsletter-issue.jpg', folder: 'work' },
    { id: 'crossword', label: 'Crossword Gift', sub: 'Remote · 2021', icon: 'images/crossword-gift.jpg', folder: 'work' },
    { id: 'album', label: 'Album Moodboard', sub: 'Milan · 2023', icon: 'images/album-moodboard.jpg', folder: 'work' },
    { id: 'stretching', label: 'Stretching Poster', sub: 'Luxembourg · 2024', icon: 'images/stretching-poster.jpg', folder: 'work' },
    { id: 'tomato', label: 'Tomato Poster', sub: 'Luxembourg · 2024', icon: 'images/tomato-poster.jpg', folder: 'work' }
];

// ─── SKILL ITEMS ───
const skillItems = [
    { id: 'excel', label: 'Excel', icon: '📊' },
    { id: 'canva', label: 'Canva', icon: '🎨' },
    { id: 'figma', label: 'Figma', icon: '🖌️' },
    { id: 'wordpress', label: 'WordPress', icon: '🌐' },
    { id: 'capcut', label: 'CapCut', icon: '✂️' },
    { id: 'meta', label: 'Meta', icon: '📱' },
    { id: 'htmlcss', label: 'HTML/CSS', icon: '💻' },
    { id: 'github', label: 'GitHub', icon: '🐙' },
    { id: 'google', label: 'Google', icon: '📁' },
    { id: 'office', label: 'Office', icon: '🖥️' },
    { id: 'appscript', label: 'AppsScript', icon: '⚡' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
];

// ─── STORAGE ───
const COLLAGE_STORAGE_KEY = 'monica_collage_positions';

function loadPositions() {
    try {
        const data = localStorage.getItem(COLLAGE_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
}

function savePositions(positions) {
    try {
        localStorage.setItem(COLLAGE_STORAGE_KEY, JSON.stringify(positions));
    } catch (e) {}
}

// ─── GENERATE COLLAGE ───
function generateCollage() {
    const area = document.getElementById('collageArea');
    if (!area) return;
    area.innerHTML = '';

    const desktop = document.getElementById('desktop');
    const rect = desktop.getBoundingClientRect();
    const W = rect.width || window.innerWidth;
    const H = rect.height || window.innerHeight;

    const sidebarWidth = window.innerWidth <= 480 ? 68 : window.innerWidth <= 768 ? 92 : 130;
    const availW = W - sidebarWidth - 24;
    const availH = H - 70;

    const savedPositions = loadPositions();

    const shuffled = collageItems.map((item) => ({
        ...item,
        w: 80 + Math.random() * 20,
        h: 80 + Math.random() * 20,
        rotation: (Math.random() - 0.5) * 4,
        x: 0,
        y: 0
    }));

    const placed = [];

    shuffled.forEach((item) => {
        const sw = Math.min(item.w, 100);
        const sh = Math.min(item.h, 100);

        let x, y;

        const saved = savedPositions[item.id];
        if (saved && saved.x !== undefined && saved.y !== undefined &&
            saved.x + sw <= availW && saved.y + sh <= availH) {
            x = saved.x;
            y = saved.y;
        } else {
            let attempts = 0;
            let placedOk = false;

            while (!placedOk && attempts < 200) {
                x = 8 + Math.random() * (availW - sw - 16);
                y = 8 + Math.random() * (availH - sh - 16);
                let overlap = false;

                for (const p of placed) {
                    if (x < p.x + p.w + 6 && x + sw + 6 > p.x &&
                        y < p.y + p.h + 6 && y + sh + 6 > p.y) {
                        overlap = true;
                        break;
                    }
                }

                if (!overlap) {
                    placedOk = true;
                }
                attempts++;
            }

            if (!placedOk) {
                x = 8 + Math.random() * (availW - sw - 16);
                y = 8 + Math.random() * (availH - sh - 16);
            }
        }

        item.x = x;
        item.y = y;
        placed.push({ x, y, w: sw, h: sh });

        const el = document.createElement('div');
        el.className = 'collage-item';
        el.dataset.id = item.id;
        el.dataset.folder = item.folder || 'work';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.width = sw + 'px';
        el.style.height = sh + 'px';
        el.style.transform = `rotate(${item.rotation}deg)`;
        el.dataset.left = x;
        el.dataset.top = y;

        const iconDiv = document.createElement('div');
        iconDiv.className = 'item-icon';
        const img = document.createElement('img');
        img.src = item.icon;
        img.alt = item.label;
        img.loading = 'lazy';
        img.onerror = function() {
            iconDiv.textContent = '📄';
            iconDiv.style.fontSize = '24px';
        };
        iconDiv.appendChild(img);
        el.appendChild(iconDiv);

        const label = document.createElement('div');
        label.className = 'item-label';
        label.textContent = item.label;
        el.appendChild(label);

        if (item.sub) {
            const sub = document.createElement('div');
            sub.className = 'item-sub';
            sub.textContent = item.sub;
            el.appendChild(sub);
        }

        el.addEventListener('click', function(e) {
            if (!e.target.closest('.dragging')) {
                switchFolder(item.folder || 'work');
            }
        });

        area.appendChild(el);
    });
}

// ─── GENERATE SKILLS SIDEBAR ───
function generateSkills() {
    const sidebar = document.getElementById('skillsSidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';

    skillItems.forEach((item) => {
        const el = document.createElement('div');
        el.className = 'skill-item';
        el.innerHTML = `
            <span class="skill-emoji">${item.icon}</span>
            <span class="skill-label">${item.label}</span>
        `;
        el.addEventListener('click', function() {
            switchFolder('skills');
        });
        sidebar.appendChild(el);
    });
}

// ─── DRAG LOGIC ───
let dragData = null;

function initDrag(e, item) {
    const rect = item.getBoundingClientRect();
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    dragData = {
        el: item,
        offsetX: clientX - rect.left,
        offsetY: clientY - rect.top,
        startX: clientX,
        startY: clientY,
        hasDragged: false
    };

    item.classList.add('dragging');
    item.style.zIndex = 100;

    if (e.type === 'touchstart') {
        e.preventDefault();
    }
}

function moveDrag(e) {
    if (!dragData) return;

    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    const dx = clientX - dragData.startX;
    const dy = clientY - dragData.startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragData.hasDragged = true;
    }

    const currentLeft = parseFloat(dragData.el.dataset.left) || 0;
    const currentTop = parseFloat(dragData.el.dataset.top) || 0;

    let newX = currentLeft + dx;
    let newY = currentTop + dy;

    const area = document.getElementById('collageArea');
    const rect = area.getBoundingClientRect();
    const elW = parseFloat(dragData.el.style.width) || 80;
    const elH = parseFloat(dragData.el.style.height) || 80;

    newX = Math.max(0, Math.min(newX, rect.width - elW));
    newY = Math.max(0, Math.min(newY, rect.height - elH));

    dragData.el.style.left = newX + 'px';
    dragData.el.style.top = newY + 'px';
    dragData.el.dataset.left = newX;
    dragData.el.dataset.top = newY;

    dragData.startX = clientX;
    dragData.startY = clientY;

    if (e.type === 'touchmove') {
        e.preventDefault();
    }
}

function endDrag(e) {
    if (!dragData) return;

    dragData.el.classList.remove('dragging');

    if (dragData.hasDragged) {
        const positions = loadPositions();
        const id = dragData.el.dataset.id;
        const left = parseFloat(dragData.el.dataset.left) || 0;
        const top = parseFloat(dragData.el.dataset.top) || 0;
        positions[id] = { x: left, y: top };
        savePositions(positions);
    }

    setTimeout(() => {
        if (dragData) {
            dragData.el.style.zIndex = '';
        }
    }, 100);

    dragData = null;
}

// ─── MOUSE DRAG ───
document.addEventListener('mousedown', function(e) {
    const item = e.target.closest('.collage-item');
    if (item) {
        initDrag(e, item);
    }
});

document.addEventListener('mousemove', function(e) {
    if (dragData) {
        moveDrag(e);
    }
});

document.addEventListener('mouseup', function(e) {
    if (dragData) {
        endDrag(e);
    }
});

// ─── TOUCH DRAG ───
document.addEventListener('touchstart', function(e) {
    const item = e.target.closest('.collage-item');
    if (item) {
        initDrag(e, item);
    }
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (dragData) {
        moveDrag(e);
    }
}, { passive: false });

document.addEventListener('touchend', function(e) {
    if (dragData) {
        endDrag(e);
    }
}, { passive: true });

// ─── WINDOW DRAG ───
let windowDragData = null;

document.addEventListener('mousedown', function(e) {
    const header = e.target.closest('.window-header');
    if (!header) return;
    const win = header.closest('.window');
    if (!win || !win.classList.contains('open')) return;

    const rect = win.getBoundingClientRect();
    windowDragData = {
        win: win,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        startX: rect.left,
        startY: rect.top
    };
    e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
    if (!windowDragData) return;

    const desktop = document.getElementById('desktop');
    const dRect = desktop.getBoundingClientRect();

    let newX = e.clientX - dRect.left - windowDragData.offsetX;
    let newY = e.clientY - dRect.top - windowDragData.offsetY;

    const winRect = windowDragData.win.getBoundingClientRect();
    newX = Math.max(0, Math.min(newX, dRect.width - winRect.width));
    newY = Math.max(0, Math.min(newY, dRect.height - winRect.height));

    windowDragData.win.style.left = newX + 'px';
    windowDragData.win.style.top = newY + 'px';
    windowDragData.win.style.transform = 'none';
});

document.addEventListener('mouseup', function(e) {
    if (windowDragData) {
        windowDragData = null;
    }
});

// ─── WINDOW FUNCTIONS ───
function closeWindow() {
    const win = document.getElementById('mainWindow');
    win.classList.add('closing');
    setTimeout(() => {
        win.classList.remove('open', 'closing');
        win.style.transform = '';
        win.style.left = '';
        win.style.top = '';
    }, 200);
}

function openWindow() {
    const win = document.getElementById('mainWindow');
    win.classList.remove('closing');
    win.style.transform = '';
    win.style.left = '';
    win.style.top = '';
    win.classList.add('open');
}

// ─── SWITCH FOLDER ───
let mapInitialized = false;
let mapInstance = null;

function switchFolder(folder) {
    document.querySelectorAll('.taskbar-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.folder === folder);
    });

    const titles = {
        work: 'Work — Projects & Case Studies',
        map: 'Journey Map — Where I\'ve Been',
        experience: 'Experience — Professional History',
        approach: 'Approach — How I Think',
        skills: 'Skills & Tools',
        about: 'About Monica',
        contact: 'Contact'
    };
    document.getElementById('windowTitle').textContent = titles[folder] || 'File';

    const body = document.getElementById('windowBody');
    const content = getFolderContent(folder);
    body.innerHTML = content;

    openWindow();

    if (folder === 'map') {
        setTimeout(initMap, 400);
    }

    if (folder !== 'map' && mapInstance) {
        mapInstance.remove();
        mapInstance = null;
        mapInitialized = false;
    }
}

// ─── FOLDER CONTENT ───
function getFolderContent(folder) {
    const contents = {
        work: `
            <h1>Selected Work</h1>
            <p style="color: #7a6a5a; margin-bottom: 16px;">Problems I know how to solve — and the evidence that I can.</p>

            <div class="work-item featured">
                <div class="work-meta">
                    <span class="work-tag">International Communication</span>
                    <span class="work-org">European Parliament · 2024–2025</span>
                </div>
                <h3>Communicating Across Languages, Institutions and Audiences</h3>
                <p>As a Communication Trainee in Luxembourg, I managed website content, digital presence, and social media for the Terminology Coordination Unit. I contributed UI/UX consultancy to the redesign of IATE—the EU's flagship terminology database—and handled copyright compliance for multilingual publications.</p>
                <ul class="work-outcomes">
                    <li>Redesigned institutional communication workflows</li>
                    <li>Contributed to a multilingual platform used daily by thousands of professionals</li>
                    <li>Managed content across 24 languages</li>
                </ul>
                <div class="work-skills">
                    <span>Institutional Communication</span>
                    <span>UI/UX Consultancy</span>
                    <span>Multilingual Content</span>
                    <span>Digital Strategy</span>
                </div>
            </div>

            <div class="work-item">
                <div class="work-meta">
                    <span class="work-tag">Narrative & Strategy</span>
                    <span class="work-org">Master's Research · 2023</span>
                </div>
                <h3>How Media Narratives Shape Perceptions of Korea</h3>
                <p>My master's thesis examined how media representations of South Korea construct an idealised image—exploring fandom studies, parasocial relationships, and communication strategies that have positioned Korea prominently in the global market.</p>
                <ul class="work-outcomes">
                    <li>Analysis of media representation and narrative construction</li>
                    <li>Understanding how communication influences public perception</li>
                    <li>Relevant to international organisations engaging with Korea</li>
                </ul>
                <div class="work-skills">
                    <span>Media Analysis</span>
                    <span>Fandom Studies</span>
                    <span>Communication Theory</span>
                    <span>Narrative Strategy</span>
                </div>
            </div>

            <div class="work-item">
                <div class="work-meta">
                    <span class="work-tag">Brand & Communication Strategy</span>
                    <span class="work-org">Independent · 2023–present</span>
                </div>
                <h3>Building Identities and Communication Systems</h3>
                <p>Created full brand identities and communication strategies for a Tuscan honey producer, a restaurant magazine, and a wellness studio. Each project involved strategic positioning, editorial direction, and multilingual content creation.</p>
                <ul class="work-outcomes">
                    <li>Developed coherent brand identities from zero</li>
                    <li>Produced bilingual editorial publications</li>
                    <li>Built digital presence and community engagement</li>
                </ul>
                <div class="work-skills">
                    <span>Brand Strategy</span>
                    <span>Editorial Direction</span>
                    <span>Content Strategy</span>
                    <span>Multilingual Copywriting</span>
                </div>
            </div>

            <div class="work-item">
                <div class="work-meta">
                    <span class="work-tag">Cross-Cultural Communication</span>
                    <span class="work-org">Seoul · 2025–2026</span>
                </div>
                <h3>Marketing & Community Management in Korea</h3>
                <p>Managed digital communication, participant relations and programme operations for a Seoul-based language programme—coordinating applications, content, community engagement, and day-to-day stakeholder needs across Korean and international participants.</p>
                <ul class="work-outcomes">
                    <li>Managed participant relations across cultures</li>
                    <li>Developed content for Korean and international audiences</li>
                    <li>Coordinated programme operations and stakeholder communication</li>
                </ul>
                <div class="work-skills">
                    <span>Cross-Cultural Mediation</span>
                    <span>Community Management</span>
                    <span>Digital Content</span>
                    <span>Stakeholder Relations</span>
                </div>
            </div>
        `,

        map: `
            <h1>🗺️ Where I've Been</h1>
            <p style="font-size: 13px; color: #7a6a5a; margin-bottom: 8px;">
                From Ireland to South Korea — a journey across Europe and Asia.
            </p>
            <div class="map-container" id="journeyMap"></div>
            <p class="map-tip">🖱️ Click on any pin to learn more about each place</p>
            <div class="divider"></div>
            <div class="tag-wrap">
                <span class="tag">🌍 9 Cities</span>
                <span class="tag">🇪🇺 6 Countries</span>
                <span class="tag">🗺️ 2 Continents</span>
                <span class="tag">📍 2010–2026</span>
            </div>
        `,

        experience: `
            <h1>Experience</h1>
            <p style="color: #7a6a5a; margin-bottom: 16px;">Where I've worked and what I've built.</p>

            <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 6px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>European Parliament</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Communication Trainee</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2024–2025</span><br /><span style="font-size: 11px; color: #7a6a5a;">Luxembourg</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 6px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Langsyoung</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Marketing & Community Manager</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2025–2026</span><br /><span style="font-size: 11px; color: #7a6a5a;">Seoul, South Korea</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 6px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Independent</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Strategic Communication & Brand</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2023–present</span><br /><span style="font-size: 11px; color: #7a6a5a;">Remote · Italy · Korea</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 6px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Nuova Fapam</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Interpreter (EN/IT)</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2022–2024</span><br /><span style="font-size: 11px; color: #7a6a5a;">Italy</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 6px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Il Polo Positivo</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Team Leader · Social Media</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2017–2023</span><br /><span style="font-size: 11px; color: #7a6a5a;">Remote</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 6px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Cactus Magazine</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Creative Director</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2023</span><br /><span style="font-size: 11px; color: #7a6a5a;">Milan, Italy</span></div>
                </div>
            </div>
        `,

        approach: `
            <h1>How I Think</h1>
            <div class="intro-quote">
                I like thinking and strategising. I am comfortable with public speaking, building relationships and maintaining them, and creating new things. If there is a problem, I will find a solution—creative or not.
            </div>

            <h2>01 — Understand</h2>
            <p>I research the context, audience and problem before communicating. What are the underlying dynamics? Who needs to hear what, and why?</p>

            <h2>02 — Structure</h2>
            <p>I turn complex information into a clear narrative and strategic direction. This is where the "manual" gets written—before anything is built.</p>

            <h2>03 — Connect</h2>
            <p>I identify the people, perspectives and cultural contexts that need to be brought together. Communication is about relationships, not just messages.</p>

            <h2>04 — Communicate</h2>
            <p>I translate the strategy into language, content and experiences appropriate to the audience. Every audience needs a different approach.</p>

            <h2>05 — Coordinate</h2>
            <p>I work with specialists and stakeholders to move the idea from strategy to execution. I don't need to do everything—I need to make sure it gets done well.</p>
        `,

        skills: `
            <h1>Skills & Tools</h1>

            <h2>Languages</h2>
            <p>🇮🇹 Italian (Native)<br />🇬🇧 English (C2)<br />🇪🇸 Spanish (C1)<br />🇫🇷 French (B1)<br />🇰🇷 Korean (B1 — TOPIK 4 target 2027)</p>

            <h2>Strategic & Creative</h2>
            <ul>
                <li>International Communication</li>
                <li>UI/UX Consultancy</li>
                <li>Brand Strategy & Storytelling</li>
                <li>Content Architecture</li>
                <li>Project Management</li>
                <li>Editorial Management</li>
                <li>Translation & Interpretation</li>
                <li>Public Speaking</li>
                <li>Mediation & Stakeholder Relations</li>
            </ul>

            <h2>Technical & Digital</h2>
            <ul>
                <li>HTML / CSS</li>
                <li>JavaScript (basic)</li>
                <li>AppsScript</li>
                <li>Excel (advanced formulas, automation)</li>
                <li>CMS (WordPress, etc.)</li>
                <li>Web Analytics</li>
                <li>Canva (advanced)</li>
                <li>Figma (basic)</li>
                <li>CapCut</li>
                <li>Meta Business Suite</li>
                <li>GitHub</li>
                <li>Google Suite</li>
                <li>Microsoft Office</li>
            </ul>

            <h2>Certifications</h2>
            <ul>
                <li>Digital Marketing Certificate (2023)</li>
                <li>Bachelor's in Interlingual Mediation (2018–2021)</li>
                <li>Master's in International Communication (2021–2023)</li>
            </ul>
        `,

        about: `
            <h1>About Me</h1>
            <p>I'm Monica Bernasconi. I was born in Italy, educated in Milan, Stockholm, and Genoa, and have worked across London, Luxembourg, and Seoul. I speak five languages and thrive at the intersection of international communication, intercultural mediation, and strategic storytelling.</p>
            <p>I don't believe in overcomplicating things. I sit with a problem, walk it off, consult with people who know more, and build something clear, human, and scalable.</p>
            <p>I like thinking more than executing. I am comfortable with public speaking, building relationships, and creating new things. If there is a problem, I will find a solution—creative or not.</p>
            <p>I want to work in environments that demand intellectual rigour, cross-cultural empathy, and strategic communication. I'm currently based in Seoul and returning to Korea in 2027.</p>

            <div class="divider"></div>

            <h2>International Footprint</h2>
            <ul>
                <li><strong>Italy</strong> — Native</li>
                <li><strong>English</strong> — Professional / Fluent</li>
                <li><strong>Spanish</strong> — Professional / Fluent</li>
                <li><strong>Korean</strong> — TOPIK ~3 · TOPIK 4 target 2027</li>
                <li><strong>Europe</strong> — European Parliament · Erasmus Stockholm</li>
                <li><strong>Korea</strong> — Seoul · Busan · professional experience</li>
            </ul>
        `,

        contact: `
            <h1>Let's Build Something</h1>
            <p style="font-size: 14px; color: #3a3530; margin-bottom: 16px;">I'm always open to conversations about international communication, institutional strategy, and creative problem-solving.</p>

            <div class="contact-links">
                <a href="mailto:bernasconimonica12@gmail.com" class="contact-link">
                    <span class="contact-icon">✉️</span> bernasconimonica12@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/monica-bernasconi/" target="_blank" class="contact-link">
                    <span class="contact-icon">🔗</span> LinkedIn
                </a>
                <a href="https://github.com/itsmomob" target="_blank" class="contact-link">
                    <span class="contact-icon">🐙</span> GitHub
                </a>
                <a href="Monica_Bernasconi_CV.pdf" target="_blank" class="contact-link">
                    <span class="contact-icon">📄</span> Download CV (PDF)
                </a>
            </div>
        `
    };

    return contents[folder] || '<p>Content coming soon.</p>';
}

// ─── INTERACTIVE MAP ───
function initMap() {
    const mapContainer = document.getElementById('journeyMap');
    if (!mapContainer) return;

    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }

    const map = L.map('journeyMap').setView([37.5665, 126.9780], 4);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; CartoDB'
    }).addTo(map);

    const locations = [
        { lat: 51.8985, lng: -8.4756, city: 'Cork', country: 'Ireland', year: '2010', label: 'First International Experience', color: '#c87a5a', detail: '2 weeks · English & horse riding' },
        { lat: 50.6083, lng: -1.9530, city: 'Swanage', country: 'UK', year: '2014', label: 'Small English Village', color: '#d4a373', detail: '3 weeks · Full immersion' },
        { lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK', year: '2018-2019', label: 'Acting Academy & Waitress', color: '#c87a5a', detail: '2 months + summer job' },
        { lat: 44.4056, lng: 8.9463, city: 'Genoa', country: 'Italy', year: '2018-2021', label: "Bachelor's in Interlingual Mediation", color: '#5fa87f', detail: '3 years' },
        { lat: 59.3293, lng: 18.0686, city: 'Stockholm', country: 'Sweden', year: '2020-2021', label: 'Erasmus Exchange', color: '#d4a373', detail: '6 months' },
        { lat: 45.4642, lng: 9.1900, city: 'Milan', country: 'Italy', year: '2021-2023', label: "Master's & Cactus Magazine", color: '#5fa87f', detail: '2 years + creative work' },
        { lat: 35.1796, lng: 129.0756, city: 'Busan', country: 'South Korea', year: '2024', label: 'Language Exchange', color: '#e07a5f', detail: '6 months · Korean immersion' },
        { lat: 37.5665, lng: 126.9780, city: 'Seoul', country: 'South Korea', year: '2024-2026', label: 'Marketing Manager & Language Exchange', color: '#e07a5f', detail: 'Current location · 2 years' },
        { lat: 49.6116, lng: 6.1319, city: 'Luxembourg', country: 'Luxembourg', year: '2024-2025', label: 'European Parliament Trainee', color: '#4a6fa5', detail: 'Schuman Communication Trainee' }
    ];

    const grouped = {};
    locations.forEach(loc => {
        const key = loc.city + ',' + loc.country;
        if (!grouped[key]) {
            grouped[key] = { lat: loc.lat, lng: loc.lng, city: loc.city, country: loc.country, color: loc.color, experiences: [] };
        }
        grouped[key].experiences.push({ year: loc.year, label: loc.label, detail: loc.detail });
    });

    let index = 0;
    Object.values(grouped).forEach(group => {
        let popupContent = `<strong>${group.city}</strong>, ${group.country}<br /><span class="popup-meta">${group.experiences.length} experience${group.experiences.length > 1 ? 's' : ''}</span><hr style="margin:4px 0;border:none;border-top:1px solid #e8ddd0;" />`;
        group.experiences.forEach(exp => {
            popupContent += `<div style="margin-bottom:4px;"><span style="font-weight:500;font-size:11px;">${exp.year}</span> <span style="font-size:11px;color:#2c2a2a;">— ${exp.label}</span><br /><span style="font-size:10px;color:#7a6a5a;">${exp.detail}</span></div>`;
        });

        const latOffset = (index % 3) * 0.04 - 0.04;
        const lngOffset = Math.floor(index / 3) * 0.04 - 0.04;

        L.circleMarker([group.lat + latOffset, group.lng + lngOffset], {
            radius: 8,
            fillColor: group.color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        }).bindPopup(popupContent).addTo(map);

        index++;
    });

    const cityList = Object.values(grouped);
    for (let i = 0; i < cityList.length - 1; i++) {
        L.polyline([
            [cityList[i].lat, cityList[i].lng],
            [cityList[i + 1].lat, cityList[i + 1].lng]
        ], { color: 'rgba(200,200,200,0.15)', weight: 1.5, dashArray: '5,8', opacity: 0.6 }).addTo(map);
    }

    map.zoomControl.setPosition('bottomright');
    setTimeout(() => map.invalidateSize(), 500);

    mapInstance = map;
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', function() {
    generateSkills();
    generateCollage();
    setTimeout(() => switchFolder('work'), 300);
});

// ─── KEYBOARD SHORTCUT: ESC ───
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeWindow();
    }
});
