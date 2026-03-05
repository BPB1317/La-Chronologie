/* ============================================================
   CHRONO SHOW — script.js
   ============================================================ */

'use strict';

/* ============================================================
   🔧 CONFIGURATION
   ============================================================ */

const teams = [
  { name: "Équipe Rouge", score: 0 },
  { name: "Équipe Bleue", score: 0 }
];

const MAX_LIVES      = 3;
const CARDS_PER_ROUND = 5;

/**
 * Grande banque d'événements.
 * Le jeu tire CARDS_PER_ROUND événements au hasard à chaque manche,
 * sans répétition au sein d'une même partie (remis dans le pool après fin de partie).
 */
const eventBank = [
{ title: "Invention du vaccin contre la rage (Pasteur)",              date: 1885, icon: "💉" },
{ title: "Premier vol des frères Wright",                             date: 1903, icon: "✈️" },
{ title: "Découverte de la pénicilline",                              date: 1928, icon: "🧪" },
{ title: "Premier ordinateur programmable (Z3)",                      date: 1941, icon: "💻" },
{ title: "Création de l'UNESCO",                                       date: 1945, icon: "📚" },
{ title: "Invention du transistor",                                    date: 1947, icon: "🔌" },
{ title: "Découverte de la structure de l'ADN",                        date: 1953, icon: "🧬" },
{ title: "Premier homme dans l’espace (Gagarine)",                    date: 1961, icon: "🚀" },
{ title: "Premier pas sur la Lune",                                    date: 1969, icon: "🌕" },
{ title: "Création d’Intel",                                            date: 1968, icon: "🖥️" },
{ title: "Naissance d’Apple",                                           date: 1976, icon: "🍏" },
{ title: "Création de Microsoft",                                       date: 1975, icon: "🪟" },
{ title: "Premier bébé éprouvette",                                     date: 1978, icon: "👶" },
{ title: "Lancement du Walkman",                                        date: 1979, icon: "🎧" },
{ title: "Naissance du World Wide Web (proposition)",                   date: 1989, icon: "🌐" },
{ title: "Premier SMS envoyé",                                          date: 1992, icon: "📱" },
{ title: "Création de Google",                                           date: 1998, icon: "🔍" },
{ title: "Lancement de Wikipédia",                                       date: 2001, icon: "📖" },
{ title: "Création de Facebook",                                         date: 2004, icon: "👍" },
{ title: "Lancement de YouTube",                                         date: 2005, icon: "▶️" },
{ title: "Premier iPhone",                                               date: 2007, icon: "📱" },
{ title: "Création de Twitter",                                          date: 2006, icon: "🐦" },
{ title: "Naissance du Bitcoin",                                         date: 2009, icon: "₿" },
{ title: "Catastrophe nucléaire de Fukushima",                           date: 2011, icon: "☢️" },
{ title: "Création d’Instagram",                                          date: 2010, icon: "📸" },
{ title: "Découverte du boson de Higgs",                                 date: 2012, icon: "⚛️" },
{ title: "Lancement de Netflix en France",                               date: 2014, icon: "🎬" },
{ title: "Accord mondial sur les Objectifs de développement durable",    date: 2015, icon: "🌱" },
{ title: "Lancement de SpaceX Falcon Heavy",                             date: 2018, icon: "🚀" },
{ title: "Premier atterrissage sur la face cachée de la Lune (Chine)",   date: 2019, icon: "🌒" },
{ title: "Pandémie mondiale de COVID-19 (déclaration OMS)",              date: 2020, icon: "🦠" },
{ title: "Vaccins ARNm déployés massivement",                            date: 2021, icon: "💉" },
{ title: "Lancement du télescope James Webb",                            date: 2021, icon: "🔭" },
{ title: "Rachat de Twitter par Elon Musk",                              date: 2022, icon: "🐦" },
{ title: "Mission Artemis I",                                             date: 2022, icon: "🌕" },
{ title: "Faillite de Silicon Valley Bank",                              date: 2023, icon: "🏦" },
{ title: "Lancement d’Apple Vision Pro",                                  date: 2023, icon: "🥽" },
{ title: "Record mondial de chaleur annuelle",                           date: 2023, icon: "🌡️" },
{ title: "Premier vol de Starship (SpaceX)",                              date: 2023, icon: "🚀" },
{ title: "Premiers Jeux Olympiques de Paris",                                      date: 1900, icon: "🏅" },
{ title: "Mission lunaire privée réussie",                                date: 2024, icon: "🌕" },
{ title: "Déploiement 6G expérimental",                                    date: 2025, icon: "📡" },
{ title: "Premières villes neutres en carbone",                           date: 2025, icon: "🌿" },
{ title: "Première base lunaire modulaire (début installation)",          date: 2026, icon: "🌕" },
{ title: "Ouverture du canal de Panama",                                   date: 1914, icon: "🚢" },
{ title: "Premier film parlant (Le Chanteur de jazz)",                    date: 1927, icon: "🎬" },
{ title: "Création de Disney",                                             date: 1923, icon: "🐭" },
{ title: "Première carte bancaire moderne",                                date: 1950, icon: "💳" },
{ title: "Naissance du rock’n’roll (essor mondial)",                      date: 1955, icon: "🎸" },
{ title: "Invention du microprocesseur",                                   date: 1971, icon: "🖥️" },
{ title: "Création d’Amazon",                                              date: 1994, icon: "📦" },
{ title: "Création de Tesla Motors",                                       date: 2003, icon: "🚗" },
{ title: "Lancement d’Alibaba en bourse",                                  date: 2014, icon: "📈" },
{ title: "Premier atterrissage d’une fusée réutilisable",                  date: 2015, icon: "🚀" },
{ title: "Lancement de TikTok à l’international",                          date: 2017, icon: "🎵" },
{ title: "Premier cœur artificiel totalement autonome implanté",           date: 2020, icon: "❤️" },
{ title: "Adoption de la Constitution américaine",                    date: 1787, icon: "🇺🇸" },
{ title: "Création du Sénat conservateur (France)",                   date: 1799, icon: "🏛️" },
{ title: "Doctrine Monroe proclamée",                                 date: 1823, icon: "📜" },
{ title: "Abolition de l'esclavage dans l'Empire britannique",        date: 1833, icon: "⛓️" },
{ title: "Abolition de l'esclavage en France",                         date: 1848, icon: "🇫🇷" },
{ title: "Proclamation du Royaume d’Italie",                          date: 1861, icon: "🇮🇹" },
{ title: "Amendement XIII aux États-Unis (fin esclavage)",            date: 1865, icon: "📖" },
{ title: "Création du SPD en Allemagne",                              date: 1875, icon: "🔴" },
{ title: "Loi sur la liberté de la presse (France)",                  date: 1881, icon: "📰" },
{ title: "Loi Waldeck-Rousseau sur les syndicats",                    date: 1884, icon: "⚒️" },
{ title: "Création du Parti travailliste britannique",                date: 1900, icon: "🌹" },
{ title: "Révolution mexicaine (début)",                               date: 1910, icon: "🇲🇽" },
{ title: "Droit de vote des femmes au Royaume-Uni (partiel)",         date: 1918, icon: "🗳️" },
{ title: "Création du Parti communiste français",                     date: 1920, icon: "🔴" },
{ title: "Droit de vote des femmes en France",                        date: 1944, icon: "🗳️" },
{ title: "Création de la IVe République française",                   date: 1946, icon: "🏛️" },
{ title: "Début de la construction européenne (CECA)",                date: 1951, icon: "🇪🇺" },
{ title: "Indépendance du Ghana",                                      date: 1957, icon: "🇬🇭" },
{ title: "Création du Mouvement des non-alignés",                     date: 1961, icon: "🌍" },
{ title: "Premier élargissement de la CEE",                           date: 1973, icon: "🇪🇺" },
{ title: "Constitution espagnole post-franquiste",                    date: 1978, icon: "🇪🇸" },
{ title: "Acte unique européen",                                       date: 1986, icon: "🇪🇺" },
{ title: "Fin de la dictature au Chili",                              date: 1990, icon: "🇨🇱" },
{ title: "Création de la Cour pénale internationale",                 date: 1998, icon: "⚖️" },
{ title: "Loi sur la parité en politique (France)",                   date: 2000, icon: "⚖️" },
{ title: "Référendum français sur la Constitution européenne",        date: 2005, icon: "🗳️" },
{ title: "Traité de Lisbonne",                                         date: 2007, icon: "🇪🇺" },
{ title: "Indépendance du Kosovo",                                     date: 2008, icon: "🇽🇰" },
{ title: "Printemps arabe (début en Tunisie)",                        date: 2010, icon: "🔥" },
{ title: "Accord de Paris sur le climat",                             date: 2015, icon: "🌍" },
{ title: "Référendum sur le Brexit",                                   date: 2016, icon: "🇬🇧" },
{ title: "Entrée en vigueur du RGPD (UE)",                            date: 2018, icon: "🔐" },
{ title: "Mouvement des Gilets jaunes (début)",                       date: 2018, icon: "🟡" },
{ title: "Élection de Volodymyr Zelensky",                            date: 2019, icon: "🇺🇦" },
{ title: "Sortie officielle du Royaume-Uni de l’UE",                  date: 2020, icon: "🚪" },
{ title: "Élection de Joe Biden",                                      date: 2020, icon: "🇺🇸" },
{ title: "Assaut du Capitole à Washington",                           date: 2021, icon: "🏛️" },
{ title: "Réélection d'Emmanuel Macron",                              date: 2022, icon: "🇫🇷" },
{ title: "Élection de Giorgia Meloni en Italie",                      date: 2022, icon: "🇮🇹" },
{ title: "Adhésion de la Finlande à l’OTAN",                          date: 2023, icon: "🛡️" },
{ title: "Premières Élections européennes",                                      date: 1979, icon: "🇪🇺" },
{ title: "Élection de JFK",                         date: 1960, icon: "🗳️" },
{ title: "Première projection publique des frères Lumière",            date: 1895, icon: "🎥" },
{ title: "Sortie de 'Le Voyage dans la Lune' (Méliès)",                date: 1902, icon: "🌙" },
{ title: "Sortie de 'Naissance d'une nation'",                          date: 1915, icon: "🎬" },
{ title: "Sortie de 'Le Chanteur de jazz' (premier film parlant)",     date: 1927, icon: "🎤" },
{ title: "Sortie de 'Blanche-Neige et les Sept Nains'",                 date: 1937, icon: "🍎" },
{ title: "Sortie de 'Autant en emporte le vent'",                       date: 1939, icon: "🔥" },
{ title: "Sortie de 'Citizen Kane'",                                     date: 1941, icon: "📰" },
{ title: "Création du Festival de Cannes",                               date: 1946, icon: "🏆" },
{ title: "Sortie de 'Les 400 Coups'",                                     date: 1959, icon: "🇫🇷" },
{ title: "Sortie de 'Psychose'",                                          date: 1960, icon: "🔪" },
{ title: "Sortie de 'James Bond contre Dr No'",                          date: 1962, icon: "🕶️" },
{ title: "Sortie de 'Le Parrain'",                                        date: 1972, icon: "🤵" },
{ title: "Sortie de 'Les Dents de la mer'",                               date: 1975, icon: "🦈" },
{ title: "Sortie de 'Star Wars : Un nouvel espoir'",                     date: 1977, icon: "🚀" },
{ title: "Sortie de 'E.T. l'extra-terrestre'",                            date: 1982, icon: "👽" },
{ title: "Sortie de 'Retour vers le futur'",                              date: 1985, icon: "⏳" },
{ title: "Sortie de 'Titanic'",                                           date: 1997, icon: "🚢" },
{ title: "Sortie de 'Matrix'",                                            date: 1999, icon: "💊" },
{ title: "Sortie de 'Harry Potter à l'école des sorciers'",              date: 2001, icon: "🧙" },
{ title: "Sortie de 'Le Seigneur des Anneaux : Le Retour du Roi'",       date: 2003, icon: "💍" },
{ title: "Sortie de 'Avatar'",                                            date: 2009, icon: "🌌" },
{ title: "Sortie de 'Intouchables'",                                      date: 2011, icon: "🤝" },
{ title: "Sortie de 'Avengers: Endgame'",                                 date: 2019, icon: "🦸" },
{ title: "Sortie de 'Parasite' (Palme d'Or)",                             date: 2019, icon: "🏆" },
{ title: "Sortie de 'Oppenheimer'",                                        date: 2023, icon: "💣" },
{ title: "Diffusion du premier épisode de 'I Love Lucy'",                date: 1951, icon: "📺" },
{ title: "Première diffusion de 'Doctor Who'",                            date: 1963, icon: "⏱️" },
{ title: "Première diffusion de 'Star Trek'",                             date: 1966, icon: "🖖" },
{ title: "Première diffusion de 'Les Simpson'",                           date: 1989, icon: "🍩" },
{ title: "Première diffusion de 'Friends'",                               date: 1994, icon: "☕" },
{ title: "Première diffusion de 'Urgences'",                              date: 1994, icon: "🏥" },
{ title: "Première diffusion de 'Buffy contre les vampires'",            date: 1997, icon: "🧛" },
{ title: "Première diffusion de 'Les Soprano'",                           date: 1999, icon: "🔫" },
{ title: "Première diffusion de 'CSI : Les Experts'",                     date: 2000, icon: "🔍" },
{ title: "Première diffusion de '24 Heures chrono'",                      date: 2001, icon: "⏰" },
{ title: "Première diffusion de 'Lost'",                                   date: 2004, icon: "🏝️" },
{ title: "Lancement de YouTube",                                           date: 2005, icon: "▶️" },
{ title: "Première diffusion de 'Grey's Anatomy'",                        date: 2005, icon: "🩺" },
{ title: "Lancement de Netflix en streaming",                             date: 2007, icon: "📡" },
{ title: "Première diffusion de 'Breaking Bad'",                          date: 2008, icon: "🧪" },
{ title: "Première diffusion de 'Game of Thrones'",                       date: 2011, icon: "🐉" },
{ title: "Première diffusion de 'Stranger Things'",                       date: 2016, icon: "🧇" },
{ title: "Première diffusion de 'La Casa de Papel'",                      date: 2017, icon: "💰" },
{ title: "Première diffusion de 'The Crown'",                              date: 2016, icon: "👑" },
{ title: "Première diffusion de 'The Mandalorian'",                       date: 2019, icon: "🛸" },
{ title: "Première diffusion de 'Squid Game'",                            date: 2021, icon: "🦑" },
{ title: "Première diffusion de 'House of the Dragon'",                   date: 2022, icon: "🔥" },
{ title: "Première diffusion de 'The Last of Us'",                        date: 2023, icon: "🧟" },
{ title: "Création des Oscars (Academy Awards)",                          date: 1929, icon: "🏆" },
{ title: "Création des Golden Globes",                                     date: 1944, icon: "🌍" },
{ title: "Création des César du cinéma",                                   date: 1976, icon: "🎭" },
{ title: "Création des Emmy Awards",                                       date: 1949, icon: "📺" },
{ title: "Sortie de 'Jurassic Park'",                                      date: 1993, icon: "🦖" },
{ title: "Sortie de 'Pulp Fiction'",                                       date: 1994, icon: "💼" },
{ title: "Sortie de 'Gladiator'",                                          date: 2000, icon: "⚔️" },
{ title: "Sortie de 'Le Fabuleux Destin d'Amélie Poulain'",               date: 2001, icon: "🗼" },
{ title: "Sortie de 'The Dark Knight'",                                    date: 2008, icon: "🦇" },
{ title: "Sortie de 'Inception'",                                           date: 2010, icon: "🌀" },
{ title: "Sortie de 'Frozen'",                                              date: 2013, icon: "❄️" },
{ title: "Sortie de 'Interstellar'",                                        date: 2014, icon: "🌠" },
{ title: "Sortie de 'Joker'",                                               date: 2019, icon: "🃏" },
{ title: "Sortie de 'Dune'",                                                date: 2021, icon: "🏜️" },
{ title: "Sortie de 'Barbie' avec M.Robbie",                                              date: 2023, icon: "🎀" },
{ title: "Sortie de 'The Batman'",                                          date: 2022, icon: "🦇" },
{ title: "Sortie de 'Top Gun: Maverick'",                                  date: 2022, icon: "✈️" },
{ title: "Sortie de 'Spider-Man: No Way Home'",                            date: 2021, icon: "🕷️" },
{ title: "Sortie de 'Black Panther'",                                       date: 2018, icon: "🐾" },
{ title: "Sortie de 'Forrest Gump'",                                        date: 1994, icon: "🏃" },
{ title: "Sortie de 'Le Roi Lion'",                                         date: 1994, icon: "🦁" },
{ title: "Sortie de 'Rocky'",                                               date: 1976, icon: "🥊" },
{ title: "Sortie de 'La La Land'",                                          date: 2016, icon: "🎶" },
{ title: "Sortie de 'Mad Max: Fury Road'",                                  date: 2015, icon: "🚗" },
{ title: "Première ascension du Mont Blanc",                     date: 1786, icon: "🏔️" },
{ title: "Création du tournoi de Wimbledon",                     date: 1877, icon: "🎾" },
{ title: "Premier Tour de France",                                date: 1903, icon: "🚴" },
{ title: "Création de la FIFA",                                    date: 1904, icon: "⚽" },
{ title: "Premier Grand Prix automobile (France)",                 date: 1906, icon: "🏎️" },
{ title: "Première Coupe Davis",                                   date: 1900, icon: "🎾" },
{ title: "Création du Comité International Olympique",             date: 1894, icon: "🏛️" },
{ title: "Première Coupe du monde de football",                    date: 1930, icon: "🌍" },
{ title: "Création de la NBA",                                      date: 1946, icon: "🏀" },
{ title: "Drame de Superga (Torino)",                               date: 1949, icon: "✈️" },
{ title: "Première victoire française en Coupe Davis",              date: 1927, icon: "🇫🇷" },
{ title: "Création de la Formule 1 (championnat du monde)",         date: 1950, icon: "🏎️" },
{ title: "Première Coupe d'Europe des clubs champions",             date: 1955, icon: "⚽" },
{ title: "Création du Ballon d'Or",                                 date: 1956, icon: "⚽" },
{ title: "Pelé remporte sa première Coupe du monde",                date: 1958, icon: "🇧🇷" },
{ title: "Record du monde du 100m par Jim Hines (sous 10s)",        date: 1968, icon: "🏃" },
{ title: "Création du Super Bowl",                                   date: 1967, icon: "🏈" },
{ title: "Première coupe du monde de football remportée par le Brésil",        date: 1958, icon: "🇧🇷" },
{ title: "Match du siècle Fischer vs Spassky",                      date: 1972, icon: "♟️" },
{ title: "Création de la Coupe du monde de rugby",                  date: 1987, icon: "🏉" },
{ title: "Main de Dieu (Maradona)",                                  date: 1986, icon: "⚽" },
{ title: "Création de la Ligue des Champions (nouveau format)",     date: 1992, icon: "⭐" },
{ title: "Dream Team aux JO de Barcelone",                          date: 1992, icon: "🏀" },
{ title: "Afrique du Sud remporte la Coupe du monde de rugby pour la première fois",      date: 1995, icon: "🏉" },
{ title: "Victoire de la France en Coupe du monde de football",     date: 1998, icon: "🇫🇷" },
{ title: "Lance Armstrong premier Tour (déchu ensuite)",            date: 1999, icon: "🚴" },
{ title: "Création de l'UFC moderne",                                date: 1993, icon: "🥊" },
{ title: "Michael Schumacher 7e titre mondial",                     date: 2004, icon: "🏎️" },
{ title: "Zidane coup de tête en finale",                           date: 2006, icon: "⚽" },
{ title: "Usain Bolt record du monde 100m (9.58)",                  date: 2009, icon: "⚡" },
{ title: "Sacres consécutifs de Nadal à Roland-Garros (5e)",        date: 2010, icon: "🎾" },
{ title: "Leicester champion d'Angleterre",                         date: 2016, icon: "🦊" },
{ title: "Portugal champion d'Europe",                               date: 2016, icon: "🇵🇹" },
{ title: "Jeux Olympiques de Rio",                                   date: 2016, icon: "🏅" },
{ title: "France championne du monde (football) pour la première fois",                    date: 1998, icon: "🇫🇷" },
{ title: "Liverpool remporte sa première Ligue des Champions",                date: 1977, icon: "🔴" },
{ title: "Jeux Olympiques de Tokyo (reportés)",                      date: 2021, icon: "🏅" },
{ title: "Argentine championne du monde pour la première fois",                    date: 1978, icon: "🇦🇷" },
{ title: "Karim Benzema Ballon d'Or",                                date: 2022, icon: "⚽" },
{ title: "Max Verstappen 1er titre mondial F1",                       date: 2021, icon: "🏎️" },
{ title: "Coupe du monde de rugby en France",                        date: 2023, icon: "🏉" },
{ title: "Novak Djokovic record de titres du Grand Chelem",          date: 2023, icon: "🎾" },
{ title: "Real Madrid 15e Ligue des Champions",                      date: 2024, icon: "👑" },
{ title: "Euro 2024 en Allemagne",                                    date: 2024, icon: "⚽" },
{ title: "Tour de France 100e édition",                               date: 2013, icon: "🚴" },
{ title: "Création de la Premier League",                             date: 1992, icon: "🏴" },
{ title: "Premier Marathon moderne (JO Athènes)",                     date: 1896, icon: "🏃" },
{ title: "Création du Tournoi des Six Nations",                       date: 2000, icon: "🏉" },
{ title: "Tiger Woods remporte le Masters (retour historique)",       date: 2019, icon: "⛳" },
{ title: "Rafael Nadal 14e Roland-Garros",                            date: 2022, icon: "🎾" },
{ title: "Simone Biles 4 médailles d'or à Rio",                       date: 2016, icon: "🤸" },
{ title: "Création de l'UEFA",                                         date: 1954, icon: "⚽" },
{ title: "Premier Vendée Globe",                                       date: 1989, icon: "⛵" },
{ title: "Mike Tyson plus jeune champion du monde poids lourds",      date: 1986, icon: "🥊" },
{ title: "Passage de la barre des 6m au saut à la perche (Bubka)",               date: 1985, icon: "🏃" },
{ title: "Création du Dakar",                                          date: 1979, icon: "🏍️" },
{ title: "Premier All Blacks champions du monde rugby",               date: 1987, icon: "🇳🇿" },
{ title: "Michael Phelps 8 médailles d'or (Pékin)",                   date: 2008, icon: "🏊" },
{ title: "Inauguration du Stade de France",                           date: 1998, icon: "🏟️" },
{ title: "Premier championnat du monde féminin de football",          date: 1991, icon: "⚽" },
{ title: "Serena Williams 23e Grand Chelem",                          date: 2017, icon: "🎾" },
{ title: "Lewis Hamilton égale 7 titres mondiaux",                    date: 2020, icon: "🏎️" },
{ title: "Coupe du monde féminine en France",                         date: 2019, icon: "⚽" },
{ title: "Premier Ironman (Hawaï)",                                    date: 1978, icon: "🏊" },
{ title: "Record du monde marathon Eliud Kipchoge (2h01:09)",         date: 2022, icon: "🏃" },
{ title: "Création de la Coupe du monde féminine de rugby",           date: 1991, icon: "🏉" },
{ title: "Premier Grand Chelem de Steffi Graf (Golden Slam)",         date: 1988, icon: "🎾" },
{ title: "Prise de la Bastille",                         date: 1789, icon: "🏰" },
{ title: "Déclaration des droits de l'homme et du citoyen", date: 1789, icon: "📜" },
{ title: "Proclamation de la Première République française", date: 1792, icon: "🇫🇷" },
{ title: "Exécution de Louis XVI",                       date: 1793, icon: "⚖️" },
{ title: "Sacre de Napoléon Ier",                        date: 1804, icon: "👑" },
{ title: "Bataille de Waterloo",                         date: 1815, icon: "⚔️" },
{ title: "Proclamation du Second Empire",                date: 1852, icon: "🦅" },
{ title: "Guerre de Sécession (début)",                  date: 1861, icon: "🇺🇸" },
{ title: "Unification de l'Allemagne",                   date: 1871, icon: "🇩🇪" },
{ title: "Proclamation de la Troisième République",      date: 1870, icon: "🏛️" },
{ title: "Invention du téléphone (Bell)",                date: 1876, icon: "☎️" },
{ title: "Inauguration de la Tour Eiffel",               date: 1889, icon: "🗼" },
{ title: "Affaire Dreyfus (début)",                      date: 1894, icon: "📚" },
{ title: "Premier vol des frères Wright",                date: 1903, icon: "✈️" },
{ title: "Première Guerre mondiale (début)",             date: 1914, icon: "💣" },
{ title: "Révolution russe",                             date: 1917, icon: "🔴" },
{ title: "Armistice de la Première Guerre mondiale",     date: 1918, icon: "🕊️" },
{ title: "Création de la Société des Nations",           date: 1919, icon: "🌐" },
{ title: "Krach boursier de Wall Street",                date: 1929, icon: "📉" },
{ title: "Arrivée d'Hitler au pouvoir",                  date: 1933, icon: "⚠️" },
{ title: "Seconde Guerre mondiale (début)",              date: 1939, icon: "🌍" },
{ title: "Appel du 18 juin (De Gaulle)",                 date: 1940, icon: "📻" },
{ title: "Débarquement en Normandie",                    date: 1944, icon: "🚢" },
{ title: "Bombes atomiques sur Hiroshima et Nagasaki",   date: 1945, icon: "☢️" },
{ title: "Création de l'ONU",                            date: 1945, icon: "🏳️" },
{ title: "Début de la guerre froide",                    date: 1947, icon: "🧊" },
{ title: "Traité de Rome (CEE)",                         date: 1957, icon: "🇪🇺" },
{ title: "Construction du mur de Berlin",                date: 1961, icon: "🧱" },
{ title: "Indépendance de l'Algérie",                    date: 1962, icon: "🕊️" },
{ title: "Assassinat de John F. Kennedy",                date: 1963, icon: "🇺🇸" },
{ title: "Premier pas de l'homme sur la Lune",           date: 1969, icon: "🌕" },
{ title: "Premier choc pétrolier",                       date: 1973, icon: "🛢️" },
{ title: "Fin de la guerre du Vietnam",                  date: 1975, icon: "🪖" },
{ title: "Chute du Shah d'Iran",                         date: 1979, icon: "🔥" },
{ title: "Élection de François Mitterrand",              date: 1981, icon: "🗳️" },
{ title: "Catastrophe de Tchernobyl",                    date: 1986, icon: "☢️" },
{ title: "Chute du mur de Berlin",                       date: 1989, icon: "🧱" },
{ title: "Fin de l'URSS",                                date: 1991, icon: "🔚" },
{ title: "Traité de Maastricht",                         date: 1992, icon: "🇪🇺" },
{ title: "Génocide des Tutsi au Rwanda",                 date: 1994, icon: "🕯️" },
{ title: "Création de l'OMC",                            date: 1995, icon: "🌐" },
{ title: "Lancement de Google",                          date: 1998, icon: "🔎" },
{ title: "Passage à l'euro (monnaie scripturale)",       date: 1999, icon: "💶" },
{ title: "Attentats du 11 septembre",                    date: 2001, icon: "🗽" },
{ title: "Introduction des pièces et billets en euro",   date: 2002, icon: "💶" },
{ title: "Création de Facebook",                         date: 2004, icon: "📘" },
{ title: "Lancement de YouTube",                         date: 2005, icon: "▶️" },
{ title: "Lancement du premier iPhone",                  date: 2007, icon: "📱" },
{ title: "Crise des subprimes",                    date: 2008, icon: "📉" },
{ title: "Élection de Barack Obama",                     date: 2008, icon: "🇺🇸" },
{ title: "Printemps arabe (début)",                      date: 2011, icon: "🌍" },
{ title: "Accord de Paris sur le climat",                date: 2015, icon: "🌡️" },
{ title: "Attentats du 13 novembre à Paris",             date: 2015, icon: "🕯️" },
{ title: "Référendum sur le Brexit",                     date: 2016, icon: "🇬🇧" },
{ title: "Élection d'Emmanuel Macron",                   date: 2017, icon: "🇫🇷" },
{ title: "Mouvement des Gilets jaunes (début)",          date: 2018, icon: "🦺" },
{ title: "Incendie de Notre-Dame de Paris",              date: 2019, icon: "🔥" },
{ title: "Pandémie de COVID-19 (début mondial)",         date: 2020, icon: "🦠" },
{ title: "Sortie officielle du Royaume-Uni de l'UE",     date: 2020, icon: "🇪🇺" },
{ title: "Assaut du Capitole aux États-Unis",            date: 2021, icon: "🏛️" },
{ title: "Réélection d'Emmanuel Macron",                 date: 2022, icon: "🗳️" },
{ title: "Lancement de ChatGPT",                         date: 2022, icon: "🤖" },
{ title: "Couronnement de Charles III",                  date: 2023, icon: "👑" },
{ title: "Entrée de la Finlande dans l'OTAN",            date: 2023, icon: "🛡️" },
{ title: "Entrée de la Suède dans l'OTAN",               date: 2024, icon: "🛡️" },
];

/* ============================================================
   🗂️ ÉTAT DU JEU
   ============================================================ */

const state = {
  currentTeamIndex  : 0,
  currentRoundIndex : 0,
  livesLeft         : MAX_LIVES,
  currentCards      : [],
  animationsEnabled : true,
  overlayPhase      : 'idle',
  lastResultSuccess : false,
  manchePerdue      : false,
  _showRevealNext   : false,
  // Pool d'événements restants pour la partie en cours
  remainingPool     : []
};

/* ============================================================
   🔗 SÉLECTEURS DOM
   ============================================================ */

const $ = id => document.getElementById(id);

const screenIntro = $('screen-intro');
const screenGame  = $('screen-game');
const screenEnd   = $('screen-end');

const scoreTeam0  = $('score-team0');
const scoreTeam1  = $('score-team1');
const nameTeam0   = $('name-team0');
const nameTeam1   = $('name-team1');
const pointsTeam0 = $('points-team0');
const pointsTeam1 = $('points-team1');

const activeTeamName = $('active-team-name');
const livesDisplay   = $('lives-display');
const roundInfo      = $('round-info');

const cardsContainer = $('cards-container');
const btnValidate    = $('btn-validate');

const overlayResult      = $('overlay-result');
const phaseResult        = $('phase-result');
const phaseReveal        = $('phase-reveal');
const resultIcon         = $('result-icon');
const resultTitle        = $('result-title');
const resultMessage      = $('result-message');
const resultSub          = $('result-sub');
const btnOverlayContinue = $('btn-overlay-continue');
const revealCardsList    = $('reveal-cards-list');

const overlayTransition  = $('overlay-transition');
const transitionTeamName = $('transition-team-name');
const btnTransitionOk    = $('btn-transition-ok');

const endScores = $('end-scores');
const endWinner = $('end-winner');

const adminToggleBtn   = $('admin-toggle');
const adminPanel       = $('admin-panel');
const adminNextRound   = $('admin-next-round');
const adminResetLives  = $('admin-reset-lives');
const adminResetScores = $('admin-reset-scores');
const adminChangeTeam  = $('admin-change-team');
const adminToggleAnim  = $('admin-toggle-anim');

/* ============================================================
   🚀 DÉMARRAGE
   ============================================================ */

$('btn-start').addEventListener('click', initGame);

function initGame() {
  teams.forEach(t => t.score = 0);

  state.currentTeamIndex  = 0;
  state.currentRoundIndex = 0;
  state.livesLeft         = MAX_LIVES;
  state.manchePerdue      = false;
  state.overlayPhase      = 'idle';

  // Remplit et mélange le pool pour la partie
  resetPool();

  showScreen('game');
  updateHeaderScores();
  startManche();
}

/**
 * Remet tous les événements dans le pool et le mélange.
 * Appelé en début de partie, ou quand le pool est épuisé.
 */
function resetPool() {
  state.remainingPool = shuffle([...eventBank]);
}

/**
 * Tire CARDS_PER_ROUND événements du pool.
 * Si le pool est presque vide, on le recharge automatiquement.
 */
function drawCards() {
  let attempts = 0;
  let picked;

  do {
    if (state.remainingPool.length < CARDS_PER_ROUND) {
      const currentTitles = new Set(state.currentCards.map(c => c.title));
      state.remainingPool = shuffle(eventBank.filter(e => !currentTitles.has(e.title)));
    }

    picked = state.remainingPool.slice(0, CARDS_PER_ROUND);
    const uniqueDates = new Set(picked.map(e => e.date));

    if (uniqueDates.size === CARDS_PER_ROUND) break; // ✅ Pas de doublon

    // ❌ Doublon → remélanges et réessaie
    state.remainingPool = shuffle([...state.remainingPool]);
    attempts++;

  } while (attempts < 20);

  state.remainingPool.splice(0, CARDS_PER_ROUND);
  return shuffle(picked);
}


/* ============================================================
   🖥️ GESTION DES ÉCRANS
   ============================================================ */

function showScreen(name) {
  screenIntro.style.display = name === 'intro' ? 'flex' : 'none';
  screenGame.style.display  = name === 'game'  ? 'flex' : 'none';
  screenEnd.style.display   = name === 'end'   ? 'flex' : 'none';
}

/* ============================================================
   🃏 MANCHE
   ============================================================ */

function startManche() {
  state.livesLeft    = MAX_LIVES;
  state.manchePerdue = false;
  state.overlayPhase = 'idle';

  // Tire 5 nouvelles cartes aléatoires depuis le pool
  state.currentCards = drawCards();

  roundInfo.textContent = `Manche ${state.currentRoundIndex + 1}`;
  btnValidate.disabled  = false;

  updateStatusBar();
  updateHeaderScores();
  renderCards();

  overlayResult.style.display     = 'none';
  overlayTransition.style.display = 'none';
}

function retryManche() {
  state.overlayPhase = 'idle';
  // On garde l'ordre tel quel
  btnValidate.disabled = false;
  updateStatusBar();
  renderCards();
}

/* ============================================================
   🎴 RENDU DES CARTES
   ============================================================ */

function renderCards() {
  cardsContainer.innerHTML = '';
  state.currentCards.forEach((card, index) => {
    const el = buildCardElement(card, index);
    cardsContainer.appendChild(el);
    attachDragListeners(el);
  });
}

function buildCardElement(card, index) {
  const el       = document.createElement('div');
  el.className   = 'event-card';
  el.draggable   = true;
  el.dataset.idx = String(index);

  el.innerHTML = `
    <div class="card-position">${index + 1}</div>
    <div class="card-icon">${card.icon || '📅'}</div>
    <div class="card-title">${card.title}</div>
    <div class="card-date-reveal">${formatDate(card.date)}</div>
  `;

  return el;
}

function refreshPositionBadges() {
  cardsContainer.querySelectorAll('.event-card').forEach((el, i) => {
    el.querySelector('.card-position').textContent = i + 1;
    el.dataset.idx = String(i);
  });
}

function formatDate(year) {
  if (year < 0)   return `${Math.abs(year)} av. J.-C.`;
  if (year === 0) return 'An 0';
  return String(year);
}

/* ============================================================
   🖱️ DRAG & DROP
   ============================================================ */

let dragSrcEl = null;

function attachDragListeners(el) {
  el.addEventListener('dragstart', onDragStart);
  el.addEventListener('dragenter', onDragEnter);
  el.addEventListener('dragover',  onDragOver);
  el.addEventListener('dragleave', onDragLeave);
  el.addEventListener('drop',      onDrop);
  el.addEventListener('dragend',   onDragEnd);
}

function onDragStart(e) {
  dragSrcEl = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function onDragEnter(e) {
  e.preventDefault();
  if (this !== dragSrcEl) this.classList.add('drag-over');
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function onDragLeave() {
  this.classList.remove('drag-over');
}

function onDrop(e) {
  e.stopPropagation();
  this.classList.remove('drag-over');

  if (!dragSrcEl || this === dragSrcEl) return;

  const allCards = [...cardsContainer.querySelectorAll('.event-card')];
  const srcIdx   = allCards.indexOf(dragSrcEl);
  const dstIdx   = allCards.indexOf(this);

  if (srcIdx < dstIdx) {
    cardsContainer.insertBefore(dragSrcEl, this.nextSibling);
  } else {
    cardsContainer.insertBefore(dragSrcEl, this);
  }

  syncCardsStateFromDOM();
  refreshPositionBadges();
}

function onDragEnd() {
  this.classList.remove('dragging');
  cardsContainer.querySelectorAll('.event-card')
    .forEach(c => c.classList.remove('drag-over', 'dragging'));
}

function syncCardsStateFromDOM() {
  const domCards = [...cardsContainer.querySelectorAll('.event-card')];
  state.currentCards = domCards.map(el => {
    const title = el.querySelector('.card-title').textContent.trim();
    return eventBank.find(c => c.title === title);
  });
}

/* ============================================================
   ✅ VALIDATION
   ============================================================ */

btnValidate.addEventListener('click', handleValidation);

function handleValidation() {
  btnValidate.disabled = true;

  const correctOrder = [...state.currentCards].sort((a, b) => a.date - b.date);

  let score = 0;
  state.currentCards.forEach((card, i) => {
    if (card.date === correctOrder[i].date) score++;
  });

  const isSuccess = score === CARDS_PER_ROUND;
  state.lastResultSuccess = isSuccess;

  if (isSuccess) {
    onSuccess(score);
  } else {
    onFailure(score);
  }
}

/* ============================================================
   🏆 SUCCÈS
   ============================================================ */

function onSuccess(score) {
  teams[state.currentTeamIndex].score++;
  updateHeaderScores();
  if (state.animationsEnabled) triggerConfetti();

  showResultPhase({
    icon       : '🏆',
    iconClass  : 'success',
    title      : 'PARFAIT !',
    titleFail  : false,
    message    : `${score} / ${CARDS_PER_ROUND} événements bien placés !`,
    sub        : `+1 point pour ${currentTeam().name} 🎉`,
    showReveal : true
  });
}

/* ============================================================
   💔 ÉCHEC
   ============================================================ */

function onFailure(score) {
  state.livesLeft--;

  if (state.animationsEnabled) {
    screenGame.classList.add('shake-screen');
    setTimeout(() => screenGame.classList.remove('shake-screen'), 600);
  }

  animateLostLife();

  const plusDeVies = state.livesLeft <= 0;
  state.manchePerdue = plusDeVies;

  if (plusDeVies) {
    showResultPhase({
      icon       : '💀',
      iconClass  : 'fail',
      title      : 'ÉLIMINÉ !',
      titleFail  : true,
      message    : `${score} / ${CARDS_PER_ROUND} événements bien placés`,
      sub        : 'Les 3 vies sont épuisées — manche perdue !',
      showReveal : true
    });
  } else {
    showResultPhase({
      icon       : '❌',
      iconClass  : 'fail',
      title      : 'RATÉ !',
      titleFail  : true,
      message    : `${score} / ${CARDS_PER_ROUND} événements bien placés`,
      sub        : `Il reste ${state.livesLeft} vie${state.livesLeft > 1 ? 's' : ''}`,
      showReveal : false
    });
  }
}

/* ============================================================
   📋 OVERLAY — PHASE 1 : RÉSULTAT
   ============================================================ */

function showResultPhase(opts) {
  state.overlayPhase    = 'result';
  state._showRevealNext = opts.showReveal;

  phaseResult.style.display = 'block';
  phaseReveal.style.display = 'none';

  resultIcon.textContent    = opts.icon;
  resultIcon.className      = `overlay-icon ${opts.iconClass}`;
  resultTitle.textContent   = opts.title;
  resultTitle.className     = `overlay-title${opts.titleFail ? ' fail-title' : ''}`;
  resultMessage.textContent = opts.message;
  resultSub.textContent     = opts.sub;

  btnOverlayContinue.textContent = opts.showReveal ? '📅 VOIR LES DATES' : '🔁 RÉESSAYER';

  overlayResult.style.display = 'flex';
}

/* ============================================================
   📅 OVERLAY — PHASE 2 : RÉVÉLATION DES DATES
   ============================================================ */

function showRevealPhase() {
  state.overlayPhase = 'reveal';

  phaseResult.style.display = 'none';
  phaseReveal.style.display = 'block';

  const correctOrder = [...state.currentCards].sort((a, b) => a.date - b.date);

  revealCardsList.innerHTML = '';

  correctOrder.forEach((card, i) => {
    const userCard   = state.currentCards[i];
    const wasCorrect = userCard && userCard.date === card.date;

    const item     = document.createElement('div');
    item.className = 'reveal-item';
    item.style.animationDelay = `${i * 0.08}s`;

    item.innerHTML = `
      <div class="reveal-item-left">
        <span class="reveal-item-rank">${i + 1}</span>
        <span class="reveal-item-icon">${card.icon || '📅'}</span>
        <span class="reveal-item-title">${card.title}</span>
      </div>
      <div class="reveal-item-right">
        <span class="reveal-item-date">${formatDate(card.date)}</span>
        <span class="reveal-item-check">${wasCorrect ? '✅' : '❌'}</span>
      </div>
    `;

    revealCardsList.appendChild(item);
  });

  btnOverlayContinue.textContent = state.lastResultSuccess
    ? '▶ MANCHE SUIVANTE'
    : '🔄 ÉQUIPE SUIVANTE';
}

/* ============================================================
   🔘 BOUTON PRINCIPAL DE L'OVERLAY
   ============================================================ */

btnOverlayContinue.addEventListener('click', () => {
  if (state.overlayPhase === 'result') {
    if (state._showRevealNext) {
      showRevealPhase();
    } else {
      overlayResult.style.display = 'none';
      state.overlayPhase = 'idle';
      retryManche();
    }
  } else if (state.overlayPhase === 'reveal') {
    overlayResult.style.display = 'none';
    state.overlayPhase = 'idle';

    if (state.lastResultSuccess) {
      advanceRound();
    } else {
      switchTeamWithTransition();
    }
  }
});

/* ============================================================
   🔄 AVANCE DE MANCHE / CHANGEMENT D'ÉQUIPE
   ============================================================ */

function advanceRound() {
  state.currentRoundIndex++;
  startManche(); // plus de limite de manches : le jeu est infini
}

function switchTeamWithTransition() {
  state.currentTeamIndex = (state.currentTeamIndex + 1) % teams.length;
  transitionTeamName.textContent  = currentTeam().name;
  overlayTransition.style.display = 'flex';
}

btnTransitionOk.addEventListener('click', () => {
  overlayTransition.style.display = 'none';
  startManche();
});

/* ============================================================
   🎨 MISE À JOUR DE L'INTERFACE
   ============================================================ */

function updateStatusBar() {
  activeTeamName.textContent = currentTeam().name;
  updateLivesDisplay(false);
  updateActiveTeamHighlight();
}

function updateHeaderScores() {
  nameTeam0.textContent   = teams[0].name;
  nameTeam1.textContent   = teams[1].name;
  pointsTeam0.textContent = `${teams[0].score} pt${teams[0].score > 1 ? 's' : ''}`;
  pointsTeam1.textContent = `${teams[1].score} pt${teams[1].score > 1 ? 's' : ''}`;
  updateActiveTeamHighlight();
}

function updateActiveTeamHighlight() {
  scoreTeam0.classList.toggle('is-active-team', state.currentTeamIndex === 0);
  scoreTeam1.classList.toggle('is-active-team', state.currentTeamIndex === 1);
}

function updateLivesDisplay(animate) {
  livesDisplay.innerHTML = '';
  for (let i = 0; i < MAX_LIVES; i++) {
    const heart   = document.createElement('span');
    const isLost  = i >= state.livesLeft;
    heart.textContent = isLost ? '🖤' : '❤️';
    heart.className   = 'life-icon';
    if (animate && i === state.livesLeft) heart.classList.add('life-lost');
    livesDisplay.appendChild(heart);
  }
}

function animateLostLife() {
  updateLivesDisplay(true);
}

/* ============================================================
   🏁 FIN DE PARTIE (accessible uniquement via admin)
   ============================================================ */

function showEndScreen() {
  showScreen('end');

  endScores.innerHTML = teams.map(t => `
    <div class="end-score-item">
      <div class="end-score-name">${t.name}</div>
      <div class="end-score-pts">${t.score}</div>
    </div>
  `).join('');

  const maxScore = Math.max(...teams.map(t => t.score));
  const winners  = teams.filter(t => t.score === maxScore);

  endWinner.textContent = winners.length === 1
    ? `🏆 ${winners[0].name} remporte la partie !`
    : '🤝 Égalité parfaite !';
}

$('btn-restart').addEventListener('click', initGame);

/* ============================================================
   🎯 UTILITAIRES
   ============================================================ */

function currentTeam() {
  return teams[state.currentTeamIndex];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================================
   🎉 CONFETTI
   ============================================================ */

function triggerConfetti() {
  const colors = ['#f0c040', '#00c8ff', '#ff3cac', '#39ff14', '#ffffff'];
  for (let i = 0; i < 80; i++) {
    const p     = document.createElement('div');
    const size  = Math.random() * 10 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      position: fixed;
      top: -20px;
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation: confettiFall ${Math.random() * 1.5 + 1.5}s ${Math.random() * 0.6}s ease-in forwards;
      z-index: 9999;
      pointer-events: none;
    `;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 3000);
  }

  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id    = 'confetti-style';
    style.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(0) rotate(0deg);       opacity: 1; }
        100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ============================================================
   🌟 PARTICULES ÉCRAN INTRO
   ============================================================ */

(function spawnIntroParticles() {
  const container = $('intro-particles');
  if (!container) return;
  const colors = ['#f0c040', '#00c8ff', '#ff3cac', '#ffffff'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      width:  ${Math.random() * 8 + 3}px;
      height: ${Math.random() * 8 + 3}px;
      left:   ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:  ${Math.random() * 12 + 8}s;
      animation-delay:    -${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
})();

/* ============================================================
   ⚙️ PANNEAU ADMIN
   ============================================================ */

adminToggleBtn.addEventListener('click', () => {
  adminPanel.classList.toggle('open');
});

adminNextRound.addEventListener('click', () => {
  overlayResult.style.display     = 'none';
  overlayTransition.style.display = 'none';
  advanceRound();
});

adminResetLives.addEventListener('click', () => {
  state.livesLeft      = MAX_LIVES;
  state.manchePerdue   = false;
  btnValidate.disabled = false;
  updateStatusBar();
});

adminResetScores.addEventListener('click', () => {
  teams.forEach(t => t.score = 0);
  updateHeaderScores();
});

adminChangeTeam.addEventListener('click', () => {
  overlayResult.style.display     = 'none';
  overlayTransition.style.display = 'none';
  state.currentTeamIndex = (state.currentTeamIndex + 1) % teams.length;
  startManche();
});

adminToggleAnim.addEventListener('change', () => {
  state.animationsEnabled = adminToggleAnim.checked;
});

/* ============================================================
   🎬 KEYFRAMES DYNAMIQUES
   ============================================================ */

(function injectGameStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shakeScreen {
      0%, 100% { transform: translateX(0); }
      15%       { transform: translateX(-8px); }
      30%       { transform: translateX(8px); }
      45%       { transform: translateX(-6px); }
      60%       { transform: translateX(6px); }
      75%       { transform: translateX(-3px); }
      90%       { transform: translateX(3px); }
    }
    .shake-screen { animation: shakeScreen 0.6s ease !important; }

    @keyframes revealItemIn {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .reveal-item { animation: revealItemIn 0.35s ease both; }
  `;
  document.head.appendChild(style);
})();
