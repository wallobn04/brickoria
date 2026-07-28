import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../dist/server/index.js";

const assetRoot = new URL("../dist/client/", import.meta.url);

const env = {
  ASSETS: {
    async fetch(request) {
      const pathname = new URL(request.url).pathname.replace(/^\/+/, "");
      try {
        const body = await readFile(new URL(pathname, assetRoot));
        const contentType = pathname.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream";
        return new Response(body, { status: 200, headers: { "content-type": contentType } });
      } catch {
        return new Response("Not found", { status: 404 });
      }
    },
  },
};

test("serves the Brickoria storefront without server rendering", async () => {
  const response = await worker.fetch(
    new Request("https://brickoria.example/", { headers: { accept: "text/html" } }),
    env,
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /^text\/html/);
  const html = await response.text();
  assert.match(html, /Brickoria/i);
  assert.match(html, /Costruisci la tua prossima storia/i);
  assert.match(html, /aria-haspopup="listbox"/i);
  assert.match(html, />IT</i);
});

test("serves the static social preview", async () => {
  const response = await worker.fetch(new Request("https://brickoria.example/og.png"), env);
  assert.equal(response.status, 200);
});

test("serves category, product and customer-area pages", async () => {
  const routes = [
    ["/categorie/auto/", /Set Auto/i],
    ["/prodotti/bolide-da-competizione/", /Bolide da competizione/i],
    ["/account/", /Area clienti/i],
  ];

  for (const [route, expectedCopy] of routes) {
    const response = await worker.fetch(
      new Request(`https://brickoria.example${route}`, { headers: { accept: "text/html" } }),
      env,
    );
    assert.equal(response.status, 200, route);
    assert.match(await response.text(), expectedCopy, route);
  }
});

test("keeps language and currency independent", async () => {
  const switcher = await readFile(new URL("../app/components/LanguageSwitcher.tsx", import.meta.url), "utf8");
  const currencies = await readFile(new URL("../app/components/CurrencyProvider.tsx", import.meta.url), "utf8");
  const catalog = await readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8");
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  for (const language of ["it", "en", "fr", "es", "de"]) {
    assert.match(switcher, new RegExp(`code: "${language}"`));
  }
  for (const currency of ["EUR", "USD", "GBP", "CHF", "CAD", "AUD"]) {
    assert.match(currencies, new RegExp(`code: "${currency}"`));
  }
  assert.match(switcher, /data-no-translate="true"/);
  assert.match(currencies, /brickoria-currency/);
  assert.match(currencies, /data-no-translate="true"/);
  assert.match(catalog, /STORE_CURRENCY = "EUR"/);
  assert.match(home, /Math\.max\(0, 35 - total\)/);
  assert.match(home, /total \/ 35/);
});
