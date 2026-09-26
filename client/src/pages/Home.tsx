/* Payday Mate Whiteboard Trust: white-first editorial layout, multicolour signals, honest integration states. */
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { ArrowRight, Check, ChevronDown, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

const WHOP_URL = "";
const DISCORD_INVITE_URL = "";

const tiers = [
  { name: "Silver", price: "$2.99", color: "silver", description: "Join the network. Post up to 2 active loans at a time.", perks: ["Network access", "Up to 2 active loans"] },
  { name: "Bronze", price: "$5.99", color: "bronze", description: "More room to lend and borrow, with practical trust-building tools.", perks: ["Up to 5 active loans", "Trust badge", "Repayment reminders"] },
  { name: "Gold", price: "$9.99", color: "gold", description: "Priority access for members who want the full lending experience.", perks: ["Unlimited loans", "Priority matching", "Dispute mediation"], featured: true },
  { name: "VIP", price: "$14.99", color: "vip", description: "The complete Payday Mate experience with extra visibility and support.", perks: ["Everything in Gold", "Featured profile", "Early platform alerts", "Dedicated support"] },
];

const steps = [
  ["01", "Join and set your payday cycle", "Introduce yourself and share whether you are paid weekly, fortnightly, or monthly."],
  ["02", "Browse or request a loan", "Post in the right channel, or browse open requests and offers from members you trust."],
  ["03", "Agree and settle via PayID", "Agree on the amount and repayment date, then send funds directly between members."],
  ["04", "Build your trust score", "Repay on time, communicate early, and build a reputation that helps future matches."],
  ["05", "Repay on your payday", "Send the agreed amount via PayID and confirm it in the repayment channel."],
];

function handlePending(kind: "Whop" | "Discord") {
  toast(`${kind} link pending`, { description: `Add the live ${kind} URL in Home.tsx when it is ready.` });
}

export default function Home() {
  // The useAuth hook provides authentication state.
  // To implement login/logout, call logout(), or start login from an event
  // handler: onClick={() => startLogin()} (imported from "@/const"). Never call
  // startLogin() during render (no href={startLogin()}) — it mints a one-time
  // nonce cookie and must run only at the moment of navigation.
  const { isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); goTo("top"); }}>
          <img src="/manus-storage/payday-mate-logo_de638b7a.png" alt="Payday Mate multicolour handshake logo" />
          <span>Payday <strong>mate</strong></span>
        </a>
        <button className="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <button onClick={() => goTo("how-it-works")}>How it works</button>
          <button onClick={() => goTo("tiers")}>Membership</button>
          <button onClick={() => goTo("community")}>Community</button>
          <button className="nav-pill" onClick={() => isAuthenticated ? window.location.assign("/hub") : startLogin()}>{isAuthenticated ? "Open member hub" : "Join the network"} <ArrowRight size={15} /></button>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy reveal-up">
            <p className="eyebrow"><span className="signal blue" /> Australia’s payday-cycle community</p>
            <h1>Lend when you're loaded.<br /><em>Borrow when you need it.</em></h1>
            <p className="hero-lead">Payday Mate connects everyday Australians who want to help each other between paydays. Members agree directly, settle directly via PayID, and build trust one repayment at a time.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => isAuthenticated ? window.location.assign("/hub") : startLogin()}>{isAuthenticated ? "Open your member hub" : "Create your member profile"} <ArrowRight size={16} /></button>
              <button className="button button-soft" onClick={() => goTo("how-it-works")}>See how it works</button>
            </div>
            <p className="fine-print">No bank. No middleman. Payday Mate does not hold or move member funds.</p>
          </div>
          <div className="hero-visual reveal-up delay-one">
            <div className="hero-visual-frame"><img src="/manus-storage/payday-mate-hero_9a19e56a.png" alt="Multicolour handshake illustration for Payday Mate" /></div>
            <div className="floating-proof"><ShieldCheck size={17} /><span><strong>Built on trust</strong><small>One repayment at a time</small></span></div>
          </div>
        </section>

        <section className="trust-band">
          <div className="section-wrap trust-grid">
            <div><span className="trust-label blue-text">01</span><strong>Trust / PayID settlement</strong><p>Members settle directly.</p></div>
            <div><span className="trust-label red-text">02</span><strong>Action / repayment clarity</strong><p>Agree clearly, repay on time.</p></div>
            <div><span className="trust-label green-text">03</span><strong>Community / weekly rhythm</strong><p>Find your place in the network.</p></div>
          </div>
        </section>

        <section id="how-it-works" className="section-wrap content-section">
          <div className="section-heading split-heading"><div><p className="eyebrow"><span className="signal red" /> The simple cycle</p><h2>How Payday Mate works</h2></div><p>When it's your payday and you're flush, you can lend a mate what they need. When their payday arrives, they pay you back directly to your PayID.</p></div>
          <div className="steps-grid">{steps.map(([number, title, copy], index) => <article className="step-card" key={number}><span className={`step-number step-${index + 1}`}>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section id="tiers" className="section-wrap content-section tiers-section">
          <div className="section-heading"><p className="eyebrow"><span className="signal yellow" /> Choose your access</p><h2>Membership that fits your rhythm.</h2><p>Set your payday rhythm, meet the rules, and choose the level of community access that fits your week.</p></div>
          <div className="tiers-grid">{tiers.map((tier) => <article className={`tier-card ${tier.color} ${tier.featured ? "is-featured" : ""}`} key={tier.name}>{tier.featured && <span className="featured-tag"><Sparkles size={12} /> Most popular</span>}<div className="tier-top"><span className="tier-name">{tier.name}</span><span className="tier-price">{tier.price}<small>/wk</small></span></div><p>{tier.description}</p><ul>{tier.perks.map((perk) => <li key={perk}><Check size={15} /> {perk}</li>)}</ul><button className="tier-button" onClick={() => WHOP_URL ? window.open(WHOP_URL, "_blank", "noopener,noreferrer") : handlePending("Whop")}>Join the {tier.name} circle <ArrowRight size={15} /></button></article>)}</div>
          <p className="legal-note">Payday Mate is a community platform, not a licensed financial institution. Loans are between individual members. Payday Mate does not guarantee repayment or accept liability for losses. Participate within your means.</p>
        </section>

        <section id="community" className="section-wrap community-card">
          <div className="community-copy"><p className="eyebrow"><span className="signal green" /> Find your people</p><h2>Ready when your payday is.</h2><p>Join the Discord community to read the rules, introduce yourself, set your payday cycle, and access the lending board once subscribed.</p><button className="button button-primary" onClick={() => DISCORD_INVITE_URL ? window.open(DISCORD_INVITE_URL, "_blank", "noopener,noreferrer") : handlePending("Discord")}>Join the Discord <ArrowRight size={16} /></button></div>
          <div className="community-image"><img src="/manus-storage/payday-mate-community_e2ab87b1.png" alt="Colourful community noticeboard illustration" /></div>
        </section>

        <section className="section-wrap safe-note"><div className="safe-icon"><ShieldCheck size={18} /></div><div><strong>Boundary first. Trust follows.</strong><p>All settlement is between members via PayID. Payday Mate does not hold or move money. Keep PayID details private, share them only with a confirmed match, and speak up early if a repayment changes.</p></div><ChevronDown size={18} className="safe-arrow" /></section>
      </main>
      <footer className="site-footer"><div className="section-wrap footer-inner"><div className="footer-brand"><img src="/manus-storage/payday-mate-logo_de638b7a.png" alt="Payday Mate logo" /><span>Payday Mate</span></div><span>Lend when you're loaded...borrow when you need it!</span><span>© 2026 Payday Mate</span></div></footer>
    </div>
  );
}
