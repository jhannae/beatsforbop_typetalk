// Basic prototype logic: submit prompt, render response screen with sample content.
const form = document.getElementById('promptForm');
const input = document.getElementById('promptInput');
const viewport = document.getElementById('viewport');
const eqSendBtn = document.getElementById('eqSendBtn');
const eqSendIcon = document.getElementById('eqSendIcon');
const vpWidthEl = document.getElementById('vpWidth');

const arrowUpSvg = `\n<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\n  <path d="M3.13171 9.16142C2.94553 9.36536 2.95993 9.68162 3.16387 9.8678C3.36781 10.054 3.68407 10.0396 3.87025 9.83564L9.50098 3.66779L9.50098 17.4985C9.50098 17.7747 9.72483 17.9985 10.001 17.9985C10.2771 17.9985 10.501 17.7747 10.501 17.4985L10.501 3.67068L16.1291 9.83564C16.3152 10.0396 16.6315 10.054 16.8354 9.8678C17.0394 9.68162 17.0538 9.36536 16.8676 9.16142L10.5536 2.24507C10.4258 2.10512 10.2583 2.02529 10.0851 2.00558C10.0578 2.00095 10.0296 1.99854 10.001 1.99854C9.9741 1.99854 9.94773 2.00066 9.922 2.00474C9.7461 2.02291 9.57544 2.10302 9.44576 2.24507L3.13171 9.16142Z" fill="white"/>\n</svg>`;

function autoResize() {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 240) + 'px';
  const singleLineHeight = 40; // matches CSS line-height for single line
  if (input.scrollHeight > singleLineHeight * 1.25) {
    input.classList.add('multi-line');
  } else {
    input.classList.remove('multi-line');
  }
}
input.addEventListener('input', () => {
  autoResize();
  const hasText = input.value.trim().length > 0;
  if (hasText) {
    eqSendBtn.classList.add('active');
    eqSendBtn.disabled = false;
    if (!eqSendBtn.dataset.mode || eqSendBtn.dataset.mode !== 'send') {
      eqSendIcon.innerHTML = arrowUpSvg;
      eqSendBtn.dataset.mode = 'send';
      eqSendBtn.setAttribute('aria-label','Send');
      eqSendBtn.title = 'Send';
    }
  } else {
    eqSendBtn.classList.remove('active');
    eqSendBtn.disabled = true;
    if (eqSendBtn.dataset.mode !== 'eq') {
      // Restore original EQ icon (bars)
      eqSendIcon.innerHTML = `\n      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">\n        <path d="M11.9999 3C12.3796 3 12.6934 3.28215 12.743 3.64823L12.7499 3.75V20.25C12.7499 20.6642 12.4141 21 11.9999 21C11.6202 21 11.3064 20.7178 11.2567 20.3518L11.2499 20.25V3.75C11.2499 3.33579 11.5857 3 11.9999 3ZM8.25481 6C8.63451 6 8.9483 6.28215 8.99796 6.64823L9.00481 6.75V17.25C9.00481 17.6642 8.66902 18 8.25481 18C7.87511 18 7.56132 17.7178 7.51166 17.3518L7.50481 17.25V6.75C7.50481 6.33579 7.8406 6 8.25481 6ZM15.7449 6C16.1246 6 16.4384 6.28215 16.4881 6.64823L16.4949 6.75V17.25C16.4949 17.6642 16.1591 18 15.7449 18C15.3652 18 15.0514 17.7178 15.0018 17.3518L14.9949 17.25V6.75C14.9949 6.33579 15.3307 6 15.7449 6ZM4.75098 9C5.13067 9 5.44447 9.28215 5.49413 9.64823L5.50098 9.75V14.25C5.50098 14.6642 5.16519 15 4.75098 15C4.37128 15 4.05749 14.7178 4.00782 14.3518L4.00098 14.25V9.75C4.00098 9.33579 4.33676 9 4.75098 9ZM19.2521 9C19.6318 9 19.9456 9.28215 19.9952 9.64823L20.0021 9.75V14.2487C20.0021 14.6629 19.6663 14.9987 19.2521 14.9987C18.8724 14.9987 18.5586 14.7165 18.5089 14.3504L18.5021 14.2487V9.75C18.5021 9.33579 18.8378 9 19.2521 9Z" fill="#393939"/>\n      </svg>`;
      eqSendBtn.dataset.mode = 'eq';
      eqSendBtn.setAttribute('aria-label','Compose');
      eqSendBtn.title = 'Compose';
    }
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!eqSendBtn.classList.contains('active')) return; // guard
  const text = input.value.trim();
  if(!text) return; // double guard
  // Switch to response screen by adding a sample user bubble + AI bubble.
  if(viewport.firstChild && viewport.firstChild.nodeType === 1 && viewport.firstChild.classList.contains('placeholder')) {
    viewport.firstChild.remove();
  }
  renderUserMessage(text);
  input.value='';
  eqSendBtn.classList.remove('active');
  eqSendBtn.disabled = true;
  // revert to EQ icon
  eqSendIcon.innerHTML = `\n    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">\n      <path d="M11.9999 3C12.3796 3 12.6934 3.28215 12.743 3.64823L12.7499 3.75V20.25C12.7499 20.6642 12.4141 21 11.9999 21C11.6202 21 11.3064 20.7178 11.2567 20.3518L11.2499 20.25V3.75C11.2499 3.33579 11.5857 3 11.9999 3ZM8.25481 6C8.63451 6 8.9483 6.28215 8.99796 6.64823L9.00481 6.75V17.25C9.00481 17.6642 8.66902 18 8.25481 18C7.87511 18 7.56132 17.7178 7.51166 17.3518L7.50481 17.25V6.75C7.50481 6.33579 7.8406 6 8.25481 6ZM15.7449 6C16.1246 6 16.4384 6.28215 16.4881 6.64823L16.4949 6.75V17.25C16.4949 17.6642 16.1591 18 15.7449 18C15.3652 18 15.0514 17.7178 15.0018 17.3518L14.9949 17.25V6.75C14.9949 6.33579 15.3307 6 15.7449 6ZM4.75098 9C5.13067 9 5.44447 9.28215 5.49413 9.64823L5.50098 9.75V14.25C5.50098 14.6642 5.16519 15 4.75098 15C4.37128 15 4.05749 14.7178 4.00782 14.3518L4.00098 14.25V9.75C4.00098 9.33579 4.33676 9 4.75098 9ZM19.2521 9C19.6318 9 19.9456 9.28215 19.9952 9.64823L20.0021 9.75V14.2487C20.0021 14.6629 19.6663 14.9987 19.2521 14.9987C18.8724 14.9987 18.5586 14.7165 18.5089 14.3504L18.5021 14.2487V9.75C18.5021 9.33579 18.8378 9 19.2521 9Z" fill="#393939"/>\n    </svg>`;
  eqSendBtn.dataset.mode = 'eq';
  autoResize();
  setTimeout(()=>{
    renderAIResponse(sampleLongResponse());
  }, 300);
});

function createCluster(role) {
  const cluster = document.createElement('div');
  cluster.className = 'message-cluster ' + role;
  return cluster;
}

function ensureConversationWidthWrapper() {
  // Remove placeholder panel if it exists
  const placeholder = viewport.querySelector('.placeholder');
  if (placeholder) placeholder.remove();
  if (!document.body.classList.contains('conversation-mode')) {
    document.body.classList.remove('prompt-mode');
    document.body.classList.add('conversation-mode');
  }
}

function renderUserMessage(text) {
  ensureConversationWidthWrapper();
  const cluster = createCluster('user');
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;
  cluster.appendChild(bubble);
  viewport.appendChild(cluster);
  viewport.scrollTop = viewport.scrollHeight;
}

function renderAIResponse(html) {
  ensureConversationWidthWrapper();
  const cluster = createCluster('ai');
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble long';
  bubble.innerHTML = html;
  cluster.appendChild(bubble);
  viewport.appendChild(cluster);
  // Basic heading wrap detection: if h2 line count >1 apply .wrap
  requestAnimationFrame(()=>{
    cluster.querySelectorAll('h2').forEach(h => {
      const lh = parseFloat(getComputedStyle(h).lineHeight);
      if (h.scrollHeight > lh * 1.2) {
        h.classList.add('wrap');
      }
    });
  });
  viewport.scrollTop = viewport.scrollHeight;
}

function sampleLongResponse() {
  return `
  <div class="ai-response">
  <p class="t-label">Reasoning complete <span class="label-chevron"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none"><path d="M2.34482 6.11826C2.58063 5.88245 2.96295 5.88245 3.19876 6.11826L6.99854 9.91804L10.7983 6.11826C11.0341 5.88245 11.4164 5.88245 11.6523 6.11826C11.8881 6.35407 11.8881 6.73639 11.6523 6.97219L7.4255 11.1989C7.1897 11.4347 6.80738 11.4347 6.57157 11.1989L2.34482 6.97219C2.10902 6.73639 2.10902 6.35407 2.34482 6.11826Z" fill="#616161"/></svg></span></p>
    <div class="stats-section">
      <p class="t-body">Based on the data from <strong>Product_Launch_Feedback_Summary</strong>, I’ve identified a notable increase in escalations starting mid-May 2025, which aligns with the launch of the new product line: “XStream Pro Series.”</p>
      <p class="stats-heading">Key findings</p>
      <p class="t-body">Escalations related to XStream Pro increased by 47% from May to July, signaling a growing concern among enterprise clients.</p>
      <div class="stats-list">
        <div class="stat-row">
          <div class="stat-value">47%</div>
          <div class="stat-desc">Escalations related to XStream Pro increased by 47% from May to July.</div>
        </div>
        <div class="stat-row">
          <div class="stat-value">38%</div>
          <div class="stat-desc">38% of issues are connectivity dropouts or firmware update failures</div>
        </div>
        <div class="stat-row">
          <div class="stat-value">24</div>
          <div class="stat-desc">Severity level 2 or 3 escalations (doubled in June compared to April)</div>
        </div>
      </div>
    </div>
    <p class="t-body loosen">Escalations related to XStream Pro increased by 47% from May to July, signaling a growing concern among enterprise clients. The top three recurring issues—connectivity dropouts (reported in 38% of XStream-related tickets), firmware update failures, and inconsistent performance under load—have been particularly disruptive for users in high-availability environments. Internal diagnostics revealed that 62% of connectivity issues were linked to a recent patch (v4.3.2) that introduced a regression in the network handshake protocol.</p>
    <p class="t-body">Firmware update failures were most prevalent in devices manufactured before Q4 2024, suggesting a hardware compatibility gap. Meanwhile, performance inconsistencies were traced to a memory leak in the load-balancing module, which has since been addressed in a hotfix.</p>
    <p class="t-body">Severity Level 2 and 3 escalations doubled in June compared to April, with the majority originating from financial services and healthcare sectors, where system reliability is critical.</p>
    <p class="t-subheading">Supporting evidence</p>
    <p class="t-body">Escalation data shows a clear spike in incidents starting mid-May, aligning with the launch of the XStream Pro Series. Escalations tied to this product rose by 47% over two months, with common issues including connectivity dropouts, firmware update failures, and inconsistent performance.</p>
  <span class="t-quote-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none"><path d="M7.5976 0L8.76877 2.54386C7.48749 3.16764 6.42643 3.92788 5.58559 4.82456C4.76476 5.72125 4.28428 6.81287 4.14414 8.09941L3.81381 7.83626C4.91491 7.83626 5.82583 8.17739 6.54655 8.85965C7.28729 9.52242 7.65766 10.3606 7.65766 11.3743C7.65766 12.4464 7.2973 13.3236 6.57658 14.0058C5.85586 14.6686 4.93494 15 3.81381 15C2.67267 15 1.75175 14.6199 1.05105 13.8596C0.35035 13.0799 0 11.9103 0 10.3509C0 8.61598 0.33033 7.06628 0.990991 5.70175C1.65165 4.33723 2.55255 3.17739 3.69369 2.22222C4.83483 1.26706 6.13614 0.526316 7.5976 0ZM18.8288 0L20 2.54386C18.7187 3.16764 17.6577 3.92788 16.8168 4.82456C15.996 5.72125 15.5155 6.81287 15.3754 8.09941L15.045 7.83626C16.1461 7.83626 17.0571 8.17739 17.7778 8.85965C18.5185 9.52242 18.8889 10.3606 18.8889 11.3743C18.8889 12.4464 18.5285 13.3236 17.8078 14.0058C17.0871 14.6686 16.1662 15 15.045 15C13.9039 15 12.983 14.6199 12.2823 13.8596C11.5816 13.0799 11.2312 11.9103 11.2312 10.3509C11.2312 8.61598 11.5616 7.06628 12.2222 5.70175C12.8829 4.33723 13.7838 3.17739 14.9249 2.22222C16.0661 1.26706 17.3674 0.526316 18.8288 0Z" fill="#424242"/></svg></span>
  <p class="t-quote">XStream Pro has been unpredictable and disruptive. It’s affecting our ability to deliver consistent service to our clients.</p>
    <p class="t-body">Feedback supports this trend—over half of the customer quotes mention reliability concerns with XStream Pro. Several customers reported needing multiple support interactions, and internal notes highlight firmware as a recurring issue. Together, the data points to a strong correlation between the product launch and the rise in escalations.</p>
    <p class="t-subheading">Suggested next steps</p>
    <ul class="t-list">
      <li>Create a visual timeline of escalation volume by product line.</li>
      <li>Draft a summary for the product team highlighting the top issues.</li>
      <li>Recommend a cross-functional review with Engineering and QA.</li>
    </ul>
    <p class="t-body">Would you like me to generate a chart or draft a summary email to the product team?</p>
  </div>
  `;
}

// Initial placeholder element to visually reserve panel
(function initPlaceholder(){
  if(!viewport.firstChild){
    const placeholderPanel = document.createElement('div');
    placeholderPanel.className = 'placeholder';
    placeholderPanel.style.height='100%';
    viewport.appendChild(placeholderPanel);
  }
})();

// Viewport width indicator logic
function updateViewportWidthIndicator() {
  if (!vpWidthEl) return;
  vpWidthEl.textContent = window.innerWidth + 'px';
}
updateViewportWidthIndicator();
window.addEventListener('resize', updateViewportWidthIndicator);

// Hotkey: Shift+1 ("!") toggles visibility of viewport width indicator
window.addEventListener('keydown', (e) => {
  // Check for Shift+1; key can be '!' or event.code 'Digit1' with shiftKey
  if ((e.key === '!' || (e.code === 'Digit1' && e.shiftKey)) && !e.altKey && !e.metaKey && !e.ctrlKey) {
    if (vpWidthEl) {
      vpWidthEl.classList.toggle('hidden');
      if (!vpWidthEl.classList.contains('hidden')) {
        updateViewportWidthIndicator();
      }
    }
  }
});

// Font metrics tooltip ------------------------------------------------------
const metricsTooltip = document.createElement('div');
metricsTooltip.className = 'font-metrics-tooltip';
document.body.appendChild(metricsTooltip);

let tooltipTarget = null;

function formatPx(value) { return Math.round(value) + 'px'; }

const TOOLTIP_OFFSET_X = 28;
const TOOLTIP_OFFSET_Y = 32;

function showMetricsTooltip(e) {
  const t = e.target;
  if (!t || t === document.body || t === document.documentElement) return;
  // Skip if container without direct text content
  if (!t.textContent || !t.textContent.trim()) return;
  const style = getComputedStyle(t);
  const fs = parseFloat(style.fontSize);
  const lh = parseFloat(style.lineHeight);
  if (!fs || !lh) return;
  metricsTooltip.textContent = formatPx(fs) + '//' + formatPx(lh);
  metricsTooltip.style.top = (e.clientY + TOOLTIP_OFFSET_Y) + 'px';
  metricsTooltip.style.left = (e.clientX + TOOLTIP_OFFSET_X) + 'px';
  metricsTooltip.classList.add('visible');
  tooltipTarget = t;
}

function moveMetricsTooltip(e) {
  if (!metricsTooltip.classList.contains('visible')) return;
  metricsTooltip.style.top = (e.clientY + TOOLTIP_OFFSET_Y) + 'px';
  metricsTooltip.style.left = (e.clientX + TOOLTIP_OFFSET_X) + 'px';
}

function hideMetricsTooltip(e) {
  if (tooltipTarget && e.target === tooltipTarget) {
    metricsTooltip.classList.remove('visible');
    tooltipTarget = null;
  }
}

// Delegate mouse events on document for lightweight instrumentation
document.addEventListener('mouseover', showMetricsTooltip);
document.addEventListener('mousemove', moveMetricsTooltip);
document.addEventListener('mouseout', hideMetricsTooltip);
