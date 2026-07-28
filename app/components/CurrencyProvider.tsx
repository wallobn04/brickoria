"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type Currency = "EUR" | "USD" | "GBP" | "CHF" | "CAD" | "AUD";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  format: (valueInEuro: number) => string;
};

const currencies: { code: Currency; symbol: string; label: string; locale: string; rate: number }[] = [
  { code: "EUR", symbol: "€", label: "Euro", locale: "it-IT", rate: 1 },
  { code: "USD", symbol: "$", label: "Dollaro USA", locale: "en-US", rate: 1.1367 },
  { code: "GBP", symbol: "£", label: "Sterlina", locale: "en-GB", rate: 0.8555 },
  { code: "CHF", symbol: "CHF", label: "Franco svizzero", locale: "de-CH", rate: 0.9319 },
  { code: "CAD", symbol: "CA$", label: "Dollaro canadese", locale: "en-CA", rate: 1.6036 },
  { code: "AUD", symbol: "A$", label: "Dollaro australiano", locale: "en-AU", rate: 1.6312 },
];

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function isCurrency(value: string | null): value is Currency {
  return currencies.some((currency) => currency.code === value);
}

export default function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    const saved = window.localStorage.getItem("brickoria-currency");
    if (isCurrency(saved)) setCurrencyState(saved);
  }, []);

  function setCurrency(next: Currency) {
    setCurrencyState(next);
    window.localStorage.setItem("brickoria-currency", next);
  }

  function format(valueInEuro: number) {
    const selected = currencies.find((item) => item.code === currency) ?? currencies[0];
    return new Intl.NumberFormat(selected.locale, {
      style: "currency",
      currency: selected.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valueInEuro * selected.rate);
  }

  return <CurrencyContext.Provider value={{ currency, setCurrency, format }}>{children}</CurrencyContext.Provider>;
}

function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("Currency components must be used inside CurrencyProvider");
  return context;
}

export function CurrencyAmount({ value }: { value: number }) {
  const { currency, format } = useCurrency();
  const title = currency === "EUR" ? undefined : "Conversione indicativa da euro · tassi di riferimento BCE 28/07/2026";
  return <span className="currency-amount" data-currency={currency} data-no-translate="true" title={title}>{format(value)}</span>;
}

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const current = currencies.find((item) => item.code === currency) ?? currencies[0];

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className={`currency-switcher ${open ? "open" : ""}`} ref={wrapperRef} data-no-translate="true">
      <button
        className="currency-button"
        type="button"
        aria-label={`Valuta: ${current.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{current.symbol}</span><b>{current.code}</b><i>⌄</i>
      </button>
      {open && (
        <div className="currency-menu" role="listbox" aria-label="Scegli la valuta">
          <div className="currency-menu-head">
            <b>VALUTA</b>
            <small>Prezzi indicativi</small>
          </div>
          {currencies.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={item.code === currency}
              onClick={() => {
                setCurrency(item.code);
                setOpen(false);
              }}
            >
              <span>{item.symbol}</span>
              <b>{item.code}</b>
              <small>{item.label}</small>
              {item.code === currency && <i>✓</i>}
            </button>
          ))}
          <p>Conversioni BCE del 28/07/2026. La valuta finale dipenderà dal sistema di pagamento.</p>
        </div>
      )}
    </div>
  );
}
