import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CurrencyAmount, CurrencySwitcher } from "@/app/components/CurrencyProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { products, themes } from "@/lib/catalog";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return themes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = themes.find((item) => item.slug === slug);
  if (!theme) return {};
  return {
    title: `Set ${theme.name} — Brickoria`,
    description: `Scopri i set Brickoria dedicati a ${theme.name}: ${theme.copy.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const theme = themes.find((item) => item.slug === slug);
  if (!theme) notFound();

  const matches = products.filter((product) => product.theme === theme.name);

  return (
    <main className="category-page">
      <div className="announcement"><span><span>Spedizione gratuita da</span> <CurrencyAmount value={35} /></span><span className="announcement-dot">●</span><span>Set originali e sigillati</span><span className="announcement-dot">●</span><span>Assistenza WhatsApp 24/7</span></div>
      <nav className="nav detail-nav" aria-label="Navigazione categoria">
        <a className="brand" href="/"><span className="brand-mark">B</span><span>BRICKORIA<small>PLAY • BUILD • SMILE</small></span></a>
        <div className="nav-links"><a href="/#catalogo">Shop</a><a href="/#categorie">Tutte le categorie</a><a className="account-link" href="/account/">👤 Area clienti</a></div>
        <div className="detail-nav-actions"><LanguageSwitcher /><CurrencySwitcher /><a className="account-mini" href="/account/" aria-label="Area clienti" title="Area clienti">👤</a><a className="detail-back" href="/#categorie">← Tutte le categorie</a></div>
      </nav>

      <section className="category-hero" style={{ "--category-color": theme.color } as CSSProperties}>
        <div><span className="kicker">ESPLORA PER PASSIONE</span><h1>{theme.name}</h1><p>{theme.copy}. Una pagina tutta dedicata ai set di questo mondo.</p><a className="button primary" href="#set-categoria">Scopri i set →</a></div>
        <div className="category-icon" aria-hidden="true"><span>{theme.icon}</span><b>{theme.name}</b></div>
      </section>

      <section className="category-products" id="set-categoria">
        <div className="section-head"><div><span className="kicker">CATALOGO {theme.name.toUpperCase()}</span><h2>Scegli la tua prossima <em>costruzione.</em></h2></div><p>{matches.length} {matches.length === 1 ? "set disponibile" : "set disponibili"} in questa selezione dimostrativa.</p></div>
        {matches.length ? (
          <div className="category-product-grid">
            {matches.map((product) => (
              <a className="category-product-card" href={`/prodotti/${product.slug}/`} key={product.id}>
                <div style={{ background: product.color }}><span>{product.badge}</span><b>{product.icon}</b><small>{product.line}</small></div>
                <section><small>{product.age} • {product.pieces} PEZZI</small><h3>{product.name}</h3><p>{product.description}</p><div className="category-card-bottom"><strong><CurrencyAmount value={product.price} /></strong><i>Scopri →</i></div></section>
              </a>
            ))}
          </div>
        ) : (
          <div className="category-empty"><span>{theme.icon}</span><h2>I prossimi set {theme.name} stanno arrivando.</h2><p>Scrivici su WhatsApp per chiederci un prodotto specifico.</p></div>
        )}
      </section>

      <section className="category-switcher"><span>Scopri anche</span>{themes.filter((item) => item.slug !== theme.slug).map((item) => <a key={item.slug} href={`/categorie/${item.slug}/`} style={{ "--switch-color": item.color } as CSSProperties}>{item.icon} {item.name}</a>)}</section>

      <footer className="inner-footer">
        <a className="brand footer-brand" href="/"><span className="brand-mark">B</span><span>BRICKORIA<small>PLAY • BUILD • SMILE</small></span></a>
        <p>Il tuo posto felice, un mattoncino alla volta.</p>
        <div><a href="/#catalogo">Catalogo</a><a href="/account/">Area clienti</a><span>◎ Instagram <small>PROSSIMAMENTE</small></span><span>♪ TikTok <small>PROSSIMAMENTE</small></span></div>
      </footer>
    </main>
  );
}
