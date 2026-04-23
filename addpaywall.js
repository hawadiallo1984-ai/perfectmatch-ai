var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');

var pw = [
  "  // PAYWALL - free users see only score + dimensions",
  "  var notFree = (isPaid === true);",
  "  if (!notFree) {",
  "    html += '<div class=\"lock-blk\" style=\"margin:2rem 0;text-align:center;padding:2.5rem;border:2px solid rgba(212,168,67,.3);border-radius:16px;background:linear-gradient(135deg,var(--card),rgba(212,168,67,.05))\">';",
  "    html += '<div style=\"font-size:3rem;margin-bottom:1rem\">&#x1F511;</div>';",
  "    html += '<div style=\"font-family:Italiana,serif;font-size:1.8rem;color:var(--gold);margin-bottom:.75rem\">Debloquez votre rapport complet</div>';",
  "    html += '<p style=\"color:var(--muted);margin-bottom:1.5rem;max-width:480px;margin-left:auto;margin-right:auto\">Biais cognitifs, recommandations personnalisees, analyse critique et message final vous attendent.</p>';",
  "    html += '<button class=\"btn-hero btn-hero-p\" onclick=\"openPayModal(\\'astro\\',27)\" style=\"max-width:280px;width:100%\">Rapport complet + Luna &#x2728; - 27&#x20AC;</button>';",
  "    html += '<p style=\"color:var(--muted);font-size:.75rem;margin-top:1rem\">La sante emotionnelle est un droit. PerfectMatch rend la psychologie accessible a tous.</p>';",
  "    html += '</div>';",
  "    C.innerHTML = html;",
  "    setTimeout(function(){ C.querySelectorAll('.dim-b').forEach(function(b){ var s=b.dataset.s; b.style.width='0'; setTimeout(function(){ b.style.width=s+'%'; },100); }); }, 300);",
  "    return;",
  "  }",
  ""
].join('\n');

c = c.replace('  // BIAIS', pw + '  // BIAIS');

fs.writeFileSync('index.html', c);
console.log('done - Debloquez count:', (c.match(/Debloquez/g)||[]).length);
