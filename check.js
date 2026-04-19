var fs=require("fs"),vm=require("vm");
var h=fs.readFileSync("index.html","utf8");
var s=h.indexOf("<script>"),e=h.lastIndexOf("</script>");
var js=h.slice(s+8,e),lines=js.split(String.fromCharCode(10));
var lo=0,hi=lines.length;
while(lo<hi-1){var mid=Math.floor((lo+hi)/2);try{new vm.Script(lines.slice(0,mid).join(String.fromCharCode(10)));hi=mid;}catch(err){lo=mid;}}
console.log("Error JS line",lo);
for(var i=Math.max(0,lo-3);i<lo+3;i++)console.log(i+1,JSON.stringify(lines[i]).substring(0,100));