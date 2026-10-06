'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, ImagePlus, LoaderCircle, Palette, RotateCcw, ShieldCheck, Type, Upload, XCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { appCopy } from '@/lib/applications/conversion-copy';
import { canvasBlob, errorCode, IMAGE_ACCEPT, loadLocalImage, saveBlob, wrapCaption, type ConversionErrorCode } from '@/lib/applications/conversion';
import styles from './local-apps.module.css';

type Font = 'impact' | 'sans' | 'serif' | 'mono';
const fonts: Record<Font, string> = {
  impact: 'Impact, "Arial Black", sans-serif',
  sans: 'Arial, "Noto Sans", sans-serif',
  serif: 'Georgia, "Noto Serif", serif',
  mono: '"Courier New", monospace',
};
type Composition = { image: HTMLImageElement | null; top: string; bottom: string; size: number; font: Font; color: string; outline: string; stroke: number; uppercase: boolean };

function drawComposition(canvas: HTMLCanvasElement, composition: Composition): void {
  const { image, size, font, color, outline, stroke, uppercase } = composition;
  const scale = image ? Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight)) : 1;
  canvas.width = image ? Math.max(1, Math.round(image.naturalWidth * scale)) : 1200;
  canvas.height = image ? Math.max(1, Math.round(image.naturalHeight * scale)) : 800;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('canvas');
  const { width, height } = canvas;
  if (image) context.drawImage(image, 0, 0, width, height);
  else {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#122339'); gradient.addColorStop(.52, '#244798'); gradient.addColorStop(1, '#7566b2');
    context.fillStyle = gradient; context.fillRect(0, 0, width, height);
    context.save(); context.translate(width * .51, height * .5); context.rotate(-.16);
    context.fillStyle = '#ffffff0d'; context.fillRect(-260, -160, 520, 320);
    context.strokeStyle = '#ffffff35'; context.lineWidth = 2;
    for (let index = 0; index < 4; index++) context.strokeRect(-220 + index * 32, -130 + index * 24, 320, 180);
    context.fillStyle = '#edbc65'; context.fillRect(-38, -38, 76, 76);
    context.restore();
    context.strokeStyle = '#ffffff12'; context.lineWidth = 1;
    for (let x = 0; x < width; x += 80) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
    for (let y = 0; y < height; y += 80) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }
  }
  context.textAlign = 'center'; context.textBaseline = 'top'; context.lineJoin = 'round';
  context.fillStyle = color; context.strokeStyle = outline;
  const margin = Math.min(width, height) * .045;
  function caption(value: string, position: 'top' | 'bottom') {
    if (!value.trim()) return;
    const text = uppercase ? value.toLocaleUpperCase() : value;
    let pixels = Math.min(size * width / 800, height * .16);
    let lines: string[] = [];
    // A bounded fit pass keeps both captions within their own 36% region.
    for (let attempt = 0; attempt < 80; attempt++) {
      context!.font = `900 ${pixels}px ${fonts[font]}`;
      lines = wrapCaption(context!, text, width - 2 * margin);
      if (lines.length * pixels * 1.18 <= height * .36) break;
      pixels *= .9;
    }
    context!.lineWidth = stroke * pixels / 50;
    const lineHeight = pixels * 1.18;
    const start = position === 'top' ? margin : height - margin - lines.length * lineHeight;
    lines.forEach((line, index) => {
      const y = start + index * lineHeight;
      if (stroke > 0) context!.strokeText(line, width / 2, y, width - margin * 2);
      context!.fillText(line, width / 2, y, width - margin * 2);
    });
  }
  caption(composition.top, 'top'); caption(composition.bottom, 'bottom');
}

export function MemeGenerator({ locale }: { locale: Locale }) {
  const t = appCopy[locale];
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [name, setName] = useState('');
  const [top, setTop] = useState(t.defaultTop);
  const [bottom, setBottom] = useState(t.defaultBottom);
  const [font, setFont] = useState<Font>('impact');
  const [size, setSize] = useState(58);
  const [color, setColor] = useState('#ffffff');
  const [outline, setOutline] = useState('#10223a');
  const [stroke, setStroke] = useState(4);
  const [uppercase, setUppercase] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [error, setError] = useState<ConversionErrorCode | null>(null);
  const [dragging, setDragging] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const epoch = useRef(0);
  const exportBusy = useRef(false);
  const composition: Composition = { image, top, bottom, size, font, color, outline, stroke, uppercase };
  useEffect(() => {
    if (!canvas.current) return;
    try { drawComposition(canvas.current, { image, top, bottom, size, font, color, outline, stroke, uppercase }); }
    catch { setError('encode'); }
  }, [image, top, bottom, size, font, color, outline, stroke, uppercase]);
  useEffect(() => () => { epoch.current++; }, []);
  function edit() { setExported(false); }
  async function upload(file: File) {
    const version = ++epoch.current;
    setLoading(true); setError(null); setExported(false); setExporting(false); exportBusy.current = false;
    try {
      const decoded = await loadLocalImage(file);
      if (version === epoch.current) { setImage(decoded); setName(file.name); }
    } catch (cause) { if (version === epoch.current) setError(errorCode(cause)); }
    finally { if (version === epoch.current) setLoading(false); }
  }
  function reset() {
    epoch.current++; setLoading(false); setExporting(false); exportBusy.current = false;
    setImage(null); setName(''); setTop(t.defaultTop); setBottom(t.defaultBottom); setFont('impact'); setSize(58); setColor('#ffffff'); setOutline('#10223a'); setStroke(4); setUppercase(true); setError(null); setExported(false); setDragging(false);
    if (input.current) input.current.value = '';
  }
  async function exportPng() {
    if (loading || exportBusy.current) return;
    exportBusy.current = true; setExporting(true); setError(null); setExported(false);
    const version = epoch.current;
    // Draw a fresh snapshot, so export never races the preview effect or a previous edit.
    const snapshot = document.createElement('canvas');
    try {
      drawComposition(snapshot, composition);
      const blob = await canvasBlob(snapshot, 'png');
      if (version === epoch.current) { saveBlob(blob, 'meme.png'); setExported(true); }
    } catch (cause) { if (version === epoch.current) setError(errorCode(cause)); }
    finally { snapshot.width = 0; snapshot.height = 0; if (version === epoch.current) { setExporting(false); exportBusy.current = false; } }
  }
  const imageScale = image ? Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight)) : 1;
  const dimensions = image ? `${Math.round(image.naturalWidth * imageScale)} × ${Math.round(image.naturalHeight * imageScale)}` : '1200 × 800';
  return <section className={styles.app} data-testid="meme-workbench" aria-label={t.memeTitle}>
    <div className={styles.topbar}><span className={styles.localBadge}><ShieldCheck size={16} aria-hidden="true" />{t.local}</span><span className={styles.hint}>PNG · 1600 px</span></div>
    <header className={styles.intro}><h2>{t.memeTitle}</h2><p>{t.memeSubtitle}</p></header>
    <div className={styles.memeGrid}>
      <div className={styles.memeControls}>
        <section className={styles.panel}><h3 className={styles.panelTitle}><ImagePlus size={18} aria-hidden="true" />{t.image}</h3>
          <button type="button" className={styles.secondary} onClick={() => input.current?.click()}><Upload size={17} aria-hidden="true" />{t.uploadImage}</button>
          <input ref={input} id="meme-file" type="file" className={styles.hiddenInput} tabIndex={-1} accept={IMAGE_ACCEPT} aria-label={t.uploadImage} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ''; }} />
          <p className={styles.hint}>{t.uploadNote}</p>
          <label className={styles.field} htmlFor="meme-top"><span>{t.top}<small>{top.length}/240</small></span><textarea id="meme-top" rows={2} maxLength={240} value={top} onChange={(event) => { edit(); setTop(event.target.value); }} /></label>
          <label className={styles.field} htmlFor="meme-bottom"><span>{t.bottom}<small>{bottom.length}/240</small></span><textarea id="meme-bottom" rows={2} maxLength={240} value={bottom} onChange={(event) => { edit(); setBottom(event.target.value); }} /></label>
        </section>
        <section className={styles.panel}><h3 className={styles.panelTitle}><Type size={18} aria-hidden="true" />{t.typography}</h3>
          <label className={styles.field} htmlFor="meme-font">{t.font}<select id="meme-font" value={font} onChange={(event) => { edit(); setFont(event.target.value as Font); }}>{(['impact', 'sans', 'serif', 'mono'] as const).map((family) => <option key={family} value={family}>{t[family]}</option>)}</select></label>
          <label className={styles.field} htmlFor="meme-font-size"><span>{t.fontSize}<output>{size}</output></span><input id="meme-font-size" type="range" min="20" max="100" value={size} onChange={(event) => { edit(); setSize(Number(event.target.value)); }} /></label>
          <div className={styles.colorGrid}><label className={styles.field} htmlFor="meme-text-color">{t.textColor}<div className={styles.colorInput}><input id="meme-text-color" type="color" value={color} onChange={(event) => { edit(); setColor(event.target.value); }} /><span>{color}</span></div></label><label className={styles.field} htmlFor="meme-outline-color">{t.strokeColor}<div className={styles.colorInput}><input id="meme-outline-color" type="color" value={outline} onChange={(event) => { edit(); setOutline(event.target.value); }} /><span>{outline}</span></div></label></div>
          <label className={styles.field} htmlFor="meme-outline-width"><span><Palette size={15} aria-hidden="true" />{t.stroke}<output>{stroke}</output></span><input id="meme-outline-width" type="range" min="0" max="10" step=".5" value={stroke} onChange={(event) => { edit(); setStroke(Number(event.target.value)); }} /></label>
          <label className={styles.checkbox}><input type="checkbox" checked={uppercase} onChange={(event) => { edit(); setUppercase(event.target.checked); }} />{t.uppercase}</label>
          <p className={styles.hint}>{t.captionNote}</p>
        </section>
      </div>
      <div className={styles.memeStage}>
        <div className={styles.previewHeader}><h3>{t.livePreview}</h3><span title={name || t.demo}>{name || t.demo}</span></div>
        <div className={`${styles.canvasFrame} ${dragging ? styles.dragging : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }} onDrop={(event) => { event.preventDefault(); setDragging(false); const file = event.dataTransfer.files[0]; if (file) void upload(file); }}>
          <canvas ref={canvas} id="meme-canvas" role="img" aria-label={`${t.canvasAlt}: ${top} / ${bottom}`}>{t.canvasFallback}</canvas>
          {loading && <div className={styles.loadingOverlay} role="status"><LoaderCircle size={24} className={styles.spin} aria-hidden="true" />{t.loading}</div>}
        </div>
        <div className={styles.exportMeta}><span>{t.exportSize}</span><strong>{dimensions} px · PNG</strong></div>
        {error && <p className={styles.error} role="alert"><XCircle size={18} aria-hidden="true" />{t.errors[error]}</p>}
        <div className={styles.footerActions}><button className={styles.secondary} type="button" onClick={reset}><RotateCcw size={17} aria-hidden="true" />{t.resetMeme}</button><button className={styles.primary} type="button" disabled={loading || exporting} onClick={() => void exportPng()}>{exporting ? <LoaderCircle className={styles.spin} size={18} aria-hidden="true" /> : <ArrowDownToLine size={18} aria-hidden="true" />}{exporting ? t.exporting : t.export}</button></div>
        <p className={styles.notice} aria-live="polite">{exported ? t.exported : ''}</p>
        <p className={styles.privacy}><ShieldCheck size={16} aria-hidden="true" />{t.localNote}</p>
      </div>
    </div>
  </section>;
}
export const MemeGeneratorTool = MemeGenerator;
