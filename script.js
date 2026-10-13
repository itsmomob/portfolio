// ─── CLOCK ───
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent =
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0');
}
updateClock();
setInterval(updateClock, 10000);

// ─── CAPABILITIES SIDEBAR (Grouped for hiring) ───
const capabilities = [
    { group: 'Languages' },
    { id: 'it', label: 'Italian · Native', icon: '🇮🇹' },
    { id: 'en', label: 'English · C2', icon: '🇬🇧' },
    { id: 'es', label: 'Spanish · C1', icon: '🇪🇸' },
    { id: 'fr', label: 'French · B1', icon: '🇫🇷' },
    { id: 'kr', label: 'Korean · B1', icon: '🇰🇷' },

    { group: 'Strategy & Policy' },
    { id: 'strat', label: 'Strategic Comms', icon: '🎯' },
    { id: 'policy', label: 'Policy Communications', icon: '📜' },
    { id: 'instit', label: 'Institutional Affairs', icon: '🏛️' },
    { id: 'stake', label: 'Stakeholder Relations', icon: '🤝' },

    { group: 'Communications' },
    { id: 'editorial', label: 'Editorial Direction', icon: '✍️' },
    { id: 'brand', label: 'Brand & Narrative', icon: '🎨' },
    { id: 'translation', label: 'Translation', icon: '🌐' },
    { id: 'uiux', label: 'UI/UX Consultancy', icon: '🖥️' },

    { group: 'Digital & Tools' },
    { id: 'excel', label: 'Excel & AppsScript', icon: '📊' },
    { id: 'canva', label: 'Canva / Figma', icon: '🖌️' },
    { id: 'cms', label: 'CMS & Web', icon: '💻' },
    { id: 'social', label: 'Social & Meta', icon: '📱' },
    { id: 'github', label: 'GitHub', icon: '🐙' },
];

// ─── CASE STUDY CARDS (Collage) ───
const collageItems = [
    { id: 'eu-parliament', label: 'European Parliament', sub: 'Institutional Comms', icon: 'images/iate-sketch-1.jpg', folder: 'work' },
    { id: 'seoul-market', label: 'Seoul Market', sub: 'Cross-Cultural Comms', icon: 'images/vlog-seoul.jpg', folder: 'work' },
    { id: 'aiesec', label: 'AIESEC', sub: 'Global Stakeholders', icon: 'images/polo-positivo-1.jpg', folder: 'work' },
    { id: 'hanabee', label: 'HanaBee', sub: 'Brand Strategy', icon: 'images/hanabee-brand-1.jpg', folder: 'work' },
    { id: 'cactus', label: 'Cactus Magazine', sub: 'Editorial Direction', icon: 'images/cactus-magazine-1.jpg', folder: 'work' },
    { id: 'korea-research', label: 'Korea Research', sub: 'Narrative Analysis', icon: 'images/album-moodboard.jpg', folder: 'work' },
    { id: 'file-system', label: 'File Management', sub: 'Process Design', icon: 'images/stretching-poster.jpg', folder: 'work' },
    { id: 'newsletter', label: 'Newsletter', sub: 'Executive Comms', icon: 'images/newsletter-issue.jpg', folder: 'work' },
    { id: 'coffee-books', label: 'Coffee Table Books', sub: 'Creative Direction', icon: 'images/coffee-table-book-1.jpg', folder: 'work' },
    { id: 'crossword', label: 'Crossword Gift', sub: 'Personalization', icon: 'images/crossword-gift.jpg', folder: 'work' },
    { id: 'tomato', label: 'Tomato Poster', sub: 'Internal Comms', icon: 'images/tomato-poster.jpg', folder: 'work' },
];

// ─── STORAGE ───
const KEY = 'monica_collage_positions_v2';
const loadPositions = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { return {}; }
};
const savePositions = (p) => {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch(e) {}
};

// ─── GENERATE CAPABILITIES SIDEBAR ───
function generateSkills() {
    const sidebar = document.getElementById('skillsSidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';

    capabilities.forEach(cap => {
        if (cap.group) {
            const label = document.createElement('div');
            label.className = 'skill-group-label';
            label.textContent = cap.group;
            sidebar.appendChild(label);
            return;
        }
        const el = document.createElement('button');
        el.className = 'skill-item';
        el.innerHTML = `<span class="skill-emoji">${cap.icon}</span><span class="skill-label">${cap.label}</span>`;
        el.addEventListener('click', () => switchFolder('skills'));
        sidebar.appendChild(el);
    });
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

    const sidebarWidth = window.innerWidth <= 480 ? 76 : window.innerWidth <= 768 ? 100 : 150;
    const availW = W - sidebarWidth - 24;
    const availH = H - 70;

    const savedPositions = loadPositions();
    const items = collageItems.map(item => ({
        ...item,
        w: 82 + Math.random() * 18,
        h: 82 + Math.random() * 18,
        rotation: (Math.random() - 0.5) * 4,
    }));

    const placed = [];

    items.forEach(item => {
        const sw = Math.min(item.w, 100);
        const sh = Math.min(item.h, 100);
        let x, y;

        const saved = savedPositions[item.id];
        if (saved && saved.x + sw <= availW && saved.y + sh <= availH) {
            x = saved.x; y = saved.y;
        } else {
            let ok = false, attempts = 0;
            while (!ok && attempts < 200) {
                x = 8 + Math.random() * (availW - sw - 16);
                y = 8 + Math.random() * (availH - sh - 16);
                ok = !placed.some(p =>
                    x < p.x + p.w + 6 && x + sw + 6 > p.x &&
                    y < p.y + p.h + 6 && y + sh + 6 > p.y
                );
                attempts++;
            }
            if (!ok) {
                x = 8 + Math.random() * (availW - sw - 16);
                y = 8 + Math.random() * (availH - sh - 16);
            }
        }

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
        img.onerror = () => { iconDiv.textContent = '📄'; iconDiv.style.fontSize = '24px'; };
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

        el.addEventListener('click', (e) => {
            if (!e.target.closest('.dragging')) switchFolder(item.folder || 'work');
        });

        area.appendChild(el);
    });
}

// ─── DRAG LOGIC ───
let dragData = null;
function initDrag(e, item) {
    const rect = item.getBoundingClientRect();
    const cx = e.clientX || e.touches?.[0]?.clientX || 0;
    const cy = e.clientY || e.touches?.[0]?.clientY || 0;
    dragData = {
        el: item,
        startX: cx,
        startY: cy,
        hasDragged: false,
    };
    item.classList.add('dragging');
    item.style.zIndex = 100;
    if (e.type === 'touchstart') e.preventDefault();
}
function moveDrag(e) {
    if (!dragData) return;
    const cx = e.clientX || e.touches?.[0]?.clientX || 0;
    const cy = e.clientY || e.touches?.[0]?.clientY || 0;
    const dx = cx - dragData.startX;
    const dy = cy - dragData.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragData.hasDragged = true;

    const cl = parseFloat(dragData.el.dataset.left) || 0;
    const ct = parseFloat(dragData.el.dataset.top) || 0;
    const area = document.getElementById('collageArea');
    const r = area.getBoundingClientRect();
    const elW = parseFloat(dragData.el.style.width) || 80;
    const elH = parseFloat(dragData.el.style.height) || 80;

    let nx = Math.max(0, Math.min(cl + dx, r.width - elW));
    let ny = Math.max(0, Math.min(ct + dy, r.height - elH));

    dragData.el.style.left = nx + 'px';
    dragData.el.style.top = ny + 'px';
    dragData.el.dataset.left = nx;
    dragData.el.dataset.top = ny;
    dragData.startX = cx;
    dragData.startY = cy;
    if (e.type === 'touchmove') e.preventDefault();
}
function endDrag() {
    if (!dragData) return;
    dragData.el.classList.remove('dragging');
    if (dragData.hasDragged) {
        const p = loadPositions();
        const id = dragData.el.dataset.id;
        p[id] = {
            x: parseFloat(dragData.el.dataset.left) || 0,
            y: parseFloat(dragData.el.dataset.top) || 0
        };
        savePositions(p);
    }
    setTimeout(() => { if (dragData) dragData.el.style.zIndex = ''; }, 100);
    dragData = null;
}

document.addEventListener('mousedown', e => {
    const item = e.target.closest('.collage-item');
    if (item) initDrag(e, item);
});
document.addEventListener('mousemove', e => { if (dragData) moveDrag(e); });
document.addEventListener('mouseup', () => { if (dragData) endDrag(); });
document.addEventListener('touchstart', e => {
    const item = e.target.closest('.collage-item');
    if (item) initDrag(e, item);
}, { passive: true });
document.addEventListener('touchmove', e => { if (dragData) moveDrag(e); }, { passive: false });
document.addEventListener('touchend', () => { if (dragData) endDrag(); }, { passive: true });

// ─── WINDOW DRAG ───
let windowDragData = null;
document.addEventListener('mousedown', e => {
    const header = e.target.closest('.window-header');
    if (!header) return;
    const win = header.closest('.window');
    if (!win || !win.classList.contains('open')) return;
    const rect = win.getBoundingClientRect();
    windowDragData = {
        win: win,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
    };
    e.preventDefault();
});
document.addEventListener('mousemove', e => {
    if (!windowDragData) return;
    const desktop = document.getElementById('desktop');
    const dRect = desktop.getBoundingClientRect();
    let nx = e.clientX - dRect.left - windowDragData.offsetX;
    let ny = e.clientY - dRect.top - windowDragData.offsetY;
    const wRect = windowDragData.win.getBoundingClientRect();
    nx = Math.max(0, Math.min(nx, dRect.width - wRect.width));
    ny = Math.max(0, Math.min(ny, dRect.height - wRect.height));
    windowDragData.win.style.left = nx + 'px';
    windowDragData.win.style.top = ny + 'px';
    windowDragData.win.style.transform = 'none';
});
document.addEventListener('mouseup', () => { windowDragData = null; });

// ─── WINDOW FUNCTIONS ───
function closeWindow() {
    const win = document.getElementById('mainWindow');
    win.classList.add('closing');
    setTimeout(() => {
        win.classList.remove('open', 'closing');
        win.style.transform = ''; win.style.left = ''; win.style.top = '';
    }, 200);
}
function openWindow() {
    const win = document.getElementById('mainWindow');
    win.classList.remove('closing');
    win.style.transform = ''; win.style.left = ''; win.style.top = '';
    win.classList.add('open');
}

// ─── SWITCH FOLDER ───
let mapInstance = null;

function switchFolder(folder) {
    document.querySelectorAll('.taskbar-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.folder === folder);
    });

    const titles = {
        profile: 'Profile',
        work: 'Case Studies',
        experience: 'Experience',
        approach: 'Approach',
        map: 'Global Footprint',
        skills: 'Capabilities',
        contact: 'Contact'
    };
    document.getElementById('windowTitle').textContent = titles[folder] || 'File';
    document.getElementById('windowBody').innerHTML = getContent(folder);
    openWindow();

    if (folder === 'map') setTimeout(initMap, 400);
    if (folder !== 'map' && mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }
}

// ─── CONTENT ───
function getContent(folder) {
    const contents = {

        profile: `
            <h1>Monica Bernasconi</h1>
            <p class="subtitle">International Strategic Communications & Public Affairs</p>

            <p style="font-size: 15px; color: #1a1a1a; font-weight: 500;">
                I translate complexity into clarity — across institutions, cultures, and markets.
            </p>

            <p>I design communication strategies for organisations operating between Europe and Asia. My work sits at the intersection of institutional affairs, cross-cultural mediation, and digital transformation — helping complex organisations communicate clearly to the audiences that matter.</p>

            <p>My experience spans the European Parliament, international NGOs, and the Korean market. I have worked across five languages and four countries, and I specialise in environments where communication is not simply a function, but a strategic tool for influence and trust.</p>

            <h2>What I Do</h2>
            <ul>
                <li><strong>Institutional & policy communications</strong> — translating complex frameworks into clear, credible messaging</li>
                <li><strong>Cross-cultural strategy</strong> — building communication systems that work across languages and markets</li>
                <li><strong>Stakeholder engagement</strong> — managing relationships across institutions, governments, and private sectors</li>
                <li><strong>Digital & editorial direction</strong> — leading content, brand, and platform strategy end-to-end</li>
            </ul>

            <h2>Where I Operate</h2>
            <div class="tag-wrap">
                <span class="tag">Europe ↔ Korea</span>
                <span class="tag">Institutional Affairs</span>
                <span class="tag">Public Affairs</span>
                <span class="tag">International Communications</span>
                <span class="tag">Cross-Cultural Strategy</span>
                <span class="tag">Stakeholder Relations</span>
            </div>

            <hr class="divider" />

            <p><em>Based in Seoul, back in Europe 2027. Available internationally.</em></p>
            <p><a href="Monica_Bernasconi_CV.pdf" target="_blank">Download CV →</a></p>
        `,

        work: `
            <h1>Case Studies</h1>
            <p class="subtitle">Problems solved across institutions, markets, and cultures.</p>

            <div class="case-study">
                <div class="cs-meta">
                    <span class="cs-tag">Institutional Communication</span>
                    <span class="cs-org">European Parliament · Luxembourg · 2024–2025</span>
                </div>
                <h3>Redesigning Institutional Information for a 24-Language Audience</h3>

                <div class="cs-section">
                    <span class="cs-label">Context</span>
                    <p>The EU's flagship terminology database (IATE) needed a redesign serving thousands of daily professional users — translators, legal experts, policymakers — across 24 languages.</p>
                </div>

                <div class="cs-section">
                    <span class="cs-label">My Role</span>
                    <p>Communication Trainee, Terminology Coordination Unit — digital content, institutional communications, and UI/UX consultancy for the IATE 3 redesign.</p>
                </div>

                <div class="cs-section">
                    <span class="cs-label">What I Delivered</span>
                    <ul class="cs-outcomes">
                        <li>Conducted stakeholder interviews across EU institutions and mapped user journeys</li>
                        <li>Proposed UI/UX recommendations balancing multilingual complexity with usability — all suggestions implemented</li>
                        <li>Designed and rolled out a new internal file-management system with a written manual and video tutorials</li>
                        <li>Managed copyright compliance across multilingual publications</li>
                        <li>Built an automated Excel workflow for publishing and content control</li>
                    </ul>
                </div>

                <div class="cs-skills">
                    <span>Institutional Comms</span>
                    <span>UI/UX Consultancy</span>
                    <span>Process Design</span>
                    <span>Multilingual Content</span>
                </div>
            </div>

            <div class="case-study">
                <div class="cs-meta">
                    <span class="cs-tag">Cross-Cultural Strategy</span>
                    <span class="cs-org">Seoul · South Korea · 2025–2026</span>
                </div>
                <h3>Building a Bilingual Communication System for an International Language Programme</h3>

                <div class="cs-section">
                    <span class="cs-label">Context</span>
                    <p>A Seoul-based language programme serving Korean and international participants needed clearer marketing, a stronger community presence, and smoother operations.</p>
                </div>

                <div class="cs-section">
                    <span class="cs-label">What I Delivered</span>
                    <ul class="cs-outcomes">
                        <li>Led social media and content strategy across Instagram and Naver (Korean digital market)</li>
                        <li>Designed and moderated bilingual debate sessions, bridging cultural and linguistic differences</li>
                        <li>Managed end-to-end participant lifecycle: applications, onboarding, screening, conflict resolution</li>
                        <li>Built a custom Korean–English flashcard system (HTML/CSS/JS) based on real conversational language patterns</li>
                    </ul>
                </div>

                <div class="cs-skills">
                    <span>Cross-Cultural Mediation</span>
                    <span>Korean Market</span>
                    <span>Community Management</span>
                    <span>Programme Operations</span>
                </div>
            </div>

            <div class="case-study">
                <div class="cs-meta">
                    <span class="cs-tag">Global Stakeholder Relations</span>
                    <span class="cs-org">AIESEC · Milan · 2020–2021</span>
                </div>
                <h3>Managing International Partnership Relations Across Global Committees</h3>

                <div class="cs-section">
                    <span class="cs-label">What I Delivered</span>
                    <ul class="cs-outcomes">
                        <li>Managed relationships with committees, embassies, and partner associations worldwide</li>
                        <li>Onboarded international participants and ensured quality of experience across programmes</li>
                        <li>Acted as the liaison between global stakeholders and local execution teams</li>
                    </ul>
                </div>

                <div class="cs-skills">
                    <span>Stakeholder Management</span>
                    <span>International Relations</span>
                    <span>Onboarding</span>
                </div>
            </div>

            <div class="case-study">
                <div class="cs-meta">
                    <span class="cs-tag">Brand & Editorial Strategy</span>
                    <span class="cs-org">Independent · Italy · 2023–2024</span>
                </div>
                <h3>Building Brand and Editorial Systems for Three Client Verticals</h3>

                <div class="cs-section">
                    <span class="cs-label">Clients</span>
                    <p>A Tuscan honey producer, a restaurant (bilingual magazine), and a wellness/Pilates studio.</p>
                </div>

                <div class="cs-section">
                    <span class="cs-label">What I Delivered</span>
                    <ul class="cs-outcomes">
                        <li>Complete brand identity and packaging system for the honey producer (HanaBee)</li>
                        <li>Two bilingual editorial magazines for the restaurant — concept, copywriting, translation, production</li>
                        <li>Digital content strategy, newsletter, and website copy for the wellness studio</li>
                    </ul>
                </div>

                <div class="cs-skills">
                    <span>Brand Strategy</span>
                    <span>Editorial Direction</span>
                    <span>Bilingual Publishing</span>
                    <span>SEO & Web</span>
                </div>
            </div>

            <div class="case-study">
                <div class="cs-meta">
                    <span class="cs-tag">Narrative Research</span>
                    <span class="cs-org">University of Milan · 2023</span>
                </div>
                <h3>How Media Narratives Construct National Perception: A Study on Korea</h3>

                <div class="cs-section">
                    <span class="cs-label">Research Question</span>
                    <p>How do media representations shape international perceptions of South Korea?</p>
                </div>

                <div class="cs-section">
                    <span class="cs-label">Method & Findings</span>
                    <ul class="cs-outcomes">
                        <li>Applied fandom studies, parasocial relationship theory, and media representation analysis</li>
                        <li>Identified how narrative strategies have positioned Korea in the global market</li>
                        <li>Relevant to any organisation engaged in international communication or soft power</li>
                    </ul>
                </div>

                <div class="cs-skills">
                    <span>Media Analysis</span>
                    <span>Narrative Strategy</span>
                    <span>Cultural Research</span>
                </div>
            </div>
        `,

        experience: `
            <h1>Experience</h1>
            <p class="subtitle">Where I've worked and what I've built.</p>

            <h2>Professional</h2>
            <div class="exp-timeline">
                <div class="exp-row highlight">
                    <div class="exp-left">
                        <span class="exp-org">European Parliament</span>
                        <span class="exp-role">Communication Trainee — Terminology Coordination Unit<br>Digital content, institutional communications, UI/UX consultancy for IATE 3</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2024 – 2025</span>
                        Luxembourg
                    </div>
                </div>
                <div class="exp-row highlight">
                    <div class="exp-left">
                        <span class="exp-org">Langsyoung</span>
                        <span class="exp-role">Marketing & Community Manager<br>Social media, Naver content, programme operations, cross-cultural stakeholder management</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2025 – 2026</span>
                        Seoul, South Korea
                    </div>
                </div>
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">Nuova Fapam</span>
                        <span class="exp-role">Interpreter (EN ↔ IT)<br>Real-time interpretation for international masterclasses and events</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2022 – 2024</span>
                        Italy
                    </div>
                </div>
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">Independent Practice</span>
                        <span class="exp-role">Strategic Communications & Brand<br>Brand strategy, editorial direction, bilingual publications, digital content</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2023 – present</span>
                        Remote · Italy · Korea
                    </div>
                </div>
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">AIESEC</span>
                        <span class="exp-role">International Relations Manager<br>Global stakeholder relations, embassy coordination, participant onboarding</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2020 – 2021</span>
                        Milan, Italy
                    </div>
                </div>
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">Il Polo Positivo (NGO)</span>
                        <span class="exp-role">Team Lead — Social Media & Editorial<br>Editorial strategy, team leadership, digital growth (0 → ~4,000 followers)</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2017 – 2023</span>
                        Remote
                    </div>
                </div>
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">Cactus Magazine</span>
                        <span class="exp-role">Creative Director<br>Editorial direction, contributor management, bilingual content production</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2023</span>
                        Milan, Italy
                    </div>
                </div>
            </div>

            <h2>Education</h2>
            <div class="exp-timeline">
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">University of Milan</span>
                        <span class="exp-role">MA — Languages & Cultures for International Communication<br>English · Spanish · Korean · Intercultural mediation</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2021 – 2023</span>
                        Milan, Italy
                    </div>
                </div>
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">University of Genoa</span>
                        <span class="exp-role">BA — Theories & Techniques of Interlingual Mediation<br>Translation, interpretation, intercultural communication</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2018 – 2021</span>
                        Genoa, Italy
                    </div>
                </div>
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">Stockholm University</span>
                        <span class="exp-role">Erasmus Exchange — Media Studies, Cultures & Languages</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2020 – 2021</span>
                        Stockholm, Sweden
                    </div>
                </div>
                <div class="exp-row">
                    <div class="exp-left">
                        <span class="exp-org">FORMAPER · Chamber of Commerce, Milan</span>
                        <span class="exp-role">Digital Marketing Certification</span>
                    </div>
                    <div class="exp-right">
                        <span class="exp-date">2023</span>
                        Milan, Italy
                    </div>
                </div>
            </div>
        `,

        approach: `
            <h1>Approach</h1>
            <p class="subtitle">How I work with complexity, cultures, and institutions.</p>

            <p style="font-size: 15px; color: #1a1a1a; font-weight: 500; margin-bottom: 20px;">
                I like thinking and strategising. I am comfortable with public speaking, building and maintaining relationships, and creating new things. If there is a problem, I will find a solution — creative or not.
            </p>

            <h2>01 — Understand Before Communicating</h2>
            <p>Every environment has its own logic — its incentives, its power structures, its unspoken rules. Before I write a single line, I map the context: who the audience is, what they need to hear, and what the organisation actually needs to say.</p>

            <h2>02 — Structure Information Into Strategy</h2>
            <p>Complexity is not a virtue in communication. I take dense institutional, cultural, or commercial information and turn it into a clear narrative and a decision-ready direction — before anything is produced.</p>

            <h2>03 — Connect People, Perspectives, and Cultures</h2>
            <p>Communication is relational. I identify the stakeholders, specialists, and cultural contexts that need to be brought together — and I create the conditions for them to work well.</p>

            <h2>04 — Communicate With Precision</h2>
            <p>Different audiences need different languages — not just linguistically, but tonally, culturally, and strategically. I adapt the message to the audience without losing the substance.</p>

            <h2>05 — Coordinate Execution With Specialists</h2>
            <p>I don't need to do everything myself. I bring the right people into the room, align them around a shared direction, and make sure the work gets done to a high standard.</p>

            <hr class="divider" />

            <h2>What This Looks Like in Practice</h2>
            <ul>
                <li><strong>Institutional fluency</strong> — I can navigate the language, protocols, and politics of large organisations without losing sight of the human outcome.</li>
                <li><strong>Diplomatic intelligence</strong> — I read people and situations quickly. In high-stakes, multicultural environments, this is a professional asset.</li>
                <li><strong>Preventative mindset</strong> — I don't just solve problems. I design systems that stop them from happening in the first place.</li>
                <li><strong>Cross-functional range</strong> — I move comfortably between strategy, editorial, digital, and stakeholder work — which makes me useful in every phase of a project.</li>
            </ul>
        `,

        map: `
            <h1>Global Footprint</h1>
            <p class="subtitle">Where I've lived, studied, and worked.</p>
            <div class="map-container" id="journeyMap"></div>
            <p class="map-tip">Click any pin to see the full history for each location.</p>
            <hr class="divider" />
            <div class="tag-wrap">
                <span class="tag">4 Countries Lived</span>
                <span class="tag">5 Languages</span>
                <span class="tag">Europe ↔ Asia</span>
                <span class="tag">2010 – 2026</span>
            </div>
        `,

        skills: `
            <h1>Capabilities</h1>
            <p class="subtitle">What I bring to a role — from strategy through execution.</p>

            <h2>Languages</h2>
            <p><strong>Italian</strong> — Native &nbsp;·&nbsp; <strong>English</strong> — C2 &nbsp;·&nbsp; <strong>Spanish</strong> — C1 &nbsp;·&nbsp; <strong>French</strong> — B1 &nbsp;·&nbsp; <strong>Korean</strong> — B1 (TOPIK ~3; TOPIK 4 target 2027)</p>

            <h2>Strategic Communications</h2>
            <ul>
                <li>Institutional and policy communications</li>
                <li>Cross-cultural communication strategy</li>
                <li>Stakeholder engagement and relationship management</li>
                <li>Editorial direction and content architecture</li>
                <li>Brand and narrative strategy</li>
                <li>Public-facing messaging and representation</li>
            </ul>

            <h2>International & Institutional</h2>
            <ul>
                <li>European institutional frameworks (European Parliament experience)</li>
                <li>Multilingual and multicultural project coordination</li>
                <li>Cross-border stakeholder relations (Europe ↔ Asia)</li>
                <li>Cultural mediation and negotiation</li>
                <li>Compliance and regulatory awareness (copyright, institutional policy)</li>
            </ul>

            <h2>Digital & Execution</h2>
            <ul>
                <li>Web content management and CMS (WordPress, in-house tools)</li>
                <li>UI/UX consultancy for multilingual platforms</li>
                <li>Social media strategy (Meta, Naver, Instagram)</li>
                <li>Process automation (Excel, AppsScript)</li>
                <li>Basic front-end (HTML, CSS, JavaScript)</li>
                <li>Analytics and performance measurement</li>
            </ul>

            <h2>Tools</h2>
            <div class="tag-wrap">
                <span class="tag">Excel & AppsScript</span>
                <span class="tag">Canva</span>
                <span class="tag">Figma</span>
                <span class="tag">WordPress</span>
                <span class="tag">CapCut</span>
                <span class="tag">Meta Business Suite</span>
                <span class="tag">Google Suite</span>
                <span class="tag">Microsoft Office</span>
                <span class="tag">GitHub</span>
            </div>

            <h2>Certifications</h2>
            <ul>
                <li>Digital Marketing Certificate — FORMAPER & Chamber of Commerce, Milan (2023)</li>
                <li>Bachelor's in Interlingual Mediation — University of Genoa (2018–2021)</li>
                <li>Master's in International Communication — University of Milan (2021–2023)</li>
            </ul>
        `,

        contact: `
            <h1>Let's Work Together</h1>
            <p class="subtitle">Open to conversations about international communications, institutional strategy, and public affairs.</p>

            <p>I'm currently based in Seoul and open to roles in Europe, Asia, or fully remote — particularly in institutional communications, public affairs, international organisations, and strategic communication.</p>

            <div class="contact-list">
                <a href="mailto:bernasconimonica12@gmail.com" class="contact-row">
                    <span class="ci">✉️</span> bernasconimonica12@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/monica-bernasconi/" target="_blank" class="contact-row">
                    <span class="ci">🔗</span> LinkedIn — /in/monica-bernasconi
                </a>
                <a href="https://github.com/itsmomob" target="_blank" class="contact-row">
                    <span class="ci">🐙</span> GitHub — /itsmomob
                </a>
                <a href="Monica_Bernasconi_CV.pdf" target="_blank" class="contact-row">
                    <span class="ci">📄</span> Download CV (PDF)
                </a>
            </div>

            <hr class="divider" />

            <p><em>"Another thing you did. Another place you've been."</em></p>
        `
    };
    return contents[folder] || '<p>Content coming soon.</p>';
}

// ─── MAP ───
function initMap() {
    const mapContainer = document.getElementById('journeyMap');
    if (!mapContainer) return;
    if (mapInstance) { mapInstance.remove(); mapInstance = null; }

    const map = L.map('journeyMap').setView([37.5665, 126.9780], 4);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap, &copy; CartoDB'
    }).addTo(map);

    const locations = [
        { lat: 51.8985, lng: -8.4756, city: 'Cork', country: 'Ireland', year: '2010', label: 'First International Experience', color: '#c87a5a', detail: 'English & horse riding course' },
        { lat: 50.6083, lng: -1.9530, city: 'Swanage', country: 'UK', year: '2014', label: 'Full Immersion Program', color: '#d4a373', detail: '3 weeks with a local family' },
        { lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK', year: '2018–2019', label: 'Acting Academy & Work Experience', color: '#c87a5a', detail: 'LAMDA + seasonal work' },
        { lat: 44.4056, lng: 8.9463, city: 'Genoa', country: 'Italy', year: '2018–2021', label: "Bachelor's — Interlingual Mediation", color: '#5fa87f', detail: 'University of Genoa' },
        { lat: 59.3293, lng: 18.0686, city: 'Stockholm', country: 'Sweden', year: '2020–2021', label: 'Erasmus Exchange', color: '#d4a373', detail: 'Stockholm University' },
        { lat: 45.4642, lng: 9.1900, city: 'Milan', country: 'Italy', year: '2021–2023', label: "Master's & Professional Work", color: '#5fa87f', detail: 'International Communication · AIESEC · Cactus' },
        { lat: 35.1796, lng: 129.0756, city: 'Busan', country: 'South Korea', year: '2024', label: 'Language Immersion', color: '#e07a5f', detail: 'Korean language and culture' },
        { lat: 37.5665, lng: 126.9780, city: 'Seoul', country: 'South Korea', year: '2024–2026', label: 'Marketing & Community Manager', color: '#e07a5f', detail: 'Langsyoung · Current base' },
        { lat: 49.6116, lng: 6.1319, city: 'Luxembourg', country: 'Luxembourg', year: '2024–2025', label: 'European Parliament Trainee', color: '#4a6fa5', detail: 'Schuman Communication Trainee' }
    ];

    const grouped = {};
    locations.forEach(loc => {
        const key = loc.city + ',' + loc.country;
        if (!grouped[key]) {
            grouped[key] = { lat: loc.lat, lng: loc.lng, city: loc.city, country: loc.country, color: loc.color, experiences: [] };
        }
        grouped[key].experiences.push({ year: loc.year, label: loc.label, detail: loc.detail });
    });

    let i = 0;
    Object.values(grouped).forEach(g => {
        let popup = `<strong>${g.city}</strong>, ${g.country}<br /><span class="popup-meta">${g.experiences.length} experience${g.experiences.length > 1 ? 's' : ''}</span><hr style="margin:4px 0;border:none;border-top:1px solid #e8ddd0;" />`;
        g.experiences.forEach(e => {
            popup += `<div style="margin-bottom:4px;"><span style="font-weight:500;font-size:11px;">${e.year}</span> — <span style="font-size:11px;color:#2c2a2a;">${e.label}</span><br /><span style="font-size:10px;color:#7a6a5a;">${e.detail}</span></div>`;
        });
        const latOff = (i % 3) * 0.04 - 0.04;
        const lngOff = Math.floor(i / 3) * 0.04 - 0.04;
        L.circleMarker([g.lat + latOff, g.lng + lngOff], {
            radius: 8, fillColor: g.color, color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9
        }).bindPopup(popup).addTo(map);
        i++;
    });

    const cities = Object.values(grouped);
    for (let j = 0; j < cities.length - 1; j++) {
        L.polyline([
            [cities[j].lat, cities[j].lng],
            [cities[j + 1].lat, cities[j + 1].lng]
        ], { color: 'rgba(200,200,200,0.15)', weight: 1.5, dashArray: '5,8', opacity: 0.6 }).addTo(map);
    }

    map.zoomControl.setPosition('bottomright');
    setTimeout(() => map.invalidateSize(), 500);
    mapInstance = map;
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
    generateSkills();
    generateCollage();
    setTimeout(() => switchFolder('profile'), 300);
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWindow(); });
/* ═══════════════════════════════════════════════════
   MARKETING MANAGER — DATA
   ═══════════════════════════════════════════════════ */

const marketingData = {
    igMonthlyViews: [
        { label: 'Dec \'25', value: 10633 },
        { label: 'Jan \'26', value: 10283 },
        { label: 'Feb \'26', value: 10037 },
        { label: 'Mar \'26', value: 86697, peak: true },
        { label: 'Apr \'26', value: 20393 },
        { label: 'May \'26', value: 17756 },
        { label: 'Jun \'26', value: 22308 },
        { label: 'Jul \'26', value: 16438 },
        { label: 'Aug \'26', value: 7811 },
        { label: 'Sep \'26', value: 14728 }
    ],
    igMonthlyInteractions: [
        { label: 'Dec \'25', value: 70 },
        { label: 'Jan \'26', value: 127 },
        { label: 'Feb \'26', value: 268 },
        { label: 'Mar \'26', value: 13243, peak: true },
        { label: 'Apr \'26', value: 1429 },
        { label: 'May \'26', value: 1497 },
        { label: 'Jun \'26', value: 1379 },
        { label: 'Jul \'26', value: 370 },
        { label: 'Aug \'26', value: 115 },
        { label: 'Sep \'26', value: 174 }
    ],
    igCountries: [
        { name: 'South Korea', pct: 20.1 },
        { name: 'United States', pct: 12.6 },
        { name: 'Germany', pct: 7.7 },
        { name: 'France', pct: 4.9 },
        { name: 'Italy', pct: 4.7 },
        { name: 'Australia', pct: 4.4 },
        { name: 'Netherlands', pct: 3.6 },
        { name: 'Mexico', pct: 3.3 },
        { name: 'China', pct: 3.3 },
        { name: 'United Kingdom', pct: 3.0 }
    ],
    igCities: [
        { name: 'Seoul, KR', pct: 11.5 },
        { name: 'Busan, KR', pct: 1.9 },
        { name: 'Yongin, KR', pct: 1.6 },
        { name: 'Berlin, DE', pct: 1.1 },
        { name: 'Sydney, AU', pct: 1.1 },
        { name: 'Bogotá, CO', pct: 0.8 },
        { name: 'Melbourne, AU', pct: 0.8 },
        { name: 'San Luis, AR', pct: 0.8 },
        { name: 'Seongnam, KR', pct: 0.8 },
        { name: 'New York, US', pct: 0.8 }
    ],
    igDemographics: [
        { age: '18–24', w: 19.0, m: 10.0 },
        { age: '25–34', w: 35.0, m: 19.3 },
        { age: '35–44', w: 3.4,  m: 7.1 },
        { age: '45–54', w: 1.1,  m: 1.8 },
        { age: '55–64', w: 1.8,  m: 0.7 },
        { age: '65+',   w: 0.4,  m: 0.4 }
    ]
};

const googleBusinessData = {
    monthlyViews: [
        { label: 'Sep \'25', value: 6949 },
        { label: 'Oct \'25', value: 5258 },
        { label: 'Nov \'25', value: 4651 },
        { label: 'Dec \'25', value: 4629 },
        { label: 'Jan \'26', value: 3298 },
        { label: 'Feb \'26', value: 2562, dip: true },
        { label: 'Mar \'26', value: 3522 },
        { label: 'Apr \'26', value: 3547 },
        { label: 'May \'26', value: 2996 },
        { label: 'Jun \'26', value: 3095 },
        { label: 'Jul \'26', value: 3963 },
        { label: 'Aug \'26', value: 5309 },
        { label: 'Sep \'26', value: 5454 }
    ],
    monthlyInteractions: [
        { label: 'Sep \'25', calls: 0,  directions: 0,  clicks: 0 },
        { label: 'Oct \'25', calls: 13, directions: 47, clicks: 25 },
        { label: 'Nov \'25', calls: 2,  directions: 65, clicks: 17 },
        { label: 'Dec \'25', calls: 5,  directions: 68, clicks: 34 },
        { label: 'Jan \'26', calls: 7,  directions: 44, clicks: 26 },
        { label: 'Feb \'26', calls: 7,  directions: 59, clicks: 27 },
        { label: 'Mar \'26', calls: 5,  directions: 32, clicks: 31 },
        { label: 'Apr \'26', calls: 5,  directions: 44, clicks: 16 },
        { label: 'May \'26', calls: 5,  directions: 58, clicks: 27 },
        { label: 'Jun \'26', calls: 5,  directions: 58, clicks: 21 },
        { label: 'Jul \'26', calls: 4,  directions: 62, clicks: 25 },
        { label: 'Aug \'26', calls: 5,  directions: 60, clicks: 12 },
        { label: 'Sep \'26', calls: 0,  directions: 63, clicks: 39 }
    ],
    searchTerms: [
        { rank: 1, ko: '영어주소',  en: 'English address' },
        { rank: 2, ko: '영어회화',  en: 'English conversation' },
        { rank: 3, ko: '영어',      en: 'English' }
    ]
};

const naverData = {
    topPosts: [
        { rank: 1,  title: '"내 말이" — tell me about it',                    views: 443, date: 'Jul 2026' },
        { rank: 2,  title: '"당연하지" — a thousand times yes',                views: 390, date: 'Sep 2026' },
        { rank: 3,  title: '"됐어" — never mind',                             views: 254, date: 'Aug 2026' },
        { rank: 4,  title: '"바닥을 쳤어" — hit rock bottom',                  views: 211, date: 'Sep 2026' },
        { rank: 5,  title: '"you got me" — 맞아 걸렸어',                       views: 197, date: 'Oct 2026' },
        { rank: 6,  title: '"뭐라고요?" — come again',                        views: 194, date: 'Sep 2026' },
        { rank: 7,  title: '"뭐든 좋아" — I\'m down for anything',             views: 180, date: 'Jun 2026' },
        { rank: 8,  title: '"이게 뭐가 어려워" — it\'s not rocket science',    views: 171, date: 'Sep 2026' },
        { rank: 9,  title: '"별로야 끌리지 않아" — I\'m not feeling it',       views: 163, date: 'Sep 2026' },
        { rank: 10, title: '"나랑 안 맞아" — not my vibe',                    views: 160, date: 'Jul 2026' }
    ],
    contentMix: [
        { label: 'Expression Lessons', pct: 50, color: '#c87a5a' },
        { label: 'Studio Reflections', pct: 28, color: '#d4a373' },
        { label: 'Foreign Friend Profiles', pct: 17, color: '#5fa87f' },
        { label: 'Culture & Education', pct: 5,  color: '#4a6fa5' }
    ]
};

/* ═══════════════════════════════════════════════════
   RENDER — SHARED HELPERS
   ═══════════════════════════════════════════════════ */

function renderBarChart(containerId, data, color, formatValue) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const maxVal = Math.max(...data.map(d => d.value), 1);
    container.innerHTML = '';

    data.forEach(d => {
        const group = document.createElement('div');
        group.className = 'bar-group' + (d.peak ? ' is-peak' : '') + (d.dip ? ' is-dip' : '');

        const valueEl = document.createElement('div');
        valueEl.className = 'bar-value';
        valueEl.textContent = formatValue ? formatValue(d.value) : d.value;

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = Math.max(3, (d.value / maxVal) * 100) + '%';
        if (color) bar.style.background = color;
        bar.title = d.label + ': ' + d.value.toLocaleString();

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = d.label;

        group.appendChild(valueEl);
        group.appendChild(bar);
        group.appendChild(label);
        container.appendChild(group);
    });
}

function renderAudienceList(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const maxPct = Math.max(...data.map(d => d.pct), 1);

    data.forEach(d => {
        const row = document.createElement('div');
        row.className = 'audience-row';
        row.innerHTML = `
            <span class="audience-name">${d.name}</span>
            <span class="audience-bar-wrap"><span class="audience-bar" style="width:${(d.pct / maxPct) * 100}%"></span></span>
            <span class="audience-pct">${d.pct}%</span>
        `;
        container.appendChild(row);
    });
}

function renderDemographics(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const maxVal = Math.max(...data.flatMap(d => [d.w, d.m]), 1);

    data.forEach(d => {
        const row = document.createElement('div');
        row.className = 'demo-row';
        row.innerHTML = `
            <span class="demo-age">${d.age}</span>
            <span class="demo-bar-wrap" title="Women ${d.w}%"><span class="demo-bar demo-bar--w" style="width:${(d.w / maxVal) * 100}%"></span></span>
            <span class="demo-bar-wrap" title="Men ${d.m}%"><span class="demo-bar demo-bar--m" style="width:${(d.m / maxVal) * 100}%"></span></span>
        `;
        container.appendChild(row);
    });

    const legend = document.createElement('div');
    legend.className = 'demo-legend';
    legend.innerHTML = `
        <span><span class="demo-swatch" style="background:#c87a5a"></span> Women</span>
        <span><span class="demo-swatch" style="background:#7a9bb8"></span> Men</span>
    `;
    container.appendChild(legend);
}

/* ═══════════════════════════════════════════════════
   RENDER — GOOGLE BUSINESS
   ═══════════════════════════════════════════════════ */

function renderGbpViewsChart() {
    const container = document.getElementById('gbpViewsChart');
    if (!container) return;

    const data = googleBusinessData.monthlyViews;
    const maxVal = Math.max(...data.map(d => d.value));
    container.innerHTML = '';

    data.forEach(d => {
        const group = document.createElement('div');
        group.className = 'bar-group' + (d.dip ? ' is-dip' : '');

        const valueEl = document.createElement('div');
        valueEl.className = 'bar-value';
        valueEl.textContent = (d.value / 1000).toFixed(1) + 'K';

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = Math.max(3, (d.value / maxVal) * 100) + '%';
        if (d.dip) bar.style.background = '#a09488';
        bar.title = d.label + ': ' + d.value.toLocaleString() + ' views';

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = d.label;

        group.appendChild(valueEl);
        group.appendChild(bar);
        group.appendChild(label);
        container.appendChild(group);
    });
}

function renderGbpInteractionsChart() {
    const container = document.getElementById('gbpInteractionsChart');
    if (!container) return;

    const data = googleBusinessData.monthlyInteractions;
    const maxTotal = Math.max(...data.map(d => d.calls + d.directions + d.clicks), 1);
    container.innerHTML = '';

    data.forEach(d => {
        const total = d.calls + d.directions + d.clicks;
        const group = document.createElement('div');
        group.className = 'bar-group';

        const valueEl = document.createElement('div');
        valueEl.className = 'bar-value';
        valueEl.textContent = total > 0 ? total : '';

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = Math.max(3, (total / maxTotal) * 100) + '%';
        bar.style.background = 'transparent';
        bar.style.display = 'flex';
        bar.style.flexDirection = 'column-reverse';
        bar.style.overflow = 'hidden';
        bar.style.borderRadius = '3px 3px 0 0';
        bar.title = d.label + '\nCalls: ' + d.calls + '\nDirections: ' + d.directions + '\nClicks: ' + d.clicks;

        [
            { value: d.calls, color: '#c87a5a' },
            { value: d.directions, color: '#5fa87f' },
            { value: d.clicks, color: '#4a6fa5' }
        ].forEach(seg => {
            if (seg.value > 0 && total > 0) {
                const segEl = document.createElement('div');
                segEl.style.background = seg.color;
                segEl.style.height = (seg.value / total) * 100 + '%';
                segEl.style.width = '100%';
                bar.appendChild(segEl);
            }
        });

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = d.label;

        group.appendChild(valueEl);
        group.appendChild(bar);
        group.appendChild(label);
        container.appendChild(group);
    });
}

function renderGbpSearchTerms() {
    const container = document.getElementById('gbpSearchTerms');
    if (!container) return;
    container.innerHTML = '';

    googleBusinessData.searchTerms.forEach(t => {
        const row = document.createElement('div');
        row.className = 'search-term';
        row.innerHTML = `
            <span class="search-term__rank">${t.rank}</span>
            <span class="search-term__name">
                <span class="ko">${t.ko}</span>
                <span class="search-term__trans"> — ${t.en}</span>
            </span>
        `;
        container.appendChild(row);
    });
}

/* ═══════════════════════════════════════════════════
   RENDER — NAVER
   ═══════════════════════════════════════════════════ */

function renderNaverTopPosts() {
    const container = document.getElementById('naverTopPosts');
    if (!container) return;

    const maxViews = Math.max(...naverData.topPosts.map(p => p.views));
    container.innerHTML = '';

    naverData.topPosts.forEach(post => {
        const row = document.createElement('div');
        row.className = 'top-post-row';
        row.innerHTML = `
            <span class="top-post-rank">${post.rank}</span>
            <span class="top-post-title" title="${post.title}">${post.title}</span>
            <span class="top-post-bar-wrap">
                <span class="top-post-bar" style="width:${(post.views / maxViews) * 100}%"></span>
            </span>
            <span class="top-post-views">${post.views}</span>
        `;
        container.appendChild(row);
    });
}

function renderNaverContentMix() {
    const container = document.getElementById('naverContentMix');
    if (!container) return;

    const maxPct = Math.max(...naverData.contentMix.map(m => m.pct));
    container.innerHTML = '';

    naverData.contentMix.forEach(mix => {
        const row = document.createElement('div');
        row.className = 'mix-row';
        row.innerHTML = `
            <span class="mix-label">${mix.label}</span>
            <span class="mix-bar-wrap">
                <span class="mix-bar" style="width:${(mix.pct / maxPct) * 100}%; background:${mix.color}"></span>
            </span>
            <span class="mix-pct">${mix.pct}%</span>
        `;
        container.appendChild(row);
    });
}

/* ═══════════════════════════════════════════════════
   TAB SWITCHING
   ═══════════════════════════════════════════════════ */

function switchMktTab(tab, event) {
    if (event) event.preventDefault();
    document.querySelectorAll('.mkt-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.mkt-panel').forEach(p => p.classList.remove('active'));

    const btn = document.querySelector(`.mkt-tab[onclick*="'${tab}'"]`);
    if (btn) btn.classList.add('active');

    const panel = document.getElementById('mkt-panel-' + tab);
    if (panel) panel.classList.add('active');
}

/* ═══════════════════════════════════════════════════
   WINDOW CONTROLS
   ═══════════════════════════════════════════════════ */

function closeMarketingWindow() {
    const win = document.getElementById('marketingWindow');
    if (!win) return;
    win.classList.add('closing');
    setTimeout(() => {
        win.style.display = 'none';
        win.classList.remove('closing');
    }, 200);
}

/* ═══════════════════════════════════════════════════
   LOAD ALL DATA
   ═══════════════════════════════════════════════════ */

function loadMarketingData() {
    // Instagram
    renderBarChart('igViewsChart', marketingData.igMonthlyViews, null, v => v >= 1000 ? (v / 1000).toFixed(1) + 'K' : v);
    renderBarChart('igInteractionsChart', marketingData.igMonthlyInteractions, '#e07a5f', v => v >= 1000 ? (v / 1000).toFixed(1) + 'K' : v);
    renderAudienceList('igCountries', marketingData.igCountries);
    renderAudienceList('igCities', marketingData.igCities);
    renderDemographics('igDemographics', marketingData.igDemographics);

    // Google Business
    renderGbpViewsChart();
    renderGbpInteractionsChart();
    renderGbpSearchTerms();

    // Naver
    renderNaverTopPosts();
    renderNaverContentMix();
}

/* ═══════════════════════════════════════════════════
   OPEN ON LOAD
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const mktWin = document.getElementById('marketingWindow');
        if (mktWin) {
            mktWin.style.display = 'flex';
            mktWin.classList.add('open');
            loadMarketingData();
        }
    }, 500);
});

/* ═══════════════════════════════════════════════════
   DRAG — MARKETING WINDOW HEADER
   ═══════════════════════════════════════════════════ */

document.addEventListener('mousedown', function(e) {
    const header = e.target.closest('#marketingHeader');
    if (!header) return;
    const win = document.getElementById('marketingWindow');
    if (!win || win.style.display === 'none') return;

    const rect = win.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    function onMove(e) {
        const desktop = document.getElementById('desktop');
        const dRect = desktop.getBoundingClientRect();
        let nx = e.clientX - dRect.left - offsetX;
        let ny = e.clientY - dRect.top - offsetY;
        const wRect = win.getBoundingClientRect();
        nx = Math.max(0, Math.min(nx, dRect.width - wRect.width));
        ny = Math.max(0, Math.min(ny, dRect.height - wRect.height));
        win.style.left = nx + 'px';
        win.style.top = ny + 'px';
        win.style.transform = 'none';
    }

    function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    e.preventDefault();
});
