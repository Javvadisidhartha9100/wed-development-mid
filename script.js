/* To expand the website, add a new object to this list. All cards share one document icon. */
const papers = [
  {title:'On the Electrodynamics of Moving Bodies', year:1905, summary:'Introduced the special theory of relativity.', url:'https://en.wikisource.org/wiki/On_the_Electrodynamics_of_Moving_Bodies_(1920_edition)'},
  {title:'On a Heuristic Viewpoint Concerning the Production and Transformation of Light', year:1905, summary:'Proposed light quanta and explained the photoelectric effect.', url:'https://en.wikipedia.org/wiki/Annus_mirabilis_papers'},
  {title:'On the Motion of Small Particles Suspended in Stationary Liquids', year:1905, summary:'Explained Brownian motion using molecular theory.', url:'https://en.wikipedia.org/wiki/Annus_mirabilis_papers'},
  {title:'Does the Inertia of a Body Depend Upon Its Energy Content?', year:1905, summary:'Presented the relationship between mass and energy.', url:'https://en.wikisource.org/wiki/Does_the_Inertia_of_a_Body_Depend_Upon_Its_Energy-Content%3F'},
  {title:'The Field Equations of Gravitation', year:1915, summary:'Established field equations for general relativity.', url:'https://en.wikipedia.org/wiki/Einstein_field_equations'},
  {title:'The Foundation of the General Theory of Relativity', year:1916, summary:'A comprehensive account of general relativity.', url:'https://en.wikisource.org/wiki/The_Foundation_of_the_Generalised_Theory_of_Relativity'},
  {title:'Cosmological Considerations in the General Theory of Relativity', year:1917, summary:'Developed an early relativistic model of the universe.', url:'https://en.wikipedia.org/wiki/Cosmological_constant'},
  {title:'On the Quantum Theory of Radiation', year:1917, summary:'Investigated emission, absorption and stimulated radiation.', url:'https://en.wikipedia.org/wiki/Einstein_coefficients'},
  {title:'Geometry and Experience', year:1921, summary:'Examined the relationship between geometry and physical reality.', url:'https://en.wikipedia.org/wiki/Albert_Einstein_bibliography'},
  {title:'Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?', year:1935, summary:'With Podolsky and Rosen; the famous EPR argument.', url:'https://en.wikipedia.org/wiki/EPR_paradox'},
  {title:'Autobiographical Notes', year:1949, summary:'Reflections on a lifetime of scientific inquiry.', url:'https://en.wikipedia.org/wiki/Albert_Einstein_bibliography'},
  {title:'The Meaning of Relativity', year:1922, summary:'A collection of lectures explaining relativity.', url:'https://en.wikipedia.org/wiki/The_Meaning_of_Relativity'}
];
const grid = document.getElementById('paperGrid');
const info = document.getElementById('resultsInfo');
const searchInput = document.getElementById('siteSearch');
let expanded = false;
const iconMarkup = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M6 2.5h8l4 4V21H6z"/><path d="M14 2.5v4h4M9 11h6M9 14h6M9 17h5"/></svg>';
function renderPapers(){
  const term = searchInput.value.trim().toLowerCase();
  const filtered = papers.filter(p => `${p.title} ${p.year} ${p.summary}`.toLowerCase().includes(term));
  const visible = (expanded || term) ? filtered : filtered.slice(0, 8);
  grid.replaceChildren();
  visible.forEach(p => {
    const card = document.createElement('article'); card.className = 'paper-card';
    const badge = document.createElement('span'); badge.className = 'paper-icon'; badge.innerHTML = iconMarkup;
    const content = document.createElement('div'); content.className = 'paper-content';
    const year = document.createElement('span'); year.className = 'year-tag'; year.textContent = p.year;
    const title = document.createElement('h3'); title.textContent = p.title;
    const description = document.createElement('p'); description.textContent = p.summary;
    const link = document.createElement('a'); link.href = p.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.className = 'paper-link'; link.textContent = 'Read Paper →'; link.setAttribute('aria-label', `Read about ${p.title} (opens new tab)`);
    content.append(year,title,description,link); card.append(badge,content); grid.append(card);
  });
  info.textContent = term ? `${filtered.length} publication${filtered.length===1?'':'s'} found` : '';
  if(!visible.length) grid.innerHTML='<p class="empty-state">No matching papers. Try another search.</p>';
  document.getElementById('showAllPapers').innerHTML = expanded ? 'Show Featured Papers ↑' : 'View All Papers →';
}
renderPapers();
searchInput.addEventListener('input', renderPapers);
document.getElementById('searchForm').addEventListener('submit', e => {e.preventDefault(); document.getElementById('papers').scrollIntoView({behavior:'smooth'});});
document.getElementById('showAllPapers').addEventListener('click', ()=>{expanded=!expanded;renderPapers();});
const menuToggle=document.getElementById('menuToggle'), nav=document.getElementById('siteNav');
menuToggle.addEventListener('click', ()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'✕':'☰';nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}));
document.getElementById('blogToggle').addEventListener('click',e=>{const more=document.getElementById('blogMore');more.hidden=!more.hidden;e.currentTarget.setAttribute('aria-expanded',String(!more.hidden));e.currentTarget.textContent=more.hidden?'Read More →':'Read Less ↑';});
document.getElementById('year').textContent=new Date().getFullYear();
