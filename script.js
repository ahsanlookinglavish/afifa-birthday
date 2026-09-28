/* ================================================================
   SCRIPT.JS
   ================================================================
   This file handles every interactive moment on the page:

     1. The opening screen (black -> warm, then reveals the button)
     2. "open this" button scrolling down to the reveal section
     3. Scroll-triggered fade-ins for every section
     4. The candle "blow out" interaction + floating particles
     5. Hidden notes (tap to reveal a message)
     6. The background music toggle

   You do NOT need to edit this file to change text, photos, or
   colors — all of that lives in index.html and style.css. This
   file only controls *behavior*, not content.
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
history.scrollRestoration = "manual";
window.scrollTo(0, 0);

  /* ============================================================
     1. OPENING SCREEN SEQUENCE
     ============================================================
     A few seconds after the page loads, we add the "is-warm"
     class to the opening screen, which slowly fades its black
     background toward ivory (see style.css, .opening.is-warm).
     ============================================================ */
  const opening = document.getElementById("opening");

  setTimeout(function () {
    opening.classList.add("is-warm");
  }, 1600); // ✏️ change this number (in milliseconds) to adjust timing

  /* Clicking "open this" scrolls smoothly down to the reveal section */
  const openButton = document.getElementById("openButton");
  const revealSection = document.getElementById("reveal");

const bgAudio = document.getElementById("bgAudio");
const musicPlayer = document.getElementById("musicPlayer");
const musicToggle = document.getElementById("musicToggle");

function startMusic() {
  if (!bgAudio.paused) return;
  bgAudio.play().then(function () {
    musicPlayer.classList.add("is-playing");
    musicToggle.setAttribute("aria-label", "Pause music");
  }).catch(function (err) {
    console.log("Music blocked or missing:", err);
  });
}

openButton.addEventListener("click", function () {
  document.body.classList.add("is-opened");
  revealSection.scrollIntoView({ behavior: "smooth" });
  startMusic();
});

// backup: if she taps/clicks anywhere before the music starts, start it
document.addEventListener("click", startMusic, { once: true });


  /* ============================================================
     2. SCROLL-TRIGGERED REVEALS
     ============================================================
     We use an IntersectionObserver, which is a built-in browser
     tool that simply watches elements and tells us when they
     scroll into view. When that happens, we add the class
     "is-visible" to that element, which triggers its CSS
     animation (defined in style.css).
     ============================================================ */
  const revealTargets = document.querySelectorAll(
    "#reveal, .polaroid, .note-card, .ifyw__line, .letter__paper, #final"
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Once revealed, we don't need to watch it anymore.
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25, // element must be 25% visible before it animates in
    }
  );

  revealTargets.forEach(function (target) {
    revealObserver.observe(target);
  });


  /* ============================================================
     3. CANDLE INTERACTION
     ============================================================
     Clicking/tapping the flame:
       - adds "is-blown" class (extinguishes the flame, shows smoke)
       - spawns a handful of small floating gold particles
       - reveals the "Make a wish." text
     ============================================================ */
  const candle = document.getElementById("candleTarget");
  const wishText = document.getElementById("wishText");

  candle.addEventListener("click", function () {
    // If it's already blown out, do nothing on repeat clicks.
    if (candle.classList.contains("is-blown")) return;

    candle.classList.add("is-blown");
    spawnParticles(candle);

    setTimeout(function () {
      wishText.classList.add("is-visible");
    }, 700);
  });

  // Creates small floating "ember" particles near the candle flame.
  function spawnParticles(originEl) {
    const rect = originEl.getBoundingClientRect();
    const particleCount = 14; // ✏️ change this to add/remove particles

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random size, so particles don't look mechanically identical
      const size = 3 + Math.random() * 4;
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      // Start near the top of the candle (where the flame was)
      const startX = rect.left + rect.width / 2 + (Math.random() * 60 - 30);
      const startY = rect.top + 40;
      particle.style.left = startX + "px";
      particle.style.top = startY + "px";

      // Slight random delay so they don't all move in unison
      particle.style.animationDelay = (Math.random() * 0.4) + "s";

      document.body.appendChild(particle);

      // Clean up the particle element after its animation finishes
      setTimeout(function () {
        particle.remove();
      }, 4200);
    }
  }


  /* ============================================================
     4. HIDDEN NOTES
     ============================================================
     Each "seal" button has a data-note attribute holding its
     message (set in index.html). Clicking one displays that
     message in the .revealed-note element below the grid.
     ============================================================ */
  const noteSeals = document.querySelectorAll(".note-seal");
  const revealedNote = document.getElementById("revealedNote");

  noteSeals.forEach(function (seal) {
    seal.addEventListener("click", function () {
      const message = seal.getAttribute("data-note");

      // Fade out, swap text, fade back in
      revealedNote.classList.remove("is-visible");

      setTimeout(function () {
        revealedNote.textContent = message;
        revealedNote.classList.add("is-visible");
      }, 200);

      // Mark this seal as opened (small visual state change)
      seal.classList.add("is-opened");
    });
  });


  /* ============================================================
     5. MUSIC TOGGLE
     ============================================================
     Music never autoplays (browsers block this anyway, and it's
     more polite to let her choose). Clicking the note icon plays
     or pauses assets/song.mp3.
     ============================================================ */

  musicToggle.addEventListener("click", function () {
    if (bgAudio.paused) {
      // .play() returns a Promise; if there's no valid audio file yet,
      // this simply fails quietly instead of breaking the page.
      bgAudio.play().catch(function () {
        console.log("No music file found yet — add one at assets/song.mp3");
      });
      musicPlayer.classList.add("is-playing");
      musicToggle.setAttribute("aria-label", "Pause music");
    } else {
      bgAudio.pause();
      musicPlayer.classList.remove("is-playing");
      musicToggle.setAttribute("aria-label", "Play music");
    }
  });

});
