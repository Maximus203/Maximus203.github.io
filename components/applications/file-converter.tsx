'use client';

import { useEffect, useRef, useState } from 'react';
import { Archive, ArrowDownToLine, ArrowRight, CheckCircle2, Copy, FileCode2, FileImage, FileText, ImagePlus, LoaderCircle, RotateCcw, ShieldCheck, SlidersHorizontal, Trash2, Upload, XCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { appCopy } from '@/lib/applications/conversion-copy';
import { convertData, convertImage, errorCode, EXT, formatBytes, IMAGE_ACCEPT, imageFormats, MAX_FILES, MAX_BATCH_INPUT_BYTES, MAX_BATCH_OUTPUT_BYTES, MAX_TEXT_BYTES, outputName, saveBlob, uniqueName, type ConversionErrorCode, type ImageFormat } from '@/lib/applications/conversion';
import styles from './local-apps.module.css';

type FileItem = { id: string; file: File; status: 'pending' | 'converting' | 'ready' | 'failed'; error?: ConversionErrorCode; output?: { blob: Blob; url: string; name: string; width: number; height: number; format: ImageFormat } };

export function FileConverter({ locale }: { locale: Locale }) {
  const t = appCopy[locale];
  const [tab, setTab] = useState<'images' | 'data'>('images');
  return <section className={styles.app} data-testid="conversion-workbench" aria-label={t.images}>
    <div className={styles.topbar}><div className={styles.segment} aria-label={t.operation}>
      <button type="button" aria-pressed={tab === 'images'} onClick={() => setTab('images')}><FileImage size={18} aria-hidden="true" />{t.images}</button>
      <button type="button" aria-pressed={tab === 'data'} onClick={() => setTab('data')}><FileCode2 size={18} aria-hidden="true" />{t.data}</button>
    </div><span className={styles.localBadge}><ShieldCheck size={16} aria-hidden="true" />{t.local}</span></div>
    <div hidden={tab !== 'images'}><ImageWorkbench locale={locale} /></div>
    <div hidden={tab !== 'data'}><DataWorkbench locale={locale} /></div>
    <p className={styles.privacy}><ShieldCheck size={16} aria-hidden="true" />{t.localNote}</p>
  </section>;
}
export const ImageConverterTool = FileConverter;

function ImageWorkbench({ locale }: { locale: Locale }) {
  const t = appCopy[locale];
  const [files, setFiles] = useState<FileItem[]>([]);
  const [format, setFormat] = useState<ImageFormat>('webp');
  const [quality, setQuality] = useState(85);
  const [busy, setBusy] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<ConversionErrorCode | null>(null);
  const [changed, setChanged] = useState(false);
  const filesRef = useRef<FileItem[]>([]);
  const busyRef = useRef(false);
  const epoch = useRef(0);
  const urls = useRef(new Set<string>());
  const input = useRef<HTMLInputElement>(null);
  const update = (next: FileItem[]) => { filesRef.current = next; setFiles(next); };
  const revoke = (item: FileItem) => { if (item.output) { URL.revokeObjectURL(item.output.url); urls.current.delete(item.output.url); } };
  useEffect(() => () => { epoch.current++; urls.current.forEach((url) => URL.revokeObjectURL(url)); urls.current.clear(); }, []);
  function invalidate() {
    epoch.current++;
    filesRef.current.forEach(revoke);
    update(filesRef.current.map((item) => ({ id: item.id, file: item.file, status: 'pending' })));
    setChanged(filesRef.current.length > 0); setError(null); setZipping(false);
  }
  function reset() {
    epoch.current++;
    filesRef.current.forEach(revoke); update([]);
    busyRef.current = false; setBusy(false); setZipping(false); setError(null); setChanged(false); setDragging(false); setFormat('webp'); setQuality(85);
    if (input.current) input.current.value = '';
  }
  async function run(items: FileItem[]) {
    if (!items.length || busyRef.current) return;
    const version = ++epoch.current;
    busyRef.current = true; setBusy(true); setChanged(false); setError(null);
    const used = new Set(filesRef.current.filter((item) => !items.some((next) => next.id === item.id)).flatMap((item) => item.output ? [item.output.name.toLowerCase()] : []));
    for (const item of items) {
      if (version !== epoch.current) return;
      revoke(item);
      update(filesRef.current.map((current) => current.id === item.id ? { ...current, status: 'converting', output: undefined, error: undefined } : current));
      try {
        const result = await convertImage(item.file, format, quality / 100);
        if (version !== epoch.current) return;
        const outputBytes = filesRef.current.reduce((sum, current) => sum + (current.output?.blob.size ?? 0), 0);
        if (outputBytes + result.blob.size > MAX_BATCH_OUTPUT_BYTES) {
          update(filesRef.current.map((current) => current.id === item.id ? { ...current, status: 'failed', error: 'outputLimit' } : current));
          continue;
        }
        const url = URL.createObjectURL(result.blob); urls.current.add(url);
        const name = uniqueName(outputName(item.file.name, EXT[format]), used);
        update(filesRef.current.map((current) => current.id === item.id ? { ...current, status: 'ready', output: { ...result, url, name, format } } : current));
      } catch (cause) {
        if (version !== epoch.current) return;
        update(filesRef.current.map((current) => current.id === item.id ? { ...current, status: 'failed', error: errorCode(cause) } : current));
      }
      // Yield so progress and cancellation remain responsive between files.
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    if (version === epoch.current) { busyRef.current = false; setBusy(false); }
  }
  function add(incoming: FileList | File[]) {
    if (busyRef.current || zipping) return;
    const list = Array.from(incoming);
    if (!list.length) return;
    if (list.length + filesRef.current.length > MAX_FILES) { setError('tooMany'); return; }
    if ([...filesRef.current.map((item) => item.file), ...list].reduce((sum, file) => sum + file.size, 0) > MAX_BATCH_INPUT_BYTES) { setError('batchSize'); return; }
    const next: FileItem[] = list.map((file) => ({ id: crypto.randomUUID(), file, status: 'pending' }));
    update([...filesRef.current, ...next]);
    void run(filesRef.current.filter((item) => item.status === 'pending'));
  }
  async function zip() {
    if (busyRef.current || zipping) return;
    const ready = filesRef.current.filter((item) => item.output);
    if (!ready.length) return;
    const version = epoch.current;
    setZipping(true); setError(null);
    try {
      const { default: JSZip } = await import('jszip');
      const archive = new JSZip();
      for (const item of ready) archive.file(item.output!.name, await item.output!.blob.arrayBuffer());
      const blob = await archive.generateAsync({ type: 'blob', compression: 'STORE' });
      if (version === epoch.current) saveBlob(blob, 'converted-files.zip');
    } catch { if (version === epoch.current) setError('unknown'); }
    finally { if (version === epoch.current) setZipping(false); }
  }
  const completed = files.filter((item) => item.status === 'ready').length;
  return <>
    <header className={styles.intro}><h2>{t.imageTitle}</h2><p>{t.imageSubtitle}</p></header>
    <div className={styles.converterGrid}>
      <aside className={styles.panel}>
        <h3 className={styles.panelTitle}><SlidersHorizontal size={18} aria-hidden="true" />{t.settings}</h3>
        <fieldset disabled={busy || zipping} className={styles.fieldset}><legend>{t.format}</legend><div className={styles.formatGrid}>
          {imageFormats.map((value) => <button type="button" key={value} aria-pressed={format === value} onClick={() => { if (value !== format) { invalidate(); setFormat(value); } }}>{value === 'jpeg' ? 'JPEG' : value === 'webp' ? 'WebP' : value.toUpperCase()}<span>.{EXT[value]}</span></button>)}
        </div></fieldset>
        <label className={styles.field} htmlFor="conversion-quality"><span>{t.quality}<output>{quality}%</output></span><input id="conversion-quality" type="range" min="10" max="100" step="1" value={quality} disabled={busy || zipping || format === 'png' || format === 'pdf'} onChange={(event) => { invalidate(); setQuality(Number(event.target.value)); }} /></label>
        <p className={styles.hint}>{format === 'pdf' ? t.pdfNote : format === 'png' ? t.lossless : t.qualityNote}</p>
        <div className={styles.rule} /><p className={styles.hint}>{t.firstFrame}</p>
        <button className={styles.primary} type="button" disabled={!files.length || busy || zipping} onClick={() => void run(filesRef.current)}>{busy ? <LoaderCircle className={styles.spin} size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}{busy ? `${t.converting}…` : t.convert}</button>
        <button className={styles.secondary} type="button" disabled={!files.length && !error} onClick={reset}><RotateCcw size={16} aria-hidden="true" />{t.reset}</button>
      </aside>
      <div className={styles.results}>
        <div className={`${styles.dropzone} ${dragging ? styles.dragging : ''}`} onDragOver={(event) => { event.preventDefault(); if (!busy && !zipping) setDragging(true); }} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }} onDrop={(event) => { event.preventDefault(); setDragging(false); add(event.dataTransfer.files); }}>
          <ImagePlus size={32} strokeWidth={1.4} aria-hidden="true" /><div><strong>{t.drop}</strong><p>{t.dropNote}</p></div>
          <button type="button" className={styles.secondary} disabled={busy || zipping || files.length >= MAX_FILES} onClick={() => input.current?.click()}><Upload size={16} aria-hidden="true" />{t.browse}</button>
          <input id="conversion-files" ref={input} type="file" multiple accept={IMAGE_ACCEPT} className={styles.hiddenInput} tabIndex={-1} aria-label={t.browse} disabled={busy || zipping} onChange={(event) => { if (event.target.files) add(event.target.files); event.target.value = ''; }} />
        </div>
        {error && <p className={styles.error} role="alert"><XCircle size={18} aria-hidden="true" />{t.errors[error]}</p>}
        {changed && <p className={styles.notice} role="status">{t.fresh}</p>}
        <div className={styles.queueHeader}><h3>{t.queue}</h3><span aria-live="polite">{completed}/{files.length} {t.complete}</span></div>
        {files.length === 0 ? <div className={styles.empty}><div className={styles.emptyIcons}><FileImage size={34} strokeWidth={1.2} aria-hidden="true" /><ArrowRight size={20} aria-hidden="true" /><FileText size={34} strokeWidth={1.2} aria-hidden="true" /></div><h3>{t.emptyTitle}</h3><p>{t.emptyText}</p></div> : <ul className={styles.fileList}>
          {files.map((item) => {
            const delta = item.output ? Math.round((1 - item.output.blob.size / item.file.size) * 100) : 0;
            return <li key={item.id} className={styles.fileRow}>
              <div className={styles.thumbnail}>{item.output && item.output.format !== 'pdf' ? <img src={item.output.url} alt={`${t.preview}: ${item.file.name}`} /> : <FileImage size={24} aria-hidden="true" />}</div>
              <div className={styles.fileInfo}><strong title={item.file.name}>{item.file.name}</strong><span>{formatBytes(item.file.size, locale)}{item.output && <> <ArrowRight size={12} aria-hidden="true" /> {formatBytes(item.output.blob.size, locale)} · {item.output.width} × {item.output.height}</>}</span>
                {item.error ? <p className={styles.inlineError} role="alert">{t.errors[item.error]}</p> : <span className={styles.fileStatus} aria-live="polite">{item.status === 'converting' ? <LoaderCircle size={13} className={styles.spin} aria-hidden="true" /> : item.status === 'ready' ? <CheckCircle2 size={13} aria-hidden="true" /> : null}{item.status === 'ready' ? `${item.output?.name} · ${delta === 0 ? t.unchanged : `${Math.abs(delta)}% ${delta > 0 ? t.smaller : t.larger}`}` : t[item.status]}</span>}
              </div>
              <div className={styles.rowActions}>{item.output && <a className={styles.iconButton} href={item.output.url} download={item.output.name} aria-label={`${t.download} ${item.output.name}`} title={t.download}><ArrowDownToLine size={19} aria-hidden="true" /></a>}<button type="button" className={styles.iconButton} disabled={busy || zipping} aria-label={`${t.remove} ${item.file.name}`} title={t.remove} onClick={() => { revoke(item); update(filesRef.current.filter((entry) => entry.id !== item.id)); }}><Trash2 size={17} aria-hidden="true" /></button></div>
            </li>;
          })}
        </ul>}
        {files.length > 0 && <div className={styles.footerActions}><span className={styles.hint}>{files.length} {t.files}</span><button type="button" className={styles.primary} disabled={!completed || busy || zipping} onClick={() => void zip()}>{zipping ? <LoaderCircle size={18} className={styles.spin} aria-hidden="true" /> : <Archive size={18} aria-hidden="true" />}{zipping ? t.zipping : t.downloadAll}</button></div>}
      </div>
    </div>
  </>;
}

type DataMode = 'csv-json' | 'json-csv' | 'json-pretty' | 'json-compact';
function DataWorkbench({ locale }: { locale: Locale }) {
  const t = appCopy[locale];
  const [mode, setMode] = useState<DataMode>('csv-json');
  const [source, setSource] = useState('');
  const [output, setOutput] = useState('');
  const [protect, setProtect] = useState(true);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState<ConversionErrorCode | null>(null);
  const [copyStatus, setCopyStatus] = useState<'copied' | 'copyFailed' | null>(null);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const version = useRef(0);
  useEffect(() => () => { version.current++; }, []);
  function invalidate() { version.current++; setChanged(Boolean(output)); setOutput(''); setError(null); setCopyStatus(null); setLoading(false); }
  async function importFile(file: File) {
    invalidate(); const token = version.current;
    if (file.size > MAX_TEXT_BYTES) { setError('tooLarge'); return; }
    setLoading(true);
    try {
      const text = new TextDecoder('utf-8', { fatal: true }).decode(await file.arrayBuffer());
      if (token === version.current) { setSource(text); setChanged(false); }
    } catch { if (token === version.current) setError('utf8'); }
    finally { if (token === version.current) setLoading(false); }
  }
  function convert() {
    setCopyStatus(null); setOutput(''); setChanged(false); setError(null);
    try { setOutput(convertData(source, mode, protect)); } catch (cause) { setError(errorCode(cause)); }
  }
  async function copy() {
    const token = version.current;
    try { await navigator.clipboard.writeText(output); if (token === version.current) setCopyStatus('copied'); }
    catch { if (token === version.current) setCopyStatus('copyFailed'); }
  }
  const isCsv = mode === 'json-csv';
  return <>
    <header className={styles.intro}><h2>{t.dataTitle}</h2><p>{t.dataSubtitle}</p></header>
    <div className={styles.dataControls}><label className={styles.field} htmlFor="data-operation">{t.operation}<select id="data-operation" value={mode} onChange={(event) => { invalidate(); setMode(event.target.value as DataMode); }}><option value="csv-json">{t.csvJson}</option><option value="json-csv">{t.jsonCsv}</option><option value="json-pretty">{t.pretty}</option><option value="json-compact">{t.compact}</option></select></label>
      <div className={styles.actions}><button type="button" className={styles.secondary} onClick={() => input.current?.click()}><Upload size={16} aria-hidden="true" />{t.import}</button><input id="data-import" ref={input} className={styles.hiddenInput} tabIndex={-1} aria-label={t.import} type="file" accept=".csv,.json,.txt,text/csv,application/json,text/plain" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importFile(file); event.target.value = ''; }} /><button type="button" className={styles.secondary} onClick={() => { invalidate(); setSource(mode === 'csv-json' ? 'name,city,language\nAda,Dakar,fr\nLin,上海,zh\nHana,東京,ja' : '[{"name":"Ada","city":"Dakar","language":"fr"},{"name":"Lin","city":"上海","language":"zh"},{"name":"Hana","city":"東京","language":"ja"}]'); }}>{t.sample}</button></div>
    </div>
    <div className={styles.dataGrid}><label className={styles.field} htmlFor="conversion-source"><span>{t.source}<small>{formatBytes(new TextEncoder().encode(source).length, locale)}</small></span><textarea id="conversion-source" spellCheck={false} value={source} placeholder={t.dataPlaceholder} onChange={(event) => { invalidate(); setSource(event.target.value); }} /></label><label className={styles.field} htmlFor="conversion-result"><span>{t.output}{output && <small>{formatBytes(new TextEncoder().encode(output).length, locale)}</small>}</span><textarea id="conversion-result" spellCheck={false} value={output} readOnly placeholder={t.outputPlaceholder} /></label></div>
    {isCsv && <div className={styles.safetyOption}><label className={styles.checkbox}><input type="checkbox" checked={protect} onChange={(event) => { invalidate(); setProtect(event.target.checked); }} />{t.protect}</label><p className={styles.hint}>{t.protectNote}</p></div>}
    {error && <p className={styles.error} role="alert"><XCircle size={18} aria-hidden="true" />{t.errors[error]}</p>}
    <div aria-live="polite">{changed && <p className={styles.notice}>{t.dataFresh}</p>}{copyStatus && <p className={styles.notice}>{t[copyStatus]}</p>}</div>
    <div className={styles.footerActions}><div className={styles.actions}><button type="button" className={styles.primary} disabled={!source.trim() || loading} onClick={convert}><ArrowRight size={18} aria-hidden="true" />{t.dataConvert}</button><button type="button" className={styles.secondary} onClick={() => { invalidate(); setSource(''); setChanged(false); setMode('csv-json'); setProtect(true); }}><RotateCcw size={16} aria-hidden="true" />{t.reset}</button></div><div className={styles.actions}><button type="button" className={styles.secondary} disabled={!output} onClick={() => void copy()}><Copy size={16} aria-hidden="true" />{t.copy}</button><button type="button" className={styles.secondary} disabled={!output} onClick={() => saveBlob(new Blob([isCsv ? '\uFEFF' + output : output], { type: isCsv ? 'text/csv;charset=utf-8' : 'application/json;charset=utf-8' }), `converted.${isCsv ? 'csv' : 'json'}`)}><ArrowDownToLine size={16} aria-hidden="true" />{t.download}</button></div></div>
    <p className={styles.hint}>{t.dataNote}</p>
  </>;
}
