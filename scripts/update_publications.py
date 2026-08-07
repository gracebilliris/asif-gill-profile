#!/usr/bin/env python3
"""Refresh the static publication archive from Asif Gill's public ORCID record."""

import json
import subprocess
from pathlib import Path

ORCID_WORKS_URL = "https://pub.orcid.org/v3.0/0000-0001-6239-6280/works"
OUTPUT = Path(__file__).resolve().parents[1] / "assets" / "publications.json"


def first_value(data, *keys):
    for key in keys:
        if not isinstance(data, dict):
            return ""
        data = data.get(key)
    return data or ""


def work_url(summary):
    doi = next(
        (
            item.get("external-id-value")
            for item in summary.get("external-ids", {}).get("external-id", [])
            if item.get("external-id-type", "").lower() == "doi"
            and item.get("external-id-relationship") == "self"
        ),
        "",
    )
    if doi:
        return f"https://doi.org/{doi.removeprefix('https://doi.org/')}"

    url = first_value(summary, "url", "value")
    return url if url.startswith(("https://", "http://")) else ""


response = subprocess.run(
    ["curl", "--fail", "--silent", "--show-error", "--location", "-H", "Accept: application/json", ORCID_WORKS_URL],
    check=True,
    capture_output=True,
    text=True,
)
groups = json.loads(response.stdout)["group"]

works = []
for group in groups:
    summary = group["work-summary"][0]
    works.append(
        {
            "title": first_value(summary, "title", "title", "value"),
            "year": first_value(summary, "publication-date", "year", "value") or "Undated",
            "type": summary.get("type") or "other",
            "venue": first_value(summary, "journal-title", "value"),
            "url": work_url(summary),
        }
    )

works.sort(key=lambda work: (work["year"] != "Undated", work["year"], work["title"]), reverse=True)
OUTPUT.write_text(json.dumps(works, ensure_ascii=False, indent=2) + "\n")
print(f"Wrote {len(works)} works to {OUTPUT}")
