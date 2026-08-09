// Department & Multi-Stream Configuration (Mangalore University SEP Syllabus)
const DEPT_CONFIG = {
    BCA: {
        code: 'BCA',
        name: 'Bachelor of Computer Applications (BCA)',
        passcode: 'bca2026',
        badgeClass: 'bca',
        hasSections: true,
        defaultSubject: 'English',
        subjectsByYearAndSection: {
            'First Year': {
                'A': ['English', 'Kannada', 'Hindi', 'Sanskrit', 'Computer Fundamentals & C', 'Data Structures using C', 'Digital Logic & Discrete Structures', 'Web Designing', 'Office Automation', 'Digital Fluency'],
                'B': ['English', 'Kannada', 'Hindi', 'Sanskrit', 'Computer Fundamentals & C', 'Data Structures using C', 'Digital Logic & Discrete Structures', 'Web Designing', 'Office Automation', 'Digital Fluency'],
                'C': ['English', 'Kannada', 'Hindi', 'Sanskrit', 'Digital Fluency', 'Fundamentals of AI & ML', 'Cloud Computing Essentials', 'Python Programming for AI', 'Data Science & Visualization', 'Database Systems for AI', 'Linux & Shell Scripting']
            },
            'Second Year': {
                'A': ['Object Oriented Programming with Java', 'Database Management Systems (DBMS)', 'Operating System Concepts', 'Python Programming', 'Computer Networks', 'Software Engineering', 'DevOps', 'Web Content Management Systems (WCMS)', 'Open Source Technologies (OST)', 'English', 'Kannada', 'Hindi', 'Sanskrit'],
                'B': ['Object Oriented Programming with Java', 'Database Management Systems (DBMS)', 'Operating System Concepts', 'Python Programming', 'Computer Networks', 'Software Engineering', 'DevOps', 'Web Content Management Systems (WCMS)', 'Open Source Technologies (OST)', 'English', 'Kannada', 'Hindi', 'Sanskrit'],
                'C': ['Object Oriented Programming with Java', 'Database Management Systems (DBMS)', 'Operating System Concepts', 'Python Programming', 'Computer Networks', 'Software Engineering', 'DevOps', 'Web Content Management Systems (WCMS)', 'Open Source Technologies (OST)', 'English', 'Kannada', 'Hindi', 'Sanskrit']
            },
            'Third Year': {
                'A': ['Web Technologies (PHP/Node)', 'Cloud Computing', 'Artificial Intelligence & ML', 'Mobile Application Development', 'Cyber Security & Ethics', 'Project Work'],
                'B': ['Web Technologies (PHP/Node)', 'Cloud Computing', 'Artificial Intelligence & ML', 'Mobile Application Development', 'Cyber Security & Ethics', 'Project Work'],
                'C': ['Web Technologies (PHP/Node)', 'Cloud Computing', 'Artificial Intelligence & ML', 'Mobile Application Development', 'Cyber Security & Ethics', 'Project Work']
            }
        },
        subjectsByYear: {
            'First Year': ['English', 'Kannada', 'Hindi', 'Sanskrit', 'Computer Fundamentals & C', 'Data Structures using C', 'Digital Logic & Discrete Structures', 'Web Designing', 'Office Automation', 'Digital Fluency', 'Fundamentals of AI & ML', 'Cloud Computing Essentials', 'Python Programming for AI', 'Data Science & Visualization', 'Database Systems for AI', 'Linux & Shell Scripting'],
            'Second Year': ['Object Oriented Programming with Java', 'Database Management Systems (DBMS)', 'Operating System Concepts', 'Python Programming', 'Computer Networks', 'Software Engineering', 'DevOps', 'Web Content Management Systems (WCMS)', 'Open Source Technologies (OST)', 'English', 'Kannada', 'Hindi', 'Sanskrit'],
            'Third Year': ['Web Technologies (PHP/Node)', 'Cloud Computing', 'Artificial Intelligence & ML', 'Mobile Application Development', 'Cyber Security & Ethics', 'Project Work']
        },
        subjects: ['English', 'Kannada', 'Hindi', 'Sanskrit', 'Computer Fundamentals & C', 'Data Structures using C', 'Digital Logic & Discrete Structures', 'Web Designing', 'Office Automation', 'Digital Fluency', 'Fundamentals of AI & ML', 'Cloud Computing Essentials', 'Python Programming for AI', 'Data Science & Visualization', 'Database Systems for AI', 'Linux & Shell Scripting', 'Object Oriented Programming with Java', 'Database Management Systems (DBMS)', 'Operating System Concepts', 'Python Programming', 'Computer Networks', 'Software Engineering', 'DevOps', 'Web Content Management Systems (WCMS)', 'Open Source Technologies (OST)', 'Web Technologies (PHP/Node)', 'Cloud Computing', 'Artificial Intelligence & ML', 'Mobile Application Development', 'Cyber Security & Ethics', 'Project Work'],
        samplePresets: [
            { label: '"26709 26717 English 1st Yr Sec A Slot 1"', phrase: '26709 26717 English First Year A Slot 1' },
            { label: '"26701, 26705 1st Yr Sec C Fundamentals of AI Slot 2"', phrase: 'Roll numbers 26701 26705 1st Year BCA Sec C Fundamentals of AI 10-10.55' },
            { label: '"Roll 26701, 26705 2nd Yr Sec B Java 10-10.55"', phrase: 'Roll numbers 26701, 26705 2nd Year BCA Sec B Java 10-10.55' },
            { label: '"3rd Yr Sec A DBMS Slot 1 - Absentees 5, 8, 19"', phrase: 'Third year Section A DBMS slot 1 absentees 5 8 19' }
        ]
    },
    BCM: {
        code: 'BCM',
        name: 'Bachelor of Commerce (B.Com)',
        passcode: 'bcm2026',
        badgeClass: 'bcm',
        hasSections: true,
        defaultSubject: 'Financial Accounting',
        subjectsByYearAndSection: {
            'First Year': {
                'A': ['Financial Accounting', 'Business Organization & Management', 'Principles of Marketing', 'Business Mathematics & Statistics', 'Digital Fluency', 'General English', 'Kannada', 'Hindi'],
                'B': ['Financial Accounting', 'Business Organization & Management', 'Principles of Marketing', 'Business Mathematics & Statistics', 'Digital Fluency', 'General English', 'Kannada', 'Hindi'],
                'C (TP)': ['Financial Accounting', 'Income Tax Law & Practice I', 'Direct Tax Structure', 'Business Organization & Management', 'General English', 'Kannada', 'Hindi', 'Digital Fluency'],
                'C (AF)': ['Financial Accounting I', 'Financial Institutions & Markets', 'Business Mathematics & Statistics', 'General English', 'Kannada', 'Hindi', 'Digital Fluency']
            },
            'Second Year': {
                'A': ['Corporate Accounting', 'Cost Accounting', 'Law & Practice of Income Tax', 'Business Law', 'Banking Law & Operations', 'Entrepreneurship'],
                'B': ['Corporate Accounting', 'Cost Accounting', 'Law & Practice of Income Tax', 'Business Law', 'Banking Law & Operations', 'Entrepreneurship'],
                'C (TP)': ['Income Tax Law & Practice II', 'Goods & Services Tax (GST)', 'Customs Duty & Customs Law', 'Corporate Accounting', 'Business Law'],
                'C (AF)': ['Corporate Accounting II', 'Advanced Cost Accounting', 'Financial Management', 'Banking & Insurance Law', 'Business Law']
            },
            'Third Year': {
                'A': ['Management Accounting', 'Financial Management', 'Goods & Services Tax (GST)', 'Auditing & Corporate Governance', 'E-Filing & Financial Services'],
                'B': ['Management Accounting', 'Financial Management', 'Goods & Services Tax (GST)', 'Auditing & Corporate Governance', 'E-Filing & Financial Services'],
                'C (TP)': ['Tax Planning & Management', 'E-Filing of Tax Returns', 'Assessment Procedure & Auditing', 'Corporate Tax', 'Management Accounting'],
                'C (AF)': ['Security Analysis & Portfolio Management', 'International Financial Reporting (IFRS)', 'Strategic Financial Management', 'Auditing & Assurance', 'E-Filing']
            }
        },
        subjectsByYear: {
            'First Year': ['Financial Accounting', 'Business Organization & Management', 'Principles of Marketing', 'Business Mathematics & Statistics', 'Digital Fluency', 'General English', 'Kannada', 'Hindi', 'Income Tax Law & Practice I', 'Direct Tax Structure', 'Financial Accounting I', 'Financial Institutions & Markets'],
            'Second Year': ['Corporate Accounting', 'Cost Accounting', 'Law & Practice of Income Tax', 'Business Law', 'Banking Law & Operations', 'Entrepreneurship', 'Income Tax Law & Practice II', 'Goods & Services Tax (GST)', 'Customs Duty & Customs Law', 'Corporate Accounting II', 'Advanced Cost Accounting', 'Financial Management', 'Banking & Insurance Law'],
            'Third Year': ['Management Accounting', 'Financial Management', 'Goods & Services Tax (GST)', 'Auditing & Corporate Governance', 'E-Filing & Financial Services', 'Tax Planning & Management', 'E-Filing of Tax Returns', 'Assessment Procedure & Auditing', 'Corporate Tax', 'Security Analysis & Portfolio Management', 'International Financial Reporting (IFRS)', 'Strategic Financial Management', 'Auditing & Assurance']
        },
        subjects: ['Financial Accounting', 'Business Organization & Management', 'Principles of Marketing', 'Business Mathematics & Statistics', 'Digital Fluency', 'Corporate Accounting', 'Cost Accounting', 'Law & Practice of Income Tax', 'Business Law', 'Banking Law & Operations', 'Management Accounting', 'Financial Management', 'Goods & Services Tax (GST)', 'Auditing & Corporate Governance', 'E-Filing & Financial Services', 'General English', 'Kannada', 'Hindi', 'Income Tax Law & Practice I', 'Direct Tax Structure', 'Income Tax Law & Practice II', 'Customs Duty & Customs Law', 'Corporate Accounting II', 'Advanced Cost Accounting', 'Tax Planning & Management', 'E-Filing of Tax Returns', 'Assessment Procedure & Auditing', 'Corporate Tax', 'Security Analysis & Portfolio Management', 'International Financial Reporting (IFRS)', 'Strategic Financial Management', 'Auditing & Assurance'],
        samplePresets: [
            { label: '"101 108 Financial Accounting 1st Yr Sec A Slot 1"', phrase: '101 108 Financial Accounting First Year Sec A Slot 1' },
            { label: '"Roll 101, 105 1st Yr Sec C Income Tax Slot 2"', phrase: 'Roll numbers 101, 105 1st Year BCOM Sec C Income Tax 10-10.55' },
            { label: '"Roll 204, 212 2nd Yr Sec D Advanced Cost Accounting 10-10.55"', phrase: 'Roll numbers 204, 212 2nd Year BCOM Sec D Advanced Cost Accounting 10-10.55' },
            { label: '"3rd Yr Sec A Auditing Slot 2 - Absentees 15, 22"', phrase: 'Third year Section A Auditing slot 2 absentees 15 22' }
        ]
    },
    BA: {
        code: 'BA',
        name: 'Bachelor of Arts (B.A.)',
        passcode: 'ba2026',
        badgeClass: 'ba',
        hasSections: false,
        defaultSubject: 'History',
        subjectsByYear: {
            'First Year': ['History of India (Earliest to 1206)', 'Basic Concepts of Political Science', 'Micro Economic Analysis', 'Principles of Sociology', 'General English', 'Kannada', 'Hindi', 'Sanskrit'],
            'Second Year': ['History of India (1206 to 1707)', 'Indian Constitution & Political Process', 'Macro Economic Analysis', 'Sociology of Indian Society', 'Journalism', 'Optional English'],
            'Third Year': ['History of Modern India & Karnataka', 'International Relations', 'Indian Economy', 'Applied Sociology & Research', 'Human Rights']
        },
        subjects: ['History', 'History of India (Earliest to 1206)', 'History of India (1206 to 1707)', 'History of Modern India & Karnataka', 'Political Science', 'Basic Concepts of Political Science', 'Indian Constitution & Political Process', 'International Relations', 'Sociology', 'Micro Economic Analysis', 'Macro Economic Analysis', 'Indian Economy', 'Journalism', 'Optional English', 'Human Rights', 'General English', 'Kannada', 'Hindi', 'Sanskrit'],
        samplePresets: [
            { label: '"45 52 History 1st Yr Slot 1"', phrase: '45 52 History First Year Slot 1' },
            { label: '"Roll 12, 19 2nd Yr Political Science Slot 2"', phrase: 'Roll numbers 12, 19 2nd Year BA Political Science 10-10.55' },
            { label: '"3rd Yr Economics Slot 3 absentees 8 14"', phrase: 'Third year Economics slot 3 absentees 8 14' }
        ]
    },
    BSC: {
        code: 'BSC',
        name: 'Bachelor of Science (B.Sc.)',
        passcode: 'bsc2026',
        badgeClass: 'bsc',
        hasSections: false,
        defaultSubject: 'Physics',
        subjectsByYear: {
            'First Year': ['Physics Mechanics & Properties + Lab', 'Inorganic & Organic Chemistry + Lab', 'Algebra & Calculus', 'Computer Science Fundamentals', 'General English', 'Kannada', 'Hindi'],
            'Second Year': ['Physics Electricity & Optics + Lab', 'Physical & Organic Chemistry + Lab', 'Differential Equations & Real Analysis', 'Electronics', 'Statistics', 'Botany', 'Zoology'],
            'Third Year': ['Physics Quantum & Atomic + Lab', 'Analytical & Physical Chemistry + Lab', 'Complex Analysis & Linear Algebra', 'Physics Lab III', 'Chemistry Lab III']
        },
        subjects: ['Physics', 'Physics Mechanics & Properties + Lab', 'Physics Electricity & Optics + Lab', 'Physics Quantum & Atomic + Lab', 'Chemistry', 'Inorganic & Organic Chemistry + Lab', 'Chemistry Lab', 'Mathematics', 'Algebra & Calculus', 'Differential Equations & Real Analysis', 'Complex Analysis & Linear Algebra', 'Computer Science', 'Electronics', 'Statistics', 'Botany', 'Zoology', 'General English', 'Kannada', 'Hindi'],
        samplePresets: [
            { label: '"12 18 Physics 1st Yr Slot 1"', phrase: '12 18 Physics First Year Slot 1' },
            { label: '"Roll 305, 312 2nd Yr Chemistry Slot 2"', phrase: 'Roll numbers 305, 312 2nd Year BSC Chemistry 10-10.55' },
            { label: '"3rd Yr Mathematics Slot 3 absentees 7 11"', phrase: 'Third year Mathematics slot 3 absentees 7 11' }
        ]
    }
};


// Google Apps Script Webhook Endpoints (Supports dedicated Google Sheets per Stream/HOD)
const STREAM_WEBHOOK_URLS = {
    BCA: 'YOUR_BCA_GOOGLE_SCRIPT_URL_HERE',
    BCM: 'YOUR_BCM_GOOGLE_SCRIPT_URL_HERE',
    BA:  'YOUR_BA_GOOGLE_SCRIPT_URL_HERE',
    BSC: 'YOUR_BSC_GOOGLE_SCRIPT_URL_HERE'
};

const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzg-HkInidAz7Yt9udCNvDAbfnM1OEtOU3LbJRcupLaU4Mvkf-ANM3G49Cw2Rvn7Qfsiw/exec';

function getWebhookUrl(deptCode) {
    const dept = deptCode || currentDept;
    if (STREAM_WEBHOOK_URLS && STREAM_WEBHOOK_URLS[dept] && !STREAM_WEBHOOK_URLS[dept].includes('YOUR_')) {
        return STREAM_WEBHOOK_URLS[dept];
    }
    return DEFAULT_GOOGLE_SCRIPT_URL;
}

function submitViaHiddenForm(url, payload) {
    return new Promise((resolve) => {
        try {
            let iframe = document.getElementById('gas_hidden_iframe');
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = 'gas_hidden_iframe';
                iframe.name = 'gas_hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
            }

            let form = document.createElement('form');
            form.method = 'POST';
            form.action = url;
            form.target = 'gas_hidden_iframe';
            form.style.display = 'none';

            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'postData';
            input.value = JSON.stringify(payload);
            form.appendChild(input);

            document.body.appendChild(form);
            form.submit();

            setTimeout(() => {
                try { document.body.removeChild(form); } catch (e) {}
                resolve(true);
            }, 1200);
        } catch (e) {
            console.warn('Hidden form submission fallback failed:', e);
            resolve(false);
        }
    });
}

// Dual-Engine Webhook Transmitter (fetch POST + hidden HTML form fallback for mobile browsers)
async function postWithRetry(url, payload, maxRetries = 2) {
    let lastError = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return true;
        } catch (err) {
            lastError = err;
            console.warn(`Webhook POST fetch attempt ${attempt + 1} failed:`, err);
            if (attempt < maxRetries) {
                await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
            }
        }
    }

    // Fallback 1: Beacon
    try {
        if (navigator && navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=utf-8' });
            if (navigator.sendBeacon(url, blob)) return true;
        }
    } catch (e) {
        console.warn('Beacon fallback failed:', e);
    }

    // Fallback 2: Hidden Form Submit (Bypasses mobile CORS redirect restrictions completely)
    console.log('[Dual-Engine] Executing Hidden Form POST fallback to guarantee Google Sheet delivery...');
    const formSuccess = await submitViaHiddenForm(url, payload);
    if (formSuccess) return true;

    throw lastError || new Error('Network error after retries');
}

// State Management
let currentDept = 'BCA';
let currentRole = localStorage.getItem('mgm_role') || 'TEACHER';
let isHODAuthenticated = false;
let currentHODData = null;
let currentHODYearFilter = 'ALL';
let pendingHODTabSwitch = false;

let isListening = false;
let recognition = null;
let currentTranscript = '';
let interimTranscript = '';
let parsedData = null;
let animationFrameId = null;

// Department Login DOM Elements
const deptLoginModal = document.getElementById('deptLoginModal');
const deptLoginForm = document.getElementById('deptLoginForm');
const deptPasscode = document.getElementById('deptPasscode');
const togglePassBtn = document.getElementById('togglePassBtn');
const loginAlertBox = document.getElementById('loginAlertBox');
const deptSubtitle = document.getElementById('deptSubtitle');
const activeDeptBadge = document.getElementById('activeDeptBadge');
const activeDeptText = document.getElementById('activeDeptText');
const rememberDeptCheck = document.getElementById('rememberDeptCheck');

// Mode Switcher Elements
const voiceModeTab = document.getElementById('voiceModeTab');
const typingModeTab = document.getElementById('typingModeTab');
const hodModeTab = document.getElementById('hodModeTab');
const voiceSection = document.getElementById('voiceSection');
const typingSection = document.getElementById('typingSection');
const hodSection = document.getElementById('hodSection');

// Voice DOM Elements
const micBtn = document.getElementById('micBtn');
const micWrapper = document.getElementById('micWrapper');
const micBtnLabel = document.getElementById('micBtnLabel');
const statusPill = document.getElementById('statusPill');
const statusText = document.getElementById('statusText');
const todayBadge = document.getElementById('todayBadge');
const transcriptText = document.getElementById('transcriptText');
const clearTranscriptBtn = document.getElementById('clearTranscriptBtn');
const processBtn = document.getElementById('processBtn');
const canvas = document.getElementById('audioVisualizer');
const canvasCtx = canvas ? canvas.getContext('2d') : null;

// Manual Typing DOM Elements
const manualTextInput = document.getElementById('manualTextInput');
const clearManualTextBtn = document.getElementById('clearManualTextBtn');
const parseTypedTextBtn = document.getElementById('parseTypedTextBtn');
const directDateInput = document.getElementById('directDateInput');
const directRollInput = document.getElementById('directRollInput');
const directYearSelect = document.getElementById('directYearSelect');
const directSectionSelect = document.getElementById('directSectionSelect');
const directSubjectInput = document.getElementById('directSubjectInput');
const directSlotSelect = document.getElementById('directSlotSelect');
const directSubmitBtn = document.getElementById('directSubmitBtn');
const directSubmitBtnText = document.getElementById('directSubmitBtnText');
const directSubmitSpinner = document.getElementById('directSubmitSpinner');
const directResetBtn = document.getElementById('directResetBtn');

// Modal & Alert Elements
const confirmationModal = document.getElementById('confirmationModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBtn = document.getElementById('deleteBtn');
const submitBtn = document.getElementById('submitBtn');
const submitBtnText = document.getElementById('submitBtnText');
const submitSpinner = document.getElementById('submitSpinner');
const dateInput = document.getElementById('dateInput');
const rollNumbersInput = document.getElementById('rollNumbersInput');
const yearSelect = document.getElementById('yearSelect');
const sectionSelect = document.getElementById('sectionSelect');
const subjectInput = document.getElementById('subjectInput');
const slotSelect = document.getElementById('slotSelect');
const modalAlertBox = document.getElementById('modalAlertBox');
const directAlertBox = document.getElementById('directAlertBox');

function normalizeRollNumbers(rollInput) {
    if (!rollInput) return [];
    let rawItems = [];
    if (Array.isArray(rollInput)) {
        rawItems = rollInput.map(r => r.toString().trim());
    } else {
        const str = rollInput.toString().trim();
        if (!str || str.toUpperCase() === 'NIL' || str.toUpperCase() === 'NONE') {
            return [];
        }
        rawItems = str.split(/[\s,]+/).map(n => n.trim());
    }
    const cleanItems = rawItems.filter(n => n.length > 0 && n.toUpperCase() !== 'NIL' && n.toUpperCase() !== 'NONE');
    const seen = new Set();
    const result = [];
    cleanItems.forEach(item => {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    });
    return result;
}

function computeRollDiff(prevRollInput, newRollInput) {
    const prevRolls = normalizeRollNumbers(prevRollInput);
    const newRolls = normalizeRollNumbers(newRollInput);

    const prevSet = new Set(prevRolls);
    const newSet = new Set(newRolls);

    const addedRolls = newRolls.filter(r => !prevSet.has(r));
    const deletedRolls = prevRolls.filter(r => !newSet.has(r));
    const retainedRolls = newRolls.filter(r => prevSet.has(r));

    return {
        prevRolls,
        newRolls,
        addedRolls,
        deletedRolls,
        retainedRolls
    };
}

function isSectionOverlap(sec1, sec2) {
    const s1 = String(sec1 || '').trim().toUpperCase();
    const s2 = String(sec2 || '').trim().toUpperCase();
    if (!s1 || !s2) return false;
    if (s1 === s2) return true;
    if (s1 === 'ALL' || s1.includes('COMBIN') || s2 === 'ALL' || s2.includes('COMBIN')) return true;
    return false;
}

function checkDoubleEntryLive(dateVal, yearVal, sectionVal, subjectVal, slotVal, rollVal, alertBoxElem, submitBtnTextElem) {
    if (!alertBoxElem) return null;

    const cleanDate = dateVal || getTodayISOString();
    const cleanSlot = parseInt(slotVal, 10) || 1;
    const cleanSubject = (subjectVal || '').trim();
    const cleanYear = yearVal || 'First Year';
    const cleanStream = currentDept || 'BCA';

    const localHistory = JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
    
    // Find any existing entry for same Date + Stream + Year + Slot with overlapping Section
    const existingEntry = localHistory.find(item => {
        if ((item.stream || 'BCA') !== cleanStream) return false;
        if (item.date !== cleanDate) return false;
        if (item.year !== cleanYear) return false;
        if (parseInt(item.slot, 10) !== cleanSlot) return false;

        const sec1 = item.section || 'A';
        const sec2 = sectionVal || 'A';
        if (!isSectionOverlap(sec1, sec2)) return false;

        const isComb1 = sec1 === 'ALL' || sec1.toUpperCase() === 'ALL' || sec1.toLowerCase().includes('combin');
        const isComb2 = sec2 === 'ALL' || sec2.toUpperCase() === 'ALL' || sec2.toLowerCase().includes('combin');
        const isElec1 = isElectiveOrLanguageSubject(item.subject);
        const isElec2 = isElectiveOrLanguageSubject(cleanSubject);

        // If BOTH are Combined AND BOTH are Elective/Language subjects with different names, they are parallel electives!
        if (isComb1 && isComb2 && isElec1 && isElec2 && cleanSubject.length > 0 && item.subject.trim().toLowerCase() !== cleanSubject.toLowerCase()) {
            return false; // Not a conflict!
        }

        return true; // Conflict or Match found!
    });

    if (existingEntry) {
        const sameSubject = cleanSubject.length > 0 &&
            existingEntry.subject.trim().toLowerCase() === cleanSubject.toLowerCase();
        const diff = computeRollDiff(existingEntry.rollNumbers, rollVal);
        const prevStr = diff.prevRolls.length > 0 ? diff.prevRolls.join(', ') : 'NIL';

        alertBoxElem.style.display = 'block';
        alertBoxElem.className = 'alert-banner active';

        if (!sameSubject) {
            const secLabel = existingEntry.section === 'ALL' ? 'Combined (Sec A,B,C)' : `Sec ${existingEntry.section}`;
            alertBoxElem.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: flex-start;">
                <div style="flex: 1; font-size: 0.85rem; line-height: 1.4;">
                    <strong style="color: #fbbf24;">⚠️ Slot already occupied (${secLabel})</strong><br>
                    ${escapeHTML(cleanDate)} · ${escapeHTML(cleanYear)} · Slot ${cleanSlot}<br>
                    Existing entry: <strong>${escapeHTML(existingEntry.subject)}</strong> (${secLabel}) — Absentees: <strong>${escapeHTML(prevStr)}</strong><br>
                    <span style="opacity: 0.9;">Submitting will update/replace this slot.</span>
                </div>
            </div>`;
            if (submitBtnTextElem) submitBtnTextElem.textContent = 'Replace Existing Entry';
        } else {
            const addedStr = diff.addedRolls.length > 0 ? diff.addedRolls.join(', ') : 'None';
            const deletedStr = diff.deletedRolls.length > 0 ? diff.deletedRolls.join(', ') : 'None';
            const retainedStr = diff.retainedRolls.length > 0 ? diff.retainedRolls.join(', ') : 'None';
            alertBoxElem.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: flex-start;">
                <div style="flex: 1; font-size: 0.85rem; line-height: 1.4;">
                    <strong style="color: var(--primary-light, #818cf8);">Updating existing entry</strong><br>
                    Slot ${cleanSlot} (${escapeHTML(existingEntry.subject)}) on ${escapeHTML(cleanDate)}<br>
                    <span style="opacity: 0.9;">Previous Absentees (${diff.prevRolls.length}): <strong>${escapeHTML(prevStr)}</strong></span><br>
                    <div style="margin-top: 6px; padding: 6px 8px; background: rgba(0,0,0,0.25); border-radius: 6px; display: flex; flex-wrap: wrap; gap: 8px;">
                        <span style="color: #34d399;"><strong>+ Added (${diff.addedRolls.length}):</strong> ${escapeHTML(addedStr)}</span>
                        <span style="color: #f87171;"><strong>- Removed (${diff.deletedRolls.length}):</strong> ${escapeHTML(deletedStr)}</span>
                        <span style="color: #a7f3d0;"><strong>Unchanged (${diff.retainedRolls.length}):</strong> ${escapeHTML(retainedStr)}</span>
                    </div>
                </div>
            </div>`;
            if (submitBtnTextElem) submitBtnTextElem.textContent = 'Update Attendance Entry';
        }
        return existingEntry;
    }

    alertBoxElem.style.display = 'none';
    alertBoxElem.innerHTML = '';
    if (submitBtnTextElem) submitBtnTextElem.textContent = 'Submit Absentee';
    return null;
}

/**
 * Ask the Google Sheet if this Date+Year+Section+Slot already exists (works across teachers' phones).
 * Uses JSONP to avoid CORS limits on Apps Script.
 */
function checkSheetSlotConflict(dateVal, yearVal, sectionVal, slotVal, subjectVal) {
    return new Promise((resolve) => {
        const cbName = 'mgmConflictCb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
        let scriptEl = null;
        const timeout = setTimeout(() => {
            cleanup();
            resolve({ exists: false, offline: true });
        }, 4000);

        function cleanup() {
            clearTimeout(timeout);
            try { delete window[cbName]; } catch (e) {}
            if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
        }

        window[cbName] = function (data) {
            cleanup();
            resolve(data || { exists: false });
        };

        const params = new URLSearchParams({
            action: 'check',
            date: dateVal || getTodayISOString(),
            stream: currentDept,
            year: yearVal || '',
            section: sectionVal || '',
            slot: String(slotVal || 1),
            subject: subjectVal || '',
            callback: cbName
        });

        const targetUrl = getWebhookUrl(currentDept);
        scriptEl = document.createElement('script');
        scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
        scriptEl.onerror = function () {
            cleanup();
            resolve({ exists: false, offline: true });
        };
        document.body.appendChild(scriptEl);
    });
}

function updateModalDoubleEntryCheck() {
    checkDoubleEntryLive(
        dateInput.value,
        yearSelect.value,
        sectionSelect.value,
        subjectInput.value,
        slotSelect.value,
        rollNumbersInput.value,
        modalAlertBox,
        submitBtnText
    );
}

function updateDirectDoubleEntryCheck() {
    checkDoubleEntryLive(
        directDateInput.value,
        directYearSelect.value,
        directSectionSelect.value,
        directSubjectInput.value,
        directSlotSelect.value,
        directRollInput.value,
        directAlertBox,
        directSubmitBtnText
    );
}

// Toast & History Elements
const successToast = document.getElementById('successToast');
const toastSubtext = document.getElementById('toastSubtext');
const historyBtn = document.getElementById('historyBtn');
const historyDrawer = document.getElementById('historyDrawer');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const historyList = document.getElementById('historyList');
const themeToggle = document.getElementById('themeToggle');

// Helper to get Today ISO string YYYY-MM-DD
function getTodayISOString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}


function wipeHODPortalState() {
    currentHODData = null;

    const container = document.getElementById('hodSectionCardsContainer');
    if (container) {
        container.innerHTML = `
            <div class="hod-empty-state">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">📊</div>
                <p style="font-size: 0.88rem; color: var(--text-muted); font-weight: 500;">Select date and click <strong>"Fetch Absentees"</strong> to generate section report.</p>
            </div>`;
    }

    const globalShareContainer = document.getElementById('hodGlobalShareContainer');
    if (globalShareContainer) {
        globalShareContainer.style.display = 'none';
    }

    const hodStatusMessage = document.getElementById('hodStatusMessage');
    if (hodStatusMessage) {
        hodStatusMessage.style.display = 'none';
        hodStatusMessage.innerHTML = '';
    }
}

// 1. Mode Switcher Handler
function switchMode(mode) {
    if (mode === 'voice') {
        if (currentDept !== 'BCA') {
            switchMode('typing');
            return;
        }
        if (voiceModeTab) voiceModeTab.classList.add('active');
        if (typingModeTab) typingModeTab.classList.remove('active');
        if (hodModeTab) hodModeTab.classList.remove('active');
        if (voiceSection) voiceSection.style.display = 'flex';
        if (typingSection) typingSection.style.display = 'none';
        if (hodSection) hodSection.style.display = 'none';
        wipeHODPortalState();
    } else if (mode === 'typing') {
        if (typingModeTab) typingModeTab.classList.add('active');
        if (voiceModeTab) voiceModeTab.classList.remove('active');
        if (hodModeTab) hodModeTab.classList.remove('active');
        if (typingSection) typingSection.style.display = 'flex';
        if (voiceSection) voiceSection.style.display = 'none';
        if (hodSection) hodSection.style.display = 'none';
        if (isListening) stopListening();
        wipeHODPortalState();
    } else if (mode === 'hod') {
        if (currentRole === 'TEACHER' || !isHODAuthenticated) {
            pendingHODTabSwitch = true;
            const deptLabel = currentDept === 'BCM' ? 'B.Com' : (currentDept === 'BA' ? 'B.A.' : (currentDept === 'BSC' ? 'B.Sc.' : currentDept));
            if (loginAlertBox) {
                loginAlertBox.style.display = 'block';
                loginAlertBox.textContent = '🔒 Enter HOD Passcode for ' + deptLabel + ' (or Super Admin Passcode) to access HOD Portal';
            }
            if (deptLoginModal) deptLoginModal.classList.add('active');
            if (deptPasscode) deptPasscode.focus();
            return;
        }

        if (hodModeTab) hodModeTab.classList.add('active');
        if (voiceModeTab) voiceModeTab.classList.remove('active');
        if (typingModeTab) typingModeTab.classList.remove('active');
        if (hodSection) hodSection.style.display = 'block';
        if (voiceSection) voiceSection.style.display = 'none';
        if (typingSection) typingSection.style.display = 'none';
        if (isListening) stopListening();

        const hodDatePicker = document.getElementById('hodDatePicker');
        if (hodDatePicker && !hodDatePicker.value) hodDatePicker.value = getTodayISOString();
        applyRoleUI();
        fetchHODAbsentees();
    }
}

// 2. Initialize Web Speech Recognition
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        updateStatus('Speech API unavailable. Manual typing mode fully supported.', 'error');
        return false;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        isListening = true;
        micWrapper.classList.add('active');
        statusPill.className = 'status-pill listening';
        statusText.textContent = 'Listening... Speak now';
        micBtnLabel.textContent = 'Stop';
        startVisualizer();
    };

    recognition.onresult = (event) => {
        interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                currentTranscript += ' ' + event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        renderTranscript();
    };

    recognition.onerror = (event) => {
        console.error('Speech error:', event.error);
        if (event.error !== 'no-speech') {
            updateStatus(`Speech Error: ${event.error}`, 'error');
        }
        stopListening();
    };

    recognition.onend = () => {
        if (isListening) stopListening();
    };

    return true;
}

function toggleListening() {
    if (!recognition && !initSpeechRecognition()) {
        alert('Voice recognition is not supported in this browser environment. Switching to Manual Typing mode.');
        switchMode('typing');
        return;
    }

    if (isListening) {
        stopListening();
    } else {
        try {
            recognition.start();
        } catch (err) {
            console.error('Start recognition error:', err);
            stopListening();
        }
    }
}

function stopListening() {
    isListening = false;
    if (recognition) {
        try { recognition.stop(); } catch (e) {}
    }
    micWrapper.classList.remove('active');
    statusPill.className = 'status-pill';
    statusText.textContent = 'Tap microphone to speak';
    micBtnLabel.textContent = 'Tap to Speak';
    stopVisualizer();

    if (currentTranscript.trim().length > 0) {
        autoProcessSpeech(currentTranscript);
    }
}

function renderTranscript() {
    const fullText = (currentTranscript + ' ' + interimTranscript).trim();
    if (!fullText) {
        transcriptText.innerHTML = `<span class="transcript-placeholder">Spoken words will appear here in real-time...</span>`;
        processBtn.disabled = true;
    } else {
        transcriptText.innerHTML = `
            <span>${escapeHTML(currentTranscript)}</span>
            <span class="interim-text">${escapeHTML(interimTranscript)}</span>
        `;
        processBtn.disabled = false;
    }
}

function clearTranscript() {
    currentTranscript = '';
    interimTranscript = '';
    parsedData = null;
    renderTranscript();
    statusPill.className = 'status-pill';
    statusText.textContent = 'Tap microphone to speak';
}

// 3. Parser Trigger & Synchronization
function autoProcessSpeech(text) {
    const textToParse = (text || currentTranscript + ' ' + interimTranscript).trim();
    if (!textToParse) return;

    const deptConfig = DEPT_CONFIG[currentDept] || DEPT_CONFIG.BCA;
    parsedData = parseAttendanceSpeech(textToParse, currentDept);
    if (!parsedData.subject) parsedData.subject = deptConfig.defaultSubject;
    console.log('Parsed Attendance Data:', parsedData);

    const todayStr = parsedData.date || getTodayISOString();

    const directDurationSelect = document.getElementById('directDurationSelect');
    const durationSelect = document.getElementById('durationSelect');
    const calculatedDur = (parsedData.endSlot && parsedData.endSlot > parsedData.slot) 
        ? Math.min(4, parsedData.endSlot - parsedData.slot + 1) 
        : 1;

    if (directDurationSelect) directDurationSelect.value = String(calculatedDur);
    if (durationSelect) durationSelect.value = String(calculatedDur);

    // Sync values into direct form
    directDateInput.value = todayStr;
    directRollInput.value = Array.isArray(parsedData.rollNumbers) ? parsedData.rollNumbers.join(', ') : parsedData.rollNumbers;
    directYearSelect.value = parsedData.year || 'First Year';
    directSectionSelect.value = parsedData.section || 'A';
    setSubjectValue(directSubjectInput, parsedData.subject || deptConfig.defaultSubject);
    directSlotSelect.value = parsedData.slot ? parsedData.slot.toString() : '1';
    checkLanguageElectiveAutoCombined(directSubjectInput.value, directSectionSelect, directYearSelect);

    const directMultiSlotWrapper = document.getElementById('directMultiSlotContainer');
    const directMultiSlotBreakdown = document.getElementById('directMultiSlotBreakdown');
    handleMultiSlotVisibility(directDurationSelect, directSlotSelect, directRollInput, directMultiSlotWrapper, directMultiSlotBreakdown);

    // Open Confirmation Modal Form
    openConfirmationModal(parsedData);
}

function handleTypedTextParse() {
    const typedText = manualTextInput.value.trim();
    if (!typedText) {
        alert('Please enter or paste attendance text to parse.');
        manualTextInput.focus();
        return;
    }
    autoProcessSpeech(typedText);
}

function openConfirmationModal(data) {
    if (!data) return;

    const deptConfig = DEPT_CONFIG[currentDept] || DEPT_CONFIG.BCA;

    dateInput.value = data.date || getTodayISOString();
    rollNumbersInput.value = Array.isArray(data.rollNumbers) ? data.rollNumbers.join(', ') : data.rollNumbers;
    yearSelect.value = data.year || 'First Year';
    sectionSelect.value = data.section || 'A';
    setSubjectValue(subjectInput, data.subject || deptConfig.defaultSubject);
    slotSelect.value = data.slot ? data.slot.toString() : '1';

    const durationSelect = document.getElementById('durationSelect');
    const modalMultiSlotWrapper = document.getElementById('modalMultiSlotContainer');
    const modalMultiSlotBreakdown = document.getElementById('modalMultiSlotBreakdown');
    const calculatedDur = (data.endSlot && data.endSlot > data.slot) ? Math.min(4, data.endSlot - data.slot + 1) : 1;
    if (durationSelect) durationSelect.value = String(calculatedDur);

    handleMultiSlotVisibility(durationSelect, slotSelect, rollNumbersInput, modalMultiSlotWrapper, modalMultiSlotBreakdown);

    updateModalDoubleEntryCheck();
    confirmationModal.classList.add('active');
}

function closeConfirmationModal() {
    confirmationModal.classList.remove('active');
    if (deleteBtn) deleteBtn.style.display = 'none';
    if (modalAlertBox) modalAlertBox.style.display = 'none';
    statusPill.className = 'status-pill';
    statusText.textContent = 'Tap microphone to speak';
}

// 4. Backend Integration (HTTP POST to Google Apps Script Webhook with Date)
async function submitData(dateVal, rollRaw, yearVal, sectionVal, subjectVal, slotVal, btnElem, textElem, spinnerElem) {
    if (!subjectVal) {
        alert('Please enter a subject name.');
        return;
    }

    if (btnElem) btnElem.disabled = true;
    if (textElem) textElem.style.opacity = '0.5';

    let cleanSubject = subjectVal ? subjectVal.trim() : '';
    if (isElectiveOrLanguageSubject(cleanSubject)) {
        sectionVal = 'ALL';
    } else if (sectionVal === 'ALL') {
        // Core subject (e.g. Maths) -> Reset section to Section A to prevent accidental Combined entries
        sectionVal = 'A';
    }

    const cleanDate = dateVal || getTodayISOString();
    const cleanSlot = parseInt(slotVal, 10) || 1;

    let formattedRolls = 'NIL';
    let rollNumbersArray = normalizeRollNumbers(rollRaw);

    if (rollNumbersArray.length > 0) {
        formattedRolls = rollNumbersArray.join(', ');
    }

    const localHistory = JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
    const existingEntry = localHistory.find(item => {
        if ((item.stream || 'BCA') !== currentDept) return false;
        if (item.date !== cleanDate) return false;
        if (item.year !== yearVal) return false;
        if (parseInt(item.slot, 10) !== cleanSlot) return false;

        const sec1 = item.section || 'A';
        const sec2 = sectionVal || 'A';
        if (!isSectionOverlap(sec1, sec2)) return false;

        const isComb1 = sec1 === 'ALL' || sec1.toUpperCase() === 'ALL' || sec1.toLowerCase().includes('combin');
        const isComb2 = sectionVal === 'ALL' || (sectionVal || '').toUpperCase() === 'ALL' || (sectionVal || '').toLowerCase().includes('combin');
        const isElec1 = isElectiveOrLanguageSubject(item.subject);
        const isElec2 = isElectiveOrLanguageSubject(cleanSubject);

        if (isComb1 && isComb2 && isElec1 && isElec2 && item.subject.trim().toLowerCase() !== cleanSubject.toLowerCase()) {
            return false; // Parallel elective
        }

        return true;
    });

    // Cross-phone / sheet check: same Date + Year + Section + Slot already taken?
    let sheetConflict = { exists: false };
    try {
        sheetConflict = await checkSheetSlotConflict(cleanDate, yearVal, sectionVal, cleanSlot, cleanSubject);
    } catch (e) {
        sheetConflict = { exists: false, offline: true };
    }

    if (sheetConflict.exists) {
        const existingSubj = String(sheetConflict.subject || '').trim();
        const existingRolls = sheetConflict.rollNumbers || 'NIL';
        const existingSec = String(sheetConflict.section || 'A').trim();
        const sameSubject = existingSubj.toLowerCase() === cleanSubject.toLowerCase();

        const isComb1 = existingSec === 'ALL' || existingSec.toUpperCase() === 'ALL' || existingSec.toLowerCase().includes('combin');
        const isComb2 = sectionVal === 'ALL' || (sectionVal || '').toUpperCase() === 'ALL' || (sectionVal || '').toLowerCase().includes('combin');
        const isElec1 = isElectiveOrLanguageSubject(existingSubj);
        const isElec2 = isElectiveOrLanguageSubject(cleanSubject);

        if (isComb1 && isComb2 && isElec1 && isElec2 && !sameSubject) {
            // For Combined sections with parallel electives, Kannada/Hindi/Sanskrit or DevOps/WCMS/OST in same slot are allowed in parallel!
            sheetConflict.exists = false;
        } else if (!sameSubject) {
            const secLabel = existingSec === 'ALL' ? 'Combined (Sec A,B,C)' : `Sec ${existingSec}`;
            const replaceOk = confirm(
                'Already entered for this class & slot!\n\n' +
                cleanDate + ' · ' + yearVal + ' (' + secLabel + ') · Slot ' + cleanSlot + '\n\n' +
                'Existing entry: ' + (existingSubj || '(blank)') + ' (' + secLabel + ')\n' +
                'Absentees: ' + existingRolls + '\n\n' +
                'You are entering: ' + cleanSubject + ' (Sec ' + sectionVal + ')\n' +
                'Absentees: ' + formattedRolls + '\n\n' +
                'This slot is occupied. Replace/update the existing entry?'
            );
            if (!replaceOk) {
                if (btnElem) btnElem.disabled = false;
                if (textElem) textElem.style.opacity = '1';
                return;
            }
        } else if (!existingEntry) {
            // Same subject (e.g. Hindi again), entered on another phone — confirm roll update
            const updateOk = confirm(
                'This slot was already entered (possibly by another teacher).\n\n' +
                cleanDate + ' · ' + yearVal + ' Sec ' + sectionVal + ' · ' + existingSubj + ' · Slot ' + cleanSlot + '\n\n' +
                'Current absentees: ' + existingRolls + '\n' +
                'Your absentees: ' + formattedRolls + '\n\n' +
                'Update the sheet with your list?'
            );
            if (!updateOk) {
                if (btnElem) btnElem.disabled = false;
                if (textElem) textElem.style.opacity = '1';
                return;
            }
        }
    }

    const isUpdate = !!existingEntry || !!(sheetConflict.exists && !sheetConflict.offline);
    const diff = existingEntry ? computeRollDiff(existingEntry.rollNumbers, formattedRolls) : {
        prevRolls: sheetConflict.exists ? normalizeRollNumbers(sheetConflict.rollNumbers) : [],
        newRolls: rollNumbersArray,
        addedRolls: rollNumbersArray,
        deletedRolls: [],
        retainedRolls: []
    };

    if (existingEntry) {
        const prevStr = diff.prevRolls.length > 0 ? diff.prevRolls.join(', ') : 'NIL';
        const newStr = diff.newRolls.length > 0 ? diff.newRolls.join(', ') : 'NIL';
        const addedStr = diff.addedRolls.length > 0 ? diff.addedRolls.join(', ') : 'None';
        const deletedStr = diff.deletedRolls.length > 0 ? diff.deletedRolls.join(', ') : 'None';
        const retainedStr = diff.retainedRolls.length > 0 ? diff.retainedRolls.join(', ') : 'None';

        const confirmUpdate = confirm(
            'Existing entry found on this phone!\n\n' +
            'Updating ' + cleanDate + ' (' + yearVal + ' Sec ' + sectionVal + ', ' + subjectVal + ', Slot ' + cleanSlot + ')\n\n' +
            '- Previous Absentees (' + diff.prevRolls.length + '): ' + prevStr + '\n' +
            '- Updated Absentees (' + diff.newRolls.length + '): ' + newStr + '\n\n' +
            'Changes:\n' +
            '  + Added (' + diff.addedRolls.length + '): ' + addedStr + '\n' +
            '  - Removed (' + diff.deletedRolls.length + '): ' + deletedStr + '\n' +
            '  = Unchanged (' + diff.retainedRolls.length + '): ' + retainedStr + '\n\n' +
            'Apply this update to Raw Data and the section sheet?'
        );

        if (!confirmUpdate) {
            if (btnElem) btnElem.disabled = false;
            if (textElem) textElem.style.opacity = '1';
            return;
        }
    }

    const payload = {
        action: isUpdate ? 'update' : 'create',
        isUpdate: isUpdate,
        stream: currentDept,
        date: cleanDate,
        rollNumbers: formattedRolls,
        year: yearVal,
        section: sectionVal,
        subject: subjectVal,
        slot: cleanSlot,
        previousRollNumbers: diff.prevRolls.length > 0 ? diff.prevRolls.join(', ') : 'NIL',
        addedRollNumbers: diff.addedRolls.length > 0 ? diff.addedRolls.join(', ') : 'NIL',
        deletedRollNumbers: diff.deletedRolls.length > 0 ? diff.deletedRolls.join(', ') : 'NIL',
        retainedRollNumbers: diff.retainedRolls.length > 0 ? diff.retainedRolls.join(', ') : 'NIL',
        changesSummary: isUpdate 
            ? 'Added: ' + (diff.addedRolls.join(', ') || 'None') + ' | Removed: ' + (diff.deletedRolls.join(', ') || 'None')
            : 'Initial Submission'
    };

    console.log('Submitting Attendance Payload:', payload);

    if (textElem) textElem.style.opacity = '0';
    if (spinnerElem) spinnerElem.style.display = 'block';

    try {
        const targetUrl = getWebhookUrl(currentDept);
        await postWithRetry(targetUrl, payload, 2);

        saveToLocalHistory({
            ...payload,
            offline: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        closeConfirmationModal();
        resetAllInputs();
        showSuccessToast(payload);

    } catch (error) {
        console.warn('Error submitting attendance:', error);
        saveToLocalHistory({
            ...payload,
            offline: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        closeConfirmationModal();
        resetAllInputs();
        showCustomToast(
            '⚠️ Saved Locally (Network Offline)',
            'Saved on phone. Will auto-sync to Google Sheet when online or tap "Sync" in Today\'s History.'
        );
    } finally {
        if (btnElem) btnElem.disabled = false;
        if (textElem) textElem.style.opacity = '1';
        if (spinnerElem) spinnerElem.style.display = 'none';
    }
}

function renderMultiSlotBreakdown(containerEl, startSlot, duration, masterRollVal) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    const endSlot = Math.min(8, startSlot + duration - 1);

    for (let slotNum = startSlot; slotNum <= endSlot; slotNum++) {
        const slotLabel = SLOT_TIME_LABELS[slotNum] || ('Slot ' + slotNum);
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.alignItems = 'center';
        rowDiv.style.gap = '8px';
        rowDiv.style.marginTop = '4px';

        const label = document.createElement('span');
        label.style.fontSize = '0.78rem';
        label.style.fontWeight = '600';
        label.style.minWidth = '115px';
        label.style.color = '#93c5fd';
        label.textContent = `Slot ${slotNum} (${slotLabel}):`;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-input multi-slot-roll-input';
        input.dataset.slot = String(slotNum);
        input.placeholder = 'Absentees for Slot ' + slotNum + ' (or leave blank)';
        input.value = masterRollVal || '';
        input.style.fontSize = '0.82rem';
        input.style.padding = '5px 8px';
        input.style.flex = '1';

        rowDiv.appendChild(label);
        rowDiv.appendChild(input);
        containerEl.appendChild(rowDiv);
    }
}

function handleMultiSlotVisibility(durationSelectEl, slotSelectEl, masterRollInputEl, containerWrapperEl, breakdownEl) {
    if (!durationSelectEl || !containerWrapperEl) return;
    const duration = parseInt(durationSelectEl.value, 10) || 1;
    const startSlot = parseInt(slotSelectEl ? slotSelectEl.value : '1', 10) || 1;

    if (duration > 1) {
        containerWrapperEl.style.display = 'block';
        renderMultiSlotBreakdown(breakdownEl, startSlot, duration, masterRollInputEl ? masterRollInputEl.value : '');
    } else {
        containerWrapperEl.style.display = 'none';
        if (breakdownEl) breakdownEl.innerHTML = '';
    }
}

async function handleMultiSlotSubmit(dateVal, masterRollRaw, yearVal, sectionVal, subjectVal, startSlotVal, durationVal, breakdownEl, btnElem, textElem, spinnerElem) {
    const duration = parseInt(durationVal, 10) || 1;
    const startSlot = parseInt(startSlotVal, 10) || 1;

    if (duration <= 1) {
        return await submitData(dateVal, masterRollRaw, yearVal, sectionVal, subjectVal, startSlot, btnElem, textElem, spinnerElem);
    }

    const endSlot = Math.min(8, startSlot + duration - 1);
    let successCount = 0;

    for (let slotNum = startSlot; slotNum <= endSlot; slotNum++) {
        let slotRollRaw = masterRollRaw;
        if (breakdownEl) {
            const slotInput = breakdownEl.querySelector(`input[data-slot="${slotNum}"]`);
            if (slotInput) {
                slotRollRaw = slotInput.value;
            }
        }
        try {
            await submitData(dateVal, slotRollRaw, yearVal, sectionVal, subjectVal, slotNum, btnElem, textElem, spinnerElem);
            successCount++;
        } catch (e) {
            console.warn(`Error submitting slot ${slotNum}:`, e);
        }
    }

    if (successCount > 0) {
        showCustomToast(`⚡ ${successCount}-Slot Lab Recorded!`, `Absentees logged for Slots ${startSlot} to ${endSlot} (${subjectVal}).`);
    }
}

function submitModalForm() {
    const durationSelect = document.getElementById('durationSelect');
    const modalMultiSlotBreakdown = document.getElementById('modalMultiSlotBreakdown');
    handleMultiSlotSubmit(
        dateInput.value,
        rollNumbersInput.value,
        yearSelect.value,
        sectionSelect.value,
        subjectInput.value,
        slotSelect.value,
        durationSelect ? durationSelect.value : '1',
        modalMultiSlotBreakdown,
        submitBtn, submitBtnText, submitSpinner
    );
}

function submitDirectForm() {
    const directDurationSelect = document.getElementById('directDurationSelect');
    const directMultiSlotBreakdown = document.getElementById('directMultiSlotBreakdown');
    handleMultiSlotSubmit(
        directDateInput.value,
        directRollInput.value,
        directYearSelect.value,
        directSectionSelect.value,
        directSubjectInput.value,
        directSlotSelect.value,
        directDurationSelect ? directDurationSelect.value : '1',
        directMultiSlotBreakdown,
        directSubmitBtn, directSubmitBtnText, directSubmitSpinner
    );
}

// 5. Success Toast & Reset State
function showSuccessToast(payload) {
    const isUpdate = payload.isUpdate || payload.action === 'update';
    const rollCount = payload.rollNumbers === 'NIL' ? 0 : (normalizeRollNumbers(payload.rollNumbers).length);
    const actionLabel = isUpdate ? 'Attendance Updated!' : 'Attendance Recorded!';
    
    const toastTitleElem = document.querySelector('#successToast .toast-text');
    if (toastTitleElem) toastTitleElem.textContent = actionLabel;
    
    toastSubtext.textContent = `${rollCount} absentee(s) logged for ${payload.date} - ${payload.year} Sec ${payload.section} (${payload.subject})`;
    
    successToast.classList.add('active');

    setTimeout(() => {
        successToast.classList.remove('active');
    }, 2800);
}

function resetAllInputs() {
    clearTranscript();
    const todayStr = getTodayISOString();
    const deptConfig = DEPT_CONFIG[currentDept] || DEPT_CONFIG.BCA;
    manualTextInput.value = '';
    directDateInput.value = todayStr;
    dateInput.value = todayStr;
    directRollInput.value = '';
    setSubjectValue(directSubjectInput, deptConfig.defaultSubject);
    setSubjectValue(subjectInput, deptConfig.defaultSubject);
    directYearSelect.value = 'First Year';
    directSectionSelect.value = 'A';
    directSlotSelect.value = '1';

    const directDurationSelect = document.getElementById('directDurationSelect');
    const durationSelect = document.getElementById('durationSelect');
    if (directDurationSelect) directDurationSelect.value = '1';
    if (durationSelect) durationSelect.value = '1';

    const directMultiSlotWrapper = document.getElementById('directMultiSlotContainer');
    const directMultiSlotBreakdown = document.getElementById('directMultiSlotBreakdown');
    handleMultiSlotVisibility(directDurationSelect, directSlotSelect, directRollInput, directMultiSlotWrapper, directMultiSlotBreakdown);

    const modalMultiSlotWrapper = document.getElementById('modalMultiSlotContainer');
    const modalMultiSlotBreakdown = document.getElementById('modalMultiSlotBreakdown');
    handleMultiSlotVisibility(durationSelect, slotSelect, rollNumbersInput, modalMultiSlotWrapper, modalMultiSlotBreakdown);

    if (deleteBtn) deleteBtn.style.display = 'none';
    if (modalAlertBox) modalAlertBox.style.display = 'none';
    if (directAlertBox) directAlertBox.style.display = 'none';
    if (submitBtnText) submitBtnText.textContent = 'Submit Absentee';
    if (directSubmitBtnText) directSubmitBtnText.textContent = 'Submit Absentee';
}

// Delete = app history + Raw Data row (section B/C formulas refresh to blank)
async function deleteData(dateVal, yearVal, sectionVal, subjectVal, slotVal) {
    const cleanDate = dateVal || getTodayISOString();
    const cleanSlot = parseInt(slotVal, 10) || 1;

    const history = JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
    const targetItem = history.find(item => 
        item.date === cleanDate &&
        item.year === yearVal &&
        item.section === sectionVal &&
        item.subject.trim().toLowerCase() === subjectVal.trim().toLowerCase() &&
        parseInt(item.slot, 10) === cleanSlot
    );

    const confirmDelete = confirm(
        'Delete this attendance from Google Sheets?\n\n' +
        'Date: ' + cleanDate + '\n' +
        'Slot: ' + cleanSlot + ' (' + subjectVal + ')\n' +
        'Year/Section: ' + yearVal + ' Sec ' + sectionVal + '\n\n' +
        'This will:\n' +
        '- Remove the row from Raw Data\n' +
        '- Section sheet subject/absentees go blank (formulas stay)\n' +
        '- Remove it from today\'s list on this phone\n\n' +
        'To only fix roll numbers, tap Cancel and use Edit/Submit instead.'
    );

    if (!confirmDelete) return;

    const prevRolls = targetItem ? normalizeRollNumbers(targetItem.rollNumbers) : [];
    const prevStr = prevRolls.length > 0 ? prevRolls.join(', ') : 'NIL';

    const updatedHistory = history.filter(item => 
        !(item.date === cleanDate &&
          item.year === yearVal &&
          item.section === sectionVal &&
          item.subject.trim().toLowerCase() === subjectVal.trim().toLowerCase() &&
          parseInt(item.slot, 10) === cleanSlot)
    );
    localStorage.setItem('mgm_attendance_history', JSON.stringify(updatedHistory));
    renderHistoryList();

    const payload = {
        action: 'delete',
        date: cleanDate,
        year: yearVal,
        section: sectionVal,
        subject: subjectVal,
        slot: cleanSlot,
        rollNumbers: 'NIL',
        previousRollNumbers: prevStr,
        deletedRollNumbers: prevStr,
        changesSummary: `Deleted Raw Data row (section formulas refresh; was: ${prevStr})`
    };

    console.log('Sending Delete Payload:', payload);

    try {
        const targetUrl = getWebhookUrl(currentDept);
        await postWithRetry(targetUrl, payload, 2);
    } catch (e) {
        console.error('Error sending delete request:', e);
        alert('Could not reach Google Sheets. Removed from app history on phone — check Raw Data / section sheet manually.');
    }

    closeConfirmationModal();
    resetAllInputs();

    const toastTitleElem = document.querySelector('#successToast .toast-text');
    if (toastTitleElem) toastTitleElem.textContent = 'Deleted from Sheets';
    toastSubtext.textContent = `Raw Data deleted — section formulas will clear (${cleanDate}, Slot ${cleanSlot})`;
    successToast.classList.add('active');
    setTimeout(() => successToast.classList.remove('active'), 2800);
}

function deleteHistoryEntry(index) {
    const today = getTodayEntries();
    const item = today[index];
    if (!item) return;
    deleteData(item.date, item.year, item.section, item.subject, item.slot);
}

const SLOT_TIME_LABELS = {
    1: '9-9.55',
    2: '10-10.55',
    3: '11.10-12.05',
    4: '12.10-1.05',
    5: '1.05-2',
    6: '2-2.55',
    7: '3-3.55',
    8: '4-4.55'
};

function entryKey(item) {
    return [
        item.date || '',
        item.year || '',
        item.section || '',
        (item.subject || '').trim().toLowerCase(),
        String(parseInt(item.slot, 10) || 1)
    ].join('|');
}

function readAllHistory() {
    try {
        return JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
    } catch (e) {
        return [];
    }
}

/** Keep only today on this phone; drop older days. */
function pruneOldHistory() {
    const today = getTodayISOString();
    const kept = readAllHistory().filter(item => item.date === today).slice(0, 15);
    localStorage.setItem('mgm_attendance_history', JSON.stringify(kept));
    return kept;
}

function getTodayEntries() {
    const today = getTodayISOString();
    return readAllHistory()
        .filter(item => item.date === today && (item.stream || 'BCA') === currentDept)
        .slice(0, 15);
}

function updateTodayBadge() {
    const badge = document.getElementById('todayCountBadge');
    const count = getTodayEntries().length;
    if (badge) {
        if (count > 0) {
            badge.hidden = false;
            badge.textContent = String(count);
        } else {
            badge.hidden = true;
            badge.textContent = '0';
        }
    }
    const sub = document.getElementById('todayDrawerSubtitle');
    if (sub) {
        sub.textContent = count === 0
            ? 'No classes marked yet today'
            : count + ' class' + (count === 1 ? '' : 'es') + ' marked today — edit or delete any';
    }
}

// Local log for today's corrections on this phone
function saveToLocalHistory(entry) {
    const today = getTodayISOString();
    const entryDate = entry.date || today;
    let history = readAllHistory().filter(item => item.date === today || item.date === entryDate);

    const normalized = {
        ...entry,
        date: entryDate,
        timestamp: entry.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const existingIdx = history.findIndex(item => entryKey(item) === entryKey(normalized));

    if (existingIdx !== -1) {
        history[existingIdx] = { ...history[existingIdx], ...normalized };
        const updated = history.splice(existingIdx, 1)[0];
        history.unshift(updated);
    } else {
        history.unshift(normalized);
    }

    history = history.filter(item => item.date === today).slice(0, 20);
    localStorage.setItem('mgm_attendance_history', JSON.stringify(history));
    renderHistoryList();
}

function showCustomToast(title, subtitle) {
    if (!successToast) return;
    const toastTitleElem = document.querySelector('#successToast .toast-text');
    if (toastTitleElem) toastTitleElem.textContent = title;
    if (toastSubtext) toastSubtext.textContent = subtitle || '';
    successToast.classList.add('active');
    setTimeout(() => successToast.classList.remove('active'), 3500);
}

async function syncOfflineEntries() {
    const history = readAllHistory();
    const offlineItems = history.filter(item => item.offline === true);
    if (offlineItems.length === 0) {
        updateSyncButtonState();
        return 0;
    }

    const syncBtn = document.getElementById('syncOfflineBtn');
    if (syncBtn) {
        syncBtn.disabled = true;
        syncBtn.textContent = 'Syncing...';
    }

    let syncedCount = 0;
    for (let i = 0; i < history.length; i++) {
        if (history[i].offline) {
            const item = history[i];
            const targetUrl = getWebhookUrl(item.stream || currentDept);
            const payload = { ...item };
            delete payload.offline;

            try {
                await postWithRetry(targetUrl, payload, 1);
                history[i].offline = false;
                syncedCount++;
            } catch (err) {
                console.warn('Offline sync attempt failed for item:', item, err);
            }
        }
    }

    localStorage.setItem('mgm_attendance_history', JSON.stringify(history));
    renderHistoryList();
    updateSyncButtonState();

    if (syncedCount > 0) {
        showCustomToast('⚡ Synced ' + syncedCount + ' entry(s)!', 'Uploaded offline records to Google Sheet.');
    }
    return syncedCount;
}

function updateSyncButtonState() {
    const history = readAllHistory();
    const offlineCount = history.filter(item => item.offline === true).length;
    const syncBtn = document.getElementById('syncOfflineBtn');
    const pendingCountEl = document.getElementById('pendingSyncCount');

    if (syncBtn) {
        if (offlineCount > 0) {
            syncBtn.style.display = 'inline-flex';
            syncBtn.disabled = false;
            if (pendingCountEl) pendingCountEl.textContent = offlineCount;
        } else {
            syncBtn.style.display = 'none';
        }
    }
}

let isFetchingServerHistory = false;

function fetchTodayServerHistory() {
    if (isFetchingServerHistory) return;
    isFetchingServerHistory = true;

    const stream = currentDept || 'BCA';
    const dateVal = getTodayISOString();
    const targetUrl = getWebhookUrl(stream);
    const cbName = 'mgm_history_server_cb_' + Date.now();

    const timeout = setTimeout(() => {
        isFetchingServerHistory = false;
        try { delete window[cbName]; } catch (e) {}
    }, 6000);

    window[cbName] = function (data) {
        clearTimeout(timeout);
        isFetchingServerHistory = false;
        try { delete window[cbName]; } catch (e) {}

        if (data && data.result === 'success' && data.entries) {
            const serverEntries = data.entries.map(e => ({
                stream: stream,
                date: dateVal,
                year: e.year || 'First Year',
                section: e.section || 'A',
                subject: e.subject || 'Subject',
                slot: parseInt(e.slot, 10) || 1,
                rollNumbers: e.rollNumbers || 'NIL',
                offline: false,
                timestamp: 'Server Entry'
            }));

            const history = readAllHistory();
            const offlineOnly = history.filter(item => item.offline === true);

            const merged = [...offlineOnly];
            serverEntries.forEach(sEntry => {
                if (!merged.some(m => entryKey(m) === entryKey(sEntry))) {
                    merged.push(sEntry);
                }
            });

            localStorage.setItem('mgm_attendance_history', JSON.stringify(merged));
            renderHistoryList();
        }
    };

    const params = new URLSearchParams({
        action: 'get_absentees',
        stream: stream,
        date: dateVal,
        callback: cbName
    });

    const scriptEl = document.createElement('script');
    scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
    scriptEl.onerror = function () {
        clearTimeout(timeout);
        isFetchingServerHistory = false;
        try { delete window[cbName]; } catch (e) {}
    };
    document.body.appendChild(scriptEl);
}

function renderHistoryList() {
    pruneOldHistory();
    const today = getTodayEntries();
    updateTodayBadge();
    updateSyncButtonState();

    if (!historyList) return;

    if (today.length === 0) {
        historyList.innerHTML = '<p class="transcript-placeholder" style="text-align: center; margin-top: 20px;">No entries today — submit above.</p>';
        return;
    }

    historyList.innerHTML = today.map((item, index) => {
        const slotNum = parseInt(item.slot, 10) || 1;
        const slotLabel = SLOT_TIME_LABELS[slotNum] || ('Slot ' + slotNum);
        const rolls = item.rollNumbers === 'NIL'
            ? '<span class="badge badge-nil">NIL (All Present)</span>'
            : (Array.isArray(item.rollNumbers) ? escapeHTML(item.rollNumbers.join(', ')) : escapeHTML(String(item.rollNumbers)));

        const statusBadge = item.offline 
            ? '<span class="badge badge-warning" style="background: rgba(239,68,68,0.2); color: #f87171; border: 1px solid rgba(239,68,68,0.3);">🔴 Offline (Pending Sync)</span>'
            : '<span class="badge badge-success">🟢 Synced to Sheet</span>';

        return (
        '<div class="history-card">' +
            '<div class="history-top">' +
                '<span class="history-title">' + escapeHTML(item.year) + ' Sec ' + escapeHTML(item.section) + '</span>' +
                '<span class="history-time">' + escapeHTML(item.timestamp || '') + '</span>' +
            '</div>' +
            '<div class="history-details">' +
                '<span>Subject: <strong>' + escapeHTML(item.subject) + '</strong></span>' +
                '<span>Slot ' + slotNum + ': <strong>' + slotLabel + '</strong></span>' +
            '</div>' +
            '<div class="history-rolls">Absentees: ' + rolls + '</div>' +
            '<div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center;">' +
                statusBadge +
                '<div style="display: flex; gap: 6px;">' +
                    '<button type="button" class="btn-history-edit" data-index="' + index + '">Edit</button>' +
                    '<button type="button" class="btn-history-delete" data-index="' + index + '" title="Deletes Raw Data row; section formulas go blank">Delete</button>' +
                '</div>' +
            '</div>' +
        '</div>'
        );
    }).join('');

    document.querySelectorAll('.btn-history-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
            editHistoryEntry(idx);
        });
    });

    document.querySelectorAll('.btn-history-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
            deleteHistoryEntry(idx);
        });
    });
}

function editHistoryEntry(index) {
    const today = getTodayEntries();
    const item = today[index];
    if (!item) return;

    dateInput.value = item.date || getTodayISOString();
    rollNumbersInput.value = item.rollNumbers === 'NIL' ? '' : (Array.isArray(item.rollNumbers) ? item.rollNumbers.join(', ') : item.rollNumbers);
    yearSelect.value = item.year || 'First Year';
    sectionSelect.value = item.section || 'A';
    setSubjectValue(subjectInput, item.subject || deptConfig.defaultSubject);
    slotSelect.value = item.slot ? item.slot.toString() : '1';

    directDateInput.value = dateInput.value;
    directRollInput.value = rollNumbersInput.value;
    directYearSelect.value = yearSelect.value;
    directSectionSelect.value = sectionSelect.value;
    setSubjectValue(directSubjectInput, subjectInput.value);
    directSlotSelect.value = slotSelect.value;

    if (deleteBtn) {
        deleteBtn.style.display = 'inline-block';
        deleteBtn.onclick = () => {
            deleteData(dateInput.value, yearSelect.value, sectionSelect.value, subjectInput.value, slotSelect.value);
        };
    }

    updateModalDoubleEntryCheck();
    historyDrawer.classList.remove('active');
    confirmationModal.classList.add('active');
}

// Sound Visualizer Animation
function startVisualizer() {
    if (!canvas || !canvasCtx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let step = 0;
    function draw() {
        if (!isListening || !canvasCtx) return;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = '#6366f1';
        canvasCtx.beginPath();

        const width = canvas.width;
        const height = canvas.height;
        const sliceWidth = width / 100;
        let x = 0;

        for (let i = 0; i < 100; i++) {
            const v = Math.sin(step + i * 0.1) * (Math.random() * 12 + 4);
            const y = height / 2 + v;
            if (i === 0) canvasCtx.moveTo(x, y);
            else canvasCtx.lineTo(x, y);
            x += sliceWidth;
        }

        canvasCtx.stroke();
        step += 0.15;
        animationFrameId = requestAnimationFrame(draw);
    }
    draw();
}

function stopVisualizer() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (canvasCtx && canvas) canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateStatus(msg, type) {
    statusText.textContent = msg;
    if (type === 'error') {
        statusPill.style.borderColor = 'var(--danger-color)';
        statusPill.style.color = 'var(--danger-color)';
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

let currentDateTrack = getTodayISOString();

function checkAndRefreshDate() {
    const freshDate = getTodayISOString();
    if (freshDate !== currentDateTrack) {
        currentDateTrack = freshDate;
        if (dateInput) dateInput.value = freshDate;
        if (directDateInput) directDateInput.value = freshDate;
        if (todayBadge) {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            todayBadge.textContent = 'Today - ' + new Date().toLocaleDateString(undefined, options);
        }
        pruneOldHistory();
        renderHistoryList();
    }
}


function getPasscodeStore() {
    try {
        const store = JSON.parse(localStorage.getItem('mgm_custom_passcodes') || '{}');
        return {
            teacher: {
                BCA: store.teacherBCA || DEPT_CONFIG.BCA.passcode,
                BCM: store.teacherBCM || DEPT_CONFIG.BCM.passcode,
                BA: store.teacherBA || DEPT_CONFIG.BA.passcode,
                BSC: store.teacherBSC || DEPT_CONFIG.BSC.passcode
            },
            hod: {
                BCA: store.hodBCA || 'hodbca',
                BCM: store.hodBCM || 'hodbcm',
                BA: store.hodBA || 'hodba',
                BSC: store.hodBSC || 'hodbsc'
            },
            ADMIN: store.ADMIN || 'admin2026'
        };
    } catch (e) {
        return {
            teacher: {
                BCA: DEPT_CONFIG.BCA.passcode,
                BCM: DEPT_CONFIG.BCM.passcode,
                BA: DEPT_CONFIG.BA.passcode,
                BSC: DEPT_CONFIG.BSC.passcode
            },
            hod: {
                BCA: 'hodbca',
                BCM: 'hodbcm',
                BA: 'hodba',
                BSC: 'hodbsc'
            },
            ADMIN: 'admin2026'
        };
    }
}

function savePasscodeStore(store) {
    localStorage.setItem('mgm_custom_passcodes', JSON.stringify(store));
}

// Department Authentication & Multi-Stream Manager
function initDepartmentManager() {
    const deptCards = document.querySelectorAll('.dept-card');
    let selectedDept = 'BCA';

    deptCards.forEach(card => {
        card.addEventListener('click', () => {
            deptCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedDept = card.getAttribute('data-dept');
        });
    });

    if (togglePassBtn && deptPasscode) {
        togglePassBtn.addEventListener('click', () => {
            if (deptPasscode.type === 'password') {
                deptPasscode.type = 'text';
                togglePassBtn.textContent = '🙈';
            } else {
                deptPasscode.type = 'password';
                togglePassBtn.textContent = '👁️';
            }
        });
    }

    if (deptLoginForm) {
        deptLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const passcode = (deptPasscode.value || '').trim();
            const passcodes = getPasscodeStore();
            const config = DEPT_CONFIG[selectedDept];
            const teacherPass = (passcodes.teacher && passcodes.teacher[selectedDept]) || config.passcode;
            const hodPass = (passcodes.hod && passcodes.hod[selectedDept]) || ('hod' + selectedDept.toLowerCase());
            const adminPass = passcodes.ADMIN || 'admin2026';

            if (passcode === adminPass) {
                currentRole = 'ADMIN';
                isHODAuthenticated = true;
                localStorage.setItem('mgm_role', 'ADMIN');
                if (loginAlertBox) loginAlertBox.style.display = 'none';

                if (rememberDeptCheck && rememberDeptCheck.checked) {
                    localStorage.setItem('mgm_dept', selectedDept);
                } else {
                    localStorage.removeItem('mgm_dept');
                }

                applyDepartment(selectedDept);
                applyRoleUI();
                deptLoginModal.classList.remove('active');
                deptPasscode.value = '';

                if (pendingHODTabSwitch) {
                    pendingHODTabSwitch = false;
                    switchMode('hod');
                }
            } else if (passcode === hodPass) {
                currentRole = 'HOD';
                isHODAuthenticated = true;
                localStorage.setItem('mgm_role', 'HOD');
                if (loginAlertBox) loginAlertBox.style.display = 'none';

                if (rememberDeptCheck && rememberDeptCheck.checked) {
                    localStorage.setItem('mgm_dept', selectedDept);
                } else {
                    localStorage.removeItem('mgm_dept');
                }

                applyDepartment(selectedDept);
                applyRoleUI();
                deptLoginModal.classList.remove('active');
                deptPasscode.value = '';

                if (pendingHODTabSwitch) {
                    pendingHODTabSwitch = false;
                    switchMode('hod');
                }
            } else if (passcode === teacherPass) {
                currentRole = 'TEACHER';
                isHODAuthenticated = false;
                localStorage.setItem('mgm_role', 'TEACHER');
                if (loginAlertBox) loginAlertBox.style.display = 'none';

                if (rememberDeptCheck && rememberDeptCheck.checked) {
                    localStorage.setItem('mgm_dept', selectedDept);
                } else {
                    localStorage.removeItem('mgm_dept');
                }

                applyDepartment(selectedDept);
                applyRoleUI();
                deptLoginModal.classList.remove('active');
                deptPasscode.value = '';

                if (pendingHODTabSwitch) {
                    pendingHODTabSwitch = false;
                    if (loginAlertBox) {
                        loginAlertBox.style.display = 'block';
                        loginAlertBox.textContent = '❌ Teacher passcode entered. Please enter HOD Passcode to access HOD Portal.';
                    }
                    deptLoginModal.classList.add('active');
                }
            } else {
                if (loginAlertBox) {
                    loginAlertBox.style.display = 'block';
                    loginAlertBox.textContent = 'Invalid Passcode for ' + config.name + '. Please try again.';
                }
                deptPasscode.focus();
            }
        });
    }

    if (activeDeptBadge) {
        activeDeptBadge.addEventListener('click', () => {
            isHODAuthenticated = false;
            wipeHODPortalState();
            if (loginAlertBox) loginAlertBox.style.display = 'none';
            deptLoginModal.classList.add('active');
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            isHODAuthenticated = false;
            pendingHODTabSwitch = false;
            localStorage.removeItem('mgm_dept');
            localStorage.removeItem('mgm_role');
            if (deptPasscode) deptPasscode.value = '';
            if (loginAlertBox) loginAlertBox.style.display = 'none';
            wipeHODPortalState();
            if (currentDept === 'BCA') {
                switchMode('voice');
            } else {
                switchMode('typing');
            }
            deptLoginModal.classList.add('active');
            if (deptPasscode) deptPasscode.focus();
        });
    }

    // Auto Login from localStorage
    const savedDept = localStorage.getItem('mgm_dept');
    if (savedDept && DEPT_CONFIG[savedDept]) {
        applyDepartment(savedDept);
        applyRoleUI();
        deptLoginModal.classList.remove('active');
    } else {
        deptLoginModal.classList.add('active');
        applyDepartment('BCA');
        applyRoleUI();
    }
}

function applyRoleUI() {
    const hodRoleBadge = document.getElementById('hodRoleBadge');
    const hodStreamSelect = document.getElementById('hodStreamSelect');
    const hodFetchBtnText = document.getElementById('hodFetchBtnText');
    const deptNameShort = currentDept === 'BCM' ? 'B.Com' : (currentDept === 'BA' ? 'B.A.' : (currentDept === 'BSC' ? 'B.Sc.' : currentDept));

    if (currentRole === 'ADMIN') {
        if (hodRoleBadge) {
            hodRoleBadge.className = 'badge badge-warning';
            hodRoleBadge.textContent = '👑 Super Admin Mode';
        }
        if (hodStreamSelect) {
            hodStreamSelect.disabled = false;
        }
        if (hodFetchBtnText) {
            const activeStream = hodStreamSelect ? hodStreamSelect.value : currentDept;
            const label = activeStream === 'BCM' ? 'B.Com' : (activeStream === 'BA' ? 'B.A.' : (activeStream === 'BSC' ? 'B.Sc.' : activeStream));
            hodFetchBtnText.textContent = '🔄 Fetch ' + label + ' Absentees';
        }
    } else {
        if (hodRoleBadge) {
            hodRoleBadge.className = 'badge badge-success';
            hodRoleBadge.textContent = '🔒 HOD Mode (' + deptNameShort + ')';
        }
        if (hodStreamSelect) {
            hodStreamSelect.value = currentDept;
            hodStreamSelect.disabled = true;
        }
        if (hodFetchBtnText) {
            hodFetchBtnText.textContent = '🔄 Fetch ' + deptNameShort + ' Absentees';
        }
    }
}

function applyDepartment(deptCode) {
    if (!DEPT_CONFIG[deptCode]) return;
    currentDept = deptCode;
    wipeHODPortalState();
    const config = DEPT_CONFIG[deptCode];

    // Header updates
    if (deptSubtitle) deptSubtitle.textContent = config.name;
    if (activeDeptText) activeDeptText.textContent = config.code;
    if (activeDeptBadge) {
        activeDeptBadge.className = 'dept-active-badge ' + config.badgeClass;
    }

    // Voice assistant stream restriction: Available ONLY for BCA, hidden for BCM, BSC, BA
    if (voiceModeTab) {
        if (deptCode === 'BCA') {
            voiceModeTab.style.display = '';
        } else {
            voiceModeTab.style.display = 'none';
        }
    }

    // If active section was voice and switching to non-BCA stream, default to typing mode
    if (deptCode !== 'BCA') {
        const isVoiceActive = voiceModeTab && voiceModeTab.classList.contains('active');
        const isVoiceSectionVisible = voiceSection && voiceSection.style.display !== 'none';
        const isHodActive = hodSection && hodSection.style.display !== 'none';
        if (isVoiceActive || (isVoiceSectionVisible && !isHodActive)) {
            switchMode('typing');
        }
    }

    // Stream-specific Year dropdown labels
    updateYearSelects(config);

    // Section visibility & dropdown options (BCA/BCM have sections; BA/BSC do not)
    const initialYear = directYearSelect ? directYearSelect.value : 'First Year';
    updateSectionSelects(config.hasSections, deptCode, initialYear);

    // Preloaded Subject Dropdown options for active stream, selected year & section
    const initialSection = directSectionSelect ? directSectionSelect.value : 'A';
    const yearSubjects = getSubjectsForActiveYear(deptCode, initialYear, initialSection);
    updateSubjectDropdowns(yearSubjects, config.defaultSubject);

    // Render Stream Presets & update today count badge
    renderStreamPresets(config);
    updateTodayBadge();
    fetchCloudSubjects();
}

function updateYearSelects(config) {
    const yearSelects = [directYearSelect, yearSelect];
    let streamLabel = config.code;
    if (config.code === 'BCM') streamLabel = 'B.Com';
    else if (config.code === 'BA') streamLabel = 'B.A.';
    else if (config.code === 'BSC') streamLabel = 'B.Sc.';

    yearSelects.forEach(selectEl => {
        if (!selectEl) return;
        const curVal = selectEl.value || 'First Year';
        selectEl.innerHTML = '';
        const years = [
            { val: 'First Year', label: 'First Year ' + streamLabel },
            { val: 'Second Year', label: 'Second Year ' + streamLabel },
            { val: 'Third Year', label: 'Third Year ' + streamLabel }
        ];
        years.forEach(y => {
            const opt = document.createElement('option');
            opt.value = y.val;
            opt.textContent = y.label;
            selectEl.appendChild(opt);
        });
        selectEl.value = curVal;
    });
}

function getCustomSubjectsStore() {
    try {
        return JSON.parse(localStorage.getItem('mgm_custom_subjects') || '{}');
    } catch (e) {
        return {};
    }
}

function saveCustomSubjectsStore(store) {
    localStorage.setItem('mgm_custom_subjects', JSON.stringify(store));
}

function getCloudSubjectsStore() {
    try {
        return JSON.parse(localStorage.getItem('mgm_cloud_subjects') || '{}');
    } catch (e) {
        return {};
    }
}

function saveCloudSubjectsStore(store) {
    localStorage.setItem('mgm_cloud_subjects', JSON.stringify(store));
}

function getElectiveFlagsStore() {
    try {
        return JSON.parse(localStorage.getItem('mgm_elective_flags') || '{}');
    } catch (e) {
        return {};
    }
}

function saveElectiveFlagsStore(store) {
    localStorage.setItem('mgm_elective_flags', JSON.stringify(store));
}

function sendSubjectToCloud(action, deptCode, yearStr, subjName, isElective, sectionStr) {
    const targetSec = sectionStr || 'ALL';
    const payload = {
        action: action,
        stream: deptCode,
        year: yearStr,
        section: targetSec,
        subject: subjName,
        isElective: isElective === true || isElective === 'true'
    };
    const targetUrl = getWebhookUrl(deptCode);

    // 1. Dual-Engine Engine A: Submit via Hidden Form POST
    // Bypasses mobile CORS & 302 fetch body-drop issues on iOS/Android, working on both v16.4 and v16.5 Apps Script
    submitViaHiddenForm(targetUrl, payload).catch(e => console.warn('[SubjectSync] Hidden form submission error:', e));

    // 2. Dual-Engine Engine B: Submit via JSONP Script Tag GET
    return new Promise((resolve) => {
        const cbName = 'mgmSubjSync_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
        let scriptEl = null;
        let completed = false;

        const cleanup = () => {
            if (scriptEl && scriptEl.parentNode) {
                try { scriptEl.parentNode.removeChild(scriptEl); } catch (e) {}
            }
            try { delete window[cbName]; } catch (e) {}
        };

        const timeout = setTimeout(() => {
            if (completed) return;
            completed = true;
            cleanup();
            resolve(true);
        }, 5000);

        window[cbName] = function (data) {
            if (completed) return;
            completed = true;
            clearTimeout(timeout);
            cleanup();
            console.log('[SubjectSync] Cloud response received via JSONP:', data);
            resolve(data && data.result === 'success');
        };

        const params = new URLSearchParams({
            action: action,
            stream: deptCode,
            year: yearStr,
            section: targetSec,
            subject: subjName,
            isElective: payload.isElective ? 'true' : 'false',
            callback: cbName
        });

        scriptEl = document.createElement('script');
        scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
        scriptEl.onerror = function () {
            if (completed) return;
            completed = true;
            clearTimeout(timeout);
            cleanup();
            resolve(true);
        };
        document.body.appendChild(scriptEl);
    });
}

function fetchCloudSubjects() {
    const targetUrl = getWebhookUrl(currentDept);
    const cbName = 'mgmSubjectsCb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
    let scriptEl = null;

    const timeout = setTimeout(() => {
        if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
        try { delete window[cbName]; } catch (e) {}
    }, 8000);

    window[cbName] = function (data) {
        clearTimeout(timeout);
        try { delete window[cbName]; } catch (e) {}
        if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);

        if (data && data.result === 'success') {
            if (data.customSubjects) {
                saveCloudSubjectsStore(data.customSubjects);
            }

            if (data.deletedSubjects) {
                saveDeletedSubjectsStore(data.deletedSubjects);

                // Purge cloud-deleted subjects from local device customStore & cloudStore
                const customStore = getCustomSubjectsStore();
                let customChanged = false;
                for (let dDept in data.deletedSubjects) {
                    for (let dYr in data.deletedSubjects[dDept]) {
                        const delList = data.deletedSubjects[dDept][dYr] || [];
                        if (customStore[dDept] && customStore[dDept][dYr]) {
                            const beforeLen = customStore[dDept][dYr].length;
                            customStore[dDept][dYr] = customStore[dDept][dYr].filter(s =>
                                !delList.some(d => d.toLowerCase() === s.toLowerCase())
                            );
                            if (customStore[dDept][dYr].length !== beforeLen) customChanged = true;
                        }
                    }
                }
                if (customChanged) {
                    saveCustomSubjectsStore(customStore);
                }
            }

            if (data.electiveSubjects) {
                const flags = getElectiveFlagsStore();
                Object.assign(flags, data.electiveSubjects);
                saveElectiveFlagsStore(flags);
            }

            const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
            const yearSubjects = getSubjectsForActiveYear(currentDept, activeYear);
            const config = DEPT_CONFIG[currentDept];
            updateSubjectDropdowns(yearSubjects, config ? config.defaultSubject : null);
            renderSubjectChips();
        }
    };

    const params = new URLSearchParams({
        action: 'get_subjects',
        callback: cbName
    });

    scriptEl = document.createElement('script');
    scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
    scriptEl.onerror = function () {
        clearTimeout(timeout);
        try { delete window[cbName]; } catch (e) {}
        if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
    };
    document.body.appendChild(scriptEl);
}

function getDeletedSubjectsStore() {
    try {
        return JSON.parse(localStorage.getItem('mgm_deleted_subjects') || '{}');
    } catch (e) {
        return {};
    }
}

function saveDeletedSubjectsStore(store) {
    localStorage.setItem('mgm_deleted_subjects', JSON.stringify(store));
}

function deleteSubject(deptCode, yearStr, subjName) {
    const customStore = getCustomSubjectsStore();
    if (customStore[deptCode] && customStore[deptCode][yearStr]) {
        customStore[deptCode][yearStr] = customStore[deptCode][yearStr].filter(s => s.toLowerCase() !== subjName.toLowerCase());
        saveCustomSubjectsStore(customStore);
    }

    const cloudStore = getCloudSubjectsStore();
    if (cloudStore[deptCode] && cloudStore[deptCode][yearStr]) {
        cloudStore[deptCode][yearStr] = cloudStore[deptCode][yearStr].filter(s => s.toLowerCase() !== subjName.toLowerCase());
        saveCloudSubjectsStore(cloudStore);
    }

    const deletedStore = getDeletedSubjectsStore();
    if (!deletedStore[deptCode]) deletedStore[deptCode] = {};
    if (!deletedStore[deptCode][yearStr]) deletedStore[deptCode][yearStr] = [];
    if (!deletedStore[deptCode][yearStr].some(s => s.toLowerCase() === subjName.toLowerCase())) {
        deletedStore[deptCode][yearStr].push(subjName);
        saveDeletedSubjectsStore(deletedStore);
    }

    sendSubjectToCloud('delete_subject', deptCode, yearStr, subjName)
        .catch(e => console.warn('Subject delete cloud sync error:', e));

    showCustomToast('🗑️ Subject Deleted Across College', `"${subjName}" removed from ${deptCode} ${yearStr} on all devices.`);
}

function extractSubjNameAndSection(subj) {
    if (!subj) return { name: '', section: 'ALL' };
    if (typeof subj === 'string') return { name: subj, section: 'ALL' };
    return { name: subj.name || subj.subject || '', section: subj.section || 'ALL' };
}

function isCustomSubjectMatchingSection(subjObj, targetSec) {
    const sSec = subjObj.section || 'ALL';
    if (targetSec === 'ALL' || sSec === 'ALL' || sSec === 'ANY') return true;
    if (sSec === targetSec) return true;
    if (sSec === 'A_B' && (targetSec === 'A' || targetSec === 'B')) return true;
    if (targetSec === 'C' && (sSec === 'C (AIML)' || sSec === 'C (TP)' || sSec === 'C (AF)')) return true;
    return false;
}

function getSubjectsForActiveYear(deptCode, yearStr, sectionStr) {
    const config = DEPT_CONFIG[deptCode];
    if (!config) return [];

    let baseSubjects = [];
    const sec = sectionStr || 'ALL';

    if (config.subjectsByYearAndSection && config.subjectsByYearAndSection[yearStr]) {
        const secMap = config.subjectsByYearAndSection[yearStr];
        let targetKey = sec;
        if (!secMap[targetKey]) {
            if (targetKey === 'C' || targetKey === 'C TP' || targetKey.indexOf('TP') !== -1) targetKey = 'C (TP)';
            else if (targetKey === 'D' || targetKey === 'C AF' || targetKey.indexOf('AF') !== -1) targetKey = 'C (AF)';
        }
        if (sec !== 'ALL' && secMap[targetKey]) {
            baseSubjects = [...secMap[targetKey]];
        } else {
            // Combine all unique subjects across sections for this year
            const allSecSubjs = [];
            Object.values(secMap).forEach(arr => {
                arr.forEach(s => {
                    if (!allSecSubjs.some(existing => existing.toLowerCase() === s.toLowerCase())) {
                        allSecSubjs.push(s);
                    }
                });
            });
            baseSubjects = allSecSubjs;
        }
    } else if (config.subjectsByYear && config.subjectsByYear[yearStr]) {
        baseSubjects = [...config.subjectsByYear[yearStr]];
    } else {
        baseSubjects = [...(config.subjects || [])];
    }

    // Merge Cloud Synced Subjects (from Google Sheet)
    const cloudStore = getCloudSubjectsStore();
    const deptCloud = cloudStore[deptCode] || {};
    const cloudList = deptCloud[yearStr] || [];
    cloudList.forEach(subj => {
        const item = extractSubjNameAndSection(subj);
        if (isCustomSubjectMatchingSection(item, sec)) {
            if (!baseSubjects.some(s => s.toLowerCase() === item.name.toLowerCase())) {
                baseSubjects.push(item.name);
            }
        }
    });

    // Merge Device Local Custom Subjects
    const customStore = getCustomSubjectsStore();
    const deptCustom = customStore[deptCode] || {};
    const customList = deptCustom[yearStr] || [];
    customList.forEach(subj => {
        const item = extractSubjNameAndSection(subj);
        if (isCustomSubjectMatchingSection(item, sec)) {
            if (!baseSubjects.some(s => s.toLowerCase() === item.name.toLowerCase())) {
                baseSubjects.push(item.name);
            }
        }
    });

    const deletedStore = getDeletedSubjectsStore();
    const deptDeleted = deletedStore[deptCode] || {};
    const deletedList = deptDeleted[yearStr] || [];

    baseSubjects = baseSubjects.filter(subj => !deletedList.some(d => d.toLowerCase() === subj.toLowerCase()));

    return baseSubjects;
}

function updateSubjectDropdowns(subjects, defaultSubject) {
    const subjectSelects = [directSubjectInput, subjectInput];
    subjectSelects.forEach(selectEl => {
        if (!selectEl) return;
        selectEl.innerHTML = '';
        if (subjects && Array.isArray(subjects)) {
            subjects.forEach(subj => {
                const opt = document.createElement('option');
                opt.value = subj;
                opt.textContent = subj;
                selectEl.appendChild(opt);
            });
        }
        if (defaultSubject) {
            setSubjectValue(selectEl, defaultSubject);
        }
    });
}

function isElectiveOrLanguageSubject(subjectVal, deptCode, yearStr) {
    if (!subjectVal) return false;
    const cleanSubj = subjectVal.trim().toLowerCase();

    const dept = deptCode || currentDept || 'BCA';
    const yr = yearStr || (directYearSelect ? directYearSelect.value : 'First Year');
    const key = (dept + '_' + yr + '_' + cleanSubj).toLowerCase();

    const flags = getElectiveFlagsStore();
    // 1. Check exact key (Dept + Year + Subject)
    if (flags[key] !== undefined) {
        return Boolean(flags[key]);
    }

    // 2. Check general subject name key across any store entry (exact or fuzzy language root)
    for (let fKey in flags) {
        const fSubj = fKey.includes('_') ? fKey.split('_').pop() : fKey;
        if (fSubj === cleanSubj || fKey.endsWith('_' + cleanSubj) || 
            (fSubj.startsWith('sansk') && cleanSubj.startsWith('sansk')) || 
            (fSubj.startsWith('kan') && cleanSubj.startsWith('kan')) || 
            (fSubj.startsWith('hin') && cleanSubj.startsWith('hin'))) {
            return Boolean(flags[fKey]);
        }
    }

    // Explicit Labs / Practicals are ALWAYS section-specific unless explicitly overridden in flags above
    if (/\b(lab|practical)\b/i.test(cleanSubj)) {
        return false;
    }

    // 3. Fallback regex matching languages & electives
    return /\b(kannada|kanada|kanad|kan|hindi|hindhi|hind|hin|sanskrit|sanskrith|sanskritha|sanskrut|sanskrutha|sanskritam|sansk|sans|devops|wcms|ost|open\s*source|digital\s*fluency|cyber\s*security|e-?filing|journalism|optional\s*english|human\s*rights|elective)\b/i.test(cleanSubj);
}

function checkLanguageElectiveAutoCombined(subjectVal, sectionSelectElem, yearSelectElem, forceToast) {
    if (!subjectVal || !sectionSelectElem) return;
    const yrVal = yearSelectElem ? yearSelectElem.value : (directYearSelect ? directYearSelect.value : 'First Year');
    const isElec = isElectiveOrLanguageSubject(subjectVal, currentDept, yrVal);

    if (isElec) {
        const wasNotAll = sectionSelectElem.value !== 'ALL';
        sectionSelectElem.value = 'ALL';
        if (wasNotAll || forceToast) {
            showCustomToast(
                'ℹ️ Combined Elective / Language Auto-Selected',
                `"${subjectVal}" is a combined elective across sections. Automatically set to Combined (ALL).`
            );
        }
    } else {
        // Non-elective (Core/Lab): Must NOT be set to ALL. Reset to Section A.
        if (sectionSelectElem.value === 'ALL') {
            sectionSelectElem.value = 'A';
        }
    }
}

function setSubjectValue(selectEl, subjectVal) {
    if (!selectEl || !subjectVal || !selectEl.options) return;
    let matchingOpt = Array.from(selectEl.options).find(o => o.value && o.value.toLowerCase() === subjectVal.toLowerCase());
    if (matchingOpt) {
        selectEl.value = matchingOpt.value;
    } else {
        const customOpt = document.createElement('option');
        customOpt.value = subjectVal;
        customOpt.textContent = subjectVal;
        selectEl.appendChild(customOpt);
        selectEl.value = subjectVal;
    }

    if (selectEl === directSubjectInput && directSectionSelect) {
        checkLanguageElectiveAutoCombined(subjectVal, directSectionSelect, directYearSelect);
    } else if (selectEl === subjectInput && sectionSelect) {
        checkLanguageElectiveAutoCombined(subjectVal, sectionSelect, yearSelect);
    }
}

function updateSectionSelects(hasSections, deptCode, yearStr) {
    const dept = deptCode || currentDept || 'BCA';
    const year = yearStr || (directYearSelect ? directYearSelect.value : 'First Year');
    const isFirstYear = year === 'First Year' || year === '1' || year === '1st Year';

    const sectionSelects = [directSectionSelect, sectionSelect];
    sectionSelects.forEach(selectEl => {
        if (!selectEl) return;
        const curVal = selectEl.value;
        selectEl.innerHTML = '';
        const formGroup = selectEl.closest('.form-group') || selectEl.parentElement;
        if (hasSections) {
            selectEl.disabled = false;
            if (formGroup) formGroup.style.display = '';
            let options = [];

            if (dept === 'BCA') {
                if (isFirstYear) {
                    options = [
                        { val: 'A', label: 'Section A (General BCA)' },
                        { val: 'B', label: 'Section B (General BCA)' },
                        { val: 'C', label: 'Section C (AIML)' },
                        { val: 'ALL', label: 'Combined (Sec A, B, C / Electives)' }
                    ];
                } else {
                    options = [
                        { val: 'A', label: 'Section A' },
                        { val: 'B', label: 'Section B' },
                        { val: 'C', label: 'Section C' },
                        { val: 'ALL', label: 'Combined (Sec A, B, C / Electives)' }
                    ];
                }
            } else if (dept === 'BCM' || dept === 'BCOM') {
                options = [
                    { val: 'A', label: 'Section A (General B.Com)' },
                    { val: 'B', label: 'Section B (General B.Com)' },
                    { val: 'C (TP)', label: 'Section C (TP - Tax Procedure)' },
                    { val: 'C (AF)', label: 'Section C (AF - Accounting & Finance)' },
                    { val: 'ALL', label: 'Combined (Sec A, B, C / Electives)' }
                ];
            } else {
                options = [
                    { val: 'A', label: 'Section A' },
                    { val: 'B', label: 'Section B' },
                    { val: 'C', label: 'Section C' },
                    { val: 'ALL', label: 'Combined (Sec A, B, C / Electives)' }
                ];
            }

            options.forEach(o => {
                const opt = document.createElement('option');
                opt.value = o.val;
                opt.textContent = o.label;
                selectEl.appendChild(opt);
            });

            const valid = options.some(o => o.val === curVal);
            selectEl.value = valid ? curVal : 'A';
        } else {
            const opt = document.createElement('option');
            opt.value = 'A';
            opt.textContent = 'N/A (No Section)';
            selectEl.appendChild(opt);
            selectEl.value = 'A';
            selectEl.disabled = true;
            if (formGroup) formGroup.style.display = 'none';
        }
    });
}

function renderStreamPresets(config) {
    const presetPillsContainer = document.querySelector('.preset-pills');
    if (!presetPillsContainer || !config.samplePresets) return;

    presetPillsContainer.innerHTML = '';
    config.samplePresets.forEach(preset => {
        const btn = document.createElement('button');
        btn.className = 'preset-pill';
        btn.setAttribute('data-phrase', preset.phrase);
        btn.textContent = preset.label;
        btn.addEventListener('click', () => {
            manualTextInput.value = preset.phrase;
            autoProcessSpeech(preset.phrase);
        });
        presetPillsContainer.appendChild(btn);
    });
}

// Event Initialization
document.addEventListener('DOMContentLoaded', () => {
    const todayStr = getTodayISOString();
    currentDateTrack = todayStr;
    if (dateInput) dateInput.value = todayStr;
    if (directDateInput) directDateInput.value = todayStr;
    if (todayBadge) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        todayBadge.textContent = 'Today - ' + new Date().toLocaleDateString(undefined, options);
    }

    initDepartmentManager();
    initSubjectManager();
    initPasscodeManager();
    initThemeToggle();

    // Auto-refresh date after midnight 12 AM when page is visible/focused
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkAndRefreshDate();
    });
    window.addEventListener('focus', checkAndRefreshDate);
    setInterval(checkAndRefreshDate, 60000);

    initSpeechRecognition();

    // Mode Switcher Tabs
    if (voiceModeTab) voiceModeTab.addEventListener('click', () => switchMode('voice'));
    if (typingModeTab) typingModeTab.addEventListener('click', () => switchMode('typing'));
    if (hodModeTab) hodModeTab.addEventListener('click', () => switchMode('hod'));

    initHODPortal();

    // Voice Actions
    if (micBtn) micBtn.addEventListener('click', toggleListening);
    if (clearTranscriptBtn) clearTranscriptBtn.addEventListener('click', clearTranscript);
    if (processBtn) processBtn.addEventListener('click', () => autoProcessSpeech());

    // Manual Typing Actions
    if (parseTypedTextBtn) parseTypedTextBtn.addEventListener('click', handleTypedTextParse);
    if (clearManualTextBtn) clearManualTextBtn.addEventListener('click', () => manualTextInput.value = '');
    if (directResetBtn) directResetBtn.addEventListener('click', resetAllInputs);
    if (directSubmitBtn) directSubmitBtn.addEventListener('click', submitDirectForm);

    // Modal Actions
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeConfirmationModal);
    if (cancelBtn) cancelBtn.addEventListener('click', () => {
        resetAllInputs();
        closeConfirmationModal();
    });
    if (submitBtn) submitBtn.addEventListener('click', submitModalForm);

    // Year selection change listeners to filter subjects by year & update section options
    if (directYearSelect) {
        directYearSelect.addEventListener('change', () => {
            const config = DEPT_CONFIG[currentDept];
            const hasSec = config ? config.hasSections : true;
            const yrVal = directYearSelect.value;
            updateSectionSelects(hasSec, currentDept, yrVal);
            const secVal = directSectionSelect ? directSectionSelect.value : 'A';
            const yearSubjects = getSubjectsForActiveYear(currentDept, yrVal, secVal);
            updateSubjectDropdowns(yearSubjects, config ? config.defaultSubject : null);
        });
    }

    if (yearSelect) {
        yearSelect.addEventListener('change', () => {
            const config = DEPT_CONFIG[currentDept];
            const hasSec = config ? config.hasSections : true;
            const yrVal = yearSelect.value;
            updateSectionSelects(hasSec, currentDept, yrVal);
            const secVal = sectionSelect ? sectionSelect.value : 'A';
            const yearSubjects = getSubjectsForActiveYear(currentDept, yrVal, secVal);
            updateSubjectDropdowns(yearSubjects, config ? config.defaultSubject : null);
        });
    }

    // Section selection change listeners to filter subjects by section
    if (directSectionSelect) {
        directSectionSelect.addEventListener('change', () => {
            const config = DEPT_CONFIG[currentDept];
            const yrVal = directYearSelect ? directYearSelect.value : 'First Year';
            const yearSubjects = getSubjectsForActiveYear(currentDept, yrVal, directSectionSelect.value);
            updateSubjectDropdowns(yearSubjects, config ? config.defaultSubject : null);
        });
    }

    if (sectionSelect) {
        sectionSelect.addEventListener('change', () => {
            const config = DEPT_CONFIG[currentDept];
            const yrVal = yearSelect ? yearSelect.value : 'First Year';
            const yearSubjects = getSubjectsForActiveYear(currentDept, yrVal, sectionSelect.value);
            updateSubjectDropdowns(yearSubjects, config ? config.defaultSubject : null);
        });
    }

    // Live Double Entry warning listeners & Auto-Combined for languages/electives
    [dateInput, yearSelect, sectionSelect, subjectInput, slotSelect].forEach(elem => {
        if (elem) {
            elem.addEventListener('change', () => {
                if (elem === subjectInput || elem === sectionSelect) checkLanguageElectiveAutoCombined(subjectInput.value, sectionSelect, yearSelect);
                updateModalDoubleEntryCheck();
            });
            elem.addEventListener('input', () => {
                if (elem === subjectInput || elem === sectionSelect) checkLanguageElectiveAutoCombined(subjectInput.value, sectionSelect, yearSelect);
                updateModalDoubleEntryCheck();
            });
        }
    });

    [directDateInput, directYearSelect, directSectionSelect, directSubjectInput, directSlotSelect].forEach(elem => {
        if (elem) {
            elem.addEventListener('change', () => {
                if (elem === directSubjectInput || elem === directSectionSelect) checkLanguageElectiveAutoCombined(directSubjectInput.value, directSectionSelect, directYearSelect);
                updateDirectDoubleEntryCheck();
            });
            elem.addEventListener('input', () => {
                if (elem === directSubjectInput || elem === directSectionSelect) checkLanguageElectiveAutoCombined(directSubjectInput.value, directSectionSelect, directYearSelect);
                updateDirectDoubleEntryCheck();
            });
        }
    });

    const directDurationSelect = document.getElementById('directDurationSelect');
    const durationSelect = document.getElementById('durationSelect');
    const directMultiSlotWrapper = document.getElementById('directMultiSlotContainer');
    const directMultiSlotBreakdown = document.getElementById('directMultiSlotBreakdown');
    const modalMultiSlotWrapper = document.getElementById('modalMultiSlotContainer');
    const modalMultiSlotBreakdown = document.getElementById('modalMultiSlotBreakdown');

    if (directDurationSelect) {
        directDurationSelect.addEventListener('change', () => {
            handleMultiSlotVisibility(directDurationSelect, directSlotSelect, directRollInput, directMultiSlotWrapper, directMultiSlotBreakdown);
        });
    }

    if (durationSelect) {
        durationSelect.addEventListener('change', () => {
            handleMultiSlotVisibility(durationSelect, slotSelect, rollNumbersInput, modalMultiSlotWrapper, modalMultiSlotBreakdown);
        });
    }

    if (directSlotSelect) {
        directSlotSelect.addEventListener('change', () => {
            handleMultiSlotVisibility(directDurationSelect, directSlotSelect, directRollInput, directMultiSlotWrapper, directMultiSlotBreakdown);
        });
    }

    if (slotSelect) {
        slotSelect.addEventListener('change', () => {
            handleMultiSlotVisibility(durationSelect, slotSelect, rollNumbersInput, modalMultiSlotWrapper, modalMultiSlotBreakdown);
        });
    }

    if (directRollInput) {
        directRollInput.addEventListener('input', () => {
            if (directDurationSelect && parseInt(directDurationSelect.value, 10) > 1) {
                handleMultiSlotVisibility(directDurationSelect, directSlotSelect, directRollInput, directMultiSlotWrapper, directMultiSlotBreakdown);
            }
        });
    }

    if (rollNumbersInput) {
        rollNumbersInput.addEventListener('input', () => {
            if (durationSelect && parseInt(durationSelect.value, 10) > 1) {
                handleMultiSlotVisibility(durationSelect, slotSelect, rollNumbersInput, modalMultiSlotWrapper, modalMultiSlotBreakdown);
            }
        });
    }

    // Header Drawer & Theme Toggle
    const openHistory = () => {
        renderHistoryList();
        historyDrawer.classList.add('active');
        fetchTodayServerHistory();
        syncOfflineEntries();
    };

    if (historyBtn) historyBtn.addEventListener('click', openHistory);
    document.querySelectorAll('.history-open-btn').forEach(btn => {
        btn.addEventListener('click', openHistory);
    });

    if (closeHistoryBtn) closeHistoryBtn.addEventListener('click', () => historyDrawer.classList.remove('active'));

    const syncOfflineBtn = document.getElementById('syncOfflineBtn');
    if (syncOfflineBtn) {
        syncOfflineBtn.addEventListener('click', syncOfflineEntries);
    }

    window.addEventListener('online', () => {
        console.log('[Network] Back online - triggering auto-sync...');
        syncOfflineEntries();
    });

    renderHistoryList();
    if (navigator.onLine) {
        setTimeout(syncOfflineEntries, 2000);
    }

    // Preset Pills
    document.querySelectorAll('.preset-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            const phrase = btn.getAttribute('data-phrase');
            currentTranscript = phrase;
            manualTextInput.value = phrase;
            interimTranscript = '';
            renderTranscript();
            autoProcessSpeech(phrase);
        });
    });

    renderHistoryList();

    // PWA Service Worker
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('[PWA] Service Worker Registered:', reg.scope))
                .catch(err => console.warn('[PWA] Service Worker Registration failed:', err));
        });
    }
});

function populateModalSectionOptions() {
    const secSelect = document.getElementById('newSubjectSectionSelect');
    if (!secSelect) return;
    secSelect.innerHTML = '';

    const dept = currentDept || 'BCA';
    const year = directYearSelect ? directYearSelect.value : 'First Year';
    const isFirstYear = year === 'First Year' || year === '1' || year === '1st Year';

    let options = [{ val: 'ALL', label: 'All Sections (General & Electives)' }];

    if (dept === 'BCA') {
        if (isFirstYear) {
            options.push({ val: 'A_B', label: 'Section A & B (General BCA)' });
            options.push({ val: 'C (AIML)', label: 'Section C (AIML)' });
        } else {
            options.push({ val: 'A', label: 'Section A' });
            options.push({ val: 'B', label: 'Section B' });
            options.push({ val: 'C', label: 'Section C' });
        }
    } else if (dept === 'BCM' || dept === 'BCOM') {
        options.push({ val: 'A_B', label: 'Section A & B (General B.Com)' });
        options.push({ val: 'C (TP)', label: 'Section C (TP - Tax Procedure)' });
        options.push({ val: 'C (AF)', label: 'Section C (AF - Accounting & Finance)' });
    }

    options.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.val;
        opt.textContent = o.label;
        secSelect.appendChild(opt);
    });
}

function initSubjectManager() {
    const manageBtnVoice = document.getElementById('manageSubjectBtnVoice');
    const manageBtnDirect = document.getElementById('manageSubjectBtnDirect');
    const manageBtnModal = document.getElementById('manageSubjectBtnModal');
    const subjectManageModal = document.getElementById('subjectManageModal');
    const closeSubjectModalBtn = document.getElementById('closeSubjectModalBtn');
    const doneSubjectModalBtn = document.getElementById('doneSubjectModalBtn');
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    const newSubjectInput = document.getElementById('newSubjectInput');
    const resetSubjectsBtn = document.getElementById('resetSubjectsBtn');

    const openModal = (e) => {
        if (e) e.preventDefault();
        const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
        const modalDeptText = document.getElementById('subjectModalDeptText');
        const modalYearText = document.getElementById('subjectModalYearText');

        if (modalDeptText && DEPT_CONFIG[currentDept]) modalDeptText.textContent = DEPT_CONFIG[currentDept].code;
        if (modalYearText) modalYearText.textContent = activeYear;

        populateModalSectionOptions();
        fetchCloudSubjects();
        renderSubjectChips();
        if (subjectManageModal) {
            subjectManageModal.classList.add('active');
        }
    };

    if (manageBtnVoice) manageBtnVoice.addEventListener('click', openModal);
    if (manageBtnDirect) manageBtnDirect.addEventListener('click', openModal);
    if (manageBtnModal) manageBtnModal.addEventListener('click', openModal);
    if (closeSubjectModalBtn) closeSubjectModalBtn.addEventListener('click', () => subjectManageModal.classList.remove('active'));
    if (doneSubjectModalBtn) doneSubjectModalBtn.addEventListener('click', () => subjectManageModal.classList.remove('active'));

    if (addSubjectBtn && newSubjectInput) {
        addSubjectBtn.addEventListener('click', (e) => {
            if (e) e.preventDefault();
            const val = newSubjectInput.value.trim();
            if (!val) {
                alert('Please type a subject name first.');
                newSubjectInput.focus();
                return;
            }
            const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
            const isElecCheckbox = document.getElementById('newSubjectIsElectiveCheckbox');
            const isElecChecked = isElecCheckbox ? isElecCheckbox.checked : false;
            const secSelectModal = document.getElementById('newSubjectSectionSelect');
            const targetSection = secSelectModal ? secSelectModal.value : 'ALL';
            const subjObj = { name: val, section: targetSection };

            const store = getCustomSubjectsStore();
            if (!store[currentDept]) store[currentDept] = {};
            if (!store[currentDept][activeYear]) store[currentDept][activeYear] = [];

            const existingIdx = store[currentDept][activeYear].findIndex(s =>
                (typeof s === 'string' ? s.toLowerCase() : (s.name || s.subject || '').toLowerCase()) === val.toLowerCase()
            );

            if (existingIdx !== -1) {
                store[currentDept][activeYear][existingIdx] = subjObj;
            } else {
                store[currentDept][activeYear].push(subjObj);
            }
            saveCustomSubjectsStore(store);

            // Un-delete subject if previously in local deleted store
            const deletedStore = getDeletedSubjectsStore();
            if (deletedStore[currentDept] && deletedStore[currentDept][activeYear]) {
                deletedStore[currentDept][activeYear] = deletedStore[currentDept][activeYear].filter(s => s.toLowerCase() !== val.toLowerCase());
                saveDeletedSubjectsStore(deletedStore);
            }

            const key = (currentDept + '_' + activeYear + '_' + val.trim()).toLowerCase();
            const flags = getElectiveFlagsStore();
            flags[key] = isElecChecked;
            saveElectiveFlagsStore(flags);

            sendSubjectToCloud('add_subject', currentDept, activeYear, val, isElecChecked, targetSection)
                .catch(e => console.warn('Subject add cloud sync error:', e));

            newSubjectInput.value = '';
            if (isElecCheckbox) isElecCheckbox.checked = false;
            renderSubjectChips();
            const yearSubjects = getSubjectsForActiveYear(currentDept, activeYear);
            updateSubjectDropdowns(yearSubjects, val);
            showCustomToast('⚡ Subject Synced to All Devices!', `"${val}" added as ${isElecChecked ? 'Combined Elective' : ('Section (' + targetSection + ') Subject')}.`);
        });
    }

    if (resetSubjectsBtn) {
        resetSubjectsBtn.addEventListener('click', () => {
            if (confirm('Reset subjects to default Mangalore University syllabus for ' + currentDept + '?')) {
                const customStore = getCustomSubjectsStore();
                delete customStore[currentDept];
                saveCustomSubjectsStore(customStore);

                const deletedStore = getDeletedSubjectsStore();
                delete deletedStore[currentDept];
                saveDeletedSubjectsStore(deletedStore);

                const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
                renderSubjectChips();
                const yearSubjects = getSubjectsForActiveYear(currentDept, activeYear);
                const config = DEPT_CONFIG[currentDept];
                updateSubjectDropdowns(yearSubjects, config ? config.defaultSubject : null);
            }
        });
    }
}

function renderSubjectChips() {
    const chipsContainer = document.getElementById('subjectChipsContainer');
    if (!chipsContainer) return;
    const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
    const subjects = getSubjectsForActiveYear(currentDept, activeYear);

    chipsContainer.innerHTML = '';
    if (subjects.length === 0) {
        chipsContainer.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-dim);">No subjects available for ' + activeYear + '. Click "+ Add" above to add subjects.</span>';
        return;
    }

    subjects.forEach(subj => {
        const chip = document.createElement('div');
        chip.className = 'subject-chip-tag';
        chip.style.display = 'inline-flex';
        chip.style.alignItems = 'center';
        chip.style.gap = '6px';

        const isElec = isElectiveOrLanguageSubject(subj, currentDept, activeYear);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = subj;
        chip.appendChild(nameSpan);

        const badgeBtn = document.createElement('button');
        badgeBtn.type = 'button';
        badgeBtn.style.cssText = 'font-size: 0.68rem; padding: 2px 6px; border-radius: 12px; cursor: pointer; border: 1px solid rgba(255,255,255,0.2); font-weight: 600; line-height: 1; margin: 0;';
        if (isElec) {
            badgeBtn.textContent = '⚡ Combined';
            badgeBtn.style.background = 'rgba(234, 179, 8, 0.2)';
            badgeBtn.style.color = '#eab308';
        } else {
            badgeBtn.textContent = '📌 Section';
            badgeBtn.style.background = 'rgba(59, 130, 246, 0.2)';
            badgeBtn.style.color = '#60a5fa';
        }
        badgeBtn.title = 'Click to toggle between Combined Elective (across sections) and Section-Specific';
        badgeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextState = !isElec;
            const key = (currentDept + '_' + activeYear + '_' + subj.trim()).toLowerCase();
            const flags = getElectiveFlagsStore();
            flags[key] = nextState;
            saveElectiveFlagsStore(flags);
            sendSubjectToCloud('add_subject', currentDept, activeYear, subj, nextState);
            renderSubjectChips();
            const yearSubjects = getSubjectsForActiveYear(currentDept, activeYear);
            updateSubjectDropdowns(yearSubjects, subj);
            showCustomToast('⚡ Subject Mode Updated', `"${subj}" set to ${nextState ? 'Combined Elective' : 'Section Subject'}.`);
        });
        chip.appendChild(badgeBtn);

        const delBtn = document.createElement('button');
        delBtn.className = 'subject-chip-del';
        delBtn.innerHTML = '&times;';
        delBtn.title = 'Delete "' + subj + '"';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteSubject(currentDept, activeYear, subj);
            renderSubjectChips();
            const yearSubjects = getSubjectsForActiveYear(currentDept, activeYear);
            const config = DEPT_CONFIG[currentDept];
            updateSubjectDropdowns(yearSubjects, config ? config.defaultSubject : null);
        });
        chip.appendChild(delBtn);

        chipsContainer.appendChild(chip);
    });
}

/* HOD PORTAL & WHATSAPP GENERATOR LOGIC */
function initHODPortal() {
    const hodStreamSelect = document.getElementById('hodStreamSelect');
    const hodDatePicker = document.getElementById('hodDatePicker');
    const hodFetchBtn = document.getElementById('hodFetchBtn');
    const hodShareAllWaBtn = document.getElementById('hodShareAllWaBtn');

    if (hodDatePicker && !hodDatePicker.value) {
        hodDatePicker.value = getTodayISOString();
    }

    if (hodFetchBtn) {
        hodFetchBtn.addEventListener('click', fetchHODAbsentees);
    }

    if (hodStreamSelect) {
        hodStreamSelect.addEventListener('change', fetchHODAbsentees);
    }

    if (hodDatePicker) {
        hodDatePicker.addEventListener('change', fetchHODAbsentees);
    }

    if (hodShareAllWaBtn) {
        hodShareAllWaBtn.addEventListener('click', () => {
            if (typeof shareHODMasterWhatsApp === 'function') {
                shareHODMasterWhatsApp();
            }
        });
    }
}

function fetchHODAbsentees() {
    const hodStreamSelect = document.getElementById('hodStreamSelect');
    const hodDatePicker = document.getElementById('hodDatePicker');
    const hodFetchBtnText = document.getElementById('hodFetchBtnText');
    const hodFetchSpinner = document.getElementById('hodFetchSpinner');
    const hodStatusMessage = document.getElementById('hodStatusMessage');
    const container = document.getElementById('hodSectionCardsContainer');
    const globalShareContainer = document.getElementById('hodGlobalShareContainer');

    const stream = (currentRole !== 'ADMIN') ? currentDept : (hodStreamSelect ? hodStreamSelect.value : currentDept);
    const dateVal = hodDatePicker ? hodDatePicker.value : getTodayISOString();

    const activeLabel = stream === 'BCM' ? 'B.Com' : (stream === 'BA' ? 'B.A.' : (stream === 'BSC' ? 'B.Sc.' : stream));

    if (hodFetchBtnText) hodFetchBtnText.textContent = 'Fetching ' + activeLabel + '...';
    if (hodFetchSpinner) hodFetchSpinner.style.display = 'inline-block';
    if (hodStatusMessage) hodStatusMessage.style.display = 'none';

    const targetUrl = getWebhookUrl(stream);
    const cbName = 'hod_callback_' + Date.now();

    window[cbName] = function (data) {
        delete window[cbName];
        if (hodFetchBtnText) hodFetchBtnText.textContent = '🔄 Fetch ' + activeLabel + ' Absentees';
        if (hodFetchSpinner) hodFetchSpinner.style.display = 'none';

        if (data && data.result === 'success') {
            currentHODData = data;
            renderHODSectionCards(data);
        } else {
            if (hodStatusMessage) {
                hodStatusMessage.style.display = 'flex';
                hodStatusMessage.innerHTML = '<span>⚠️ Failed to fetch absentees: ' + escapeHTML(data ? (data.error || data.message || 'Unknown error') : 'No response') + '</span>';
            }
            if (globalShareContainer) globalShareContainer.style.display = 'none';
        }
    };

    const params = new URLSearchParams({
        action: 'get_absentees',
        stream: stream,
        date: dateVal,
        callback: cbName
    });

    const scriptEl = document.createElement('script');
    scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
    scriptEl.onerror = function () {
        delete window[cbName];
        if (hodFetchBtnText) hodFetchBtnText.textContent = '🔄 Fetch ' + activeLabel + ' Absentees';
        if (hodFetchSpinner) hodFetchSpinner.style.display = 'none';

        const localHistory = JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
        const filtered = localHistory.filter(item => item.date === dateVal && (item.stream || 'BCA') === stream);
        
        const fallbackData = {
            result: 'success',
            date: dateVal,
            stream: stream,
            entries: filtered.map(item => ({
                year: item.year || '',
                section: item.section || '',
                subject: item.subject || '',
                slot: parseInt(item.slot, 10) || 1,
                rollNumbers: Array.isArray(item.rollNumbers) ? item.rollNumbers.join(', ') : String(item.rollNumbers || 'NIL')
            }))
        };

        currentHODData = fallbackData;
        renderHODSectionCards(fallbackData);

        if (hodStatusMessage) {
            hodStatusMessage.style.display = 'flex';
            hodStatusMessage.innerHTML = '<span>📱 <em>Offline Mode: Showing local attendance logs stored on this device.</em></span>';
        }
    };

    document.body.appendChild(scriptEl);
}


function filterHODSectionCards(yearFilter) {
    currentHODYearFilter = yearFilter;
    const tabs = document.querySelectorAll('.year-filter-tab');
    tabs.forEach(t => {
        if (t.getAttribute('data-year-filter') === yearFilter) t.classList.add('active');
        else t.classList.remove('active');
    });

    const cards = document.querySelectorAll('.hod-section-card');
    cards.forEach(card => {
        const cardYr = card.getAttribute('data-year-prefix');
        if (yearFilter === 'ALL' || cardYr === yearFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleHODCardAccordion(headerEl) {
    const card = headerEl.closest('.hod-section-card');
    if (card) {
        card.classList.toggle('collapsed');
    }
}

const SLOT_TIME_MAP = {
    1: '9:00 - 9:55 AM',
    2: '10:00 - 10:55 AM',
    3: '11:10 - 12:05 PM',
    4: '12:10 - 1:05 PM',
    5: '1:05 - 2:00 PM',
    6: '2:00 - 2:55 PM',
    7: '3:00 - 3:55 PM',
    8: '4:00 - 4:55 PM'
};

function getSlotTimeLabel(slotNum) {
    const s = parseInt(slotNum, 10) || 1;
    return SLOT_TIME_MAP[s] || `Slot ${s}`;
}

function renderHODSectionCards(data) {
    const container = document.getElementById('hodSectionCardsContainer');
    const globalShareContainer = document.getElementById('hodGlobalShareContainer');
    if (!container) return;

    const entries = data.entries || [];
    const stream = data.stream || 'BCA';
    const dateVal = data.date || getTodayISOString();

    if (entries.length === 0) {
        container.innerHTML = `
            <div class="hod-empty-state">
                <div style="font-size: 2.2rem; margin-bottom: 8px;">📭</div>
                <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">No Attendance Entries Found</h4>
                <p style="font-size: 0.84rem; color: var(--text-muted);">No attendance was submitted for <strong>${escapeHTML(stream)}</strong> on <strong>${escapeHTML(dateVal)}</strong>.</p>
            </div>`;
        if (globalShareContainer) {
            globalShareContainer.style.display = 'none';
            globalShareContainer.innerHTML = '';
        }
        return;
    }

    const groupedBySec = {};
    const groupedByYear = {};
    const hasSections = DEPT_CONFIG[stream] ? DEPT_CONFIG[stream].hasSections : true;

    entries.forEach(entry => {
        const yrPrefix = entry.year.includes('First') || entry.year === '1' ? 'I' :
                         entry.year.includes('Second') || entry.year === '2' ? 'II' : 'III';
        
        const yearFullLabel = yrPrefix === 'I' ? '1st Year' : (yrPrefix === 'II' ? '2nd Year' : '3rd Year');

        let sectionTitle = `${yrPrefix} ${stream}`;
        if (hasSections && entry.section) {
            sectionTitle += ` - Section ${entry.section}`;
        }

        if (!groupedBySec[sectionTitle]) groupedBySec[sectionTitle] = [];
        groupedBySec[sectionTitle].push(entry);

        if (!groupedByYear[yearFullLabel]) groupedByYear[yearFullLabel] = [];
        groupedByYear[yearFullLabel].push(entry);
    });

    // Render Year-Wise Combined WhatsApp buttons in globalShareContainer
    if (globalShareContainer) {
        let yearButtonsHtml = '<div style="display: flex; flex-direction: column; gap: 8px;">';
        
        Object.keys(groupedByYear).forEach(yearLabel => {
            const yrEntries = groupedByYear[yearLabel];
            const yrMsg = buildYearWhatsAppMessage(yearLabel, stream, dateVal, yrEntries);
            const encodedYrMsg = encodeURIComponent(yrMsg);
            
            const secNames = [...new Set(yrEntries.map(e => e.section || '').filter(Boolean))].sort().join(', ');
            const secSuffix = secNames ? ` (Sec ${secNames})` : '';

            yearButtonsHtml += `
                <button type="button" class="btn-whatsapp-global" onclick="openWhatsAppShare('${encodedYrMsg}')">
                    📱 Share ${escapeHTML(yearLabel)} ${escapeHTML(stream)}${escapeHTML(secSuffix)} Combined Report
                </button>`;
        });
        
        yearButtonsHtml += '</div>';
        globalShareContainer.innerHTML = yearButtonsHtml;
        globalShareContainer.style.display = 'block';
    }

    // Sort entries by slot inside each section
    Object.keys(groupedBySec).forEach(secKey => {
        groupedBySec[secKey].sort((a, b) => (parseInt(a.slot, 10) || 1) - (parseInt(b.slot, 10) || 1));
    });

    let html = '';
    const sectionKeys = Object.keys(groupedBySec);

    // Render Year Filter Tabs if there are multiple sections
    const yearsPresent = [...new Set(Object.keys(groupedByYear))].sort();
    if (yearsPresent.length > 0) {
        html += '<div class="year-filter-tabs">';
        html += `<button type="button" class="year-filter-tab ${currentHODYearFilter === 'ALL' ? 'active' : ''}" data-year-filter="ALL" onclick="filterHODSectionCards('ALL')">All Sections (${sectionKeys.length})</button>`;
        
        yearsPresent.forEach(yrLabel => {
            const yrCode = yrLabel.includes('1st') ? 'I' : (yrLabel.includes('2nd') ? 'II' : 'III');
            const count = Object.keys(groupedBySec).filter(k => k.startsWith(yrCode)).length;
            if (count > 0) {
                html += `<button type="button" class="year-filter-tab ${currentHODYearFilter === yrCode ? 'active' : ''}" data-year-filter="${yrCode}" onclick="filterHODSectionCards('${yrCode}')">${yrLabel} (${count})</button>`;
            }
        });
        html += '</div>';
    }

    sectionKeys.forEach((secTitle, index) => {
        const secEntries = groupedBySec[secTitle];
        const yrPrefix = secTitle.startsWith('I ') ? 'I' : (secTitle.startsWith('II ') ? 'II' : 'III');
        const isDisplay = (currentHODYearFilter === 'ALL' || currentHODYearFilter === yrPrefix) ? 'block' : 'none';
        const encodedMsg = encodeURIComponent(buildSectionWhatsAppMessage(secTitle, dateVal, secEntries));

        // Compact accordions collapsed by default when entries are large
        const isCollapsed = sectionKeys.length > 3 && index > 0 ? 'collapsed' : '';

        html += `
            <div class="hod-section-card ${isCollapsed}" data-year-prefix="${yrPrefix}" style="display: ${isDisplay};">
                <div class="hod-card-header" onclick="toggleHODCardAccordion(this)">
                    <div class="hod-card-title">
                        🏫 ${escapeHTML(secTitle)}
                        <span class="accordion-chevron">▼</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;" onclick="event.stopPropagation()">
                        <button type="button" class="btn-whatsapp-header" onclick="openWhatsAppShare('${encodedMsg}')">
                            📱 WhatsApp
                        </button>
                        <span class="hod-card-badge">${secEntries.length} slot${secEntries.length === 1 ? '' : 's'}</span>
                    </div>
                </div>
                <div class="hod-slots-list">`;

        secEntries.forEach(entry => {
            const slotNum = parseInt(entry.slot, 10) || 1;
            const timeLabel = getSlotTimeLabel(slotNum);
            const rolls = entry.rollNumbers && entry.rollNumbers !== 'NIL' ? entry.rollNumbers : 'NIL (All Present)';
            
            html += `
                <div class="hod-slot-row">
                    <div class="hod-slot-top">
                        <div class="hod-slot-info">
                            <span class="hod-slot-badge">Slot ${slotNum} (${timeLabel})</span>
                            <span>${escapeHTML(entry.subject || 'Subject')}</span>
                        </div>
                    </div>
                    <div class="hod-slot-rolls">
                        <strong>Absentees:</strong> ${escapeHTML(rolls)}
                    </div>
                </div>`;
        });

        html += `
                </div>
                <button type="button" class="btn-whatsapp-section" onclick="openWhatsAppShare('${encodedMsg}')">
                    📱 Send Detailed WhatsApp Notice for ${escapeHTML(secTitle)}
                </button>
            </div>`;
    });

    container.innerHTML = html;
}

function buildSectionWhatsAppMessage(sectionTitle, dateStr, entries) {
    const formattedDate = formatDateDisplay(dateStr);
    let msg = `📌 *MGM COLLEGE — ABSENTEE NOTICE*\n`;
    msg += `🏫 *Class:* ${sectionTitle}\n`;
    msg += `📅 *Date:* ${formattedDate}\n\n`;
    msg += `*Period / Subject Wise Absentees:*\n`;

    entries.forEach(e => {
        const slotNum = parseInt(e.slot, 10) || 1;
        const timeLabel = getSlotTimeLabel(slotNum);
        const rolls = e.rollNumbers && e.rollNumbers !== 'NIL' ? e.rollNumbers : 'NIL (All Present)';
        msg += `• *${timeLabel}* [${e.subject || 'Subject'}]: ${rolls}\n`;
    });

    msg += `\n_Please verify attendance with your ward._`;
    return msg;
}

function buildYearWhatsAppMessage(yearLabel, stream, dateStr, entries) {
    const formattedDate = formatDateDisplay(dateStr);
    const yrPrefix = yearLabel.includes('1st') || yearLabel === 'I' ? 'I' :
                     yearLabel.includes('2nd') || yearLabel === 'II' ? 'II' : 'III';
    
    let msg = `📌 *MGM COLLEGE — ${yrPrefix} ${stream} ABSENTEE REPORT*\n`;
    msg += `📅 *Date:* ${formattedDate}\n\n`;

    const groupedBySec = {};
    entries.forEach(e => {
        const secLabel = e.section ? `Section ${e.section}` : 'General';
        if (!groupedBySec[secLabel]) groupedBySec[secLabel] = [];
        groupedBySec[secLabel].push(e);
    });

    Object.keys(groupedBySec).sort().forEach(secKey => {
        msg += `🔹 *${yrPrefix} ${stream} - ${secKey}*\n`;
        const secEntries = groupedBySec[secKey];
        secEntries.sort((a, b) => (parseInt(a.slot, 10) || 1) - (parseInt(b.slot, 10) || 1));
        
        secEntries.forEach(e => {
            const slotNum = parseInt(e.slot, 10) || 1;
            const timeLabel = getSlotTimeLabel(slotNum);
            const rolls = e.rollNumbers && e.rollNumbers !== 'NIL' ? e.rollNumbers : 'NIL (All Present)';
            msg += `  • ${timeLabel} [${e.subject || 'Subject'}]: ${rolls}\n`;
        });
        msg += `\n`;
    });

    msg += `_Generated via MGM Attendance App_`;
    return msg;
}

function openWhatsAppShare(encodedMsg) {
    const waUrl = `https://wa.me/?text=${encodedMsg}`;
    window.open(waUrl, '_blank');
}

function formatDateDisplay(dateStr) {
    if (!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const d = new Date(parts[0], parts[1] - 1, parts[2]);
            return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
    } catch (e) {}
    return dateStr;
}

function initPasscodeManager() {
    const loginBtn = document.getElementById('loginPasscodeSettingsBtn');
    const hodBtn = document.getElementById('hodPasscodeSettingsBtn');
    const modal = document.getElementById('passcodeSettingsModal');
    const closeBtn = document.getElementById('closePasscodeModalBtn');
    const form = document.getElementById('passcodeSettingsForm');
    const resetBtn = document.getElementById('resetPasscodesBtn');

    const passTeacher_BCA = document.getElementById('passTeacher_BCA');
    const passHOD_BCA = document.getElementById('passHOD_BCA');
    const passTeacher_BCM = document.getElementById('passTeacher_BCM');
    const passHOD_BCM = document.getElementById('passHOD_BCM');
    const passTeacher_BA = document.getElementById('passTeacher_BA');
    const passHOD_BA = document.getElementById('passHOD_BA');
    const passTeacher_BSC = document.getElementById('passTeacher_BSC');
    const passHOD_BSC = document.getElementById('passHOD_BSC');
    const passADMIN = document.getElementById('passADMIN');

    const titleEl = document.getElementById('passcodeModalTitle');
    const subtitleEl = document.getElementById('passcodeModalSubtitle');

    const openPasscodeModal = (e) => {
        if (e) e.preventDefault();
        const store = getPasscodeStore();

        if (passTeacher_BCA) passTeacher_BCA.value = store.teacher.BCA;
        if (passHOD_BCA) passHOD_BCA.value = store.hod.BCA;
        
        if (passTeacher_BCM) passTeacher_BCM.value = store.teacher.BCM;
        if (passHOD_BCM) passHOD_BCM.value = store.hod.BCM;

        if (passTeacher_BA) passTeacher_BA.value = store.teacher.BA;
        if (passHOD_BA) passHOD_BA.value = store.hod.BA;

        if (passTeacher_BSC) passTeacher_BSC.value = store.teacher.BSC;
        if (passHOD_BSC) passHOD_BSC.value = store.hod.BSC;

        if (passADMIN) passADMIN.value = store.ADMIN;

        const groupBCA = document.getElementById('group_BCA');
        const groupBCM = document.getElementById('group_BCM');
        const groupBA = document.getElementById('group_BA');
        const groupBSC = document.getElementById('group_BSC');
        const groupADMIN = document.getElementById('groupADMIN');

        const deptLabel = currentDept === 'BCM' ? 'B.Com' : (currentDept === 'BA' ? 'B.A.' : (currentDept === 'BSC' ? 'B.Sc.' : currentDept));

        if (currentRole === 'ADMIN') {
            if (titleEl) titleEl.textContent = 'Manage All Department & Admin Passcodes';
            if (subtitleEl) subtitleEl.textContent = 'Super Admin mode: Update Teacher & HOD passcodes for all departments or the Master Admin passcode.';

            if (groupBCA) groupBCA.style.display = 'block';
            if (groupBCM) groupBCM.style.display = 'block';
            if (groupBA) groupBA.style.display = 'block';
            if (groupBSC) groupBSC.style.display = 'block';
            if (groupADMIN) groupADMIN.style.display = 'block';
        } else {
            if (titleEl) titleEl.textContent = 'Change ' + deptLabel + ' Passcodes';
            if (subtitleEl) subtitleEl.textContent = 'Update Teacher & HOD passcodes for ' + deptLabel + ' department.';

            if (groupBCA) groupBCA.style.display = currentDept === 'BCA' ? 'block' : 'none';
            if (groupBCM) groupBCM.style.display = currentDept === 'BCM' ? 'block' : 'none';
            if (groupBA) groupBA.style.display = currentDept === 'BA' ? 'block' : 'none';
            if (groupBSC) groupBSC.style.display = currentDept === 'BSC' ? 'block' : 'none';
            if (groupADMIN) groupADMIN.style.display = 'none';
        }

        if (modal) modal.classList.add('active');
    };

    if (loginBtn) loginBtn.addEventListener('click', openPasscodeModal);
    if (hodBtn) hodBtn.addEventListener('click', openPasscodeModal);
    if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const store = getPasscodeStore();
            const updatedCustom = {
                teacherBCA: (currentRole === 'ADMIN' || currentDept === 'BCA') ? (passTeacher_BCA ? passTeacher_BCA.value.trim() : store.teacher.BCA) : store.teacher.BCA,
                hodBCA: (currentRole === 'ADMIN' || currentDept === 'BCA') ? (passHOD_BCA ? passHOD_BCA.value.trim() : store.hod.BCA) : store.hod.BCA,

                teacherBCM: (currentRole === 'ADMIN' || currentDept === 'BCM') ? (passTeacher_BCM ? passTeacher_BCM.value.trim() : store.teacher.BCM) : store.teacher.BCM,
                hodBCM: (currentRole === 'ADMIN' || currentDept === 'BCM') ? (passHOD_BCM ? passHOD_BCM.value.trim() : store.hod.BCM) : store.hod.BCM,

                teacherBA: (currentRole === 'ADMIN' || currentDept === 'BA') ? (passTeacher_BA ? passTeacher_BA.value.trim() : store.teacher.BA) : store.teacher.BA,
                hodBA: (currentRole === 'ADMIN' || currentDept === 'BA') ? (passHOD_BA ? passHOD_BA.value.trim() : store.hod.BA) : store.hod.BA,

                teacherBSC: (currentRole === 'ADMIN' || currentDept === 'BSC') ? (passTeacher_BSC ? passTeacher_BSC.value.trim() : store.teacher.BSC) : store.teacher.BSC,
                hodBSC: (currentRole === 'ADMIN' || currentDept === 'BSC') ? (passHOD_BSC ? passHOD_BSC.value.trim() : store.hod.BSC) : store.hod.BSC,

                ADMIN: currentRole === 'ADMIN' ? (passADMIN ? passADMIN.value.trim() : store.ADMIN) : store.ADMIN
            };
            savePasscodeStore(updatedCustom);
            if (modal) modal.classList.remove('active');
            alert('Department passcodes updated successfully!');
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Reset Teacher & HOD passcodes to defaults?')) {
                localStorage.removeItem('mgm_custom_passcodes');
                const store = getPasscodeStore();
                if (passTeacher_BCA) passTeacher_BCA.value = store.teacher.BCA;
                if (passHOD_BCA) passHOD_BCA.value = store.hod.BCA;

                if (passTeacher_BCM) passTeacher_BCM.value = store.teacher.BCM;
                if (passHOD_BCM) passHOD_BCM.value = store.hod.BCM;

                if (passTeacher_BA) passTeacher_BA.value = store.teacher.BA;
                if (passHOD_BA) passHOD_BA.value = store.hod.BA;

                if (passTeacher_BSC) passTeacher_BSC.value = store.teacher.BSC;
                if (passHOD_BSC) passHOD_BSC.value = store.hod.BSC;

                if (passADMIN) passADMIN.value = store.ADMIN;
                alert('Passcodes reset to default!');
            }
        });
    }
}

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('mgm_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('mgm_theme', currentTheme);
            updateThemeIcon(currentTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;
    if (theme === 'light') {
        themeToggleBtn.innerHTML = `
          <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
        themeToggleBtn.title = 'Switch to Dark Mode';
    } else {
        themeToggleBtn.innerHTML = `
          <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
        themeToggleBtn.title = 'Switch to Light Mode';
    }
}


