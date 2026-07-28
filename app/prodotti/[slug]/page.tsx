import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CurrencyAmount, CurrencySwitcher } from "@/app/components/CurrencyProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { money, products, whatsapp } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} — Brickoria`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const related = products.filter((item) => item.theme === product.theme && item.id !== product.id).slice(0, 3);
  const reserveUrl = whatsapp(`Ciao Brickoria, vorrei informazioni e disponibilità per “${product.name}” al prezzo indicativo di ${money(product.price)}.`);

  return (
    <main className="detail-page">
      <div className="announcement"><span><span>Spedizione gratuita da</span> <CurrencyAmount value={35} /></span><span className="announcement-dot">●</span><span>Set originali e sigillati</span><span className="announcement-dot">●</span><span>Assistenza WhatsApp 24/7</span></div>
      <nav className="nav detail-nav" aria-label="Navigazione prodotto">
        <a className="brand" href="/"><span className="brand-mark">B</span><span>BRICKORIA<small>PLAY • BUILD • SMILE</small></span></a>
        <div className="nav-links"><a href="/#catalogo">Tutti i set</a><a href={`/categorie/${product.theme === "Città" ? "citta" : product.theme.toLowerCase()}/`}>Categoria {product.theme}</a><a className="account-link" href="/account/">👤 Area clienti</a></div>
        <div className="detail-nav-actions"><LanguageSwitcher /><CurrencySwitcher /><a className="account-mini" href="/account/" aria-label="Area clienti" title="Area clienti">👤</a><a className="detail-back" href="/#catalogo">← Torna allo shop</a></div>
      </nav>

      <div className="detail-breadcrumb"><a href="/">Home</a><span>›</span><a href="/#catalogo">Catalogo</a><span>›</span><b>{product.name}</b></div>

      <section className="product-detail">
        <div className="detail-visual" style={{ "--product-color": product.color, "--product-accent": product.accent } as CSSProperties}>
          <span className="detail-badge">{product.badge}</span>
          <span className="detail-theme">{product.theme}</span>
          <div className="detail-box"><strong>{product.line}</strong><b>{product.icon}</b><small>ORIGINAL SET</small></div>
          <i className="detail-brick one"></i><i className="detail-brick two"></i><i className="detail-brick three"></i>
        </div>
        <div className="detail-copy">
          <span className="kicker">{product.line} • {product.age} • {product.pieces} PEZZI</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="detail-price"><strong><CurrencyAmount value={product.price} /></strong>{product.oldPrice && <del><CurrencyAmount value={product.oldPrice} /></del>}</div>
          <div className="detail-stock"><span>●</span><b>Disponibilità da confermare</b><small>Scrivici per controllare quantità e tempi di consegna.</small></div>
          <a className="button whatsapp detail-cta" href={reserveUrl} target="_blank" rel="noreferrer">Chiedi disponibilità su WhatsApp →</a>
          <div className="detail-trust"><span>✓ Set originale e sigillato</span><span>✓ Spedizione tracciata</span><span>✓ Reso guidato</span></div>
        </div>
      </section>

      <section className="detail-features">
        <div><span className="kicker">COSA TROVI NEL SET</span><h2>Dettagli che fanno la <em>differenza.</em></h2></div>
        <div className="feature-list">{product.features.map((feature, index) => <article key={feature}><span>0{index + 1}</span><h3>{feature}</h3><p>Un dettaglio pensato per rendere più coinvolgente la costruzione e il gioco.</p></article>)}</div>
      </section>

      <section className="detail-related">
        <div className="section-head"><div><span className="kicker">CONTINUA A ESPLORARE</span><h2>Altri set da <em>scoprire</em></h2></div><a href={`/categorie/${product.theme === "Città" ? "citta" : product.theme.toLowerCase()}/`}>Vedi tutta la categoria →</a></div>
        <div className="related-grid">
          {(related.length ? related : products.filter((item) => item.id !== product.id).slice(0, 3)).map((item) => (
            <a href={`/prodotti/${item.slug}/`} className="related-card" key={item.id} style={{ "--related-color": item.color } as CSSProperties}>
              <span>{item.icon}</span><div><small>{item.line} • {item.age}</small><h3>{item.name}</h3><strong><CurrencyAmount value={item.price} /></strong></div><b>→</b>
            </a>
          ))}
        </div>
      </section>

      <footer className="inner-footer">
        <a className="brand footer-brand" href="/"><span className="brand-mark">B</span><span>BRICKORIA<small>PLAY • BUILD • SMILE</small></span></a>
        <p>Il tuo posto felice, un mattoncino alla volta.</p>
        <div><a href="/#catalogo">Catalogo</a><a href="/account/">Area clienti</a><span>◎ Instagram <small>PROSSIMAMENTE</small></span><span>♪ TikTok <small>PROSSIMAMENTE</small></span></div>
      </footer>
    </main>
  );
}
