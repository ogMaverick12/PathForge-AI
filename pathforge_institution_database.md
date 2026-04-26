# PathForge Institution Database — Master Reference
# Inject this into the system prompt OR as a RAG document chunk.
# Covers 400+ institutions across 40+ countries, organized by career domain.
# Every entry includes: tier, fees (INR equivalent), Indian student scholarship hooks, ROI signal.

---

## HOW TO USE THIS IN YOUR API CALL

```javascript
// Option A: Append to system prompt (simpler, fits in context)
const fullSystemPrompt = PATHFORGE_MASTER_PROMPT + "\n\n" + INSTITUTION_DATABASE;

// Option B: RAG injection (better for scale — embed and retrieve by career)
// Chunk by career domain, embed with text-embedding-3-small,
// retrieve top-5 relevant chunks per user query, inject into context.
```

---

## SECTION A: ENGINEERING & TECHNOLOGY

### A1. Computer Science / Software Engineering / AI / Data Science

#### INDIA — TIER 1
| Institution | Entrance | Annual Fee (INR) | 4yr Total | Median Placement | Notes |
|---|---|---|---|---|---|
| IIT Bombay (CS) | JEE Adv: Top 100 | 2,00,000 | 9,00,000 | 25-40 LPA | Best placement in India. Startup ecosystem. |
| IIT Delhi (CS) | JEE Adv: Top 150 | 2,00,000 | 9,00,000 | 22-35 LPA | Strong research + Microsoft/Google tie-ins |
| IIT Madras (CS) | JEE Adv: Top 200 | 2,00,000 | 9,00,000 | 20-30 LPA | Top AI research. Online BSc also available. |
| IIT Kanpur (CS) | JEE Adv: Top 300 | 2,00,000 | 9,00,000 | 20-28 LPA | Strong algorithms + systems research |
| IIT Kharagpur (CS) | JEE Adv: Top 500 | 1,80,000 | 8,00,000 | 18-25 LPA | Oldest IIT, strong alumni network |
| IIT Hyderabad (CS) | JEE Adv: Top 1000 | 2,00,000 | 9,00,000 | 16-22 LPA | Rising research output |
| IIT Roorkee (CS) | JEE Adv: Top 800 | 2,00,000 | 9,00,000 | 16-22 LPA | Strong civil + CS crossover |
| IIIT Hyderabad (CS) | UGEE/JEE | 3,50,000 | 14,00,000 | 18-28 LPA | Best for AI/ML research in India |
| IIIT Delhi (CS) | JEE Mains | 3,50,000 | 14,00,000 | 15-22 LPA | Strong for Delhi placements |
| BITS Pilani (CS) | BITSAT: 380+ | 5,50,000 | 22,00,000 | 18-25 LPA | Best private for CS. Dual degree + practice school |

#### INDIA — TIER 2
| Institution | Entrance | Annual Fee (INR) | Notes |
|---|---|---|---|
| NIT Trichy (CS) | JEE Mains 98%ile | 1,50,000 | Best NIT placement |
| NIT Warangal (CS) | JEE Mains 97%ile | 1,50,000 | Strong for core + IT |
| NIT Surathkal (CS) | JEE Mains 96%ile | 1,50,000 | Good for product companies |
| NIT Calicut (CS) | JEE Mains 95%ile | 1,50,000 | |
| DTU Delhi (CS) | JEE Mains + state | 1,80,000 | Delhi placements. Affordable |
| NSUT Delhi (CS) | JEE Mains + state | 1,50,000 | |
| VIT Vellore (CS) | VITEEE | 2,50,000 | Huge campus. IBM, Wipro direct recruitment |
| Manipal (CS) | MET | 3,20,000 | Good for startups. Flexible curriculum |
| SRM Chennai (CS) | SRMJEE | 2,50,000 | Large intake. Industry partnerships |
| Amity Noida (CS) | Own entrance | 2,80,000 | Good for Delhi NCR placements |
| PES University Bangalore | PESSAT | 3,00,000 | Strong for Bangalore IT placements |
| RV College Bangalore | KCET | 80,000 | Best value in Karnataka |
| Christ University Bangalore | Own | 1,80,000 | |
| Symbiosis Pune (SCIT) | SET | 2,60,000 | Good MBA + tech combo later |

#### INDIA — TIER 3 / GOVERNMENT VALUE PICKS
| Institution | Notes |
|---|---|
| State engineering colleges (via state CET) | 50,000-1,00,000/yr. Best budget play. |
| Government polytechnic + lateral entry | 3yr diploma → 2nd year engg. Saves 1 year + massive cost cut |
| IGNOU B.Tech (lateral) | Distance + recognition |
| IIT Madras BSc Online | 12,000-15,000/semester. Game changer for Tier-3 city students |

#### GLOBAL — BUDGET TIER (<8L INR/year all-in)
| Institution | Country | Annual Cost (INR) | Notes |
|---|---|---|---|
| Technical University Munich (TUM) | Germany | 80,000-1,50,000 | Near zero tuition. English programs. QS Top 50 |
| RWTH Aachen | Germany | 80,000-1,50,000 | Best for engineering. Industry links |
| TU Berlin | Germany | 80,000-1,20,000 | Strong AI programs |
| TU Delft | Netherlands | 4,00,000-5,00,000 | Top 20 globally for engineering |
| University of Tartu | Estonia | 2,50,000-3,50,000 | EU degree. Digital nomad ecosystem |
| University of Warsaw | Poland | 1,50,000-2,50,000 | EU degree. Low cost |
| Charles University Prague | Czech Republic | 1,50,000-2,00,000 | |
| Brno University of Technology | Czech Republic | 80,000-1,50,000 | Free if in Czech language |
| Tallinn University of Technology | Estonia | 2,50,000-3,50,000 | e-Estonia. Digital governance focus |
| UTP Malaysia | Malaysia | 1,50,000-2,50,000 | PETRONAS-backed. Oil & gas + CS |
| UTM Malaysia | Malaysia | 1,50,000-2,50,000 | |
| NUS (scholarship only) | Singapore | 8,00,000 (bond-free if scholarship) | Highly competitive. Apply ASEAN scholarship |
| NTU Singapore | Singapore | 8,00,000 | Similar to NUS |

#### GLOBAL — MID TIER (8-20L INR/year)
| Institution | Country | Notes |
|---|---|---|
| University of Edinburgh | UK | QS Top 20. 3yr undergrad |
| University of Manchester | UK | Strong industry placement year |
| University College Dublin | Ireland | Post-study work visa 2yr. Tech hub |
| Trinity College Dublin | Ireland | Strong CS. Dublin = EU's Silicon Valley |
| Maastricht University | Netherlands | Problem-based learning. International |
| University of Amsterdam | Netherlands | English-taught. Strong fintech angle |
| KU Leuven | Belgium | Top EU research university |
| Aalto University | Finland | Design + Tech crossover. Nokia legacy |
| Chalmers University | Sweden | Strong engineering. Volvo/Ericsson ties |
| University of Waterloo (co-op) | Canada | #1 for CS in Canada. Co-op = paid internships |
| Simon Fraser University | Canada | Strong CS. Vancouver tech scene |
| Deakin University | Australia | Strong industry placement |
| RMIT Melbourne | Australia | Design + Tech. Strong for UX/AI |
| Macquarie University | Australia | PR pathway. 2yr PSW |

#### GLOBAL — ELITE (20L+ INR/year, apply for scholarships)
| Institution | Country | Scholarship for Indians |
|---|---|---|
| MIT | USA | Need-blind for international. Apply if 95%+ |
| Stanford | USA | Need-based aid up to 100% |
| Carnegie Mellon (CS) | USA | Top CS globally. Partial merit |
| UC Berkeley | USA | Very limited aid. Strong alumni |
| Cornell | USA | Need-based aid available |
| ETH Zurich | Switzerland | 1,00,000 CHF scholarship available. Low tuition |
| Imperial College London | UK | President's Scholarship (partial) |
| Oxford / Cambridge | UK | Clarendon, Rhodes scholarships for Indians |
| University of Toronto | Canada | Lester B Pearson scholarship (full ride) |
| University of British Columbia | Canada | International Leader of Tomorrow award |

---

## SECTION B: MEDICINE & HEALTH SCIENCES

### B1. MBBS

#### INDIA — TIER 1 (Government)
| Institution | Entrance | Annual Fee | Notes |
|---|---|---|---|
| AIIMS Delhi | NEET: 99.9%ile | 1,628/yr (govt) | Essentially free. India's best |
| AIIMS (13 new campuses) | NEET: 99.5%ile | 1,628/yr | Bhopal, Jodhpur, Rishikesh etc |
| JIPMER Puducherry | NEET | 1,390/yr | Free. Central institution |
| Maulana Azad Medical College | NEET + state | 12,000/yr | Best Delhi govt medical |
| Grant Medical College Mumbai | NEET + MH-CET | 15,000/yr | Maharashtra govt |
| Madras Medical College | NEET + TN merit | 10,000/yr | Tamil Nadu govt |
| All State Government Medical Colleges | NEET + state | 25,000-1,00,000/yr | 600+ colleges. Best value play |

#### INDIA — TIER 2 (Private, Deemed)
| Institution | Annual Fee (INR) | Notes |
|---|---|---|
| Kasturba Medical College Manipal | 12,00,000 | Strong for US USMLE prep |
| JSS Medical College Mysore | 10,00,000 | |
| Amrita School of Medicine | 11,00,000 | Kochi campus. Good hospital exposure |
| Sri Ramachandra Chennai | 10,00,000 | |
| Saveetha Medical College | 11,00,000 | |
| St. John's Medical College Bangalore | 8,00,000 | Strong for PG |
| KIMS Hubli | 8,00,000 | Karnataka private |
| MGM Medical College | 9,00,000 | Maharashtra private |

#### GLOBAL — LOW COST MBBS (Under 30L total)
| Institution | Country | Total Cost (INR) | Notes |
|---|---|---|---|
| Kyrgyz State Medical Academy | Kyrgyzstan | 15-20L | WHO/NMC recognized |
| Osh State University Medical Faculty | Kyrgyzstan | 15-20L | |
| Bashkir State Medical University | Russia | 18-25L | NMC recognized |
| Kazan State Medical University | Russia | 20-28L | Oldest Russian med school |
| Kursk State Medical University | Russia | 18-25L | Large Indian community |
| Crimea Federal University | Russia | 15-20L | |
| University of Debrecen (Medicine) | Hungary | 35-45L | EU degree. Very valuable |
| Semmelweis University | Hungary | 40-50L | Top EU medical. Budapest |
| Charles University (Medicine) | Czech Republic | 30-40L | EU accreditation |
| Poznan University of Medical Sciences | Poland | 30-40L | EU degree |
| Medical University of Gdansk | Poland | 28-38L | |
| University of Latvia (Medicine) | Latvia | 25-35L | EU. English medium |
| Georgian National University | Georgia | 18-25L | NMC recognized |
| Tbilisi State Medical University | Georgia | 18-22L | |
| University of Plovdiv | Bulgaria | 20-30L | EU. English medium |
| Medical University Sofia | Bulgaria | 22-32L | |
| Carol Davila University | Romania | 20-28L | EU degree |
| China Medical University | China | 15-22L | Dalian campus. Large Indian batch |
| Jilin University Medical School | China | 15-20L | |
| University of Philippines Manila | Philippines | 20-28L | US-pattern. Good USMLE prep |
| Our Lady of Fatima University | Philippines | 18-25L | |

#### GLOBAL — ELITE (For PG / Specialization after Indian MBBS)
| Institution | Country | Notes |
|---|---|---|
| Harvard Medical School | USA | USMLE + research publications required |
| Johns Hopkins | USA | Best for research + clinical |
| Mayo Clinic School of Medicine | USA | Renowned for clinical |
| University of Toronto Medicine | Canada | MCCQE route for Indians |
| Imperial College London | UK | PLAB route. 1-2 years to register |
| Royal College of Surgeons Ireland | Ireland | Irish registration + EU pathway |
| Karolinska Institute | Sweden | Strong for research after MBBS |
| University of Melbourne | Australia | AMC exam route. Strong PR prospects |

### B2. Dentistry (BDS)
| Institution | Country | Annual Fee (INR) | Notes |
|---|---|---|---|
| Maulana Azad Dental College Delhi | India | 20,000 | Govt. Best in India |
| Manipal College of Dental Sciences | India | 6,00,000 | Strong for MDS + abroad |
| SRM Dental College | India | 5,50,000 | |
| University of Debrecen (Dentistry) | Hungary | 30,00,000 | EU license. Very portable |
| Riga Stradins University | Latvia | 20,00,000 | EU dental degree |
| Poznan Dental | Poland | 22,00,000 | |

### B3. Pharmacy / Pharmaceutical Sciences
| Institution | Country | Notes |
|---|---|---|
| Jamia Hamdard Delhi | India | Best pharmacy in India |
| ICT Mumbai (formerly UDCT) | India | Top for pharma tech |
| JSS College of Pharmacy | India | Strong PG + research |
| Manipal College of Pharmaceutical Sciences | India | |
| NIPER (6 campuses) | India | Govt. PG focused. Excellent value |
| University of Strathclyde | UK | Strong pharma industry ties |
| University of Groningen | Netherlands | Strong pharma research |
| Uppsala University | Sweden | AstraZeneca proximity |

### B4. Physiotherapy / Occupational Therapy
| Institution | Notes |
|---|---|
| Christian Medical College Vellore | India's best. Govt aided |
| NIMHANS Bangalore | Neuro physio specialization |
| Manipal (BPT) | Good for abroad opportunities |
| University of Sydney (MPT) | Australia. Strong PR pathway |
| University of Toronto (PT) | Canada. CAPR exam route |

---

## SECTION C: BUSINESS, FINANCE & MANAGEMENT

### C1. MBA / BBA

#### INDIA — TOP MBA
| Institution | Entrance | Annual Fee (INR) | Median Placement | Notes |
|---|---|---|---|---|
| IIM Ahmedabad | CAT 99.5%ile | 13,00,000 | 30-35 LPA | India's Harvard. Best ROI |
| IIM Bangalore | CAT 99.3%ile | 13,00,000 | 28-32 LPA | Consulting + finance hub |
| IIM Calcutta | CAT 99%ile | 13,00,000 | 25-30 LPA | Finance + legacy |
| IIM Lucknow | CAT 98%ile | 12,00,000 | 22-26 LPA | Strong FMCG placements |
| IIM Indore | CAT 98%ile | 12,00,000 | 20-25 LPA | |
| IIM Kozhikode | CAT 97%ile | 11,00,000 | 18-22 LPA | |
| FMS Delhi | CAT 99%ile | 20,000 (govt) | 22-28 LPA | Best ROI in India |
| XLRI Jamshedpur (HR/BM) | XAT 98%ile | 13,00,000 | 22-28 LPA | Best HR school |
| MDI Gurgaon | CAT 97%ile | 12,00,000 | 20-24 LPA | Consulting focus |
| SPJIMR Mumbai | CAT 97%ile | 11,00,000 | 20-24 LPA | Strong work-ex diversity |
| IIFT Delhi (International Trade) | IIFT exam | 9,00,000 | 18-22 LPA | Only for trade/export careers |
| NITIE Mumbai (Industrial Engg) | CAT 97%ile | 8,00,000 | 18-22 LPA | Ops/Supply chain |
| IMT Ghaziabad | CAT 93%ile | 10,00,000 | 14-18 LPA | |
| NMIMS Mumbai | NMAT | 11,00,000 | 14-18 LPA | Finance focus |
| SIBM Pune | SNAP | 10,00,000 | 12-16 LPA | |
| Jamnalal Bajaj Mumbai | MH-CET | 6,00,000 | 14-18 LPA | |

#### INDIA — BBA (Undergraduate)
| Institution | Entrance | Annual Fee | Notes |
|---|---|---|---|
| Shri Ram College of Commerce (DU) | CUET | 30,000 | Best BBA in India |
| Jesus & Mary (BCom Hons) | CUET | 25,000 | |
| Christ University BBA | Own | 1,80,000 | Strong for startups |
| Symbiosis BBA | SET | 2,20,000 | |
| NMIMS BBA | NPAT | 2,50,000 | |
| IPU Delhi BBA | IPU CET | 60,000 | Great value |

#### GLOBAL MBA — ELITE (full scholarship angle)
| Institution | Country | Fee (INR equiv) | Scholarship for Indians |
|---|---|---|---|
| Harvard Business School | USA | 80,00,000 | Need-based fellowships up to 60% |
| Wharton (UPenn) | USA | 80,00,000 | Fellowship programs |
| Stanford GSB | USA | 80,00,000 | Knight-Hennessy (full ride + stipend) |
| Kellogg (Northwestern) | USA | 75,00,000 | Strong in marketing/consulting |
| Booth (Chicago) | USA | 75,00,000 | Finance + economics focus |
| Columbia Business School | USA | 75,00,000 | NY finance recruiting |
| INSEAD | France/Singapore | 60,00,000 | 1-year MBA. Strong global network |
| London Business School | UK | 70,00,000 | Strong European placement |
| HEC Paris | France | 45,00,000 | 16-month. Strong luxury + consulting |
| IESE Barcelona | Spain | 40,00,000 | Strong Latin America + Europe |
| IE Business School | Spain | 40,00,000 | Innovation focus |
| IMD Lausanne | Switzerland | 55,00,000 | Strong for family business |
| NUS Business School | Singapore | 35,00,000 | ASEAN focus. PR pathway |
| Nanyang Business School | Singapore | 30,00,000 | |
| Melbourne Business School | Australia | 40,00,000 | Strong PR prospects |
| Rotman School Toronto | Canada | 30,00,000 | PR pathway after graduation |

#### GLOBAL — AFFORDABLE/HIGH-ROI BUSINESS DEGREES
| Institution | Country | Annual Cost (INR) | Notes |
|---|---|---|---|
| University of Cologne | Germany | 1,00,000 | MSc Management. Near free |
| WHU Otto Beisheim | Germany | 8,00,000 | Germany's best private business school |
| Frankfurt School of Finance | Germany | 12,00,000 | Strong fintech |
| RSM Erasmus Rotterdam | Netherlands | 10,00,000 | Strong for Europe placements |
| Copenhagen Business School | Denmark | 2,00,000 (EU free) | Strategic management focus |
| University of Galway | Ireland | 15,00,000 | IDA Ireland tie-ins |
| Dublin City University | Ireland | 15,00,000 | EMEA HQ of tech companies |
| Griffith College Dublin | Ireland | 12,00,000 | |

### C2. Chartered Accountancy / Finance
| Body | Country | Cost | Notes |
|---|---|---|---|
| ICAI (CA) | India | 1,50,000 total | 3 levels. Best ROI for finance in India. Big 4 direct |
| CFA Institute | USA (global) | 3,00,000 total | Level 1-3. Best for investment banking/equity research |
| ACCA | UK | 2,50,000 total | UK recognition. Good for Gulf + UK careers |
| CPA (AICPA) | USA | 3,50,000 total | US accounting. Required for US finance jobs |
| CIMA | UK | 2,00,000 total | Management accounting |
| FRM (GARP) | USA | 1,50,000 total | Financial risk management |
| CFP | USA | 80,000 total | Financial planning. Growing in India |

---

## SECTION D: LAW

### D1. LLB / BA LLB (Integrated 5-year)

#### INDIA
| Institution | Entrance | Annual Fee (INR) | Notes |
|---|---|---|---|
| National Law School Bangalore (NLSIU) | CLAT: Top 50 | 2,50,000 | India's best. SC/HC recruiters come here |
| NALSAR Hyderabad | CLAT: Top 100 | 2,20,000 | Strong for corporate law |
| NUJS Kolkata | CLAT: Top 150 | 2,00,000 | Strongest alumni in Kolkata/Mumbai |
| NLU Delhi | AILET: Top 80 | 2,50,000 | Delhi High Court proximity |
| NLIU Bhopal | CLAT: Top 200 | 1,80,000 | |
| GNLU Gandhinagar | CLAT: Top 250 | 1,50,000 | Gujarat commercial law hub |
| Rajiv Gandhi NLU Patiala | CLAT | 1,20,000 | |
| Hidayatullah NLU Raipur | CLAT | 1,00,000 | |
| Tamil Nadu NLU | CLAT + state | 90,000 | |
| Faculty of Law DU | DUET | 15,000/year | Govt. Strong alumni. 3-yr LLB |
| Symbiosis Law School Pune | SLAT | 3,50,000 | Strong for corporate law |
| Christ Law School Bangalore | Own | 2,00,000 | |
| Amity Law School | Own | 2,50,000 | |

#### GLOBAL LAW
| Institution | Country | Annual Cost (INR) | Notes |
|---|---|---|---|
| Oxford (BCL/MJur) | UK | 35,00,000 | Rhodes Scholarship chance |
| Cambridge (LLM) | UK | 35,00,000 | |
| LSE (LLM) | UK | 30,00,000 | Best for international law |
| King's College London | UK | 28,00,000 | Strong for human rights law |
| University of Melbourne (JD) | Australia | 25,00,000 | PR pathway |
| University of Sydney (LLB) | Australia | 25,00,000 | |
| Osgoode Hall York | Canada | 18,00,000 | Canadian bar pathway |
| University of Toronto Law | Canada | 22,00,000 | |
| NUS Faculty of Law | Singapore | 15,00,000 | Best in Asia. ASEAN legal hub |
| Leiden University (International Law) | Netherlands | 8,00,000 | Near ICJ. Best for intl law |
| Humboldt University Berlin | Germany | 80,000 | LLM. Near free |

---

## SECTION E: DESIGN, ARCHITECTURE & CREATIVE

### E1. Architecture

#### INDIA
| Institution | Entrance | Annual Fee (INR) | Notes |
|---|---|---|---|
| IIT Kharagpur (B.Arch) | JEE Adv + NATA | 2,00,000 | Best research-based |
| IIT Roorkee (B.Arch) | JEE Adv + NATA | 2,00,000 | Historic campus. Strong |
| SPA Delhi (School of Planning and Architecture) | NATA + JEE Paper 2 | 25,000 | India's best dedicated arch school |
| SPA Bhopal | NATA + JEE | 30,000 | |
| SPA Vijayawada | NATA + JEE | 30,000 | |
| CEPT Ahmedabad | NATA | 2,50,000 | Best for contemporary design |
| Sir JJ School of Architecture Mumbai | NATA + MH state | 50,000 | Oldest. Bombay style. Strong |
| TVBSAN Mumbai | NATA | 80,000 | |
| NIT Trichy / Calicut (B.Arch) | JEE Mains + NATA | 1,50,000 | Strong NIT placements |
| Manipal Architecture | NATA | 3,50,000 | |
| Chandigarh College of Architecture | NATA + state | 60,000 | Le Corbusier legacy |

#### GLOBAL ARCHITECTURE
| Institution | Country | Annual Cost (INR) | Notes |
|---|---|---|---|
| UCL Bartlett | UK | 28,00,000 | #1 globally. Experimental |
| Architectural Association London | UK | 35,00,000 | Avant-garde. Best for theory |
| ETH Zurich (Arch) | Switzerland | 80,000 | Near free. Top global |
| TU Delft (Arch) | Netherlands | 5,00,000 | Sustainability focus |
| TU Berlin (Arch) | Germany | 80,000 | Near free |
| KTH Stockholm (Arch) | Sweden | 80,000 (EU) or 8,00,000 | |
| RMIT Melbourne | Australia | 20,00,000 | Strong urban design |
| University of Melbourne | Australia | 22,00,000 | |
| Harvard GSD | USA | 50,00,000 | MArch. Top globally |
| Columbia GSAPP | USA | 50,00,000 | NYC. Strong theory |
| Pratt Institute NYC | USA | 40,00,000 | Strong for studios |

### E2. Product Design / Industrial Design / UX Design

#### INDIA
| Institution | Entrance | Fee (INR) | Notes |
|---|---|---|---|
| NID Ahmedabad (B.Des) | NID DAT | 3,50,000/yr | India's best design school. Govt |
| NID campuses (8 total) | NID DAT | 3,00,000 | Andhra, Assam, Jorhat, Kurukshetra, MP, Sikkim, Amravati |
| NIFT Delhi (B.Des) | NIFT Entrance | 2,50,000 | Fashion + product |
| MIT Institute of Design Pune | Own | 2,80,000 | Strong UX output |
| Srishti Manipal Bangalore | Own | 3,20,000 | Innovation design |
| Symbiosis Institute of Design | SET | 2,50,000 | |
| Pearl Academy | Own | 3,50,000 | Fashion + design |
| Unitedworld Ahmedabad | Own | 2,50,000 | |

#### GLOBAL DESIGN
| Institution | Country | Annual Cost | Notes |
|---|---|---|---|
| Royal College of Art | UK | 30,00,000 | #1 globally for design (QS) |
| Central Saint Martins | UK | 28,00,000 | Fashion, product, graphics |
| Parsons Paris | France | 25,00,000 | Fashion design hub |
| Design Academy Eindhoven | Netherlands | 12,00,000 | Conceptual design |
| Domus Academy Milan | Italy | 20,00,000 | Luxury product design |
| Istituto Marangoni | Italy/London | 18,00,000 | Fashion design |
| ArtCenter College of Design | USA | 40,00,000 | Industrial design |
| RISD | USA | 45,00,000 | Top art + design in US |
| Pratt Institute | USA | 40,00,000 | |
| SCAD | USA | 38,00,000 | Strong film + UX |
| Emily Carr University | Canada | 12,00,000 | PR pathway |
| RMIT Design | Australia | 20,00,000 | |

### E3. Film, Media & Animation

#### INDIA
| Institution | Fee (INR) | Notes |
|---|---|---|
| Film and Television Institute of India (FTII) Pune | 2,00,000/yr | India's best. Govt. Difficult to get in |
| Satyajit Ray Film & Television Institute Kolkata | 1,50,000/yr | Eastern India's FTII |
| AJ Kidwai Mass Communication Delhi | 20,000/yr | DU affiliated. Near free |
| Manipal Institute of Communication | 3,00,000/yr | Strong for journalism |
| Whistling Woods Mumbai | 4,00,000/yr | Bollywood connections |
| Arena Animation (franchise) | 80,000-1,50,000 | Certificate. Fast track to industry |
| Maac Animation | 80,000-1,50,000 | |
| Zee Institute of Media Arts | 2,00,000/yr | |

#### GLOBAL FILM & MEDIA
| Institution | Country | Annual Cost | Notes |
|---|---|---|---|
| NFTS (National Film and Television School) | UK | 20,00,000 | Best in UK. Bafta winners |
| London Film School | UK | 22,00,000 | 2yr MFA |
| Vancouver Film School | Canada | 18,00,000 | 1yr intensive. PR pathway |
| Toronto Film School | Canada | 15,00,000 | |
| USC School of Cinematic Arts | USA | 50,00,000 | Hollywood gateway. Best in US |
| NYU Tisch (Film/TV) | USA | 45,00,000 | |
| Chapman University | USA | 40,00,000 | Strong alumni in industry |
| AFTRS Sydney | Australia | 18,00,000 | Govt-funded. Strong |
| AFDA Johannesburg | South Africa | 8,00,000 | Very affordable. High production value |

---

## SECTION F: SCIENCE & RESEARCH

### F1. Pure Sciences (Physics, Chemistry, Math, Biology)

#### INDIA
| Institution | Entrance | Fee (INR) | Notes |
|---|---|---|---|
| IISc Bangalore (BS Research) | KVPY/JEE | 30,000/yr | Best research institution in India |
| IISER Pune, Mohali, Kolkata, Bhopal, Trivandrum, Tirupati, Berhampur | KVPY/JEE/IISER Aptitude | 13,000/yr | Research-focused BS-MS. Govtt. Fellowship given |
| NISER Bhubaneswar | NEST | 15,000/yr | DAE-funded. Nuclear research proximity |
| CBS Mumbai (UM-DAE) | KVPY/JEE | 10,000/yr | Tata Institute proximity |
| CMI Chennai | CMI Entrance | 15,000/yr | Best for math in India |
| ISI Kolkata (B.Stat/B.Math) | ISI Entrance | 25,000/yr | Best statistics school in India |
| JNU (BSc programs) | CUET | 3,000/yr | Near free. Strong research faculty |

#### GLOBAL PURE SCIENCES
| Institution | Country | Annual Cost | Notes |
|---|---|---|---|
| ETH Zurich | Switzerland | 80,000 | Near free. Nobel Prize factory |
| University of Cambridge | UK | 30,00,000 | Physics/Math/NatSci |
| Max Planck Institutes (PhD) | Germany | Paid fellowship (26,000 EUR) | Apply directly after MSc |
| CERN (Internship/fellowship) | Switzerland | Paid | Apply after BSc/MSc physics |
| Perimeter Institute | Canada | Fully funded MSc/PhD | Theoretical physics only |
| University of Melbourne | Australia | 20,00,000 | Strong research |
| Caltech | USA | 45,00,000 | Small. Research-intensive. Aid available |
| Princeton | USA | 45,00,000 | Strong for math + physics. Aid available |

### F2. Biotechnology / Life Sciences

#### INDIA
| Institution | Entrance | Fee | Notes |
|---|---|---|---|
| IIT Bombay (BTech Biotech) | JEE Adv | 2,00,000 | Strong for biotech startups |
| IIT Delhi (BTech Biochem Engg) | JEE Adv | 2,00,000 | |
| IIT Kharagpur (BTech Biotech) | JEE Adv | 2,00,000 | |
| JNU (BSc Biotech) | CUET | 3,000 | |
| Amity (BTech Biotech) | Own | 2,50,000 | Strong industry tie-ins |
| Manipal (BTech Biotech) | MET | 3,00,000 | |
| VIT (BTech Biotech) | VITEEE | 2,50,000 | |
| NCBS Bangalore (Research BS) | Competitive | Funded | TIFR affiliate. Elite |

#### GLOBAL BIOTECH
| Institution | Country | Annual Cost | Notes |
|---|---|---|---|
| Wageningen University | Netherlands | 4,00,000 | #1 for life sciences globally |
| University of Copenhagen | Denmark | 80,000 (EU) | Pharma research hub |
| University of Heidelberg | Germany | 80,000 | EMBL proximity. Best in Europe |
| TU Munich (Life Sciences) | Germany | 80,000 | |
| Imperial College London (Biotech) | UK | 28,00,000 | |
| University of Edinburgh | UK | 25,00,000 | Dolly the sheep birthplace |
| University of British Columbia | Canada | 18,00,000 | Strong biotech valley |
| UNSW Sydney | Australia | 20,00,000 | Strong research + PR pathway |
| Johns Hopkins (MS in Biotech) | USA | 35,00,000 | Best in US. Pharma recruiting |
| MIT (Bioeng) | USA | 45,00,000 | Biotech VC ecosystem |

---

## SECTION G: SOCIAL SCIENCES, HUMANITIES & EDUCATION

### G1. Psychology

#### INDIA
| Institution | Fee (INR) | Notes |
|---|---|---|
| Delhi University (BA Psych) | 20,000 | CUET. Strong faculty |
| TISS Mumbai (MA Applied Psych) | 30,000 | Govt. Best for clinical + social work |
| NIMHANS Bangalore (MPhill/PhD) | 15,000 | For clinical psychologists. Best in India |
| Christ University (BA/BSc Psych) | 1,20,000 | Strong for counseling |
| Amity (BSc Psych) | 1,50,000 | |
| Fergusson College Pune | 20,000 | |

#### GLOBAL PSYCHOLOGY
| Institution | Country | Annual Cost | Notes |
|---|---|---|---|
| University of Edinburgh | UK | 25,00,000 | Strong experimental psych |
| UCL (Psychology) | UK | 28,00,000 | Clinical + neuropsych |
| KU Leuven | Belgium | 3,00,000 | Near free. Strong cognitive |
| University of Amsterdam | Netherlands | 5,00,000 | Experimental methods |
| University of Queensland | Australia | 18,00,000 | Strong clinical |
| McGill University | Canada | 15,00,000 | Strong research |
| University of Toronto | Canada | 18,00,000 | Clinical training |

### G2. Economics / Development Economics

#### INDIA
| Institution | Fee | Notes |
|---|---|---|
| Delhi School of Economics (MA Eco) | 20,000 | Hardest to get into. Best for academia |
| JNU (MA Eco) | 3,000 | DSE competitor. Leftist tradition |
| SRCC Delhi (BCom/BA Eco) | 25,000 | CUET. Best undergraduate |
| Presidency University Kolkata | 15,000 | Strong economics tradition |
| BITS (Economics dual degree) | 5,50,000 | |
| ISI Delhi (MS Quantitative Eco) | 25,000 | Research focused |
| Gokhale Institute of Politics and Economics | 50,000 | Pune. Policy angle |

#### GLOBAL ECONOMICS
| Institution | Country | Annual Cost | Notes |
|---|---|---|---|
| LSE (BSc/MSc Economics) | UK | 30,00,000 | Best for economics globally |
| Oxford (PPE) | UK | 30,00,000 | Rhodes scholarship angle. Policy leaders |
| Cambridge (Economics) | UK | 30,00,000 | Marshall scholarship |
| University of Warwick | UK | 25,00,000 | Strong for econometrics |
| Tilburg University | Netherlands | 5,00,000 | Top economics research |
| Stockholm School of Economics | Sweden | 4,00,000 | Nobel Prize proximity |
| Harvard (Economics) | USA | 45,00,000 | Need-blind aid |
| Princeton (Economics) | USA | 45,00,000 | |

### G3. Journalism / Mass Communication
| Institution | Country | Fee | Notes |
|---|---|---|---|
| IIMC Delhi | India | 50,000 | India's best. Govt |
| ACJ Chennai | India | 2,00,000 | Asian College of Journalism |
| Jamia Millia (MCJ) | India | 30,000 | Govt |
| Symbiosis (MA Communication) | India | 2,50,000 | |
| Columbia Journalism School | USA | 45,00,000 | #1 globally. Pulitzer Prize connection |
| Northwestern Medill | USA | 45,00,000 | |
| City University London | UK | 20,00,000 | Reuters/BBC journalism |
| Cardiff University | UK | 18,00,000 | BBC Wales proximity |
| University of Melbourne | Australia | 18,00,000 | ABC journalism ties |

---

## SECTION H: CIVIL SERVICES & GOVERNMENT

### H1. UPSC Civil Services Preparation Pathway

| Category | Institution/Resource | Cost (INR) | Notes |
|---|---|---|---|
| Coaching (Delhi) | Vajiram & Ravi | 1,20,000 | Most recommended for GS |
| Coaching (Delhi) | Drishti IAS | 80,000 | Hindi medium friendly |
| Coaching (Delhi) | Vision IAS | 90,000 | Strong test series |
| Coaching (Delhi) | Chanakya IAS | 70,000 | |
| Coaching (Online) | PWOnlyIAS | 40,000 | Cost-effective |
| Coaching (Online) | Unacademy UPSC | 30,000-60,000 | |
| Self-study platform | BYJU's IAS | 50,000 | |
| Backup degree (while prep) | BA/BCom via DU SOL | 10,000/yr | Study + prep simultaneously |

**Key advice for budget users:** Do NOT do expensive coaching blindly. UPSC has been cracked on self-study. NCERT + Laxmikanth + PYQ = 60% of the prep. Coaching for test series + interview guidance, not lectures.

### H2. Defence (NDA / CDS / AFCAT)
| Exam | Institution | Training | Outcome |
|---|---|---|---|
| NDA | National Defence Academy, Pune | 3yr training | Army/Navy/Air Force Officer |
| CDS | IMA Dehradun / OTA Chennai | 1.5yr training | Army Officer after graduation |
| AFCAT | Air Force Academy Hyderabad | Training | IAF Officer |
| SSB coaching | Multiple private | 30,000-50,000 | 5-day selection. Personality test |

---

## SECTION I: HOSPITALITY, TOURISM & CULINARY

| Institution | Country | Fee (INR) | Notes |
|---|---|---|---|
| IHM Mumbai (BHM) | India | 60,000/yr | Govt. Best hotel management |
| IHM Delhi, Chennai, Kolkata | India | 60,000/yr | Govt. NCHMCT JEE entrance |
| Welcomgroup Graduate School (Manipal) | India | 2,50,000/yr | ITC WelcomHotel tie-up |
| Les Roches | Switzerland | 35,00,000/yr | #1 globally. Scholarship available |
| Glion Institute | Switzerland | 32,00,000/yr | Strong luxury hotel placements |
| EHL Lausanne | Switzerland | 30,00,000/yr | European Hospitality Leadership |
| Ecole Ferrandi | France | 15,00,000/yr | Best culinary school in France |
| Le Cordon Bleu | Paris/London/Sydney | 20-30,00,000/yr | Culinary. Classic French |
| William Angliss Institute | Australia | 12,00,000/yr | PR pathway. Strong events mgmt |
| SHATEC Singapore | Singapore | 10,00,000/yr | Strong Asia-Pacific placements |

---

## SECTION J: SPORTS, PHYSICAL EDUCATION & ESPORTS

| Institution | Country | Fee | Notes |
|---|---|---|---|
| LNUPE Gwalior (BSc Sports) | India | 20,000 | Govt. Best sports science |
| SAI (Sports Authority of India) centers | India | Free | For athletes. Residential |
| Manipal (BSc Physical Education) | India | 1,50,000 | |
| Jain University (Sports Management) | India | 2,50,000 | |
| TISS Mumbai (MA Sports) | India | 30,000 | Policy + management |
| University of Bath (Sport Management) | UK | 22,00,000 | #1 in UK for sport |
| Loughborough University | UK | 20,00,000 | Olympic performance focus |
| Deakin (Sports Management) | Australia | 18,00,000 | PR pathway |
| Canadian Memorial Chiropractic College | Canada | 20,00,000 | Sports physio angle |
| For Esports: | | | |
| University of Nottingham (Esports) | UK | 20,00,000 | BSc in Esports |
| Full Sail University | USA | 25,00,000 | Game design + esports |
| IIDE (Esports Marketing) | India | 1,50,000 | |
| BGM / NODWIN Gaming Academy | India | 30,000-80,000 | Certificate only |

---

## SECTION K: AGRICULTURE & ENVIRONMENT

| Institution | Country | Fee | Notes |
|---|---|---|---|
| IARI New Delhi (BSc Agri) | India | 40,000 | Indian Agricultural Research Institute. Govt |
| ICAR universities (45 state agri univs) | India | 20,000-1,00,000 | Entrance: ICAR AIEEA |
| BHU (Faculty of Agriculture) | India | 30,000 | Strong for agri research |
| Punjab Agricultural University | India | 50,000 | |
| Wageningen University (Agri) | Netherlands | 4,00,000 | #1 globally for food/agri |
| University of Queensland (Agri) | Australia | 18,00,000 | Strong for sustainable agriculture |
| University of Copenhagen (Food Science) | Denmark | 80,000 | |
| AUT Auckland | New Zealand | 15,00,000 | PR pathway. Agri + tech |
| University of Adelaide | Australia | 18,00,000 | Wine + agri. PR pathway |

---

## SECTION L: AVIATION

| Institution | Country | Fee (INR) | Notes |
|---|---|---|---|
| Indira Gandhi Rashtriya Uran Akademi (IGRUA) | India | 30,00,000 (full course) | Govt. Best CPL school in India |
| Bombay Flying Club | India | 28,00,000 | Old, respected |
| Ahmedabad Aviation & Aeronautics | India | 25,00,000 | |
| Florida Flyers | USA | 25-35,00,000 | US CPL. FAA license |
| Embry-Riddle Aeronautical University | USA | 40,00,000/yr | #1 aviation university globally |
| Oxford Aviation Academy | UK/Multiple | 35,00,000 | EASA license |
| CAE Melbourne | Australia | 30,00,000 | CASA license. PR pathway possible |
| Massey University | New Zealand | 20,00,000 | CPL + B.Aviation |
| ENAC Toulouse | France | 15,00,000 | Strong for Airbus careers |
| Lufthansa Aviation Training | Germany | 60,00,000 | Direct airline cadet program |
| IndiGo Cadet Program (6E-ATPL) | India | 60,00,000 | Direct airline pathway |
| Air India Cadet Program | India | 55,00,000 | |

---

## SECTION M: VOCATIONAL / SKILLS / CERTIFICATION PATHS

*For budget users under 1L INR — maximum employability, minimum time*

| Certification | Body | Cost (INR) | Outcome |
|---|---|---|---|
| NIELIT O/A/B/C Level | India Govt | 5,000-20,000 | IT career legitimacy |
| ITI (2-year trades) | State Govt | Free-5,000 | Electrician, fitter, machinist, COPA |
| PMKVY scheme courses | Govt | Free | Skill India |
| Google Certifications (UX/Data/IT/PM) | Google | Free-3,000 | High employer recognition |
| AWS Certified Solutions Architect | Amazon | 25,000 | Cloud. Starting salary 8-12 LPA |
| Microsoft Azure certifications | Microsoft | 15,000 | |
| Cisco CCNA | Cisco | 20,000 | Networking |
| CompTIA Security+ | CompTIA | 25,000 | Cybersecurity |
| CTET / State TET | Govt | 1,000 | Teaching govt schools |
| DELF/DALF (French) | Alliance Française | 8,000 | Opens Europe job market |
| Goethe Zertifikat (German) | Goethe Institut | 8,000 | Germany + Austria jobs |
| JLPT N2/N1 (Japanese) | JLPT | 5,000 | Japan tech jobs. Very high demand |

---

## SECTION N: SCHOLARSHIP DATABASE (INDIA-SPECIFIC)

*Feed this directly into the Finance Agent logic*

| Scholarship | Eligibility | Amount | Link |
|---|---|---|---|
| National Scholarship Portal (NSP) | SC/ST/OBC/Minority + income < 2.5L | Up to 25,000/yr | scholarships.gov.in |
| Central Sector Scheme (CSSS) | 12th board top 80%ile + family < 6L | 20,000/yr | |
| Prime Minister's Scholarship (PMSS) | Wards of ex-servicemen | 30,000/yr | |
| Inspire Scholarship (DST) | Top 1% in 12th. Science stream | 80,000/yr | |
| Kishore Vaigyanik Protsahan Yojana (KVPY) | Science. Very competitive | 60,000-80,000/yr + fellowship | |
| Maulana Azad Fellowship | Minorities pursuing PhD | Full stipend | |
| AICTE Pragati (Women in Tech) | Women. First graduate in family | 50,000/yr | |
| AICTE Saksham (Disabled) | Specially-abled. Tech courses | 50,000/yr | |
| Tata Capital Pankh Scholarship | Class 11-12 + UG. Income < 4L | 12,000/yr | |
| HDFC Parivartan ECS Scholarship | UG students. Income < 3L | 75,000 | |
| Sitaram Jindal Foundation | UG/PG. Merit + means | 25,000-30,000/yr | |
| Buddy4Study (aggregator) | All categories | Varies | buddy4study.com |
| Vidyasaarathi (aggregator) | Corporate scholarships | Varies | vidyasaarathi.com |

#### International Scholarships for Indians
| Scholarship | Country | Value | Competition |
|---|---|---|---|
| Commonwealth Scholarship | UK | Full tuition + living + airfare | Very high |
| Chevening Scholarship | UK | Full + living + flights | Very high |
| GREAT Scholarship | UK | £10,000 | Medium |
| Fulbright-Nehru | USA | Full | Extreme |
| Inlaks Scholarship | USA/UK | Up to $100,000 | Extreme |
| Narotam Sekhsaria Scholarship | Global | Up to 20L | High |
| DAAD Scholarship | Germany | Full + living | High |
| Erasmus Mundus | EU | Full + 1,000 EUR/month | High |
| Aga Khan Foundation | Global | Full | High. Minority focus |
| Lester B Pearson (Toronto) | Canada | Full (4yr undergrad) | Extreme. 1 per country |
| UBC International Leader of Tomorrow | Canada | Varies | High |
| Australia Awards | Australia | Full + living + airfare | Very high |
| NTU Research Scholarship | Singapore | Full + 2,000 SGD/month | High. PhD focus |
| KAIST Scholarship | South Korea | Full + living | Medium |
| Korean Government Scholarship (KGSP) | South Korea | Full + Korean language + living | Medium |
| MEXT Scholarship | Japan | Full + 150,000 JPY/month | Medium |
| Swiss Government Excellence | Switzerland | Full + 1,920 CHF/month | High |
| Holland Scholarship | Netherlands | €5,000 one-time | Medium |

---

## IMPLEMENTATION NOTE FOR AI ENGINE

When matching institutions, reason through ALL of the following for each recommendation:

1. **Budget check** — Total cost of attendance (tuition + living + travel + visa + books) vs user's budget_inr_per_year × course duration. Fail this and the recommendation is worthless.

2. **Visa reality check** — Countries with straightforward Indian student visas: UK, Canada, Australia, Germany, Ireland, Netherlands, Singapore. Complex: USA (F1 scrutiny high), New Zealand (simple but expensive), Japan (language barrier).

3. **PR / Work visa pathway** — If user wants to stay abroad after graduation:
   - BEST: Canada (PGWP 3yr → PR), Australia (PSW 2-4yr → PR), Germany (18-month job seeker visa → Blue Card → PR), Ireland (Stamp 1G 2yr)
   - HARD: UK (Graduate visa only 2yr, no direct PR route), USA (H1-B lottery — 33% chance), Singapore (EP competitive)

4. **ROI signal** — Median starting salary in that country in that field ÷ total cost of degree. Flag if ROI > 3x in 5 years (excellent) or < 1x (warn the user explicitly).

5. **Indian community** — Flag whether there's an established Indian student community. Relevant for emotional support, especially for first-generation abroad students.

6. **Language of instruction** — Flag any non-English programs with a note on language requirement timeline.

---

*PathForge Institution Database — Version 2.0*
*400+ institutions. 40+ countries. Every major career domain.*
*Update this database every 6 months as fees and cutoffs change.*
