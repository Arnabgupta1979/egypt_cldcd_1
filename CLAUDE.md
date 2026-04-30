# Egypt Seed Regulatory Portal — Project Context for Claude Code

## What this project is

This is the codebase for the **Egypt Seed Regulatory Portal**, a phased digital resource that centralises access to officially published seed regulatory information in Egypt. It is designed to improve transparency and reduce information asymmetries between regulators and market actors in the Egyptian seed sector.

The portal is part of the broader **Egypt Seed Hub** initiative.

---

## Institutional roles

| Role | Institution |
|---|---|
| Institutional host | Central Administration for Seed Certification (CASC), under Egypt's Ministry of Agriculture and Land Reclamation (MALR) |
| Technical support | Wageningen Social and Economic Research (WSER) |
| Convener | Egypt Seed Hub |

---

## Hard constraints — always respect these

- **The portal does not interpret or modify regulations.** It links to official sources only.
- **The portal does not provide regulatory approvals or services.**
- **The portal does not replace official government publications.**
- **The portal organises and structures existing regulatory information only.**
- **Regulatory authority remains with Egyptian government institutions.**

When editing content pages, do not rephrase regulatory text in ways that could be read as legal interpretation. Describe procedures neutrally and always attribute requirements to the originating authority.

---

## Key institutions — verified data

### CASC — Central Administration for Seed Certification (portal host)
- Arabic: الإدارة المركزية لتسجيل وتداول التقاوي
- ISTA code: EGDL0100
- Address: 8 Gamaa Street, P.O. Box 237, 12211 Rabee El Gezee-Giza, Egypt
- Phone: +20 2 35724721 / +20 2 35728962 / +20 2 35714133
- Email: gcstl.casc.eg@gmail.com
- Type: Regulatory
- Mandate: Lead regulatory agency for seed certification, variety registration (DUS), market inspection, and PVPO host

### CAPQ — Central Administration for Plant Quarantine
- Website: http://www.capq.gov.eg
- Type: Regulatory
- Mandate: Border authority for all phytosanitary measures, import permits, export certificates

### CASP — Central Administration for Seed Production
- Arabic: الإدارة المركزية لإنتاج التقاوي
- Address: 8 Gamaa El Kahera Street, Giza, Cairo (P.O. Box 147 Rabie El Geizy, Post Code 12211)
- Phone: +20 2 35694060 / +20 2 35725986
- Type: Production (State Production Authority)
- Legal basis: Ministerial Decree No. 926 of 1995
- Mandate: State production arm — oversees government seed farms, contracts growers, processes and distributes certified seed through cooperatives and retailers
- Key note: CASP (production) and CASC (certification) are deliberately separate under Decree 926/1995 to prevent conflicts of interest
- Market share (approx): Cotton 100%, Barley 100%, Lentil 100%, Faba bean 82%, Rice 65–67%, Wheat 65–67%

### ARC — Agricultural Research Center
- Website: http://www.arc.sci.eg
- Type: Research
- Mandate: Primary agricultural R&D body; develops public varieties; produces Breeder Seed and Foundation Seed; houses the National Gene Bank

### GAFI — General Authority for Investment and Free Zones
- Website: https://www.gafi.gov.eg
- Type: Investment
- Mandate: One-stop shop for company registration and investment facilitation

### MALR — Ministry of Agriculture and Land Reclamation
- Website: https://moa.gov.eg/en/
- Type: Government ministry
- Mandate: Sets national agricultural policy; issues Ministerial Decrees

### ESIA — Egyptian Seed Industry Association
- Type: Trade association
- Mandate: Private sector representative body for the seed industry

---

## Public seed supply chain (strategic crops)

```
ARC (Breeder Seed)
    ↓
ARC farms (Foundation Seed)
    ↓
CASP (Certified Seed — multiplication)
    ↓
Cooperatives and licensed retailers
```

Strategic crops managed through this chain: cotton, wheat, rice, barley, lentil, faba bean.

---

## Regulatory modules

The portal covers six regulatory domains:

1. **Variety Registration** — managed by CASC/PVPO
2. **Seed Certification** — managed by CASC
3. **Import/Export** — managed by CAPQ (permits) and CASC (certification)
4. **Business Licensing** — seed producer, dealer, and processor licensing
5. **Plant Quarantine** — managed by CAPQ
6. **International Agreements** — COMESA, UPOV, ISTA, Nagoya Protocol

---

## Institution type taxonomy

| Type label | Institutions | Badge colour |
|---|---|---|
| Regulatory | CASC, CAPQ, PVPO | Blue |
| Research | ARC, Universities | Green |
| Advisory | Extension services, NSC | Grey |
| Investment | GAFI | Purple |
| Trade | ESIAS | Teal |
| Production | CASP | Amber/Orange |

> Note: "Production" is a distinct type added to represent CASP. Do not collapse it into "Regulatory" or "Advisory".

---

## Development phases

| Phase | Description |
|---|---|
| 1 | Stakeholder interviews and scope definition |
| 2 | Structuring regulatory information |
| 3 | Portal prototype development and testing |
| 4 | Preparation for operational roll-out |
| 5 | Management arrangements and sustainability |
| 6 | Validation and institutionalisation |

The codebase is currently in **Phase 3 (prototype)**.

---

## Target users

- Egyptian seed companies
- International seed companies interested in the Egyptian market
- Agro-dealers and distributors
- Regulators and government agencies
- Researchers and development partners

Navigation and content should be clear and accessible to all these groups. Avoid technical jargon without explanation.

---

## Content and language guidelines

- Tone: neutral, clear, professional — suitable for government collaboration
- Bilingual: English primary, Arabic secondary. Arabic text must use `dir="rtl"` consistently
- Do not use promotional or speculative language
- Do not make claims about regulatory timelines or costs unless sourced from official documents
- Attribute all procedural requirements to the responsible authority (e.g. "as required by CAPQ" not "you must submit")

---

## Key external references

- FAOLEX Egypt: https://www.fao.org/faolex/countryprofiles/general-profile/en/?iso3=EGY
- WIPO Lex: https://www.wipo.int/wipolex/en/profile.jsp?code=EG
- CAPQ: http://www.capq.gov.eg
- Nafeza single window: https://www.nafeza.gov.eg/ar
- COMESA Variety Catalogue: https://varietycatalogue.comesa.int/
- GAFI: https://www.gafi.gov.eg
- MALR: https://moa.gov.eg/en/
- ISTA: https://www.seedtest.org
- OECD Seed Schemes: https://www.oecd.org/agriculture/seeds/

---

## Notes for Claude Code

- When feedback arrives from the Egypt team (CASC, CAPQ, MALR, ESIA, or CASP), treat it as authoritative on institutional facts and defer to it over any assumptions in the codebase
- If a change touches regulatory content (procedure descriptions, legal references, fee information), flag it for human review before committing — do not silently update regulatory facts
- CASP is a first-class institution and should be treated at the same level as CASC and CAPQ in all institution-facing pages, data files, and contact information
- The portal does not yet have a confirmed domain — use `seedportal.gov.eg` as placeholder where needed
