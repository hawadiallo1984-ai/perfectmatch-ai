var REL = { mode: null, prenom: '', age: '', signe: '', coherence: 5, projet: 5 };

function selectRelMode(mode, el) {
  REL.mode = mode;
  document.querySelectorAll('.rel-mode-card').forEach(function(c){ c.classList.remove('selected'); });
  el.classList.add('selected');
  document.getElementById('relForm').style.display = 'block';
  document.getElementById('relResult').style.display = 'none';
  document.getElementById('relForm').scrollIntoView({ behavior: 'smooth' });
}

async function analyzeRelation() {
  var a = STATE.answers;
  var r = REL;
  var greenFlags = Array.from(document.querySelectorAll('[data-fid="rel_green"].sel')).map(function(e){ return e.dataset.val; });
  var redFlags = Array.from(document.querySelectorAll('[data-fid="rel_red"].sel')).map(function(e){ return e.dataset.val; });
  var dispo = (document.querySelector('[data-fid="rel_dispo"].sel') || {}).dataset.val || '?';
  var feeling = (document.querySelector('[data-fid="rel_feeling"].sel') || {}).dataset.val || '?';
  var comm = (document.querySelector('[data-fid="rel_comm"].sel') || {}).dataset.val || '?';
  var valeurs = Array.from(document.querySelectorAll('[data-fid="rel_valeurs"].sel')).map(function(e){ return e.dataset.val; });

  document.getElementById('relResult').style.display = 'none';
  var btn = document.querySelector('#relForm .btn-next');
  btn.textContent = 'Analyse en cours... ✨';
  btn.disabled = true;

  var userProfile = "Mon profil: " + (a.prenom||'moi') + ", " + (a.age||'?') + " ans, attachement=" + (a.attach||'?') + ", valeurs=" + JSON.stringify(a.valeurs) + ", love_lang=" + (a.love_lang||'?');
  var partnerProfile = "Partenaire: " + (r.prenom||'?') + ", " + (r.age||'?') + " ans, signe=" + r.signe + ", disponibilite=" + dispo + ", coherence=" + r.coherence + "/10, feeling=" + feeling + ", communication=" + comm + ", valeurs_percues=" + JSON.stringify(valeurs) + ", projet_vie=" + r.projet + "/10, green_flags=" + JSON.stringify(greenFlags) + ", red_flags=" + JSON.stringify(redFlags) + ", concern=" + (document.getElementById('rel_concern').value||'aucun') + ", mode=" + r.mode;

  var sys = 'Tu es PerfectMatch, expert en compatibilite relationnelle. Reponds UNIQUEMENT en JSON valide sans backticks:
{"score_global":number(0-100),"verdict":string,"resume":string(2-3 phrases),"dimensions":[{"nom":string,"score":number,"analyse":string}],"green_flags_analyse":[{"flag":string,"signification":string}],"red_flags_analyse":[{"flag":string,"signification":string,"urgence":"faible|modere|eleve"}],"dynamique":string,"pronostic":{"court_terme":string,"long_terme":string},"conseil_cle":string,"message":string}
Sois honnete, nuance, sans complaisance. Si red flags serieux, dis-le clairement. Langue: ' + curLang;

  try {
    var resp = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: sys,
        messages: [{ role: 'user', content: userProfile + '
' + partnerProfile }]
      })
    });
    var data = await resp.json();
    var raw = (data.content || []).map(function(b){ return b.text || ''; }).join('').replace(/```json|```/g,'').trim();
    var result = JSON.parse(raw);
    showRelResult(result, r, greenFlags, redFlags);
  } catch(e) {
    showRelResult(buildRelFallback(r, greenFlags, redFlags), r, greenFlags, redFlags);
  }

  btn.textContent = 'Analyser notre compatibilite ✨';
  btn.disabled = false;
}

function buildRelFallback(r, green, red) {
  var score = Math.max(20, Math.min(95, 60 + green.length * 5 - red.length * 8 + (r.coherence - 5) * 3));
  return {
    score_global: score,
    verdict: score > 75 ? "Compatibilite prometteuse" : score > 50 ? "Relation a potentiel, points a surveiller" : "Signaux d'alerte importants",
    resume: "L'analyse croisee de vos profils revele " + (score > 70 ? "une bonne base de compatibilite avec des zones de croissance mutuelle." : "des points de friction significatifs qui meritent attention avant de s'engager davantage."),
    dimensions: [
      { nom: "Disponibilite emotionnelle", score: r.coherence * 10, analyse: "Evaluee a partir de tes observations comportementales." },
      { nom: "Alignement des valeurs", score: Math.min(95, 50 + green.length * 8), analyse: "Base sur les valeurs percues et les green flags observes." },
      { nom: "Projet de vie commun", score: r.projet * 10, analyse: "Selon ton evaluation de l'alignement sur les projets de vie." },
      { nom: "Securite relationnelle", score: Math.max(10, 80 - red.length * 15), analyse: red.length > 2 ? "Les red flags detectes impactent significativement ce score." : "Peu de signaux negatifs observes." }
    ],
    green_flags_analyse: green.map(function(f){ return { flag: f, signification: "Signal positif observe dans la relation." }; }),
    red_flags_analyse: red.map(function(f){ return { flag: f, signification: "Point d'attention a surveiller.", urgence: red.length > 3 ? "eleve" : "modere" }; }),
    dynamique: "La dynamique entre vous semble " + (r.coherence > 6 ? "relativement stable" : "parfois imprévisible") + ".",
    pronostic: {
      court_terme: green.length > red.length ? "Les prochaines semaines peuvent etre positives si la communication reste ouverte." : "Des tensions pourraient emerger si les red flags ne sont pas adresses.",
      long_terme: score > 70 ? "Potentiel de relation durable si les bases sont consolidees." : "Une conversation honnete sur les attentes respectives est necessaire."
    },
    conseil_cle: red.length > 2 ? "Prends du recul et observe si ces comportements persistent. Ne minimise pas tes observations." : "Continue d'observer la coherence entre les actes et les paroles.",
    message: "Cet analyse est base sur ce que tu observes — pas sur la realite complete de l'autre personne. Fais confiance a tes ressentis tout en restant ouvert·e a la decouverte."
  };
}

function showRelResult(r, rel, green, red) {
  var res = document.getElementById('relResult');
  res.style.display = 'block';

  var scoreColor = r.score_global > 75 ? 'var(--green)' : r.score_global > 50 ? 'var(--gold)' : 'var(--red)';
  var urgenceColor = { faible: 'var(--amber)', modere: 'var(--rose)', eleve: 'var(--red)' };

  var html = '<div class="rel-score-wrap">';
  html += '<div style="font-family:Italiana,serif;font-size:3.5rem;color:' + scoreColor + ';line-height:1">' + r.score_global + '%</div>';
  html += '<div style="font-size:.8rem;color:var(--muted);margin-bottom:.5rem">score de compatibilite</div>';
  html += '<div style="font-family:Italiana,serif;font-size:1.6rem;margin-bottom:.5rem">' + r.verdict + '</div>';
  html += '<p class="pt" style="max-width:540px;margin:0 auto">' + r.resume + '</p>';
  html += '</div>';

  // Dimensions
  html += '<div class="blk"><div class="blk-hd"><span class="blk-ico">📊</span><span class="blk-t">Dimensions analysees</span></div>';
  (r.dimensions || []).forEach(function(d) {
    html += '<div class="dim-r"><div class="dim-lbl">' + d.nom + '</div><div class="dim-bw"><div class="dim-b" data-s="' + d.score + '"></div></div><div class="dim-s">' + d.score + '%</div></div>';
    html += '<p style="font-size:.78rem;color:var(--muted);margin-bottom:.75rem;padding-left:0">' + d.analyse + '</p>';
  });
  html += '</div>';

  // Green flags
  if (r.green_flags_analyse && r.green_flags_analyse.length > 0) {
    html += '<div class="blk"><div class="blk-hd"><span class="blk-ico">✅</span><span class="blk-t">Green flags analyses</span></div>';
    r.green_flags_analyse.forEach(function(g) {
      html += '<div class="rel-alert green"><span class="rel-alert-ico">✅</span><div><div class="rel-alert-t">' + g.flag + '</div><div class="rel-alert-d">' + g.signification + '</div></div></div>';
    });
    html += '</div>';
  }

  // Red flags
  if (r.red_flags_analyse && r.red_flags_analyse.length > 0) {
    html += '<div class="blk"><div class="blk-hd"><span class="blk-ico">🚨</span><span class="blk-t">Red flags analyses</span></div>';
    r.red_flags_analyse.forEach(function(rf) {
      var urg = rf.urgence || 'modere';
      var ico = urg === 'eleve' ? '🚨' : urg === 'modere' ? '⚠️' : 'ℹ️';
      html += '<div class="rel-alert ' + (urg === 'eleve' ? 'red' : 'amber') + '"><span class="rel-alert-ico">' + ico + '</span><div><div class="rel-alert-t">' + rf.flag + ' <span style="font-size:.7rem;opacity:.7">[' + urg + ']</span></div><div class="rel-alert-d">' + rf.signification + '</div></div></div>';
    });
    html += '</div>';
  }

  // Dynamique + Pronostic
  html += '<div class="blk"><div class="blk-hd"><span class="blk-ico">🔮</span><span class="blk-t">Dynamique et pronostic</span></div>';
  html += '<p class="pt"><strong style="color:var(--gold)">Dynamique actuelle :</strong> ' + r.dynamique + '</p>';
  if (r.pronostic) {
    html += '<p class="pt"><strong style="color:var(--gold)">Court terme :</strong> ' + r.pronostic.court_terme + '</p>';
    html += '<p class="pt"><strong style="color:var(--gold)">Long terme :</strong> ' + r.pronostic.long_terme + '</p>';
  }
  html += '</div>';

  // Conseil cle
  html += '<div class="blk" style="border-color:rgba(212,168,67,.3)"><div class="blk-hd"><span class="blk-ico">🎯</span><span class="blk-t">Conseil cle</span></div>';
  html += '<p class="pt" style="font-size:1rem">' + r.conseil_cle + '</p></div>';

  // Message final
  html += '<div class="final-blk"><div class="blk-hd" style="border-bottom:1px solid rgba(212,168,67,.15)"><span class="blk-ico">💌</span><span class="blk-t">Message pour toi</span></div>';
  html += '<p class="final-msg">"' + r.message + '"</p></div>';

  // Disclaimer
  html += '<div class="bias-i binfo" style="border-color:var(--border)"><span class="bi-ico">📋</span><div><div class="bi-t">Limite importante</div><div class="bi-d">Cette analyse est basee sur ta perception de l'autre personne — pas sur son profil reel. Elle peut contenir des biais de projection ou d'idealisation. Utilise-la comme outil de reflexion, pas comme verdict definitif.</div></div></div>';

  // Reset button
  html += '<div class="rpt-actions" style="margin-top:1.5rem"><button class="btn-rpt btn-rpt-s" onclick="resetRelation()">🔄 Evaluer une autre relation</button><button class="btn-rpt btn-rpt-g" onclick="window.print()">🖨️ Imprimer</button></div>';

  res.innerHTML = html;
  res.scrollIntoView({ behavior: 'smooth' });

  setTimeout(function() {
    res.querySelectorAll('.dim-b').forEach(function(b) {
      var s = b.dataset.s; b.style.width = '0';
      setTimeout(function(){ b.style.width = s + '%'; }, 100);
    });
  }, 300);
}

function resetRelation() {
  REL = { mode: null, prenom: '', age: '', signe: '', coherence: 5, projet: 5 };
  document.querySelectorAll('.rel-mode-card').forEach(function(c){ c.classList.remove('selected'); });
  document.querySelectorAll('[data-fid]').forEach(function(c){ if(c.dataset.fid && c.dataset.fid.indexOf('rel_')===0) c.classList.remove('sel'); });
  document.getElementById('relForm').style.display = 'none';
  document.getElementById('relResult').style.display = 'none';
  window.scrollTo(0, 0);
}
