"use client";

import { useEffect, useRef, useState } from "react";
import { products, themes } from "@/lib/catalog";

type Locale = "it" | "en" | "fr" | "es" | "de";

const languageOptions: { code: Locale; name: string }[] = [
  { code: "it", name: "Italiano" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
];

const catalogTranslations = Object.fromEntries([
  ...products.flatMap((product) => [
    [product.name, product.nameEn],
    [product.description, product.descriptionEn],
    ...product.features.map((feature, index) => [feature, product.featuresEn[index]]),
  ]),
  ...themes.flatMap((theme) => [
    [theme.name, theme.nameEn],
    [theme.copy, theme.copyEn],
  ]),
]);

const englishTranslations: Record<string, string> = {
  ...catalogTranslations,
  "Spedizione gratuita da": "Free shipping over",
  "Set originali e sigillati": "Original, sealed sets",
  "Assistenza WhatsApp 24/7": "WhatsApp support 24/7",
  Categorie: "Categories",
  "Chi siamo": "About us",
  "Consiglia regalo": "Gift finder",
  "👤 Area clienti": "👤 Customer area",
  "Costruisci": "Build",
  "la tua prossima": "your next",
  "storia.": "story.",
  "SET ORIGINALI, DIVERTIMENTO AUTENTICO": "ORIGINAL SETS, REAL FUN",
  "Dai primi mattoncini ai set da collezione: trova il mondo perfetto per giocare, creare e sognare.": "From first bricks to collector sets: find the perfect world to play, create and dream.",
  "Scopri i set": "Discover the sets",
  "Trova un regalo": "Find a gift",
  "✓ Pagamenti sicuri": "✓ Secure payments",
  "✓ Consegna tracciata": "✓ Tracked delivery",
  "✓ Assistenza italiana": "✓ Personal support",
  ORIGINALI: "ORIGINAL",
  "ESPLORA PER PASSIONE": "EXPLORE BY PASSION",
  "Un mondo per": "A world for",
  "ogni costruttore.": "every builder.",
  "Dal calcio alle supercar, dalle missioni spaziali ai set da esposizione: entra direttamente nel tema che ami.": "From football to supercars, space missions and display sets: jump straight into the theme you love.",
  "CATALOGO DIMOSTRATIVO": "DEMO CATALOGUE",
  "Set che fanno": "Sets with the",
  wow: "wow factor",
  Tutti: "All",
  Bambini: "Children",
  Famiglie: "Families",
  Collezionisti: "Collectors",
  "Nessun set con questi filtri": "No sets match these filters",
  "Mostra tutto il catalogo": "Show the full catalogue",
  "Un negozio indipendente,": "An independent store,",
  "costruito sulla fiducia.": "built on trust.",
  "Brickoria nasce per rendere più semplice scegliere e acquistare set originali, con un servizio vicino alle famiglie e competente per gli appassionati.": "Brickoria makes choosing and buying original sets easier, with friendly service for families and knowledgeable help for enthusiasts.",
  "Selezioniamo le proposte da fornitori verificati, controlliamo ogni confezione prima della spedizione e restiamo disponibili anche dopo l’acquisto.": "We select products from verified suppliers, inspect every box before shipping and remain available after your purchase.",
  "Selezione responsabile": "Responsible selection",
  "Valutiamo autenticità, condizioni e convenienza prima di inserire un set nel catalogo.": "We assess authenticity, condition and value before adding a set to the catalogue.",
  "Consiglio personale": "Personal advice",
  "Età, interessi e budget guidano ogni suggerimento: niente proposte casuali.": "Age, interests and budget guide every suggestion: no random recommendations.",
  "Assistenza continua": "Ongoing support",
  "Dalla disponibilità al reso, il nostro supporto WhatsApp è accessibile 24 ore su 24.": "From availability to returns, our WhatsApp support is available around the clock.",
  "La nostra promessa": "Our promise",
  "Informazioni chiare, set originali e una risposta concreta quando serve. Vogliamo che l’esperienza sia piacevole quanto aprire la scatola.": "Clear information, original sets and practical help when you need it. We want the experience to feel as good as opening the box.",
  "Parla con noi →": "Talk to us →",
  "SEGUICI ANCHE QUI": "FOLLOW US HERE TOO",
  "I profili ufficiali Brickoria sono in preparazione. I collegamenti saranno attivati appena saranno disponibili.": "Brickoria's official profiles are being prepared. The links will be activated as soon as they are available.",
  "PROFILO IN ARRIVO": "PROFILE COMING SOON",
  "CONSULENTE REGALO": "GIFT FINDER",
  "Il regalo giusto,": "The right gift,",
  "senza andare a caso.": "without the guesswork.",
  "Età, passione e budget: il sito suggerisce subito il set più adatto. Se vuoi approfondire, passi a un operatore WhatsApp con tutte le risposte già pronte.": "Age, interests and budget: the site instantly suggests the best set. If you need more help, continue with a WhatsApp advisor using the answers you already provided.",
  "✓ Risposta immediata": "✓ Instant suggestion",
  "✓ Budget fino a 500 €": "✓ Budget up to €500",
  "Troviamo il regalo giusto": "Find the right gift",
  "domande semplici": "simple questions",
  "budget massimo": "maximum budget",
  "supporto WhatsApp": "WhatsApp support",
  "Originali e sigillati": "Original and sealed",
  "Set nuovi e controllati.": "New, inspected sets.",
  "Consegna tracciata": "Tracked delivery",
  "Segui sempre il tuo ordine.": "Track your order at every step.",
  "Reso guidato": "Guided returns",
  "Avvia la procedura dal sito.": "Start the process on the site.",
  "Inizia un reso →": "Start a return →",
  "CERCHI UN SET?": "LOOKING FOR A SET?",
  "Chiedilo a noi,": "Ask us,",
  "a qualsiasi ora.": "any time.",
  "Scrivici il nome o il tema che cerchi. Verifichiamo disponibilità e prezzo e ti aiutiamo a prenotarlo.": "Tell us the name or theme you are looking for. We will check availability and price and help you reserve it.",
  "● WhatsApp 24/7": "● WhatsApp 24/7",
  Spedizioni: "Shipping",
  Resi: "Returns",
  "Preferenze cookie": "Cookie preferences",
  "Area clienti": "Customer area",
  "Il tuo posto felice, un mattoncino alla volta.": "Your happy place, one brick at a time.",
  PROSSIMAMENTE: "COMING SOON",
  "IL TUO ORDINE": "YOUR ORDER",
  Carrello: "Cart",
  "Il carrello è vuoto": "Your cart is empty",
  "È un ottimo posto per iniziare una nuova storia.": "A great place to begin a new story.",
  "Spedizione gratuita sbloccata!": "Free shipping unlocked!",
  Rimuovi: "Remove",
  Subtotale: "Subtotal",
  "Spedizione calcolata al passaggio successivo.": "Shipping is calculated at the next step.",
  "Procedi al pagamento →": "Proceed to checkout →",
  "Prenota su WhatsApp": "Reserve on WhatsApp",
  "🔒 Pagamento sicuro": "🔒 Secure payment",
  "↩ Reso guidato": "↩ Guided return",
  "IL TUO CONSIGLIO IN MENO DI UN MINUTO": "YOUR SUGGESTION IN UNDER A MINUTE",
  "Dicci per chi è il regalo e cosa gli piace. Al resto pensiamo noi.": "Tell us who the gift is for and what they like. We will take care of the rest.",
  Età: "Age",
  Passione: "Interest",
  "Età di chi riceve il regalo": "Recipient's age",
  "Scegli l’età": "Choose an age",
  "4–6 anni": "Age 4–6",
  "7–9 anni": "Age 7–9",
  "10–12 anni": "Age 10–12",
  "13–17 anni": "Age 13–17",
  "18+ anni": "Age 18+",
  "Budget massimo": "Maximum budget",
  "Scegli il budget": "Choose a budget",
  "Fino a 35 €": "Up to €35",
  "Fino a 60 €": "Up to €60",
  "Fino a 100 €": "Up to €100",
  "Fino a 150 €": "Up to €150",
  "Fino a 250 €": "Up to €250",
  "Fino a 350 €": "Up to €350",
  "Fino a 500 €": "Up to €500",
  "Passione principale": "Main interest",
  "Scegli una passione": "Choose an interest",
  "Mostrami il regalo perfetto": "Show me the perfect gift",
  "Consiglio immediato dal sito · Nessun dato personale richiesto": "Instant on-site suggestion · No personal data required",
  "IL NOSTRO CONSIGLIO": "OUR SUGGESTION",
  "Aggiungi al carrello": "Add to cart",
  "Cambia risposte": "Change answers",
  "Non basta questo consiglio?": "Need more help?",
  "Invia le tue risposte a un operatore WhatsApp disponibile 24/7: non dovrai ricominciare da capo.": "Send your answers to a WhatsApp advisor available 24/7: you will not need to start over.",
  "Continua con un operatore →": "Continue with an advisor →",
  "Avvia un reso": "Start a return",
  "RESO GUIDATO, SENZA STRESS": "GUIDED, STRESS-FREE RETURNS",
  "Compila i dati una sola volta: prepariamo la richiesta e la passiamo all’assistenza WhatsApp 24/7.": "Enter your details once: we prepare the request and pass it to our 24/7 WhatsApp support.",
  "Dati ordine": "Order details",
  Verifica: "Review",
  Assistenza: "Support",
  "Numero ordine": "Order number",
  "Email usata per l’ordine": "Email used for the order",
  "Motivo del reso": "Reason for return",
  "Seleziona un motivo": "Select a reason",
  "Ho cambiato idea": "I changed my mind",
  "Confezione danneggiata": "Damaged packaging",
  "Articolo non conforme": "Item not as described",
  "Prodotto errato": "Wrong product",
  Altro: "Other",
  "💡 Prima di iniziare": "💡 Before you start",
  "Tieni prodotto, confezione e prova d’acquisto. L’assistenza verificherà idoneità e istruzioni di spedizione.": "Keep the product, packaging and proof of purchase. Support will confirm eligibility and shipping instructions.",
  "Prepara la richiesta": "Prepare the request",
  "I dati restano su questo dispositivo finché non scegli di inviarli all’assistenza.": "Your details remain on this device until you choose to send them to support.",
  "Richiesta preparata": "Request ready",
  "La bozza è salvata su questo dispositivo. Invia ora i dati all’assistenza WhatsApp 24/7 per ricevere conferma e istruzioni.": "The draft is saved on this device. Send it to 24/7 WhatsApp support to receive confirmation and instructions.",
  Ordine: "Order",
  Motivo: "Reason",
  "Invia all’assistenza →": "Send to support →",
  "Modifica i dati": "Edit details",
  "La tua privacy, pezzo per pezzo.": "Your privacy, piece by piece.",
  "Usiamo cookie necessari per far funzionare sito e carrello. Con il tuo consenso possiamo usare anche cookie di analisi e marketing.": "We use necessary cookies to operate the site and cart. With your consent, we may also use analytics and marketing cookies.",
  Personalizza: "Customise",
  "Solo necessari": "Necessary only",
  "Accetta tutti": "Accept all",
  "Scegli liberamente. Puoi cambiare idea in qualsiasi momento dal link nel piè di pagina.": "Choose freely. You can change your mind at any time using the footer link.",
  "Cookie necessari": "Necessary cookies",
  "Carrello, sicurezza e preferenze. Sempre attivi.": "Cart, security and preferences. Always active.",
  Attivi: "Active",
  Analisi: "Analytics",
  "Ci aiutano a capire quali pagine sono più utili.": "Help us understand which pages are most useful.",
  Marketing: "Marketing",
  "Servono per mostrarti comunicazioni più pertinenti.": "Used to show you more relevant communications.",
  "Salva preferenze": "Save preferences",
  "Tutti i set": "All sets",
  "← Torna allo shop": "← Back to shop",
  Home: "Home",
  Catalogo: "Catalogue",
  "Disponibilità da confermare": "Availability to be confirmed",
  "Scrivici per controllare quantità e tempi di consegna.": "Contact us to check stock and delivery times.",
  "Chiedi disponibilità su WhatsApp →": "Check availability on WhatsApp →",
  "✓ Set originale e sigillato": "✓ Original, sealed set",
  "✓ Spedizione tracciata": "✓ Tracked shipping",
  "✓ Reso guidato": "✓ Guided return",
  "COSA TROVI NEL SET": "WHAT IS IN THE SET",
  "Dettagli che fanno la": "Details that make",
  "differenza.": "the difference.",
  "Un dettaglio pensato per rendere più coinvolgente la costruzione e il gioco.": "A feature designed to make building and play more engaging.",
  "CONTINUA A ESPLORARE": "KEEP EXPLORING",
  "Altri set da": "More sets to",
  scoprire: "discover",
  "Vedi tutta la categoria →": "View the full category →",
  "← Tutte le categorie": "← All categories",
  "Tutte le categorie": "All categories",
  "Una pagina tutta dedicata ai set di questo mondo.": "A page dedicated entirely to sets from this world.",
  "Scegli la tua prossima": "Choose your next",
  "costruzione.": "build.",
  "Scopri →": "Discover →",
  "Scopri anche": "Explore more",
  "IL TUO SPAZIO BRICKORIA": "YOUR BRICKORIA SPACE",
  "Tutto sotto controllo,": "Everything under control,",
  "mattoncino dopo mattoncino.": "brick by brick.",
  "Quando l’area sarà collegata alla piattaforma acquisti, ogni cliente vedrà solo i propri ordini e le relative informazioni.": "Once the area is connected to the shopping platform, each customer will see only their own orders and information.",
  "I tuoi ordini": "Your orders",
  "Prodotti, importi e date": "Products, totals and dates",
  "Stato e tracciamento": "Status and tracking",
  "Resi più veloci": "Faster returns",
  "Avvio direttamente dall’ordine": "Start directly from the order",
  ANTEPRIMA: "PREVIEW",
  "ACCESSO CLIENTI": "CUSTOMER LOGIN",
  "Bentornato!": "Welcome back!",
  "Il login con email e password verrà attivato insieme alla piattaforma che registrerà gli acquisti.": "Email and password login will be activated together with the platform that records purchases.",
  Email: "Email",
  Password: "Password",
  "Accesso in preparazione": "Login coming soon",
  "Nessuna password viene ancora raccolta.": "No passwords are collected yet.",
  "Attiveremo il modulo solo con un sistema sicuro e collegato agli ordini reali.": "We will activate the form only with a secure system connected to real orders.",
  "DOPO L’ACCESSO": "AFTER SIGNING IN",
  "La cronologia acquisti sarà": "Your purchase history will be",
  "qui.": "here.",
  "Ordini, stato della consegna e pulsante per il reso saranno riuniti in un’unica schermata personale.": "Orders, delivery status and return controls will be gathered in one personal screen.",
  "I MIEI ORDINI": "MY ORDERS",
  Anteprima: "Preview",
  "Il tuo prossimo set": "Your next set",
  "Data, totale e spedizione compariranno qui.": "Date, total and shipping will appear here.",
  "IN ARRIVO": "COMING SOON",
  "Totale ordine": "Order total",
  "Vedi dettagli": "View details",
};

const frenchTranslations: Record<string, string> = {
  "Spedizione gratuita da": "Livraison gratuite dès",
  "Set originali e sigillati": "Sets originaux et scellés",
  "Assistenza WhatsApp 24/7": "Assistance WhatsApp 24 h/24",
  Shop: "Boutique",
  Categorie: "Catégories",
  "Chi siamo": "À propos",
  Assistenza: "Assistance",
  "Consiglia regalo": "Conseil cadeau",
  "👤 Area clienti": "👤 Espace client",
  "Area clienti": "Espace client",
  "SEGUICI ANCHE QUI": "SUIVEZ-NOUS AUSSI",
  "I profili ufficiali Brickoria sono in preparazione. I collegamenti saranno attivati appena saranno disponibili.": "Les profils officiels Brickoria sont en préparation. Les liens seront activés dès qu’ils seront disponibles.",
  "PROFILO IN ARRIVO": "PROFIL À VENIR",
  Catalogo: "Catalogue",
  "Costruisci": "Construisez",
  "la tua prossima": "votre prochaine",
  "storia.": "histoire.",
  "SET ORIGINALI, DIVERTIMENTO AUTENTICO": "SETS ORIGINAUX, PLAISIR AUTHENTIQUE",
  "Dai primi mattoncini ai set da collezione: trova il mondo perfetto per giocare, creare e sognare.": "Des premières briques aux sets de collection : trouvez l’univers idéal pour jouer, créer et rêver.",
  "Scopri i set": "Découvrir les sets",
  "Trova un regalo": "Trouver un cadeau",
  "✓ Pagamenti sicuri": "✓ Paiements sécurisés",
  "✓ Consegna tracciata": "✓ Livraison suivie",
  "✓ Assistenza italiana": "✓ Assistance personnalisée",
  "ESPLORA PER PASSIONE": "EXPLOREZ VOS PASSIONS",
  "Un mondo per": "Un univers pour",
  "ogni costruttore.": "chaque constructeur.",
  "Dal calcio alle supercar, dalle missioni spaziali ai set da esposizione: entra direttamente nel tema che ami.": "Du football aux supercars, des missions spatiales aux modèles d’exposition : entrez dans l’univers que vous aimez.",
  "CATALOGO DIMOSTRATIVO": "CATALOGUE DE DÉMONSTRATION",
  "Set che fanno": "Des sets qui font",
  wow: "sensation",
  Tutti: "Tous",
  Bambini: "Enfants",
  Famiglie: "Familles",
  Collezionisti: "Collectionneurs",
  "Nessun set con questi filtri": "Aucun set ne correspond à ces filtres",
  "Mostra tutto il catalogo": "Afficher tout le catalogue",
  "Un negozio indipendente,": "Une boutique indépendante,",
  "costruito sulla fiducia.": "fondée sur la confiance.",
  "Selezione responsabile": "Sélection responsable",
  "Consiglio personale": "Conseil personnalisé",
  "Assistenza continua": "Assistance continue",
  "La nostra promessa": "Notre promesse",
  "Parla con noi →": "Contactez-nous →",
  "CONSULENTE REGALO": "CONSEILLER CADEAU",
  "Il regalo giusto,": "Le cadeau idéal,",
  "senza andare a caso.": "sans hésitation.",
  "Troviamo il regalo giusto": "Trouvons le cadeau idéal",
  "Originali e sigillati": "Originaux et scellés",
  "Consegna tracciata": "Livraison suivie",
  "Reso guidato": "Retour accompagné",
  "Inizia un reso →": "Commencer un retour →",
  "CERCHI UN SET?": "VOUS CHERCHEZ UN SET ?",
  "Chiedilo a noi,": "Demandez-nous,",
  "a qualsiasi ora.": "à tout moment.",
  Spedizioni: "Livraisons",
  Resi: "Retours",
  "Preferenze cookie": "Préférences des cookies",
  "Il tuo posto felice, un mattoncino alla volta.": "Votre endroit préféré, une brique à la fois.",
  PROSSIMAMENTE: "BIENTÔT",
  "Tutti i set": "Tous les sets",
  "← Torna allo shop": "← Retour à la boutique",
  "← Torna al negozio": "← Retour à la boutique",
  "← Tutte le categorie": "← Toutes les catégories",
  "Tutte le categorie": "Toutes les catégories",
  "Scopri →": "Découvrir →",
  "Scopri anche": "À découvrir aussi",
  "IL TUO SPAZIO BRICKORIA": "VOTRE ESPACE BRICKORIA",
  "Tutto sotto controllo,": "Tout sous contrôle,",
  "mattoncino dopo mattoncino.": "brique après brique.",
  "Quando l’area sarà collegata alla piattaforma acquisti, ogni cliente vedrà solo i propri ordini e le relative informazioni.": "Lorsque cet espace sera relié à la plateforme d’achat, chaque client ne verra que ses commandes et les informations associées.",
  "I tuoi ordini": "Vos commandes",
  "Prodotti, importi e date": "Produits, montants et dates",
  "Stato e tracciamento": "Statut et suivi",
  "Resi più veloci": "Retours plus rapides",
  "Avvio direttamente dall’ordine": "Démarrage depuis la commande",
  ANTEPRIMA: "APERÇU",
  "ACCESSO CLIENTI": "CONNEXION CLIENT",
  "Bentornato!": "Bon retour !",
  "Il login con email e password verrà attivato insieme alla piattaforma che registrerà gli acquisti.": "La connexion par e-mail et mot de passe sera activée avec la plateforme qui enregistrera les achats.",
  Email: "E-mail",
  Password: "Mot de passe",
  "Accesso in preparazione": "Connexion bientôt disponible",
  "Nessuna password viene ancora raccolta.": "Aucun mot de passe n’est encore collecté.",
  "Attiveremo il modulo solo con un sistema sicuro e collegato agli ordini reali.": "Nous activerons le formulaire uniquement avec un système sécurisé relié aux commandes réelles.",
  "DOPO L’ACCESSO": "APRÈS LA CONNEXION",
  "La cronologia acquisti sarà": "Votre historique d’achats sera",
  "qui.": "ici.",
  "Ordini, stato della consegna e pulsante per il reso saranno riuniti in un’unica schermata personale.": "Commandes, suivi de livraison et retours seront réunis dans un seul espace personnel.",
  "I MIEI ORDINI": "MES COMMANDES",
  Anteprima: "Aperçu",
  "Il tuo prossimo set": "Votre prochain set",
  "Data, totale e spedizione compariranno qui.": "La date, le total et la livraison apparaîtront ici.",
  "IN ARRIVO": "À VENIR",
  "Totale ordine": "Total de la commande",
  "Vedi dettagli": "Voir les détails",
};

const spanishTranslations: Record<string, string> = {
  "Spedizione gratuita da": "Envío gratis desde",
  "Set originali e sigillati": "Sets originales y precintados",
  "Assistenza WhatsApp 24/7": "Atención por WhatsApp 24/7",
  Shop: "Tienda",
  Categorie: "Categorías",
  "Chi siamo": "Quiénes somos",
  Assistenza: "Ayuda",
  "Consiglia regalo": "Buscador de regalos",
  "👤 Area clienti": "👤 Área de clientes",
  "Area clienti": "Área de clientes",
  "SEGUICI ANCHE QUI": "SÍGUENOS TAMBIÉN",
  "I profili ufficiali Brickoria sono in preparazione. I collegamenti saranno attivati appena saranno disponibili.": "Los perfiles oficiales de Brickoria están en preparación. Los enlaces se activarán en cuanto estén disponibles.",
  "PROFILO IN ARRIVO": "PERFIL PRÓXIMAMENTE",
  Catalogo: "Catálogo",
  Costruisci: "Construye",
  "la tua prossima": "tu próxima",
  "storia.": "historia.",
  "SET ORIGINALI, DIVERTIMENTO AUTENTICO": "SETS ORIGINALES, DIVERSIÓN AUTÉNTICA",
  "Dai primi mattoncini ai set da collezione: trova il mondo perfetto per giocare, creare e sognare.": "Desde los primeros ladrillos hasta los sets de colección: encuentra el mundo perfecto para jugar, crear y soñar.",
  "Scopri i set": "Descubre los sets",
  "Trova un regalo": "Encuentra un regalo",
  "✓ Pagamenti sicuri": "✓ Pagos seguros",
  "✓ Consegna tracciata": "✓ Envío con seguimiento",
  "✓ Assistenza italiana": "✓ Atención personalizada",
  "ESPLORA PER PASSIONE": "EXPLORA POR PASIÓN",
  "Un mondo per": "Un mundo para",
  "ogni costruttore.": "cada constructor.",
  "Dal calcio alle supercar, dalle missioni spaziali ai set da esposizione: entra direttamente nel tema che ami.": "Del fútbol a los supercoches, de las misiones espaciales a los modelos de exposición: entra en el tema que más te gusta.",
  "CATALOGO DIMOSTRATIVO": "CATÁLOGO DE DEMOSTRACIÓN",
  "Set che fanno": "Sets que causan",
  wow: "sensación",
  Tutti: "Todos",
  Bambini: "Niños",
  Famiglie: "Familias",
  Collezionisti: "Coleccionistas",
  "Nessun set con questi filtri": "No hay sets con estos filtros",
  "Mostra tutto il catalogo": "Mostrar todo el catálogo",
  "Un negozio indipendente,": "Una tienda independiente,",
  "costruito sulla fiducia.": "construida sobre la confianza.",
  "Selezione responsabile": "Selección responsable",
  "Consiglio personale": "Asesoramiento personal",
  "Assistenza continua": "Atención continua",
  "La nostra promessa": "Nuestra promesa",
  "Parla con noi →": "Habla con nosotros →",
  "CONSULENTE REGALO": "ASESOR DE REGALOS",
  "Il regalo giusto,": "El regalo perfecto,",
  "senza andare a caso.": "sin adivinar.",
  "Troviamo il regalo giusto": "Encontremos el regalo perfecto",
  "Originali e sigillati": "Originales y precintados",
  "Consegna tracciata": "Envío con seguimiento",
  "Reso guidato": "Devolución guiada",
  "Inizia un reso →": "Iniciar una devolución →",
  "CERCHI UN SET?": "¿BUSCAS UN SET?",
  "Chiedilo a noi,": "Pregúntanos,",
  "a qualsiasi ora.": "a cualquier hora.",
  Spedizioni: "Envíos",
  Resi: "Devoluciones",
  "Preferenze cookie": "Preferencias de cookies",
  "Il tuo posto felice, un mattoncino alla volta.": "Tu lugar feliz, ladrillo a ladrillo.",
  PROSSIMAMENTE: "PRÓXIMAMENTE",
  "Tutti i set": "Todos los sets",
  "← Torna allo shop": "← Volver a la tienda",
  "← Torna al negozio": "← Volver a la tienda",
  "← Tutte le categorie": "← Todas las categorías",
  "Tutte le categorie": "Todas las categorías",
  "Scopri →": "Descubrir →",
  "Scopri anche": "Descubre también",
  "IL TUO SPAZIO BRICKORIA": "TU ESPACIO BRICKORIA",
  "Tutto sotto controllo,": "Todo bajo control,",
  "mattoncino dopo mattoncino.": "ladrillo a ladrillo.",
  "Quando l’area sarà collegata alla piattaforma acquisti, ogni cliente vedrà solo i propri ordini e le relative informazioni.": "Cuando el área esté conectada a la plataforma de compra, cada cliente verá únicamente sus pedidos y la información relacionada.",
  "I tuoi ordini": "Tus pedidos",
  "Prodotti, importi e date": "Productos, importes y fechas",
  "Stato e tracciamento": "Estado y seguimiento",
  "Resi più veloci": "Devoluciones más rápidas",
  "Avvio direttamente dall’ordine": "Inicio desde el pedido",
  ANTEPRIMA: "VISTA PREVIA",
  "ACCESSO CLIENTI": "ACCESO DE CLIENTES",
  "Bentornato!": "¡Bienvenido de nuevo!",
  "Il login con email e password verrà attivato insieme alla piattaforma che registrerà gli acquisti.": "El acceso con correo y contraseña se activará junto con la plataforma que registrará las compras.",
  Email: "Correo electrónico",
  Password: "Contraseña",
  "Accesso in preparazione": "Acceso en preparación",
  "Nessuna password viene ancora raccolta.": "Todavía no se recopila ninguna contraseña.",
  "Attiveremo il modulo solo con un sistema sicuro e collegato agli ordini reali.": "Activaremos el formulario únicamente con un sistema seguro conectado a pedidos reales.",
  "DOPO L’ACCESSO": "DESPUÉS DE ACCEDER",
  "La cronologia acquisti sarà": "Tu historial de compras estará",
  "qui.": "aquí.",
  "Ordini, stato della consegna e pulsante per il reso saranno riuniti in un’unica schermata personale.": "Los pedidos, el estado de entrega y las devoluciones estarán reunidos en una sola pantalla personal.",
  "I MIEI ORDINI": "MIS PEDIDOS",
  Anteprima: "Vista previa",
  "Il tuo prossimo set": "Tu próximo set",
  "Data, totale e spedizione compariranno qui.": "La fecha, el total y el envío aparecerán aquí.",
  "IN ARRIVO": "PRÓXIMAMENTE",
  "Totale ordine": "Total del pedido",
  "Vedi dettagli": "Ver detalles",
};

const germanTranslations: Record<string, string> = {
  "Spedizione gratuita da": "Kostenloser Versand ab",
  "Set originali e sigillati": "Originale und versiegelte Sets",
  "Assistenza WhatsApp 24/7": "WhatsApp-Hilfe rund um die Uhr",
  Shop: "Shop",
  Categorie: "Kategorien",
  "Chi siamo": "Über uns",
  Assistenza: "Hilfe",
  "Consiglia regalo": "Geschenkefinder",
  "👤 Area clienti": "👤 Kundenbereich",
  "Area clienti": "Kundenbereich",
  "SEGUICI ANCHE QUI": "FOLGE UNS AUCH HIER",
  "I profili ufficiali Brickoria sono in preparazione. I collegamenti saranno attivati appena saranno disponibili.": "Die offiziellen Brickoria-Profile werden vorbereitet. Die Links werden aktiviert, sobald sie verfügbar sind.",
  "PROFILO IN ARRIVO": "PROFIL FOLGT",
  Catalogo: "Katalog",
  Costruisci: "Baue",
  "la tua prossima": "deine nächste",
  "storia.": "Geschichte.",
  "SET ORIGINALI, DIVERTIMENTO AUTENTICO": "ORIGINALE SETS, ECHTER SPIELSPASS",
  "Dai primi mattoncini ai set da collezione: trova il mondo perfetto per giocare, creare e sognare.": "Von den ersten Bausteinen bis zu Sammlersets: Finde die perfekte Welt zum Spielen, Gestalten und Träumen.",
  "Scopri i set": "Sets entdecken",
  "Trova un regalo": "Geschenk finden",
  "✓ Pagamenti sicuri": "✓ Sichere Zahlungen",
  "✓ Consegna tracciata": "✓ Sendungsverfolgung",
  "✓ Assistenza italiana": "✓ Persönliche Hilfe",
  "ESPLORA PER PASSIONE": "NACH INTERESSEN ENTDECKEN",
  "Un mondo per": "Eine Welt für",
  "ogni costruttore.": "jeden Baumeister.",
  "Dal calcio alle supercar, dalle missioni spaziali ai set da esposizione: entra direttamente nel tema che ami.": "Von Fußball und Supersportwagen bis zu Weltraummissionen und Ausstellungsmodellen: Entdecke dein Lieblingsthema.",
  "CATALOGO DIMOSTRATIVO": "DEMO-KATALOG",
  "Set che fanno": "Sets mit echtem",
  wow: "Wow-Effekt",
  Tutti: "Alle",
  Bambini: "Kinder",
  Famiglie: "Familien",
  Collezionisti: "Sammler",
  "Nessun set con questi filtri": "Keine Sets mit diesen Filtern",
  "Mostra tutto il catalogo": "Gesamten Katalog anzeigen",
  "Un negozio indipendente,": "Ein unabhängiger Shop,",
  "costruito sulla fiducia.": "auf Vertrauen gebaut.",
  "Selezione responsabile": "Verantwortungsvolle Auswahl",
  "Consiglio personale": "Persönliche Beratung",
  "Assistenza continua": "Laufende Unterstützung",
  "La nostra promessa": "Unser Versprechen",
  "Parla con noi →": "Kontakt aufnehmen →",
  "CONSULENTE REGALO": "GESCHENKEBERATER",
  "Il regalo giusto,": "Das richtige Geschenk,",
  "senza andare a caso.": "ohne Rätselraten.",
  "Troviamo il regalo giusto": "Das richtige Geschenk finden",
  "Originali e sigillati": "Original und versiegelt",
  "Consegna tracciata": "Sendungsverfolgung",
  "Reso guidato": "Geführte Rückgabe",
  "Inizia un reso →": "Rückgabe starten →",
  "CERCHI UN SET?": "SUCHST DU EIN SET?",
  "Chiedilo a noi,": "Frag uns,",
  "a qualsiasi ora.": "jederzeit.",
  Spedizioni: "Versand",
  Resi: "Rückgaben",
  "Preferenze cookie": "Cookie-Einstellungen",
  "Il tuo posto felice, un mattoncino alla volta.": "Dein Lieblingsort, Stein für Stein.",
  PROSSIMAMENTE: "DEMNÄCHST",
  "Tutti i set": "Alle Sets",
  "← Torna allo shop": "← Zurück zum Shop",
  "← Torna al negozio": "← Zurück zum Shop",
  "← Tutte le categorie": "← Alle Kategorien",
  "Tutte le categorie": "Alle Kategorien",
  "Scopri →": "Entdecken →",
  "Scopri anche": "Auch entdecken",
  "IL TUO SPAZIO BRICKORIA": "DEIN BRICKORIA-BEREICH",
  "Tutto sotto controllo,": "Alles im Blick,",
  "mattoncino dopo mattoncino.": "Stein für Stein.",
  "Quando l’area sarà collegata alla piattaforma acquisti, ogni cliente vedrà solo i propri ordini e le relative informazioni.": "Sobald dieser Bereich mit der Einkaufsplattform verbunden ist, sieht jeder Kunde nur seine eigenen Bestellungen und Informationen.",
  "I tuoi ordini": "Deine Bestellungen",
  "Prodotti, importi e date": "Produkte, Beträge und Daten",
  "Stato e tracciamento": "Status und Sendungsverfolgung",
  "Resi più veloci": "Schnellere Rückgaben",
  "Avvio direttamente dall’ordine": "Direkt aus der Bestellung starten",
  ANTEPRIMA: "VORSCHAU",
  "ACCESSO CLIENTI": "KUNDENANMELDUNG",
  "Bentornato!": "Willkommen zurück!",
  "Il login con email e password verrà attivato insieme alla piattaforma che registrerà gli acquisti.": "Die Anmeldung mit E-Mail und Passwort wird zusammen mit der Plattform für echte Käufe aktiviert.",
  Email: "E-Mail",
  Password: "Passwort",
  "Accesso in preparazione": "Anmeldung in Vorbereitung",
  "Nessuna password viene ancora raccolta.": "Es werden noch keine Passwörter erfasst.",
  "Attiveremo il modulo solo con un sistema sicuro e collegato agli ordini reali.": "Wir aktivieren das Formular erst mit einem sicheren System, das mit echten Bestellungen verbunden ist.",
  "DOPO L’ACCESSO": "NACH DER ANMELDUNG",
  "La cronologia acquisti sarà": "Dein Einkaufsverlauf wird",
  "qui.": "hier sein.",
  "Ordini, stato della consegna e pulsante per il reso saranno riuniti in un’unica schermata personale.": "Bestellungen, Lieferstatus und Rückgaben werden in einem persönlichen Bereich zusammengeführt.",
  "I MIEI ORDINI": "MEINE BESTELLUNGEN",
  Anteprima: "Vorschau",
  "Il tuo prossimo set": "Dein nächstes Set",
  "Data, totale e spedizione compariranno qui.": "Datum, Gesamtbetrag und Versand erscheinen hier.",
  "IN ARRIVO": "DEMNÄCHST",
  "Totale ordine": "Bestellsumme",
  "Vedi dettagli": "Details ansehen",
};

const translationsByLocale: Record<Locale, Record<string, string>> = {
  it: {},
  en: englishTranslations,
  fr: frenchTranslations,
  es: spanishTranslations,
  de: germanTranslations,
};

const originalText = new WeakMap<CharacterData, string>();
const originalPlaceholder = new WeakMap<HTMLInputElement, string>();

const dynamicTerms: Record<Exclude<Locale, "it">, Record<string, string>> = {
  en: {
    Calcio: "Football", Auto: "Cars", Spazio: "Space", Natura: "Nature", Città: "City", Collezione: "Collection",
    Bambini: "Children", Famiglie: "Families", Collezionisti: "Collectors", PEZZI: "PIECES", anni: "years",
    Categoria: "Category", CATALOGO: "CATALOGUE", disponibile: "available", disponibili: "available",
  },
  fr: {
    Calcio: "Football", Auto: "Voitures", Spazio: "Espace", Natura: "Nature", Città: "Ville", Collezione: "Collection",
    Bambini: "Enfants", Famiglie: "Familles", Collezionisti: "Collectionneurs", PEZZI: "PIÈCES", anni: "ans",
    Categoria: "Catégorie", CATALOGO: "CATALOGUE", disponibile: "disponible", disponibili: "disponibles",
  },
  es: {
    Calcio: "Fútbol", Auto: "Coches", Spazio: "Espacio", Natura: "Naturaleza", Città: "Ciudad", Collezione: "Colección",
    Bambini: "Niños", Famiglie: "Familias", Collezionisti: "Coleccionistas", PEZZI: "PIEZAS", anni: "años",
    Categoria: "Categoría", CATALOGO: "CATÁLOGO", disponibile: "disponible", disponibili: "disponibles",
  },
  de: {
    Calcio: "Fußball", Auto: "Autos", Spazio: "Weltraum", Natura: "Natur", Città: "Stadt", Collezione: "Sammlung",
    Bambini: "Kinder", Famiglie: "Familien", Collezionisti: "Sammler", PEZZI: "TEILE", anni: "Jahre",
    Categoria: "Kategorie", CATALOGO: "KATALOG", disponibile: "verfügbar", disponibili: "verfügbar",
  },
};

function translateDynamic(value: string, locale: Locale) {
  if (locale === "it") return value;
  let translated = value;
  const terms = dynamicTerms[locale];
  const inlinePairs = [
    ...themes.map((theme) => [theme.name, terms[theme.name]] as const),
    ["Bambini", terms.Bambini],
    ["Famiglie", terms.Famiglie],
    ["Collezionisti", terms.Collezionisti],
    ["PEZZI", terms.PEZZI],
    ["anni", terms.anni],
  ] as const;

  for (const [italian, localized] of inlinePairs) {
    translated = translated.replaceAll(italian, localized);
  }

  translated = translated
    .replace(/^Categoria /, `${terms.Categoria} `)
    .replace(/^CATALOGO /, `${terms.CATALOGO} `)
    .replace(/^(\d+) set disponibile$/, `$1 set ${terms.disponibile}`)
    .replace(/^(\d+) set disponibili$/, `$1 set ${terms.disponibili}`);

  return translated;
}

function applyLanguage(locale: Locale) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as CharacterData | null;

  while (node) {
    if (node.parentElement?.closest('[data-no-translate="true"]')) {
      node = walker.nextNode() as CharacterData | null;
      continue;
    }
    if (!originalText.has(node)) originalText.set(node, node.nodeValue || "");
    const original = originalText.get(node) || "";
    const trimmed = original.trim();
    if (trimmed) {
      const translated = translationsByLocale[locale][trimmed]
        || (locale === "it" ? trimmed : englishTranslations[trimmed])
        || translateDynamic(trimmed, locale);
      const next = locale === "it" ? original : original.replace(trimmed, translated);
      if (node.nodeValue !== next) node.nodeValue = next;
    }
    node = walker.nextNode() as CharacterData | null;
  }

  document.querySelectorAll<HTMLInputElement>("input[placeholder]").forEach((input) => {
    if (!originalPlaceholder.has(input)) originalPlaceholder.set(input, input.placeholder);
    const original = originalPlaceholder.get(input) || "";
    const placeholderTranslations: Record<Exclude<Locale, "it">, Record<string, string>> = {
      en: { "es. BRK-1024": "e.g. BRK-1024", "nome@email.it": "name@email.com" },
      fr: { "es. BRK-1024": "ex. BRK-1024", "nome@email.it": "nom@email.fr" },
      es: { "es. BRK-1024": "ej. BRK-1024", "nome@email.it": "nombre@email.es" },
      de: { "es. BRK-1024": "z. B. BRK-1024", "nome@email.it": "name@email.de" },
    };
    input.placeholder = locale === "it" ? original : placeholderTranslations[locale][original] || original;
  });

  document.documentElement.lang = locale;
}

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<Locale>("it");
  const [open, setOpen] = useState(false);
  const localeRef = useRef<Locale>("it");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("brickoria-language");
    const initial: Locale = saved && ["it", "en", "fr", "es", "de"].includes(saved) ? saved as Locale : "it";
    localeRef.current = initial;
    setLocale(initial);
    applyLanguage(initial);

    const observer = new MutationObserver(() => applyLanguage(localeRef.current));
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  function changeLanguage(next: Locale) {
    localeRef.current = next;
    setLocale(next);
    window.localStorage.setItem("brickoria-language", next);
    applyLanguage(next);
    setOpen(false);
  }

  return (
    <div className={`language-switcher ${open ? "is-open" : ""}`} ref={menuRef} data-no-translate="true">
      <button
        className="language-trigger"
        type="button"
        aria-label="Lingua / Language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{locale.toUpperCase()}</span><span className="language-caret" aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="language-menu" role="listbox" aria-label="Lingua / Language">
          {languageOptions.map((language) => (
            <button
              key={language.code}
              type="button"
              role="option"
              aria-label={language.name}
              aria-selected={locale === language.code}
              className={locale === language.code ? "active" : ""}
              onClick={() => changeLanguage(language.code)}
            >
              <span>{language.code.toUpperCase()}</span><small>{language.name}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
