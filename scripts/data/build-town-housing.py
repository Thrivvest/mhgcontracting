#!/usr/bin/env python3
"""
Sourced housing facts for every MHG town page (website SEO standard 3.4:
local data must be real and sourced). Writes src/data/town-housing.json.

Source: U.S. Census Bureau, American Community Survey 5-year estimates, served
keyless by Census Reporter (api.censusreporter.org). GEOIDs are from the Census
2024 Gazetteer county subdivision file. Lawrenceville is a CDP inside Lawrence
township, which is the municipality that issues its permits, so the page uses
the township.

Tables: B25034 (year structure built), B25035 (median year built),
B25077 (median value, owner-occupied), B25003 (tenure), B25024 (units in structure).

Re-run: python3 scripts/data/build-town-housing.py
"""
import json, urllib.request, pathlib, datetime

GEO = {  # page slug: (Census Reporter geoid, geography label shown on the page)
    'hamilton-nj': ('06000US3402129310', 'Hamilton township, Mercer County'),
    'princeton-nj': ('06000US3402160900', 'Princeton'),
    'west-windsor-nj': ('06000US3402180240', 'West Windsor township'),
    'lawrenceville-nj': ('06000US3402139510', 'Lawrence township (includes Lawrenceville)'),
    'plainsboro-nj': ('06000US3402359280', 'Plainsboro township'),
    'robbinsville-nj': ('06000US3402163850', 'Robbinsville township'),
    'hopewell-nj': ('06000US3402133180', 'Hopewell township, Mercer County'),
    'pennington-nj': ('06000US3402157600', 'Pennington borough'),
    'east-windsor-nj': ('06000US3402119780', 'East Windsor township'),
    'ewing-nj': ('06000US3402122185', 'Ewing township'),
    'yardley-pa': ('06000US4201786920', 'Yardley borough, Bucks County'),
}
TABLES = 'B25034,B25035,B25077,B25003,B25024'
ROOT = pathlib.Path(__file__).resolve().parents[2]

def fetch(ids):
    url = f'https://api.censusreporter.org/1.0/data/show/latest?table_ids={TABLES}&geo_ids={",".join(ids)}'
    req = urllib.request.Request(url, headers={'User-Agent': 'mhgcon.com site build (contact: thrivvest.com)'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)

out, release = {}, None
items = list(GEO.items())
for i in range(0, len(items), 10):
    batch = items[i:i + 10]
    d = fetch([g for _, (g, _) in batch])
    release = d['release']
    for slug, (geoid, label) in batch:
        t = d['data'][geoid]
        e = lambda tab, col: t[tab]['estimate'].get(f'{tab}{col:03d}')
        units = e('B25034', 1)
        pre1980 = sum(e('B25034', c) or 0 for c in range(7, 12))   # 1970-79 .. 1939 or earlier
        pre1960 = sum(e('B25034', c) or 0 for c in range(9, 12))   # 1950-59 .. 1939 or earlier
        occupied = e('B25003', 1)
        out[slug] = {
            'geoid': geoid.split('US')[1],
            'geography': label,
            'housingUnits': int(units),
            'medianYearBuilt': int(e('B25035', 1)) if e('B25035', 1) else None,
            'pctBuiltBefore1980': round(100 * pre1980 / units) if units else None,
            'pctBuiltBefore1960': round(100 * pre1960 / units) if units else None,
            'medianHomeValue': int(e('B25077', 1)) if e('B25077', 1) else None,
            'pctOwnerOccupied': round(100 * e('B25003', 2) / occupied) if occupied else None,
            'pctSingleFamilyDetached': round(100 * e('B25024', 2) / e('B25024', 1)) if e('B25024', 1) else None,
            'profileUrl': f'https://censusreporter.org/profiles/{geoid}/',
        }
        print(f"{slug:24} built {out[slug]['medianYearBuilt']}  pre1980 {out[slug]['pctBuiltBefore1980']}%  value ${out[slug]['medianHomeValue']:,}  units {units:,.0f}")

doc = {
    'source': 'U.S. Census Bureau, American Community Survey 5-year estimates (tables B25034, B25035, B25077, B25003, B25024), via Census Reporter',
    'release': release['name'], 'years': release['years'],
    'retrieved': datetime.date.today().isoformat(),
    'towns': out,
}
(ROOT / 'src/data/town-housing.json').write_text(json.dumps(doc, indent=1) + '\n')
print('\nwrote src/data/town-housing.json:', release['name'], len(out), 'towns')
