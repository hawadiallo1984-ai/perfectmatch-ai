var fs=require("fs");
var c=fs.readFileSync("index.html","utf8");
var p="<div class=page id=page-relation>"+
"<div id=rMode1 class=cc style=cursor:pointer>Attraction</div>"+
"<div id=rMode2 class=cc style=cursor:pointer>Debut</div>"+
"<div id=rMode3 class=cc style=cursor:pointer>En couple</div>"+
"<div id=relForm style="display:none"><button id=relBtn class=btn-next>Analyser</button></div>"+
"<div id=relResult style="display:none"></div></div>";
var bi=c.lastIndexOf("<"+"/body>");
c=c.slice(0,bi)+p+c.slice(bi);
fs.writeFileSync("index.html",c);
console.log("done:"+c.split("
").length);
