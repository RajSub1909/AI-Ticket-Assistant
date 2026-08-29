const textarea = document.querySelector(".ticket-input textarea");
const analyzeButton = document.querySelector(".input-footer button");
const copyButton = document.querySelector(".copy-button");
const aiResult = document.querySelector(".ai-result");
const newTicketButton = document.querySelector(".new-ticket");

const defaultResult = {
    intent: "Password Reset",
    category: "Authentication",
    priority: "Medium",
    confidence: "98%",
    response:
        "No worries! You can reset your password by selecting “Forgot Password” on the login page. We'll guide you through the process step by step."
};

function analyzeTicket(ticket) {
    const text = ticket.toLowerCase();

    let intent = "General Support";
    let category = "General";
    let priority = "Low";
    let confidence = 91;
    let response =
        "Thanks for contacting support. We've received your request and our support team will review it shortly.";

    if (
        text.includes("password") ||
        text.includes("forgot") ||
        text.includes("login") ||
        text.includes("log in")
    ) {
        intent = text.includes("password")
            ? "Password Reset"
            : "Login Assistance";

        category = "Authentication";
        priority = "Medium";
        confidence = 98;

        response =
            "No worries! You can reset your password by selecting “Forgot Password” on the login page. We'll guide you through the process step by step.";
    }

    else if (
        text.includes("leave") ||
        text.includes("balance") ||
        text.includes("holiday")
    ) {
        intent = "Leave Balance";
        category = "Account";
        priority = "Low";
        confidence = 96;

        response =
            "You can check your current leave balance from your employee dashboard under the Leave section. If the balance looks incorrect, please contact HR support.";
    }

    else if (
        text.includes("payment") ||
        text.includes("charged") ||
        text.includes("refund") ||
        text.includes("billing")
    ) {
        intent = "Payment Issue";
        category = "Billing";
        priority = text.includes("deducted") || text.includes("charged")
            ? "High"
            : "Medium";
        confidence = 97;

        response =
            "We understand the concern. Please verify your transaction status and payment reference. If the amount was deducted but the transaction failed, our billing team can investigate and process the appropriate resolution.";
    }

    else if (
        text.includes("error") ||
        text.includes("bug") ||
        text.includes("not working") ||
        text.includes("crash")
    ) {
        intent = "Technical Issue";
        category = "Technical";
        priority = "High";
        confidence = 94;

        response =
            "Thanks for reporting this issue. Please try refreshing the application and clearing your browser cache. If the problem continues, share the exact error message so our technical team can investigate.";
    }

    return {
        intent,
        category,
        priority,
        confidence: `${confidence}%`,
        response
    };
}

function updateResult(result) {
    const resultBoxes = document.querySelectorAll(".result-tags > div");

    resultBoxes[0].querySelector("strong").textContent = result.intent;
    resultBoxes[1].querySelector("strong").textContent = result.category;

    const priorityElement = resultBoxes[2].querySelector("strong");

    priorityElement.textContent = result.priority;

    priorityElement.style.color =
        result.priority === "Critical"
            ? "#ef4444"
            : result.priority === "High"
            ? "#fb7185"
            : result.priority === "Medium"
            ? "#fbbf24"
            : "#34d399";

    document.querySelector(".confidence").textContent =
        `${result.confidence} confidence`;

    document.querySelector(".suggested-response p").textContent =
        result.response;
}

analyzeButton.addEventListener("click", () => {
    const ticket = textarea.value.trim();

    if (!ticket) {
        textarea.focus();

        textarea.style.borderColor = "#fb7185";

        setTimeout(() => {
            textarea.style.borderColor = "";
        }, 1200);

        return;
    }

    analyzeButton.textContent = "Analyzing...";

    analyzeButton.disabled = true;

    aiResult.style.opacity = "0.45";

    setTimeout(() => {
        const result = analyzeTicket(ticket);

        updateResult(result);

        aiResult.style.opacity = "1";

        analyzeButton.textContent = "Analysis Complete ✓";

        setTimeout(() => {
            analyzeButton.textContent = "Analyze Ticket →";
            analyzeButton.disabled = false;
        }, 1200);
    }, 800);
});

copyButton.addEventListener("click", async () => {
    const response =
        document.querySelector(".suggested-response p").textContent;

    try {
        await navigator.clipboard.writeText(response);

        copyButton.textContent = "Copied ✓";

        setTimeout(() => {
            copyButton.textContent = "Copy Response";
        }, 1500);
    } catch {
        copyButton.textContent = "Copy unavailable";
    }
});

newTicketButton.addEventListener("click", () => {
    textarea.value = "";

    updateResult(defaultResult);

    textarea.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", event => {
        event.preventDefault();

        document.querySelectorAll(".nav-item").forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");
    });
});
