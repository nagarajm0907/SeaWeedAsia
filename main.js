// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // ---- Sticky header glass effect (shared across all pages with .header-hero-wrapper) ----
  var siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  }

  // ---- Scroll reveal animation (shared across all pages, class="reveal") ----
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.1 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  // ---- Chatbot widget (front-end demo — wire to a real backend later) ----
  var chatToggle = document.getElementById('sa-chat-toggle');
  var chatPanel = document.getElementById('sa-chat-panel');
  var chatClose = document.getElementById('sa-chat-close');
  var chatBody = document.getElementById('sa-chat-body');
  var chatForm = document.getElementById('sa-chat-form');
  var chatInput = document.getElementById('sa-chat-input');
  if (chatToggle && chatPanel) {
    chatToggle.addEventListener('click', function () {
      chatPanel.classList.toggle('open');
    });
    chatClose.addEventListener('click', function () {
      chatPanel.classList.remove('open');
    });
    var canned = [
      { match: /moq|minimum/i, reply: "Our minimum order is 1 container. Want help estimating volume for your species of interest?" },
      { match: /sample/i, reply: "You can request a free sample through our Contact page — samples typically take up to 30 days to arrive." },
      { match: /payment|price|cost/i, reply: "Typical terms: 30% deposit via T/T, 70% before shipment. L/Cs available for larger orders. Our export desk can send exact pricing." },
      { match: /species|cottonii|spinosum|gracilaria|sargassum|sea lettuce/i, reply: "We export Cottonii, Spinosum, Gracilaria, Sea Lettuce, and Sargassum — check the Products page for specs on each." },
      { match: /ship|incoterm|port/i, reply: "We ship FOB and CIF as standard (CNF on request) from major Indonesian ports. Lead time is usually 14–30 days." },
    ];
    function addMsg(text, who) {
      var el = document.createElement('div');
      el.className = 'sa-msg ' + who;
      el.textContent = text;
      chatBody.appendChild(el);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = chatInput.value.trim();
      if (!val) return;
      addMsg(val, 'user');
      chatInput.value = '';
      setTimeout(function () {
        var hit = canned.find(function (c) { return c.match.test(val); });
        addMsg(hit ? hit.reply : "Thanks — a member of our export desk will follow up on that. For anything urgent, use the Contact form and we'll respond within 1 business day.", 'bot');
      }, 400);
    });
  }
});
