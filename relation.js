// PerfectMatch - Ma relation + Match modal v4
var relMode = null;

// showMatchModal doit etre definie AVANT DOMContentLoaded
function showMatchModal() {
  var existing = document.getElementById("matchModal");
  if (existing) { existing.style.display = "flex"; return; }
  var modal = document.createElement("div");
  modal.id = "matchModal";
  modal.style.cssText = "position:fixed;inset:0;background:rgba(7,7,13,.92);z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem";
  var inner = document.createElement("div");
  inner.style.cssText = "background:var(--card);border:2px solid #e8547a;border-radius:14px;padding:2.5rem;max-width:480px;width:100%;text-align:center";
  inner.innerHTML = "<h3 style='font-family:Italiana,serif;font-size:1.8rem;color:#e8547a;margin-bottom:.75rem'>Rejoindre Match</h3>"
    + "<p style='color:var(--muted);margin-bottom:1.5rem;font-size:.9rem'>Le matching psycho-authentique. 3 profils compatibles par semaine, bases sur ton profil PerfectMatch. Zero photo obligatoire.</p>"
    + "<p style='color:var(--gold);font-size:.85rem;margin-bottom:1.5rem'>Lancement previsionnel - rejoins la liste en priorite a 67 EUR/mois.</p>"
    + "<input type='email' id='matchEmail' placeholder='ton@email.com' style='width:100%;padding:12px;border:1px solid var(--border2);border-radius:8px;background:var(--card2);color:var(--text);margin-bottom:1rem;box-sizing:border-box'>"
    + "<button id='matchJoinBtn' style='width:100%;padding:14px;background:#e8547a;border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:.95rem;margin-bottom:.75rem'>Rejoindre la liste prioritaire</button>"
    + "<button id='matchCloseBtn' style='background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:.85rem'>Fermer</button>";
  modal.appendChild(inner);
  document.body.appendChild(modal);
  document.getElementById("matchCloseBtn").addEventListener("click", function() {
    modal.style.display = "none";
  });
  document.getElementById("matchJoinBtn").addEventListener("click", function() {
    var email = document.getElementById("matchEmail").value;
    if (!email || !email.includes("@")) { alert("Email invalide"); return; }
    fetch("/api/subscribe", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email: email, plan: "match_waitlist", consent: true })
    }).catch(function(){});
    inner.innerHTML = "<div style='font-size:3rem;margin-bottom:1rem'>&#x1F491;</div>"
      + "<h3 style='font-family:Italiana,serif;font-size:1.8rem;color:#e8547a'>Tu es sur la liste !</h3>"
      + "<p style='color:var(--muted);margin-top:.75rem'>On te contacte en priorite au lancement du matching psycho.</p>"
      + "<button id='matchCloseBtn2' style='margin-top:1.5rem;background:transparent;border:1px solid var(--border2);border-radius:6px;color:var(--text);padding:8px 20px;cursor:pointer'>Fermer</button>";
    document.getElementById("matchCloseBtn2").addEventListener("click", function() {
      modal.style.display = "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  var relFormEl=document.getElementById("relForm"); if(relFormEl) relFormEl.dataset.orig=relFormEl.innerHTML;
  // Match button
  var mb = document.getElementById("matchBtn");
  if (mb) mb.addEventListener("click", showMatchModal);

  // Relation mode selection
  ["rMode1", "rMode2", "rMode3"].forEach(function(id, idx) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.cursor = "pointer";
    el.addEventListener("click", function() {
      relMode = ["attraction", "debut", "couple"][idx];
      ["rMode1","rMode2","rMode3"].forEach(function(x) {
        var e = document.getElementById(x);
        if (e) { e.style.borderColor = ""; e.style.background = ""; }
      });
      el.style.borderColor = "var(--gold)";
      el.style.background = "rgba(212,168,67,.07)";
      var rff=document.getElementById("relForm"); if(rff.dataset.orig) rff.innerHTML=rff.dataset.orig;
      document.getElementById("relForm").style.display = "block";
      document.getElementById("relResult").style.display = "none";
      document.getElementById("relForm").scrollIntoView({behavior: "smooth"});
    });
  });

  // Analyser button
  var btn = document.getElementById("relBtn");
  if (btn) {
    btn.addEventListener("click", function() {
      var green = [];
      var red = [];
      document.querySelectorAll(".cc.sel").forEach(function(e) {
        if (e.dataset.fid === "rel_green") green.push(e.dataset.val);
        if (e.dataset.fid === "rel_red") red.push(e.dataset.val);
      });
      var sc = Math.max(20, Math.min(95, 60 + green.length * 5 - red.length * 8));
      var v = sc > 75 ? "Relation prometteuse" : sc > 50 ? "Potentiel avec vigilance" : "Signaux alerte";
      var col = sc > 75 ? "var(--green)" : sc > 50 ? "var(--gold)" : "var(--red)";
      var h = "<div style='padding:2rem;text-align:center'>";
      h += "<div style='font-family:Italiana,serif;font-size:3.5rem;color:" + col + "'>" + sc + "%</div>";
      h += "<div style='font-family:Italiana,serif;font-size:1.5rem;margin:.5rem 0'>" + v + "</div>";
      h += "<p style='color:var(--muted)'>Green: " + green.length + " | Red: " + red.length + "</p>";
      h += "<button onclick=\"document.getElementById('relResult').style.display='none'\" style='margin-top:1.5rem;border:1px solid var(--border2);background:transparent;color:var(--text);padding:10px 24px;border-radius:6px;cursor:pointer'>Evaluer une autre</button>";
      h += "</div>";
      document.getElementById("relResult").innerHTML = h;
      document.getElementById("relResult").style.display = "block";
      document.getElementById("relResult").scrollIntoView({behavior: "smooth"});
    });
  }
});
// PerfectMatch - Toxic Profile Assessment Module
// Based on: Dark Triad (Paulhus & Williams 2002), DSM-5, ICD-11, Johnson 2008

var TOXIC_DIMS = [
  { id:"narc", label:"Narcissisme", icon:"&#x1F451;", questions:[
    {id:"n1", q:"Il/elle parle constamment de lui/elle-meme et ramene tout a lui/elle"},
    {id:"n2", q:"Il/elle reagit tres mal aux critiques (colere, attaque, bouderie)"},
    {id:"n3", q:"Il/elle s'attend a des privileges speciaux - les regles ne s'appliquent pas a lui/elle"},
    {id:"n4", q:"Il/elle manque d'empathie reelle - n'est pas genuinement interesse(e) par ton vecu"}
  ]},
  { id:"mach", label:"Machiavélisme", icon:"&#x1F3AD;", questions:[
    {id:"m1", q:"Il/elle manipule les situations pour obtenir ce qu'il/elle veut"},
    {id:"m2", q:"Il/elle utilise tes confidences contre toi ulterieurement"},
    {id:"m3", q:"Il/elle est tres different(e) selon les personnes presentes (double visage)"},
    {id:"m4", q:"Il/elle ment facilement quand ca lui est utile"}
  ]},
  { id:"psyc", label:"Psychopathie subclinique", icon:"&#x1F9CA;", questions:[
    {id:"p1", q:"Il/elle ne semble pas affecte(e) par la souffrance des autres (froideur)"},
    {id:"p2", q:"Il/elle agit impulsivement sans considerer les consequences sur les autres"},
    {id:"p3", q:"Il/elle ne reconnait jamais ses torts et n'exprime pas de remords authentiques"},
    {id:"p4", q:"Il/elle cherche constamment de nouvelles sensations fortes, prend des risques"}
  ]},
  { id:"sad", label:"Sadisme quotidien", icon:"&#x26A1;", questions:[
    {id:"s1", q:"Il/elle semble prendre plaisir quand tu souffres ou es en difficulte"},
    {id:"s2", q:"Il/elle utilise l'humour pour te blesser, puis dit 'c'etait juste une blague'"},
    {id:"s3", q:"Il/elle critique ou humilie devant les autres"}
  ]},
  { id:"bord", label:"Instabilité emotionnelle", icon:"&#x1F32A;", questions:[
    {id:"b1", q:"Ses reactions emotionnelles sont disproportionnees aux situations"},
    {id:"b2", q:"Il/elle passe vite de t'idealiser totalement a te devaloriser completement"},
    {id:"b3", q:"Il/elle menace de partir, de se faire du mal ou de tout detruire lors des conflits"}
  ]},
  { id:"ctrl", label:"Contrôle coercitif", icon:"&#x1F512;", questions:[
    {id:"c1", q:"Il/elle surveille tes deplacements, messages ou contacts"},
    {id:"c2", q:"Il/elle t'eloigne progressivement de ta famille et de tes amis"},
    {id:"c3", q:"Il/elle controle tes finances, decisions ou apparence"},
    {id:"c4", q:"Il/elle reagit mal quand tu penses ou decides differemment de lui/elle"}
  ]},
  { id:"agg", label:"Agression et violence", icon:"&#x1F6A8;", questions:[
    {id:"a1", q:"Il/elle crie, insulte ou te rabaisse lors des conflits"},
    {id:"a2", q:"Il/elle a eu des gestes intimidants (bousculade, frapper objets, bloquer le passage)"},
    {id:"a3", q:"Tu marches sur des oeufs pour ne pas le/la mettre en colere"},
    {id:"a4", q:"Il/elle te menace (de partir, de te nuire, de detruire quelque chose d'important)"}
  ]},
  { id:"gas", label:"Gaslighting", icon:"&#x1F32B;", questions:[
    {id:"g1", q:"Il/elle nie des faits dont tu es certain(e) : 'tu inventes', 'tu es fou/folle'"},
    {id:"g2", q:"Apres les conflits, tu te sens coupable sans vraiment savoir pourquoi"},
    {id:"g3", q:"Il/elle reecrit l'histoire des evenements pour te faire douter de ta memoire"}
  ]},
  { id:"love", label:"Love bombing / cycles", icon:"&#x1F4A3;", questions:[
    {id:"l1", q:"Au debut, il/elle etait parfait(e) - intensite excessive, declarations tres rapides"},
    {id:"l2", q:"Apres les crises, il/elle redevient parfait(e) puis le cycle recommence"},
    {id:"l3", q:"Il/elle utilise l'affection comme recompense et la retire comme punition"}
  ]},
  { id:"anti", label:"Traits antisociaux", icon:"&#x26A0;", questions:[
    {id:"t1", q:"Il/elle ne respecte pas les regles ou lois sans en etre affecte(e)"},
    {id:"t2", q:"Il/elle a un historique de conflits serieux (ex-partenaires, collegues, famille)"},
    {id:"t3", q:"Il/elle n'honore pas ses engagements (promesses, dettes, responsabilites)"}
  ]}
];

var OPTS_FREQ = ["Jamais","Parfois","Souvent","Toujours"];
var toxicAnswers = {};

function showToxicAssessment() {
  var relForm = document.getElementById("relForm");
  if (!relForm) return;
  relForm.style.display = "block";

  var container = document.createElement("div");
  container.id = "toxicForm";

  var intro = document.createElement("div");
  intro.className = "blk";
  intro.style.cssText = "border-color:rgba(239,68,68,.3)";
  intro.innerHTML = "<div class='blk-hd'><span class='blk-ico'>&#x1F6A8;</span>"
    + "<span class='blk-t' style='color:var(--red)'>Analyse de profil preoccupant</span></div>"
    + "<p class='pt' style='font-size:.85rem'>Reponds en te basant sur des comportements que tu as <strong>observes</strong> - pas sur tes craintes ou suppositions. "
    + "Chaque reponse est confidentielle et ne remplace pas un avis medical ou juridique.</p>"
    + "<div class='bias-i bwarn'><span class='bi-ico'>&#x2139;&#xFE0F;</span><div><div class='bi-t'>Limite importante</div>"
    + "<div class='bi-d'>Cet outil mesure des tendances comportementales observables. Il ne pose aucun diagnostic clinique. "
    + "Si tu te sens en danger, contacte le 3919 (violences conjugales) ou le 15/17/18.</div></div></div>";
  container.appendChild(intro);

  TOXIC_DIMS.forEach(function(dim) {
    var section = document.createElement("div");
    section.className = "blk";
    section.innerHTML = "<div class='blk-hd'><span class='blk-ico'>" + dim.icon + "</span>"
      + "<span class='blk-t'>" + dim.label + "</span></div>";

    dim.questions.forEach(function(qq) {
      var qDiv = document.createElement("div");
      qDiv.className = "fg";
      qDiv.style.marginBottom = "1.25rem";
      var label = document.createElement("label");
      label.className = "fl";
      label.style.fontSize = ".88rem";
      label.textContent = qq.q;
      qDiv.appendChild(label);

      var opts = document.createElement("div");
      opts.className = "cg c4";
      OPTS_FREQ.forEach(function(opt, idx) {
        var card = document.createElement("div");
        card.className = "cc";
        card.style.cssText = "padding:.6rem;text-align:center;font-size:.75rem";
        card.textContent = opt;
        card.dataset.qid = qq.id;
        card.dataset.val = idx;
        card.addEventListener("click", function() {
          opts.querySelectorAll(".cc").forEach(function(c) { c.classList.remove("sel"); });
          card.classList.add("sel");
          toxicAnswers[qq.id] = idx;
        });
        opts.appendChild(card);
      });
      qDiv.appendChild(opts);
      section.appendChild(qDiv);
    });
    container.appendChild(section);
  });

  var btn = document.createElement("button");
  btn.className = "btn-next";
  btn.style.cssText = "width:100%;margin-top:1rem;background:var(--red);border-color:var(--red)";
  btn.textContent = "Analyser ce profil &#x1F6A8;";
  btn.addEventListener("click", analyzeToxicProfile);
  container.appendChild(btn);

  relForm.innerHTML = "";
  relForm.appendChild(container);
  relForm.scrollIntoView({behavior: "smooth"});
}

async function analyzeToxicProfile() {
  var btn = document.querySelector("#toxicForm .btn-next");
  if (btn) { btn.textContent = "Analyse en cours..."; btn.disabled = true; }

  // Calculate scores per dimension
  var dimScores = {};
  TOXIC_DIMS.forEach(function(dim) {
    var total = 0;
    var answered = 0;
    dim.questions.forEach(function(qq) {
      if (toxicAnswers[qq.id] !== undefined) {
        total += toxicAnswers[qq.id];
        answered++;
      }
    });
    dimScores[dim.id] = answered > 0 ? Math.round((total / (answered * 3)) * 100) : 0;
  });

  var globalScore = Math.round(Object.values(dimScores).reduce(function(a,b){return a+b;},0) / TOXIC_DIMS.length);

  // Identify critical dimensions (score > 60)
  var criticals = TOXIC_DIMS.filter(function(d) { return dimScores[d.id] > 60; });
  var warnings = TOXIC_DIMS.filter(function(d) { return dimScores[d.id] > 40 && dimScores[d.id] <= 60; });

  try {
    var sys = "Tu es PerfectMatch, psychologue specialise en protection relationnelle. Reponds UNIQUEMENT en JSON sans backticks: {verdict:string,niveau_alerte:string('faible'|'modere'|'eleve'|'critique'),resume:string,dimensions_critiques:[{nom:string,score:number,analyse:string,signification_concrete:string}],signaux_prioritaires:[string],conseils:[string],ressources:[string],message_protection:string}. Utilise un langage clair, empatique et non clinique. Ne pose pas de diagnostic. Si elements graves, recommande aide professionnelle.";

    var dimData = TOXIC_DIMS.map(function(d) {
      return d.label + ": " + dimScores[d.id] + "%";
    }).join(", ");

    var resp = await fetch("/api/claude", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: sys,
        messages: [{role:"user", content:"Scores observes: " + dimData + ". Score global: " + globalScore + "%. Dimensions critiques (>60%): " + criticals.map(function(d){return d.label;}).join(", ") + ". Genere une analyse de protection relationnelle complete."}]
      })
    });
    var data = await resp.json();
    var raw = (data.content||[]).map(function(b){return b.text||"";}).join("").replace(/```json|```/g,"").trim();
    showToxicResult(JSON.parse(raw), dimScores, globalScore);
  } catch(e) {
    showToxicFallback(dimScores, globalScore, criticals, warnings);
  }

  if (btn) { btn.textContent = "Analyser ce profil"; btn.disabled = false; }
}

function showToxicFallback(dimScores, globalScore, criticals, warnings) {
  var niveauAlerte = globalScore > 70 ? "critique" : globalScore > 50 ? "eleve" : globalScore > 30 ? "modere" : "faible";
  var result = {
    verdict: globalScore > 70 ? "Profil hautement preoccupant" : globalScore > 50 ? "Profil preoccupant" : globalScore > 30 ? "Signaux a surveiller" : "Peu de signaux detectes",
    niveau_alerte: niveauAlerte,
    resume: "L'analyse des comportements observes revele " + (criticals.length > 0 ? criticals.length + " dimension(s) critique(s) necessitant une attention immediate." : "quelques points d'attention a surveiller dans le temps."),
    dimensions_critiques: criticals.map(function(d) {
      return {nom: d.label, score: dimScores[d.id], analyse: "Score eleve sur cette dimension.", signification_concrete: "Ces comportements peuvent impacter significativement ton bien-etre."};
    }),
    signaux_prioritaires: criticals.slice(0,3).map(function(d) { return d.label + " (" + dimScores[d.id] + "%)"; }),
    conseils: ["Documente les comportements observes (dates, faits)", "Parle de ta situation a une personne de confiance", "Consulte un professionnel si tu te sens en danger"],
    ressources: ["3919 - Violences conjugales (gratuit, 24h/24)", "arretonslesviolences.gouv.fr"],
    message_protection: "Tu as eu le courage d'evaluer cette situation. Prends soin de toi - ton bien-etre passe avant tout."
  };
  showToxicResult(result, dimScores, globalScore);
}

function showToxicResult(r, dimScores, globalScore) {
  var res = document.getElementById("relResult");
  if (!res) return;
  res.style.display = "block";

  var alertColors = {faible:"var(--green)", modere:"var(--amber)", eleve:"var(--rose)", critique:"var(--red)"};
  var alertCol = alertColors[r.niveau_alerte] || "var(--amber)";

  var h = "<div style='background:linear-gradient(135deg,var(--card),rgba(239,68,68,.05));border:2px solid " + alertCol + ";border-radius:16px;padding:2.5rem;text-align:center;margin-bottom:1.5rem'>";
  h += "<div style='font-size:2.5rem;margin-bottom:.5rem'>&#x1F6A8;</div>";
  h += "<div style='font-family:Italiana,serif;font-size:2rem;color:" + alertCol + ";margin-bottom:.5rem'>" + r.verdict + "</div>";
  h += "<div style='display:inline-block;background:" + alertCol + ";color:#fff;font-size:.72rem;font-weight:700;padding:4px 14px;border-radius:100px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem'>Niveau: " + (r.niveau_alerte || "modere") + "</div>";
  h += "<p style='color:var(--muted);font-size:.9rem;max-width:560px;margin:0 auto'>" + r.resume + "</p>";
  h += "</div>";

  // Dimensions bar chart
  h += "<div class='blk'><div class='blk-hd'><span class='blk-ico'>&#x1F4CA;</span><span class='blk-t'>Scores par dimension</span></div>";
  TOXIC_DIMS.forEach(function(dim) {
    var sc = dimScores[dim.id] || 0;
    var barCol = sc > 70 ? "var(--red)" : sc > 40 ? "var(--amber)" : "var(--green)";
    h += "<div class='dim-r'><div class='dim-lbl'>" + dim.icon + " " + dim.label + "</div>";
    h += "<div class='dim-bw'><div class='dim-b' style='width:" + sc + "%;background:" + barCol + "'></div></div>";
    h += "<div class='dim-s'>" + sc + "%</div></div>";
  });
  h += "</div>";

  // Critical dimensions
  if (r.dimensions_critiques && r.dimensions_critiques.length > 0) {
    h += "<div class='blk' style='border-color:rgba(239,68,68,.3)'><div class='blk-hd'><span class='blk-ico'>&#x26A0;&#xFE0F;</span><span class='blk-t' style='color:var(--red)'>Dimensions critiques</span></div>";
    r.dimensions_critiques.forEach(function(d) {
      h += "<div class='bias-i bdanger' style='margin-bottom:.75rem'><span class='bi-ico'>&#x1F6A8;</span><div>";
      h += "<div class='bi-t'>" + d.nom + " — " + d.score + "%</div>";
      h += "<div class='bi-d'>" + d.analyse + "</div>";
      if (d.signification_concrete) h += "<div class='bi-d' style='margin-top:.3rem;font-style:italic'>" + d.signification_concrete + "</div>";
      h += "</div></div>";
    });
    h += "</div>";
  }

  // Signaux prioritaires
  if (r.signaux_prioritaires && r.signaux_prioritaires.length > 0) {
    h += "<div class='blk'><div class='blk-hd'><span class='blk-ico'>&#x1F4CD;</span><span class='blk-t'>Signaux prioritaires</span></div>";
    r.signaux_prioritaires.forEach(function(s) {
      h += "<div class='bias-i bwarn'><span class='bi-ico'>&#x26A0;</span><div class='bi-d'>" + s + "</div></div>";
    });
    h += "</div>";
  }

  // Conseils
  if (r.conseils && r.conseils.length > 0) {
    h += "<div class='blk'><div class='blk-hd'><span class='blk-ico'>&#x1F6E1;&#xFE0F;</span><span class='blk-t'>Conseils de protection</span></div>";
    r.conseils.forEach(function(c, i) {
      h += "<div style='display:flex;gap:.75rem;padding:.5rem 0;border-bottom:1px solid var(--border)'>";
      h += "<span style='color:var(--gold);font-weight:700;min-width:20px'>" + (i+1) + "</span>";
      h += "<span style='font-size:.88rem;color:var(--text)'>" + c + "</span></div>";
    });
    h += "</div>";
  }

  // Ressources
  if (r.ressources && r.ressources.length > 0) {
    h += "<div class='blk' style='border-color:rgba(212,168,67,.3)'><div class='blk-hd'><span class='blk-ico'>&#x1F4DE;</span><span class='blk-t'>Ressources d'aide</span></div>";
    r.ressources.forEach(function(res) {
      h += "<div class='bias-i bok'><span class='bi-ico'>&#x2705;</span><div class='bi-d'>" + res + "</div></div>";
    });
    h += "</div>";
  }

  // Message de protection
  h += "<div class='final-blk'><div class='blk-hd' style='border-bottom:1px solid rgba(212,168,67,.15)'>";
  h += "<span class='blk-ico'>&#x1F48C;</span><span class='blk-t'>Message pour toi</span></div>";
  h += "<p class='final-msg'>" + r.message_protection + "</p></div>";

  // Disclaimer obligatoire
  h += "<div class='bias-i binfo'><span class='bi-ico'>&#x1F4CB;</span><div>";
  h += "<div class='bi-t'>Limite importante</div>";
  h += "<div class='bi-d'>Cette analyse est basee sur tes observations et ne constitue pas un diagnostic clinique. Si tu te sens en danger, contacte le <strong>3919</strong> (violences conjugales, gratuit 24h/24) ou les services d'urgence.</div></div></div>";

  h += "<div class='rpt-actions' style='margin-top:1.5rem'>";
  h += "<button class='btn-rpt btn-rpt-s' onclick=\"document.getElementById('relResult').style.display='none';document.getElementById('relForm').style.display='none'\">&#x1F504; Nouvelle analyse</button>";
  h += "</div>";

  res.innerHTML = h;
  res.scrollIntoView({behavior: "smooth"});
}

// Add rMode4 toxic mode listener
document.addEventListener("DOMContentLoaded", function() {
  var rm4 = document.getElementById("rMode4");
  if (rm4) {
    rm4.addEventListener("click", function() {
      ["rMode1","rMode2","rMode3","rMode4"].forEach(function(x) {
        var e = document.getElementById(x);
        if (e) { e.style.borderColor = ""; e.style.background = ""; }
      });
      rm4.style.borderColor = "var(--red)";
      rm4.style.background = "rgba(239,68,68,.07)";
      toxicAnswers = {};
      showToxicAssessment();
    });
  }
});
