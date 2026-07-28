export type Audience = "Bambini" | "Famiglie" | "Collezionisti";
export type Theme = "Calcio" | "Auto" | "Spazio" | "Natura" | "Città" | "Collezione";

export type Product = {
  id: number;
  slug: string;
  name: string;
  nameEn: string;
  line: string;
  age: string;
  minAge: number;
  price: number;
  oldPrice?: number;
  badge: string;
  color: string;
  accent: string;
  icon: string;
  audience: Audience;
  theme: Theme;
  pieces: number;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: "stadio-giornata-da-campioni",
    name: "Stadio: giornata da campioni",
    nameEn: "Stadium: match day",
    line: "SPORT",
    age: "8+",
    minAge: 8,
    price: 44.90,
    oldPrice: 49.99,
    badge: "Più amato",
    color: "#58b47b",
    accent: "#174d32",
    icon: "⚽",
    audience: "Famiglie",
    theme: "Calcio",
    pieces: 612,
    description: "Uno stadio ricco di dettagli per ricreare la partita perfetta, inventare tornei e festeggiare il gol decisivo.",
    descriptionEn: "A detail-packed stadium for recreating the perfect match, inventing tournaments and celebrating the winning goal.",
    features: ["Tribune modulari", "Campo da gioco completo", "Accessori da partita"],
    featuresEn: ["Modular stands", "Complete playing field", "Match accessories"],
  },
  {
    id: 2,
    slug: "bolide-da-competizione",
    name: "Bolide da competizione",
    nameEn: "Competition race car",
    line: "TECHNIC",
    age: "10+",
    minAge: 10,
    price: 59.90,
    badge: "Novità",
    color: "#ef4538",
    accent: "#171717",
    icon: "🏎️",
    audience: "Famiglie",
    theme: "Auto",
    pieces: 806,
    description: "Linee aggressive, dettagli meccanici e tanta velocità immaginaria per chi ama motori e costruzioni tecniche.",
    descriptionEn: "Bold lines, mechanical details and plenty of imaginary speed for fans of engines and technical builds.",
    features: ["Sterzo funzionante", "Motore dettagliato", "Livrea da gara"],
    featuresEn: ["Working steering", "Detailed engine", "Racing livery"],
  },
  {
    id: 3,
    slug: "orchidea-da-esposizione",
    name: "Orchidea da esposizione",
    nameEn: "Display orchid",
    line: "BOTANICAL",
    age: "18+",
    minAge: 18,
    price: 44.90,
    oldPrice: 49.99,
    badge: "–10%",
    color: "#dfc7f6",
    accent: "#52368a",
    icon: "🌸",
    audience: "Collezionisti",
    theme: "Natura",
    pieces: 608,
    description: "Una composizione elegante da costruire con calma e mostrare in casa, senza bisogno di acqua o manutenzione.",
    descriptionEn: "An elegant arrangement to build at your own pace and display at home, with no watering or maintenance needed.",
    features: ["Fiori orientabili", "Vaso incluso", "Progetto rilassante"],
    featuresEn: ["Adjustable flowers", "Vase included", "Relaxing project"],
  },
  {
    id: 4,
    slug: "castello-delle-meraviglie",
    name: "Castello delle meraviglie",
    nameEn: "Castle of wonders",
    line: "ICONS",
    age: "18+",
    minAge: 18,
    price: 129.90,
    badge: "Da collezione",
    color: "#6bc4e8",
    accent: "#1e4380",
    icon: "🏰",
    audience: "Collezionisti",
    theme: "Collezione",
    pieces: 1864,
    description: "Un grande progetto da esposizione con torri, sale segrete e dettagli tutti da scoprire durante la costruzione.",
    descriptionEn: "A large display project with towers, secret rooms and details to discover throughout the build.",
    features: ["Interni apribili", "Torri modulari", "Base da esposizione"],
    featuresEn: ["Opening interiors", "Modular towers", "Display base"],
  },
  {
    id: 5,
    slug: "missione-nello-spazio",
    name: "Missione nello spazio",
    nameEn: "Space mission",
    line: "CITY",
    age: "6+",
    minAge: 6,
    price: 27.90,
    badge: "Disponibile",
    color: "#206acb",
    accent: "#f2f5ff",
    icon: "🚀",
    audience: "Bambini",
    theme: "Spazio",
    pieces: 318,
    description: "Un razzo pronto al decollo, un equipaggio coraggioso e infinite missioni tra pianeti lontani.",
    descriptionEn: "A rocket ready for lift-off, a brave crew and endless missions among distant planets.",
    features: ["Razzo apribile", "Veicolo di esplorazione", "Accessori astronauta"],
    featuresEn: ["Opening rocket", "Exploration vehicle", "Astronaut accessories"],
  },
  {
    id: 6,
    slug: "casa-sull-albero",
    name: "Casa sull’albero",
    nameEn: "Tree house",
    line: "FRIENDS",
    age: "8+",
    minAge: 8,
    price: 49.90,
    badge: "Idea regalo",
    color: "#f690b7",
    accent: "#6f2b67",
    icon: "🌳",
    audience: "Famiglie",
    theme: "Natura",
    pieces: 701,
    description: "Una casa tra i rami piena di angoli creativi, perfetta per inventare avventure con amici e animali.",
    descriptionEn: "A tree house full of creative corners, perfect for inventing adventures with friends and animals.",
    features: ["Stanze arredate", "Altalena e scivolo", "Dettagli della natura"],
    featuresEn: ["Furnished rooms", "Swing and slide", "Nature details"],
  },
  {
    id: 7,
    slug: "caserma-dei-piccoli-eroi",
    name: "Caserma dei piccoli eroi",
    nameEn: "Little heroes fire station",
    line: "CITY",
    age: "5+",
    minAge: 5,
    price: 32.90,
    badge: "Per iniziare",
    color: "#ffd23f",
    accent: "#b82f28",
    icon: "🚒",
    audience: "Bambini",
    theme: "Città",
    pieces: 356,
    description: "Caserma, camion e missioni di soccorso per vivere ogni giorno una nuova avventura da piccoli eroi.",
    descriptionEn: "A station, fire truck and rescue missions for a new little-hero adventure every day.",
    features: ["Camion dei pompieri", "Caserma apribile", "Missioni di salvataggio"],
    featuresEn: ["Fire truck", "Opening station", "Rescue missions"],
  },
  {
    id: 8,
    slug: "supercar-da-esposizione",
    name: "Supercar da esposizione",
    nameEn: "Display supercar",
    line: "ICONS",
    age: "18+",
    minAge: 18,
    price: 99.90,
    badge: "Edizione speciale",
    color: "#171717",
    accent: "#f4bf18",
    icon: "🏁",
    audience: "Collezionisti",
    theme: "Auto",
    pieces: 1458,
    description: "Una supercar elegante e ricca di dettagli, pensata per gli appassionati che vogliono costruire e collezionare.",
    descriptionEn: "A sleek, detail-rich supercar designed for enthusiasts who love to build and collect.",
    features: ["Abitacolo dettagliato", "Cofano apribile", "Supporto da esposizione"],
    featuresEn: ["Detailed cockpit", "Opening bonnet", "Display stand"],
  },
];

export const themes: { name: Theme; nameEn: string; slug: string; icon: string; copy: string; copyEn: string; color: string }[] = [
  { name: "Calcio", nameEn: "Football", slug: "calcio", icon: "⚽", copy: "Stadi e squadre", copyEn: "Stadiums and teams", color: "#58b47b" },
  { name: "Auto", nameEn: "Cars", slug: "auto", icon: "🏎️", copy: "Velocità e motori", copyEn: "Speed and engines", color: "#ef493f" },
  { name: "Spazio", nameEn: "Space", slug: "spazio", icon: "🚀", copy: "Missioni e pianeti", copyEn: "Missions and planets", color: "#1876d2" },
  { name: "Natura", nameEn: "Nature", slug: "natura", icon: "🌿", copy: "Animali e botanica", copyEn: "Animals and botanicals", color: "#ffd51e" },
  { name: "Città", nameEn: "City", slug: "citta", icon: "🏙️", copy: "Eroi di ogni giorno", copyEn: "Everyday heroes", color: "#65b5e8" },
  { name: "Collezione", nameEn: "Collection", slug: "collezione", icon: "🏆", copy: "Set da esposizione", copyEn: "Display sets", color: "#a986d4" },
];

export const STORE_CURRENCY = "EUR" as const;

export const money = (value: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: STORE_CURRENCY }).format(value);

export const whatsapp = (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`;
