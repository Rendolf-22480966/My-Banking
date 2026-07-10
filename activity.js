// ==========================================
// ACTIVITY FEED — Processing / Pending / History
// ==========================================

let historyNewestFirst = true;
let historyFilter = "all"; // all | transfer | pay | bills

document.addEventListener("DOMContentLoaded", () => {
    applyBranding();
    const session = requireMemberSession();
    if (!session) return;
    renderActivity();
    setInterval(renderActivity, 10000);
});

function initialsFromName(name) {
    const parts = String(name || "NA").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "NA";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatActDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatActDateShort(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function moneyAbs(amount) {
    return formatCurrency(Math.abs(amount || 0));
}

function recipientLabel(tx) {
    const meta = tx.meta || {};
    return meta.recipientName || meta.payeeName || tx.desc || "Transfer";
}

function memoLabel(tx) {
    const meta = tx.meta || {};
    if (meta.description) return meta.description;
    if (meta.memo) return meta.memo;
    if (meta.bankName) return meta.bankName;
    if (tx.queueStatus === "Processing") {
        const remain = getProcessingRemainingMs(tx);
        return remain > 0 ? `Processing · ${formatProcessingCountdown(remain)} left` : "Processing";
    }
    if (tx.queueStatus === "Pending") return "Awaiting approval";
    return tx.category || "";
}

function highlightId() {
    return sessionStorage.getItem(STORAGE_PREFIX + "activity_focus") || "";
}

function clearHighlightSoon() {
    setTimeout(() => sessionStorage.removeItem(STORAGE_PREFIX + "activity_focus"), 8000);
}

function renderRow(tx, opts = {}) {
    const name = opts.name || recipientLabel(tx);
    const sub = opts.sub != null ? opts.sub : memoLabel(tx);
    const date = opts.shortDate ? formatActDateShort(tx.date) : formatActDate(tx.date);
    const amt = moneyAbs(tx.amount);
    const status = opts.status || "";
    const badge = opts.badge || "flag";
    const badgeText = badge === "pay" ? "P" : "🇺🇸";
    const isNew = highlightId() && String(tx.confirmationId || tx.id) === highlightId();
    return `
        <div class="act-row ${isNew ? "is-new" : ""}">
            <div class="act-avatar">${initialsFromName(name)}
                <span class="act-avatar-badge ${badge === "pay" ? "pay" : "flag"}">${badgeText}</span>
            </div>
            <div class="act-row-main">
                <p class="act-row-name">${name}</p>
                ${sub ? `<p class="act-row-sub">${sub}</p>` : ""}
            </div>
            <div class="act-row-right">
                <p class="act-row-date">${date}</p>
                <p class="act-row-amt out">${amt}</p>
                ${status ? `<p class="act-row-status">${status}</p>` : ""}
            </div>
        </div>`;
}

function renderActivity() {
    const data = getAccountData();
    const pendingAll = (data.pendingTransactions || []).filter(tx => tx.memberVisible !== false);
    const processing = pendingAll.filter(tx => (tx.queueStatus || "") === "Processing");
    const pending = pendingAll.filter(tx => (tx.queueStatus || "") !== "Processing");
    const scheduled = data.scheduledPayments || [];

    const badge = document.getElementById("actBadge");
    const openCount = processing.length + pending.length;
    if (openCount > 0) {
        badge.textContent = String(openCount);
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }

    // Scheduled
    const schedEl = document.getElementById("actScheduled");
    if (!scheduled.length) {
        schedEl.innerHTML = `<p class="act-empty">There's nothing scheduled right now.</p>`;
    } else {
        schedEl.innerHTML = scheduled.map(b => `
            <div class="act-row">
                <div class="act-avatar">${initialsFromName(b.payee)}
                    <span class="act-avatar-badge flag">📅</span>
                </div>
                <div class="act-row-main">
                    <p class="act-row-name">${b.payee}</p>
                    <p class="act-row-sub">${b.frequency} · Next ${formatActDate(b.nextDate)}</p>
                </div>
                <div class="act-row-right">
                    <p class="act-row-date">${formatActDateShort(b.nextDate)}</p>
                    <p class="act-row-amt out">${moneyAbs(b.amount)}</p>
                </div>
            </div>`).join("");
    }

    // Processing
    const procTotal = processing.reduce((s, tx) => s + Math.abs(tx.transferAmount != null ? tx.transferAmount : tx.amount), 0);
    document.getElementById("actProcessingTotal").textContent = processing.length
        ? `${moneyAbs(procTotal)} total`
        : "";
    document.getElementById("actProcessing").innerHTML = processing.length
        ? processing.map(tx => renderRow(tx, {
            name: recipientLabel(tx),
            sub: memoLabel(tx),
            shortDate: true,
            badge: "flag"
        })).join("")
        : `<p class="act-empty">No transfers processing right now.</p>`;

    // Pending
    const pendTotal = pending.reduce((s, tx) => s + Math.abs(tx.transferAmount != null ? tx.transferAmount : tx.amount), 0);
    document.getElementById("actPendingTotal").textContent = pending.length
        ? `${moneyAbs(pendTotal)} total`
        : "";
    document.getElementById("actPending").innerHTML = pending.length
        ? pending.map(tx => renderRow(tx, {
            name: recipientLabel(tx),
            sub: "Pending administrator review",
            shortDate: true,
            badge: "flag",
            status: "Pending"
        })).join("")
        : `<p class="act-empty">Nothing pending review right now.</p>`;

    // History — last ~3 months of member-facing txs
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - 3);
    let history = (data.transactions || []).filter(tx => {
        const d = new Date(tx.date + "T12:00:00");
        return !Number.isNaN(d.getTime()) && d >= cutoff;
    });

    if (historyFilter === "transfer") history = history.filter(tx => /transfer|wire/i.test(tx.category + tx.desc));
    if (historyFilter === "pay") history = history.filter(tx => /fccu pay|zelle/i.test(tx.category + tx.desc));
    if (historyFilter === "bills") history = history.filter(tx => /bill/i.test(tx.category + tx.desc));

    history.sort((a, b) => historyNewestFirst
        ? String(b.date).localeCompare(String(a.date))
        : String(a.date).localeCompare(String(b.date)));

    document.getElementById("actHistoryMeta").textContent =
        historyFilter === "all" ? "Last 3 months"
            : historyFilter === "transfer" ? "Transfers · Last 3 months"
                : historyFilter === "pay" ? "FCCU Pay · Last 3 months"
                    : "Bills · Last 3 months";

    document.getElementById("actHistory").innerHTML = history.length
        ? history.slice(0, 40).map(tx => {
            const name = (tx.meta && tx.meta.recipientName) || tx.desc.replace(/^Bill Pay — |^Wire to |^FCCU Pay to /i, "");
            const cleanName = name.split("(")[0].trim().toUpperCase();
            const sub = (tx.meta && (tx.meta.memo || tx.meta.description)) || tx.category;
            const paid = tx.amount > 0 ? "They paid" : "You paid";
            const isPay = /fccu pay|zelle/i.test(tx.category + "");
            return renderRow(tx, {
                name: cleanName,
                sub,
                badge: isPay ? "pay" : "flag",
                status: paid
            });
        }).join("")
        : `<p class="act-empty">No recent history in this filter.</p>`;

    if (highlightId()) clearHighlightSoon();
}

function toggleHistorySort() {
    historyNewestFirst = !historyNewestFirst;
    document.getElementById("actSortBtn").innerHTML = historyNewestFirst
        ? `Sort: Date (Newest) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>`
        : `Sort: Date (Oldest) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>`;
    renderActivity();
}

function cycleHistoryFilter() {
    const order = ["all", "transfer", "pay", "bills"];
    historyFilter = order[(order.indexOf(historyFilter) + 1) % order.length];
    renderActivity();
}
