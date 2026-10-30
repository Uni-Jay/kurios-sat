import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './booking.css'

/**
 * Consultation booking powered by MaxHub (the company workspace). Clients see
 * real free times; the booking goes straight to the team's calendar, and the
 * client gets an email confirmation plus a reminder the day before.
 */
const API: string = (import.meta.env.VITE_MAXHUB_API as string | undefined) || 'https://maxhub-backend.onrender.com/api/public'

interface Service { name: string; minutes: number; modes: string[] }
interface Options { enabled: boolean; intro?: string; services: Service[]; location?: string; videoNote?: string; days: Array<{ date: string; open: boolean }> }

const dayLabel = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
const timeLabel = (t: string) => { const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}` }
const MODE_LABEL: Record<string, string> = { 'In person': 'At our office', 'Video call': 'Video call', 'Phone call': 'Phone call' }

export default function Booking({ brand, title = 'Book a consultation', intro, phone }: { brand: 'VM' | 'KS' | 'BM' | 'MF'; title?: string; intro?: string; phone?: string }) {
  const manage = new URLSearchParams(window.location.search).get('manage')
  const [opts, setOpts] = useState<Options | null>(null)
  const [f, setF] = useState({ name: '', phone: '', email: '', service: '', mode: '', date: '', time: '', notes: '' })
  const [slots, setSlots] = useState<string[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<{ code: string; when: string; service: string; mode: string } | null>(null)

  useEffect(() => {
    if (manage) return
    fetch(`${API}/bookings/${brand}/options`).then((r) => r.json()).then((b) => {
      const o: Options = b.data; setOpts(o)
      if (o?.enabled && o.services.length) setF((x) => ({ ...x, service: o.services[0].name, mode: o.services[0].modes[0] }))
    }).catch(() => setOpts({ enabled: false, services: [], days: [] }))
  }, [brand, manage])

  const loadSlots = (date: string, service: string) => {
    setSlots(null)
    fetch(`${API}/bookings/${brand}/slots?date=${date}&service=${encodeURIComponent(service)}`).then((r) => r.json()).then((b) => setSlots(b.data?.slots || [])).catch(() => setSlots([]))
  }
  useEffect(() => { if (f.date && f.service) loadSlots(f.date, f.service); else setSlots(null) }, [f.date, f.service]) // eslint-disable-line react-hooks/exhaustive-deps
  const svc = useMemo(() => opts?.services.find((s) => s.name === f.service), [opts, f.service])

  const submit = async (e: FormEvent) => {
    e.preventDefault(); setBusy(true); setError('')
    try {
      const r = await fetch(`${API}/bookings/${brand}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      const b = await r.json()
      if (!r.ok || b.success === false) { setError(b.message || 'Something went wrong — please try again.'); if (r.status === 409) { setF((x) => ({ ...x, time: '' })); loadSlots(f.date, f.service) } }
      else setDone(b.data)
    } catch { setError(`We could not reach our booking system.${phone ? ` Please call ${phone}.` : ''}`) }
    setBusy(false)
  }

  return (
    <section className="mx-book">
      <div className="mx-head">
        <span className="mx-eyebrow">Consultation</span>
        <h1>{title}</h1>
        <p>{intro || opts?.intro || 'Pick a service and a time that suits you. You get an instant email confirmation and a reminder the day before.'}</p>
      </div>
      <div className="mx-book-card">
        {manage ? <Manage token={manage} /> : done ? (
          <div className="mx-sent">
            <strong>You are booked in!</strong>
            <p>{done.service} — <b>{done.when}</b> ({MODE_LABEL[done.mode]?.toLowerCase() || done.mode}).</p>
            <p>We have emailed the details to {f.email}, with a link to cancel or rebook. Reference: <b>{done.code}</b>.</p>
            <button className="mx-btn" style={{ marginTop: '0.9rem' }} onClick={() => { setDone(null); setF({ ...f, date: '', time: '', notes: '' }) }}>Book another</button>
          </div>
        ) : !opts ? <p className="mx-muted-c">Loading available times…</p> : !opts.enabled || !opts.services.length ? (
          <p className="mx-muted-c">Online booking is not open right now.{phone ? <> Please call <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>.</> : ' Please contact us and we will arrange a time.'}</p>
        ) : (
          <form className="mx-form mx-book-form" onSubmit={submit}>
            <div className="mx-row">
              <label>What would you like to talk about?
                <select value={f.service} onChange={(e) => { const s = opts.services.find((x) => x.name === e.target.value); setF({ ...f, service: e.target.value, mode: s?.modes.includes(f.mode) ? f.mode : s?.modes[0] || '', time: '' }) }}>
                  {opts.services.map((s) => <option key={s.name} value={s.name}>{s.name} ({s.minutes} min)</option>)}
                </select>
              </label>
              <label>How would you like to meet?
                <select value={f.mode} onChange={(e) => setF({ ...f, mode: e.target.value })}>{(svc?.modes || []).map((m) => <option key={m} value={m}>{MODE_LABEL[m] || m}</option>)}</select>
              </label>
            </div>
            {f.mode === 'In person' && opts.location && <p className="mx-hint">Office: {opts.location}</p>}
            {f.mode === 'Video call' && opts.videoNote && <p className="mx-hint">{opts.videoNote}</p>}
            <div>
              <p className="mx-label">Choose a day</p>
              <div className="mx-days">
                {opts.days.filter((d) => d.open).slice(0, 21).map((d) => <button type="button" key={d.date} className={`mx-chip ${f.date === d.date ? 'on' : ''}`} onClick={() => setF({ ...f, date: d.date, time: '' })}>{dayLabel(d.date)}</button>)}
              </div>
            </div>
            {f.date && (
              <div>
                <p className="mx-label">Choose a time (Lagos time)</p>
                {slots === null ? <p className="mx-hint">Checking free times…</p> : !slots.length ? <p className="mx-hint">No free times left that day — please pick another day.</p> : (
                  <div className="mx-times">{slots.map((t) => <button type="button" key={t} className={`mx-chip ${f.time === t ? 'on' : ''}`} onClick={() => setF({ ...f, time: t })}>{timeLabel(t)}</button>)}</div>
                )}
              </div>
            )}
            <div className="mx-row">
              <label>Full name<input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
              <label>Phone<input required value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
            </div>
            <label>Email<input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
            <label>Anything we should know? (optional)<textarea rows={3} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></label>
            {error && <p className="mx-error">{error}</p>}
            <button className="mx-btn mx-wide" disabled={busy || !f.time}>{busy ? 'Booking…' : f.time ? `Book ${dayLabel(f.date)} at ${timeLabel(f.time)}` : 'Pick a day and time'}</button>
          </form>
        )}
      </div>
    </section>
  )
}

function Manage({ token }: { token: string }) {
  const [b, setB] = useState<any | null>(null)
  const [msg, setMsg] = useState('')
  useEffect(() => { fetch(`${API}/bookings/manage/${token}`).then((r) => r.json()).then((x) => (x.success === false ? setMsg(x.message) : setB(x.data))).catch(() => setMsg('Could not load your booking.')) }, [token])
  const cancel = async () => {
    if (!confirm('Cancel this consultation?')) return
    const r = await fetch(`${API}/bookings/manage/${token}/cancel`, { method: 'POST' }).then((x) => x.json())
    if (r.success === false) setMsg(r.message); else setB({ ...b, status: 'Cancelled', canCancel: false })
  }
  if (msg) return <p className="mx-muted-c">{msg}</p>
  if (!b) return <p className="mx-muted-c">Loading your booking…</p>
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Your booking</h3>
      <p><b>{b.service}</b> — {b.when} ({String(b.mode).toLowerCase()})</p>
      <p className="mx-hint">Reference {b.code} · Status: <b>{b.status}</b></p>
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        {b.canCancel && <button className="mx-btn mx-btn-outline" onClick={cancel}>Cancel this booking</button>}
        <a className="mx-btn" href="/book" style={{ textDecoration: 'none' }}>Book a new time</a>
      </div>
    </div>
  )
}
