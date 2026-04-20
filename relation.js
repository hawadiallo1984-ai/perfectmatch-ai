// PerfectMatch - Ma relation module
var relMode = null;

document.addEventListener("DOMContentLoaded", function() {
  // Mode selection
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
      h += "<button onclick='document.getElementById(\"relResult\").style.display=\"none\";document.getElementById(\"relForm\").style.display=\"none\";[\"rMode1\",\"rMode2\",\"rMode3\"].forEach(function(x){var e=document.getElementById(x);if(e){e.style.borderColor=\"\";e.style.background=\"\";}})' style='margin-top:1.5rem;border:1px solid var(--border2);background:transparent;color:var(--text);padding:10px 24px;border-radius:6px;cursor:pointer'>Evaluer une autre</button>";
      h += "</div>";
      document.getElementById("relResult").innerHTML = h;
      document.getElementById("relResult").style.display = "block";
      document.getElementById("relResult").scrollIntoView({behavior: "smooth"});
    });
  }
});
