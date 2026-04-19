import { useState, useEffect, useRef } from "react";

const storageOptions = [
  { name: "Terabox", emoji: "📦", space: "1 TB FREE", color: "#2563eb", url: "https://www.terabox.com", desc: "1000GB completely free — best for large files", badge: "BEST 🏆" },
  { name: "Google Drive", emoji: "🟡", space: "15 GB FREE", color: "#f59e0b", url: "https://drive.google.com", desc: "Already have Gmail? You have 15GB free already", badge: "POPULAR" },
  { name: "MEGA", emoji: "🔴", space: "20 GB FREE", color: "#ef4444", url: "https://mega.nz", desc: "Encrypted cloud — super secure and private", badge: "SECURE 🔒" },
  { name: "OneDrive", emoji: "🔵", space: "5 GB FREE", color: "#0077b5", url: "https://onedrive.live.com", desc: "Microsoft cloud — great if you use Windows PC", badge: "" },
  { name: "pCloud", emoji: "☁️", space: "10 GB FREE", color: "#10b981", url: "https://www.pcloud.com", desc: "Lifetime plan available — no monthly fees ever", badge: "" },
  { name: "Internxt", emoji: "🛸", space: "10 GB FREE", color: "#8b5cf6", url: "https://internxt.com", desc: "Privacy-focused European cloud storage", badge: "PRIVATE" },
];

const sites = [
  { id: 1, name: "Indeed", emoji: "🔍", category: "Job Board", salary: "$15–$75K", level: "All Levels", hot: true, url: "https://www.indeed.com/q-remote-SDR-appointment-setter-lead-generation-jobs.html", desc: "World's largest job board — set daily alerts for instant notifications", tip: "Upload resume & turn on job alerts for SDR + Appointment Setter", accent: "#f59e0b" },
  { id: 2, name: "LinkedIn Jobs", emoji: "💼", category: "Networking", salary: "$40–$80K", level: "All Levels", hot: true, url: "https://www.linkedin.com/jobs/search/?keywords=SDR+appointment+setter+remote", desc: "#1 platform for SDR & Lead Gen — direct contact with HR managers", tip: "Enable 'Open to Work' banner and optimize your headline", accent: "#0077b5" },
  { id: 3, name: "ZipRecruiter", emoji: "⚡", category: "Job Board", salary: "$15–$48/hr", level: "Entry Level", hot: true, url: "https://www.ziprecruiter.com/Jobs/Remote-Appointment-Setter", desc: "1-click apply — 200+ remote appointment setter jobs live now", tip: "Upload resume so employers can invite you directly", accent: "#4f46e5" },
  { id: 4, name: "Glassdoor", emoji: "🪟", category: "Job Board", salary: "$35–$70K", level: "All Levels", hot: false, url: "https://www.glassdoor.com/", desc: "Jobs + company reviews + salary data all in one place", tip: "Check company rating 3.5+ before applying", accent: "#00a591" },
  { id: 5, name: "Monster", emoji: "👾", category: "Job Board", salary: "$30–$65K", level: "All Levels", hot: false, url: "https://www.monster.com/", desc: "Massive job database with strong SDR and sales roles", tip: "Use 'Remote Only' filter to narrow results", accent: "#6d28d9" },
  { id: 6, name: "CareerBuilder", emoji: "🏗️", category: "Job Board", salary: "$35–$65K", level: "Entry–Mid", hot: false, url: "https://www.careerbuilder.com/", desc: "AI-powered job matching for sales and lead gen roles", tip: "Complete profile to get better job match scores", accent: "#2563eb" },
  { id: 7, name: "SimplyHired", emoji: "🎯", category: "Job Board", salary: "$18–$55K", level: "Entry Level", hot: false, url: "https://www.simplyhired.com/", desc: "Aggregates jobs from 100s of sites — great for beginners", tip: "Filter by 'Remote' and 'Full Time' for best results", accent: "#dc2626" },
  { id: 8, name: "Remote.co", emoji: "🌐", category: "Remote Only", salary: "$35–$70K", level: "All Levels", hot: true, url: "https://remote.co/remote-jobs/sales/", desc: "Curated remote-only job board — 100% work from home guaranteed", tip: "Check 'Sales' category for SDR and appointment setter jobs", accent: "#7c3aed" },
  { id: 9, name: "We Work Remotely", emoji: "🏠", category: "Remote Only", salary: "$40–$75K", level: "Mid Level", hot: true, url: "https://weworkremotely.com/", desc: "Top remote-first companies post here — quality over quantity", tip: "Subscribe to weekly email digest for new postings", accent: "#16a34a" },
  { id: 10, name: "Remotive", emoji: "💻", category: "Remote Only", salary: "$40–$75K", level: "Mid Level", hot: true, url: "https://remotive.com/remote-jobs/sales", desc: "Hand-picked remote jobs from top tech and SaaS companies", tip: "Apply within 24 hours — these jobs fill up fast", accent: "#0891b2" },
  { id: 11, name: "Upwork", emoji: "💡", category: "Freelance", salary: "$20–$50/hr", level: "Freelance", hot: true, url: "https://www.upwork.com/", desc: "World's largest freelance platform — 1000s of lead gen projects daily", tip: "Complete profile 100% before bidding on jobs", accent: "#14a800" },
  { id: 12, name: "Fiverr", emoji: "🎯", category: "Freelance", salary: "$100–$2K/gig", level: "Freelance", hot: true, url: "https://www.fiverr.com/", desc: "Create lead gen gig packages — clients come to you automatically", tip: "Add portfolio samples and video intro to your gig", accent: "#1dbf73" },
  { id: 13, name: "SalesGravy", emoji: "🥩", category: "Sales Specific", salary: "$40–$80K", level: "All Levels", hot: true, url: "https://salesgravy.com/sales-jobs/", desc: "Sales-only job board — best site specifically for SDR roles", tip: "Follow Jeb Blount on LinkedIn — founder posts job tips daily", accent: "#dc2626" },
  { id: 14, name: "RepVue", emoji: "📊", category: "Sales Specific", salary: "$50–$95K", level: "Mid–Senior", hot: true, url: "https://www.repvue.com/", desc: "Sales job board with real quota attainment data from reps", tip: "Check quota attainment % before joining any company", accent: "#7c3aed" },
  { id: 15, name: "Wellfound", emoji: "🌱", category: "Startup Jobs", salary: "$45–$85K", level: "All Levels", hot: true, url: "https://wellfound.com/", desc: "AngelList Talent — startups actively hire remote SDRs here", tip: "Startups move fast — apply and follow up same day", accent: "#10b981" },
  { id: 16, name: "Otta", emoji: "🦦", category: "AI Powered", salary: "$40–$80K", level: "All Levels", hot: true, url: "https://otta.com/", desc: "AI matches you to jobs based on your skills automatically", tip: "Add all your sales skills to profile for better matches", accent: "#f97316" },
  { id: 17, name: "FlexJobs", emoji: "🤸", category: "Verified Jobs", salary: "$18–$45/hr", level: "Entry–Mid", hot: false, url: "https://www.flexjobs.com/", desc: "Scam-free verified jobs — every listing is manually screened", tip: "$15/month premium unlocks all jobs — worth it to avoid scams", accent: "#06b6d4" },
  { id: 18, name: "Built In", emoji: "🏗️", category: "Tech Jobs", salary: "$50–$80K", level: "Mid–Senior", hot: true, url: "https://builtin.com/", desc: "Tech and SaaS companies only — SDR roles with equity and benefits", tip: "SaaS SDR roles pay 30–40% more than average sales jobs", accent: "#ec4899" },
  { id: 19, name: "Facebook Groups", emoji: "👥", category: "Community", salary: "Varies", level: "All Levels", hot: true, url: "https://www.facebook.com/groups/", desc: "100s of remote sales job groups — direct contact with managers", tip: "Join 'Remote Appointment Setters' and 'SDR Jobs' groups", accent: "#1877f2" },
  { id: 20, name: "OnlineJobs.ph", emoji: "🇵🇭", category: "International", salary: "$500–$2K/mo", level: "Entry–Mid", hot: true, url: "https://www.onlinejobs.ph/", desc: "Philippines-based remote jobs — great for global appointment setters", tip: "US clients pay premium for English-speaking setters", accent: "#2563eb" },
];

const SALT = "RevForge_Vault_v1";

async function deriveKey(pw) {
  const enc = new TextEncoder();
  const km = await crypto.subtle.importKey("raw", enc.encode(pw + SALT), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt: enc.encode(SALT), iterations: 100000, hash: "SHA-256" }, km, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

async function encryptData(data, pw) {
  const key = await deriveKey(pw);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(data)));
  const out = new Uint8Array(12 + ct.byteLength);
  out.set(iv); out.set(new Uint8Array(ct), 12);
  return btoa(String.fromCharCode(...out));
}

async function decryptData(b64, pw) {
  const buf = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const key = await deriveKey(pw);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: buf.slice(0,12) }, key, buf.slice(12));
  return JSON.parse(new TextDecoder().decode(plain));
}

function fileToBase64(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
}

function fmtBytes(b) {
  if (b < 1024) return b + " B";
  if (b < 1048576) return (b/1024).toFixed(1) + " KB";
  return (b/1048576).toFixed(1) + " MB";
}

const LS_KEY = "revforge_vault_enc";
const LS_HINT = "revforge_vault_hint";
const MAX_MB = 4;

const CV_TYPES = [
  { id: "sdr", label: "SDR Resume", emoji: "⚡", color: "#4f46e5" },
  { id: "appointment", label: "Appt. Setter", emoji: "📅", color: "#059669" },
  { id: "leadgen", label: "Lead Gen", emoji: "🎯", color: "#dc2626" },
  { id: "general", label: "General CV", emoji: "📄", color: "#0891b2" },
  { id: "cover", label: "Cover Letter", emoji: "✉️", color: "#d97706" },
  { id: "portfolio", label: "Portfolio", emoji: "🗂️", color: "#7c3aed" },
  { id: "other", label: "Other", emoji: "📎", color: "#64748b" },
];

export default function App() {
  const [tab, setTab] = useState("jobs");
  const [jobSearch, setJobSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [expandedJob, setExpandedJob] = useState(null);
  const [expandedStore, setExpandedStore] = useState(null);

  const [vaultState, setVaultState] = useState("checking");
  const [pw, setPw] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwHint, setPwHint] = useState("");
  const [hintInput, setHintInput] = useState("");
  const [records, setRecords] = useState([]);
  const [vErr, setVErr] = useState("");
  const [vLoading, setVLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [addMode, setAddMode] = useState("file");
  const [fName, setFName] = useState("");
  const [fLink, setFLink] = useState("");
  const [fType, setFType] = useState("general");
  const [fNotes, setFNotes] = useState("");
  const [selFile, setSelFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const [copied, setCopied] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    const ex = localStorage.getItem(LS_KEY);
    const hint = localStorage.getItem(LS_HINT);
    if (hint) setPwHint(hint);
    setVaultState(ex ? "locked" : "setup");
  }, []);

  const saveRecords = async (updated, password) => {
    const enc = await encryptData(updated, password);
    localStorage.setItem(LS_KEY, enc);
    setRecords(updated);
  };

  const handleSetup = async () => {
    if (pwInput.length < 4) { setVErr("Min 4 characters"); return; }
    if (pwInput !== pwConfirm) { setVErr("Passwords don't match"); return; }
    setVLoading(true);
    try {
      await saveRecords([], pwInput);
      if (hintInput.trim()) localStorage.setItem(LS_HINT, hintInput.trim());
      setPw(pwInput); setVaultState("unlocked");
      setPwInput(""); setPwConfirm(""); setHintInput(""); setVErr("");
    } catch(e) { setVErr("Failed: " + e.message); }
    setVLoading(false);
  };

  const handleUnlock = async () => {
    if (!pwInput.trim()) { setVErr("Enter password"); return; }
    setVLoading(true);
    try {
      const data = await decryptData(localStorage.getItem(LS_KEY), pwInput);
      setPw(pwInput); setRecords(data); setVaultState("unlocked");
      setPwInput(""); setVErr("");
    } catch(e) { setVErr("Wrong password ❌"); }
    setVLoading(false);
  };

  const handleLock = () => {
    setVaultState("locked"); setPw(""); setRecords([]);
    setPwInput(""); setVErr(""); setShowForm(false); setViewing(null);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_MB * 1024 * 1024) { alert(`Max ${MAX_MB}MB per file`); return; }
    setSelFile({ name: file.name, size: file.size, mime: file.type });
    if (!fName) setFName(file.name.replace(/\.[^.]+$/, ""));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const rec = { id: Date.now(), name: fName.trim() || "My CV", type: fType, notes: fNotes.trim(), date: new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" }), addedAt: Date.now(), mode: addMode };
      if (addMode === "file") {
        const file = fileRef.current?.files[0];
        if (!file) { alert("Select a file"); setSaving(false); return; }
        rec.fileData = await fileToBase64(file);
        rec.fileName = file.name; rec.fileSize = file.size; rec.fileMime = file.type;
      } else {
        if (!fLink.trim()) { alert("Enter a link"); setSaving(false); return; }
        rec.link = fLink.trim();
      }
      await saveRecords([rec, ...records], pw);
      setFName(""); setFLink(""); setFType("general"); setFNotes(""); setSelFile(null);
      if (fileRef.current) fileRef.current.value = "";
      setShowForm(false);
    } catch(e) { alert("Save failed: " + e.message); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await saveRecords(records.filter(r => r.id !== id), pw);
    setDelConfirm(null);
    if (viewing?.id === id) setViewing(null);
  };

  const downloadFile = (r) => {
    const a = document.createElement("a");
    a.href = r.fileData; a.download = r.fileName || r.name; a.click();
  };

  const copyLink = (id, link) => {
    try { navigator.clipboard.writeText(link); } catch(e) {}
    setCopied(id); setTimeout(() => setCopied(null), 1500);
  };

  const categories = ["All", ...Array.from(new Set(sites.map(s => s.category)))];

  const filtered = sites.filter(s => {
    const mc = activeCat === "All" || s.category === activeCat;
    const q = jobSearch.toLowerCase();
    return mc && (s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));
  });

  const tInfo = (id) => CV_TYPES.find(t => t.id === id) || CV_TYPES[6];

  const inp = { width:"100%", boxSizing:"border-box", padding:"12px 14px", borderRadius:10, border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.06)", color:"#fff", fontSize:14, outline:"none" };
  const Btn = ({ onClick, disabled, style, children }) => (
    <button onClick={onClick} disabled={disabled} style={{ padding:"14px", borderRadius:10, border:"none", cursor:"pointer", color:"#fff", fontWeight:800, fontSize:14, width:"100%", opacity: disabled?0.5:1, transition:"opacity 0.2s", ...style }}>{children}</button>
  );
  const Lbl = ({ children }) => <div style={{ color:"#818cf8", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>{children}</div>;

  return (
    <div style={{ background:"#07071a", minHeight:"100vh", color:"#f1f5f9", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", maxWidth:480, margin:"0 auto" }}>

      {/* File Viewer Modal */}
      {viewing && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.97)", zIndex:9999, display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", background:"#0a0a18", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ color:"#f1f5f9", fontWeight:800, fontSize:14 }}>{viewing.name}</div>
              <div style={{ color:"#475569", fontSize:11 }}>{viewing.fileName} · {fmtBytes(viewing.fileSize)}</div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => downloadFile(viewing)} style={{ padding:"8px 14px", borderRadius:8, border:"none", background:"#4f46e5", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>⬇️</button>
              <button onClick={() => setViewing(null)} style={{ padding:"8px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"#94a3b8", fontSize:13, fontWeight:700, cursor:"pointer" }}>✕</button>
            </div>
          </div>
          <div style={{ flex:1, overflow:"auto", padding:16 }}>
            {viewing.fileMime === "application/pdf" ? (
              <iframe src={viewing.fileData} style={{ width:"100%", height:"100%", minHeight:500, border:"none", borderRadius:8 }} title="PDF" />
            ) : viewing.fileMime?.startsWith("image/") ? (
              <img src={viewing.fileData} alt={viewing.name} style={{ width:"100%", borderRadius:8 }} />
            ) : (
              <div style={{ color:"#94a3b8", textAlign:"center", padding:40 }}>Preview not available.<br/>Use Download button.</div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ padding:"24px 16px 16px", background:"linear-gradient(135deg,#0f0f2e,#1a1040)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <span style={{ fontSize:28 }}>💼</span>
          <div>
            <div style={{ fontSize:20, fontWeight:900, background:"linear-gradient(135deg,#818cf8,#c4b5fd)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Remote Jobs Vault</div>
            <p style={{ color:"#64748b", margin:0, fontSize:11 }}>SDR · Appointment Setter · Lead Generation</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", background:"#0a0a18", borderBottom:"1px solid rgba(255,255,255,0.07)", position:"sticky", top:0, zIndex:100 }}>
        {[["jobs","💼 Jobs"],["cv","🔐 Vault"]].map(([id,lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex:1, padding:"14px 8px", border:"none", cursor:"pointer", background:tab===id?"rgba(99,102,241,0.15)":"transparent", color:tab===id?"#818cf8":"#475569", fontWeight:800, fontSize:13, borderBottom:tab===id?"2px solid #818cf8":"2px solid transparent", transition:"all 0.2s" }}>{lbl}</button>
        ))}
      </div>

      {/* ═══ JOBS TAB ═══ */}
      {tab === "jobs" && (
        <div>
          <div style={{ padding:"14px 14px 0" }}>
            <input type="text" placeholder="🔍 Search job sites..." value={jobSearch} onChange={e => setJobSearch(e.target.value)} style={inp} />
          </div>
          <div style={{ display:"flex", gap:6, overflowX:"auto", padding:"10px 14px", scrollbarWidth:"none" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)} style={{ flexShrink:0, padding:"6px 12px", borderRadius:20, border:"none", cursor:"pointer", background:activeCat===cat?"#4f46e5":"rgba(255,255,255,0.06)", color:activeCat===cat?"#fff":"#94a3b8", fontSize:11, fontWeight:700, transition:"all 0.2s" }}>{cat}</button>
            ))}
          </div>
          <div style={{ padding:"0 14px 4px", color:"#374151", fontSize:11 }}>Showing {filtered.length} sites</div>
          <div style={{ padding:"2px 14px 0", display:"flex", flexDirection:"column", gap:8 }}>
            {filtered.map(s => (
              <div key={s.id} onClick={() => setExpandedJob(expandedJob===s.id?null:s.id)} style={{ background:expandedJob===s.id?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.03)", border:`1px solid ${expandedJob===s.id?s.accent+"60":"rgba(255,255,255,0.07)"}`, borderRadius:14, padding:"13px", cursor:"pointer", position:"relative", overflow:"hidden", transition:"all 0.2s" }}>
                <div style={{ position:"absolute", left:0, top:0, bottom:0, width:4, background:s.accent, borderRadius:"14px 0 0 14px" }} />
                <div style={{ paddingLeft:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flex:1 }}>
                      <span style={{ fontSize:20 }}>{s.emoji}</span>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontSize:14, fontWeight:800, color:"#f1f5f9" }}>{s.name}</span>
                          {s.hot && <span style={{ background:"linear-gradient(135deg,#ef4444,#f97316)", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:5 }}>HOT🔥</span>}
                        </div>
                        <span style={{ fontSize:11, color:s.accent, fontWeight:700 }}>{s.category}</span>
                      </div>
                    </div>
                    <span style={{ color:"#475569", fontSize:16, display:"inline-block", transform:expandedJob===s.id?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s" }}>▾</span>
                  </div>
                  <p style={{ margin:"0 0 7px", color:"#94a3b8", fontSize:12, lineHeight:1.5 }}>{s.desc}</p>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    <span style={{ background:"rgba(255,255,255,0.06)", borderRadius:6, padding:"3px 8px", fontSize:11, color:"#e2e8f0" }}>💰 {s.salary}</span>
                    <span style={{ background:"rgba(255,255,255,0.06)", borderRadius:6, padding:"3px 8px", fontSize:11, color:"#e2e8f0" }}>👤 {s.level}</span>
                  </div>
                  {expandedJob === s.id && (
                    <div style={{ marginTop:10, padding:"12px", background:"rgba(0,0,0,0.35)", borderRadius:10, border:`1px solid ${s.accent}30` }}>
                      <div style={{ color:"#fbbf24", fontSize:11, fontWeight:700, marginBottom:4 }}>💡 Pro Tip:</div>
                      <div style={{ color:"#94a3b8", fontSize:12, marginBottom:10, lineHeight:1.5 }}>{s.tip}</div>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display:"block", textAlign:"center", background:`linear-gradient(135deg,${s.accent}cc,${s.accent})`, color:"#fff", textDecoration:"none", padding:"11px", borderRadius:8, fontWeight:800, fontSize:13 }}>Apply Now → {s.name}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Cloud Storage */}
          <div style={{ padding:"20px 14px 30px" }}>
            <div style={{ color:"#818cf8", fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>☁️ Free Cloud Storage</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {storageOptions.map(s => (
                <div key={s.name}>
                  <div onClick={() => setExpandedStore(expandedStore===s.name?null:s.name)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(255,255,255,0.04)", border:`1px solid ${expandedStore===s.name?s.color+"60":"rgba(255,255,255,0.08)"}`, borderRadius:12, padding:"12px 14px", cursor:"pointer", transition:"all 0.2s" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:22 }}>{s.emoji}</span>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ color:"#f1f5f9", fontWeight:800, fontSize:14 }}>{s.name}</span>
                          {s.badge && <span style={{ background:s.color, color:"#fff", fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:5 }}>{s.badge}</span>}
                        </div>
                        <div style={{ color:"#64748b", fontSize:11 }}>{s.desc}</div>
                      </div>
                    </div>
                    <div style={{ color:s.color, fontWeight:900, fontSize:12, whiteSpace:"nowrap", marginLeft:8 }}>{s.space}</div>
                  </div>
                  {expandedStore===s.name && (
                    <div style={{ padding:"0 4px", marginTop:5 }}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display:"block", textAlign:"center", background:`linear-gradient(135deg,${s.color}cc,${s.color})`, color:"#fff", textDecoration:"none", padding:"12px", borderRadius:9, fontWeight:800, fontSize:14 }}>🚀 Open {s.name}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ VAULT TAB ═══ */}
      {tab === "cv" && (
        <div style={{ padding:"20px 16px 30px", maxWidth:480, margin:"0 auto" }}>

          {vaultState === "setup" && <>
            <div style={{ fontSize:56, textAlign:"center", marginBottom:10 }}>🔐</div>
            <div style={{ textAlign:"center", fontSize:22, fontWeight:900, marginBottom:5 }}>Create CV Vault</div>
            <div style={{ textAlign:"center", color:"#475569", fontSize:13, marginBottom:18 }}>AES-256 encrypted · Device only · No internet</div>
            {vErr && <div style={{ background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", borderRadius:9, padding:"10px 14px", color:"#fca5a5", fontSize:13, marginBottom:14 }}>⚠️ {vErr}</div>}
            <div style={{ marginBottom:12 }}><Lbl>🔑 Password</Lbl><input type="password" placeholder="Min 4 characters" value={pwInput} onChange={e => setPwInput(e.target.value)} style={inp} /></div>
            <div style={{ marginBottom:12 }}><Lbl>🔑 Confirm</Lbl><input type="password" placeholder="Repeat password" value={pwConfirm} onChange={e => setPwConfirm(e.target.value)} style={inp} /></div>
            <div style={{ marginBottom:18 }}><Lbl>💬 Hint (optional)</Lbl><input type="text" placeholder="A reminder only you understand" value={hintInput} onChange={e => setHintInput(e.target.value)} style={inp} /></div>
            <Btn onClick={handleSetup} disabled={vLoading} style={{ background:"linear-gradient(135deg,#4f46e5,#818cf8)" }}>{vLoading?"Creating...":"🔐 Create Vault"}</Btn>
          </>}

          {vaultState === "locked" && <>
            <div style={{ fontSize:56, textAlign:"center", marginBottom:10 }}>🔒</div>
            <div style={{ textAlign:"center", fontSize:22, fontWeight:900, marginBottom:5 }}>Vault Locked</div>
            <div style={{ textAlign:"center", color:"#475569", fontSize:13, marginBottom:18 }}>Enter password to access your files</div>
            {pwHint && <div style={{ background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.2)", borderRadius:10, padding:"10px 14px", color:"#fbbf24", fontSize:13, marginBottom:16 }}>💬 Hint: {pwHint}</div>}
            {vErr && <div style={{ background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", borderRadius:9, padding:"10px 14px", color:"#fca5a5", fontSize:13, marginBottom:14 }}>⚠️ {vErr}</div>}
            <div style={{ marginBottom:14 }}><Lbl>🔑 Password</Lbl><input type="password" placeholder="Your vault password" value={pwInput} onChange={e => setPwInput(e.target.value)} style={inp} autoFocus /></div>
            <Btn onClick={handleUnlock} disabled={vLoading} style={{ background:"linear-gradient(135deg,#4f46e5,#818cf8)", marginBottom:12 }}>{vLoading?"Unlocking...":"🔓 Unlock Vault"}</Btn>
            <button onClick={() => { if(window.confirm("Reset vault? ALL data permanently deleted!")) { localStorage.removeItem(LS_KEY); localStorage.removeItem(LS_HINT); setVaultState("setup"); setVErr(""); } }} style={{ width:"100%", background:"transparent", border:"1px solid rgba(220,38,38,0.3)", color:"#fca5a5", padding:"12px", borderRadius:10, fontSize:13, cursor:"pointer", fontWeight:700 }}>🗑️ Reset Vault</button>
          </>}

          {vaultState === "unlocked" && <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", display:"inline-block", boxShadow:"0 0 8px #10b981" }} />
                  <span style={{ color:"#10b981", fontWeight:800, fontSize:15 }}>Vault Unlocked</span>
                </div>
                <div style={{ color:"#475569", fontSize:12 }}>{records.length} file{records.length!==1?"s":""} · AES-256-GCM</div>
              </div>
              <button onClick={handleLock} style={{ padding:"8px 14px", borderRadius:8, border:"1px solid rgba(220,38,38,0.3)", background:"rgba(220,38,38,0.1)", color:"#fca5a5", fontSize:12, cursor:"pointer", fontWeight:700 }}>🔒 Lock</button>
            </div>

            {!showForm && <Btn onClick={() => setShowForm(true)} style={{ background:"linear-gradient(135deg,#4f46e5,#818cf8)", marginBottom:18 }}>+ Add CV / Document</Btn>}

            {showForm && (
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:14, padding:"18px 16px", marginBottom:18 }}>
                <div style={{ color:"#818cf8", fontWeight:900, fontSize:14, marginBottom:16 }}>📄 Add Document</div>
                <div style={{ display:"flex", gap:6, marginBottom:16 }}>
                  {[["file","📁 Upload File"],["link","🔗 Paste Link"]].map(([m,l]) => (
                    <button key={m} onClick={() => setAddMode(m)} style={{ flex:1, padding:"10px", borderRadius:9, border:`1px solid ${addMode===m?"#4f46e5":"rgba(255,255,255,0.1)"}`, background:addMode===m?"rgba(79,70,229,0.2)":"transparent", color:addMode===m?"#818cf8":"#64748b", fontWeight:800, fontSize:13, cursor:"pointer" }}>{l}</button>
                  ))}
                </div>
                {addMode === "file" && (
                  <div style={{ marginBottom:14 }}>
                    <Lbl>File (PDF · DOCX · JPG · PNG · max {MAX_MB}MB)</Lbl>
                    <div onClick={() => fileRef.current?.click()} style={{ border:"2px dashed rgba(99,102,241,0.4)", borderRadius:12, padding:"22px", textAlign:"center", cursor:"pointer", background:"rgba(99,102,241,0.05)" }}>
                      {selFile ? (
                        <><div style={{ fontSize:32, marginBottom:5 }}>✅</div><div style={{ color:"#f1f5f9", fontWeight:700, fontSize:14 }}>{selFile.name}</div><div style={{ color:"#64748b", fontSize:12 }}>{fmtBytes(selFile.size)}</div></>
                      ) : (
                        <><div style={{ fontSize:32, marginBottom:5 }}>📂</div><div style={{ color:"#818cf8", fontWeight:700, fontSize:14 }}>Tap to select file</div><div style={{ color:"#475569", fontSize:12 }}>PDF · DOCX · JPG · PNG</div></>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt" onChange={handleFileSelect} style={{ display:"none" }} />
                  </div>
                )}
                {addMode === "link" && (
                  <div style={{ marginBottom:14 }}><Lbl>Cloud Link</Lbl><input type="text" placeholder="https://..." value={fLink} onChange={e => setFLink(e.target.value)} style={inp} /></div>
                )}
                <div style={{ marginBottom:12 }}><Lbl>Document Name</Lbl><input type="text" placeholder='e.g. "SDR Resume 2025"' value={fName} onChange={e => setFName(e.target.value)} style={inp} /></div>
                <div style={{ marginBottom:12 }}>
                  <Lbl>Type</Lbl>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {CV_TYPES.map(t => (
                      <button key={t.id} onClick={() => setFType(t.id)} style={{ padding:"6px 12px", borderRadius:20, border:`1px solid ${fType===t.id?t.color:"rgba(255,255,255,0.1)"}`, background:fType===t.id?t.color+"30":"transparent", color:fType===t.id?t.color:"#64748b", fontSize:12, fontWeight:700, cursor:"pointer" }}>{t.emoji} {t.label}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom:16 }}><Lbl>Notes (optional)</Lbl><input type="text" placeholder='e.g. "Updated for tech roles"' value={fNotes} onChange={e => setFNotes(e.target.value)} style={inp} /></div>
                <div style={{ display:"flex", gap:8 }}>
                  <Btn onClick={handleSave} disabled={saving} style={{ flex:1, background:"linear-gradient(135deg,#10b981,#059669)" }}>{saving?"Encrypting...":"🔐 Save"}</Btn>
                  <button onClick={() => { setShowForm(false); setSelFile(null); setFName(""); setFLink(""); setFNotes(""); if(fileRef.current) fileRef.current.value=""; }} style={{ flexShrink:0, padding:"14px 18px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.06)", color:"#94a3b8", fontWeight:700, fontSize:14, cursor:"pointer" }}>✕</button>
                </div>
              </div>
            )}

            {records.length === 0 && !showForm && (
              <div style={{ textAlign:"center", padding:"50px 20px", color:"#374151", border:"1px dashed rgba(255,255,255,0.07)", borderRadius:14 }}>
                <div style={{ fontSize:40, marginBottom:10 }}>📭</div>
                <div style={{ fontSize:14, color:"#475569" }}>Vault is empty</div>
                <div style={{ fontSize:12, marginTop:5 }}>Add your first CV above!</div>
              </div>
            )}

            {records.length > 0 && <>
              <div style={{ color:"#818cf8", fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>📁 Files ({records.length})</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {records.map(r => {
                  const t = tInfo(r.type);
                  const isFile = r.mode === "file";
                  return (
                    <div key={r.id} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:14, position:"relative", overflow:"hidden" }}>
                      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:4, background:t.color, borderRadius:"14px 0 0 14px" }} />
                      <div style={{ paddingLeft:10 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
                              <span style={{ fontSize:18 }}>{t.emoji}</span>
                              <span style={{ color:"#f1f5f9", fontWeight:800, fontSize:14 }}>{r.name}</span>
                            </div>
                            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                              <span style={{ background:t.color+"25", color:t.color, fontSize:10, fontWeight:800, padding:"3px 8px", borderRadius:10 }}>{t.label.toUpperCase()}</span>
                              <span style={{ background:isFile?"rgba(16,185,129,0.15)":"rgba(99,102,241,0.15)", color:isFile?"#10b981":"#818cf8", fontSize:10, fontWeight:800, padding:"3px 8px", borderRadius:10 }}>{isFile?`📁 ${fmtBytes(r.fileSize)}`:"🔗 LINK"}</span>
                            </div>
                          </div>
                          <div style={{ color:"#374151", fontSize:11, marginLeft:8, flexShrink:0 }}>{r.date}</div>
                        </div>
                        {r.notes && <div style={{ color:"#64748b", fontSize:12, marginBottom:8, fontStyle:"italic" }}>💬 {r.notes}</div>}
                        {isFile && r.fileName && <div style={{ color:"#374151", fontSize:11, marginBottom:9 }}>📄 {r.fileName}</div>}
                        {!isFile && r.link && <div style={{ color:"#374151", fontSize:11, marginBottom:9, wordBreak:"break-all" }}>🔗 {r.link.length>45?r.link.slice(0,45)+"...":r.link}</div>}
                        <div style={{ display:"flex", gap:6 }}>
                          {isFile ? <>
                            <button onClick={() => setViewing(r)} style={{ flex:1, background:t.color, color:"#fff", border:"none", cursor:"pointer", padding:"10px", borderRadius:8, fontSize:13, fontWeight:700 }}>👁️ View</button>
                            <button onClick={() => downloadFile(r)} style={{ flex:1, background:"#0891b2", color:"#fff", border:"none", cursor:"pointer", padding:"10px", borderRadius:8, fontSize:13, fontWeight:700 }}>⬇️ Save</button>
                          </> : <>
                            <a href={r.link} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"block", textAlign:"center", background:t.color, color:"#fff", textDecoration:"none", padding:"10px", borderRadius:8, fontSize:13, fontWeight:700 }}>🔗 Open</a>
                            <button onClick={() => copyLink(r.id, r.link)} style={{ flex:1, background:copied===r.id?"#059669":"#0891b2", color:"#fff", border:"none", cursor:"pointer", padding:"10px", borderRadius:8, fontSize:13, fontWeight:700 }}>{copied===r.id?"✅ Copied!":"📋 Copy"}</button>
                          </>}
                          {delConfirm===r.id ? <>
                            <button onClick={() => handleDelete(r.id)} style={{ background:"#dc2626", color:"#fff", border:"none", cursor:"pointer", padding:"10px 14px", borderRadius:8, fontSize:13, fontWeight:800 }}>✓</button>
                            <button onClick={() => setDelConfirm(null)} style={{ background:"rgba(255,255,255,0.08)", color:"#94a3b8", border:"none", cursor:"pointer", padding:"10px 14px", borderRadius:8, fontSize:13 }}>✕</button>
                          </> : (
                            <button onClick={() => setDelConfirm(r.id)} style={{ background:"rgba(220,38,38,0.15)", color:"#fca5a5", border:"1px solid rgba(220,38,38,0.25)", cursor:"pointer", padding:"10px 14px", borderRadius:8, fontSize:16, fontWeight:700 }}>🗑️</button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>}

            <div style={{ marginTop:22, background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:12, padding:14, fontSize:12, color:"#64748b", lineHeight:1.8 }}>
              <div style={{ color:"#10b981", fontWeight:800, marginBottom:5 }}>🔐 Security Info</div>
              <div>• <strong style={{ color:"#94a3b8" }}>AES-256-GCM</strong> — military grade encryption</div>
              <div>• <strong style={{ color:"#94a3b8" }}>PBKDF2</strong> key derivation (100,000 iterations)</div>
              <div>• Stored on <strong style={{ color:"#94a3b8" }}>your device only</strong></div>
              <div>• <strong style={{ color:"#94a3b8" }}>Zero internet · Zero third party</strong></div>
            </div>
          </>}
        </div>
      )}
    </div>
  );
}
