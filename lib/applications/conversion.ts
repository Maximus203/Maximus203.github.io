/** Pure format helpers and explicitly browser-local conversion. No uploads or remote URLs. */
export type ImageFormat = 'webp' | 'jpeg' | 'png' | 'pdf';
export type ImageKind = 'png' | 'jpeg' | 'webp' | 'gif' | 'bmp';
export type ConversionErrorCode = 'unsupported' | 'tooLarge' | 'tooMany' | 'batchSize' | 'outputLimit' | 'dataLimit' | 'pixels' | 'decode' | 'encode' | 'empty' | 'csv' | 'headers' | 'rows' | 'json' | 'records' | 'nested' | 'utf8' | 'unknown';
export class ConversionError extends Error {
  code: ConversionErrorCode;
  constructor(code: ConversionErrorCode) { super(code); this.name = 'ConversionError'; this.code = code; }
}
export const MAX_IMAGE_BYTES = 30 * 1024 * 1024;
export const MAX_TEXT_BYTES = 5 * 1024 * 1024;
export const MAX_FILES = 20;
export const MAX_BATCH_INPUT_BYTES = 100 * 1024 * 1024;
export const MAX_BATCH_OUTPUT_BYTES = 150 * 1024 * 1024;
export const MAX_DATA_OUTPUT_CHARS = 20 * 1024 * 1024;
export const MAX_PIXELS = 24_000_000;
export const IMAGE_ACCEPT = '.png,.jpg,.jpeg,.webp,.gif,.bmp,image/png,image/jpeg,image/webp,image/gif,image/bmp';
export const imageFormats: ImageFormat[] = ['webp', 'jpeg', 'png', 'pdf'];
export const MIME: Record<ImageFormat, string> = { webp: 'image/webp', jpeg: 'image/jpeg', png: 'image/png', pdf: 'application/pdf' };
export const EXT: Record<ImageFormat, string> = { webp: 'webp', jpeg: 'jpg', png: 'png', pdf: 'pdf' };
export function imageSignature(bytes: Uint8Array): ImageKind | null {
  const match = (values: number[], offset = 0) => values.every((value, index) => bytes[offset + index] === value);
  if (match([137, 80, 78, 71, 13, 10, 26, 10])) return 'png';
  if (match([255, 216, 255])) return 'jpeg';
  if (bytes.length >= 12 && match([82, 73, 70, 70]) && match([87, 69, 66, 80], 8)) return 'webp';
  if (match([71, 73, 70, 56, 55, 97]) || match([71, 73, 70, 56, 57, 97])) return 'gif';
  if (bytes.length >= 14 && match([66, 77])) return 'bmp';
  return null;
}
export async function validateImage(file: Blob): Promise<ImageKind> {
  if (!file.size) throw new ConversionError('empty');
  if (file.size > MAX_IMAGE_BYTES) throw new ConversionError('tooLarge');
  const kind = imageSignature(new Uint8Array(await file.slice(0, 16).arrayBuffer()));
  if (!kind) throw new ConversionError('unsupported');
  return kind;
}
export async function loadLocalImage(file: Blob): Promise<HTMLImageElement> {
  await validateImage(file);
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new ConversionError('decode'));
      img.src = url;
    });
    if (!image.naturalWidth || !image.naturalHeight) throw new ConversionError('decode');
    if (image.naturalWidth * image.naturalHeight > MAX_PIXELS || Math.max(image.naturalWidth, image.naturalHeight) > 10000) throw new ConversionError('pixels');
    return image;
  } finally { URL.revokeObjectURL(url); }
}
export async function canvasBlob(canvas: HTMLCanvasElement, format: 'png' | 'jpeg' | 'webp', quality = .85): Promise<Blob> {
  const mime = MIME[format];
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((result) => result ? resolve(result) : reject(new ConversionError('encode')), mime, quality));
  // Browsers may silently fall back to PNG if the requested encoder is unavailable.
  if (blob.type !== mime || imageSignature(new Uint8Array(await blob.slice(0, 16).arrayBuffer())) !== format) throw new ConversionError('encode');
  return blob;
}
export async function convertImage(file: File, format: ImageFormat, quality: number): Promise<{ blob: Blob; width: number; height: number }> {
  const image = await loadLocalImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  if (!context) throw new ConversionError('encode');
  try {
    if (format === 'jpeg' || format === 'pdf') { context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height); }
    context.drawImage(image, 0, 0);
    let blob: Blob;
    if (format === 'pdf') {
      const { PDFDocument } = await import('pdf-lib');
      const document = await PDFDocument.create();
      const png = await canvasBlob(canvas, 'png');
      const embedded = await document.embedPng(await png.arrayBuffer());
      const scale = Math.min(.75, 1440 / canvas.width, 1440 / canvas.height);
      const page = document.addPage([canvas.width * scale, canvas.height * scale]);
      page.drawImage(embedded, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
      const bytes = await document.save();
      blob = new Blob([new Uint8Array(bytes)], { type: MIME.pdf });
    } else blob = await canvasBlob(canvas, format, quality);
    return { blob, width: canvas.width, height: canvas.height };
  } finally { canvas.width = 0; canvas.height = 0; }
}
export function outputName(name: string, extension: string): string {
  const base = name.replace(/\.[^.]*$/, '').replace(/[\\/:*?"<>|\u0000-\u001f]/g, '-').replace(/^\.+/, '').trim().slice(0, 120) || 'converted';
  return `${base}.${extension}`;
}
export function uniqueName(name: string, used: Set<string>): string {
  let candidate = name; let count = 2;
  const dot = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : '';
  while (used.has(candidate.toLowerCase())) candidate = `${base}-${count++}${ext}`;
  used.add(candidate.toLowerCase());
  return candidate;
}
export function errorCode(error: unknown): ConversionErrorCode { return error instanceof ConversionError ? error.code : 'unknown'; }
export function formatBytes(bytes: number, locale = 'en'): string {
  const unit = bytes >= 1024 * 1024 ? 1024 * 1024 : 1024;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(bytes / unit)} ${unit === 1024 ? 'KB' : 'MB'}`;
}
export function saveBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = name;
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
/** Strict comma-separated CSV, RFC 4180 quoting, Unicode, and consistent columns. */
export function parseCsv(input: string): string[][] {
  const text = input.replace(/^\uFEFF/, '');
  if (!text.trim()) throw new ConversionError('empty');
  const rows: string[][] = [];
  let row: string[] = []; let field = ''; let quoted = false; let closed = false; let cells = 0;
  const pushField = () => {
    row.push(field); field = ''; closed = false; cells++;
    if (row.length > 500 || cells > 1_000_000) throw new ConversionError('dataLimit');
  };
  const pushRow = () => { pushField(); rows.push(row); row = []; if (rows.length > 50_001) throw new ConversionError('dataLimit'); };
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else { quoted = false; closed = true; } }
      else field += char;
      continue;
    }
    if (closed && char !== ',' && char !== '\r' && char !== '\n') throw new ConversionError('csv');
    if (char === '"') { if (field || closed) throw new ConversionError('csv'); quoted = true; }
    else if (char === ',') pushField();
    else if (char === '\r' || char === '\n') { if (char === '\r' && text[i + 1] === '\n') i++; pushRow(); }
    else field += char;
  }
  if (quoted) throw new ConversionError('csv');
  if (field || closed || row.length || !/[\r\n]$/.test(text)) pushRow();
  const headers = rows[0];
  if (!headers.length || headers.some((header) => !header.trim()) || new Set(headers).size !== headers.length) throw new ConversionError('headers');
  if (headers.length > 500) throw new ConversionError('dataLimit');
  if (rows.some((values) => values.length !== headers.length)) throw new ConversionError('rows');
  return rows;
}
export function csvToJson(input: string): string {
  const [headers, ...rows] = parseCsv(input);
  // Check expansion before stringifying: long headers repeated over many rows can balloon.
  const headerCost = headers.reduce((total, header) => total + JSON.stringify(header).length + 8, 0);
  let length = 2;
  const records = rows.map((values) => {
    length += headerCost + 8 + values.reduce((total, value) => total + JSON.stringify(value).length, 0);
    if (length > MAX_DATA_OUTPUT_CHARS) throw new ConversionError('dataLimit');
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
  return JSON.stringify(records, null, 2);
}
export function jsonToCsv(input: string, protectFormulas = true): string {
  let value: unknown;
  try { value = JSON.parse(input.replace(/^\uFEFF/, '')); } catch { throw new ConversionError('json'); }
  if (!Array.isArray(value) || !value.length || value.some((entry) => entry === null || typeof entry !== 'object' || Array.isArray(entry))) throw new ConversionError('records');
  const records = value as Record<string, unknown>[];
  if (records.length > 50_000) throw new ConversionError('dataLimit');
  const headers = [...new Set(records.flatMap((record) => Object.keys(record)))];
  if (headers.length > 500 || records.length * headers.length > 1_000_000) throw new ConversionError('dataLimit');
  if (!headers.length || headers.some((header) => !header.trim())) throw new ConversionError('headers');
  const cell = (value: unknown): string => {
    if (value !== null && value !== undefined && typeof value === 'object') throw new ConversionError('nested');
    let text = value === null || value === undefined ? '' : String(value);
    if (protectFormulas && /^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  let length = 0;
  const lines = [headers.map(cell).join(',')];
  for (const record of records) {
    const line = headers.map((header) => cell(Object.hasOwn(record, header) ? record[header] : '')).join(',');
    length += line.length + 2;
    if (length > MAX_DATA_OUTPUT_CHARS) throw new ConversionError('dataLimit');
    lines.push(line);
  }
  return lines.join('\r\n');
}
/** Bound depth, work and exact serialized size before allocating an indented JSON string. */
function boundedJsonStringify(root: unknown, pretty: boolean): string {
  const stack: { value: unknown; depth: number }[] = [{ value: root, depth: 0 }];
  let projected = 0;
  let nodes = 0;
  while (stack.length) {
    const { value, depth } = stack.pop()!;
    if (++nodes > 1_000_000 || depth > 100) throw new ConversionError('dataLimit');
    if (value === null || typeof value !== 'object') {
      projected += JSON.stringify(value).length;
    } else {
      const array = Array.isArray(value);
      const keys = array ? null : Object.keys(value);
      const count = array ? value.length : keys!.length;
      // Brackets, commas, line breaks, each child indent and the closing indent.
      projected += 2 + Math.max(0, count - 1);
      if (pretty && count) projected += count + 1 + count * (depth + 1) * 2 + depth * 2;
      if (count + stack.length + nodes > 1_000_000) throw new ConversionError('dataLimit');
      for (let index = 0; index < count; index++) {
        if (array) stack.push({ value: value[index], depth: depth + 1 });
        else {
          const key = keys![index];
          projected += JSON.stringify(key).length + (pretty ? 2 : 1);
          stack.push({ value: (value as Record<string, unknown>)[key], depth: depth + 1 });
        }
      }
    }
    if (projected > MAX_DATA_OUTPUT_CHARS) throw new ConversionError('dataLimit');
  }
  return JSON.stringify(root, null, pretty ? 2 : undefined);
}
export function convertData(input: string, mode: 'csv-json' | 'json-csv' | 'json-pretty' | 'json-compact', protectFormulas = true): string {
  if (!input.trim()) throw new ConversionError('empty');
  if (new TextEncoder().encode(input).length > MAX_TEXT_BYTES) throw new ConversionError('tooLarge');
  if (mode === 'csv-json') return csvToJson(input);
  if (mode === 'json-csv') return jsonToCsv(input, protectFormulas);
  let parsed: unknown;
  try { parsed = JSON.parse(input.replace(/^\uFEFF/, '')); }
  catch { throw new ConversionError('json'); }
  return boundedJsonStringify(parsed, mode === 'json-pretty');
}
/** Wrap captions by Unicode grapheme where supported, including CJK and long words. */
export function wrapCaption(context: Pick<CanvasRenderingContext2D, 'measureText'>, text: string, width: number): string[] {
  const Segmenter = Intl.Segmenter;
  const segments = (value: string) => Segmenter ? Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(value), (item) => item.segment) : Array.from(value);
  return text.split('\n').flatMap((paragraph) => {
    if (!paragraph) return [''];
    const lines: string[] = []; let line = '';
    for (const token of segments(paragraph)) {
      if (line && context.measureText(line + token).width > width) { lines.push(line.trimEnd()); line = token.trimStart(); }
      else line += token;
    }
    lines.push(line.trimEnd()); return lines;
  });
}
