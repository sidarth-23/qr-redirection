const DEFAULT_DELAY = 650;

function startRedirect(config) {
  const {
    title = "Redirecting",
    description = "Taking you to the destination.",
    destination,
    delay = DEFAULT_DELAY,
    badge = "Secure redirect",
  } = config;

  if (!destination) {
    throw new Error("Missing destination URL");
  }

  document.title = title;

  const app = document.getElementById("app");
  const safeDestination = destination.replace(/"/g, "&quot;");

  app.innerHTML = `
    <div class="background-glow"></div>
    <main class="card">
      <div class="spinner" aria-hidden="true"></div>

      <div class="badge">
        <span class="badge-dot"></span>
        <span>${badge}</span>
      </div>

      <h1>${title}</h1>
      <p>${description}</p>

      <div class="link-preview">${safeDestination}</div>

      <div class="progress-wrap">
        <div class="progress-label">
          <span>Please wait...</span>
          <span id="countdown">${(delay / 1000).toFixed(1)}s</span>
        </div>
        <div class="progress">
          <div class="progress-bar" style="animation-duration: ${delay}ms"></div>
        </div>
      </div>
    </main>
  `;

  let remaining = delay;
  const countdownEl = document.getElementById("countdown");

  const interval = setInterval(() => {
    remaining -= 100;
    if (remaining <= 0) {
      clearInterval(interval);
      return;
    }
    countdownEl.textContent = `${(remaining / 1000).toFixed(1)}s`;
  }, 100);

  const timeout = setTimeout(() => {
    window.location.href = destination;
  }, delay);
}