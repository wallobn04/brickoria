"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CurrencyAmount, CurrencySwitcher } from "@/app/components/CurrencyProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { money, products, themes, whatsapp, type Product, type Theme } from "@/lib/catalog";

function Stud({ color }: { color: string }) {
  return <span className="stud" style={{ background: color }} aria-hidden="true" />;
}

function Modal({ title, onClose, children, wide = false, tone }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean; tone?: "gift" | "return" }) {
  return (
    <div className="overlay modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`modal ${wide ? "modal-wide" : ""} ${tone === "gift" ? "gift-modal" : ""} ${tone === "return" ? "return-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-head"><h2 id="modal-title">{title}</h2><button onClick={onClose} aria-label="Chiudi">×</button></div>
        {children}
      </section>
    </div>
  );
}

export default function Home() {
  const [audience, setAudience] = useState("Tutti");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftForm, setGiftForm] = useState({ age: "", budget: "", interest: "" });
  const [giftResult, setGiftResult] = useState<Product | null>(null);
  const [returnOpen, setReturnOpen] = useState(false);
  const [returnForm, setReturnForm] = useState({ order: "", email: "", reason: "" });
  const [returnReady, setReturnReady] = useState(false);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    setCookiesOpen(!window.localStorage.getItem("brickoria-cookie-choice"));
  }, []);

  const visible = useMemo(
    () => products.filter((product) => audience === "Tutti" || product.audience === audience),
    [audience],
  );

  const cartLines = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = cartLines.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  const freeShippingGap = Math.max(0, 35 - total);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2300);
  }

  function add(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    showToast(`${product.name} aggiunto al carrello`);
  }

  function changeQuantity(productId: number, delta: number) {
    setCart((current) => {
      const next = Math.max(0, (current[productId] || 0) + delta);
      const updated = { ...current };
      if (!next) delete updated[productId];
      else updated[productId] = next;
      return updated;
    });
  }

  function recommendGift(event: FormEvent) {
    event.preventDefault();
    const age = Number(giftForm.age);
    const budget = Number(giftForm.budget);
    const selectedTheme = giftForm.interest as Theme;
    const candidates = products
      .filter((product) => product.theme === selectedTheme && product.minAge <= age && product.price <= budget)
      .sort((a, b) => b.price - a.price);
    const fallback = products
      .filter((product) => product.minAge <= age && product.price <= budget)
      .sort((a, b) => Math.abs(b.price - budget) - Math.abs(a.price - budget))
      .pop();
    setGiftResult(candidates[0] || fallback || products[4]);
  }

  function prepareReturn(event: FormEvent) {
    event.preventDefault();
    window.localStorage.setItem("brickoria-return-draft", JSON.stringify(returnForm));
    setReturnReady(true);
  }

  function saveCookies(mode: "necessary" | "all" | "custom") {
    const selected = mode === "all" ? { analytics: true, marketing: true } : mode === "necessary" ? { analytics: false, marketing: false } : cookiePrefs;
    window.localStorage.setItem("brickoria-cookie-choice", JSON.stringify(selected));
    setCookiePrefs(selected);
    setCookiesOpen(false);
    setCookiePrefsOpen(false);
    showToast("Preferenze cookie salvate");
  }

  const reserveMessage = `Ciao Brickoria, vorrei prenotare questi set:\n${cartLines.map((product) => `• ${cart[product.id]}× ${product.name}`).join("\n")}\nTotale indicativo: ${money(total)}`;
  const giftMessage = giftResult ? `Ciao Brickoria, il vostro consulente regalo mi ha consigliato “${giftResult.name}”. Cerco un regalo per ${giftForm.age} anni, budget ${giftForm.budget} €, interesse ${giftForm.interest}. Vorrei parlare con un operatore.` : "";
  const returnMessage = `Ciao Brickoria, vorrei avviare un reso.\nOrdine: ${returnForm.order}\nEmail: ${returnForm.email}\nMotivo: ${returnForm.reason}`;

  return (
    <main>
      <div className="announcement"><span><span>Spedizione gratuita da</span> <CurrencyAmount value={35} /></span><span className="announcement-dot">●</span><span>Set originali e sigillati</span><span className="announcement-dot">●</span><span>Assistenza WhatsApp 24/7</span></div>

      <nav className="nav" aria-label="Navigazione principale">
        <a className="brand" href="#">
          <span className="brand-mark"><Stud color="#fff" /><Stud color="#fff" />B</span>
          <span>BRICKORIA<small>PLAY • BUILD • SMILE</small></span>
        </a>
        <div className="nav-links"><a href="#catalogo">Shop</a><a href="#categorie">Categorie</a><a href="#chi-siamo">Chi siamo</a><button onClick={() => setGiftOpen(true)}>Consiglia regalo</button><a className="account-link" href="/account/">👤 Area clienti</a></div>
        <div className="nav-actions">
          <LanguageSwitcher />
          <CurrencySwitcher />
          <a className="account-mini" href="/account/" aria-label="Area clienti" title="Area clienti">👤</a>
          <a className="whatsapp-mini" href={whatsapp("Ciao Brickoria, vorrei informazioni su un set.")} target="_blank" rel="noreferrer">● WhatsApp 24/7</a>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Apri carrello, ${cartCount} articoli`}>🛒 <span>{cartCount}</span></button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span>★</span> SET ORIGINALI, DIVERTIMENTO AUTENTICO</div>
          <h1>Costruisci<br />la tua prossima<br /><em>storia.</em></h1>
          <p>Dai primi mattoncini ai set da collezione: trova il mondo perfetto per giocare, creare e sognare.</p>
          <div className="hero-cta">
  <a className="button primary" href="#catalogo">
    Scopri i set <span>→</span>
  </a>

  <button className="button primary gift-button" onClick={() => setGiftOpen(true)}>
    Trova un regalo <span>🎁</span>
  </button>
</div>
          <div className="trust"><span>✓ Pagamenti sicuri</span><span>✓ Consegna tracciata</span><span>✓ Assistenza italiana</span></div>
        </div>
        <div className="hero-art" aria-label="Composizione giocosa di mattoncini colorati">
          <div className="sun"></div><div className="cloud one"></div><div className="cloud two"></div>
          <div className="brick yellow b1"><i></i><i></i><i></i><i></i></div>
          <div className="brick red b2"><i></i><i></i><i></i></div>
          <div className="brick blue b3"><i></i><i></i><i></i><i></i></div>
          <div className="brick green b4"><i></i><i></i></div>
          <div className="mini-figure"><b>●</b><span></span><i>⌁</i></div>
          <div className="spark s1">✦</div><div className="spark s2">✦</div>
          <div className="hero-label">100%<small>ORIGINALI</small></div>
        </div>
      </section>

      <section className="theme-section" id="categorie">
        <div className="section-head category-head"><div><span className="kicker">ESPLORA PER PASSIONE</span><h2>Un mondo per<br /><em>ogni costruttore.</em></h2></div><p>Dal calcio alle supercar, dalle missioni spaziali ai set da esposizione: entra direttamente nel tema che ami.</p></div>
        <div className="theme-grid">
          {themes.map((item) => (
            <a className="theme-card" key={item.name} href={`/categorie/${item.slug}/`} style={{ "--theme-color": item.color } as React.CSSProperties}>
              <span>{item.icon}</span><div><b>{item.name}</b><small>{item.copy}</small></div><i>→</i>
            </a>
          ))}
        </div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="section-head">
          <div><span className="kicker">CATALOGO DIMOSTRATIVO</span><h2>Set che fanno <em>wow</em></h2></div>
          <div className="filter-stack">
            <div className="filters" role="group" aria-label="Filtra prodotti per pubblico">
              {["Tutti", "Bambini", "Famiglie", "Collezionisti"].map((item) => <button key={item} className={audience === item ? "active" : ""} onClick={() => setAudience(item)}>{item}</button>)}
            </div>
          </div>
        </div>
        <div className="product-grid">
          {visible.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-visual" style={{ background: product.color }}>
                <span className="badge">{product.badge}</span><span className="theme-label">{product.theme}</span>
                <button className="heart" aria-label={`Aggiungi ${product.name} ai preferiti`}>♡</button>
                <a className="product-open" href={`/prodotti/${product.slug}/`} aria-label={`Apri la pagina di ${product.name}`}>
                  <div className="box" style={{ "--accent": product.accent } as React.CSSProperties}><strong>{product.line}</strong><b>{product.icon}</b><small>ORIGINAL SET</small></div>
                  <div className="loose l1"></div><div className="loose l2"></div>
                </a>
              </div>
              <div className="product-info">
                <span className="product-meta">{product.line} • {product.age} • {product.theme}</span><h3><a href={`/prodotti/${product.slug}/`}>{product.name}</a></h3>
                <div className="product-bottom"><div><strong><CurrencyAmount value={product.price} /></strong>{product.oldPrice && <del><CurrencyAmount value={product.oldPrice} /></del>}</div><div className="product-actions"><a href={`/prodotti/${product.slug}/`} aria-label={`Scopri ${product.name}`}>→</a><button onClick={() => add(product)} aria-label={`Aggiungi ${product.name} al carrello`}>＋</button></div></div>
              </div>
            </article>
          ))}
        </div>
        {!visible.length && <div className="no-results"><span>🧱</span><h3>Nessun set con questi filtri</h3><button onClick={() => setAudience("Tutti")}>Mostra tutto il catalogo</button></div>}
      </section>

      

      <section className="gift" id="regalo">
        <div className="gift-art"><span className="gift-sticker">IDEA!</span><div className="gift-box"><span></span><i></i></div><b>?</b></div>
        <div className="gift-copy"><span className="kicker dark">CONSULENTE REGALO</span><h2>Il regalo giusto,<br /><em>senza andare a caso.</em></h2><p>Età, passione e budget: il sito suggerisce subito il set più adatto. Se vuoi approfondire, passi a un operatore WhatsApp con tutte le risposte già pronte.</p><div className="gift-promises"><span>✓ Risposta immediata</span><span>✓ Budget fino a 500 €</span></div><button className="button light" onClick={() => setGiftOpen(true)}>Troviamo il regalo giusto <span>→</span></button></div>
        <div className="gift-stats"><div><strong>3</strong><span>domande semplici</span></div><div><strong>CON</strong><span>budget massimo</span></div><div><strong>24/7</strong><span>supporto WhatsApp</span></div></div>
      </section>
      <section className="about" id="chi-siamo">
        <div className="about-intro">
          <div><span className="kicker light-kicker">CHI SIAMO</span><h2>Un negozio indipendente,<br /><em>costruito sulla fiducia.</em></h2></div>
          <div className="about-copy"><p>Brickoria nasce per rendere più semplice scegliere e acquistare set originali, con un servizio vicino alle famiglie e competente per gli appassionati.</p><p>Selezioniamo le proposte da fornitori verificati, controlliamo ogni confezione prima della spedizione e restiamo disponibili anche dopo l’acquisto.</p></div>
        </div>
        <div className="activity-grid">
          <article><span>01</span><h3>Selezione responsabile</h3><p>Valutiamo autenticità, condizioni e convenienza prima di inserire un set nel catalogo.</p></article>
          <article><span>02</span><h3>Consiglio personale</h3><p>Età, interessi e budget guidano ogni suggerimento: niente proposte casuali.</p></article>
          <article><span>03</span><h3>Assistenza continua</h3><p>Dalla disponibilità al reso, il nostro supporto WhatsApp è accessibile 24 ore su 24.</p></article>
        </div>
        <div className="about-note"><strong>La nostra promessa</strong><p>Informazioni chiare, set originali e una risposta concreta quando serve. Vogliamo che l’esperienza sia piacevole quanto aprire la scatola.</p><a href={whatsapp("Ciao Brickoria, vorrei conoscere meglio la vostra attività.")} target="_blank" rel="noreferrer">Parla con noi →</a></div>
        <div className="about-socials">
          <div><span className="kicker light-kicker">SEGUICI ANCHE QUI</span><p>I profili ufficiali Brickoria sono in preparazione. I collegamenti saranno attivati appena saranno disponibili.</p></div>
          <span className="about-social-card" aria-disabled="true"><b>◎</b><span><strong>Instagram</strong><small>PROFILO IN ARRIVO</small></span></span>
          <span className="about-social-card" aria-disabled="true"><b>♪</b><span><strong>TikTok</strong><small>PROFILO IN ARRIVO</small></span></span>
        </div>
      </section>

      <section className="service-band">
        <div><span>📦</span><h3>Originali e sigillati</h3><p>Set nuovi e controllati.</p></div>
        <div><span>🚚</span><h3>Consegna tracciata</h3><p>Segui sempre il tuo ordine.</p></div>
        <div><span>↩</span><h3>Reso guidato</h3><p>Avvia la procedura dal sito.</p><button onClick={() => { setReturnReady(false); setReturnOpen(true); }}>Inizia un reso →</button></div>
      </section>

      <section className="contact" id="contatti">
        <div><span className="kicker">CERCHI UN SET?</span><h2>Chiedilo a noi,<br />a qualsiasi ora.</h2></div>
        <p>Scrivici il nome o il tema che cerchi. Verifichiamo disponibilità e prezzo e ti aiutiamo a prenotarlo.</p>
        <a className="button whatsapp" href={whatsapp("Ciao Brickoria, vorrei informazioni o prenotare un set.")} target="_blank" rel="noreferrer">● WhatsApp 24/7</a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#"><span className="brand-mark">B</span><span>BRICKORIA<small>PLAY • BUILD • SMILE</small></span></a>
        <p>Il tuo posto felice, un mattoncino alla volta.</p>
        <div>
          <a href="#catalogo">Spedizioni</a>
          <button onClick={() => { setReturnReady(false); setReturnOpen(true); }}>Resi</button>
          <button onClick={() => { setCookiePrefsOpen(true); setCookiesOpen(false); }}>Preferenze cookie</button>
          <a href="#chi-siamo">Chi siamo</a>
          <a href="/account/">Area clienti</a>
        </div>
        <div className="social-links" aria-label="Social network">
          <span><b>◎</b> Instagram <small>PROSSIMAMENTE</small></span>
          <span><b>♪</b> TikTok <small>PROSSIMAMENTE</small></span>
        </div>
        <small className="legal">Brickoria è un rivenditore indipendente e non è affiliato, sponsorizzato o approvato dal LEGO Group. LEGO® è un marchio del LEGO Group. I prodotti e i prezzi mostrati sono dimostrativi e vanno sostituiti con il catalogo reale prima dell’apertura.</small>
      </footer>

      {toast && <div className="toast" role="status">✓ {toast}</div>}

      {cartOpen && (
        <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}>
          <aside className="cart-panel" aria-label="Carrello">
            <div className="cart-title"><div><span>IL TUO ORDINE</span><h2>Carrello</h2></div><button onClick={() => setCartOpen(false)} aria-label="Chiudi carrello">×</button></div>
            {cartCount === 0 ? <div className="empty"><span>🛒</span><h3>Il carrello è vuoto</h3><p>È un ottimo posto per iniziare una nuova storia.</p><button className="button primary" onClick={() => setCartOpen(false)}>Scopri i set</button></div> : (
              <>
                <div className="shipping-progress"><p>{freeShippingGap ? <>Ti mancano <strong><CurrencyAmount value={freeShippingGap} /></strong> per la spedizione gratuita</> : <><strong>Spedizione gratuita sbloccata!</strong> 🎉</>}</p><div><span style={{ width: `${Math.min(100, (total / 35) * 100)}%` }}></span></div></div>
                <div className="cart-items">{cartLines.map((item) => (
                  <div className="cart-row" key={item.id}>
                    <span style={{ background: item.color }}>{item.icon}</span>
                    <div className="cart-product"><b>{item.name}</b><small>{item.line} • {item.age}</small><button onClick={() => changeQuantity(item.id, -cart[item.id])}>Rimuovi</button></div>
                    <div className="cart-line-end"><strong><CurrencyAmount value={item.price * cart[item.id]} /></strong><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Riduci quantità ${item.name}`}>−</button><span>{cart[item.id]}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Aumenta quantità ${item.name}`}>＋</button></div></div>
                  </div>
                ))}</div>
                <div className="cart-summary"><div><span>Subtotale</span><strong><CurrencyAmount value={total} /></strong></div><small>Spedizione calcolata al passaggio successivo.</small></div>
                <button className="button checkout" onClick={() => showToast("Il pagamento sarà collegato quando avrai scelto la piattaforma ecommerce")}>Procedi al pagamento →</button>
                <a className="button reserve-button" href={whatsapp(reserveMessage)} target="_blank" rel="noreferrer">Prenota su WhatsApp</a>
                <div className="cart-reassurance"><span>🔒 Pagamento sicuro</span><span>↩ Reso guidato</span></div>
              </>
            )}
          </aside>
        </div>
      )}

      {giftOpen && (
        <Modal title="Troviamo il regalo giusto" onClose={() => { setGiftOpen(false); setGiftResult(null); }} wide tone="gift">
          {!giftResult ? (
            <form className="advisor-form gift-advisor-form" onSubmit={recommendGift}>
              <div className="advisor-intro">
                <div className="advisor-mascot" aria-hidden="true"><span>🎁</span><b>?</b></div>
                <div><span className="advisor-badge">IL TUO CONSIGLIO IN MENO DI UN MINUTO</span><p>Dicci per chi è il regalo e cosa gli piace. Al resto pensiamo noi.</p></div>
              </div>
              <div className="advisor-steps" aria-hidden="true"><span><b>1</b> Età</span><i></i><span><b>2</b> Budget</span><i></i><span><b>3</b> Passione</span></div>
              <div className="form-grid advisor-fields">
                <label><span><i>🎂</i> Età di chi riceve il regalo</span><select required value={giftForm.age} onChange={(e) => setGiftForm({ ...giftForm, age: e.target.value })}><option value="">Scegli l’età</option><option value="5">4–6 anni</option><option value="8">7–9 anni</option><option value="11">10–12 anni</option><option value="15">13–17 anni</option><option value="18">18+ anni</option></select></label>
                <label><span><i>💶</i> Budget massimo</span><select required value={giftForm.budget} onChange={(e) => setGiftForm({ ...giftForm, budget: e.target.value })}><option value="">Scegli il budget</option><option value="35">Fino a 35 €</option><option value="60">Fino a 60 €</option><option value="100">Fino a 100 €</option><option value="150">Fino a 150 €</option><option value="250">Fino a 250 €</option><option value="350">Fino a 350 €</option><option value="500">Fino a 500 €</option></select></label>
                <label className="wide-field"><span><i>✨</i> Passione principale</span><select required value={giftForm.interest} onChange={(e) => setGiftForm({ ...giftForm, interest: e.target.value })}><option value="">Scegli una passione</option>{themes.map((item) => <option key={item.name} value={item.name}>{item.icon} {item.name}</option>)}</select></label>
              </div>
              <button className="button primary advisor-submit" type="submit"><span>🎯</span> Mostrami il regalo perfetto <b>→</b></button>
              <small className="advisor-note">Consiglio immediato dal sito · Nessun dato personale richiesto</small>
            </form>
          ) : (
            <div className="recommendation">
              <div className="recommendation-visual" style={{ background: giftResult.color }}><span>{giftResult.icon}</span></div>
              <div><span className="kicker">IL NOSTRO CONSIGLIO</span><h3>{giftResult.name}</h3><p>Adatto da {giftResult.age}, tema {giftResult.theme}. Rientra nel tuo budget ed è una proposta coerente con l’interesse selezionato.</p><strong><CurrencyAmount value={giftResult.price} /></strong><div className="recommendation-actions"><button className="button primary" onClick={() => { add(giftResult); setGiftOpen(false); setGiftResult(null); }}>Aggiungi al carrello</button><button className="retry" onClick={() => setGiftResult(null)}>Cambia risposte</button></div></div>
              <div className="operator-help"><b>Non basta questo consiglio?</b><p>Invia le tue risposte a un operatore WhatsApp disponibile 24/7: non dovrai ricominciare da capo.</p><a className="button whatsapp" href={whatsapp(giftMessage)} target="_blank" rel="noreferrer">Continua con un operatore →</a></div>
            </div>
          )}
        </Modal>
      )}

      {returnOpen && (
        <Modal title="Avvia un reso" onClose={() => setReturnOpen(false)} wide tone="return">
          {!returnReady ? (
            <form className="return-form return-form-polished" onSubmit={prepareReturn}>
              <div className="return-intro"><div className="return-icon" aria-hidden="true">↩</div><div><span>RESO GUIDATO, SENZA STRESS</span><p>Compila i dati una sola volta: prepariamo la richiesta e la passiamo all’assistenza WhatsApp 24/7.</p></div></div>
              <div className="return-steps" aria-hidden="true"><span className="active"><b>1</b> Dati ordine</span><i></i><span><b>2</b> Verifica</span><i></i><span><b>3</b> Assistenza</span></div>
              <div className="return-fields">
                <label><span><i>📦</i> Numero ordine</span><input required placeholder="es. BRK-1024" value={returnForm.order} onChange={(e) => setReturnForm({ ...returnForm, order: e.target.value })} /></label>
                <label><span><i>✉️</i> Email usata per l’ordine</span><input required type="email" placeholder="nome@email.it" value={returnForm.email} onChange={(e) => setReturnForm({ ...returnForm, email: e.target.value })} /></label>
                <label className="return-reason"><span><i>📝</i> Motivo del reso</span><select required value={returnForm.reason} onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}><option value="">Seleziona un motivo</option><option>Ho cambiato idea</option><option>Confezione danneggiata</option><option>Articolo non conforme</option><option>Prodotto errato</option><option>Altro</option></select></label>
              </div>
              <div className="return-note"><b>💡 Prima di iniziare</b><span>Tieni prodotto, confezione e prova d’acquisto. L’assistenza verificherà idoneità e istruzioni di spedizione.</span></div>
              <button className="button primary return-submit" type="submit">Prepara la richiesta <span>→</span></button>
              <small className="return-privacy">I dati restano su questo dispositivo finché non scegli di inviarli all’assistenza.</small>
            </form>
          ) : (
            <div className="return-ready"><span>✓</span><h3>Richiesta preparata</h3><p>La bozza è salvata su questo dispositivo. Invia ora i dati all’assistenza WhatsApp 24/7 per ricevere conferma e istruzioni.</p><dl><div><dt>Ordine</dt><dd>{returnForm.order}</dd></div><div><dt>Motivo</dt><dd>{returnForm.reason}</dd></div></dl><a className="button whatsapp" href={whatsapp(returnMessage)} target="_blank" rel="noreferrer">Invia all’assistenza →</a><button className="retry" onClick={() => setReturnReady(false)}>Modifica i dati</button></div>
          )}
        </Modal>
      )}

      {cookiesOpen && (
        <aside className="cookie-banner" aria-label="Preferenze cookie">
          <div className="cookie-icon">🍪</div><div><b>La tua privacy, pezzo per pezzo.</b><p>Usiamo cookie necessari per far funzionare sito e carrello. Con il tuo consenso possiamo usare anche cookie di analisi e marketing.</p></div>
          <div className="cookie-actions"><button className="cookie-link" onClick={() => setCookiePrefsOpen(true)}>Personalizza</button><button className="cookie-secondary" onClick={() => saveCookies("necessary")}>Solo necessari</button><button className="cookie-primary" onClick={() => saveCookies("all")}>Accetta tutti</button></div>
        </aside>
      )}

      {cookiePrefsOpen && (
        <Modal title="Preferenze cookie" onClose={() => setCookiePrefsOpen(false)}>
          <div className="cookie-prefs">
            <p>Scegli liberamente. Puoi cambiare idea in qualsiasi momento dal link nel piè di pagina.</p>
            <div className="cookie-row"><div><b>Cookie necessari</b><span>Carrello, sicurezza e preferenze. Sempre attivi.</span></div><strong>Attivi</strong></div>
            <label className="cookie-row"><div><b>Analisi</b><span>Ci aiutano a capire quali pagine sono più utili.</span></div><input type="checkbox" checked={cookiePrefs.analytics} onChange={(e) => setCookiePrefs({ ...cookiePrefs, analytics: e.target.checked })} /></label>
            <label className="cookie-row"><div><b>Marketing</b><span>Servono per mostrarti comunicazioni più pertinenti.</span></div><input type="checkbox" checked={cookiePrefs.marketing} onChange={(e) => setCookiePrefs({ ...cookiePrefs, marketing: e.target.checked })} /></label>
            <button className="button primary" onClick={() => saveCookies("custom")}>Salva preferenze</button>
          </div>
        </Modal>
      )}
    </main>
  );
}
