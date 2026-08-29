/* =========================================================
   TICKET AI — APPLICATION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const ticketInput =
        document.getElementById("ticketInput");

    const charCount =
        document.getElementById("charCount");

    const analyzeBtn =
        document.getElementById("analyzeBtn");

    const confidenceValue =
        document.getElementById("confidenceValue");

    const intentValue =
        document.getElementById("intentValue");

    const categoryValue =
        document.getElementById("categoryValue");

    const priorityValue =
        document.getElementById("priorityValue");

    const responseValue =
        document.getElementById("responseValue");

    const copyBtn =
        document.getElementById("copyBtn");

    const resultContainer =
        document.getElementById("resultContainer");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const themeToggle =
        document.getElementById("themeToggle");

    const globalSearch =
        document.getElementById("globalSearch");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    const ticketModal =
        document.getElementById("ticketModal");

    const newTicketBtn =
        document.getElementById("newTicketBtn");

    const closeModal =
        document.getElementById("closeModal");

    const createTicketBtn =
        document.getElementById("createTicketBtn");

    const customerName =
        document.getElementById("customerName");

    const newTicketInput =
        document.getElementById("newTicketInput");

    const recentTickets =
        document.getElementById("recentTickets");

    const totalTickets =
        document.getElementById("totalTickets");

    const resolvedTickets =
        document.getElementById("resolvedTickets");

    const ticketCount =
        document.getElementById("ticketCount");



    /* =====================================================
       STATE
    ====================================================== */

    let analyzedTickets =
        JSON.parse(
            localStorage.getItem("ticketAI_history") || "[]"
        );


    let ticketNumber = 1248;



    /* =====================================================
       DATE
    ====================================================== */

    const dateElement =
        document.getElementById("currentDate");

    if (dateElement) {

        const now = new Date();

        const formatted =
            now.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                }
            );

        dateElement.textContent = formatted;
    }



    /* =====================================================
       CHARACTER COUNTER
    ====================================================== */

    if (ticketInput) {

        ticketInput.addEventListener(
            "input",
            () => {

                const length =
                    ticketInput.value.length;

                charCount.textContent =
                    `${length} / 500`;

            }
        );

    }



    /* =====================================================
       EXAMPLE CHIPS
    ====================================================== */

    document
        .querySelectorAll(".example-chips button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    ticketInput.value =
                        button.dataset.example;

                    ticketInput.dispatchEvent(
                        new Event("input")
                    );

                    ticketInput.focus();

                }
            );

        });



    /* =====================================================
       AI CLASSIFICATION ENGINE
    ====================================================== */

    function analyzeTicket(text) {

        const input =
            text
                .toLowerCase()
                .trim();


        if (!input) {

            return {
                intent: "General Support",
                category: "Unclassified",
                priority: "Low",
                confidence: 72,
                response:
                    "Please provide a little more information about the customer's issue so I can classify it accurately."
            };

        }


        /* PASSWORD */

        if (
            input.includes("password") ||
            input.includes("forgot password") ||
            input.includes("reset password") ||
            input.includes("cannot login") ||
            input.includes("can't login") ||
            input.includes("cant login") ||
            input.includes("login") ||
            input.includes("log in") ||
            input.includes("sign in")
        ) {

            return {

                intent: "Password Reset",

                category: "Authentication",

                priority:
                    input.includes("locked") ||
                    input.includes("security")
                        ? "High"
                        : "Medium",

                confidence: 98,

                response:
                    "No worries! You can reset your password by selecting “Forgot Password” on the login page. Follow the verification steps to create a new password. If the issue continues, our support team can assist you further."

            };

        }


        /* PAYMENT */

        if (
            input.includes("payment") ||
            input.includes("paid") ||
            input.includes("transaction") ||
            input.includes("billing") ||
            input.includes("refund") ||
            input.includes("money") ||
            input.includes("amount")
        ) {

            return {

                intent:
                    input.includes("refund")
                        ? "Refund Request"
                        : "Payment Issue",

                category: "Billing",

                priority:
                    input.includes("charged") ||
                    input.includes("failed")
                        ? "High"
                        : "Medium",

                confidence: 96,

                response:
                    "Thanks for reaching out. Please allow us to verify the transaction details. If the payment was completed successfully but is not reflected in your account, our billing team will review the transaction and update you shortly."

            };

        }


        /* LEAVE */

        if (
            input.includes("leave") ||
            input.includes("holiday") ||
            input.includes("balance") ||
            input.includes("vacation") ||
            input.includes("absence")
        ) {

            return {

                intent: "Leave Balance",

                category: "Account",

                priority: "Low",

                confidence: 97,

                response:
                    "You can view your current leave balance from the employee portal under Leave & Attendance. If the displayed balance appears incorrect, please share the details with HR or support for verification."

            };

        }


        /* TECHNICAL */

        if (
            input.includes("crash") ||
            input.includes("crashing") ||
            input.includes("error") ||
            input.includes("bug") ||
            input.includes("not working") ||
            input.includes("application") ||
            input.includes("app") ||
            input.includes("website") ||
            input.includes("server") ||
            input.includes("slow")
        ) {

            const critical =
                input.includes("down") ||
                input.includes("production") ||
                input.includes("security");

            return {

                intent:
                    input.includes("crash")
                        ? "Application Crash"
                        : "Technical Issue",

                category: "Technical",

                priority:
                    critical
                        ? "Critical"
                        : "High",

                confidence: 94,

                response:
                    "Thanks for reporting this technical issue. Please try restarting the application and checking for the latest update. If the problem persists, our technical team will investigate the issue and provide the next steps."

            };

        }


        /* ACCOUNT */

        if (
            input.includes("account") ||
            input.includes("profile") ||
            input.includes("email") ||
            input.includes("phone") ||
            input.includes("username")
        ) {

            return {

                intent: "Account Assistance",

                category: "Account",

                priority: "Medium",

                confidence: 91,

                response:
                    "We can help with your account request. Please verify the account information associated with your profile so our support team can safely review and resolve the issue."

            };

        }


        /* GENERAL */

        return {

            intent: "General Support",

            category: "General",

            priority: "Low",

            confidence: 86,

            response:
                "Thanks for contacting support. We've received your request and will review the details. If additional information is required, our support team will contact you with the next steps."

        };

    }



    /* =====================================================
       PRIORITY COLOR
    ====================================================== */

    function updatePriorityStyle(priority) {

        priorityValue.className = "";

        priorityValue.classList.add(
            `priority-${priority.toLowerCase()}`
        );

    }



    /* =====================================================
       ANALYZE
    ====================================================== */

    function runAnalysis(text = ticketInput.value) {

        const cleanText =
            text.trim();


        if (!cleanText) {

            showToast(
                "Please describe the customer issue first."
            );

            ticketInput.focus();

            return null;

        }


        analyzeBtn.classList.add("loading");

        analyzeBtn.innerHTML =
            `<span>✦</span> Analyzing...`;


        setTimeout(() => {

            const result =
                analyzeTicket(cleanText);


            intentValue.textContent =
                result.intent;

            categoryValue.textContent =
                result.category;

            priorityValue.textContent =
                result.priority;

            confidenceValue.textContent =
                `${result.confidence}%`;

            responseValue.textContent =
                result.response;


            updatePriorityStyle(
                result.priority
            );


            resultContainer.classList.add(
                "result-visible"
            );


            analyzeBtn.classList.remove(
                "loading"
            );

            analyzeBtn.innerHTML =
                `<span>✦</span> Analyze Ticket <b>→</b>`;


            saveTicket(
                cleanText,
                result
            );


            showToast(
                "Ticket analyzed successfully."
            );

        }, 650);


        return true;

    }


    analyzeBtn.addEventListener(
        "click",
        () => runAnalysis()
    );



    /* =====================================================
       KEYBOARD SHORTCUT
    ====================================================== */

    ticketInput.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key === "Enter"
            ) {

                event.preventDefault();

                runAnalysis();

            }

        }
    );



    /* =====================================================
       COPY RESPONSE
    ====================================================== */

    copyBtn.addEventListener(
        "click",
        async () => {

            const text =
                responseValue.textContent.trim();


            try {

                await navigator.clipboard.writeText(
                    text
                );

                copyBtn.textContent =
                    "✓ Copied";

                showToast(
                    "AI response copied to clipboard."
                );


                setTimeout(() => {

                    copyBtn.textContent =
                        "▣ Copy";

                }, 1600);

            } catch {

                showToast(
                    "Unable to copy response."
                );

            }

        }
    );



    /* =====================================================
       SAVE TICKET
    ====================================================== */

    function saveTicket(text, result) {

        const ticket = {

            id:
                `TKT-${++ticketNumber}`,

            text,

            intent:
                result.intent,

            category:
                result.category,

            priority:
                result.priority,

            confidence:
                result.confidence,

            response:
                result.response,

            createdAt:
                new Date().toISOString()

        };


        analyzedTickets.unshift(ticket);

        analyzedTickets =
            analyzedTickets.slice(0, 20);


        localStorage.setItem(
            "ticketAI_history",
            JSON.stringify(analyzedTickets)
        );


        totalTickets.textContent =
            (1248 + analyzedTickets.length)
                .toLocaleString();


        resolvedTickets.textContent =
            (842 + Math.floor(
                analyzedTickets.length * .8
            )).toLocaleString();


        renderRecentTickets();

    }



    /* =====================================================
       RENDER RECENT TICKETS
    ====================================================== */

    function renderRecentTickets() {

        if (
            !recentTickets ||
            analyzedTickets.length === 0
        ) return;


        const latest =
            analyzedTickets.slice(0, 4);


        latest.forEach(ticket => {

            const existing =
                document.querySelector(
                    `[data-ticket-id="${ticket.id}"]`
                );

            if (existing) return;


            const row =
                document.createElement("div");


            row.className =
                "ticket-row";


            row.dataset.ticketId =
                ticket.id;


            const initials =
                ticket.id
                    .replace("TKT-", "")
                    .slice(-2);


            const statusClass =
                ticket.priority.toLowerCase();


            row.innerHTML = `

                <div class="ticket-avatar avatar-blue">
                    ${initials}
                </div>

                <div class="ticket-main">

                    <strong>
                        ${escapeHTML(
                            ticket.intent
                        )}
                    </strong>

                    <span>
                        #${ticket.id} ·
                        ${escapeHTML(
                            ticket.category
                        )}
                    </span>

                </div>

                <div class="ticket-meta">

                    <b class="status ${statusClass}">
                        ● ${escapeHTML(
                            ticket.priority
                        )}
                    </b>

                    <small>
                        now
                    </small>

                </div>

            `;


            recentTickets.prepend(row);

        });

    }



    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }



    /* =====================================================
       NEW TICKET MODAL
    ====================================================== */

    function openModal() {

        ticketModal.classList.add("show");

        setTimeout(() => {
            customerName.focus();
        }, 100);

    }


    function closeTicketModal() {

        ticketModal.classList.remove(
            "show"
        );

    }


    newTicketBtn.addEventListener(
        "click",
        openModal
    );


    closeModal.addEventListener(
        "click",
        closeTicketModal
    );


    ticketModal.addEventListener(
        "click",
        event => {

            if (
                event.target === ticketModal
            ) {

                closeTicketModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeTicketModal();

            }

        }
    );



    /* =====================================================
       CREATE TICKET
    ====================================================== */

    createTicketBtn.addEventListener(
        "click",
        () => {

            const text =
                newTicketInput.value.trim();


            if (!text) {

                showToast(
                    "Please describe the issue."
                );

                newTicketInput.focus();

                return;

            }


            const result =
                analyzeTicket(text);


            ticketInput.value =
                text;


            ticketInput.dispatchEvent(
                new Event("input")
            );


            intentValue.textContent =
                result.intent;

            categoryValue.textContent =
                result.category;

            priorityValue.textContent =
                result.priority;

            confidenceValue.textContent =
                `${result.confidence}%`;

            responseValue.textContent =
                result.response;


            updatePriorityStyle(
                result.priority
            );


            saveTicket(
                text,
                result
            );


            closeTicketModal();


            newTicketInput.value = "";


            showToast(
                "New ticket created and analyzed."
            );


            document
                .getElementById("assistantPanel")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        }
    );



    /* =====================================================
       THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem(
            "ticketAI_theme"
        );


    if (savedTheme === "dark") {

        body.classList.add("dark");

        themeToggle.textContent =
            "☀";

    }


    themeToggle.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "dark"
            );


            const dark =
                body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "ticketAI_theme",
                dark ? "dark" : "light"
            );


            themeToggle.textContent =
                dark ? "☀" : "☾";

        }
    );



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    mobileMenu.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );



    /* =====================================================
       NAVIGATION
    ====================================================== */

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.dataset.section;


                    document
                        .querySelectorAll(
                            ".nav-item"
                        )
                        .forEach(item => {

                            item.classList.toggle(
                                "active",
                                item.dataset.section ===
                                section
                            );

                        });


                    sidebar.classList.remove(
                        "open"
                    );


                    if (
                        section ===
                        "assistant"
                    ) {

                        document
                            .getElementById(
                                "assistantPanel"
                            )
                            .scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        return;

                    }


                    if (
                        section ===
                        "dashboard"
                    ) {

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                        return;

                    }


                    showToast(
                        `${capitalize(section)} module is ready for integration.`
                    );

                }
            );

        });



    /* =====================================================
       SEARCH
    ====================================================== */

    globalSearch.addEventListener(
        "input",
        () => {

            const query =
                globalSearch.value
                    .toLowerCase()
                    .trim();


            if (!query) {

                document
                    .querySelectorAll(
                        ".ticket-row"
                    )
                    .forEach(row => {

                        row.style.display =
                            "";

                    });

                return;

            }


            document
                .querySelectorAll(
                    ".ticket-row"
                )
                .forEach(row => {

                    const content =
                        row.textContent
                            .toLowerCase();


                    row.style.display =
                        content.includes(query)
                            ? ""
                            : "none";

                });

        }
    );



    /* =====================================================
       CTRL + K SEARCH
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                globalSearch.focus();

            }

        }
    );



    /* =====================================================
       REPORTS
    ====================================================== */

    document
        .getElementById("reportsBtn")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Analytics report is ready for review."
                );

            }
        );



    /* =====================================================
       NOTIFICATION
    ====================================================== */

    document
        .getElementById("notificationBtn")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "You have 3 new support notifications."
                );

            }
        );



    /* =====================================================
       HELP
    ====================================================== */

    document
        .getElementById("helpBtn")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Tip: Try a password, payment, leave or technical issue."
                );

            }
        );



    /* =====================================================
       TOAST
    ====================================================== */

    let toastTimer;


    function showToast(message) {

        toastMessage.textContent =
            message;


        toast.classList.add(
            "show"
        );


        clearTimeout(
            toastTimer
        );


        toastTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 2600);

    }



    /* =====================================================
       CAPITALIZE
    ====================================================== */

    function capitalize(value) {

        return value.charAt(0).toUpperCase() +
            value.slice(1);

    }



    /* =====================================================
       INITIAL DATA
    ====================================================== */

    if (
        analyzedTickets.length > 0
    ) {

        totalTickets.textContent =
            (
                1248 +
                analyzedTickets.length
            ).toLocaleString();


        resolvedTickets.textContent =
            (
                842 +
                Math.floor(
                    analyzedTickets.length * .8
                )
            ).toLocaleString();


        renderRecentTickets();

    }


    /* =====================================================
       INITIAL DEMO RESULT
    ====================================================== */

    updatePriorityStyle(
        priorityValue.textContent
    );

});
