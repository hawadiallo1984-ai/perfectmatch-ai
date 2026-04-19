const fs=require("fs"),vm=require("vm");
const h=fs.readFileSync("index.html","utf8");
const s=h.indexOf("<script>"),e=h.lastIndexOf("</script>");
const js=h.slice(s+8,e),lines=js.split("\n");
let lo=0,hi=lines.length;
while(lo<hi-1){const mid=Math.floor((lo+hi)/2);try{new vm.Script(lines.slice(0,mid).join("\n"));hi=mid;}catch(err){lo=mid;}}
console.log("Error JS line",lo);
for(let i=Math.max(0,lo-3);i<lo+3;i++)console.log(i+1,JSON.stringify(lines[i]).substring(0,100));
