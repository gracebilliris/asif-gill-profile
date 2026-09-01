(() => {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const subject = data.get("subject").trim();
    const message = data.get("message").trim();
    const recipient = ["asif.gill", "uts.edu.au"].join("@");
    const body = [
      message,
      "",
      `From: ${name}`,
      `Reply email: ${email}`
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
