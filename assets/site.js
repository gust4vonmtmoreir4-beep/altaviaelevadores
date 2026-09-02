/* Altavia Elevadores — interatividade da versão estática */
(function () {
  var NAV = [
    { label: "Projetos", href: "projetos/" },
    { label: "Contato", href: "contato/" },
    { label: "Quem somos", href: "quem-somos/" },
    { label: "Alugue para Eventos", href: "aluguel-para-eventos/" },
  ];
  var BASE = document.body.getAttribute("data-base") || "";
  var WHATS =
    "https://wa.me/5585984799463?text=Ol%C3%A1%2C%20cheguei%20pelo%20site%2C%20gostaria%20de%20um%20or%C3%A7amento%C2%A0gratuito!";

  /* ---------- menu mobile ---------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  if (toggle) {
    var menu = null;
    toggle.addEventListener("click", function () {
      if (menu) {
        menu.remove();
        menu = null;
        return;
      }
      menu = document.createElement("nav");
      menu.className = "mx-5 rounded-md bg-dark/95 p-5 lg:hidden";
      var html = '<ul class="flex flex-col gap-4">';
      NAV.forEach(function (i) {
        html +=
          '<li><a class="text-dark-foreground" href="' + BASE + i.href + '">' + i.label + "</a></li>";
      });
      html +=
        '<li><a target="_blank" rel="noreferrer" class="inline-block rounded-md bg-primary px-5 py-2.5 font-bold text-primary-foreground" href="' +
        WHATS +
        '">Solicitar orçamento</a></li></ul>';
      menu.innerHTML = html;
      toggle.closest("header").appendChild(menu);
    });
  }

  /* ---------- barra de cookies ---------- */
  var cookie = document.querySelector("[data-cookie-bar]");
  if (cookie) {
    if (localStorage.getItem("altavia-cookies") === "ok") {
      cookie.remove();
    } else {
      cookie.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          localStorage.setItem("altavia-cookies", "ok");
          cookie.remove();
        });
      });
    }
  }

  /* ---------- FAQ ---------- */
  var faq = document.querySelector("[data-faq]");
  if (faq) {
    var items = faq.querySelectorAll("[data-faq-item]");
    items.forEach(function (item, i) {
      var btn = item.querySelector("[data-faq-q]");
      var panel = item.querySelector("[data-faq-a]");
      if (!btn || !panel) return;
      var up = btn.querySelector("[data-icon-up]");
      var down = btn.querySelector("[data-icon-down]");
      var setOpen = function (open) {
        panel.style.display = open ? "" : "none";
        if (up) up.style.display = open ? "" : "none";
        if (down) down.style.display = open ? "none" : "";
      };
      setOpen(i === 0);
      btn.addEventListener("click", function () {
        var isOpen = panel.style.display !== "none";
        items.forEach(function (other) {
          var p = other.querySelector("[data-faq-a]");
          var u = other.querySelector("[data-icon-up]");
          var d = other.querySelector("[data-icon-down]");
          if (p) p.style.display = "none";
          if (u) u.style.display = "none";
          if (d) d.style.display = "";
        });
        if (!isOpen) setOpen(true);
      });
    });
  }

  /* ---------- slider do hero ---------- */
  var hero = document.querySelector("[data-hero]");
  if (hero) {
    var slides = hero.querySelectorAll("[data-slide]");
    var dots = hero.querySelectorAll("[data-dot]");
    var titleEl = hero.querySelector("[data-hero-title]");
    var textEl = hero.querySelector("[data-hero-text]");
    var index = 0;
    var data = [];
    slides.forEach(function (s) {
      data.push({
        title: (s.getAttribute("data-title") || "").split("|"),
        text: s.getAttribute("data-text") || "",
      });
    });
    var render = function () {
      slides.forEach(function (s, i) {
        s.classList.toggle("opacity-100", i === index);
        s.classList.toggle("opacity-0", i !== index);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("bg-primary", i === index);
        d.classList.toggle("bg-muted-foreground/40", i !== index);
      });
      if (titleEl)
        titleEl.innerHTML = data[index].title
          .map(function (l) {
            return '<span class="block">' + l + "</span>";
          })
          .join("");
      if (textEl) textEl.textContent = data[index].text;
    };
    var go = function (dir) {
      index = (index + dir + slides.length) % slides.length;
      render();
    };
    var prev = hero.querySelector("[data-prev]");
    var next = hero.querySelector("[data-next]");
    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    dots.forEach(function (d, i) {
      d.addEventListener("click", function () {
        index = i;
        render();
      });
    });
    setInterval(function () { go(1); }, 7000);
    render();
  }
})();
