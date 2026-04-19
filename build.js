var fs=require('fs');
var c=fs.readFileSync('index.html','utf8');
var bi=c.lastIndexOf('<\/body>');
var page='<div class="page" id="page-relation"><div style="padding:3rem;text-align:center"><h2 style="font-family:Italiana,serif;color:var(--gold)">Evalue ta relation</h2><p style="color:var(--muted)">Fonctionnalite complete disponible prochainement.<br>En attendant, fais ton quiz complet pour un rapport personnalise.</p><button class="btn-hero btn-hero-p" onclick="showPage(chr39quizchromechrome39)">Faire mon test ✨</button></div></div>';
c=c.slice(0,bi)+page+c.slice(bi);
fs.writeFileSync('index.html',c);
console.log('done:'+c.split(chr39
chromechrome39).length);