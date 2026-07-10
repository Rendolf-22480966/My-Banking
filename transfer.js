// ==========================================
// FIRST CHOICE CREDIT UNION — TRANSFER CENTER UI
// ==========================================

const TC_STEPS = ["form", "review", "otp", "success"];
const LOADER_MS = 5000;

let tcState = {
    mode: "existing",
    selectedBank: null,
    verified: null,
    selectedBeneficiary: null,
    draft: null,
    receipt: null,
    otpSeconds: 60,
    otpTimerId: null
};

document.addEventListener("DOMContentLoaded", () => {
    applyBranding();
    const session = requireMemberSession();
    if (!session) return;

    runPremiumLoader("Please wait", "Opening secure Transfer Center…", LOADER_MS, () => {
        renderFromAccount();
        renderBeneficiaries();
        renderPopularBanks();
        renderBankDirectory("");
        setupOtpInputs();
        setRecipientMode("existing");
        renderSteps("form");
        showStep("form");
    });
});

function runPremiumLoader(title, subtitle, durationMs, onDone) {
    const loader = document.getElementById("premiumLoader");
    const bar = document.getElementById("loaderBarFill");
    const msg = document.getElementById("loaderMsg");
    const sub = document.getElementById("loaderSub");
    if (!loader) { onDone && onDone(); return; }

    loader.classList.remove("hide");
    msg.textContent = title || "Please wait";
    sub.textContent = subtitle || "Secure banking session in progress…";
    bar.style.width = "0%";

    const start = performance.now();
    let raf;
    const tick = (now) => {
        const p = Math.min(1, (now - start) / durationMs);
        bar.style.width = Math.round(p * 100) + "%";
        if (p < 1) raf = requestAnimationFrame(tick);
        else {
            loader.classList.add("hide");
            if (onDone) onDone();
        }
    };
    raf = requestAnimationFrame(tick);
}

function renderSteps(active) {
    const el = document.getElementById("tcSteps");
    const labels = ["Details", "Review", "OTP", "Done"];
    const idx = TC_STEPS.indexOf(active);
    el.innerHTML = labels.map((label, i) => {
        const cls = i < idx ? "done" : i === idx ? "active" : "";
        return `<span class="tc-step-dot ${cls}" title="${label}"></span>`;
    }).join("");
}

function showStep(name) {
    document.getElementById("stepForm").classList.toggle("tc-hidden", name !== "form");
    document.getElementById("stepReview").classList.toggle("tc-hidden", name !== "review");
    document.getElementById("stepOtp").classList.toggle("tc-hidden", name !== "otp");
    document.getElementById("stepSuccess").classList.toggle("tc-hidden", name !== "success");
    renderSteps(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderFromAccount() {
    const data = getAccountData();
    document.getElementById("fromAccountCard").innerHTML = `
        <p class="label">From</p>
        <p class="bank">First Choice Credit Union</p>
        <p class="acct">Premier Individual Checking · ${maskAccount(data.accountNumber)}</p>
        <p class="label" style="margin-top:12px">Available Balance</p>
        <p class="bal">${formatCurrency(data.availableBalance)}</p>`;
}

function setRecipientMode(mode) {
    tcState.mode = mode;
    tcState.selectedBeneficiary = null;
    document.getElementById("modeExisting").classList.toggle("active", mode === "existing");
    document.getElementById("modeNew").classList.toggle("active", mode === "new");
    document.getElementById("existingPanel").classList.toggle("tc-hidden", mode !== "existing");
    document.getElementById("newPanel").classList.toggle("tc-hidden", mode !== "new");
    document.getElementById("saveBeneWrap").classList.toggle("tc-hidden", mode === "existing");
    document.querySelectorAll(".beneficiary-item").forEach(el => el.classList.remove("selected"));
}

function renderBeneficiaries() {
    const list = getBeneficiaries();
    const box = document.getElementById("beneficiaryList");
    const empty = document.getElementById("noBeneficiaries");
    if (!list.length) {
        box.innerHTML = "";
        empty.classList.remove("hidden");
        return;
    }
    empty.classList.add("hidden");
    box.innerHTML = list.map(b => {
        const bank = getBankById(b.bankId) || { name: b.bankName, color: "#3D4F5F" };
        return `
            <button type="button" class="beneficiary-item" data-id="${b.id}" onclick="selectBeneficiary(${b.id})">
                ${bankLogoHTML(bank, 40)}
                <div class="min-w-0 flex-grow text-left">
                    <p class="font-semibold text-sm text-slate-800 truncate">${b.name}</p>
                    <p class="meta truncate">${b.bankName} · ${b.accountMasked}</p>
                </div>
            </button>`;
    }).join("");
}

function selectBeneficiary(id) {
    const b = getBeneficiaries().find(x => x.id === id);
    if (!b) return;
    tcState.selectedBeneficiary = b;
    tcState.selectedBank = getBankById(b.bankId) || {
        id: b.bankId, name: b.bankName, routing: b.routing, color: "#3D4F5F"
    };
    tcState.verified = {
        success: true,
        holderName: b.name,
        recipientAddress: b.address || "",
        accountType: b.accountType,
        accountMasked: b.accountMasked,
        bankName: b.bankName,
        routing: b.routing,
        bankId: b.bankId,
        accountNumber: b.accountNumber
    };
    document.querySelectorAll(".beneficiary-item").forEach(el => {
        el.classList.toggle("selected", String(el.dataset.id) === String(id));
    });
}

function renderPopularBanks() {
    const box = document.getElementById("popularBanks");
    box.innerHTML = getPopularBanks().map(b => `
        <button type="button" class="bank-row" onclick="selectBank('${b.id}')">
            ${bankLogoHTML(b, 36)}
            <div><p class="name">${b.name}</p></div>
        </button>`).join("");
}

function onBankSearch() {
    renderBankDirectory(document.getElementById("bankSearch").value);
}

function renderBankDirectory(query) {
    const banks = searchBanks(query);
    const groups = groupBanksByLetter(banks);
    const box = document.getElementById("bankDirectory");
    if (!banks.length) {
        box.innerHTML = '<p class="text-xs text-slate-400 p-3 text-center">No banks match your search</p>';
        return;
    }
    box.innerHTML = groups.map(g => `
        <div class="bank-letter">${g.letter}</div>
        ${g.banks.map(b => `
            <button type="button" class="bank-row ${tcState.selectedBank && tcState.selectedBank.id === b.id ? 'selected' : ''}" onclick="selectBank('${b.id}')">
                ${bankLogoHTML(b, 34)}
                <div>
                    <p class="name">${b.name}</p>
                    <p class="routing">Routing ${b.routing}</p>
                </div>
            </button>`).join("")}
    `).join("");
}

function selectBank(id) {
    const bank = getBankById(id);
    if (!bank) return;
    tcState.selectedBank = bank;
    tcState.verified = null;
    document.getElementById("verifyResult").innerHTML = "";
    const box = document.getElementById("selectedBankBox");
    box.classList.remove("tc-hidden");
    box.innerHTML = `
        ${bankLogoHTML(bank, 44)}
        <div>
            <p class="text-[10px] uppercase tracking-wider text-sky-700 font-bold">Selected Bank</p>
            <p class="font-bold text-slate-800">${bank.name}</p>
            <p class="text-[11px] text-slate-500 font-mono">Routing ${bank.routing}</p>
        </div>`;
    renderBankDirectory(document.getElementById("bankSearch").value);
    renderPopularBanks();
    onAccountNumberInput();
}

function onAccountNumberInput() {
    clearVerify();
    const acct = document.getElementById("acctNumber").value.trim();
    const panel = document.getElementById("recipientDetailsPanel");
    if (acct.length >= 4) panel.classList.remove("tc-hidden");
    else panel.classList.add("tc-hidden");
}

function clearVerify() {
    tcState.verified = null;
    const box = document.getElementById("verifyResult");
    if (box) box.innerHTML = "";
}

function runVerify() {
    const acct = document.getElementById("acctNumber").value.trim();
    const name = document.getElementById("recipientNameInput").value.trim();
    const address = document.getElementById("recipientAddressInput").value.trim();
    const box = document.getElementById("verifyResult");

    if (!tcState.selectedBank) {
        box.innerHTML = `<div class="verify-fail">Select a destination bank first.</div>`;
        return;
    }
    if (acct.length < 6 || acct.length > 17 || !/^\d+$/.test(acct)) {
        box.innerHTML = `<div class="verify-fail">Enter a valid account number (6–17 digits).</div>`;
        return;
    }
    if (!name || name.length < 3) {
        box.innerHTML = `<div class="verify-fail">Enter the recipient’s full name.</div>`;
        return;
    }
    if (!address || address.length < 5) {
        box.innerHTML = `<div class="verify-fail">Enter the recipient’s address.</div>`;
        return;
    }

    tcState.verified = {
        success: true,
        holderName: name,
        recipientAddress: address,
        accountType: "Checking Account",
        accountMasked: "****" + acct.slice(-4),
        bankName: tcState.selectedBank.name,
        routing: tcState.selectedBank.routing,
        bankId: tcState.selectedBank.id,
        accountNumber: acct
    };

    box.innerHTML = `
        <div class="verify-ok">
            <p class="check"><span class="check-icon">✓</span> Account verified</p>
            <p class="font-bold text-slate-800 mt-2">${name}</p>
            <p class="text-xs text-slate-500 mt-1">${address}</p>
            <p class="text-xs text-slate-500 mt-1">${tcState.selectedBank.name} · ****${acct.slice(-4)}</p>
        </div>`;
}

function resolveRecipient() {
    if (tcState.mode === "existing") {
        if (!tcState.selectedBeneficiary || !tcState.verified) {
            return { ok: false, message: "Select a beneficiary." };
        }
        return {
            ok: true,
            recipientName: tcState.verified.holderName,
            recipientAddress: tcState.verified.recipientAddress || tcState.selectedBeneficiary.address || "",
            bankId: tcState.verified.bankId,
            bankName: tcState.verified.bankName,
            routing: tcState.verified.routing,
            accountNumber: tcState.verified.accountNumber || tcState.selectedBeneficiary.accountNumber,
            accountMasked: tcState.verified.accountMasked,
            accountType: tcState.verified.accountType,
            saveBeneficiary: false
        };
    }
    if (!tcState.selectedBank) return { ok: false, message: "Select a destination bank." };
    if (!tcState.verified) return { ok: false, message: "Verify the recipient details first." };
    return {
        ok: true,
        recipientName: tcState.verified.holderName,
        recipientAddress: tcState.verified.recipientAddress,
        bankId: tcState.selectedBank.id,
        bankName: tcState.selectedBank.name,
        routing: tcState.selectedBank.routing,
        accountNumber: tcState.verified.accountNumber,
        accountMasked: tcState.verified.accountMasked,
        accountType: tcState.verified.accountType,
        saveBeneficiary: document.getElementById("saveBeneficiary").checked
    };
}

function goToReview() {
    const amount = parseFloat(document.getElementById("txAmount").value);
    const description = document.getElementById("txDesc").value.trim();
    const data = getAccountData();
    const recip = resolveRecipient();

    if (!recip.ok) return showToast(recip.message, "error");
    if (!amount || amount <= 0) return showToast("Enter a valid amount.", "error");
    if (!recip.recipientAddress) return showToast("Recipient address is required.", "error");

    const fee = Math.round(amount * 0.005 * 100) / 100;
    const total = Math.round((amount + fee) * 100) / 100;
    if (total > data.availableBalance) {
        return showToast("Insufficient available balance (amount + 0.5% fee).", "error");
    }

    const reference = generateTransferRef();
    tcState.draft = { ...recip, amount, fee, total, description, reference };

    runNetworkLoader(() => {
        document.getElementById("reviewBody").innerHTML = `
            <div class="tc-review-row"><div><label>From</label><div class="val">First Choice Credit Union<br><span class="text-xs font-normal text-slate-500">Premier Individual Checking</span></div></div></div>
            <div class="tc-review-row"><div><label>To</label><div class="val">${recip.recipientName}<br><span class="text-xs font-normal text-slate-500">${recip.bankName} · ${recip.accountMasked}</span></div></div></div>
            <div class="tc-review-row"><div><label>Address</label><div class="val text-sm">${recip.recipientAddress}</div></div></div>
            <div class="tc-review-row"><div><label>Amount</label><div class="val tc-total">${formatCurrency(amount)}</div></div></div>
            <div class="tc-review-row"><div><label>Transfer Fee (0.5%)</label><div class="val">${formatCurrency(fee)}</div></div></div>
            <div class="tc-review-row"><div><label>Reference</label><div class="val font-mono text-sm">${reference}</div></div></div>
            <div class="tc-review-row"><div><label>Description</label><div class="val">${description || "—"}</div></div></div>
            <div class="tc-review-row border-0"><div><label>Total Debit</label><div class="val tc-total">${formatCurrency(total)}</div></div></div>`;
        showStep("review");
    });
}

function runNetworkLoader(onDone) {
    const loader = document.getElementById("premiumLoader");
    const bar = document.getElementById("loaderBarFill");
    const msg = document.getElementById("loaderMsg");
    const sub = document.getElementById("loaderSub");
    const inner = loader.querySelector(".premium-loader-inner");

    const stages = [
        "Establishing secure network link with receiving bank…",
        "Negotiating routing path across the payment network…",
        "Locating destination account access…",
        "Confirming bank-to-bank relationship…",
        "Account channel verified — preparing review…"
    ];

    loader.classList.remove("hide");
    msg.textContent = "Please wait";
    if (bar) bar.style.width = "0%";

    // Switch to circular network visual
    let ring = document.getElementById("networkRing");
    if (!ring) {
        ring = document.createElement("div");
        ring.id = "networkRing";
        ring.className = "network-ring-wrap";
        ring.innerHTML = `
            <div class="network-ring">
                <div class="network-ring-core"></div>
                <div class="network-orbit"></div>
                <div class="network-orbit delay"></div>
            </div>
            <p class="network-nodes"><span>FCCU</span><span class="dot"></span><span>NETWORK</span><span class="dot"></span><span id="netBankLabel">BANK</span></p>`;
        const logo = inner.querySelector(".premium-loader-logo");
        if (logo) logo.style.display = "none";
        inner.insertBefore(ring, msg);
    } else {
        ring.classList.remove("tc-hidden");
        const logo = inner.querySelector(".premium-loader-logo");
        if (logo) logo.style.display = "none";
    }

    const bankLabel = document.getElementById("netBankLabel");
    if (bankLabel && tcState.selectedBank) {
        bankLabel.textContent = (tcState.selectedBank.name || "BANK").split(" ")[0].toUpperCase();
    } else if (bankLabel && tcState.draft && tcState.draft.bankName) {
        bankLabel.textContent = tcState.draft.bankName.split(" ")[0].toUpperCase();
    }

    let stage = 0;
    sub.textContent = stages[0];
    const stageTimer = setInterval(() => {
        stage = Math.min(stage + 1, stages.length - 1);
        sub.textContent = stages[stage];
    }, 1000);

    const start = performance.now();
    const tick = (now) => {
        const p = Math.min(1, (now - start) / LOADER_MS);
        if (bar) bar.style.width = Math.round(p * 100) + "%";
        if (p < 1) requestAnimationFrame(tick);
        else {
            clearInterval(stageTimer);
            // restore default loader look for later steps
            const logo = inner.querySelector(".premium-loader-logo");
            if (logo) logo.style.display = "";
            if (ring) ring.classList.add("tc-hidden");
            loader.classList.add("hide");
            if (onDone) onDone();
        }
    };
    requestAnimationFrame(tick);
}

function goToOtp() {
    runPremiumLoader("Please wait", "Sending secure verification code…", LOADER_MS, () => {
        const session = getActiveSession();
        const phone = session.phone || "(302) 555-0198";
        const masked = phone.replace(/\d(?=\d{4})/g, "•");
        document.getElementById("otpHint").innerHTML =
            `A 6-digit code was sent by SMS to <strong>${masked}</strong>.`;
        document.getElementById("otpError").textContent = "";
        clearOtpInputs();
        startOtpTimer();
        showStep("otp");
        document.querySelector("#otpBoxes input").focus();
    });
}

function setupOtpInputs() {
    const inputs = [...document.querySelectorAll("#otpBoxes input")];
    inputs.forEach((input, i) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g, "").slice(0, 1);
            if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
        });
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && i > 0) inputs[i - 1].focus();
        });
        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
            text.split("").forEach((ch, idx) => { if (inputs[idx]) inputs[idx].value = ch; });
            if (text.length) inputs[Math.min(text.length, 5)].focus();
        });
    });
}

function clearOtpInputs() {
    document.querySelectorAll("#otpBoxes input").forEach(i => { i.value = ""; });
}

function getOtpValue() {
    return [...document.querySelectorAll("#otpBoxes input")].map(i => i.value).join("");
}

function startOtpTimer() {
    if (tcState.otpTimerId) clearInterval(tcState.otpTimerId);
    tcState.otpSeconds = 60;
    const tick = () => {
        document.getElementById("otpTimer").textContent =
            tcState.otpSeconds > 0 ? `Resend in ${tcState.otpSeconds}s` : "You can resend now";
        if (tcState.otpSeconds <= 0) {
            clearInterval(tcState.otpTimerId);
            tcState.otpTimerId = null;
            return;
        }
        tcState.otpSeconds -= 1;
    };
    tick();
    tcState.otpTimerId = setInterval(tick, 1000);
}

function resendOtp() {
    if (tcState.otpSeconds > 0) {
        showToast("Please wait before requesting another code.", "info");
        return;
    }
    showToast("A new verification code was sent to your phone.", "success");
    startOtpTimer();
    clearOtpInputs();
    document.querySelector("#otpBoxes input").focus();
}

function submitOtp() {
    const code = getOtpValue();
    if (code.length !== 6) {
        document.getElementById("otpError").textContent = "Enter the full 6-digit code.";
        return;
    }
    const otpResult = verifyTransferOtp(code);
    if (!otpResult.success) {
        document.getElementById("otpError").textContent = otpResult.message;
        clearOtpInputs();
        document.querySelector("#otpBoxes input").focus();
        return;
    }

    runPremiumLoader("Please wait", "Authorizing your transfer…", LOADER_MS, () => {
        const session = getActiveSession();
        const d = tcState.draft;
        const result = submitTransferCenter({
            amount: d.amount,
            fee: d.fee,
            recipientName: d.recipientName,
            recipientAddress: d.recipientAddress,
            bankId: d.bankId,
            bankName: d.bankName,
            routing: d.routing,
            accountNumber: d.accountNumber,
            accountMasked: d.accountMasked,
            accountType: d.accountType,
            description: d.description,
            reference: d.reference,
            saveBeneficiary: d.saveBeneficiary
        }, session);

        if (!result.success) {
            document.getElementById("otpError").textContent = result.message;
            showStep("otp");
            return;
        }

        tcState.receipt = result.receipt;
        renderSuccess(result);
        showStep("success");
    });
}

function renderSuccess(result) {
    const r = result.receipt;
    document.getElementById("successSub").textContent =
        "Your transfer is processing. It will move to pending review in 10 minutes.";
    const pill = document.getElementById("successPill");
    pill.textContent = "Processing";
    pill.className = "tc-status-pill pending";

    document.getElementById("successBody").innerHTML = `
        <div class="tc-review-row"><div><label>Reference Number</label><div class="val font-mono">${r.confirmationId}</div></div></div>
        <div class="tc-review-row"><div><label>Recipient</label><div class="val">${r.recipientName}</div></div></div>
        <div class="tc-review-row"><div><label>Address</label><div class="val text-sm">${r.recipientAddress || "—"}</div></div></div>
        <div class="tc-review-row"><div><label>Bank</label><div class="val">${r.recipientBank}</div></div></div>
        <div class="tc-review-row"><div><label>Amount</label><div class="val tc-total">${formatCurrency(Math.abs(r.amount))}</div></div></div>
        <div class="tc-review-row"><div><label>Transfer Fee (0.5%)</label><div class="val">${formatCurrency(r.fee || 0)}</div></div></div>
        <div class="tc-review-row"><div><label>Total Debit</label><div class="val tc-total">${formatCurrency(Math.abs(r.amount) + (r.fee || 0))}</div></div></div>
        <div class="tc-review-row"><div><label>Date</label><div class="val">${r.date} · ${r.time}</div></div></div>
        <div class="tc-review-row border-0"><div><label>Status</label><div class="val">${r.statusDetail}</div></div></div>
        <p class="text-xs text-slate-500 mt-3 text-center">Funds stay in your account until an administrator approves this transfer after processing completes.</p>`;
}

function downloadReceipt() {
    if (!tcState.receipt) return;
    openTransferReceipt(tcState.receipt);
}

async function shareReceipt() {
    if (!tcState.receipt) return;
    const r = tcState.receipt;
    const text = `First Choice Credit Union Transfer\nRef: ${r.confirmationId}\nTo: ${r.recipientName} (${r.recipientBank})\nAmount: ${formatCurrency(Math.abs(r.amount))}\nStatus: ${r.status}\nDate: ${r.date} ${r.time}`;
    if (navigator.share) {
        try {
            await navigator.share({ title: "Transfer Receipt", text });
            return;
        } catch (_) { /* fall through */ }
    }
    try {
        await navigator.clipboard.writeText(text);
        showToast("Receipt details copied to clipboard.", "success");
    } catch (_) {
        showToast("Unable to share. Use Download Receipt instead.", "info");
    }
}

function startNewTransfer() {
    tcState.draft = null;
    tcState.receipt = null;
    tcState.verified = null;
    tcState.selectedBank = null;
    tcState.selectedBeneficiary = null;
    document.getElementById("txAmount").value = "";
    document.getElementById("txDesc").value = "";
    document.getElementById("acctNumber").value = "";
    document.getElementById("recipientNameInput").value = "";
    document.getElementById("recipientAddressInput").value = "";
    document.getElementById("verifyResult").innerHTML = "";
    document.getElementById("recipientDetailsPanel").classList.add("tc-hidden");
    document.getElementById("selectedBankBox").classList.add("tc-hidden");
    document.getElementById("bankSearch").value = "";
    renderFromAccount();
    renderBeneficiaries();
    renderPopularBanks();
    renderBankDirectory("");
    setRecipientMode("existing");
    showStep("form");
}
