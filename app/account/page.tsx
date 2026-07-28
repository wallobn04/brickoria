import { CurrencyAmount, CurrencySwitcher } from "@/app/components/CurrencyProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export const metadata = {
  title: "Area clienti — Brickoria",
  description: "La futura area personale Brickoria per ordini, spedizioni e resi.",
};

export default function AccountPage() {
  return (
    <main className="account-page">
      <div className="announcement"><span><span>Spedizione gratuita da</span> <CurrencyAmount value={35} /></span><span className="announcement-dot">●</span><span>Set originali e sigillati</span><span className="announcement-dot">●</span><span>Assistenza WhatsApp 24/7</span></div>
      <nav className="nav detail-nav" aria-label="Navigazione area clienti">
        <a className="brand" href="/"><span className="brand-mark">B</span><span>BRICKORIA<small>PLAY • BUILD • SMILE</small></span></a>
        <div className="nav-links"><a href="/#catalogo">Shop</a><a href="/#categorie">Categorie</a><a href="/#contatti">Assistenza</a></div>
        <div className="detail-nav-actions"><LanguageSwitcher /><CurrencySwitcher /><a className="detail-back" href="/">← Torna al negozio</a></div>
      </nav>

      <section className="account-shell">
        <div className="account-side">
          <span className="account-kicker">IL TUO SPAZIO BRICKORIA</span>
          <h1>Tutto sotto controllo,<br /><em>mattoncino dopo mattoncino.</em></h1>
          <p>Quando l’area sarà collegata alla piattaforma acquisti, ogni cliente vedrà solo i propri ordini e le relative informazioni.</p>
          <div className="account-benefits">
            <div><b>📦</b><span><strong>I tuoi ordini</strong><small>Prodotti, importi e date</small></span></div>
            <div><b>🚚</b><span><strong>Spedizioni</strong><small>Stato e tracciamento</small></span></div>
            <div><b>↩</b><span><strong>Resi più veloci</strong><small>Avvio direttamente dall’ordine</small></span></div>
          </div>
        </div>

        <div className="login-preview">
          <span className="preview-ribbon">ANTEPRIMA</span>
          <div className="login-icon" aria-hidden="true">👤</div>
          <span className="kicker">ACCESSO CLIENTI</span>
          <h2>Bentornato!</h2>
          <p>Il login con email e password verrà attivato insieme alla piattaforma che registrerà gli acquisti.</p>
          <form aria-describedby="login-status">
            <label>Email<input type="email" placeholder="nome@email.it" disabled /></label>
            <label>Password<input type="password" placeholder="••••••••" disabled /></label>
            <button className="button primary" type="button" disabled>Accesso in preparazione</button>
          </form>
          <div className="login-status" id="login-status"><span>🔒</span><p><b>Nessuna password viene ancora raccolta.</b> Attiveremo il modulo solo con un sistema sicuro e collegato agli ordini reali.</p></div>
        </div>
      </section>

      <section className="orders-preview">
        <div><span className="kicker">DOPO L’ACCESSO</span><h2>La cronologia acquisti sarà <em>qui.</em></h2><p>Ordini, stato della consegna e pulsante per il reso saranno riuniti in un’unica schermata personale.</p></div>
        <div className="orders-window" aria-label="Anteprima della futura cronologia ordini">
          <header><span>I MIEI ORDINI</span><b>Anteprima</b></header>
          <article><span>📦</span><div><small>ORDINE #BRK-0000</small><strong>Il tuo prossimo set</strong><p>Data, totale e spedizione compariranno qui.</p></div><b>IN ARRIVO</b></article>
          <footer><span>Totale ordine</span><strong>—</strong><button disabled>Vedi dettagli</button></footer>
        </div>
      </section>

      <footer className="inner-footer">
        <a className="brand footer-brand" href="/"><span className="brand-mark">B</span><span>BRICKORIA<small>PLAY • BUILD • SMILE</small></span></a>
        <p>Il tuo posto felice, un mattoncino alla volta.</p>
        <div><a href="/#catalogo">Catalogo</a><a href="/#contatti">Assistenza</a><span>◎ Instagram <small>PROSSIMAMENTE</small></span><span>♪ TikTok <small>PROSSIMAMENTE</small></span></div>
      </footer>
    </main>
  );
}
