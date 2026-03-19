import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Publication {
  key: string;
  type: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  html?: string;
  preview?: string;
  selected?: boolean;
}

// ---------------------------------------------------------------------------
// Minimal BibTeX parser
// ---------------------------------------------------------------------------

interface RawEntry {
  type: string;
  key: string;
  fields: Record<string, string>;
}

function parseBibtex(source: string): RawEntry[] {
  const entries: RawEntry[] = [];
  // Match @type{key, ... }
  const entryRegex = /@(\w+)\s*\{([^,]*),\s*([\s\S]*?)\n\}/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(source)) !== null) {
    const type = match[1].toLowerCase();
    const key = match[2].trim();
    const body = match[3];

    const fields: Record<string, string> = {};
    // Match field = {value} or field = value
    const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}/g;
    let fieldMatch: RegExpExecArray | null;
    while ((fieldMatch = fieldRegex.exec(body)) !== null) {
      fields[fieldMatch[1].toLowerCase()] = fieldMatch[2].trim();
    }

    entries.push({ type, key, fields });
  }

  return entries;
}

function parseAuthors(raw: string): string[] {
  return raw
    .split(/\s+and\s+/)
    .map((a) => a.trim())
    .filter((a) => a.length > 0 && a !== "others");
}

function toPublication(entry: RawEntry): Publication {
  const f = entry.fields;
  return {
    key: entry.key,
    type: entry.type,
    title: f.title ?? "",
    authors: f.author ? parseAuthors(f.author) : [],
    journal: f.journal ?? f.school ?? "",
    year: parseInt(f.year ?? "0", 10),
    volume: f.volume,
    pages: f.pages,
    doi: f.doi,
    url: f.url,
    html: f.html,
    preview: f.preview,
    selected: f.selected === "true",
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

let cached: Publication[] | null = null;

function load(): Publication[] {
  if (cached) return cached;
  const bibPath = path.join(process.cwd(), "src/content/papers.bib");
  const source = fs.readFileSync(bibPath, "utf-8");
  const entries = parseBibtex(source);
  cached = entries.map(toPublication).sort((a, b) => b.year - a.year);
  return cached;
}

export function getPublications(): Publication[] {
  return load();
}

export function getSelectedPublications(): Publication[] {
  return load().filter((p) => p.selected);
}

export function getPublicationsByYear(): Map<number, Publication[]> {
  const map = new Map<number, Publication[]>();
  for (const pub of load()) {
    const list = map.get(pub.year) ?? [];
    list.push(pub);
    map.set(pub.year, list);
  }
  return map;
}
