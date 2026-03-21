// ============ DATA ============
const tagColors = {
  'Tech':       {bg:'rgba(0,255,170,0.12)', color:'#00ffaa', lbg:'rgba(0,168,107,0.12)', lcolor:'#007a4d'},
  'Event Recap':{bg:'rgba(123,140,255,0.15)', color:'#7b8cff', lbg:'rgba(100,110,220,0.1)', lcolor:'#4a55cc'},
  'Announcement':{bg:'rgba(255,107,53,0.15)', color:'#ff6b35', lbg:'rgba(220,80,30,0.1)', lcolor:'#b54010'},
  'Project':    {bg:'rgba(255,209,102,0.15)', color:'#ffd166', lbg:'rgba(200,150,0,0.1)', lcolor:'#8a6000'},
};

const authors = {
  'Meera Joshi':   {initials:'MJ', role:'Web Lead'},
  'Aditya Rao':    {initials:'AR', role:'Content Creator'},
  'Alex Kumar':    {initials:'AK', role:'President'},
  'Dev Singh':     {initials:'DS', role:'Events Head'},
  'Sneha Iyer':    {initials:'SI', role:'Associate Lead'},
  'Pooja Gupta':   {initials:'PG', role:'Designer'},
};

const posts = [
  {
    id:0, pinned:true,
    tag:'Tech', emoji:'🧠',
    title:'Building TerraTech\'s Club Website: A Deep Dive',
    excerpt:'How the Content & Web team designed and shipped a full-stack club site with dual themes, particle networks, and Supabase-powered forms — in a single sprint.',
    author:'Meera Joshi', date:'Mar 18, 2025', read:'8 min read',
    content:`
      <h3>The Brief</h3>
      <p>When the Core Committee asked for a full club website before HackTerra 2025, we had three weeks and one developer. The challenge wasn't just technical — it was about creating something that felt authentically TerraTech.</p>
      <h3>Dual Theme Architecture</h3>
      <p>The hardest part was designing two completely different visual identities. The dark mode had to feel like a terminal — deep green-blacks, electric accent, particle networks. The light mode needed to be editorial and clean without feeling like a recolor.</p>
      <div class="code-block">:root { --bg: #050a07; --accent: #00ffaa; }
[data-theme="light"] { --bg: #fafff9; --accent: #00a86b; }</div>
      <p>We ended up using CSS custom properties scoped to a <code>data-theme</code> attribute, toggled via JS. Each mode has its own card style — glassmorphism for dark, flat shadows for light.</p>
      <h3>Particle Canvas</h3>
      <p>The animated particle network in dark mode was a deliberate choice — it evokes a connected community and a hacker aesthetic simultaneously. We wrote it in vanilla Canvas API, capping at 60 nodes for performance.</p>
      <h3>Supabase Integration</h3>
      <p>Both the contact form and the membership application post directly to Supabase tables via the REST API. No backend needed.</p>
      <ul>
        <li>contact_submissions — name, email, subject, message, submitted_at</li>
        <li>membership_applications — full form payload + applied_at</li>
      </ul>
      <h3>What We Learned</h3>
      <p>Single-file HTML can scale further than you'd expect if you stay disciplined about structure. The biggest bottleneck wasn't code — it was copy and design decisions. Start with content first, then style it.</p>
    `,
    tags:['Tech','Web Dev','Behind the Scenes'],
  },
  {
    id:1,
    tag:'Event Recap', emoji:'💻',
    title:'HackTerra 2024: 48 Hours, 12 Teams, 1 Winner',
    excerpt:'Our debut hackathon brought together 80+ students, three sleepless nights, and some genuinely impressive submissions. Here\'s the full recap.',
    author:'Dev Singh', date:'Mar 12, 2025', read:'6 min read',
    content:`
      <h3>It Started With a Countdown</h3>
      <p>At exactly 6:00 PM on March 10, the countdown hit zero and 12 teams scattered to their corners of the lab. HackTerra 2024 was officially live.</p>
      <h3>The Themes</h3>
      <p>Teams could pick from three tracks — AI/ML, Web3, or Open Innovation. Most went with Open Innovation, which produced the most creative outcomes.</p>
      <h3>Standout Projects</h3>
      <ul>
        <li><strong>CampusNav</strong> — BFS-powered indoor navigation for the college building. Won Best Technical Implementation.</li>
        <li><strong>GreenMeter</strong> — Carbon footprint tracker for college canteen meals. Won Best Social Impact.</li>
        <li><strong>ByteBazaar</strong> — P2P marketplace for student resources. Won Overall Winner.</li>
      </ul>
      <h3>By the Numbers</h3>
      <p>83 participants, 12 teams, 3 judges, 2 all-nighters, and 1 very proud organizing committee. We ran out of coffee at 3 AM on Day 2. There are no regrets.</p>
      <h3>What's Next</h3>
      <p>HackTerra 2025 is already in the works — bigger prizes, more mentors, and a dedicated hardware track. Registration opens March 8.</p>
    `,
    tags:['Event Recap','Hackathon','2024'],
  },
  {
    id:2,
    tag:'Announcement', emoji:'📢',
    title:'HackTerra 2025 Registrations Are Now Open',
    excerpt:'Bigger prizes, new tracks, and hardware support — HackTerra 2025 is here. Registration closes March 9. Don\'t sleep on it.',
    author:'Alex Kumar', date:'Mar 8, 2025', read:'3 min read',
    content:`
      <h3>It's Back</h3>
      <p>After a sold-out debut last year, HackTerra 2025 is officially open for registrations. This year we're doubling the team slots and adding a dedicated hardware track.</p>
      <h3>What's New</h3>
      <ul>
        <li>Hardware Track — Raspberry Pi kits available on loan</li>
        <li>Mentor pool expanded to 8 industry mentors</li>
        <li>Cash prizes up to ₹15,000 for the overall winner</li>
        <li>Category prizes for Best UI/UX, Best AI, Best Social Impact</li>
      </ul>
      <h3>How to Register</h3>
      <p>Head to the Join Us page or use the registration link in our Discord. Form teams of 2–4. You can also register solo and we'll help you find a team.</p>
      <div class="code-block">Registration deadline: March 9, 2025 · 11:59 PM IST
Team size: 2–4 members
Venue: Main Computer Lab + Seminar Hall</div>
      <p>Questions? Drop them in #hackterra-2025 on Discord. See you there.</p>
    `,
    tags:['Announcement','Hackathon','2025'],
  },
  {
    id:3,
    tag:'Tech', emoji:'🤖',
    title:'Getting Started with LLM APIs: A Student\'s Guide',
    excerpt:'You don\'t need a GPU farm to build with AI. Here\'s how to plug into modern LLM APIs, handle tokens, and ship something real without burning your wallet.',
    author:'Sneha Iyer', date:'Mar 5, 2025', read:'10 min read',
    content:`
      <h3>Why LLMs Are Accessible Now</h3>
      <p>Two years ago, running a language model required serious compute. Today, you can make an API call from a browser and get a GPT-4-class response for a fraction of a cent. The barrier to building AI products has never been lower.</p>
      <h3>Picking an API</h3>
      <p>The big three for student projects are OpenAI, Anthropic, and Google Gemini. All offer free tiers or low-cost credits. For anything involving reasoning or code, start with Claude or GPT-4o-mini.</p>
      <h3>Your First API Call</h3>
      <div class="code-block">const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Explain recursion briefly.' }]
  })
});
const data = await res.json();
console.log(data.content[0].text);</div>
      <h3>Token Economics</h3>
      <p>Tokens are roughly 0.75 words. A typical student project prompt is 200–500 tokens. With most APIs pricing at $0.001–0.003 per 1K tokens, you can do thousands of calls on a $5 credit.</p>
      <h3>Practical Tips</h3>
      <ul>
        <li>Always set a max_tokens limit to avoid runaway costs</li>
        <li>Use system prompts to constrain the model's behavior</li>
        <li>Cache responses where the input is always the same</li>
        <li>Log all API calls during development</li>
      </ul>
    `,
    tags:['Tech','AI','Tutorial'],
  },
  {
    id:4,
    tag:'Event Recap', emoji:'🎤',
    title:'DevTalks Vol.2: Notes From the Stage',
    excerpt:'Three speakers, two hours, and a room full of students who stayed well past the scheduled end time. Here\'s what went down at DevTalks Vol.2.',
    author:'Aditya Rao', date:'Feb 22, 2025', read:'5 min read',
    content:`
      <h3>The Setup</h3>
      <p>DevTalks Vol.2 was held in the Seminar Hall on Feb 20. Three speakers. A room that fit 80 but somehow had 100 people in it. Our sound system almost didn't make it.</p>
      <h3>Talk 1: The Boring Parts of Great Software</h3>
      <p>Rahul Verma (SDE at Google, TerraTech alum) opened with something counterintuitive — the most impactful work he does isn't the flashy features. It's documentation, code review, and incident postmortems. The room got uncomfortably quiet.</p>
      <h3>Talk 2: From Intern to Founding Engineer</h3>
      <p>Dev Patel walked us through how he went from a summer internship to employee #4 at a seed-stage startup. His advice: pick companies where you can see the whole stack, not just your slice of it.</p>
      <h3>Talk 3: What Actually Matters in ML Projects</h3>
      <p>Aisha Khan closed with a reality check on ML: 80% of the work is data cleaning. She walked through a real feature pipeline from her team at Flipkart and showed how much complexity lives before the model ever sees a row.</p>
      <h3>Q&A Highlights</h3>
      <p>Best question of the night: "How do you handle imposter syndrome on a senior team?" Rahul's answer: "You never fully stop feeling it. You just get better at shipping anyway."</p>
    `,
    tags:['Event Recap','Talks','Community'],
  },
  {
    id:5,
    tag:'Project', emoji:'🛰️',
    title:'CampusNav: Building BFS Pathfinding for Our College',
    excerpt:'A walkthrough of the indoor navigation project that won Best Technical Implementation at HackTerra 2024 — graph modeling, BFS, and all the edge cases nobody warned us about.',
    author:'Sneha Iyer', date:'Feb 15, 2025', read:'12 min read',
    content:`
      <h3>The Problem</h3>
      <p>Our college has 6 floors, 4 wings, and a staircase placement that makes no sense. New students spend the first week getting lost. We built CampusNav to fix that — a web app that gives you turn-by-turn directions between any two rooms.</p>
      <h3>Modeling the Building as a Graph</h3>
      <p>Each room, corridor junction, staircase landing, and elevator stop is a node. Edges represent walkable connections between them, weighted by estimated walking time in seconds.</p>
      <div class="code-block">const graph = {
  'A101': [['A102', 5], ['A_CORRIDOR', 8]],
  'A102': [['A101', 5], ['A_CORRIDOR', 6]],
  'A_CORRIDOR': [['A101', 8], ['A102', 6], ['STAIR_A1', 12]],
  // ...
};</div>
      <h3>BFS for Shortest Path</h3>
      <p>We used BFS for unweighted shortest paths (fewest doors/junctions) and Dijkstra for time-weighted paths. The difference matters — the "shortest" route isn't always the fastest if it goes through a crowded staircase.</p>
      <h3>The Edge Cases</h3>
      <ul>
        <li>Locked rooms during exam periods — we added a "temporarily unavailable" flag per node</li>
        <li>Elevators vs stairs — user preference toggles which edges are available</li>
        <li>Outdoor shortcuts between wings — modeled as high-weight edges with a weather toggle</li>
      </ul>
      <h3>What We'd Do Differently</h3>
      <p>The manual graph construction took 6 hours. Next version uses a visual editor to define nodes by clicking on a floor plan image. That's a weekend project waiting to happen.</p>
    `,
    tags:['Project','Algorithms','Web Dev'],
  },
  {
    id:6,
    tag:'Announcement', emoji:'📅',
    title:'CTF Championship — Registration Closes April 10',
    excerpt:'Our biggest CTF yet is less than a month away. Here\'s everything you need to know: format, categories, prizes, and how to register before the deadline.',
    author:'Alex Kumar', date:'Feb 28, 2025', read:'4 min read',
    content:`
      <h3>Mark Your Calendars</h3>
      <p>The TerraTech CTF Championship is happening on April 20 — an 8-hour Capture the Flag competition hosted across Discord and our custom CTF platform.</p>
      <h3>Categories</h3>
      <ul>
        <li>Web Exploitation</li>
        <li>Reverse Engineering</li>
        <li>Cryptography</li>
        <li>OSINT (Open Source Intelligence)</li>
        <li>Forensics</li>
        <li>Misc / Bonus Challenges</li>
      </ul>
      <h3>Format</h3>
      <p>Jeopardy-style. Teams of 1–3. 30+ challenges across 6 categories. Difficulty ranges from beginner to advanced — we want everyone to score at least one flag.</p>
      <div class="code-block">Date: April 20, 2025 · 10:00 AM – 6:00 PM IST
Platform: discord.gg/terratech + ctf.terratech.club
Registration deadline: April 10, 2025</div>
      <h3>Prizes</h3>
      <p>1st place: ₹5,000 + TerraTech merch. 2nd place: ₹3,000. 3rd: ₹1,500. Special prizes for first blood on the hardest challenge in each category.</p>
    `,
    tags:['Announcement','CTF','Competition'],
  },
  {
    id:7,
    tag:'Tech', emoji:'🌐',
    title:'Understanding CSS Custom Properties at Scale',
    excerpt:'CSS variables are more powerful than most developers realize. Here\'s how we used them to power a dual-theme system across an entire website with zero JavaScript switching.',
    author:'Pooja Gupta', date:'Feb 10, 2025', read:'7 min read',
    content:`
      <h3>Beyond Color Variables</h3>
      <p>Most developers use CSS custom properties for colors and call it a day. But they're much more capable — you can use them for spacing scales, easing curves, animation durations, and component-level state.</p>
      <h3>Theme Switching Without JavaScript</h3>
      <p>The classic approach re-assigns every variable with JS. A cleaner pattern scopes theme variables to a data attribute:</p>
      <div class="code-block">:root { --card: rgba(255,255,255,0.03); }
[data-theme="light"] { --card: #ffffff; }

/* One line of JS to switch everything */
document.body.setAttribute('data-theme', 'light');</div>
      <h3>Cascading Overrides</h3>
      <p>Custom properties follow the CSS cascade. A component can define a local override that only applies inside it, without affecting global defaults.</p>
      <div class="code-block">.special-card {
  --cardborder: rgba(255, 107, 53, 0.3);
  border: 1px solid var(--cardborder);
}</div>
      <h3>Gotchas</h3>
      <ul>
        <li>Custom properties are inherited — children pick up parent values unless overridden</li>
        <li>They can't be used in media query breakpoints (yet)</li>
        <li>Fallback values: var(--missing, red) gracefully degrade</li>
        <li>They work inside calc(), which opens up responsive spacing systems</li>
      </ul>
      <h3>The Takeaway</h3>
      <p>If you're building any UI with more than one state — theme, size, density — CSS custom properties are the cleanest abstraction layer you have. Use them aggressively.</p>
    `,
    tags:['Tech','CSS','Tutorial'],
  },
];
