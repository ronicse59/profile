/* ==========================================================================
   Portfolio interactions — vanilla JS, no dependencies.
   1) Mobile sidebar toggle
   2) Scrollspy: highlights the active section link in the sidebar
   3) Timeline reveal: fades in "waypoint" cards as they enter the viewport
   ========================================================================== */
(function () {
  "use strict";

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Mobile sidebar ---------------- */
  var sidebar = document.getElementById("sidebar");
  var toggle = document.getElementById("navToggle");
  var closeBtn = document.getElementById("navClose");
  var scrim = document.getElementById("navScrim");

  function openNav() {
    sidebar.classList.add("is-open");
    scrim.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    sidebar.classList.remove("is-open");
    scrim.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle) toggle.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (scrim) scrim.addEventListener("click", closeNav);

  document.querySelectorAll(".sidenav__link").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* ---------------- Scrollspy ---------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".sidenav__link"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------------- Journey path reveal (staggered) ---------------- */
  var journeyNodes = document.querySelectorAll(".journey-path__node");
  if ("IntersectionObserver" in window && journeyNodes.length) {
    var journeyReveal = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var index = Array.prototype.indexOf.call(journeyNodes, entry.target);
            entry.target.style.transitionDelay = (index * 90) + "ms";
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    journeyNodes.forEach(function (node) { journeyReveal.observe(node); });
  } else {
    journeyNodes.forEach(function (node) { node.classList.add("is-visible"); });
  }

  /* ---------------- Timeline reveal ---------------- */
  var timelineItems = document.querySelectorAll(".timeline__item");
  if ("IntersectionObserver" in window && timelineItems.length) {
    var reveal = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    timelineItems.forEach(function (item) { reveal.observe(item); });
  } else {
    timelineItems.forEach(function (item) { item.classList.add("is-visible"); });
  }
})();
