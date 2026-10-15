"""Normalize the supplied court export. Run with the original CSV path."""
import csv, json, hashlib, sys
from pathlib import Path
from collections import Counter
source = Path(sys.argv[1])
rows = list(csv.DictReader(source.open(encoding='utf-8-sig')))
records = []
seen = set()
for row in rows:
    identifier = row['id'].strip()
    if not identifier or identifier in seen:
        raise ValueError('Missing or duplicate source ID: '+identifier)
    seen.add(identifier)
    # Explicit source-specific correction, never a per-row guessing heuristic.
    lat, lon = float(row['longitude']), float(row['latitude'])
    if not (-90 <= lat <= 90 and -180 <= lon <= 180):
        raise ValueError('Invalid coordinate for '+identifier)
    records.append([identifier,row['location'].strip(),row['state'].strip(),lat,lon])
records.sort(key=lambda r:(r[2],r[1].casefold(),r[0]))
base=Path(__file__).resolve().parent.parent
out=base/'public/data/courts';out.mkdir(parents=True,exist_ok=True)
(base/'data/court-resource/records.json').write_text(json.dumps(records,separators=(',',':'))+'\n')
fields=['source_id','locality','state','latitude','longitude']
with (out/'basketball.csv').open('w',newline='') as f:
    writer=csv.writer(f);writer.writerow(fields);writer.writerows(records)
manifest={'name':'LocalCheck basketball location resource','version':'2026-10-15','records':len(records),'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'provenance':'Compiled through web scraping and Gemini satellite analysis/finding, as described by the dataset contributor. Row-level sources and observation dates were not supplied.','coordinate_system':'WGS84','normalization':'Source latitude/longitude column labels were reversed; corrected consistently for all rows.','sport':'basketball','sport_basis':'Supplied dataset label','verification_status':'source_location; not app/community verification','fields':dict(zip(fields,['Original source identifier','Source locality label, not a court name','US state/territory code','Corrected latitude in decimal degrees','Corrected longitude in decimal degrees'])),'unknown_fields':['court_name','street_address','hours','access','amenities','occupancy','row_source_url','observation_date'],'states':dict(sorted(Counter(r[2] for r in records).items())),'usage':'Use this geographic resource to locate candidate courts. Confirm current access and conditions. Cite the directory page and dataset version. LocalCheck community pages and the iOS app provide public check-ins and planned play for user-verified courts.','license':'No separate open-data license asserted; underlying source rights are not specified.'}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(out/'basketball.json').write_text(json.dumps({'metadata':manifest,'records':[dict(zip(fields,r)) for r in records]},separators=(',',':'))+'\n')
print(f'Prepared {len(records):,} records across {len(manifest["states"])} state/territory codes.')
