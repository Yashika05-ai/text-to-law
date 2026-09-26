import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileCheck2,
  FilePlus2,
  FileText,
  FolderClock,
  Languages,
  LayoutDashboard,
  ListChecks,
  Menu,
  MessageCircleMore,
  Scale,
  Settings2,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const navigation = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Analyze document", to: "/analyze", icon: FilePlus2 },
  { label: "Compare documents", to: "/compare", icon: ArrowDownUp },
  { label: "Ask my document", to: "/ask", icon: MessageCircleMore },
  { label: "Lawyer preparation", to: "/lawyer-preparation", icon: BookOpenCheck },
  { label: "Document history", to: "/history", icon: FolderClock },
  { label: "Settings", to: "/settings", icon: Settings2 },
] as const;

const documents = [
  { name: "Employment Agreement — 2025", type: "Employment agreement", date: "Today", size: "1.2 MB", status: "Illustrative demo", letter: "E" },
  { name: "Residential Lease — Unit 4B", type: "Residential lease", date: "18 Mar 2025", size: "840 KB", status: "Illustrative demo", letter: "R" },
  { name: "Non-Disclosure Agreement", type: "NDA", date: "02 Mar 2025", size: "620 KB", status: "Illustrative demo", letter: "N" },
];

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`legal-note ${compact ? "legal-note-compact" : ""}`}>
      <ShieldCheck aria-hidden="true" size={17} />
      <p>NyayaSaathi AI provides informational assistance and document analysis. It does not provide legal advice and does not replace a qualified legal professional.</p>
    </div>
  );
}

function Brand({ small = false }: { small?: boolean }) {
  return <Link to="/" className="brand-lockup" aria-label="NyayaSaathi AI home"><span className={`brand-mark ${small ? "brand-mark-small" : ""}`}>N</span><span>NyayaSaathi <span className="brand-accent">AI</span></span></Link>;
}

export function LandingPage() {
  return (
    <div className="landing-page">
      <header className="site-header">
        <div className="site-header-inner"><Brand /><nav className="site-nav" aria-label="Main navigation"><a href="#features">What it does</a><a href="#how-it-works">How it works</a><Link to="/compare">Compare</Link></nav><div className="header-actions"><Link to="/login" className="header-login">Sign in</Link><Button asChild><Link to="/analyze">Analyze a document <ArrowRight size={16} /></Link></Button></div></div>
      </header>
      <main>
        <section className="landing-hero">
          <div className="hero-angle hero-angle-one" /><div className="hero-angle hero-angle-two" />
          <div className="landing-hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" />Document clarity, on your terms</div>
              <h1>Understand your legal documents. <span>Prepare better questions.</span></h1>
              <p className="hero-lede">NyayaSaathi AI transforms complex legal language into clear, understandable information and helps you prepare for conversations with qualified legal professionals.</p>
              <div className="hero-actions"><Button asChild size="lg"><Link to="/analyze">Analyze a document <ArrowRight size={17} /></Link></Button><Button asChild variant="outline" size="lg"><Link to="/compare">Compare documents</Link></Button></div>
              <div className="journey-line" aria-label="Understand, detect, compare, question, prepare"><span>Understand</span><i>·</i><span>Detect</span><i>·</i><span>Compare</span><i>·</i><span>Question</span><i>·</i><span>Prepare</span></div>
              <p className="hero-disclaimer">Informational assistance only. Not legal advice — and not a replacement for a qualified professional.</p>
            </div>
            <div className="sample-file" aria-label="Illustrative employment agreement example">
              <div className="sample-file-heading"><div><div className="micro-label">Illustrative example · Not an analysis</div><h2>Employment Agreement.pdf</h2></div><span className="badge badge-green">Sample</span></div>
              <div className="sample-findings">
                <article className="sample-finding"><span className="clause-ref">8.2</span><div><h3>Notice period: 90 days</h3><p>In this fictional example, notice would need to be given three months ahead.</p><span className="badge badge-amber">Attention area · Sample</span></div></article>
                <article className="sample-finding"><span className="clause-ref">4.1</span><div><h3>Confidentiality: 24 months</h3><p>A sample plain-language explanation with a section reference.</p><span className="source-label">Example source · Page 6</span></div></article>
                <article className="sample-finding sample-comparison"><ArrowDownUp size={17} /><div><h3>Version comparison</h3><p><strong>30 days → 90 days</strong><span className="change-label">Example change only</span></p></div></article>
              </div>
              <p className="sample-caption">Illustrative sample data. No document has been analyzed.</p>
            </div>
          </div>
        </section>
        <section id="features" className="section-wrap feature-section"><div className="section-heading"><div><div className="micro-label accent-label">A clearer way to prepare</div><h2>A document assistant built for clarity.</h2></div><p>Understand the words on the page, then organize what you would like to ask a qualified professional.</p></div>
          <div className="feature-grid">
            {[{ icon: FileText, title: "Simplify documents", text: "Turn complex legal language into plain-language explanations." }, { icon: FileCheck2, title: "Find important clauses", text: "Identify obligations, important dates, financial terms and attention areas." }, { icon: ArrowDownUp, title: "Compare documents", text: "Review what changed between two versions of an agreement." }, { icon: MessageCircleMore, title: "Ask your document", text: "Explore questions with answers tied to their document source." }, { icon: Scale, title: "Prepare for a lawyer", text: "Organize questions and concerns for a qualified legal professional." }].map(({ icon: Icon, title, text }, index) => <article key={title} className="feature-item"><div className="feature-icon"><Icon size={19} aria-hidden="true" /></div><span className="feature-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>
        <section id="how-it-works" className="steps-band"><div className="section-wrap"><div className="micro-label accent-label">A straightforward process</div><h2>From document to a more prepared conversation.</h2><div className="steps-grid">{[{ title: "Upload", text: "Choose a PDF document." }, { title: "Understand", text: "Review a plain-language explanation." }, { title: "Explore", text: "Ask questions or compare versions." }, { title: "Prepare", text: "Collect questions and a checklist." }].map(({ title, text }, index) => <article key={title} className="step-item"><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
        <section className="landing-close"><div><div className="micro-label accent-label">Your next step</div><h2>Don't replace the lawyer.<br />Prepare the user for the lawyer.</h2><p>Start with the document you want to understand.</p></div><Button asChild size="lg"><Link to="/analyze">Analyze a document <ArrowRight size={17} /></Link></Button></section>
      </main>
      <footer className="site-footer"><Brand small /><p>Informational assistance only · Not legal advice</p><Link to="/login">Sign in</Link></footer>
    </div>
  );
}

export function AppShell({ children, title, eyebrow }: { children: ReactNode; title: string; eyebrow: string }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="workspace"><aside className={`workspace-sidebar ${mobileOpen ? "workspace-sidebar-open" : ""}`}><div className="sidebar-top"><Brand /><Button variant="ghost" size="icon" className="mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={18} /></Button></div><div className="sidebar-caption">YOUR WORKSPACE</div><nav className="workspace-nav" aria-label="Workspace navigation">{navigation.map(({ label, to, icon: Icon }) => <Link key={to} to={to} onClick={() => setMobileOpen(false)} className={`workspace-nav-link ${pathname === to ? "workspace-nav-active" : ""}`}><Icon size={17} aria-hidden="true" /><span>{label}</span></Link>)}</nav><div className="sidebar-bottom"><div className="sidebar-help"><CircleHelp size={17} /><div><strong>Need a professional?</strong><span>Prepare questions to discuss.</span></div></div><Disclaimer compact /></div></aside>
    {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <div className="workspace-main"><header className="workspace-header"><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={19} /></Button><div className="breadcrumb-label">NyayaSaathi <span>/</span> {eyebrow}</div><div className="header-right"><span className="demo-pill">UI preview · Sample data</span><Button variant="outline" size="sm" asChild><Link to="/login">Sign in</Link></Button></div></header><main className="workspace-content"><div className="page-heading"><div><div className="micro-label accent-label">{eyebrow}</div><h1>{title}</h1></div><select aria-label="Display language" className="language-select" defaultValue="English"><option>English</option><option>Hindi</option><option>Hinglish</option></select></div>{children}<Disclaimer /></main></div></div>;
}

function PageLink({ to, children }: { to: "/analyze" | "/compare" | "/ask" | "/lawyer-preparation" | "/history" | "/dashboard"; children: ReactNode }) { return <Button asChild variant="outline" size="sm"><Link to={to}>{children}<ArrowRight size={15} /></Link></Button>; }

export function DashboardPage() {
  return <AppShell title="Your documents, in one place." eyebrow="Overview"><div className="dashboard-topline"><p>A calm place to review your files and pick up where you left off.</p><Button asChild><Link to="/analyze"><FilePlus2 size={16} /> Analyze new document</Link></Button></div><div className="stat-grid"><article className="stat-box"><span>Documents</span><strong>03</strong><small>Illustrative sample</small></article><article className="stat-box"><span>Comparisons</span><strong>01</strong><small>Illustrative sample</small></article><article className="stat-box"><span>To review</span><strong>02</strong><small>Illustrative sample</small></article></div><section className="content-section"><div className="section-title-row"><div><h2>Recent documents</h2><p>Example items shown for the UI preview</p></div><PageLink to="/history">View history</PageLink></div><DocumentList /></section><div className="workspace-lower-grid"><section className="content-section"><div className="section-title-row"><div><h2>Pick up where you left off</h2><p>Choose a workspace to explore</p></div></div><div className="quick-links"><Link to="/ask"><span className="quick-icon"><MessageCircleMore size={18} /></span><span><strong>Ask my document</strong><small>Questions and source references</small></span><ArrowRight size={17} /></Link><Link to="/compare"><span className="quick-icon"><ArrowDownUp size={18} /></span><span><strong>Compare versions</strong><small>See differences side by side</small></span><ArrowRight size={17} /></Link><Link to="/lawyer-preparation"><span className="quick-icon"><BookOpenCheck size={18} /></span><span><strong>Lawyer preparation</strong><small>Organize your questions</small></span><ArrowRight size={17} /></Link></div></section><aside className="aside-prompt"><div className="feature-icon"><CalendarDays size={19} /></div><div className="micro-label">A little preparation goes a long way</div><h2>Bring clearer questions to your next conversation.</h2><p>Gather relevant documents and write down what you want to understand.</p><PageLink to="/lawyer-preparation">Prepare a brief</PageLink></aside></div></AppShell>;
}

function DocumentList() { return <div className="document-list">{documents.map((document) => <Link to="/analysis/$id" params={{ id: "sample-employment-agreement" }} className="document-row" key={document.name}><span className="document-mark">{document.letter}</span><span className="document-meta"><strong>{document.name}</strong><span>{document.type} · {document.size} · {document.date}</span></span><span className="badge badge-outline">{document.status}</span><ArrowRight size={16} className="document-arrow" /></Link>)}</div>; }

export function AnalyzePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const pickFile = (candidate?: File) => {
    setError("");
    if (!candidate) return;
    if (candidate.type !== "application/pdf" && !candidate.name.toLowerCase().endsWith(".pdf")) { setFile(null); setError("Choose a PDF file to continue."); return; }
    if (candidate.size > 20 * 1024 * 1024) { setFile(null); setError("This file is larger than 20 MB. Choose a smaller PDF."); return; }
    setFile(candidate);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => pickFile(event.target.files?.[0]);
  return <AppShell title="Start with a document." eyebrow="Analyze document"><div className="upload-intro"><p>Choose a PDF from your device. This preview does not upload or analyze your file.</p><span className="badge badge-outline"><ShieldCheck size={14} /> Private by design · UI preview only</span></div><div className={`upload-zone ${dragging ? "upload-zone-dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); pickFile(event.dataTransfer.files[0]); }}><input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={onChange} aria-label="Choose a PDF document"/><div className="upload-symbol"><Upload size={23} /></div><h2>{file ? "PDF selected" : "Drop your PDF here"}</h2><p>{file ? `${file.name} · ${formatBytes(file.size)}` : "or browse files on your device"}</p><Button variant="outline" onClick={() => inputRef.current?.click()}>{file ? "Choose another file" : "Browse files"}</Button><span className="upload-footnote">PDF only · Up to 20 MB</span></div>{error && <p className="form-error" role="alert">{error}</p>}{file && <div className="selected-file"><span className="document-mark"><FileText size={18} /></span><span className="document-meta"><strong>{file.name}</strong><span>{formatBytes(file.size)} · Ready in this preview</span></span><Button variant="ghost" size="icon" aria-label="Remove selected PDF" onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ""; }}><X size={17} /></Button></div>}<div className="upload-next"><div><span className="step-number">NEXT</span><h3>Review a plain-language overview</h3><p>Real document analysis will be connected in a later phase.</p></div><Button disabled={!file} onClick={() => setError("Document analysis is not connected in this Phase 1 preview.")}>Analyze document <ArrowRight size={16} /></Button></div><section className="content-section upload-guidance"><h2>What you can expect</h2><div className="expect-grid"><p><Check size={16} /> Plain-language document overview</p><p><Check size={16} /> Important sections and obligations</p><p><Check size={16} /> Dates and financial terms</p><p><Check size={16} /> Questions to discuss with a professional</p></div></section></AppShell>;
}

function formatBytes(bytes: number) { return bytes < 1_000_000 ? `${Math.max(1, Math.round(bytes / 1_000))} KB` : `${(bytes / 1_000_000).toFixed(1)} MB`; }

const tabs = ["Summary", "Important clauses", "Obligations", "Important dates", "Financial terms", "Attention areas", "Questions", "Checklist"] as const;
export function AnalysisPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Summary");
  return <AppShell title="Employment Agreement — sample" eyebrow="Document preview"><div className="document-detail-head"><span className="document-mark document-mark-large">E</span><div><h2>Employment Agreement — 2025</h2><p>Illustrative sample · No document analysis has been performed</p></div><span className="badge badge-green">Demo content</span></div><div className="tab-list" role="tablist" aria-label="Sample analysis sections">{tabs.map((tab) => <button key={tab} className={`tab-button ${active === tab ? "tab-button-active" : ""}`} role="tab" aria-selected={active === tab} onClick={() => setActive(tab)}>{tab}</button>)}</div><div className="analysis-preview"><div className="analysis-tab-heading"><div className="micro-label accent-label">Illustrative only</div><h2>{active}</h2><p>Example content for the interface preview. It is not derived from an uploaded agreement.</p></div>{active === "Summary" ? <><div className="summary-copy"><p>This sample agreement describes an employment relationship, responsibilities, compensation and terms for ending employment.</p><p>Once document analysis is connected, this area will summarize the document you provide and link key details to their original sections.</p></div><div className="finding-grid"><FindingCard refNo="8.2" title="Notice period: 90 days" body="Example explanation: a three-month notice period." label="Attention area"/><FindingCard refNo="4.1" title="Confidentiality: 24 months" body="Example explanation: information remains confidential for two years." label="Sample clause"/></div><div className="source-chip"><FileText size={15}/> Example citation only · Clause 8.2 · Page 6</div></> : active === "Checklist" ? <div className="checklist-items">{["Review the notice period", "Confirm the payment schedule", "Ask about confidentiality terms"].map((item) => <label key={item}><input type="checkbox"/><span>{item}</span><small>Sample checklist item</small></label>)}</div> : <div className="empty-panel"><FileCheck2 size={22}/><strong>{active} will appear here</strong><p>When connected, this section will use information from your own document. Sample findings are not shown as real analysis.</p></div>}</div><div className="analysis-actions"><PageLink to="/ask">Ask about this document</PageLink><PageLink to="/lawyer-preparation">Prepare a consultation brief</PageLink></div></AppShell>;
}

function FindingCard({ refNo, title, body, label }: { refNo: string; title: string; body: string; label: string }) { return <article className="finding-card"><span className="clause-ref">{refNo}</span><div><span className="badge badge-amber">{label} · sample</span><h3>{title}</h3><p>{body}</p><span className="source-label">Example source · Page 6</span></div></article>; }

export function ComparePage() {
  const [compared, setCompared] = useState(false);
  return <AppShell title="Compare two versions." eyebrow="Compare documents"><p className="page-intro">Choose two PDF files to see how a side-by-side comparison could work. No files are uploaded or compared in this UI preview.</p><div className="compare-upload-grid"><CompareFileCard label="Document A" detail="Earlier version" /><div className="compare-divider"><ArrowDownUp size={19}/></div><CompareFileCard label="Document B" detail="Updated version" /></div><div className="compare-submit"><span><ShieldCheck size={16}/> Files stay on your device in this preview</span><Button onClick={() => setCompared(true)}>Compare documents <ArrowRight size={16}/></Button></div>{compared && <div className="demo-comparison" role="status"><div className="demo-result-title"><div><span className="badge badge-amber">Illustrative example only</span><h2>Material change detected</h2><p>This example is not based on your selected files.</p></div><button className="icon-button" aria-label="Dismiss example comparison" onClick={() => setCompared(false)}><X size={18}/></button></div><div className="comparison-diff"><div><span>Earlier version</span><strong>30 days</strong></div><ArrowRight size={20}/><div><span>Updated version</span><strong>90 days</strong></div></div><p>Example notice-period change · Not legal advice</p></div>}<section className="content-section compare-explainer"><h2>What a comparison can highlight</h2><div className="expect-grid"><p><Check size={16}/> Added or removed wording</p><p><Check size={16}/> Changed responsibilities</p><p><Check size={16}/> Updated dates or periods</p><p><Check size={16}/> Changes to payment terms</p></div></section></AppShell>;
}

function CompareFileCard({ label, detail }: { label: string; detail: string }) { const [name, setName] = useState(""); const id = label === "Document A" ? "doc-a" : "doc-b"; return <label htmlFor={id} className="compare-file-card"><span className="micro-label accent-label">{label}</span><strong>{name || detail}</strong><span>{name || "Select a PDF from your device"}</span><input id={id} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(event) => { const selected = event.target.files?.[0]; setName(selected?.name ?? ""); }}/><Button variant="outline" size="sm" asChild><span><Upload size={15}/> Browse PDF</span></Button></label>; }

export function AskPage() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(false);
  return <AppShell title="Ask your document." eyebrow="Document questions"><p className="page-intro">Explore how document-grounded questions will feel. This preview does not read a file or generate answers.</p><section className="conversation-panel"><div className="conversation-file"><span className="document-mark"><FileText size={18}/></span><div><strong>Employment Agreement — sample</strong><span>Illustrative document · No file attached</span></div><ChevronDown size={17}/></div><div className="conversation-body">{asked ? <><div className="chat-bubble chat-user">{question}</div><div className="chat-bubble chat-assistant"><span className="badge badge-amber">Preview state · No answer generated</span><p>Questions will be answered from the text of your uploaded document and include a source reference. Document Q&amp;A is not connected yet.</p><span className="source-label">No document source · Demo only</span></div></> : <div className="empty-conversation"><MessageCircleMore size={25}/><h2>What would you like to understand?</h2><p>Choose a sample question to preview the layout.</p><div className="suggested-questions">{["What is the notice period?", "How is compensation described?", "What should I ask a professional?"] .map((item) => <button key={item} onClick={() => setQuestion(item)}>{item}<ArrowRight size={14}/></button>)}</div></div>}</div><form className="question-form" onSubmit={(event) => { event.preventDefault(); if (question.trim()) setAsked(true); }}><label className="sr-only" htmlFor="question-input">Ask a question about your document</label><input id="question-input" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question about your document…"/><Button type="submit" disabled={!question.trim()}>Ask <ArrowRight size={15}/></Button></form></section></AppShell>;
}

export function LawyerPreparationPage() {
  const [generated, setGenerated] = useState(false);
  return <AppShell title="Prepare for a conversation." eyebrow="Lawyer preparation"><p className="page-intro">Organize your questions and documents before speaking with a qualified legal professional.</p><div className="preparation-layout"><section className="preparation-main"><div className="selected-document"><FileText size={18}/><span><strong>Employment Agreement — sample</strong><small>Illustrative example · Not linked to a real document</small></span><ChevronDown size={17}/></div><Button onClick={() => setGenerated(true)}><BookOpenCheck size={16}/> Prepare for legal consultation</Button>{generated && <div className="brief-preview" role="status"><span className="badge badge-amber">Example structure · Not generated from a document</span><h2>Consultation brief</h2><div className="brief-block"><h3>Questions to consider</h3><ul><li>How does the notice period apply in my circumstances?</li><li>Does the agreement describe compensation clearly?</li><li>What does the confidentiality period cover?</li></ul></div><div className="brief-block"><h3>Information to bring</h3><ul><li>A copy of the agreement and any earlier versions</li><li>Notes about what you would like clarified</li></ul></div><Button variant="outline" size="sm" onClick={() => window.print()}>Print this example</Button></div>}</section><aside className="preparation-aside"><div className="feature-icon"><ListChecks size={19}/></div><h2>A useful brief can include</h2><ul><li><Check size={15}/> Document overview</li><li><Check size={15}/> Main areas to discuss</li><li><Check size={15}/> Questions for a professional</li><li><Check size={15}/> Information to bring</li><li><Check size={15}/> An action checklist</li></ul><p>It helps organize your concerns. It does not recommend legal action.</p></aside></div></AppShell>;
}

export function HistoryPage() { return <AppShell title="Your document history." eyebrow="Document history"><div className="history-toolbar"><p>Example files for the interface preview</p><Button asChild><Link to="/analyze"><FilePlus2 size={16}/> Analyze a document</Link></Button></div><DocumentList/><div className="empty-hint"><Clock3 size={19}/><span>This is sample content. Your private document history will be available after a future setup phase.</span></div></AppShell>; }

export function SettingsPage() { const [language, setLanguage] = useState("English"); return <AppShell title="Settings." eyebrow="Settings"><div className="settings-list"><section><div><h2>Language</h2><p>Choose the language for plain-language explanations.</p></div><label className="setting-control"><Languages size={16}/><select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Explanation language"><option>English</option><option>Hindi</option><option>Hinglish</option></select></label></section><section><div><h2>Account</h2><p>Sign-in and personal details will be available after authentication is connected.</p></div><Button asChild variant="outline"><Link to="/login">Sign in <ArrowRight size={15}/></Link></Button></section><section><div><h2>Privacy &amp; assistance</h2><p>Documents and their contents are not stored by this UI preview.</p></div><ShieldCheck size={19}/></section></div></AppShell>; }

export function AuthPage({ mode }: { mode: "login" | "signup" | "forgot" }) {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const title = mode === "login" ? "Welcome back." : mode === "signup" ? "Make room for clarity." : "Reset your password.";
  const description = mode === "login" ? "Sign in to continue to your document workspace." : mode === "signup" ? "Create an account to keep your documents together." : "Enter the email associated with your account.";
  useEffect(() => {
    if (mode !== "forgot") return;
    if (window.location.hash.includes("type=recovery")) setRecovery(true);
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, [mode]);

  const saveProfile = async (userId: string, fullName: string | null) => {
    const { error } = await supabase.from("profiles").upsert(
      { id: userId, full_name: fullName },
      { onConflict: "id" },
    );
    if (error) throw error;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const fullName = String(form.get("fullName") ?? "").trim();
    try {
      if (mode === "forgot" && recovery) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setNotice("Your password has been updated. You can now sign in.");
        setRecovery(false);
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/forgot-password`,
        });
        if (error) throw error;
        setNotice("If an account exists for that email, a password reset link is on its way.");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        if (data.user && data.session) {
          await saveProfile(data.user.id, fullName || null);
          await navigate({ to: "/dashboard" });
        } else {
          setNotice("Check your email to confirm your account, then sign in to continue.");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await saveProfile(data.user.id, data.user.user_metadata?.full_name ?? null);
        await navigate({ to: "/dashboard" });
      }
    } catch {
      setNotice("We couldn't complete that request. Check your details and try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setBusy(true);
    setNotice("");
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (data.user) {
        await saveProfile(data.user.id, data.user.user_metadata?.full_name ?? null);
        await navigate({ to: "/dashboard" });
      }
    } catch {
      setNotice("Google sign-in couldn't be completed. Please try again.");
      setBusy(false);
    }
  };

  const isRecovery = mode === "forgot" && recovery;
  return <main className="auth-page"><header className="auth-header"><Brand/><Link to="/">Back to home <ArrowLeft size={15}/></Link></header><div className="auth-layout"><section className="auth-aside"><div className="micro-label">Understand · Explore · Prepare</div><h1>Clearer questions start with understanding.</h1><p>NyayaSaathi AI helps you prepare for a conversation with a qualified legal professional.</p><Disclaimer/></section><section className="auth-form-panel"><span className="micro-label accent-label">{mode === "forgot" ? "Account recovery" : "Your workspace"}</span><h2>{isRecovery ? "Choose a new password." : title}</h2><p>{isRecovery ? "Enter a new password for your account." : description}</p><form onSubmit={handleSubmit} className="auth-form">{mode === "signup" && <label>Full name<input name="fullName" required autoComplete="name" placeholder="Your name"/></label>}{!isRecovery && <label>Email address<input name="email" required type="email" autoComplete="email" placeholder="you@example.com"/></label>}{(mode !== "forgot" || isRecovery) && <label>{isRecovery ? "New password" : "Password"}<input name="password" required type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 8 characters" minLength={8}/></label>}{mode === "login" && <Link className="forgot-link" to="/forgot-password">Forgot password?</Link>}<Button type="submit" className="auth-submit" disabled={busy}>{busy ? "Please wait…" : isRecovery ? "Update password" : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}<ArrowRight size={16}/></Button>{notice && <p className="auth-notice" role="status">{notice}</p>}</form>{mode !== "forgot" && <><div className="auth-divider"><span>or continue with</span></div><Button type="button" variant="outline" className="auth-google" onClick={handleGoogleSignIn} disabled={busy}><GoogleMark/> Continue with Google</Button></>}<p className="auth-switch">{mode === "login" ? <>New here? <Link to="/signup">Create an account</Link></> : mode !== "forgot" ? <>Already have an account? <Link to="/login">Sign in</Link></> : <Link to="/login">Back to sign in</Link>}</p><Disclaimer compact/></section></div></main>;
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 18 18" width="17" height="17"><path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.23-.16-1.8H9v3.4h4.84a4.14 4.14 0 0 1-1.8 2.72v2.23h2.92c1.71-1.58 2.68-3.9 2.68-6.55Z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.2l-2.92-2.27c-.81.54-1.84.87-3.04.87-2.34 0-4.33-1.58-5.04-3.71H.94v2.33A9 9 0 0 0 9 18Z"/><path fill="#FBBC05" d="M3.96 10.69a5.4 5.4 0 0 1 0-3.38V4.98H.94a9 9 0 0 0 0 8.04l3.02-2.33Z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.63 8.63 0 0 0 9 0a9 9 0 0 0-8.06 4.98l3.02 2.33C4.67 5.16 6.66 3.58 9 3.58Z"/></svg>;
}