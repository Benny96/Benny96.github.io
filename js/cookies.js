/* Aviso de cookies y carga condicionada de Google Analytics.
   - GA solo se carga si el visitante pulsa "Aceptar".
   - La decisión se guarda en localStorage (clave cookie_consent_v1), no se envía a ningún servidor.
   - Cualquier enlace con el atributo data-cookie-settings reabre el aviso para cambiar la decisión. */
(function () {
  var GA_ID = 'G-S50FXJLQDC';
  var KEY = 'cookie_consent_v1';
  var es = (document.documentElement.lang || 'en').toLowerCase().indexOf('es') === 0;
  var T = es ? {
    text: 'Uso cookies de analítica (Google Analytics) para entender cómo se usa esta web. Solo se activan si las aceptas. Puedes cambiar tu decisión cuando quieras.',
    accept: 'Aceptar', reject: 'Rechazar', more: 'Política de cookies', link: '/es/cookies/', label: 'Aviso de cookies'
  } : {
    text: 'I use analytics cookies (Google Analytics) to understand how this site is used. They are only set if you accept. You can change your choice at any time.',
    accept: 'Accept', reject: 'Reject', more: 'Cookie policy', link: '/cookies/', label: 'Cookie notice'
  };

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (window.__gaLoaded) { window['ga-disable-' + GA_ID] = false; return; }
    window.__gaLoaded = true;
    window['ga-disable-' + GA_ID] = false;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function clearGA() {
    window['ga-disable-' + GA_ID] = true;
    var names = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); })
      .filter(function (n) { return n === '_ga' || n.indexOf('_ga_') === 0; });
    var host = location.hostname, parts = host.split('.');
    var domains = ['', host, '.' + (parts.length > 2 ? parts.slice(-2).join('.') : host)];
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function hide() {
    var b = document.getElementById('cookie-banner');
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }

  function decide(v) {
    set(v);
    if (v === 'granted') loadGA(); else clearGA();
    hide();
  }

  function show() {
    hide();
    var b = document.createElement('div');
    b.id = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', T.label);
    var p = document.createElement('p');
    p.textContent = T.text + ' ';
    var a = document.createElement('a');
    a.href = T.link; a.textContent = T.more;
    p.appendChild(a);
    var actions = document.createElement('div');
    actions.className = 'cookie-actions';
    var rej = document.createElement('button'); rej.type = 'button'; rej.textContent = T.reject;
    var acc = document.createElement('button'); acc.type = 'button'; acc.textContent = T.accept;
    rej.onclick = function () { decide('denied'); };
    acc.onclick = function () { decide('granted'); };
    actions.appendChild(rej); actions.appendChild(acc);
    b.appendChild(p); b.appendChild(actions);
    document.body.appendChild(b);
  }

  function init() {
    var links = document.querySelectorAll('[data-cookie-settings]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) { e.preventDefault(); show(); });
    }
    var c = get();
    if (c === 'granted') loadGA();
    else if (c !== 'denied') show();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
