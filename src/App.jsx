import { useState, useEffect } from 'react'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&display=swap');
:root[data-theme='light'] { --bg:#e3e8ef; --hi:#fff; --lo:#b8c0cf; --tx:#2d3446; --mut:#7a8499; --ac:#5b6cff; --red:#f0506e; --ok:#12b886; --ov:rgba(60,70,90,.45) }
:root[data-theme='dark'] { --bg:#252a36; --hi:#303646; --lo:#1a1e27; --tx:#e6e9f2; --mut:#8d96ab; --ac:#8b97ff; --red:#ff7a93; --ok:#38d9a9; --ov:rgba(8,10,16,.65) }
:root { --out:8px 8px 16px var(--lo),-8px -8px 16px var(--hi); --sm:4px 4px 8px var(--lo),-4px -4px 8px var(--hi); --in:inset 4px 4px 8px var(--lo),inset -4px -4px 8px var(--hi) }
* { box-sizing:border-box; margin:0 }
body { background:var(--bg); color:var(--tx); font-family:'Sora',system-ui,sans-serif; min-height:100vh; transition:background .3s }
button, input, select { font:inherit; color:var(--tx) }
button { background:var(--bg); border:0; cursor:pointer }
button:focus-visible, input:focus-visible, select:focus-visible { outline:2px solid var(--ac); outline-offset:3px }
.app { max-width:1240px; margin:0 auto; padding:24px 20px 80px }
.bar { display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:28px }
.logo { font-size:1.7rem; font-weight:800; letter-spacing:-.03em; margin-right:auto }
.logo span { color:var(--ac) }
.field { padding:12px 16px; border:0; border-radius:16px; background:var(--bg); box-shadow:var(--in); width:100% }
.search { flex:1 1 260px; max-width:420px }
.btn { padding:11px 18px; border-radius:16px; font-weight:600; box-shadow:var(--sm); position:relative; transition:box-shadow .15s }
.btn:active, .btn.on { box-shadow:var(--in) } .btn.on { color:var(--ac) }
.btn.main { color:var(--ac) } .btn:disabled { opacity:.45; cursor:not-allowed }
.badge { position:absolute; top:-8px; right:-8px; min-width:22px; height:22px; border-radius:99px; background:var(--ac); color:#fff; font-size:.7rem; display:grid; place-items:center; padding:0 6px }
.card { background:var(--bg); border-radius:26px; padding:24px; box-shadow:var(--out) }
.hero { display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; margin-bottom:30px }
.hero h1 { font-size:clamp(1.5rem,3vw,2.2rem); font-weight:800; letter-spacing:-.03em; max-width:560px }
.hero p { color:var(--mut); margin-top:10px; font-size:.9rem }
.hero code { padding:3px 10px; border-radius:10px; box-shadow:var(--in); color:var(--ac); font-weight:600 }
.hero .big { font-size:4.5rem; width:130px; height:130px; display:grid; place-items:center; border-radius:50%; box-shadow:var(--in) }
.shop { display:grid; grid-template-columns:260px 1fr; gap:28px; align-items:start }
.side { position:sticky; top:16px; display:grid; gap:20px }
.side h3 { font-size:.85rem; color:var(--mut); font-weight:600; margin-bottom:10px }
.cats { display:grid; gap:10px }
.cats .btn { text-align:left; padding:10px 14px; font-size:.85rem; font-weight:400 }
.cats .btn.on { font-weight:600 }
.row { display:flex; justify-content:space-between; align-items:center; gap:10px }
.chk { display:flex; align-items:center; gap:10px; font-size:.85rem; cursor:pointer }
.chk input { appearance:none; width:22px; height:22px; border-radius:7px; box-shadow:var(--in); background:var(--bg); display:grid; place-items:center; cursor:pointer }
.chk input:checked::after { content:'✓'; color:var(--ac); font-weight:800; font-size:.8rem }
input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:12px; border-radius:99px; background:var(--bg); box-shadow:var(--in) }
input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:24px; height:24px; border-radius:50%; background:var(--bg); box-shadow:var(--sm); border:3px solid var(--ac) }
input[type=range]::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:var(--bg); border:3px solid var(--ac) }
.top { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; gap:12px; flex-wrap:wrap }
.top span { color:var(--mut); font-size:.85rem } .top select { width:auto; padding:10px 14px }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:26px }
.prod { padding:18px; display:flex; flex-direction:column }
.pic { position:relative; height:140px; border-radius:20px; box-shadow:var(--in); display:grid; place-items:center; font-size:4rem; cursor:pointer; margin-bottom:14px }
.off { position:absolute; top:10px; left:10px; background:var(--red); color:#fff; font-size:.68rem; font-weight:600; padding:3px 9px; border-radius:99px }
.heart { position:absolute; top:6px; right:6px; width:36px; height:36px; border-radius:50%; box-shadow:var(--sm); font-size:1.05rem; color:var(--mut) } .heart.on { color:var(--red) }
.prod h4 { font-size:.92rem; cursor:pointer } .prod .meta { font-size:.74rem; color:var(--mut); margin:4px 0 10px }
.stars { color:#f5a623; letter-spacing:1px }
.price { font-weight:800; font-size:1.02rem } .old { font-size:.75rem; color:var(--mut); text-decoration:line-through; margin-left:6px; font-weight:400 }
.prod .row:last-child { margin-top:auto; padding-top:14px }
.empty { text-align:center; color:var(--mut); padding:50px 10px }
.ov { position:fixed; inset:0; background:var(--ov); z-index:50; display:grid; place-items:center; padding:16px }
.ov.right { place-items:stretch end; padding:0 }
.modal { width:min(720px,100%); max-height:92vh; overflow:auto; display:grid; grid-template-columns:1fr 1fr; gap:26px }
.modal .pic { height:260px; font-size:7rem; cursor:default; margin:0 }
.modal h2 { font-size:1.35rem; margin:6px 0 8px } .modal p { color:var(--mut); font-size:.88rem; line-height:1.6; margin:12px 0 }
.qty { display:inline-flex; align-items:center; gap:12px } .qty b { min-width:22px; text-align:center }
.qty button { width:34px; height:34px; border-radius:11px; box-shadow:var(--sm); font-weight:800 }
.drawer { width:min(440px,100%); height:100vh; border-radius:26px 0 0 26px; overflow:auto; display:flex; flex-direction:column; gap:16px }
.drawer h2 { display:flex; justify-content:space-between; align-items:center; font-size:1.15rem }
.x { width:36px; height:36px; border-radius:12px; box-shadow:var(--sm); font-size:1.1rem }
.item { display:grid; grid-template-columns:54px 1fr; gap:14px; align-items:center; padding:12px; border-radius:18px; box-shadow:var(--sm) }
.item .pic { height:54px; font-size:1.8rem; margin:0; border-radius:14px }
.item h4 { font-size:.85rem } .item .row { margin-top:8px }
.sum { display:grid; gap:10px; font-size:.88rem; padding-top:6px } .sum .row span:first-child { color:var(--mut) }
.sum .tot { font-size:1.15rem; font-weight:800 } .sum .tot span:first-child { color:var(--tx) }
.promo { display:flex; gap:10px } .promo .field { padding:10px 14px }
.err { color:var(--red); font-size:.74rem; margin-top:5px }
.form { display:grid; gap:14px } .form label { font-size:.78rem; color:var(--mut); display:block; margin-bottom:6px }
.done { text-align:center; padding:30px 0; display:grid; gap:12px; justify-items:center } .done .big { font-size:4rem }
.toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); z-index:80; padding:13px 22px; border-radius:16px; background:var(--bg); box-shadow:var(--out); font-size:.88rem; font-weight:600 }
@media (max-width:860px) { .shop { grid-template-columns:1fr } .side { position:static } .modal { grid-template-columns:1fr } .modal .pic { height:180px; font-size:5rem } }
@media (prefers-reduced-motion:reduce) { * { transition:none !important } }
`

const P = [
  { id: 1, n: 'Simsiz quloqchin Pro', c: 'Elektronika', p: 690000, o: 890000, r: 4.7, s: 14, e: '🎧', d: 'Shovqinni yo‘qotish, 30 soatlik batareya va tez zaryadlash.' },
  { id: 2, n: 'Smart soat Fit 3', c: 'Elektronika', p: 1290000, o: 1590000, r: 4.5, s: 8, e: '⌚', d: 'Yurak urishi, uyqu va qadamlarni kuzatadi. Suvdan himoyalangan.' },
  { id: 3, n: 'Portativ kolonka Mini', c: 'Elektronika', p: 420000, o: 0, r: 4.3, s: 25, e: '🔊', d: 'Cho‘ntakka sig‘adigan, 12 soat ishlaydigan Bluetooth kolonka.' },
  { id: 4, n: 'Mexanik klaviatura', c: 'Elektronika', p: 780000, o: 950000, r: 4.8, s: 6, e: '⌨️', d: 'Yorug‘likli tugmalar, tez javob beruvchi mexanik switch.' },
  { id: 5, n: 'Planshet Tab 11', c: 'Elektronika', p: 3450000, o: 3900000, r: 4.6, s: 5, e: '📱', d: '11 dyuymli ekran, 128 GB xotira, o‘qish va ko‘rish uchun ideal.' },
  { id: 6, n: 'Qishki kurtka', c: 'Kiyim', p: 960000, o: 1250000, r: 4.4, s: 12, e: '🧥', d: 'Sovuqdan va shamoldan himoya qiladi, yengil va iliq.' },
  { id: 7, n: 'Klassik krossovka', c: 'Kiyim', p: 540000, o: 0, r: 4.2, s: 30, e: '👟', d: 'Kundalik kiyish uchun qulay, yengil taglik.' },
  { id: 8, n: 'Paxtali futbolka', c: 'Kiyim', p: 120000, o: 150000, r: 4.1, s: 60, e: '👕', d: '100% paxta, yuvilganda shakli buzilmaydi.' },
  { id: 9, n: 'Quyosh ko‘zoynagi', c: 'Kiyim', p: 230000, o: 0, r: 4.0, s: 18, e: '🕶️', d: 'UV-400 himoyasi, engil ramka.' },
  { id: 10, n: 'Kofe mashinasi', c: 'Uy-ro‘zg‘or', p: 1850000, o: 2200000, r: 4.7, s: 7, e: '☕', d: 'Bir tugma bilan espresso va kapuchino tayyorlaydi.' },
  { id: 11, n: 'Aqlli chiroq', c: 'Uy-ro‘zg‘or', p: 180000, o: 0, r: 4.4, s: 40, e: '💡', d: 'Telefondan rangi va yorqinligi boshqariladi.' },
  { id: 12, n: 'Robot changyutgich', c: 'Uy-ro‘zg‘or', p: 2990000, o: 3600000, r: 4.5, s: 4, e: '🤖', d: 'Xona xaritasini tuzadi va o‘zi tozalaydi.' },
  { id: 13, n: 'Termos 1 litr', c: 'Uy-ro‘zg‘or', p: 160000, o: 0, r: 4.6, s: 35, e: '🧴', d: 'Issiqni 12 soat, sovuqni 24 soat saqlaydi.' },
  { id: 14, n: 'Yoga gilami', c: 'Sport', p: 190000, o: 240000, r: 4.3, s: 22, e: '🧘', d: 'Sirpanmaydigan, qalinligi 8 mm.' },
  { id: 15, n: 'Gantel to‘plami', c: 'Sport', p: 480000, o: 0, r: 4.5, s: 10, e: '🏋️', d: 'Sozlanadigan og‘irlik, 2 dan 10 kg gacha.' },
  { id: 16, n: 'Velosiped dubulg‘asi', c: 'Sport', p: 310000, o: 380000, r: 4.2, s: 0, e: '⛑️', d: 'Yengil, shamollatish teshiklari bilan. Hozir tugagan.' },
]
const CATS = ['Hammasi', 'Elektronika', 'Kiyim', 'Uy-ro‘zg‘or', 'Sport']
const money = n => Math.round(n).toLocaleString('ru-RU') + ' so‘m'
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r))
const byId = id => P.find(x => x.id === id)

const useStore = (key, init) => {
  const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }, [key, v])
  return [v, setV]
}

export default function App() {
  const [dark, setDark] = useStore('ns-dark', false)
  const [cart, setCart] = useStore('ns-cart', {})
  const [wish, setWish] = useStore('ns-wish', [])
  const [orders, setOrders] = useStore('ns-orders', [])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Hammasi')
  const [sort, setSort] = useState('pop')
  const [max, setMax] = useState(4000000)
  const [stock, setStock] = useState(false)
  const [onlyWish, setOnlyWish] = useState(false)
  const [modal, setModal] = useState(null)
  const [mq, setMq] = useState(1)
  const [drawer, setDrawer] = useState(false)
  const [step, setStep] = useState('cart')
  const [promo, setPromo] = useState('')
  const [promoOk, setPromoOk] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', addr: '' })
  const [errs, setErrs] = useState({})
  const [last, setLast] = useState('')

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 1800); return () => clearTimeout(t) }, [toast])

  const add = (id, n = 1) => {
    const p = byId(id), cur = cart[id] || 0
    if (cur >= p.s) return setToast('Omborda bundan ortiq yo‘q')
    setCart({ ...cart, [id]: Math.min(p.s, cur + n) }); setToast(p.n + ' savatga qo‘shildi')
  }
  const change = (id, d) => {
    const n = (cart[id] || 0) + d
    if (n > byId(id).s) return setToast('Omborda bundan ortiq yo‘q')
    const c = { ...cart }; if (n <= 0) delete c[id]; else c[id] = n; setCart(c)
  }
  const like = id => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])

  let list = P.filter(p => (cat === 'Hammasi' || p.c === cat) && p.p <= max && (!stock || p.s > 0) && (!onlyWish || wish.includes(p.id)) && p.n.toLowerCase().includes(q.trim().toLowerCase()))
  list = [...list].sort((a, b) => sort === 'cheap' ? a.p - b.p : sort === 'exp' ? b.p - a.p : sort === 'rate' ? b.r - a.r : a.id - b.id)

  const items = Object.entries(cart).map(([id, n]) => ({ p: byId(+id), n }))
  const count = items.reduce((s, i) => s + i.n, 0)
  const sub = items.reduce((s, i) => s + i.p.p * i.n, 0)
  const disc = promoOk ? sub * 0.1 : 0
  const ship = sub === 0 || sub - disc >= 500000 ? 0 : 25000
  const total = sub - disc + ship

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'CHEGIRMA10') { setPromoOk(true); setToast('Promokod qo‘llandi: −10%') } else setToast('Promokod noto‘g‘ri')
  }
  const order = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Ismingizni yozing'
    if (form.phone.replace(/\D/g, '').length < 9) e.phone = 'Telefon raqami kamida 9 ta raqam bo‘lsin'
    if (form.addr.trim().length < 5) e.addr = 'Manzilni to‘liqroq yozing'
    setErrs(e)
    if (Object.keys(e).length) return
    const no = 'NS-' + Date.now().toString().slice(-6)
    setOrders([{ no, total, count, date: new Date().toLocaleDateString('uz-UZ'), items: items.map(i => i.p.e + ' ' + i.p.n + ' × ' + i.n) }, ...orders])
    setLast(no); setCart({}); setPromo(''); setPromoOk(false); setStep('done')
  }
  const openDrawer = s => { setStep(s); setDrawer(true) }

  return (
    <div className="app">
      <style>{css}</style>
      <header className="bar">
        <div className="logo">Neo<span>Shop</span></div>
        <input className="field search" placeholder="Mahsulot qidirish" value={q} onChange={e => setQ(e.target.value)} aria-label="Qidirish" />
        <button className="btn" onClick={() => setDark(!dark)}>{dark ? 'Kun' : 'Tun'}</button>
        <button className="btn" onClick={() => openDrawer('orders')}>Buyurtmalar</button>
        <button className="btn main" onClick={() => openDrawer('cart')}>Savat{count > 0 && <span className="badge">{count}</span>}</button>
      </header>

      <section className="card hero">
        <div>
          <h1>Yangi fasl, yangi narxlar. Ko‘p mahsulotga 25% gacha chegirma.</h1>
          <p>Savatda <code>CHEGIRMA10</code> promokodini yozing va qo‘shimcha 10% tejang. 500 000 so‘mdan ortiq xaridga yetkazib berish bepul.</p>
        </div>
        <div className="big">🛍️</div>
      </section>

      <div className="shop">
        <aside className="side">
          <div className="card">
            <h3>Kategoriya</h3>
            <div className="cats">
              {CATS.map(c => <button key={c} className={'btn ' + (cat === c ? 'on' : '')} onClick={() => setCat(c)}>{c}</button>)}
            </div>
          </div>
          <div className="card">
            <h3>Narx: {money(max)} gacha</h3>
            <input type="range" min="100000" max="4000000" step="50000" value={max} onChange={e => setMax(+e.target.value)} aria-label="Maksimal narx" />
            <div style={{ display: 'grid', gap: 14, marginTop: 20 }}>
              <label className="chk"><input type="checkbox" checked={stock} onChange={e => setStock(e.target.checked)} />Faqat mavjudlari</label>
              <label className="chk"><input type="checkbox" checked={onlyWish} onChange={e => setOnlyWish(e.target.checked)} />Sevimlilar ({wish.length})</label>
            </div>
          </div>
        </aside>

        <main>
          <div className="top">
            <span>{list.length} ta mahsulot topildi</span>
            <select className="field" value={sort} onChange={e => setSort(e.target.value)} aria-label="Saralash">
              <option value="pop">Odatiy tartib</option>
              <option value="cheap">Avval arzonlari</option>
              <option value="exp">Avval qimmatlari</option>
              <option value="rate">Reyting bo‘yicha</option>
            </select>
          </div>
          {list.length === 0 ? (
            <div className="card empty">Hech narsa topilmadi. Filtrlarni o‘zgartirib ko‘ring.</div>
          ) : (
            <div className="grid">
              {list.map(p => (
                <article className="card prod" key={p.id}>
                  <div className="pic" onClick={() => { setModal(p.id); setMq(1) }}>
                    {p.e}
                    {p.o > 0 && <span className="off">−{Math.round((1 - p.p / p.o) * 100)}%</span>}
                    <button className={'heart ' + (wish.includes(p.id) ? 'on' : '')} aria-label="Sevimli" onClick={e => { e.stopPropagation(); like(p.id) }}>{wish.includes(p.id) ? '♥' : '♡'}</button>
                  </div>
                  <h4 onClick={() => { setModal(p.id); setMq(1) }}>{p.n}</h4>
                  <div className="meta"><span className="stars">{stars(p.r)}</span> {p.r} · {p.s > 0 ? p.s + ' ta bor' : 'Tugagan'}</div>
                  <div className="row">
                    <div className="price">{money(p.p)}{p.o > 0 && <span className="old">{money(p.o)}</span>}</div>
                  </div>
                  <div className="row">
                    <button className="btn main" style={{ width: '100%' }} disabled={p.s === 0} onClick={() => add(p.id)}>{p.s === 0 ? 'Tugagan' : 'Savatga'}</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {modal && (() => { const p = byId(modal); return (
        <div className="ov" onClick={() => setModal(null)}>
          <div className="card modal" onClick={e => e.stopPropagation()} role="dialog" aria-label={p.n}>
            <div className="pic">{p.e}</div>
            <div>
              <div className="row"><span className="stars">{stars(p.r)} {p.r}</span><button className="x" onClick={() => setModal(null)} aria-label="Yopish">×</button></div>
              <h2>{p.n}</h2>
              <div className="price">{money(p.p)}{p.o > 0 && <span className="old">{money(p.o)}</span>}</div>
              <p>{p.d}</p>
              <div className="meta" style={{ fontSize: '.8rem', color: 'var(--mut)', marginBottom: 18 }}>Kategoriya: {p.c} · Omborda: {p.s} ta</div>
              {p.s > 0 ? (
                <div className="row">
                  <div className="qty"><button onClick={() => setMq(Math.max(1, mq - 1))}>−</button><b>{mq}</b><button onClick={() => setMq(Math.min(p.s, mq + 1))}>+</button></div>
                  <button className="btn main" onClick={() => { add(p.id, mq); setModal(null) }}>Savatga · {money(p.p * mq)}</button>
                </div>
              ) : <div className="err">Bu mahsulot hozir tugagan</div>}
            </div>
          </div>
        </div>
      ) })()}

      {drawer && (
        <div className="ov right" onClick={() => setDrawer(false)}>
          <div className="card drawer" onClick={e => e.stopPropagation()}>
            <h2>{step === 'cart' ? 'Savat' : step === 'form' ? 'Buyurtma berish' : step === 'orders' ? 'Buyurtmalarim' : 'Rahmat'}<button className="x" onClick={() => setDrawer(false)} aria-label="Yopish">×</button></h2>

            {step === 'cart' && (items.length === 0 ? <div className="empty">Savat bo‘sh. Mahsulot tanlang.</div> : <>
              {items.map(({ p, n }) => (
                <div className="item" key={p.id}>
                  <div className="pic">{p.e}</div>
                  <div>
                    <h4>{p.n}</h4>
                    <div className="row">
                      <div className="qty"><button onClick={() => change(p.id, -1)}>−</button><b>{n}</b><button onClick={() => change(p.id, 1)}>+</button></div>
                      <span className="price" style={{ fontSize: '.85rem' }}>{money(p.p * n)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="promo">
                <input className="field" placeholder="Promokod" value={promo} onChange={e => setPromo(e.target.value)} />
                <button className="btn" onClick={applyPromo}>OK</button>
              </div>
              <div className="sum">
                <div className="row"><span>Mahsulotlar</span><span>{money(sub)}</span></div>
                {promoOk && <div className="row"><span>Promokod</span><span style={{ color: 'var(--ok)' }}>−{money(disc)}</span></div>}
                <div className="row"><span>Yetkazib berish</span><span>{ship === 0 ? 'Bepul' : money(ship)}</span></div>
                <div className="row tot"><span>Jami</span><span>{money(total)}</span></div>
              </div>
              <button className="btn main" onClick={() => setStep('form')}>Rasmiylashtirish</button>
            </>)}

            {step === 'form' && (
              <div className="form">
                <div><label>Ism</label><input className="field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />{errs.name && <div className="err">{errs.name}</div>}</div>
                <div><label>Telefon</label><input className="field" inputMode="tel" placeholder="+998 90 123 45 67" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />{errs.phone && <div className="err">{errs.phone}</div>}</div>
                <div><label>Manzil</label><input className="field" value={form.addr} onChange={e => setForm({ ...form, addr: e.target.value })} />{errs.addr && <div className="err">{errs.addr}</div>}</div>
                <div className="sum"><div className="row tot"><span>To‘lov (yetkazganda)</span><span>{money(total)}</span></div></div>
                <button className="btn main" onClick={order}>Buyurtmani tasdiqlash</button>
                <button className="btn" onClick={() => setStep('cart')}>Savatga qaytish</button>
              </div>
            )}

            {step === 'done' && (
              <div className="done">
                <div className="big">✅</div>
                <h3>Buyurtma qabul qilindi</h3>
                <p style={{ color: 'var(--mut)', fontSize: '.88rem' }}>Raqami: <b style={{ color: 'var(--tx)' }}>{last}</b>. Operator tez orada qo‘ng‘iroq qiladi.</p>
                <button className="btn main" onClick={() => setDrawer(false)}>Xaridni davom ettirish</button>
              </div>
            )}

            {step === 'orders' && (orders.length === 0 ? <div className="empty">Hali buyurtma yo‘q.</div> : orders.map(o => (
              <div className="item" key={o.no} style={{ gridTemplateColumns: '1fr' }}>
                <div className="row"><b>{o.no}</b><span style={{ fontSize: '.75rem', color: 'var(--mut)' }}>{o.date}</span></div>
                <div style={{ fontSize: '.78rem', color: 'var(--mut)', lineHeight: 1.7 }}>{o.items.map(t => <div key={t}>{t}</div>)}</div>
                <div className="row"><span style={{ fontSize: '.78rem' }}>{o.count} ta mahsulot</span><b>{money(o.total)}</b></div>
              </div>
            )))}
          </div>
        </div>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}