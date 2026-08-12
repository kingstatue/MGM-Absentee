// Department Configuration — BCA only (User-Driven Subjects)
const DEPT_CONFIG = {
    BCA: {
        code: 'BCA',
        name: 'Bachelor of Computer Applications (BCA)',
        passcode: 'bca2026',
        badgeClass: 'bca',
        hasSections: true,
        defaultSubject: '',
        subjectsByYearAndSection: {
            'First Year': { 'A': [], 'B': [], 'C': [] },
            'Second Year': { 'A': [], 'B': [], 'C': [] },
            'Third Year': { 'A': [], 'B': [], 'C': [] }
        },
        subjectsByYear: {
            'First Year': [],
            'Second Year': [],
            'Third Year': []
        },
        subjects: [],
        samplePresets: []
    }
};


// Google Apps Script Webhook Endpoints
// Paste your Web App URL in BOTH places below (keep the quotes).
const STREAM_WEBHOOK_URLS = {
    BCA: 'https://script.google.com/macros/s/AKfycbzsk5c_tKkt5ysv7ZsNUBMAl4G13vxpeC_p-2fNcbH_Sj3eTm2YwxLFJ-mAh8VgD-i8oQ/exec'
};

const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzsk5c_tKkt5ysv7ZsNUBMAl4G13vxpeC_p-2fNcbH_Sj3eTm2YwxLFJ-mAh8VgD-i8oQ/exec';

function getWebhookUrl(deptCode) {
    const dept = deptCode || currentDept;
    if (STREAM_WEBHOOK_URLS && STREAM_WEBHOOK_URLS[dept] && !STREAM_WEBHOOK_URLS[dept].includes('YOUR_')) {
        return STREAM_WEBHOOK_URLS[dept];
    }
    return DEFAULT_GOOGLE_SCRIPT_URL;
}

/** Session auth sent with every sheet request (open access — login not required). */
function getAuthPayload() {
    return {
        authPasscode: 'open',
        authRole: currentRole || 'ADMIN',
        authStream: 'BCA'
    };
}

function setAuthSession(passcode, role, deptCode, remember) {
    const pass = (passcode || '').trim();
    try { sessionStorage.setItem('mgm_auth_pass', pass); } catch (e) {}
    // Always keep a durable session copy for API calls (mobile PWA).
    // "Remember" only controls auto-login / prefill — do NOT wipe session on uncheck.
    try { localStorage.setItem('mgm_session_pass', pass); } catch (e) {}
    if (deptCode) {
        try { localStorage.setItem('mgm_auth_stream', deptCode); } catch (e) {}
        currentDept = deptCode;
    }
    if (remember) {
        try { localStorage.setItem('mgm_remember_pass', pass); } catch (e) {}
        try { localStorage.setItem('mgm_remember_checked', '1'); } catch (e) {}
    } else {
        try { localStorage.removeItem('mgm_remember_pass'); } catch (e) {}
        try { localStorage.removeItem('mgm_remember_checked'); } catch (e) {}
    }
    if (role) {
        currentRole = role;
        localStorage.setItem('mgm_role', role);
    }
}

function clearAuthSession() {
    try { sessionStorage.removeItem('mgm_auth_pass'); } catch (e) {}
    try { localStorage.removeItem('mgm_session_pass'); } catch (e) {}
    try { localStorage.removeItem('mgm_remember_pass'); } catch (e) {}
    try { localStorage.removeItem('mgm_auth_stream'); } catch (e) {}
}

function restoreAuthSessionFromRemember() {
    try {
        const remembered = localStorage.getItem('mgm_session_pass') ||
            localStorage.getItem('mgm_remember_pass') || '';
        if (remembered) sessionStorage.setItem('mgm_auth_pass', remembered);
    } catch (e) {}
}

/** Keep local offline fallback in sync after a successful server login. */
function syncLocalPasscodeFromLogin(deptCode, role, passcode) {
    const pass = (passcode || '').trim();
    if (!pass || !deptCode) return;
    try {
        const raw = JSON.parse(localStorage.getItem('mgm_custom_passcodes') || '{}');
        if (role === 'ADMIN') {
            raw.ADMIN = pass;
        } else if (role === 'HOD') {
            raw['hod' + deptCode] = pass;
        } else if (role === 'TEACHER') {
            raw['teacher' + deptCode] = pass;
        }
        localStorage.setItem('mgm_custom_passcodes', JSON.stringify(raw));
    } catch (e) {}
}

function withAuth(payload) {
    return Object.assign({}, payload || {}, getAuthPayload());
}

function appendAuthToParams(params) {
    const auth = getAuthPayload();
    params.set('authPasscode', auth.authPasscode || '');
    params.set('authRole', auth.authRole || '');
    params.set('authStream', auth.authStream || '');
    return params;
}

/** Confirm login passcode against Apps Script (falls back to local ONLY when truly offline). */
function authenticateWithServer(deptCode, passcode) {
    return new Promise((resolve) => {
        const targetUrl = getWebhookUrl(deptCode);
        const cbName = 'mgmAuthCb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
        let scriptEl = null;
        let done = false;

        const finish = (result) => {
            if (done) return;
            done = true;
            clearTimeout(timeout);
            try { delete window[cbName]; } catch (e) {}
            if (scriptEl && scriptEl.parentNode) {
                try { scriptEl.parentNode.removeChild(scriptEl); } catch (e) {}
            }
            resolve(result);
        };

        // College Wi‑Fi / mobile can be slow — do NOT treat timeout as offline
        // (that caused "Invalid passcode" for a newly changed server pass).
        const timeout = setTimeout(() => {
            if (navigator.onLine) {
                finish({
                    ok: false,
                    offline: false,
                    slow: true,
                    message: 'Server is slow or busy. Please tap Login again.'
                });
            } else {
                finish({ ok: false, offline: true });
            }
        }, 4000);

        window[cbName] = function (data) {
            if (data && data.result === 'success') {
                finish({
                    ok: true,
                    role: data.role || 'TEACHER',
                    stream: data.stream || deptCode || 'BCA',
                    matchedOtherStream: !!data.matchedOtherStream,
                    offline: false
                });
            } else {
                finish({
                    ok: false,
                    offline: false,
                    message: (data && (data.message || data.error)) || 'Invalid passcode'
                });
            }
        };

        const params = new URLSearchParams({
            action: 'auth',
            stream: deptCode || 'BCA',
            authPasscode: (passcode || '').trim(),
            authStream: deptCode || 'BCA',
            callback: cbName
        });

        scriptEl = document.createElement('script');
        scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
        scriptEl.onerror = function () {
            if (navigator.onLine) {
                finish({
                    ok: false,
                    offline: false,
                    slow: true,
                    message: 'Could not reach login server. Check Wi‑Fi and tap Login again.'
                });
            } else {
                finish({ ok: false, offline: true });
            }
        };
        document.body.appendChild(scriptEl);
    });
}

function verifyAttendanceOnSheet(payload) {
    return checkSheetSlotConflict(
        payload.date,
        payload.year,
        payload.section,
        payload.slot,
        payload.subject
    ).then((check) => {
        if (!check || check.offline) return { verified: false, offline: true };
        if (!check.exists) return { verified: false, offline: false };
        // STRICT: subject must match. A/B/C sheet rows are 1-per-slot — check may
        // return a different subject in the same slot; that is NOT this entry.
        const sheetSubj = String(check.subject || '').trim().toLowerCase();
        const localSubj = String(payload.subject || '').trim().toLowerCase();
        if (!sheetSubj || sheetSubj !== localSubj) {
            return { verified: false, offline: false, wrongSubject: check.subject || '' };
        }
        const sheetRolls = normalizeRollNumbers(check.rollNumbers).map(String).sort().join(',');
        const localRolls = normalizeRollNumbers(payload.rollNumbers).map(String).sort().join(',');
        return { verified: sheetRolls === localRolls, offline: false };
    }).catch(() => ({ verified: false, offline: true }));
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
let currentRole = 'ADMIN';
let isHODAuthenticated = true;
let currentHODData = null;
let currentHODYearFilter = 'ALL';
let pendingHODTabSwitch = false;
/** When editing from Today's list — original row identity for replace / move. */
let editingOriginalEntry = null;

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

function isCombinedSectionValue(sec) {
    const n = normalizeSectionCode(sec);
    if (!n) return false;
    const raw = String(sec || '').toUpperCase();
    return n === 'ALL' || raw.includes('COMBIN');
}

/** Regular class sections A / B / C (incl. AIML) — not Combined. */
function isSpecificClassSection(sec) {
    const n = normalizeSectionCode(sec);
    if (!n || n === 'ALL' || n === 'COMMON' || n === 'A_B') return false;
    return n === 'A' || n === 'B' || n === 'C' || n === 'C_AIML' || n === 'C_TP' || n === 'C_AF';
}

function sectionDisplayLabel(sec) {
    if (isCombinedSectionValue(sec)) return 'Combined (Sec A, B, C)';
    const n = normalizeSectionCode(sec);
    if (n === 'C_AIML') return 'Sec C (AIML)';
    if (n === 'A_B') return 'Sec A & B';
    if (n === 'COMMON') return 'Common (all classes)';
    return 'Sec ' + (sec || n || '?');
}

/**
 * Combined (ALL) and Sec A/B/C must never share the same slot.
 * Subject does not matter for this rule.
 */
function isCombinedVsSpecificSectionConflict(sec1, sec2) {
    const aComb = isCombinedSectionValue(sec1);
    const bComb = isCombinedSectionValue(sec2);
    const aSpec = isSpecificClassSection(sec1);
    const bSpec = isSpecificClassSection(sec2);
    return (aComb && bSpec) || (bComb && aSpec);
}

function subjectsAreSame(subj1, subj2) {
    const a = String(subj1 || '').trim().toLowerCase();
    const b = String(subj2 || '').trim().toLowerCase();
    if (!a || !b) return false;
    return a === b;
}

/** Parallel Combined electives (Kannada / Hindi / Sanskrit) share a slot but must stay separate. */
function isParallelCombinedSubjectEntry(sec1, subj1, sec2, subj2) {
    if (!isCombinedSectionValue(sec1) || !isCombinedSectionValue(sec2)) return false;
    const a = String(subj1 || '').trim();
    const b = String(subj2 || '').trim();
    if (!a || !b) return false;
    return !subjectsAreSame(a, b);
}

function isSameAttendanceIdentity(a, b) {
    if (!a || !b) return false;
    return normalizeHistoryDate(a.date) === normalizeHistoryDate(b.date)
        && String(a.year || '') === String(b.year || '')
        && normalizeSectionCode(a.section) === normalizeSectionCode(b.section)
        && subjectsAreSame(a.subject, b.subject)
        && (parseInt(a.slot, 10) || 1) === (parseInt(b.slot, 10) || 1)
        && (a.stream || 'BCA') === (b.stream || 'BCA');
}

function findCombinedVsSectionBlockEntry(history, cleanStream, cleanDate, cleanYear, cleanSlot, cleanSection, skipEntry) {
    return (history || []).find(item => {
        if ((item.stream || 'BCA') !== cleanStream) return false;
        if (normalizeHistoryDate(item.date) !== normalizeHistoryDate(cleanDate)) return false;
        if (item.year !== cleanYear) return false;
        if ((parseInt(item.slot, 10) || 1) !== cleanSlot) return false;
        if (skipEntry && isSameAttendanceIdentity(item, skipEntry)) return false;
        return isCombinedVsSpecificSectionConflict(item.section || 'A', cleanSection);
    }) || null;
}

function isSectionOverlap(sec1, sec2) {
    const n1 = normalizeSectionCode(sec1);
    const n2 = normalizeSectionCode(sec2);
    if (!n1 || !n2) return false;
    if (n1 === n2) return true;
    if (n1 === 'ALL' || n2 === 'ALL') return true;
    // BCA plain C and C (AIML) are the same class for conflict purposes
    if ((n1 === 'C' && n2 === 'C_AIML') || (n1 === 'C_AIML' && n2 === 'C')) return true;
    return false;
}

function checkDoubleEntryLive(dateVal, yearVal, sectionVal, subjectVal, slotVal, rollVal, alertBoxElem, submitBtnTextElem) {
    if (!alertBoxElem) return null;

    const cleanDate = dateVal || getTodayISOString();
    const cleanSlot = parseInt(slotVal, 10) || 1;
    const cleanSubject = (subjectVal || '').trim();
    const cleanYear = yearVal || 'First Year';
    const cleanStream = currentDept || 'BCA';
    const effectiveSection = isElectiveOrLanguageSubject(cleanSubject) ? 'ALL' : (sectionVal || 'A');

    const localHistory = JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
    const skipSelf = editingOriginalEntry;

    // Hard rule: Combined vs Sec A/B/C cannot share a slot
    const sectionLock = findCombinedVsSectionBlockEntry(
        localHistory, cleanStream, cleanDate, cleanYear, cleanSlot, effectiveSection, skipSelf
    );
    if (sectionLock) {
        alertBoxElem.style.display = 'block';
        alertBoxElem.className = 'alert-banner active';
        const existingLabel = sectionDisplayLabel(sectionLock.section);
        const newLabel = sectionDisplayLabel(effectiveSection);
        alertBoxElem.innerHTML = `
            <div style="font-size: 0.85rem; line-height: 1.45;">
                <strong style="color: #f87171;">⛔ Cannot use ${escapeHTML(newLabel)} for this slot</strong><br>
                Already entered: <strong>${escapeHTML(existingLabel)}</strong> · ${escapeHTML(sectionLock.subject || '')}
                (Absentees: ${escapeHTML(sectionLock.rollNumbers || 'NIL')})<br>
                <span style="opacity: 0.95;">Combined and Sec A/B/C cannot share the same slot. Change section or slot before submit.</span>
            </div>`;
        if (submitBtnTextElem) submitBtnTextElem.textContent = 'Blocked — Change Section';
        return sectionLock;
    }

    // Find peer conflict (skip the row currently being edited)
    const existingEntry = localHistory.find(item => {
        if ((item.stream || 'BCA') !== cleanStream) return false;
        if (normalizeHistoryDate(item.date) !== normalizeHistoryDate(cleanDate)) return false;
        if (item.year !== cleanYear) return false;
        if (parseInt(item.slot, 10) !== cleanSlot) return false;
        if (skipSelf && isSameAttendanceIdentity(item, skipSelf)) return false;

        const sec1 = item.section || 'A';
        const sec2 = effectiveSection || 'A';
        if (!isSectionOverlap(sec1, sec2)) return false;

        if (isParallelCombinedSubjectEntry(sec1, item.subject, sec2, cleanSubject)) {
            return false;
        }

        return true;
    });

    const formIdentity = {
        date: cleanDate,
        year: cleanYear,
        section: effectiveSection,
        subject: cleanSubject,
        slot: cleanSlot,
        stream: cleanStream
    };
    const editingSelf = !!(skipSelf && isSameAttendanceIdentity(skipSelf, formIdentity));
    const editingMoved = !!(skipSelf && !editingSelf);

    if (editingSelf || editingMoved) {
        alertBoxElem.style.display = 'block';
        alertBoxElem.className = 'alert-banner active';
        if (editingMoved) {
            alertBoxElem.innerHTML = `
            <div style="font-size: 0.85rem; line-height: 1.4;">
                <strong style="color: #fbbf24;">✏️ Editing — identity changed</strong><br>
                Old: ${escapeHTML(sectionDisplayLabel(skipSelf.section))} · ${escapeHTML(skipSelf.subject || '')} · Slot ${escapeHTML(String(skipSelf.slot))}<br>
                New: ${escapeHTML(sectionDisplayLabel(effectiveSection))} · ${escapeHTML(cleanSubject || '')} · Slot ${cleanSlot}<br>
                <span style="opacity: 0.95;">On submit you will be asked to confirm. The old entry will be removed after save.</span>
            </div>`;
        } else {
            alertBoxElem.innerHTML = `
            <div style="font-size: 0.85rem; line-height: 1.4;">
                <strong style="color: #93c5fd;">✏️ Editing this entry</strong><br>
                Change rolls, slot, subject, or section as needed. Submit will ask before saving.
            </div>`;
        }
        if (submitBtnTextElem) submitBtnTextElem.textContent = 'Save Edited Entry';
        if (!existingEntry) return skipSelf;
    }

    if (existingEntry) {
        const sameSubject = subjectsAreSame(existingEntry.subject, cleanSubject);
        const diff = computeRollDiff(existingEntry.rollNumbers, rollVal);
        const prevStr = diff.prevRolls.length > 0 ? diff.prevRolls.join(', ') : 'NIL';

        alertBoxElem.style.display = 'block';
        alertBoxElem.className = 'alert-banner active';

        if (!sameSubject) {
            const secLabel = sectionDisplayLabel(existingEntry.section);
            alertBoxElem.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: flex-start;">
                <div style="flex: 1; font-size: 0.85rem; line-height: 1.4;">
                    <strong style="color: #fbbf24;">⚠️ Slot already occupied (${escapeHTML(secLabel)})</strong><br>
                    ${escapeHTML(cleanDate)} · ${escapeHTML(cleanYear)} · Slot ${cleanSlot}<br>
                    Existing entry: <strong>${escapeHTML(existingEntry.subject)}</strong> — Absentees: <strong>${escapeHTML(prevStr)}</strong><br>
                    <span style="opacity: 0.9;">Submitting will ask: Merge / Replace / Cancel.</span>
                </div>
            </div>`;
            if (submitBtnTextElem) submitBtnTextElem.textContent = 'Review Conflict on Submit';
        } else {
            const addedStr = diff.addedRolls.length > 0 ? diff.addedRolls.join(', ') : 'None';
            const retainedStr = diff.retainedRolls.length > 0 ? diff.retainedRolls.join(', ') : 'None';
            alertBoxElem.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: flex-start;">
                <div style="flex: 1; font-size: 0.85rem; line-height: 1.4;">
                    <strong style="color: #fbbf24;">ℹ️ Entry already exists for ${escapeHTML(existingEntry.subject)} (Slot ${cleanSlot})</strong><br>
                    Previous: <strong>${escapeHTML(prevStr)}</strong><br>
                    <span style="opacity: 0.9;">Submit will ask Merge or Replace.</span>
                    <div style="margin-top: 6px; padding: 6px 8px; background: rgba(0,0,0,0.25); border-radius: 6px; display: flex; flex-wrap: wrap; gap: 8px;">
                        <span style="color: #34d399;"><strong>+ Added:</strong> ${escapeHTML(addedStr)}</span>
                        <span style="color: #a7f3d0;"><strong>Unchanged:</strong> ${escapeHTML(retainedStr)}</span>
                    </div>
                </div>
            </div>`;
            if (submitBtnTextElem) submitBtnTextElem.textContent = 'Merge or Replace on Submit';
        }
        return existingEntry;
    }

    if (editingSelf || editingMoved) {
        return skipSelf;
    }

    // Soft note when another Combined language already exists in this slot
    const parallelPeer = localHistory.find(item => {
        if ((item.stream || 'BCA') !== cleanStream) return false;
        if (normalizeHistoryDate(item.date) !== normalizeHistoryDate(cleanDate)) return false;
        if (item.year !== cleanYear) return false;
        if (parseInt(item.slot, 10) !== cleanSlot) return false;
        if (skipSelf && isSameAttendanceIdentity(item, skipSelf)) return false;
        return isParallelCombinedSubjectEntry(item.section, item.subject, effectiveSection, cleanSubject);
    });
    if (parallelPeer && isCombinedSectionValue(effectiveSection)) {
        alertBoxElem.style.display = 'block';
        alertBoxElem.className = 'alert-banner active';
        alertBoxElem.innerHTML = `
            <div style="font-size: 0.85rem; line-height: 1.4;">
                <strong style="color: #34d399;">✅ Parallel Combined elective</strong><br>
                <strong>${escapeHTML(parallelPeer.subject)}</strong> already has absentees for this slot.
                Your <strong>${escapeHTML(cleanSubject || 'subject')}</strong> will be saved as a <strong>separate</strong> entry (no merge).
            </div>`;
        if (submitBtnTextElem) submitBtnTextElem.textContent = 'Submit Absentee (Separate Subject)';
        return null;
    }

    alertBoxElem.style.display = 'none';
    alertBoxElem.innerHTML = '';
    if (submitBtnTextElem) submitBtnTextElem.textContent = editingOriginalEntry ? 'Save Edited Entry' : 'Submit Absentee';
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
        }, 6000);

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
        appendAuthToParams(params);

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

/** Block future dates — classes not started yet, no absentee entry for tomorrow+. */
function clampAttendanceDate(dateStr) {
    const today = getTodayISOString();
    const d = normalizeHistoryDate(dateStr) || today;
    return d > today ? today : d;
}

function applyNoFutureDateLimits() {
    const today = getTodayISOString();
    const fields = [dateInput, directDateInput, document.getElementById('hodDatePicker')];
    fields.forEach(el => {
        if (!el) return;
        el.setAttribute('max', today);
        if (el.value && el.value > today) el.value = today;
    });
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

function cancelHODLoginAndReturnToLogger() {
    pendingHODTabSwitch = false;
    const deptLoginModal = document.getElementById('deptLoginModal');
    const cancelBtn = document.getElementById('cancelHODLoginBtn');
    if (deptLoginModal) deptLoginModal.classList.remove('active');
    if (cancelBtn) cancelBtn.style.display = 'none';
    switchMode('typing');
}

// 1. Mode Switcher Handler
function switchMode(mode) {
    const cancelBtn = document.getElementById('cancelHODLoginBtn');
    if (mode === 'voice') {
        if (cancelBtn) cancelBtn.style.display = 'none';
        if (voiceModeTab) voiceModeTab.classList.add('active');
        if (typingModeTab) typingModeTab.classList.remove('active');
        if (hodModeTab) hodModeTab.classList.remove('active');
        if (voiceSection) voiceSection.style.display = 'flex';
        if (typingSection) typingSection.style.display = 'none';
        if (hodSection) hodSection.style.display = 'none';
        wipeHODPortalState();
    } else if (mode === 'typing') {
        if (cancelBtn) cancelBtn.style.display = 'none';
        if (typingModeTab) typingModeTab.classList.add('active');
        if (voiceModeTab) voiceModeTab.classList.remove('active');
        if (hodModeTab) hodModeTab.classList.remove('active');
        if (typingSection) typingSection.style.display = 'flex';
        if (voiceSection) voiceSection.style.display = 'none';
        if (hodSection) hodSection.style.display = 'none';
        if (isListening) stopListening();
        wipeHODPortalState();
    } else if (mode === 'hod') {
        if (cancelBtn) cancelBtn.style.display = 'none';
        isHODAuthenticated = true;

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

    const todayStr = clampAttendanceDate(parsedData.date || getTodayISOString());
    if (parsedData) parsedData.date = todayStr;

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

    dateInput.value = clampAttendanceDate(data.date || getTodayISOString());
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

function showSlotConflictDialog(params) {
    return new Promise((resolve) => {
        const prevRollsArr = normalizeRollNumbers(params.existingRolls);
        const newRollsArr = normalizeRollNumbers(params.newRolls);
        const mergedRollsArr = Array.from(new Set([...prevRollsArr, ...newRollsArr])).sort((a, b) => a - b);
        const mergedStr = mergedRollsArr.length > 0 ? mergedRollsArr.join(', ') : 'NIL';

        const oldModal = document.getElementById('slotConflictModalDialog');
        if (oldModal && oldModal.parentNode) oldModal.parentNode.removeChild(oldModal);

        document.body.style.overflow = 'hidden';

        const dialog = document.createElement('div');
        dialog.id = 'slotConflictModalDialog';
        dialog.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100vh; z-index: 9999999; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.88); padding: 16px; box-sizing: border-box; overflow-y: auto;';

        dialog.innerHTML = `
            <div class="modal-card" style="max-width: 480px; width: 100%; padding: 20px; border: 2px solid #eab308; background: #0f172a; color: #ffffff; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9); box-sizing: border-box;">
                
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #334155;">
                    <h3 style="margin: 0; font-size: 1.15rem; color: #f59e0b; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                        ⚠️ Slot Entry Conflict (Slot ${escapeHTML(String(params.slot))})
                    </h3>
                </div>

                <div style="font-size: 0.88rem; line-height: 1.5; margin-bottom: 14px; color: #cbd5e1;">
                    ${params.editMode
                        ? 'You are <strong>editing</strong> an entry. Choose how to save your changes for <strong>Slot ' + escapeHTML(String(params.slot)) + '</strong>.'
                        : 'An entry already exists for <strong>Slot ' + escapeHTML(String(params.slot)) + '</strong> on <strong>' + escapeHTML(params.date) + '</strong> (' + escapeHTML(params.year) + ' ' + escapeHTML(sectionDisplayLabel(params.section)) + ').'}
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
                    <div style="background: #1e293b; padding: 12px; border-radius: 10px; border-left: 4px solid #ef4444;">
                        <div style="font-weight: 700; color: #fca5a5; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px;">Previous Teacher / Slot Entry:</div>
                        <div style="font-size: 0.9rem; color: #ffffff; margin-top: 2px;">Subject: <strong>${escapeHTML(params.existingSubj || params.subject)}</strong></div>
                        <div style="font-size: 0.9rem; color: #f87171; font-weight: 700; margin-top: 2px;">Absentees: ${escapeHTML(params.existingRolls || 'NIL')}</div>
                    </div>

                    <div style="background: #1e293b; padding: 12px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                        <div style="font-weight: 700; color: #93c5fd; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px;">Your Current Entry:</div>
                        <div style="font-size: 0.9rem; color: #ffffff; margin-top: 2px;">Subject: <strong>${escapeHTML(params.subject)}</strong></div>
                        <div style="font-size: 0.9rem; color: #60a5fa; font-weight: 700; margin-top: 2px;">Absentees: ${escapeHTML(params.newRolls || 'NIL')}</div>
                    </div>
                </div>

                <div style="background: #064e3b; border: 1px solid #10b981; padding: 12px; border-radius: 10px; margin-bottom: 16px; color: #ecfdf5;">
                    <div style="font-weight: 800; color: #34d399; font-size: 0.85rem; text-transform: uppercase;">🔀 Combined Result if Merged:</div>
                    <div style="font-size: 1rem; font-weight: 800; color: #6ee7b7; margin-top: 4px; word-break: break-word;">${escapeHTML(mergedStr)}</div>
                    <div style="font-size: 0.78rem; color: #a7f3d0; margin-top: 2px;">Total absentees combined: ${mergedRollsArr.length} students</div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button type="button" id="conflictMergeBtn" style="background: #059669; color: #ffffff; border: none; font-weight: 800; padding: 14px; font-size: 0.95rem; border-radius: 10px; cursor: pointer; width: 100%; min-height: 48px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); touch-action: manipulation;">
                        🔀 MERGE BOTH ENTRIES (${mergedRollsArr.length} Absentees)
                    </button>
                    <button type="button" id="conflictReplaceBtn" style="background: #991b1b; color: #ffffff; border: none; font-weight: 700; padding: 12px; font-size: 0.88rem; border-radius: 10px; cursor: pointer; width: 100%; min-height: 44px; touch-action: manipulation;">
                        ${params.editMode ? '✏️ Save My Edited List (Replace)' : '✏️ Overwrite / Replace with My List Only'}
                    </button>
                    <button type="button" id="conflictCancelBtn" style="background: #334155; color: #cbd5e1; border: none; font-weight: 600; padding: 10px; font-size: 0.84rem; border-radius: 10px; cursor: pointer; width: 100%; min-height: 40px; touch-action: manipulation;">
                        ❌ Cancel Submission
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        const card = dialog.querySelector('.modal-card');
        if (card && card.scrollIntoView) {
            card.scrollIntoView({ block: 'center', behavior: 'instant' });
        }

        const cleanup = (choice) => {
            document.body.style.overflow = '';
            if (dialog && dialog.parentNode) {
                dialog.parentNode.removeChild(dialog);
            }
            resolve(choice);
        };

        const mBtn = dialog.querySelector('#conflictMergeBtn');
        const rBtn = dialog.querySelector('#conflictReplaceBtn');
        const cBtn = dialog.querySelector('#conflictCancelBtn');

        if (mBtn) mBtn.addEventListener('click', (e) => { e.preventDefault(); cleanup({ action: 'merge', mergedRolls: mergedStr, mergedArr: mergedRollsArr }); });
        if (rBtn) rBtn.addEventListener('click', (e) => { e.preventDefault(); cleanup({ action: 'replace', mergedRolls: params.newRolls, mergedArr: newRollsArr }); });
        if (cBtn) cBtn.addEventListener('click', (e) => { e.preventDefault(); cleanup({ action: 'cancel' }); });
    });
}

/** Hard block: Combined vs Sec A/B/C in same slot — Cancel only (no force submit). */
function showCombinedSectionBlockDialog(params) {
    return new Promise((resolve) => {
        const oldModal = document.getElementById('slotConflictModalDialog');
        if (oldModal && oldModal.parentNode) oldModal.parentNode.removeChild(oldModal);

        document.body.style.overflow = 'hidden';
        const dialog = document.createElement('div');
        dialog.id = 'slotConflictModalDialog';
        dialog.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100vh; z-index: 9999999; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.88); padding: 16px; box-sizing: border-box; overflow-y: auto;';

        const existingLabel = sectionDisplayLabel(params.existingSection);
        const newLabel = sectionDisplayLabel(params.section);
        const tryingCombined = isCombinedSectionValue(params.section);

        dialog.innerHTML = `
            <div class="modal-card" style="max-width: 480px; width: 100%; padding: 20px; border: 2px solid #ef4444; background: #0f172a; color: #ffffff; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9); box-sizing: border-box;">
                <h3 style="margin: 0 0 12px 0; font-size: 1.1rem; color: #f87171; font-weight: 800;">⛔ Section conflict — cannot submit</h3>
                <div style="font-size: 0.9rem; line-height: 1.5; color: #cbd5e1; margin-bottom: 14px;">
                    Slot <strong>${escapeHTML(String(params.slot))}</strong> on <strong>${escapeHTML(params.date)}</strong>
                    (${escapeHTML(params.year)}) already has a <strong>${escapeHTML(existingLabel)}</strong> entry.
                </div>
                <div style="background: #1e293b; padding: 12px; border-radius: 10px; border-left: 4px solid #ef4444; margin-bottom: 10px;">
                    <div style="font-size: 0.82rem; color: #fca5a5; font-weight: 700;">Already entered</div>
                    <div style="margin-top: 4px;"><strong>${escapeHTML(existingLabel)}</strong> · ${escapeHTML(params.existingSubj || 'Subject')}</div>
                    <div style="color: #f87171; font-weight: 700; margin-top: 2px;">Absentees: ${escapeHTML(params.existingRolls || 'NIL')}</div>
                </div>
                <div style="background: #1e293b; padding: 12px; border-radius: 10px; border-left: 4px solid #3b82f6; margin-bottom: 14px;">
                    <div style="font-size: 0.82rem; color: #93c5fd; font-weight: 700;">Your attempt</div>
                    <div style="margin-top: 4px;"><strong>${escapeHTML(newLabel)}</strong> · ${escapeHTML(params.subject || 'Subject')}</div>
                </div>
                <div style="background: #450a0a; border: 1px solid #ef4444; padding: 12px; border-radius: 10px; margin-bottom: 16px; font-size: 0.86rem; line-height: 1.45; color: #fecaca;">
                    ${tryingCombined
                        ? 'This slot already has Sec A / B / C attendance. <strong>Combined (ALL)</strong> is not allowed for the same slot.'
                        : 'This slot already has <strong>Combined (ALL)</strong> attendance. Sec A / B / C is not allowed for the same slot.'}
                    <br><span style="opacity: 0.9;">Change the section (or pick another slot), then submit again.</span>
                </div>
                <button type="button" id="conflictCancelBtn" style="background: #334155; color: #ffffff; border: none; font-weight: 800; padding: 14px; font-size: 0.95rem; border-radius: 10px; cursor: pointer; width: 100%; min-height: 48px; touch-action: manipulation;">
                    ❌ Cancel — Go Back &amp; Change Section
                </button>
            </div>
        `;

        document.body.appendChild(dialog);
        const cleanup = () => {
            document.body.style.overflow = '';
            if (dialog && dialog.parentNode) dialog.parentNode.removeChild(dialog);
            resolve({ action: 'cancel' });
        };
        const cBtn = dialog.querySelector('#conflictCancelBtn');
        if (cBtn) cBtn.addEventListener('click', (e) => { e.preventDefault(); cleanup(); });
        dialog.addEventListener('click', (e) => { if (e.target === dialog) cleanup(); });
    });
}

async function submitData(dateVal, rollNumbersRaw, yearVal, sectionVal, subjectVal, slotVal, btnElem, textElem, spinnerElem) {
    const cleanDate = clampAttendanceDate(dateVal || getTodayISOString());
    if (dateInput && dateInput.value !== cleanDate) dateInput.value = cleanDate;
    if (directDateInput && directDateInput.value !== cleanDate) directDateInput.value = cleanDate;
    const cleanSlot = parseInt(slotVal, 10) || 1;
    let cleanSubject = (subjectVal || '').trim();
    let cleanSection = sectionVal || 'A';

    if (!cleanSubject) {
        alert('Please enter / select a subject name before submitting.');
        return { status: 'cancelled' };
    }

    // Language / elective subjects are combined across sections
    if (isElectiveOrLanguageSubject(cleanSubject)) {
        cleanSection = 'ALL';
    }

    const rollNumbersArray = normalizeRollNumbers(rollNumbersRaw);
    let formattedRolls = rollNumbersArray.length > 0 ? rollNumbersArray.join(', ') : 'NIL';

    const history = JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
    const cleanStream = currentDept || 'BCA';
    const editOrig = editingOriginalEntry;
    const newIdentity = {
        date: cleanDate,
        year: yearVal,
        section: cleanSection,
        subject: cleanSubject,
        slot: cleanSlot,
        stream: cleanStream
    };
    const editingSelf = !!(editOrig && isSameAttendanceIdentity(editOrig, newIdentity));
    const editingMoved = !!(editOrig && !editingSelf);

    // 1) Hard block: Combined vs Sec A/B/C (subject ignored)
    const localSectionLock = findCombinedVsSectionBlockEntry(
        history, cleanStream, cleanDate, yearVal, cleanSlot, cleanSection, editOrig
    );

    let sheetConflict = { exists: false };
    try {
        sheetConflict = await checkSheetSlotConflict(cleanDate, yearVal, cleanSection, cleanSlot, cleanSubject);
    } catch (e) {
        sheetConflict = { exists: false, offline: true };
    }

    if (sheetConflict.exists && !sheetConflict.offline) {
        const sheetSec = sheetConflict.section || cleanSection;
        // Ignore parallel Combined languages
        if (isParallelCombinedSubjectEntry(sheetSec, sheetConflict.subject, cleanSection, cleanSubject)) {
            sheetConflict = { exists: false, parallelElective: true };
        } else if (editOrig && isSameAttendanceIdentity({
            date: cleanDate,
            year: sheetConflict.year || yearVal,
            section: sheetSec,
            subject: sheetConflict.subject,
            slot: cleanSlot,
            stream: cleanStream
        }, editOrig)) {
            // Sheet row is the one we are editing
            sheetConflict = { ...sheetConflict, editingSelf: true };
        }
    }

    const sheetSectionLock = (sheetConflict.exists && !sheetConflict.offline && !sheetConflict.editingSelf
        && isCombinedVsSpecificSectionConflict(sheetConflict.section || cleanSection, cleanSection))
        ? sheetConflict
        : null;

    if (localSectionLock || sheetSectionLock) {
        const blocker = localSectionLock || {
            section: sheetSectionLock.section,
            subject: sheetSectionLock.subject,
            rollNumbers: sheetSectionLock.rollNumbers
        };
        await showCombinedSectionBlockDialog({
            date: cleanDate,
            year: yearVal,
            section: cleanSection,
            slot: cleanSlot,
            subject: cleanSubject,
            existingSection: blocker.section,
            existingSubj: blocker.subject,
            existingRolls: blocker.rollNumbers
        });
        return { status: 'cancelled' };
    }

    // 2) Peer conflict on same slot (skip self when editing)
    const existingEntry = history.find(item => {
        if ((item.stream || 'BCA') !== cleanStream) return false;
        if (normalizeHistoryDate(item.date) !== normalizeHistoryDate(cleanDate)) return false;
        if (item.year !== yearVal) return false;
        if (parseInt(item.slot, 10) !== cleanSlot) return false;
        if (editOrig && isSameAttendanceIdentity(item, editOrig)) return false;

        const sec1 = item.section || 'A';
        const sec2 = cleanSection || 'A';
        if (!isSectionOverlap(sec1, sec2)) return false;
        if (isParallelCombinedSubjectEntry(sec1, item.subject, sec2, cleanSubject)) return false;
        return true;
    });

    if (sheetConflict.exists && !sheetConflict.offline && sheetConflict.editingSelf) {
        // treat as no foreign sheet conflict
        sheetConflict = { exists: false, editingSelf: true };
    }

    let hasConflict = !!existingEntry || !!(sheetConflict.exists && !sheetConflict.offline);
    let finalRolls = formattedRolls;
    let finalRollsArr = rollNumbersArray;
    let conflictChoice = 'create';

    // Editing same identity → ask Replace / Merge / Cancel
    if (editingSelf && !hasConflict) {
        hasConflict = true;
        sheetConflict = {
            exists: true,
            subject: editOrig.subject,
            section: editOrig.section,
            rollNumbers: editOrig.rollNumbers,
            editingSelf: true
        };
    }

    if (hasConflict) {
        const prevSubj = (sheetConflict.exists && sheetConflict.subject)
            ? sheetConflict.subject
            : (existingEntry ? existingEntry.subject : (editOrig ? editOrig.subject : cleanSubject));
        const prevRolls = (sheetConflict.exists && sheetConflict.rollNumbers != null)
            ? sheetConflict.rollNumbers
            : (existingEntry ? existingEntry.rollNumbers : (editOrig ? editOrig.rollNumbers : 'NIL'));
        const prevSec = (sheetConflict.exists && sheetConflict.section)
            ? sheetConflict.section
            : (existingEntry ? existingEntry.section : (editOrig ? editOrig.section : cleanSection));

        if (isParallelCombinedSubjectEntry(prevSec, prevSubj, cleanSection, cleanSubject)) {
            hasConflict = false;
            conflictChoice = 'create';
        } else if (
            !subjectsAreSame(prevSubj, cleanSubject)
            && isCombinedSectionValue(cleanSection)
            && isCombinedSectionValue(prevSec)
        ) {
            // Parallel Combined languages only when BOTH are Combined
            hasConflict = false;
            conflictChoice = 'create';
        } else {
            const userChoice = await showSlotConflictDialog({
                date: cleanDate,
                year: yearVal,
                section: cleanSection,
                slot: cleanSlot,
                subject: cleanSubject,
                existingSubj: prevSubj,
                existingRolls: prevRolls,
                newRolls: formattedRolls,
                editMode: !!(editingSelf || editingMoved)
            });

            if (!userChoice || userChoice.action === 'cancel') {
                return { status: 'cancelled' };
            }

            conflictChoice = userChoice.action;
            finalRolls = userChoice.mergedRolls;
            finalRollsArr = userChoice.mergedArr;
        }
    }

    // If identity moved while editing, confirm then delete old row after successful save
    if (editingMoved) {
        const okMove = confirm(
            'You changed slot / section / subject / date.\n\n' +
            'Old entry will be removed after the new one is saved:\n' +
            sectionDisplayLabel(editOrig.section) + ' · ' + (editOrig.subject || '') + ' · Slot ' + editOrig.slot + '\n\n' +
            'Continue?'
        );
        if (!okMove) return { status: 'cancelled' };
    }

    // Now disable button & show spinner during actual HTTP POST transmission
    if (btnElem) btnElem.disabled = true;
    if (textElem) textElem.style.opacity = '0.5';
    if (spinnerElem) spinnerElem.style.display = 'block';

    const isUpdate = hasConflict;
    const prevRollsArr = (sheetConflict.exists && !sheetConflict.offline)
        ? normalizeRollNumbers(sheetConflict.rollNumbers)
        : (existingEntry ? normalizeRollNumbers(existingEntry.rollNumbers) : []);
    const diff = computeRollDiff(prevRollsArr.join(', '), finalRolls);

    const payload = {
        action: isUpdate ? 'update' : 'create',
        isUpdate: isUpdate,
        stream: currentDept,
        date: cleanDate,
        rollNumbers: finalRolls,
        year: yearVal,
        section: cleanSection,
        subject: cleanSubject,
        slot: cleanSlot,
        previousRollNumbers: diff.prevRolls.length > 0 ? diff.prevRolls.join(', ') : 'NIL',
        addedRollNumbers: diff.addedRolls.length > 0 ? diff.addedRolls.join(', ') : 'NIL',
        deletedRollNumbers: diff.deletedRolls.length > 0 ? diff.deletedRolls.join(', ') : 'NIL',
        retainedRollNumbers: diff.retainedRolls.length > 0 ? diff.retainedRolls.join(', ') : 'NIL',
        changesSummary: isUpdate 
            ? (conflictChoice === 'merge' ? '🔀 Merged absentees from both entries' : '✏️ Replaced previous entry')
            : 'Initial Submission'
    };

    console.log('Submitting Attendance Payload:', payload);

    if (textElem) textElem.style.opacity = '0';
    if (spinnerElem) spinnerElem.style.display = 'block';

    const finishLocalSave = async (offlineFlag) => {
        saveToLocalHistory({
            ...payload,
            offline: !!offlineFlag,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        if (editingMoved && editOrig) {
            await removeMovedEditOriginal(editOrig);
        }
        editingOriginalEntry = null;
        closeConfirmationModal();
        resetAllInputs();
    };

    try {
        const targetUrl = getWebhookUrl(currentDept);
        await postWithRetry(targetUrl, withAuth(payload), 2);

        await finishLocalSave(true);

        // Give Apps Script a moment to finish writing before verify
        await new Promise(r => setTimeout(r, 1200));
        const verify = await verifyAttendanceOnSheet(payload);
        if (verify.verified) {
            saveToLocalHistory({
                ...payload,
                offline: false,
                syncNote: '',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            demoteReplacedLocalSubjects(payload);
            showSuccessToast(payload);
            setTimeout(fetchTodayServerHistory, 600);
            return { status: 'ok' };
        }

        showCustomToast(
            verify.offline ? 'Saved — verifying sheet…' : 'Saved locally — will confirm sheet sync',
            'Entry is in Today\'s list. Tap Sync if the sheet badge stays pending.'
        );
        setTimeout(fetchTodayServerHistory, 1500);
        return { status: 'offline' };

    } catch (error) {
        console.warn('Error submitting attendance:', error);
        await finishLocalSave(true);
        showCustomToast(
            '⚠️ Saved Locally (Network Offline)',
            'Saved on phone. Will auto-sync to Google Sheet when online or tap "Sync" in Today\'s History.'
        );
        return { status: 'offline' };
    } finally {
        if (btnElem) btnElem.disabled = false;
        if (textElem) textElem.style.opacity = '1';
        if (spinnerElem) spinnerElem.style.display = 'none';
    }
}

/** After edit moves identity (slot/section/subject), delete the previous Raw Data row. */
async function removeMovedEditOriginal(orig) {
    if (!orig) return;
    try {
        const hist = readAllHistory().filter(item => !isSameAttendanceIdentity(item, orig));
        localStorage.setItem('mgm_attendance_history', JSON.stringify(compactAttendanceHistory(hist)));
        renderHistoryList();
    } catch (e) {}
    try {
        const targetUrl = getWebhookUrl(currentDept);
        await postWithRetry(targetUrl, withAuth({
            action: 'delete',
            date: orig.date,
            year: orig.year,
            section: orig.section,
            subject: orig.subject,
            slot: orig.slot,
            stream: orig.stream || currentDept || 'BCA',
            rollNumbers: 'NIL',
            changesSummary: 'Removed old entry after edit move'
        }), 2);
    } catch (e) {
        console.warn('Could not delete old edit row from sheet:', e);
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
    let cancelledCount = 0;

    // CRITICAL: snapshot every slot's absentees BEFORE the first submit.
    // submitData → resetAllInputs() wipes the multi-slot DOM, so later slots
    // used to fall back to empty master → NIL (edit later still worked).
    const slotRollMap = {};
    for (let slotNum = startSlot; slotNum <= endSlot; slotNum++) {
        let slotRollRaw = masterRollRaw;
        if (breakdownEl) {
            const slotInput = breakdownEl.querySelector('input[data-slot="' + slotNum + '"]');
            if (slotInput) {
                slotRollRaw = slotInput.value;
            }
        }
        slotRollMap[slotNum] = slotRollRaw;
    }

    for (let slotNum = startSlot; slotNum <= endSlot; slotNum++) {
        const slotRollRaw = slotRollMap[slotNum];
        try {
            const result = await submitData(dateVal, slotRollRaw, yearVal, sectionVal, subjectVal, slotNum, btnElem, textElem, spinnerElem);
            if (result && result.status === 'cancelled') {
                cancelledCount++;
                break; // stop remaining slots if user cancelled a conflict
            }
            if (result && (result.status === 'ok' || result.status === 'offline')) {
                successCount++;
            }
        } catch (e) {
            console.warn('Error submitting slot ' + slotNum + ':', e);
        }
    }

    if (successCount > 0) {
        showCustomToast(
            '⚡ ' + successCount + '-Slot Lab Recorded!',
            'Absentees logged for Slots ' + startSlot + ' to ' + endSlot + ' (' + subjectVal + ').'
        );
    } else if (cancelledCount > 0) {
        showCustomToast('Submission cancelled', 'No lab slots were saved.');
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
    editingOriginalEntry = null;
    clearTranscript();
    const todayStr = getTodayISOString();
    const deptConfig = DEPT_CONFIG[currentDept] || DEPT_CONFIG.BCA;
    manualTextInput.value = '';
    directDateInput.value = todayStr;
    dateInput.value = todayStr;
    applyNoFutureDateLimits();
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
        await postWithRetry(targetUrl, withAuth(payload), 2);
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

function normalizeHistoryDate(val) {
    if (!val && val !== 0) return '';
    if (val instanceof Date && !isNaN(val.getTime())) {
        const y = val.getFullYear();
        const m = String(val.getMonth() + 1).padStart(2, '0');
        const d = String(val.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }
    const s = String(val).trim();
    if (!s) return '';
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
    // DD/MM/YYYY or DD-MM-YYYY
    const parts = s.split(/[\sT]+/)[0].split(/[\/\.-]/);
    if (parts.length === 3) {
        const p0 = parseInt(parts[0], 10);
        const p1 = parseInt(parts[1], 10);
        const p2 = parseInt(parts[2], 10);
        if (p2 > 1000) {
            const day = (p1 > 12 && p0 <= 12) ? p1 : p0;
            const month = (p1 > 12 && p0 <= 12) ? p0 : p1;
            return p2 + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        }
        if (p0 > 1000) {
            return p0 + '-' + String(p1).padStart(2, '0') + '-' + String(p2).padStart(2, '0');
        }
    }
    const parsed = new Date(s);
    if (!isNaN(parsed.getTime())) {
        return normalizeHistoryDate(parsed);
    }
    return s;
}

function entryKey(item) {
    return [
        normalizeHistoryDate(item.date) || '',
        hodYearPrefix(item.year),
        normalizeSectionCode(item.section || ''),
        (item.subject || '').trim().toLowerCase(),
        String(parseInt(item.slot, 10) || 1)
    ].join('|');
}

/** Sheet identity without subject — A/B/C keep only ONE raw row per slot. */
function slotSheetKey(item) {
    return [
        normalizeHistoryDate(item.date) || '',
        hodYearPrefix(item.year),
        normalizeSectionCode(item.section || ''),
        String(parseInt(item.slot, 10) || 1),
        (item.stream || 'BCA')
    ].join('|');
}

/**
 * After a subject is confirmed on sheet for a slot, other local subjects for that
 * same slot are no longer on Raw Data (overwrite). Mark them pending/replaced.
 */
function demoteReplacedLocalSubjects(savedEntry) {
    const savedKey = slotSheetKey(savedEntry);
    const savedSubj = String(savedEntry.subject || '').trim().toLowerCase();
    const history = readAllHistory();
    let changed = false;
    const next = history.map(item => {
        if ((item.stream || 'BCA') !== (savedEntry.stream || 'BCA')) return item;
        if (slotSheetKey(item) !== savedKey) return item;
        if (String(item.subject || '').trim().toLowerCase() === savedSubj) return item;
        changed = true;
        return {
            ...item,
            offline: true,
            syncNote: 'replaced_on_sheet_by:' + (savedEntry.subject || '')
        };
    });
    if (changed) {
        localStorage.setItem('mgm_attendance_history', JSON.stringify(compactAttendanceHistory(next)));
    }
}

function readAllHistory() {
    try {
        return JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
    } catch (e) {
        return [];
    }
}

/**
 * Tidy local history without losing the offline sync queue.
 * - Always keep unsynced (offline:true) entries for ANY date.
 * - For already-synced entries, keep only today's rows (drawer).
 */
function compactAttendanceHistory(history) {
    const today = getTodayISOString();
    let offlineKept = 0;
    let syncedTodayKept = 0;
    const MAX_OFFLINE = 50;
    const MAX_SYNCED_TODAY = 60;

    return history.filter(item => {
        const itemDate = normalizeHistoryDate(item.date);
        if (item.offline === true) {
            if (offlineKept >= MAX_OFFLINE) return false;
            offlineKept++;
            return true;
        }
        if (itemDate === today) {
            if (syncedTodayKept >= MAX_SYNCED_TODAY) return false;
            syncedTodayKept++;
            return true;
        }
        return false;
    });
}

function pruneOldHistory() {
    const kept = compactAttendanceHistory(readAllHistory());
    localStorage.setItem('mgm_attendance_history', JSON.stringify(kept));
    return kept;
}

function getTodayEntries() {
    const today = getTodayISOString();
    const deptItems = readAllHistory().filter(item => (item.stream || 'BCA') === currentDept);
    // Show today's rows + any still-pending offline rows from other dates
    const pendingOtherDays = deptItems.filter(item => item.offline === true && normalizeHistoryDate(item.date) !== today);
    const todayItems = deptItems.filter(item => normalizeHistoryDate(item.date) === today);
    return [...pendingOtherDays, ...todayItems].slice(0, 60);
}

function updateTodayBadge() {
    const badge = document.getElementById('todayCountBadge');
    const entries = getTodayEntries();
    const count = entries.length;
    const pendingOffline = entries.filter(item => item.offline === true).length;
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
        if (count === 0) {
            sub.textContent = 'No classes marked yet today';
        } else if (pendingOffline > 0) {
            sub.textContent = count + ' entr' + (count === 1 ? 'y' : 'ies') +
                ' — ' + pendingOffline + ' waiting to sync to Google Sheet';
        } else {
            sub.textContent = count + ' class' + (count === 1 ? '' : 'es') +
                ' marked today — edit or delete any';
        }
    }
}

// Local log + durable offline queue (offline rows survive past midnight)
function saveToLocalHistory(entry) {
    const today = getTodayISOString();
    const entryDate = normalizeHistoryDate(entry.date) || today;
    let history = readAllHistory();

    const normalized = {
        ...entry,
        date: entryDate,
        stream: entry.stream || currentDept || 'BCA',
        timestamp: entry.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const existingIdx = history.findIndex(item =>
        entryKey(item) === entryKey(normalized) &&
        (item.stream || 'BCA') === (normalized.stream || 'BCA')
    );

    if (existingIdx !== -1) {
        history[existingIdx] = { ...history[existingIdx], ...normalized };
        const updated = history.splice(existingIdx, 1)[0];
        history.unshift(updated);
    } else {
        history.unshift(normalized);
    }

    history = compactAttendanceHistory(history);
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
            const payload = withAuth({
                action: item.action || 'create',
                isUpdate: !!(item.isUpdate || item.action === 'update'),
                stream: item.stream || currentDept || 'BCA',
                date: normalizeHistoryDate(item.date) || item.date,
                rollNumbers: Array.isArray(item.rollNumbers)
                    ? item.rollNumbers.join(', ')
                    : (item.rollNumbers == null || String(item.rollNumbers).trim() === '' ? 'NIL' : String(item.rollNumbers)),
                year: item.year,
                section: item.section,
                subject: item.subject,
                slot: String(parseInt(item.slot, 10) || 1),
                previousRollNumbers: item.previousRollNumbers || 'NIL',
                addedRollNumbers: item.addedRollNumbers || 'NIL',
                deletedRollNumbers: item.deletedRollNumbers || 'NIL',
                retainedRollNumbers: item.retainedRollNumbers || 'NIL',
                changesSummary: item.changesSummary || 'Synced from phone (was pending)'
            });

            try {
                // Already on sheet? Mark synced — do NOT POST again (that flipped CREATED → UPDATED).
                const already = await verifyAttendanceOnSheet(payload);
                if (already.verified) {
                    history[i].offline = false;
                    history[i].syncNote = '';
                    syncedCount++;
                    continue;
                }

                await postWithRetry(targetUrl, payload, 2);
                await new Promise(r => setTimeout(r, 900));
                const verify = await verifyAttendanceOnSheet(payload);
                if (verify.verified) {
                    history[i].offline = false;
                    history[i].syncNote = '';
                    syncedCount++;
                }
            } catch (err) {
                console.warn('Offline sync attempt failed for item:', item, err);
            }
        }
    }

    localStorage.setItem('mgm_attendance_history', JSON.stringify(compactAttendanceHistory(history)));
    renderHistoryList();
    updateSyncButtonState();

    if (syncedCount > 0) {
        showCustomToast('⚡ Synced ' + syncedCount + ' entry(s)!', 'Uploaded pending records to Google Sheet.');
        setTimeout(fetchTodayServerHistory, 800);
    } else if (offlineItems.length > 0) {
        showCustomToast(
            'Still pending: ' + offlineItems.length,
            'Could not confirm sheet write. Check internet and tap Sync again.'
        );
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

function historyMatchKey(item) {
    return entryKey(item) + '|' + (item.stream || 'BCA');
}

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
    }, 8000);

    window[cbName] = function (data) {
        clearTimeout(timeout);
        isFetchingServerHistory = false;
        try { delete window[cbName]; } catch (e) {}

        if (!(data && data.result === 'success' && Array.isArray(data.entries))) {
            // Keep whatever is already in Today's list if sheet sync fails
            renderHistoryList();
            return;
        }

        const serverEntries = data.entries.map(e => ({
            stream: stream,
            date: normalizeHistoryDate(e.date) || dateVal,
            year: e.year || 'First Year',
            section: e.section || 'A',
            subject: e.subject || 'Subject',
            slot: parseInt(e.slot, 10) || 1,
            rollNumbers: e.rollNumbers || 'NIL',
            offline: false,
            timestamp: 'From Sheet'
        })).filter(e => normalizeHistoryDate(e.date) === dateVal || !e.date);

        const history = readAllHistory();
        const byKey = new Map();

        // Always keep offline queue + other streams / other dates + local today rows
        history.forEach(item => {
            const k = historyMatchKey(item);
            byKey.set(k, item);
        });

        // If sheet returned nothing, do NOT wipe local Today's entries
        if (serverEntries.length === 0) {
            const mergedEmpty = compactAttendanceHistory(Array.from(byKey.values()));
            localStorage.setItem('mgm_attendance_history', JSON.stringify(mergedEmpty));
            renderHistoryList();
            return;
        }

        // Merge sheet rows into local (sheet wins for same key unless local offline pending)
        const serverKeys = new Set();
        const sheetBySlot = new Map();
        serverEntries.forEach(sEntry => {
            const k = historyMatchKey(sEntry);
            serverKeys.add(k);
            sheetBySlot.set(slotSheetKey(sEntry), sEntry);
            const existing = byKey.get(k);
            if (existing && existing.offline === true) return;
            byKey.set(k, sEntry);
        });

        // Reconcile: badge "Synced" only if this exact subject is on the sheet.
        // Same section+slot with a DIFFERENT subject on sheet = overwritten, not synced.
        byKey.forEach((item, k) => {
            if ((item.stream || 'BCA') !== stream) return;
            if (normalizeHistoryDate(item.date) !== dateVal) return;

            const onSheetExact = serverKeys.has(k);
            if (onSheetExact) {
                byKey.set(k, { ...item, offline: false, syncNote: '' });
                return;
            }

            const sheetSlot = sheetBySlot.get(slotSheetKey(item));
            if (sheetSlot) {
                const sheetSubj = String(sheetSlot.subject || '').trim();
                byKey.set(k, {
                    ...item,
                    offline: true,
                    syncNote: 'replaced_on_sheet_by:' + sheetSubj
                });
            } else {
                byKey.set(k, { ...item, offline: true, syncNote: item.syncNote || 'missing_on_sheet' });
            }
        });

        const merged = compactAttendanceHistory(Array.from(byKey.values()));
        localStorage.setItem('mgm_attendance_history', JSON.stringify(merged));
        renderHistoryList();

        const pending = merged.filter(i =>
            i.offline === true &&
            (i.stream || 'BCA') === stream &&
            normalizeHistoryDate(i.date) === dateVal
        );
        if (pending.length > 0 && navigator.onLine) {
            setTimeout(() => { syncOfflineEntries(); }, 400);
        }
    };

    const params = new URLSearchParams({
        action: 'get_absentees',
        stream: stream,
        date: dateVal,
        callback: cbName
    });
    appendAuthToParams(params);

    const scriptEl = document.createElement('script');
    scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
    scriptEl.onerror = function () {
        clearTimeout(timeout);
        isFetchingServerHistory = false;
        try { delete window[cbName]; } catch (e) {}
        renderHistoryList();
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

        const todayStr = getTodayISOString();
        const dateLabel = (item.date && item.date !== todayStr)
            ? ' · ' + escapeHTML(item.date)
            : '';

        const statusBadge = item.offline
            ? (String(item.syncNote || '').indexOf('replaced_on_sheet_by:') === 0
                ? '<span class="badge badge-warning" style="background: rgba(245,158,11,0.2); color: #fbbf24; border: 1px solid rgba(245,158,11,0.35);">Not on sheet — replaced by ' +
                  escapeHTML(String(item.syncNote).replace('replaced_on_sheet_by:', '')) + '</span>'
                : '<span class="badge badge-warning" style="background: rgba(239,68,68,0.2); color: #f87171; border: 1px solid rgba(239,68,68,0.3);">Not on sheet (Pending Sync)</span>')
            : '<span class="badge badge-success">Synced to Sheet</span>';

        return (
        '<div class="history-card">' +
            '<div class="history-top">' +
                '<span class="history-title">' + escapeHTML(item.year) + ' Sec ' + escapeHTML(item.section) + dateLabel + '</span>' +
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

    editingOriginalEntry = {
        date: item.date,
        year: item.year,
        section: item.section,
        subject: item.subject,
        slot: item.slot,
        stream: item.stream || currentDept || 'BCA',
        rollNumbers: item.rollNumbers
    };

    const deptConfig = DEPT_CONFIG[currentDept] || DEPT_CONFIG.BCA;
    dateInput.value = item.date || getTodayISOString();
    rollNumbersInput.value = item.rollNumbers === 'NIL' ? '' : (Array.isArray(item.rollNumbers) ? item.rollNumbers.join(', ') : item.rollNumbers);
    yearSelect.value = item.year || 'First Year';

    // Ensure Combined / AIML options exist before setting value
    updateSectionSelects(true, currentDept, yearSelect.value);
    sectionSelect.value = item.section || 'A';
    if (sectionSelect.value !== (item.section || 'A') && item.section) {
        const opt = document.createElement('option');
        opt.value = item.section;
        opt.textContent = sectionDisplayLabel(item.section);
        sectionSelect.appendChild(opt);
        sectionSelect.value = item.section;
    }

    setSubjectValue(subjectInput, item.subject || deptConfig.defaultSubject);
    slotSelect.value = item.slot ? item.slot.toString() : '1';

    directDateInput.value = dateInput.value;
    directRollInput.value = rollNumbersInput.value;
    directYearSelect.value = yearSelect.value;
    updateSectionSelects(true, currentDept, directYearSelect.value);
    directSectionSelect.value = sectionSelect.value;
    setSubjectValue(directSubjectInput, subjectInput.value);
    directSlotSelect.value = slotSelect.value;

    if (deleteBtn) {
        deleteBtn.style.display = 'inline-block';
        deleteBtn.onclick = () => {
            deleteData(dateInput.value, yearSelect.value, sectionSelect.value, subjectInput.value, slotSelect.value);
        };
    }

    if (submitBtnText) submitBtnText.textContent = 'Save Edited Entry';
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
    applyNoFutureDateLimits();
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
                BCA: store.teacherBCA || DEPT_CONFIG.BCA.passcode
            },
            hod: {
                BCA: store.hodBCA || 'hodbca'
            },
            ADMIN: store.ADMIN || 'admin2026'
        };
    } catch (e) {
        return {
            teacher: {
                BCA: DEPT_CONFIG.BCA.passcode
            },
            hod: {
                BCA: 'hodbca'
            },
            ADMIN: 'admin2026'
        };
    }
}

function savePasscodeStore(store) {
    localStorage.setItem('mgm_custom_passcodes', JSON.stringify(store));
}

// Open BCA immediately — no login / passcode gate
function initDepartmentManager() {
    currentRole = 'ADMIN';
    isHODAuthenticated = true;
    pendingHODTabSwitch = false;
    localStorage.setItem('mgm_dept', 'BCA');
    localStorage.setItem('mgm_role', 'ADMIN');
    localStorage.setItem('mgm_auth_stream', 'BCA');
    try { sessionStorage.setItem('mgm_auth_pass', 'open'); } catch (e) {}
    try { localStorage.setItem('mgm_session_pass', 'open'); } catch (e) {}

    if (deptLoginModal) deptLoginModal.classList.remove('active');

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = 'none';

    if (activeDeptBadge) {
        activeDeptBadge.style.cursor = 'default';
        activeDeptBadge.title = 'BCA Department';
    }

    applyDepartment('BCA');
    applyRoleUI();
}

function applyRoleUI() {
    const hodRoleBadge = document.getElementById('hodRoleBadge');
    const hodStreamSelect = document.getElementById('hodStreamSelect');
    const hodFetchBtnText = document.getElementById('hodFetchBtnText');

    if (hodStreamSelect) {
        hodStreamSelect.value = 'BCA';
        hodStreamSelect.disabled = true;
    }

    if (currentRole === 'ADMIN') {
        if (hodRoleBadge) {
            hodRoleBadge.className = 'badge badge-warning';
            hodRoleBadge.textContent = '👑 Super Admin Mode';
        }
        if (hodFetchBtnText) {
            hodFetchBtnText.textContent = '🔄 Fetch BCA Absentees';
        }
    } else {
        if (hodRoleBadge) {
            hodRoleBadge.className = 'badge badge-success';
            hodRoleBadge.textContent = '🔒 HOD Mode (BCA)';
        }
        if (hodFetchBtnText) {
            hodFetchBtnText.textContent = '🔄 Fetch BCA Absentees';
        }
    }
}

function applyDepartment(deptCode) {
    deptCode = 'BCA';
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

    // Voice assistant always available for BCA
    if (voiceModeTab) {
        voiceModeTab.style.display = '';
    }

    // Year dropdown labels
    updateYearSelects(config);

    // Section visibility & dropdown options
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
    // Pull today's sheet entries so history matches other devices
    if (navigator.onLine) {
        fetchTodayServerHistory();
    }
}

function updateYearSelects(config) {
    const yearSelects = [directYearSelect, yearSelect];
    const streamLabel = (config && config.code) || 'BCA';

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

function sendSubjectToCloud(action, deptCode, yearStr, subjName, isElective, sectionStr, oldSubjectName, oldSectionStr) {
    const targetSec = sectionStr || 'COMMON';
    const payload = withAuth({
        action: action,
        stream: deptCode,
        year: yearStr,
        section: targetSec,
        subject: subjName,
        oldSubject: oldSubjectName || '',
        oldSection: oldSectionStr || '',
        isElective: isElective === true || isElective === 'true' || normalizeSectionCode(targetSec) === 'ALL'
    });
    const targetUrl = getWebhookUrl(deptCode);

    submitViaHiddenForm(targetUrl, payload).catch(e => console.warn('[SubjectSync] Hidden form submission error:', e));

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
            resolve(false);
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
            oldSubject: oldSubjectName || '',
            oldSection: oldSectionStr || '',
            isElective: payload.isElective ? 'true' : 'false',
            callback: cbName
        });
        appendAuthToParams(params);

        scriptEl = document.createElement('script');
        scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
        scriptEl.onerror = function () {
            if (completed) return;
            completed = true;
            clearTimeout(timeout);
            cleanup();
            resolve(false);
        };
        document.body.appendChild(scriptEl);
    }).finally(() => {
        try { localStorage.setItem('mgm_subject_sync_trigger', String(Date.now())); } catch (e) {}
    });
}

let subjectsFetchInFlight = false;
let subjectsAuthPrompted = false;

if (typeof window !== 'undefined') {
    setInterval(() => {
        fetchCloudSubjects();
    }, 12000);
}

if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('storage', (e) => {
        if (e.key === 'mgm_subject_sync_trigger') {
            fetchCloudSubjects();
        }
    });
}

function fetchCloudSubjects() {
    if (typeof document === 'undefined' || !document.createElement) return;
    if (subjectsFetchInFlight) return;

    subjectsFetchInFlight = true;
    const targetUrl = getWebhookUrl(currentDept);
    const cbName = 'mgmSubjectsCb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
    let scriptEl = null;

    const finishFetch = () => {
        subjectsFetchInFlight = false;
        clearTimeout(timeout);
        try { delete window[cbName]; } catch (e) {}
        if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
    };

    const timeout = setTimeout(() => {
        finishFetch();
    }, 8000);

    window[cbName] = function (data) {
        finishFetch();

        if (data && data.result === 'success') {
            subjectsAuthPrompted = false;
            const deletedStore = getDeletedSubjectsStore();

            if (data.deletedSubjects) {
                // Merge cloud deletedSubjects with local deletedStore
                for (let dDept in data.deletedSubjects) {
                    if (!deletedStore[dDept]) deletedStore[dDept] = {};
                    for (let dYr in data.deletedSubjects[dDept]) {
                        if (!deletedStore[dDept][dYr]) deletedStore[dDept][dYr] = [];
                        const cloudDelArr = data.deletedSubjects[dDept][dYr] || [];
                        cloudDelArr.forEach(s => {
                            if (!deletedStore[dDept][dYr].some(x => x.toLowerCase() === s.toLowerCase())) {
                                deletedStore[dDept][dYr].push(s);
                            }
                        });
                    }
                }
                saveDeletedSubjectsStore(deletedStore);

                // Purge cloud-deleted subjects from local device customStore
                const customStore = getCustomSubjectsStore();
                let customChanged = false;
                for (let dDept in deletedStore) {
                    for (let dYr in deletedStore[dDept]) {
                        const delList = deletedStore[dDept][dYr] || [];
                        if (customStore[dDept] && customStore[dDept][dYr]) {
                            const beforeLen = customStore[dDept][dYr].length;
                            customStore[dDept][dYr] = customStore[dDept][dYr].filter(s => {
                                const item = extractSubjNameAndSection(s);
                                return !isSubjectTombstoned(delList, item.name, item.section);
                            });
                            if (customStore[dDept][dYr].length !== beforeLen) customChanged = true;
                        }
                    }
                }
                if (customChanged) {
                    saveCustomSubjectsStore(customStore);
                }
            }

            if (data.customSubjects) {
                // Sheet is source of truth. Active (ADD) subjects on the sheet undelete local tombstones
                // so a subject added on PC is not hidden forever on mobile after an old Clear All.
                let deletedChanged = false;
                const cleanedCloudSubjects = {};
                for (let deptKey in data.customSubjects) {
                    cleanedCloudSubjects[deptKey] = {};
                    for (let yrKey in data.customSubjects[deptKey]) {
                        const subjs = data.customSubjects[deptKey][yrKey] || [];
                        if (deletedStore[deptKey] && deletedStore[deptKey][yrKey]) {
                            const before = deletedStore[deptKey][yrKey].length;
                            const activeNames = subjs.map(s => extractSubjNameAndSection(s).name.toLowerCase());
                            const activeKeys = subjs.map(s => {
                                const it = extractSubjNameAndSection(s);
                                return subjectScopeKey(it.name, it.section).toLowerCase();
                            });
                            deletedStore[deptKey][yrKey] = deletedStore[deptKey][yrKey].filter(d => {
                                const dl = String(d || '').toLowerCase();
                                if (dl.indexOf('::') !== -1) return !activeKeys.includes(dl);
                                return !activeNames.includes(dl);
                            });
                            if (deletedStore[deptKey][yrKey].length !== before) deletedChanged = true;
                        }
                        const delList = (deletedStore[deptKey] && deletedStore[deptKey][yrKey]) ? deletedStore[deptKey][yrKey] : [];
                        cleanedCloudSubjects[deptKey][yrKey] = subjs.filter(s => {
                            const item = extractSubjNameAndSection(s);
                            return !isSubjectTombstoned(delList, item.name, item.section);
                        });
                    }
                }
                if (deletedChanged) saveDeletedSubjectsStore(deletedStore);
                saveCloudSubjectsStore(cleanedCloudSubjects);

                // Drop local cleared lock once sheet sync succeeds
                try {
                    const clearedStore = getClearedDeptsStore();
                    let clearedChanged = false;
                    for (let deptKey in data.customSubjects) {
                        if (clearedStore[deptKey]) {
                            delete clearedStore[deptKey];
                            clearedChanged = true;
                        }
                    }
                    if (clearedChanged) saveClearedDeptsStore(clearedStore);
                } catch (e) {}
            }

            if (data.electiveSubjects) {
                const flags = getElectiveFlagsStore();
                Object.assign(flags, data.electiveSubjects);
                saveElectiveFlagsStore(flags);
            }

            const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
            refreshSubjectDropdowns();
            const subjectManageModal = document.getElementById('subjectManageModal');
            if (subjectManageModal && subjectManageModal.classList.contains('active')) {
                renderSubjectChips();
            }
        } else if (data && (data.error === 'Unauthorized' || data.result === 'error')) {
            console.warn('[Subjects] Cloud fetch failed:', data.message || data.error || '');
        }
    };

    const params = new URLSearchParams({
        action: 'get_subjects',
        callback: cbName
    });
    appendAuthToParams(params);

    scriptEl = document.createElement('script');
    scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
    scriptEl.onerror = function () {
        finishFetch();
    };
    document.body.appendChild(scriptEl);
}

function getClearedDeptsStore() {
    try {
        return JSON.parse(localStorage.getItem('mgm_cleared_depts') || '{}');
    } catch (e) {
        return {};
    }
}

function saveClearedDeptsStore(store) {
    try {
        localStorage.setItem('mgm_cleared_depts', JSON.stringify(store || {}));
    } catch (e) {}
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

function beginSubjectEdit(subjName, sectionHint) {
    const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
    const newSubjectInput = document.getElementById('newSubjectInput');
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    const oldNameInput = document.getElementById('editingSubjectOldName');
    const oldSecInput = document.getElementById('editingSubjectOldSection');
    const electiveCheck = document.getElementById('newSubjectElectiveCheck');
    const secSelect = document.getElementById('newSubjectSectionSelect');
    const hint = document.getElementById('subjectEditHint');

    const item = typeof subjName === 'object' ? extractSubjNameAndSection(subjName) : { name: subjName, section: sectionHint || 'COMMON' };
    const tagInfo = formatSectionTagLabel(item.section || sectionHint || 'COMMON');
    const isElec = normalizeSectionCode(item.section) === 'ALL';

    if (oldNameInput) oldNameInput.value = item.name;
    if (oldSecInput) oldSecInput.value = item.section || 'COMMON';
    if (newSubjectInput) {
        newSubjectInput.value = item.name;
        newSubjectInput.focus();
    }
    if (addSubjectBtn) addSubjectBtn.textContent = 'Save';
    populateModalSectionOptions();
    if (secSelect) {
        const want = canonicalSectionStorage(item.section || 'COMMON');
        if (Array.from(secSelect.options).some(o => o.value === want)) secSelect.value = want;
        else if (Array.from(secSelect.options).some(o => normalizeSectionCode(o.value) === normalizeSectionCode(want))) {
            secSelect.value = Array.from(secSelect.options).find(o => normalizeSectionCode(o.value) === normalizeSectionCode(want)).value;
        }
    }
    if (electiveCheck) electiveCheck.checked = !!isElec;
    if (hint) {
        hint.style.display = 'block';
        hint.textContent = 'Editing "' + item.name + '" (' + tagInfo.label + '). Change name/scope, then Save.';
    }
}

function clearSubjectEditForm() {
    const newSubjectInput = document.getElementById('newSubjectInput');
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    const oldNameInput = document.getElementById('editingSubjectOldName');
    const oldSecInput = document.getElementById('editingSubjectOldSection');
    const electiveCheck = document.getElementById('newSubjectElectiveCheck');
    const hint = document.getElementById('subjectEditHint');
    if (oldNameInput) oldNameInput.value = '';
    if (oldSecInput) oldSecInput.value = '';
    if (newSubjectInput) newSubjectInput.value = '';
    if (addSubjectBtn) addSubjectBtn.textContent = '+ Add';
    if (electiveCheck) electiveCheck.checked = false;
    if (hint) {
        hint.style.display = 'none';
        hint.textContent = '';
    }
}

function canonicalSectionStorage(sec) {
    const n = normalizeSectionCode(sec);
    if (n === 'C_AIML') return 'C (AIML)';
    if (n === 'C_TP') return 'C (TP)';
    if (n === 'C_AF') return 'C (AF)';
    if (n === 'COMMON') return 'COMMON';
    if (n === 'ALL') return 'ALL';
    if (n === 'A_B') return 'A_B';
    return n;
}

function upsertLocalSubject(deptCode, yearStr, name, section, isElective, oldName, oldSection) {
    const store = getCustomSubjectsStore();
    if (!store[deptCode]) store[deptCode] = {};
    if (!store[deptCode][yearStr]) store[deptCode][yearStr] = [];
    const secNorm = section || 'A_B';
    const oldSec = oldSection || secNorm;

    if (oldName) {
        store[deptCode][yearStr] = store[deptCode][yearStr].filter(s => {
            const item = extractSubjNameAndSection(s);
            const nameMatch = item.name.trim().toLowerCase() === oldName.toLowerCase();
            const secMatch = sectionsEqualForSubject(item.section, oldSec);
            return !(nameMatch && secMatch);
        });
        const cloudStore = getCloudSubjectsStore();
        if (cloudStore[deptCode] && cloudStore[deptCode][yearStr]) {
            cloudStore[deptCode][yearStr] = cloudStore[deptCode][yearStr].filter(s => {
                const item = extractSubjNameAndSection(s);
                const nameMatch = item.name.trim().toLowerCase() === oldName.toLowerCase();
                const secMatch = sectionsEqualForSubject(item.section, oldSec);
                return !(nameMatch && secMatch);
            });
            saveCloudSubjectsStore(cloudStore);
        }
        const flags = getElectiveFlagsStore();
        delete flags[(deptCode + '_' + yearStr + '_' + oldName).toLowerCase()];
        saveElectiveFlagsStore(flags);
    }

    const subjObj = { name: name, section: secNorm };
    const existingIdx = store[deptCode][yearStr].findIndex(s => {
        const item = extractSubjNameAndSection(s);
        return item.name.trim().toLowerCase() === name.toLowerCase() &&
            sectionsEqualForSubject(item.section, secNorm);
    });
    if (existingIdx !== -1) store[deptCode][yearStr][existingIdx] = subjObj;
    else store[deptCode][yearStr].push(subjObj);
    saveCustomSubjectsStore(store);

    const flags = getElectiveFlagsStore();
    flags[(deptCode + '_' + yearStr + '_' + name).toLowerCase()] = !!isElective || normalizeSectionCode(secNorm) === 'ALL';
    saveElectiveFlagsStore(flags);

    const deletedStore = getDeletedSubjectsStore();
    if (deletedStore[deptCode] && deletedStore[deptCode][yearStr]) {
        const dk = subjectScopeKey(name, secNorm);
        deletedStore[deptCode][yearStr] = deletedStore[deptCode][yearStr].filter(s =>
            s !== dk && s.toLowerCase() !== name.toLowerCase()
        );
        saveDeletedSubjectsStore(deletedStore);
    }
}

function deleteSubject(deptCode, yearStr, subjName, sectionHint) {
    if (!subjName) return;
    const itemIn = typeof subjName === 'string' ? { name: subjName.trim(), section: sectionHint || '' } : extractSubjNameAndSection(subjName);
    const targetName = itemIn.name.trim();
    if (!targetName) return;
    const targetSec = sectionHint || itemIn.section || '';

    const customStore = getCustomSubjectsStore();
    if (customStore[deptCode] && customStore[deptCode][yearStr]) {
        customStore[deptCode][yearStr] = customStore[deptCode][yearStr].filter(s => {
            const item = extractSubjNameAndSection(s);
            if (item.name.trim().toLowerCase() !== targetName.toLowerCase()) return true;
            if (targetSec) return !sectionsEqualForSubject(item.section, targetSec);
            return false;
        });
        saveCustomSubjectsStore(customStore);
    }

    const cloudStore = getCloudSubjectsStore();
    if (cloudStore[deptCode] && cloudStore[deptCode][yearStr]) {
        cloudStore[deptCode][yearStr] = cloudStore[deptCode][yearStr].filter(s => {
            const item = extractSubjNameAndSection(s);
            if (item.name.trim().toLowerCase() !== targetName.toLowerCase()) return true;
            if (targetSec) return !sectionsEqualForSubject(item.section, targetSec);
            return false;
        });
        saveCloudSubjectsStore(cloudStore);
    }

    const deletedStore = getDeletedSubjectsStore();
    if (!deletedStore[deptCode]) deletedStore[deptCode] = {};
    if (!deletedStore[deptCode][yearStr]) deletedStore[deptCode][yearStr] = [];
    const dk = subjectScopeKey(targetName, targetSec || 'ALL');
    if (!deletedStore[deptCode][yearStr].includes(dk)) {
        deletedStore[deptCode][yearStr].push(dk);
        saveDeletedSubjectsStore(deletedStore);
    }

    sendSubjectToCloud('delete_subject', deptCode, yearStr, targetName, false, targetSec || 'ALL')
        .catch(e => console.warn('Subject delete cloud sync error:', e));

    showCustomToast('Subject Deleted Across College', '"' + targetName + '" removed from ' + deptCode + ' ' + yearStr + ' on all devices.');
}

function extractSubjNameAndSection(subj) {
    if (!subj) return { name: '', section: 'ALL' };
    if (typeof subj === 'string') return { name: subj, section: 'ALL' };
    return { name: subj.name || subj.subject || '', section: subj.section || 'ALL' };
}

function normalizeSectionCode(sec) {
    if (!sec) return 'ALL';
    const s = String(sec).trim().toUpperCase();
    if (s === 'ALL' || s === 'COMBINED' || s === 'ANY' || s === 'ELECTIVE') return 'ALL';
    if (s === 'COMMON' || s === 'SECTION COMMON' || s === 'ALL CLASSES' || s === 'SHARED') return 'COMMON';
    if (s === 'A_B' || s === 'A&B' || s === 'A AND B' || s === 'AB') return 'A_B';
    if (s === 'C (AIML)' || s === 'C AIML' || s === 'AIML') return 'C_AIML';
    if (s === 'C (TP)' || s === 'C TP' || s === 'TP') return 'C_TP';
    if (s === 'C (AF)' || s === 'C AF' || s === 'AF' || s === 'D') return 'C_AF';
    if (s === 'A' || s === 'B' || s === 'C') return s;
    return s;
}

/**
 * Scope rules:
 * - ALL (Combined elective): Combined attendance only (Kannada/Hindi/Sanskrit)
 * - COMMON (all classes, not elective): Sec A, B, C — NOT Combined (English, CONST, FOC…)
 * - A_B: Sec A / B only
 * - C_AIML: Sec C (AIML) only
 */
function isCustomSubjectMatchingSection(subjObj, targetSec) {
    const sSec = normalizeSectionCode(subjObj.section || 'ALL');
    const target = normalizeSectionCode(targetSec || 'A');

    if (target === 'ALL') {
        return sSec === 'ALL';
    }

    // Combined electives never show under A/B/C
    if (sSec === 'ALL') {
        return false;
    }

    // Common core subjects: every concrete class section, not Combined
    if (sSec === 'COMMON') {
        return target === 'A' || target === 'B' || target === 'C' ||
            target === 'C_AIML' || target === 'C_TP' || target === 'C_AF' || target === 'A_B';
    }

    if (sSec === target) return true;

    if ((sSec === 'C_AIML' && target === 'C') || (sSec === 'C' && target === 'C_AIML')) {
        return true;
    }

    if (sSec === 'A_B' && (target === 'A' || target === 'B')) {
        return true;
    }

    if (target === 'A_B') {
        return sSec === 'A_B' || sSec === 'A' || sSec === 'B';
    }

    if (target === 'C_TP') return sSec === 'C_TP';
    if (target === 'C_AF') return sSec === 'C_AF';
    if (target === 'C_AIML') return sSec === 'C_AIML' || sSec === 'C';

    return false;
}

function subjectScopeKey(name, section) {
    return String(name || '').trim().toLowerCase() + '::' + normalizeSectionCode(section);
}

/** Tombstone may be name::SECTION or legacy bare name (hides all scopes of that name). */
function isSubjectTombstoned(deletedList, name, section) {
    const dk = subjectScopeKey(name, section).toLowerCase();
    const nameLower = String(name || '').trim().toLowerCase();
    return (deletedList || []).some(d => {
        const dl = String(d || '').toLowerCase();
        if (dl === dk) return true;
        if (dl.indexOf('::') !== -1) return false;
        return dl === nameLower;
    });
}

function sectionsEqualForSubject(a, b) {
    return normalizeSectionCode(a) === normalizeSectionCode(b);
}

function subjectListFingerprint(subjects) {
    return (subjects || []).map(s => String(s).toLowerCase()).join('\u0001');
}

function refreshSubjectDropdowns(preferredSubject) {
    const yr = directYearSelect ? directYearSelect.value : 'First Year';
    const sec = directSectionSelect ? directSectionSelect.value : 'A';
    const list = getSubjectsForActiveYear(currentDept, yr, sec);
    const config = DEPT_CONFIG[currentDept];
    updateSubjectDropdowns(list, preferredSubject || (config ? config.defaultSubject : null));
}

function getSubjectsForActiveYear(deptCode, yearStr, sectionStr) {
    const config = DEPT_CONFIG[deptCode];
    if (!config) return [];

    let baseSubjects = [];
    const sec = sectionStr || 'A';
    const targetNorm = normalizeSectionCode(sec);

    // Combined: do not dump every section's built-in list — only ALL-tagged customs below
    if (targetNorm !== 'ALL' && config.subjectsByYearAndSection && config.subjectsByYearAndSection[yearStr]) {
        const secMap = config.subjectsByYearAndSection[yearStr];

        const pushUnique = (arr) => {
            (arr || []).forEach(s => {
                if (!baseSubjects.some(x => x.toLowerCase() === String(s).toLowerCase())) {
                    baseSubjects.push(s);
                }
            });
        };

        // Exact key match
        for (let k in secMap) {
            if (normalizeSectionCode(k) === targetNorm) pushUnique(secMap[k]);
        }
        // A/B also get A_B pool from config if present
        if (targetNorm === 'A' || targetNorm === 'B') {
            for (let k in secMap) {
                if (normalizeSectionCode(k) === 'A_B') pushUnique(secMap[k]);
            }
        }
        // C (attendance) also try C / C (AIML) keys
        if (targetNorm === 'C' || targetNorm === 'C_AIML') {
            for (let k in secMap) {
                const nk = normalizeSectionCode(k);
                if (nk === 'C' || nk === 'C_AIML') pushUnique(secMap[k]);
            }
        }
    } else if (targetNorm !== 'ALL' && config.subjectsByYear && config.subjectsByYear[yearStr]) {
        baseSubjects = [...config.subjectsByYear[yearStr]];
    } else if (targetNorm !== 'ALL') {
        baseSubjects = [...(config.subjects || [])];
    }

    const deletedStore = getDeletedSubjectsStore();
    const deletedList = ((deletedStore[deptCode] || {})[yearStr]) || [];

    const mergeList = (list) => {
        (list || []).forEach(subj => {
            const item = extractSubjNameAndSection(subj);
            if (!item.name) return;
            if (isSubjectTombstoned(deletedList, item.name, item.section)) return;
            if (isCustomSubjectMatchingSection(item, sec)) {
                if (!baseSubjects.some(s => s.toLowerCase() === item.name.toLowerCase())) {
                    baseSubjects.push(item.name);
                }
            }
        });
    };

    const cloudStore = getCloudSubjectsStore();
    mergeList((cloudStore[deptCode] || {})[yearStr] || []);

    const customStore = getCustomSubjectsStore();
    mergeList((customStore[deptCode] || {})[yearStr] || []);

    return baseSubjects;
}

/** All subject entries for manage chips (name + section; same name can exist in different scopes). */
function getAllSubjectsForYearManage(deptCode, yearStr) {
    const entries = [];
    const seen = new Set();
    const deletedStore = getDeletedSubjectsStore();
    const deletedList = ((deletedStore[deptCode] || {})[yearStr]) || [];

    const add = (subj) => {
        const item = extractSubjNameAndSection(subj);
        const name = item.name.trim();
        if (!name) return;
        const dk = subjectScopeKey(name, item.section);
        if (isSubjectTombstoned(deletedList, name, item.section)) return;
        if (seen.has(dk)) return;
        seen.add(dk);
        entries.push({ name: name, section: item.section || 'A_B' });
    };

    const cloudStore = getCloudSubjectsStore();
    ((cloudStore[deptCode] || {})[yearStr] || []).forEach(add);
    const customStore = getCustomSubjectsStore();
    ((customStore[deptCode] || {})[yearStr] || []).forEach(add);

    return entries;
}

function updateSubjectDropdowns(subjects, defaultSubject) {
    const subjectSelects = [directSubjectInput, subjectInput];
    const nextFp = subjectListFingerprint(subjects);

    subjectSelects.forEach(selectEl => {
        if (!selectEl) return;

        const prev = selectEl.value;
        const curFp = subjectListFingerprint(
            Array.from(selectEl.options).map(o => o.value).filter(v => v)
        );

        // Skip DOM rebuild when options are unchanged (stops flash on open/sync)
        if (curFp === nextFp && subjects && subjects.length > 0) {
            if (defaultSubject && subjects.some(s => s.toLowerCase() === String(defaultSubject).toLowerCase())) {
                const match = subjects.find(s => s.toLowerCase() === String(defaultSubject).toLowerCase());
                if (match) selectEl.value = match;
            }
            return;
        }

        selectEl.innerHTML = '';
        if (subjects && Array.isArray(subjects) && subjects.length > 0) {
            subjects.forEach(subj => {
                const opt = document.createElement('option');
                opt.value = subj;
                opt.textContent = subj;
                selectEl.appendChild(opt);
            });
        } else {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = '-- Add Subject via (+ Add Subject) button above --';
            selectEl.appendChild(opt);
        }
        if (defaultSubject && subjects && subjects.some(s => s.toLowerCase() === String(defaultSubject).toLowerCase())) {
            setSubjectValue(selectEl, defaultSubject);
        } else if (prev && subjects && subjects.some(s => s.toLowerCase() === String(prev).toLowerCase())) {
            selectEl.value = prev;
        }
    });
}

function isElectiveOrLanguageSubject(subjectVal, deptCode, yearStr) {
    if (!subjectVal) return false;
    const cleanSubj = subjectVal.trim().toLowerCase();
    const dept = deptCode || currentDept || 'BCA';
    const yr = yearStr || (directYearSelect ? directYearSelect.value : 'First Year');

    // Prefer explicit section tag from custom/cloud store
    const resolveStored = (list) => {
        for (let i = 0; i < (list || []).length; i++) {
            const item = extractSubjNameAndSection(list[i]);
            if (item.name.trim().toLowerCase() === cleanSubj) {
                return normalizeSectionCode(item.section) === 'ALL';
            }
        }
        return null;
    };
    const cloudList = ((getCloudSubjectsStore()[dept] || {})[yr]) || [];
    const customList = ((getCustomSubjectsStore()[dept] || {})[yr]) || [];
    const fromCloud = resolveStored(cloudList);
    if (fromCloud !== null) return fromCloud;
    const fromCustom = resolveStored(customList);
    if (fromCustom !== null) return fromCustom;

    const key = (dept + '_' + yr + '_' + cleanSubj).toLowerCase();
    const flags = getElectiveFlagsStore();
    if (flags[key] !== undefined) {
        return Boolean(flags[key]);
    }

    // Labs are never auto-elective
    if (/\b(lab|practical)\b/i.test(cleanSubj)) {
        return false;
    }

    // Name fallback only for known language/elective titles (not plain "English")
    return /\b(kannada|kanada|kanad|hindi|hindhi|sanskrit|sanskrith|sanskritha|sanskrut|sanskrutha|sanskritam|devops|wcms|digital\s*fluency|cyber\s*security|e-?filing|optional\s*english|human\s*rights)\b/i.test(cleanSubj);
}

function checkLanguageElectiveAutoCombined(subjectVal, sectionSelectElem, yearSelectElem, forceToast) {
    // Keep user's selected section completely intact. No auto-resetting of sections.
    return;
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
    applyNoFutureDateLimits();
    [dateInput, directDateInput, document.getElementById('hodDatePicker')].forEach(el => {
        if (!el) return;
        el.addEventListener('change', () => {
            const clamped = clampAttendanceDate(el.value);
            if (el.value !== clamped) {
                el.value = clamped;
                showCustomToast('Future date not allowed', 'Attendance can only be for today or earlier.');
            }
            applyNoFutureDateLimits();
        });
    });
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

    // Year / section changes: filter locally only (cloud poll already runs every 12s).
    // Avoid fetchCloudSubjects here — it rebuilt dropdowns mid-interaction and caused screen flash.
    if (directYearSelect) {
        directYearSelect.addEventListener('change', () => {
            const config = DEPT_CONFIG[currentDept];
            const hasSec = config ? config.hasSections : true;
            const yrVal = directYearSelect.value;
            updateSectionSelects(hasSec, currentDept, yrVal);
            refreshSubjectDropdowns(config ? config.defaultSubject : null);
        });
    }

    if (yearSelect) {
        yearSelect.addEventListener('change', () => {
            const config = DEPT_CONFIG[currentDept];
            const hasSec = config ? config.hasSections : true;
            const yrVal = yearSelect.value;
            updateSectionSelects(hasSec, currentDept, yrVal);
            const secVal = sectionSelect ? sectionSelect.value : 'A';
            updateSubjectDropdowns(getSubjectsForActiveYear(currentDept, yrVal, secVal), config ? config.defaultSubject : null);
        });
    }

    if (directSectionSelect) {
        directSectionSelect.addEventListener('change', () => {
            refreshSubjectDropdowns();
        });
    }

    if (sectionSelect) {
        sectionSelect.addEventListener('change', () => {
            const config = DEPT_CONFIG[currentDept];
            const yrVal = yearSelect ? yearSelect.value : 'First Year';
            updateSubjectDropdowns(
                getSubjectsForActiveYear(currentDept, yrVal, sectionSelect.value),
                config ? config.defaultSubject : null
            );
        });
    }

    // Live Double Entry warning — SELECT uses change only (input on <select> causes flicker on mobile)
    [dateInput, yearSelect, sectionSelect, subjectInput, slotSelect, rollNumbersInput].forEach(elem => {
        if (elem) {
            const run = () => {
                if (elem === subjectInput || elem === sectionSelect) checkLanguageElectiveAutoCombined(subjectInput.value, sectionSelect, yearSelect);
                updateModalDoubleEntryCheck();
            };
            elem.addEventListener('change', run);
            if (elem.tagName !== 'SELECT') elem.addEventListener('input', run);
        }
    });

    [directDateInput, directYearSelect, directSectionSelect, directSubjectInput, directSlotSelect, directRollInput].forEach(elem => {
        if (elem) {
            const run = () => {
                if (elem === directSubjectInput || elem === directSectionSelect) checkLanguageElectiveAutoCombined(directSubjectInput.value, directSectionSelect, directYearSelect);
                updateDirectDoubleEntryCheck();
            };
            elem.addEventListener('change', run);
            if (elem.tagName !== 'SELECT') elem.addEventListener('input', run);
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
        syncOfflineEntries().then(() => fetchTodayServerHistory());
    });

    renderHistoryList();
    if (navigator.onLine) {
        setTimeout(() => {
            syncOfflineEntries().then(() => fetchTodayServerHistory());
        }, 2000);
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

    // PWA Service Worker with Auto Update Capability
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => {
                    console.log('[PWA] Service Worker Registered:', reg.scope);
                    reg.update(); // Force check for SW update on every app launch

                    reg.onupdatefound = () => {
                        const installingWorker = reg.installing;
                        if (installingWorker) {
                            installingWorker.onstatechange = () => {
                                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    showCustomToast(
                                        '⚡ App Updated to Latest Version!',
                                        'Loading updated department structures & features...'
                                    );
                                    setTimeout(() => {
                                        window.location.reload(true);
                                    }, 800);
                                }
                            };
                        }
                    };
                })
                .catch(err => console.warn('[PWA] Service Worker Registration failed:', err));
        });

        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload(true);
            }
        });
    }
});

function forceAppUpdate() {
    showCustomToast('🔄 Checking for App Updates...', 'All attendance history & offline logs remain 100% safe.');
    if ('caches' in window) {
        caches.keys().then(names => {
            return Promise.all(names.map(name => caches.delete(name)));
        }).then(() => {
            if (navigator.serviceWorker) {
                navigator.serviceWorker.getRegistrations().then(regs => {
                    regs.forEach(reg => reg.unregister());
                    setTimeout(() => window.location.reload(true), 500);
                });
            } else {
                setTimeout(() => window.location.reload(true), 500);
            }
        });
    } else {
        setTimeout(() => window.location.reload(true), 500);
    }
}

function populateModalSectionOptions() {
    const secSelect = document.getElementById('newSubjectSectionSelect');
    if (!secSelect) return;
    secSelect.innerHTML = '';

    const dept = currentDept || 'BCA';
    const year = directYearSelect ? directYearSelect.value : 'First Year';
    const isFirstYear = year === 'First Year' || year === '1' || year === '1st Year';

    let options = [];
    let defaultVal = 'COMMON';

    if (isFirstYear) {
        options = [
            { val: 'A_B', label: '1) A & B only (General BCA)' },
            { val: 'C (AIML)', label: '2) C (AIML) only' },
            { val: 'COMMON', label: '3) Common to all classes (English, CONST, FOC…) — not Combined' },
            { val: 'ALL', label: '4) Combined elective (Kannada / Hindi / Sanskrit)' }
        ];
    } else {
        options = [
            { val: 'A', label: 'Section A only' },
            { val: 'B', label: 'Section B only' },
            { val: 'C', label: 'Section C only' },
            { val: 'COMMON', label: 'Common to all classes — not Combined' },
            { val: 'ALL', label: 'Combined elective (languages)' }
        ];
    }
    defaultVal = 'COMMON';

    options.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.val;
        opt.textContent = o.label;
        secSelect.appendChild(opt);
    });
    secSelect.value = defaultVal;
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
        clearSubjectEditForm();
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
            const secSelectModal = document.getElementById('newSubjectSectionSelect');
            const oldNameInput = document.getElementById('editingSubjectOldName');
            const oldSecInput = document.getElementById('editingSubjectOldSection');
            const oldName = oldNameInput ? oldNameInput.value.trim() : '';
            const oldSection = oldSecInput ? oldSecInput.value.trim() : '';
            let targetSection = canonicalSectionStorage(secSelectModal ? secSelectModal.value : 'COMMON');
            const isElecChecked = normalizeSectionCode(targetSection) === 'ALL';

            const targetSectionText = secSelectModal && secSelectModal.options[secSelectModal.selectedIndex]
                ? secSelectModal.options[secSelectModal.selectedIndex].text
                : targetSection;

            upsertLocalSubject(currentDept, activeYear, val, targetSection, isElecChecked, oldName || null, oldSection || null);

            // Allow cloud sync again for this dept (old subjects stay hidden via deletedStore tombstones)
            const clearedStore = getClearedDeptsStore();
            if (clearedStore[currentDept]) {
                delete clearedStore[currentDept];
                saveClearedDeptsStore(clearedStore);
            }

            const cloudAction = oldName ? 'rename_subject' : 'add_subject';
            clearSubjectEditForm();
            renderSubjectChips();
            refreshSubjectDropdowns(val);
            showCustomToast(
                oldName ? 'Subject Saved Locally' : 'Subject Saved Locally',
                '"' + val + '" — syncing to sheet…'
            );
            sendSubjectToCloud(cloudAction, currentDept, activeYear, val, isElecChecked, targetSection, oldName || '', oldSection || '')
                .then(ok => {
                    if (ok) {
                        showCustomToast(
                            oldName ? 'Subject Updated & Synced!' : 'Subject Added & Synced!',
                            '"' + val + '" saved — ' + targetSectionText
                        );
                    } else {
                        showCustomToast(
                            'Saved on this device only',
                            '"' + val + '" — cloud sync failed. Check login / Wi‑Fi, then re-open Manage Subjects.'
                        );
                    }
                })
                .catch(e => {
                    console.warn('Subject cloud sync error:', e);
                    showCustomToast('Saved on this device only', 'Cloud sync error — subject may not appear on other phones yet.');
                });
        });
    }

    if (resetSubjectsBtn) {
        resetSubjectsBtn.addEventListener('click', () => {
            if (confirm('Clear all stored subjects for ' + currentDept + '?\n\nThis removes them on this phone AND marks them deleted in Google Sheet so they will not come back on sync.')) {
                const dept = currentDept;
                const customStore = getCustomSubjectsStore();
                const cloudStore = getCloudSubjectsStore();
                const deletedStore = getDeletedSubjectsStore();
                if (!deletedStore[dept]) deletedStore[dept] = {};

                // Tombstone every known subject so a later cloud fetch cannot resurrect them
                const years = new Set([
                    ...Object.keys((customStore[dept] || {})),
                    ...Object.keys((cloudStore[dept] || {}))
                ]);
                years.forEach(yr => {
                    if (!deletedStore[dept][yr]) deletedStore[dept][yr] = [];
                    const lists = []
                        .concat((customStore[dept] && customStore[dept][yr]) || [])
                        .concat((cloudStore[dept] && cloudStore[dept][yr]) || []);
                    lists.forEach(s => {
                        const item = extractSubjNameAndSection(s);
                        const name = item.name.trim();
                        if (!name) return;
                        const dk = subjectScopeKey(name, item.section);
                        if (!deletedStore[dept][yr].some(d => String(d).toLowerCase() === dk.toLowerCase())) {
                            deletedStore[dept][yr].push(dk);
                        }
                    });
                });
                saveDeletedSubjectsStore(deletedStore);

                // Prefer sheet tombstones; cleared flag is only a local hint and no longer blocks fetch
                const clearedStore = getClearedDeptsStore();
                clearedStore[dept] = true;
                saveClearedDeptsStore(clearedStore);

                delete customStore[dept];
                saveCustomSubjectsStore(customStore);
                delete cloudStore[dept];
                saveCloudSubjectsStore(cloudStore);

                sendSubjectToCloud('clear_subjects', dept, 'ALL', '')
                    .catch(e => console.warn('Cloud subject clear error:', e));

                const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
                renderSubjectChips();
                refreshSubjectDropdowns();
                showCustomToast('All Subjects Cleared!', 'Cleared for ' + dept + '. Old sheet subjects marked deleted so they stay gone.');
            }
        });
    }
}

// Version upgrade check to purge stale cached cloud subjects on GitHub Pages update
(function checkAppCacheVersion() {
    const APP_VER = 'v28.7_sync_truth';
    if (localStorage.getItem('mgm_app_ver') !== APP_VER) {
        localStorage.removeItem('mgm_cloud_subjects');
        localStorage.setItem('mgm_app_ver', APP_VER);
        // One-time purge of stale mobile PWA caches after version bump
        try {
            if (window.caches && caches.keys) {
                caches.keys().then(function (names) {
                    return Promise.all(names.map(function (n) { return caches.delete(n); }));
                }).then(function () {
                    if (sessionStorage.getItem('mgm_ver_reloaded') === APP_VER) return;
                    sessionStorage.setItem('mgm_ver_reloaded', APP_VER);
                    window.location.reload();
                }).catch(function () {});
            }
        } catch (e) {}
    }
})();

function getSubjectSectionTagInfo(deptCode, yearStr, subjName) {
    if (!subjName) return formatSectionTagLabel('ALL');
    const targetName = typeof subjName === 'string' ? subjName.trim() : extractSubjNameAndSection(subjName).name.trim();

    const customStore = getCustomSubjectsStore();
    const deptCustom = customStore[deptCode] || {};
    const customList = deptCustom[yearStr] || [];
    for (let c of customList) {
        const item = extractSubjNameAndSection(c);
        if (item.name.trim().toLowerCase() === targetName.toLowerCase()) {
            return formatSectionTagLabel(item.section);
        }
    }

    const cloudStore = getCloudSubjectsStore();
    const deptCloud = cloudStore[deptCode] || {};
    const cloudList = deptCloud[yearStr] || [];
    for (let c of cloudList) {
        const item = extractSubjNameAndSection(c);
        if (item.name.trim().toLowerCase() === targetName.toLowerCase()) {
            return formatSectionTagLabel(item.section);
        }
    }

    const config = DEPT_CONFIG[deptCode];
    if (config && config.subjectsByYearAndSection && config.subjectsByYearAndSection[yearStr]) {
        const secMap = config.subjectsByYearAndSection[yearStr];
        for (let sKey in secMap) {
            if (secMap[sKey].some(s => s.toLowerCase() === targetName.toLowerCase())) {
                return formatSectionTagLabel(sKey);
            }
        }
    }

    return formatSectionTagLabel('ALL');
}

function formatSectionTagLabel(secCode) {
    const sec = secCode || 'COMMON';
    const n = normalizeSectionCode(sec);
    if (n === 'ALL') return { label: 'Combined elective', section: 'ALL', bg: 'rgba(234, 179, 8, 0.2)', color: '#eab308' };
    if (n === 'COMMON') return { label: 'Common (all classes)', section: 'COMMON', bg: 'rgba(52, 211, 153, 0.2)', color: '#34d399' };
    if (n === 'A_B') return { label: 'A & B only', section: 'A_B', bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' };
    if (n === 'C_AIML') return { label: 'C (AIML) only', section: 'C (AIML)', bg: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' };
    if (n === 'C_TP') return { label: 'C (TP) only', section: 'C (TP)', bg: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' };
    if (n === 'C_AF') return { label: 'C (AF) only', section: 'C (AF)', bg: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' };
    return { label: 'Sec ' + sec, section: sec, bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' };
}

function renderSubjectChips() {
    const chipsContainer = document.getElementById('subjectChipsContainer');
    if (!chipsContainer) return;
    const activeYear = directYearSelect ? directYearSelect.value : 'First Year';
    const subjects = getAllSubjectsForYearManage(currentDept, activeYear);

    chipsContainer.innerHTML = '';
    if (subjects.length === 0) {
        chipsContainer.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-dim);">No subjects available for ' + activeYear + '. Click "+ Add" above to add subjects.</span>';
        return;
    }

    subjects.forEach(entry => {
        const subj = entry.name;
        const sec = entry.section;
        const chip = document.createElement('div');
        chip.className = 'subject-chip-tag';
        chip.style.display = 'inline-flex';
        chip.style.alignItems = 'center';
        chip.style.gap = '6px';

        const tagInfo = formatSectionTagLabel(sec);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = subj;
        chip.appendChild(nameSpan);

        const badgeSpan = document.createElement('span');
        badgeSpan.style.cssText = `font-size: 0.68rem; padding: 2px 6px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); font-weight: 600; line-height: 1; margin: 0; background: ${tagInfo.bg}; color: ${tagInfo.color};`;
        badgeSpan.textContent = tagInfo.label;
        chip.appendChild(badgeSpan);

        if (normalizeSectionCode(sec) === 'ALL') {
            const elecBadge = document.createElement('span');
            elecBadge.style.cssText = 'font-size: 0.65rem; padding: 2px 6px; border-radius: 12px; background: rgba(52,211,153,0.2); color: #34d399; font-weight: 600;';
            elecBadge.textContent = 'Elective';
            chip.appendChild(elecBadge);
        }

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'subject-chip-del';
        editBtn.textContent = 'Edit';
        editBtn.title = 'Rename / edit "' + subj + '"';
        editBtn.style.fontSize = '0.68rem';
        editBtn.style.padding = '2px 6px';
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            beginSubjectEdit(subj, sec);
        });
        chip.appendChild(editBtn);

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'subject-chip-del';
        delBtn.innerHTML = '&times;';
        delBtn.title = 'Delete "' + subj + '"';
        delBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteSubject(currentDept, activeYear, subj, sec);
            renderSubjectChips();
            refreshSubjectDropdowns();
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
            // Container is replaced by year-group WhatsApp buttons after fetch;
            // if this seed button is still visible, point HOD to those buttons.
            const status = document.getElementById('hodStatusMessage');
            if (status) {
                status.style.display = 'block';
                status.textContent = 'Fetch absentees first — then use the year/section WhatsApp buttons above the cards.';
            }
        });
    }
}

/** Add phone-only / pending rows into HOD data so WhatsApp is not missing them. */
function mergeLocalPendingIntoHODData(sheetData, stream, dateVal) {
    const targetDate = normalizeHistoryDate(dateVal);
    const sheetEntries = Array.isArray(sheetData && sheetData.entries) ? sheetData.entries.slice() : [];
    const byKey = new Map();

    sheetEntries.forEach(e => {
        const mapped = {
            date: normalizeHistoryDate(e.date) || targetDate,
            year: e.year || '',
            section: e.section || '',
            subject: e.subject || '',
            slot: parseInt(e.slot, 10) || 1,
            rollNumbers: e.rollNumbers == null || String(e.rollNumbers).trim() === ''
                ? 'NIL'
                : (Array.isArray(e.rollNumbers) ? e.rollNumbers.join(', ') : String(e.rollNumbers)),
            stream: stream
        };
        byKey.set(historyMatchKey(mapped), mapped);
    });

    let pendingLocalCount = 0;
    readAllHistory().forEach(item => {
        if ((item.stream || 'BCA') !== stream) return;
        if (normalizeHistoryDate(item.date) !== targetDate) return;
        const mapped = {
            date: targetDate,
            year: item.year || '',
            section: item.section || '',
            subject: item.subject || '',
            slot: parseInt(item.slot, 10) || 1,
            rollNumbers: Array.isArray(item.rollNumbers)
                ? item.rollNumbers.join(', ')
                : (item.rollNumbers == null || String(item.rollNumbers).trim() === '' ? 'NIL' : String(item.rollNumbers)),
            stream: stream
        };
        const k = historyMatchKey(mapped);
        if (!byKey.has(k)) {
            byKey.set(k, mapped);
            pendingLocalCount++;
        } else if (item.offline === true) {
            // Prefer latest phone rolls while sync is still pending
            byKey.set(k, mapped);
        }
    });

    return {
        ...sheetData,
        entries: Array.from(byKey.values()),
        pendingLocalCount: pendingLocalCount,
        count: byKey.size
    };
}

function fetchHODAbsentees() {
    const hodStreamSelect = document.getElementById('hodStreamSelect');
    const hodDatePicker = document.getElementById('hodDatePicker');
    const hodFetchBtnText = document.getElementById('hodFetchBtnText');
    const hodFetchSpinner = document.getElementById('hodFetchSpinner');
    const hodStatusMessage = document.getElementById('hodStatusMessage');
    const container = document.getElementById('hodSectionCardsContainer');
    const globalShareContainer = document.getElementById('hodGlobalShareContainer');

    const stream = 'BCA';
    const dateVal = hodDatePicker ? hodDatePicker.value : getTodayISOString();

    const activeLabel = 'BCA';

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
            const merged = mergeLocalPendingIntoHODData(data, stream, dateVal);
            currentHODData = merged;
            renderHODSectionCards(merged);
            if (merged.pendingLocalCount > 0) {
                if (hodStatusMessage) {
                    hodStatusMessage.style.display = 'flex';
                    hodStatusMessage.innerHTML =
                        '<span>⚠️ Sheet has ' + (data.entries || []).length +
                        ' row(s); phone has ' + merged.pendingLocalCount +
                        ' extra pending. Tap <strong>Sync</strong> in Today\'s list, then Fetch again.</span>';
                }
                if (navigator.onLine) setTimeout(() => { syncOfflineEntries(); }, 300);
            }
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
    appendAuthToParams(params);

    const scriptEl = document.createElement('script');
    scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
    scriptEl.onerror = function () {
        delete window[cbName];
        if (hodFetchBtnText) hodFetchBtnText.textContent = '🔄 Fetch ' + activeLabel + ' Absentees';
        if (hodFetchSpinner) hodFetchSpinner.style.display = 'none';

        const localHistory = JSON.parse(localStorage.getItem('mgm_attendance_history') || '[]');
        const filtered = localHistory.filter(item =>
            normalizeHistoryDate(item.date) === normalizeHistoryDate(dateVal) &&
            (item.stream || 'BCA') === stream
        );
        
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

/** Compact clock for WhatsApp lines, e.g. 9-9.55 */
const SLOT_TIME_SHORT_MAP = {
    1: '9-9.55',
    2: '10-10.55',
    3: '11.10-12.05',
    4: '12.10-1.05',
    5: '1.05-2.00',
    6: '2-2.55',
    7: '3-3.55',
    8: '4-4.55'
};

function getSlotTimeShortLabel(slotNum) {
    const s = parseInt(slotNum, 10) || 1;
    return SLOT_TIME_SHORT_MAP[s] || ('Slot ' + s);
}

/** Normalize year label → I / II / III (handles First/Second, 1st/2nd, I/II/III). */
function hodYearPrefix(yearVal) {
    const y = String(yearVal || '').trim().toUpperCase();
    if (!y) return 'I';
    if (/\bTHIRD\b|\b3RD\b|\bIII\b|(^|[^I])\b3\b/.test(y) || y === '3' || y.startsWith('III')) return 'III';
    if (/\bSECOND\b|\b2ND\b|\bII\b|(^|[^I])\b2\b/.test(y) || y === '2' || (y.startsWith('II') && !y.startsWith('III'))) return 'II';
    if (/\bFIRST\b|\b1ST\b|(^|[^I])\b1\b/.test(y) || y === '1' || y === 'I') return 'I';
    // Roman-only fallbacks (order matters: III before II)
    if (y.indexOf('III') !== -1) return 'III';
    if (y.indexOf('II') !== -1) return 'II';
    if (y === 'I' || y.indexOf('I ') === 0) return 'I';
    return 'I';
}

function hodYearCardPrefix(secTitle) {
    const t = String(secTitle || '');
    if (t.startsWith('III ') || t.startsWith('III-')) return 'III';
    if (t.startsWith('II ') || t.startsWith('II-')) return 'II';
    if (t.startsWith('I ') || t.startsWith('I-')) return 'I';
    return hodYearPrefix(t);
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
        const yrPrefix = hodYearPrefix(entry.year);
        const yearFullLabel = yrPrefix === 'I' ? '1st Year' : (yrPrefix === 'II' ? '2nd Year' : '3rd Year');

        let sectionTitle = `${yrPrefix} ${stream}`;
        if (hasSections && entry.section) {
            const secU = String(entry.section).trim().toUpperCase();
            if (secU === 'ALL' || secU.indexOf('COMBIN') !== -1) {
                sectionTitle += ` - Combined`;
            } else {
                sectionTitle += ` - Section ${entry.section}`;
            }
        }

        if (!groupedBySec[sectionTitle]) groupedBySec[sectionTitle] = [];
        groupedBySec[sectionTitle].push(entry);

        if (!groupedByYear[yearFullLabel]) groupedByYear[yearFullLabel] = [];
        groupedByYear[yearFullLabel].push(entry);
    });

    // Render Grouped WhatsApp buttons according to department section rules
    if (globalShareContainer) {
        globalShareContainer.innerHTML = buildGroupedWhatsAppButtons(stream, dateVal, entries);
        globalShareContainer.style.display = 'block';
    }

    // Sort entries by slot inside each section
    Object.keys(groupedBySec).forEach(secKey => {
        groupedBySec[secKey].sort((a, b) => (parseInt(a.slot, 10) || 1) - (parseInt(b.slot, 10) || 1));
    });

    let html = '';
    const sectionKeys = Object.keys(groupedBySec).sort((a, b) => {
        const ya = hodYearCardPrefix(a);
        const yb = hodYearCardPrefix(b);
        const order = { I: 1, II: 2, III: 3 };
        if (order[ya] !== order[yb]) return order[ya] - order[yb];
        return a.localeCompare(b);
    });

    // Render Year Filter Tabs if there are multiple sections
    const yearsPresent = [...new Set(Object.keys(groupedByYear))].sort((a, b) => {
        const order = { '1st Year': 1, '2nd Year': 2, '3rd Year': 3 };
        return (order[a] || 9) - (order[b] || 9);
    });
    if (yearsPresent.length > 0) {
        html += '<div class="year-filter-tabs">';
        html += `<button type="button" class="year-filter-tab ${currentHODYearFilter === 'ALL' ? 'active' : ''}" data-year-filter="ALL" onclick="filterHODSectionCards('ALL')">All Sections (${sectionKeys.length})</button>`;
        
        yearsPresent.forEach(yrLabel => {
            const yrCode = yrLabel.includes('1st') ? 'I' : (yrLabel.includes('2nd') ? 'II' : 'III');
            const count = Object.keys(groupedBySec).filter(k => hodYearCardPrefix(k) === yrCode).length;
            if (count > 0) {
                html += `<button type="button" class="year-filter-tab ${currentHODYearFilter === yrCode ? 'active' : ''}" data-year-filter="${yrCode}" onclick="filterHODSectionCards('${yrCode}')">${yrLabel} (${count})</button>`;
            }
        });
        html += '</div>';
    }

    sectionKeys.forEach((secTitle, index) => {
        const secEntries = groupedBySec[secTitle];
        const yrPrefix = hodYearCardPrefix(secTitle);
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

function buildGroupedWhatsAppButtons(stream, dateVal, entries) {
    let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
    const yrPrefixes = ['I', 'II', 'III'];

    yrPrefixes.forEach(yrCode => {
        const yrEntries = entries.filter(e => hodYearPrefix(e.year) === yrCode);

        if (yrEntries.length === 0) return;

        const yrLabel = yrCode === 'I' ? '1st Year' : (yrCode === 'II' ? '2nd Year' : '3rd Year');

        if (yrCode === 'I') {
            // 1st Year BCA: Sec A & B combined together, Sec C (AIML) separate
            const abEntries = yrEntries.filter(e => {
                const sec = String(e.section || '').toUpperCase();
                return sec === 'A' || sec === 'B' || sec === 'ALL' || sec === 'COMBINED' || sec.indexOf('COMBIN') !== -1;
            });
            // C (AIML) also gets Combined (ALL) language/elective rows — same as A&B
            const cEntries = yrEntries.filter(e => {
                const sec = String(e.section || '').toUpperCase();
                return sec === 'C' || sec.includes('AIML') || sec === 'ALL' || sec === 'COMBINED' || sec.indexOf('COMBIN') !== -1;
            });

            if (abEntries.length > 0) {
                const title = `1st Year BCA - Section A & B Combined`;
                const msg = buildCombinedGroupWhatsAppMessage(title, dateVal, abEntries);
                html += `<button type="button" class="btn-whatsapp-global" onclick="openWhatsAppShare('${encodeURIComponent(msg)}')">
                    📱 Share ${escapeHTML(title)} Report
                </button>`;
            }

            if (cEntries.length > 0) {
                const cTitle = `1st Year BCA - Section C (AIML)`;
                const msg = buildCombinedGroupWhatsAppMessage(cTitle, dateVal, cEntries);
                html += `<button type="button" class="btn-whatsapp-global" onclick="openWhatsAppShare('${encodeURIComponent(msg)}')">
                    📱 Share ${escapeHTML(cTitle)} Report
                </button>`;
            }
        } else {
            // 2nd & 3rd Year BCA: All Sections A, B & C combined together
            const title = `${yrLabel} BCA - Section A, B & C Combined`;
            const msg = buildCombinedGroupWhatsAppMessage(title, dateVal, yrEntries);
            html += `<button type="button" class="btn-whatsapp-global" onclick="openWhatsAppShare('${encodeURIComponent(msg)}')">
                📱 Share ${escapeHTML(title)} Report
            </button>`;
        }
    });

    html += '</div>';
    return html;
}

/** Compact WhatsApp date: 09-08-2026 */
function formatWhatsAppDateDDMMYYYY(dateStr) {
    if (!dateStr) return '';
    try {
        const parts = String(dateStr).trim().split(/[-/]/);
        if (parts.length === 3 && parts[0].length === 4) {
            // YYYY-MM-DD
            const dd = String(parts[2]).padStart(2, '0');
            const mm = String(parts[1]).padStart(2, '0');
            return dd + '-' + mm + '-' + parts[0];
        }
        if (parts.length === 3) {
            // DD-MM-YYYY or similar
            const dd = String(parts[0]).padStart(2, '0');
            const mm = String(parts[1]).padStart(2, '0');
            const yyyy = parts[2].length === 2 ? ('20' + parts[2]) : parts[2];
            return dd + '-' + mm + '-' + yyyy;
        }
    } catch (e) {}
    return String(dateStr);
}

function formatWhatsAppRolls(rollNumbers) {
    const raw = (rollNumbers == null || String(rollNumbers).trim() === '') ? 'NIL' : String(rollNumbers).trim();
    if (!raw || raw.toUpperCase() === 'NIL' || raw.toUpperCase() === 'NONE') {
        return '*NIL*';
    }
    // Keep one space after commas — readable for mixed codes like 24678, C0987
    const cleaned = raw.split(/[,;\s]+/).map(s => s.trim()).filter(Boolean).join(', ');
    return '*' + (cleaned || raw) + '*';
}

/** Include every submitted slot (NIL shown as *NIL*) so nothing is dropped from WA. */
function isWhatsAppSlotEntry(entry) {
    return !!(entry && (entry.subject || entry.slot || entry.rollNumbers != null));
}

/** Short line: `9-9.55` *Computer Networks*: *12, 25*
 *  Slot in monospace (WhatsApp highlights it) so every period stands out the same. */
function formatWhatsAppPeriodLine(entry, includeSecTag) {
    const slotNum = parseInt(entry.slot, 10) || 1;
    const timeLabel = '`' + getSlotTimeShortLabel(slotNum) + '`';
    const subject = String(entry.subject || 'Subject').trim();
    let secTag = '';
    if (includeSecTag && entry.section) {
        const secU = String(entry.section).trim().toUpperCase();
        if (secU === 'ALL' || secU.indexOf('COMBIN') !== -1) {
            secTag = ' *[Combined]*';
        } else {
            secTag = ' *[Sec ' + entry.section + ']*';
        }
    }
    return timeLabel + secTag + ' *' + subject + '*: ' + formatWhatsAppRolls(entry.rollNumbers);
}

function entriesSpanMultipleSections(entries) {
    const secs = new Set();
    (entries || []).forEach(e => {
        const s = String(e.section || '').trim().toUpperCase();
        if (s) secs.add(s);
    });
    return secs.size > 1;
}

function buildCombinedGroupWhatsAppMessage(groupTitle, dateStr, entries) {
    const formattedDate = formatWhatsAppDateDDMMYYYY(dateStr);
    let msg = '*MGM COLLEGE — ABSENTEE NOTICE*\n';
    msg += groupTitle + '\n';
    msg += formattedDate + '\n\n';

    const list = (entries || []).filter(isWhatsAppSlotEntry);
    list.sort((a, b) => {
        const slotDiff = (parseInt(a.slot, 10) || 1) - (parseInt(b.slot, 10) || 1);
        if (slotDiff !== 0) return slotDiff;
        const secA = String(a.section || '').toUpperCase();
        const secB = String(b.section || '').toUpperCase();
        if (secA !== secB) return secA.localeCompare(secB);
        return String(a.subject || '').localeCompare(String(b.subject || ''));
    });

    if (list.length === 0) {
        msg += 'No absentees recorded.\n';
        return msg.trim();
    }

    const showSec = entriesSpanMultipleSections(list);
    list.forEach((e, idx) => {
        if (idx > 0) msg += '\n';
        msg += formatWhatsAppPeriodLine(e, showSec) + '\n';
    });

    return msg.trim();
}

function buildSectionWhatsAppMessage(sectionTitle, dateStr, entries) {
    const formattedDate = formatWhatsAppDateDDMMYYYY(dateStr);
    let msg = '*MGM COLLEGE — ABSENTEE NOTICE*\n';
    msg += sectionTitle + '\n';
    msg += formattedDate + '\n\n';

    const list = (entries || []).filter(isWhatsAppSlotEntry);
    list.sort((a, b) => {
        const slotDiff = (parseInt(a.slot, 10) || 1) - (parseInt(b.slot, 10) || 1);
        if (slotDiff !== 0) return slotDiff;
        return String(a.subject || '').localeCompare(String(b.subject || ''));
    });

    if (list.length === 0) {
        msg += 'No absentees recorded.\n';
        return msg.trim();
    }

    list.forEach((e, idx) => {
        if (idx > 0) msg += '\n';
        msg += formatWhatsAppPeriodLine(e, false) + '\n';
    });

    return msg.trim();
}

function buildYearWhatsAppMessage(yearLabel, stream, dateStr, entries) {
    const formattedDate = formatWhatsAppDateDDMMYYYY(dateStr);
    const yrPrefix = hodYearPrefix(yearLabel);

    let msg = '*MGM COLLEGE — ABSENTEE NOTICE*\n';
    msg += yrPrefix + ' ' + stream + '\n';
    msg += formattedDate + '\n\n';

    const groupedBySec = {};
    (entries || []).filter(isWhatsAppSlotEntry).forEach(e => {
        const sec = e.section || 'A';
        const secU = String(sec).toUpperCase();
        const key = (secU === 'ALL' || secU.indexOf('COMBIN') !== -1) ? 'Combined' : ('Sec ' + sec);
        if (!groupedBySec[key]) groupedBySec[key] = [];
        groupedBySec[key].push(e);
    });

    const secKeys = Object.keys(groupedBySec).sort();
    if (secKeys.length === 0) {
        msg += 'No absentees recorded.\n';
        return msg.trim();
    }

    secKeys.forEach(secKey => {
        msg += '*' + yrPrefix + ' ' + stream + ' — ' + secKey + '*\n';
        const secEntries = groupedBySec[secKey];
        secEntries.sort((a, b) => (parseInt(a.slot, 10) || 1) - (parseInt(b.slot, 10) || 1));
        secEntries.forEach((e, idx) => {
            if (idx > 0) msg += '\n';
            msg += formatWhatsAppPeriodLine(e, false) + '\n';
        });
        msg += '\n';
    });

    return msg.trim();
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
    const passADMIN = document.getElementById('passADMIN');

    const titleEl = document.getElementById('passcodeModalTitle');
    const subtitleEl = document.getElementById('passcodeModalSubtitle');

    const openPasscodeModal = (e) => {
        if (e) e.preventDefault();
        const store = getPasscodeStore();

        if (passTeacher_BCA) passTeacher_BCA.value = store.teacher.BCA;
        if (passHOD_BCA) passHOD_BCA.value = store.hod.BCA;
        if (passADMIN) passADMIN.value = store.ADMIN;

        const groupBCA = document.getElementById('group_BCA');
        const groupADMIN = document.getElementById('groupADMIN');

        if (groupBCA) groupBCA.style.display = 'block';

        if (currentRole === 'ADMIN') {
            if (titleEl) titleEl.textContent = 'Manage BCA & Admin Passcodes';
            if (subtitleEl) subtitleEl.textContent = 'Super Admin mode: Update BCA Teacher & HOD passcodes or the Master Admin passcode.';
            if (groupADMIN) groupADMIN.style.display = 'block';
        } else {
            if (titleEl) titleEl.textContent = 'Change BCA Passcodes';
            if (subtitleEl) subtitleEl.textContent = 'Update Teacher & HOD passcodes for BCA department.';
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
                teacherBCA: passTeacher_BCA ? passTeacher_BCA.value.trim() : store.teacher.BCA,
                hodBCA: passHOD_BCA ? passHOD_BCA.value.trim() : store.hod.BCA,
                ADMIN: currentRole === 'ADMIN' ? (passADMIN ? passADMIN.value.trim() : store.ADMIN) : store.ADMIN
            };
            savePasscodeStore(updatedCustom);

            // Push to Apps Script Script Properties (ADMIN required on server)
            (function syncPasscodesToServer(storeObj) {
                const targetUrl = getWebhookUrl('BCA');
                const payload = withAuth(Object.assign({ action: 'set_passcodes' }, storeObj));
                submitViaHiddenForm(targetUrl, payload).catch(function () {});
                const cbName = 'mgmPassSync_' + Date.now();
                window[cbName] = function (data) {
                    try { delete window[cbName]; } catch (err) {}
                    if (data && data.result === 'success') {
                        showCustomToast('Passcodes saved', 'Updated on this device and Google Sheet server.');
                    }
                };
                const params = new URLSearchParams(Object.assign({
                    action: 'set_passcodes',
                    callback: cbName
                }, storeObj));
                appendAuthToParams(params);
                const scriptEl = document.createElement('script');
                scriptEl.src = targetUrl + (targetUrl.indexOf('?') >= 0 ? '&' : '?') + params.toString();
                document.body.appendChild(scriptEl);
            })(updatedCustom);

            if (modal) modal.classList.remove('active');
            if (currentRole !== 'ADMIN') {
                alert('Passcodes updated on this device. Super Admin should save once so Google Sheet server passcodes stay in sync.');
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Reset Teacher & HOD passcodes to defaults?')) {
                localStorage.removeItem('mgm_custom_passcodes');
                const store = getPasscodeStore();
                if (passTeacher_BCA) passTeacher_BCA.value = store.teacher.BCA;
                if (passHOD_BCA) passHOD_BCA.value = store.hod.BCA;
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


