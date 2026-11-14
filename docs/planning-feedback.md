# Self-guided feedback and evaluation

No resident results have been collected. The owner selected this alternative to recruiting a five-person panel. Developer checks are recorded separately in VALIDATION.md and are not evidence of resident adoption.

## Try these tasks

Use the public address **100 Queen St W**, not your home address.

1. Find a project within 800 m, record its publisher status and open its source link.
2. Explain whether “Active” proves construction has started. It does not.
3. Switch to applications. Locate the original status and its separately labelled stage interpretation.
4. Open a zoning polygon and locate the dataset’s date limitations.
5. Browse a record without a verified location. Explain why it is absent from radius calculations.
6. Share the snapshot link, reopen it, and export evidence.
7. Try the address input, filters, result buttons and evidence close button using only the keyboard.

## Optional feedback

Use the repository’s **Usability feedback** issue template. Submissions are public and optional. Do not include your home address, email, name, precise location or personal details. An issue requires a GitHub account; the explorer itself does not.

Report the task number, whether you completed it independently, any confusing wording, device/browser and an optional screenshot with personal information removed. “I thought approval meant completion” is particularly useful feedback. Do not include the street address you personally live at.

## How findings are handled

Record each real observation, its source, the affected task, a reproducible fix and the result of rechecking. Never manufacture participant results. Any approval-versus-completion misunderstanding must be corrected before claiming that the interface reliably communicates that distinction. Until feedback arrives, the award draft explicitly reports developer evaluation only.

## Current findings

- Developer walkthroughs verified source inspection, status distinctions, unlocated records and CSV export.
- The first download event was slow through the automation interface; this does not establish normal user download performance.
- Formal screen-reader and physical-device CPU evaluation remain unverified. One controlled 390 px / 1.6 Mbit/s / 150 ms test reached address results in 4.746 seconds after deferring the optional map.

## GTA comprehension measurement protocol (not yet run with people)

Show an actual source record and ask these questions before revealing explanations:

1. A record says “Approved”: what can you conclude about construction starting or a home being available?
2. A regional review is “In Progress”: does this mean the municipality approved the application?
3. A search returns no records in an unavailable layer: does this mean no development exists?
4. Can you find who published the status, when the source was retrieved, and the pinned snapshot?

Score each response separately: correct without prompting, correct after help, incorrect, or not answered. Correct answers for 1–3 must explicitly avoid the unsupported inference; the fourth requires finding the actual evidence. Record completion time, device/browser, and confusing wording without collecting personal addresses. Report raw numerators and denominators, not just percentages. Treat any approval/construction misunderstanding as a wording defect to investigate; require all tested participants to answer the distinction correctly without help before claiming success for that sample. No sample establishes population-wide usability.

No participants have completed this GTA protocol. Automated UI checks are not comprehension results. Earlier Toronto performance numbers above concern a smaller build and are not the current GTA benchmark.

Current GTA benchmark (October 26 continuation): three cold 390×844 Chromium runs, 1.6 Mbit/s downstream / 150 ms latency / 4× CPU slowdown, reached address results at 14.33–14.58 s from navigation; search took 2.30–2.32 s. Map code was deferred. This is developer emulation; no physical-device or participant result is inferred.
