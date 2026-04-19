import sys

with open('index.html','r') as f:
    c = f.read()

q = chr(39)
dq = chr(34)

page = (
    '<div class="page" id="page-relation">'
    '<div style="max-width:800px;margin:0 auto;padding:3rem 1.5rem 6rem">'
    '<div style="text-align:center;padding:2rem">'
    '<span style="font-size:2.5rem">&#x1F491;</span>'
    '<h2 style="font-family:Italiana,serif;font-size:2.5rem;color:var(--gold);margin:.75rem 0">Evalue ta relation</h2>'
    '<p style="color:var(--muted);margin-bottom:2rem">Tu as quelqu un en tete ? Obtiens un score honnete.</p>'
    '</div>'
    '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:2rem">'
    '<div class="cc" style="padding:1.5rem;text-align:center" onclick="selectRelMode(' + q + 'attraction' + q + ',this)"><div style="font-size:2rem">&#x1F525;</div><div style="font-family:Italiana,serif">Attraction</div></div>'
    '<div class="cc" style="padding:1.5rem;text-align:center" onclick="selectRelMode(' + q + 'debut' + q + ',this)"><div style="font-size:2rem">&#x1F331;</div><div style="font-family:Italiana,serif">Debut relation</div></div>'
    '<div class="cc" style="padding:1.5rem;text-align:center" onclick="selectRelMode(' + q + 'couple' + q + ',this)"><div style="font-size:2rem">&#x1F48D;</div><div style="font-family:Italiana,serif">En couple</div></div>'
    '</div>'
    '<div id="relForm" style="display:none">'
    '<div class="blk"><div class="blk-hd"><span class="blk-ico">&#x1F6A6;</span><span class="blk-t">Signaux observes</span></div>'
    '<div class="fg"><label class="fl">Green flags</label><div class="cg c2">'
    '<div class="cc" data-fid="rel_green" data-val="coherent" onclick="selC(' + q + 'rel_green' + q + ',' + q + 'coherent' + q + ',true,this)"><span class="cc-ico">&#x2705;</span><div class="cc-t">Dit ce qu il fait</div></div>'
    '<div class="cc" data-fid="rel_green" data-val="ecoute" onclick="selC(' + q + 'rel_green' + q + ',' + q + 'ecoute' + q + ',true,this)"><span class="cc-ico">&#x1F442;</span><div class="cc-t">Ecoute vraiment</div></div>'
    '<div class="cc" data-fid="rel_green" data-val="respect" onclick="selC(' + q + 'rel_green' + q + ',' + q + 'respect' + q + ',true,this)"><span class="cc-ico">&#x1F91D;</span><div class="cc-t">Respecte mes limites</div></div>'
    '<div class="cc" data-fid="rel_green" data-val="confiance" onclick="selC(' + q + 'rel_green' + q + ',' + q + 'confiance' + q + ',true,this)"><span class="cc-ico">&#x1F513;</span><div class="cc-t">En confiance</div></div>'
    '</div></div>'
    '<div class="fg" style="margin-top:1rem"><label class="fl">Red flags</label><div class="cg c2">'
    '<div class="cc" data-fid="rel_red" data-val="incoherent" onclick="selC(' + q + 'rel_red' + q + ',' + q + 'incoherent' + q + ',true,this)"><span class="cc-ico">&#x26A0;</span><div class="cc-t">Dit une chose fait l autre</div></div>'
    '<div class="cc" data-fid="rel_red" data-val="chaud_froid" onclick="selC(' + q + 'rel_red' + q + ',' + q + 'chaud_froid' + q + ',true,this)"><span class="cc-ico">&#x1F321;</span><div class="cc-t">Chaud froid</div></div>'
    '<div class="cc" data-fid="rel_red" data-val="controle" onclick="selC(' + q + 'rel_red' + q + ',' + q + 'controle' + q + ',true,this)"><span class="cc-ico">&#x1F517;</span><div class="cc-t">Controlant</div></div>'
    '</div></div>'
    '<button class="btn-next" onclick="analyzeRelation()" style="width:100%;margin-top:1rem">Analyser \u2728</button>'
    '</div>'
    '<div id="relResult" style="display:none"></div>'
    '</div></div>'
)

js = (
    '\nvar REL={mode:null,coherence:5};\n'
    'function selectRelMode(m,el){'
    'REL.mode=m;'
    'el.style.borderColor="var(--gold)";'
    'el.style.background="rgba(212,168,67,.07)";'
    'document.getElementById("relForm").style.display="block";'
    'document.getElementById("relResult").style.display="none";'
    'document.getElementById("relForm").scrollIntoView({behavior:"smooth"});'
    '}\n'
    'function resetRelation(){'
    'document.getElementById("relForm").style.display="none";'
    'document.getElementById("relResult").style.display="none";'
    'window.scrollTo(0,0);'
    '}\n'
    'function analyzeRelation(){'
    'var green=Array.from(document.querySelectorAll(".cc.sel")).filter(function(e){return e.dataset.fid==="rel_green";}).map(function(e){return e.dataset.val;});'
    'var red=Array.from(document.querySelectorAll(".cc.sel")).filter(function(e){return e.dataset.fid==="rel_red";}).map(function(e){return e.dataset.val;});'
    'var sc2=Math.max(20,Math.min(95,60+green.length*5-red.length*8));'
    'var v=sc2>75?"Prometteuse":sc2>50?"Potentiel":"Signaux alerte";'
    'var h="<div style=padding:2rem;text-align:center>";'
    'h+="<div style=font-family:Italiana,serif;font-size:3rem;color:var(--gold)>"+sc2+"%</div>";'
    'h+="<div style=font-family:Italiana,serif;font-size:1.4rem;margin:.5rem>"+v+"</div>";'
    'h+="<p style=color:var(--muted)>Green: "+green.length+" | Red: "+red.length+"</p>";'
    'h+="<button onclick=resetRelation() style=margin-top:1rem;border:1px solid var(--border);background:transparent;color:var(--text);padding:8px 20px;border-radius:6px;cursor:pointer>Recommencer</button>";'
    'h+="</div>";'
    'document.getElementById("relResult").innerHTML=h;'
    'document.getElementById("relResult").style.display="block";'
    'document.getElementById("relResult").scrollIntoView({behavior:"smooth"});'
    '}\n'
)

bi = c.rfind('</body>')
c = c[:bi] + page + c[bi:]

si = c.rfind('</script>')
c = c[:si] + js + '</script>' + c[si+9:]

with open('index.html','w') as f:
    f.write(c)

print('done:', len(c.splitlines()), 'lines')
