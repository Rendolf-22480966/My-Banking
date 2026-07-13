// ==========================================
// ACCOUNT OPENING WIZARD
// ==========================================

const SU_STEPS = [
    {
        title: "What brings you to First Choice?",
        sub: "Tell us how you plan to use your account.",
        fields: [
            { id: "purpose", label: "Primary purpose", type: "select", options: [
                "Personal banking",
                "Business / LLC banking",
                "Savings & future goals",
                "Home or auto financing research"
            ]},
            { id: "howHeard", label: "How did you hear about us?", type: "select", options: [
                "Online search",
                "Referral from a member",
                "Branch visit",
                "Advertisement"
            ]}
        ]
    },
    {
        title: "About you",
        sub: "Enter your legal name exactly as it appears on your government ID.",
        fields: [
            { id: "firstName", label: "Legal first name", type: "text", required: true },
            { id: "lastName", label: "Legal last name", type: "text", required: true },
            { id: "dob", label: "Date of birth", type: "date", required: true },
            { id: "ssnLast4", label: "Social Security number (last 4)", type: "text", required: true, maxlength: 4, pattern: "\\d{4}" },
            { id: "phone", label: "Mobile phone", type: "tel", required: true },
            { id: "email", label: "Email address", type: "email", required: true }
        ]
    },
    {
        title: "Residential address",
        sub: "We use this to verify membership eligibility and for account statements.",
        fields: [
            { id: "street", label: "Street address", type: "text", required: true },
            { id: "city", label: "City", type: "text", required: true },
            { id: "state", label: "State", type: "text", required: true, maxlength: 2 },
            { id: "zip", label: "ZIP code", type: "text", required: true, maxlength: 10 }
        ]
    },
    {
        title: "Employment & income",
        sub: "Financial institutions are required to collect this information.",
        fields: [
            { id: "employment", label: "Employment status", type: "select", options: [
                "Employed",
                "Self-employed / Business owner",
                "Retired",
                "Student",
                "Other"
            ]},
            { id: "employer", label: "Employer / Business name", type: "text", required: true },
            { id: "occupation", label: "Occupation", type: "text", required: true },
            { id: "annualIncome", label: "Estimated annual income", type: "select", options: [
                "Under $50,000",
                "$50,000 – $99,999",
                "$100,000 – $249,999",
                "$250,000 – $499,999",
                "$500,000+"
            ]}
        ]
    },
    {
        title: "Choose your account",
        sub: "Select the product that best fits your needs. You can add more accounts later.",
        fields: [
            { id: "accountType", label: "Account type", type: "select", options: [
                "Business Advantage Checking",
                "Premier Individual Checking",
                "High-Yield Savings",
                "Business Money Market"
            ]},
            { id: "ownership", label: "Ownership", type: "select", options: [
                "Individual",
                "Joint",
                "Business / LLC"
            ]},
            { id: "businessName", label: "Business legal name (if applicable)", type: "text", required: false }
        ]
    },
    {
        title: "Create your online access",
        sub: "Choose a username and password for secure online banking.",
        fields: [
            { id: "username", label: "Username", type: "text", required: true },
            { id: "password", label: "Password", type: "password", required: true },
            { id: "password2", label: "Confirm password", type: "password", required: true },
            { id: "agree", label: "I agree to the Membership Agreement, Electronic Disclosures, and Privacy Policy.", type: "checkbox", required: true }
        ]
    }
];

let suStep = 0;
const suData = {};

document.addEventListener("DOMContentLoaded", () => {
    if (typeof applyBranding === "function") applyBranding();
    renderStep();
});

function renderStep() {
    const step = SU_STEPS[suStep];
    document.getElementById("suTitle").textContent = step.title;
    document.getElementById("suSub").textContent = step.sub;
    document.getElementById("suError").textContent = "";

    const prog = document.getElementById("suProgress");
    prog.innerHTML = SU_STEPS.map((_, i) => `<span class="${i <= suStep ? "on" : ""}"></span>`).join("");

    const body = document.getElementById("suBody");
    body.innerHTML = step.fields.map(f => {
        const val = suData[f.id] || "";
        if (f.type === "select") {
            return `<div class="su-field"><label for="${f.id}">${f.label}</label>
                <select id="${f.id}">${f.options.map(o => `<option ${val === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>`;
        }
        if (f.type === "checkbox") {
            return `<label class="su-field" style="display:flex;gap:10px;align-items:flex-start;text-transform:none;font-size:0.9rem;font-weight:500;color:#334155">
                <input id="${f.id}" type="checkbox" ${val ? "checked" : ""} style="margin-top:3px;width:auto">
                <span>${f.label}</span></label>`;
        }
        return `<div class="su-field"><label for="${f.id}">${f.label}</label>
            <input id="${f.id}" type="${f.type}" value="${String(val).replace(/"/g, "&quot;")}"
                ${f.required ? "required" : ""} ${f.maxlength ? `maxlength="${f.maxlength}"` : ""}
                ${f.pattern ? `pattern="${f.pattern}"` : ""}></div>`;
    }).join("");

    const actions = document.getElementById("suActions");
    const isLast = suStep === SU_STEPS.length - 1;
    actions.innerHTML = `
        ${suStep > 0 ? `<button type="button" class="pub-btn-muted" onclick="suBack()">Back</button>` : `<a class="pub-btn-muted" href="index.html" style="text-decoration:none;display:inline-block">Cancel</a>`}
        <button type="button" class="pub-btn-blue" onclick="suNext()">${isLast ? "Continue to verification" : "Continue"}</button>`;
}

function collectStep() {
    const step = SU_STEPS[suStep];
    for (const f of step.fields) {
        const el = document.getElementById(f.id);
        if (!el) continue;
        if (f.type === "checkbox") {
            if (f.required && !el.checked) return "Please accept the membership agreements to continue.";
            suData[f.id] = el.checked;
        } else {
            const v = el.value.trim();
            if (f.required !== false && f.type !== "select" && !v && f.id !== "businessName") {
                if (f.required || ["firstName","lastName","dob","ssnLast4","phone","email","street","city","state","zip","employer","occupation","username","password","password2"].includes(f.id)) {
                    return "Please complete all required fields.";
                }
            }
            suData[f.id] = f.type === "select" ? el.value : v;
        }
    }
    if (suData.ssnLast4 && !/^\d{4}$/.test(suData.ssnLast4)) return "Enter the last 4 digits of your Social Security number.";
    if (suData.password && suData.password2 && suData.password !== suData.password2) return "Passwords do not match.";
    if (suData.password && suData.password.length < 8) return "Password must be at least 8 characters.";
    return null;
}

function suBack() {
    if (suStep > 0) {
        suStep -= 1;
        renderStep();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function suNext() {
    const err = collectStep();
    if (err) {
        document.getElementById("suError").textContent = err;
        return;
    }
    if (suStep < SU_STEPS.length - 1) {
        suStep += 1;
        renderStep();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }
    // Save application + pending credentials for post-verify login setup
    localStorage.setItem(STORAGE_PREFIX + "signup_application", JSON.stringify({
        ...suData,
        submittedAt: new Date().toISOString(),
        status: "Submitted — Pending Review"
    }));
    sessionStorage.setItem(STORAGE_PREFIX + "pending_verify_next", "signup-complete");
    sessionStorage.setItem(STORAGE_PREFIX + "human_verified", "0");
    window.location.href = "verify.html";
}
