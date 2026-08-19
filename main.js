// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
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

    // Ordered most-specific -> most-general within each topic block, since
    // the first matching rule wins.
    var canned = [

      // ---- Species & Product ----
      { match: /carrageenan/i, reply: "Cottonii and Spinosum are used for carrageenan. Cottonii is our highest-volume species; Spinosum gives a softer, more elastic (iota) gel." },
      { match: /agar/i, reply: "Yes — Gracilaria is our agar-grade species, farmed in brackish ponds for a cleaner, lower-ash harvest." },
      { match: /more than one species|multiple species|mix(ed)? species|combine species/i, reply: "Yes — you can order more than one species in a single order, and we can also combine species into one sample shipment." },
      { match: /species|cottonii|spinosum|gracilaria|sargassum|sea lettuce|ulva/i, reply: "We supply five main species — Cottonii, Spinosum, Gracilaria, Sargassum, and Ulva (Sea Lettuce) — all sourced directly from farmers across Indonesia. Check the Products page for specs on each." },

      // ---- Specs & Quality ----
      { match: /coa|certificate of analysis|lab test|lab report|laboratory/i, reply: "Yes — a Certificate of Analysis (COA) covering moisture, ash content, foreign matter, and microbiological results is provided per shipment." },
      { match: /food.?grade|industrial.?grade/i, reply: "Our dried seaweed is industrial-grade — used for carrageenan, alginate, and agar processing. We're actively working toward food-grade supply too, so if that's what you need, let's talk through your requirements and timeline." },
      { match: /impurity|foreign matter/i, reply: "Max 3–5% foreign matter, in line with standard Indonesian export grade." },
      { match: /shelf life|how long.*(store|last)|storage/i, reply: "Up to 12 months, stored in a cool, dry, sealed environment away from direct sunlight and moisture." },
      { match: /custom(ize)?.*(spec|grade)|specific grade/i, reply: "Yes — moisture, impurity level, and grading can be adjusted within reason to match your spec." },
      { match: /moisture/i, reply: "Our seaweed is sun-dried with 35–38% moisture content, max 3–5% impurity. We can adjust grading and specs depending on what you need." },

      // ---- Pricing, Payment & Incoterms ----
      { match: /bigger volume|larger volume|volume discount|better price/i, reply: "Yes — larger or recurring-volume orders get better pricing." },
      { match: /seasonal|season.*price|price.*season/i, reply: "Yes — pricing moves with harvest season, moisture, and grade. Your final quote is confirmed against your spec and MOQ." },
      { match: /negotiate.*deposit|deposit.*negotiate|deposit percentage/i, reply: "There's some flexibility on the deposit for repeat/trusted buyers or larger orders, but 30/70 is the standard starting point." },
      { match: /cargo insurance|who pays.*insurance|insurance/i, reply: "Under CIF, we arrange and pay for cargo insurance. Under FOB, the buyer arranges their own insurance." },
      { match: /lock/i, reply: "Pricing for repeat/recurring orders can often be locked in for a period — talk to our export desk about your volume commitment and timeline." },
      { match: /quotation|quote/i, reply: "Send your product, species, and order volume through the Contact form — we'll respond with a quotation based on current market pricing." },
      { match: /payment|deposit|t\/t|l\/c|letter of credit/i, reply: "Payment is typically 30% deposit via T/T on order confirmation, 70% before shipment. L/C is available for larger orders." },
      { match: /incoterm|fob|cif|cnf/i, reply: "We offer FOB and CIF as standard, with CNF available on request." },
      { match: /price|cost|pricing/i, reply: "Pricing depends on species, volume, and current market rates. Send your target species and volume through the Contact form and we'll come back with a quotation." },

      // ---- Order & Logistics ----
      { match: /less than.*container|partial container|split.*container/i, reply: "Our MOQ is 1 container — we don't currently offer partial-container orders." },
      { match: /third.?party.*(inspection|sgs|sucofindo)|sgs|sucofindo/i, reply: "Yes — buyers can arrange third-party pre-shipment inspection (e.g. SGS, Sucofindo) before loading. This is typically requested and paid for by the buyer, especially for first orders." },
      { match: /split.*shipment|multiple shipments/i, reply: "Yes, orders can be split across multiple shipments for larger orders — confirm scheduling with our export desk." },
      { match: /delay/i, reply: "We communicate any delay as early as possible and adjust the delivery timeline. Force majeure terms (e.g. weather-related harvest delays) are covered in the sales contract." },
      { match: /tolerance|landed weight|weight difference/i, reply: "A standard quantity tolerance of about ±5% applies, consistent with normal commodity export practice." },
      { match: /private label|custom packaging|custom label/i, reply: "Yes, private label / custom packaging can typically be arranged for larger volume orders." },
      { match: /how much fits|container.*(bag|ton)|bag.*container|packag/i, reply: "Packed in 50 kg bags: approx. 13–15 tons per 20ft container (~260–300 bags), 23–25 tons per 40ft container (~460–500 bags)." },
      { match: /which port|ship.*port|port.*ship/i, reply: "We ship from all major Indonesian ports — let us know your destination and we'll confirm feasibility." },
      { match: /moq|minimum/i, reply: "Our minimum order is 1 container. Want help estimating volume for your species of interest?" },
      { match: /how long.*(production|shipping|take)|lead time|production time/i, reply: "Typically 14–30 days, depending on species and order timeline." },
      { match: /ship|logistics/i, reply: "We ship FOB and CIF as standard (CNF on request) from major Indonesian ports. Lead time is usually 14–30 days." },

      // ---- Samples ----
      { match: /multiple.*sample|sample.*(multiple|more than one)/i, reply: "Yes — multiple species can be combined into one sample shipment." },
      { match: /sample/i, reply: "Yes, samples are available on request — just ask through the Contact form. Samples typically take up to 30 days to arrive." },

      // ---- Sourcing & Trust ----
      { match: /trader|middleman|actual supplier/i, reply: "We are the direct exporter working with our own farmer network — not a trader or middleman." },
      { match: /visit.*farm|proof of sourcing/i, reply: "Yes, farm visits can be arranged with advance notice, and photo/video documentation is also available." },
      { match: /video|photo.*(document|farm)|documentation/i, reply: "Yes, farm and warehouse documentation (photo and video) is available to share with buyers." },
      { match: /year.?round|consistent supply|seasonal.*supply/i, reply: "Cultivated species (Cottonii, Spinosum, Gracilaria) are harvested in cycles year-round; Sargassum, being wild-harvested, is more seasonal." },
      { match: /shortage|guarantee.*volume/i, reply: "We source from multiple farmer groups across regions as a buffer against shortages — advance notice is recommended for large forward orders." },
      { match: /verify.*farmer|resold|really from farmers/i, reply: "Our direct farmer network and traceability records (farm location, harvest data) back each batch — there's no broker/cooperative layer in between." },
      { match: /where.*(come from|source)|sourc/i, reply: "We source directly from smallholder farmers across Indonesia, with full traceability from farm to shipment — no cooperative or broker layer in between." },

      // ---- Appendix / company background ----
      { match: /reject|return policy|doesn'?t match on arrival|quality.*(match|dispute)/i, reply: "That falls outside standard FAQ coverage, but our export desk can walk you through our quality-dispute and rejection/return process — please reach out via the Contact form." },
      { match: /how long.*(exporting|been in business|been operating)|since when|track record/i, reply: "That's a great question for our export desk, who can share our company background and operating history — reach out via the Contact form." },
      { match: /reference|past buyer|current buyer|testimonial/i, reply: "We're happy to share buyer references — please ask through the Contact form and our export desk will follow up." },
      { match: /trial order|smaller order|start small/i, reply: "Our MOQ is 1 container per order, but talk to our export desk about your situation — they can advise on the best way to get started." },
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
