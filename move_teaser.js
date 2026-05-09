var fs = require('fs');
var c = fs.readFileSync('app/page.tsx', 'utf8');

// Remove old teaser from near footer
var oldTeaserStart = '\n      <section style={{background:"linear-gradient(135deg,rgba(142,122,181,0.15)';
var oldTeaserEnd = 'Decouvrir Emotiflex Digital</a></div></section>\n';
var startIdx = c.indexOf(oldTeaserStart);
var endIdx = c.indexOf(oldTeaserEnd);
if (startIdx > 0 && endIdx > 0) {
  c = c.slice(0, startIdx) + c.slice(endIdx + oldTeaserEnd.length);
  console.log('Old teaser removed');
}

// New teaser before offers section
var teaser = `
      <section style={{
        background: 'linear-gradient(135deg,rgba(142,122,181,0.15),rgba(201,162,75,0.08))',
        borderTop: '2px solid rgba(201,162,75,0.4)',
        borderBottom: '2px solid rgba(201,162,75,0.4)',
        padding: '4rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <div style={{display:'inline-block',background:'rgba(201,162,75,0.1)',border:'1px solid rgba(201,162,75,0.3)',color:'#C9A24B',fontSize:'.75rem',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',padding:'5px 14px',borderRadius:'100px',marginBottom:'1.25rem'}}>
            Nouveau
          </div>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:700,marginBottom:'.75rem'}}>
            Emotiflex <em style={{color:'#C9A24B'}}>Digital</em>
          </h2>
          <p style={{color:'#A9A3B8',fontSize:'.95rem',lineHeight:1.6,marginBottom:'2rem'}}>
            Le module d&apos;intelligence emotionnelle de PerfectMatch. Cartes, check-in quotidien, IA de reformulation et exercices de couple.
          </p>
          <a href="/emotiflex" style={{display:'inline-block',background:'linear-gradient(135deg,#C9A24B,#A87C2A)',color:'#0B0A14',fontWeight:700,fontSize:'.95rem',padding:'14px 36px',borderRadius:'4px',textDecoration:'none'}}>
            Decouvrir Emotiflex Digital
          </a>
        </div>
      </section>
`;

c = c.replace('      <section id="offres"', teaser + '      <section id="offres"');
fs.writeFileSync('app/page.tsx', c);
console.log('done');
