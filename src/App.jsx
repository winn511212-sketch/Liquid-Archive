import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Layers3,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import './App.css'

const stats = [
  { value: '2.4M+', label: 'assets archived' },
  { value: '99.98%', label: 'delivery uptime' },
  { value: '4.9/5', label: 'client satisfaction' },
]

const features = [
  {
    icon: Layers3,
    title: 'Unified media vault',
    description: 'Keep campaigns, reels, brand files and approvals in one premium archive that feels effortless to manage.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure access control',
    description: 'Set role-based permissions, watermarking and review checkpoints to protect what matters most.',
  },
  {
    icon: Zap,
    title: 'Instant search + retrieval',
    description: 'Find any asset in seconds with AI-powered search, smart tagging and version history.',
  },
]

const collections = [
  { title: 'Brand systems', tag: 'Design', accent: 'sunset' },
  { title: 'Campaign refreshes', tag: 'Marketing', accent: 'violet' },
  { title: 'Motion libraries', tag: 'Video', accent: 'ice' },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'For independent creators and fast-moving studios.',
    features: ['10 shared collections', 'Smart tagging', 'Brand-safe sharing'],
    isFeatured: false,
  },
  {
    name: 'Studio',
    price: '$79',
    description: 'For teams that need premium level flow and control.',
    features: ['Unlimited projects', 'Approval workflows', 'Priority support'],
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Built for large-scale creative operations and compliance.',
    features: ['Custom onboarding', 'SSO and security reviews', 'Dedicated success manager'],
    isFeatured: false,
  },
]

const testimonials = [
  {
    quote:
      'Liquid Archive turned our chaotic delivery process into a premium system our team actually enjoys using.',
    name: 'Nina Sol',
    role: 'Creative Director, Vanta House',
  },
  {
    quote:
      'We cut down asset retrieval time from hours to minutes and the client experience immediately felt more elevated.',
    name: 'Dorian Lee',
    role: 'Managing Partner, Northline Studio',
  },
]

const brands = ['AETHER', 'NOVA', 'LUMA', 'MONO', 'VANTA']

const demoVideoUrl = 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0'

function App() {
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[1])
  const [checkoutVisible, setCheckoutVisible] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [demoOpen, setDemoOpen] = useState(false)

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    setCheckoutVisible(true)
    setTimeout(() => {
      document.getElementById('checkout-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
  }

  const handleBookDemo = () => {
    setSelectedPlan(pricingPlans[1])
    setCheckoutVisible(true)
    setTimeout(() => {
      document.getElementById('checkout-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
  }

  const handleSecureCheckout = () => {
    setCheckoutVisible(true)
    setTimeout(() => {
      document.getElementById('checkout-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand" aria-label="Liquid Archive home">
          <span className="brand-mark">
            <Droplets size={18} />
          </span>
          Liquid Archive
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#collections">Collections</a>
          <a href="#pricing">Pricing</a>
          <a href="#reviews">Reviews</a>
        </nav>

        <button className="nav-cta" type="button" onClick={handleBookDemo}>
          Book a demo
        </button>
      </header>

      <main className="content">
        <section className="hero section">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={16} />
              Premium asset management for creative teams
            </span>

            <h1>Turn your digital workspace into a luxury archive.</h1>

            <p className="hero-text">
              Store, organize and deliver every brand asset faster with a polished system built for teams who care about speed,
              consistency and status.
            </p>

            <div className="cta-row">
              <a href="#pricing" className="primary-btn">
                Get started
                <ArrowRight size={18} />
              </a>
              <button type="button" className="secondary-btn" onClick={() => setDemoOpen(true)}>
                <Play size={16} />
                Watch demo
              </button>
            </div>

            <div className="trust-row" aria-label="Client trust indicators">
              <span>Trusted by modern studios</span>
              <div className="brand-strip" aria-hidden="true">
                {brands.map((brand) => (
                  <span key={brand}>{brand}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-visual" id="demo" aria-label="Product preview dashboard">
            <div className="dashboard-window">
              <div className="window-header">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="window-label">liquid archive</span>
              </div>

              <div className="dashboard-body">
                <div className="mini-metrics">
                  <div className="mini-card">
                    <span>Files indexed</span>
                    <strong>24.8k</strong>
                  </div>
                  <div className="mini-card accent">
                    <span>Active team</span>
                    <strong>148</strong>
                  </div>
                </div>

                <div className="chart-panel">
                  <div className="chart-header">
                    <span>Archive health</span>
                    <span className="positive">+18.2%</span>
                  </div>
                  <div className="bars" aria-hidden="true">
                    <span style={{ height: '38%' }} />
                    <span style={{ height: '52%' }} />
                    <span style={{ height: '68%' }} />
                    <span style={{ height: '84%' }} />
                    <span style={{ height: '60%' }} />
                    <span style={{ height: '92%' }} />
                    <span style={{ height: '100%' }} />
                  </div>
                </div>

                <div className="asset-list">
                  {['Campaign kit', 'Brand system', 'Motion reel', 'Client assets'].map((item, index) => (
                    <div className="asset-item" key={item}>
                      <div className="asset-badge">{index + 1}</div>
                      <div>
                        <strong>{item}</strong>
                        <small>Updated 2h ago</small>
                      </div>
                      <span className="status">Ready</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-grid section-sm">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="features section" id="features">
          <div className="section-heading">
            <span className="eyebrow dark">Built for clarity and speed</span>
            <h2>Everything your creative operation needs to scale.</h2>
          </div>

          <div className="feature-grid">
            {features.map(({ icon: Icon, title, description }) => (
              <div className="feature-card" key={title}>
                <div className="icon-wrap">
                  <Icon size={20} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="spotlight section" id="collections">
          <div className="spotlight-copy">
            <span className="eyebrow dark">Collections that feel premium</span>
            <h2>Organize every creative layer without losing momentum.</h2>
            <p>
              Create structured archives for campaigns, ever-growing visual libraries and client deliverables without sacrificing clarity.
            </p>
            <ul className="check-list">
              {['Granular access levels', 'Version-aware approvals', 'Fast delivery workflows'].map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="collection-grid">
            {collections.map(({ title, tag, accent }) => (
              <article className={`collection-card ${accent}`} key={title}>
                <span className="collection-tag">{tag}</span>
                <h3>{title}</h3>
                <div className="collection-footer">
                  <span>Open collection</span>
                  <ChevronRight size={18} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section pricing" id="pricing">
          <div className="section-heading center">
            <span className="eyebrow dark">Simple pricing</span>
            <h2>Choose the plan that fits your creative flow.</h2>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map(({ name, price, description, features, isFeatured }) => (
              <article className={`price-card ${isFeatured ? 'featured' : ''}`} key={name}>
                <div className="price-head">
                  <span>{name}</span>
                  {isFeatured && <span className="badge">Most popular</span>}
                </div>
                <div className="price-value">{price}<small>/mo</small></div>
                <p>{description}</p>
                <ul>
                  {features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={isFeatured ? 'price-button featured-button' : 'price-button'}
                  onClick={() => handlePlanSelect({ name, price, description, features, isFeatured })}
                >
                  {selectedPlan?.name === name ? 'Selected' : 'Buy'}
                </button>
              </article>
            ))}
          </div>

          <div className="checkout-panel" id="checkout-panel" aria-live="polite">
            {checkoutVisible && selectedPlan ? (
              <>
                <div className="checkout-copy">
                  <span className="eyebrow dark">Selected plan</span>
                  <h3>{selectedPlan.name}</h3>
                  <p>{selectedPlan.description}</p>
                </div>

                <div className="checkout-price-box">
                  <span>Today</span>
                  <strong>{selectedPlan.price}</strong>
                  <small>/month</small>
                </div>

                <button type="button" className="primary-btn checkout-btn" onClick={handleSecureCheckout}>
                  Pay now
                  <ArrowRight size={18} />
                </button>

                <div className="payment-panel">
                  <div className="payment-methods" aria-label="Payment methods">
                    <button
                      type="button"
                      className={paymentMethod === 'card' ? 'method-btn active' : 'method-btn'}
                      onClick={() => setPaymentMethod('card')}
                    >
                      Card
                    </button>
                    <button
                      type="button"
                      className={paymentMethod === 'paypal' ? 'method-btn active' : 'method-btn'}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      PayPal
                    </button>
                  </div>

                  {paymentMethod === 'card' ? (
                    <div className="checkout-form">
                      <label>
                        Card number
                        <input type="text" value="4242 4242 4242 4242" readOnly aria-label="Card number" />
                      </label>
                      <div className="field-row">
                        <label>
                          Expiry
                          <input type="text" value="12/29" readOnly aria-label="Expiry date" />
                        </label>
                        <label>
                          CVC
                          <input type="text" value="248" readOnly aria-label="Security code" />
                        </label>
                      </div>
                      <label>
                        Cardholder name
                        <input type="text" value="ALEX MORGAN" readOnly aria-label="Cardholder name" />
                      </label>
                    </div>
                  ) : (
                    <div className="paypal-box">
                      <div className="paypal-icon">P</div>
                      <div>
                        <strong>PayPal checkout</strong>
                        <span>Secure account payment</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="checkout-empty-state">
                <span className="eyebrow dark">Choose a plan</span>
                <h3>Select a pricing tier to unlock checkout.</h3>
                <p>Pick any plan above and press Buy to open the payment form.</p>
              </div>
            )}
          </div>
        </section>

        <section className="section testimonials" id="reviews">
          <div className="section-heading center">
            <span className="eyebrow dark">Loved by high-performing teams</span>
            <h2>The confidence to ship beautiful work faster.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map(({ quote, name, role }) => (
              <article className="testimonial-card" key={name}>
                <div className="star-row" aria-label="Rating 5 out of 5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${name}-${index}`} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="quote">“{quote}”</p>
                <div className="person">
                  <div className="avatar">{name.charAt(0)}</div>
                  <div>
                    <strong>{name}</strong>
                    <span>{role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section cta-banner">
          <div className="cta-panel">
            <div>
              <span className="eyebrow dark">Ready to launch</span>
              <h2>Build a digital archive your clients will remember.</h2>
            </div>
            <button type="button" className="primary-btn large-btn" onClick={handleBookDemo}>
              Start your project
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand small">
          <span className="brand-mark">
            <Droplets size={16} />
          </span>
          Liquid Archive
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#reviews">Reviews</a>
        </div>
      </footer>

      {demoOpen && (
        <div className="demo-modal-backdrop" onClick={() => setDemoOpen(false)}>
          <div className="demo-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="demo-close-button" aria-label="Close demo video" onClick={() => setDemoOpen(false)}>
              ×
            </button>
            <div className="demo-modal-frame">
              <iframe
                src={demoVideoUrl}
                title="Liquid Archive product demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
