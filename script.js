// ─── CLOCK ───
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 10000);

// ─── FOLDER SWITCHING ───
let mapInitialized = false;
let mapInstance = null;

function switchFolder(folder) {
    // Update active folder in sidebar
    document.querySelectorAll('.folder').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.folder === folder);
    });

    // Update window title
    const titles = {
        work: 'WORK.txt',
        map: 'JOURNEY_MAP.txt',
        experience: 'EXPERIENCE.txt',
        approach: 'APPROACH.txt',
        skills: 'SKILLS_&_TOOLS.txt',
        about: 'ABOUT_MONICA.txt',
        contact: 'CONTACT.txt'
    };
    document.getElementById('windowTitle').textContent = titles[folder] || 'FILE.txt';

    // Load content
    const body = document.getElementById('windowBody');
    const content = getFolderContent(folder);
    body.innerHTML = content;

    // Initialize map if map folder
    if (folder === 'map') {
        setTimeout(initMap, 300);
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
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 8px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>European Parliament</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Communication Trainee</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2024–2025</span><br /><span style="font-size: 11px; color: #7a6a5a;">Luxembourg</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 8px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Langsyoung</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Marketing & Community Manager</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2025–2026</span><br /><span style="font-size: 11px; color: #7a6a5a;">Seoul, South Korea</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 8px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Independent</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Strategic Communication & Brand</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2023–present</span><br /><span style="font-size: 11px; color: #7a6a5a;">Remote · Italy · Korea</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 8px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Nuova Fapam</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Interpreter (EN/IT)</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2022–2024</span><br /><span style="font-size: 11px; color: #7a6a5a;">Italy</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 8px; background: #fff; border: 1px solid #f0ebe4;">
                    <div><strong>Il Polo Positivo</strong><br /><span style="font-size: 12px; color: #5a5a5a;">Team Leader · Social Media</span></div>
                    <div style="text-align: right; flex-shrink: 0;"><span style="font-size: 12px; font-weight: 500;">2017–2023</span><br /><span style="font-size: 11px; color: #7a6a5a;">Remote</span></div>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-radius: 8px; background: #fff; border: 1px solid #f0ebe4;">
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

    // Group by city
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

    // Connecting lines
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
    // Load default folder (work)
    switchFolder('work');
});

// ─── KEYBOARD SHORTCUT: ESC ───
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Reset to work folder
        switchFolder('work');
    }
});
