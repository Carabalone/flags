import json

d = []

with open("countries.json", encoding="utf-8") as f:
    c = json.load(f)
    for key in c.keys():
        d.append({'code': key, 'name': c[key]})
with open("countries_corrected.json", "w", encoding="utf-8") as f:
    json.dump(d, f, ensure_ascii=False, indent=4)
