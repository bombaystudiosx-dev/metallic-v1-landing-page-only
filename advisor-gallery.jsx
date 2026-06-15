/* global React */
const { useState, useRef, useEffect } = React;

const ADVISORS = [
  {
    id: 'analyst',
    number: '01',
    name: 'Analyst',
    subtitle: 'Precision',
    icon: '📊',
    description: 'Quantitative by default. Cites trade-offs. Builds the spreadsheet in its head and shows the match when asked. Use when you need clarity, not comfort.',
    image: 'assets/advisor-analyst.png',
    strengths: ['Data clarity', 'Trade-off analysis', 'Financial modeling', 'Risk assessment', 'Scenario planning'],
    bestFor: 'Budgets, pricing, forecasts, business cases, metrics, and any decision that needs a clear answer.',
    color: '#60a5fa'
  },
  {
    id: 'muse',
    number: '02',
    name: 'Muse',
    subtitle: 'Evocative',
    icon: '✨',
    description: 'Poetic and brief. Speaks in image and metaphor. Useful for naming things, taglines, copy, manifestos, and moments where precision would kill the feeling.',
    image: 'assets/advisor-muse.png',
    strengths: ['Creative expression', 'Emotional resonance', 'Storytelling', 'Brand voice', 'Naming', 'Persuasion'],
    bestFor: 'Taglines, brand names, ad copy, manifestos, product naming, poetry, positioning, and any moment that needs soul.',
    color: '#d4956e'
  },
  {
    id: 'architect',
    number: '03',
    name: 'Architect',
    subtitle: 'Systems',
    icon: '🏗️',
    description: 'Thinks in components, contracts, and failure modes. Drafts diagrams. Owns the long-term shape. Use when you need to see how things break before you build them.',
    image: 'assets/advisor-architect.png',
    strengths: ['Systems design', 'Scalability planning', 'Risk mapping', 'Failure mode analysis', 'Technical strategy'],
    bestFor: 'Architecture, product strategy, platform design, infrastructure, APIs, org design, and any decision with long-term consequences.',
    color: '#34d399'
  },
  {
    id: 'operator',
    number: '04',
    name: 'Operator',
    subtitle: 'Tactical',
    icon: '⚡',
    description: 'Cuts to next actions. Bullet points only. Useful when you\'re moving fast, the calendar is full, and decisions need to happen in the next 10 minutes.',
    image: 'assets/advisor-operator.png',
    strengths: ['Prioritization', 'Decision velocity', 'Execution focus', 'Time management', 'Action planning'],
    bestFor: 'Daily planning, sprint planning, firefighting, task triage, operational decisions, and any moment that demands action.',
    color: '#c084fc'
  },
  {
    id: 'mentor',
    number: '05',
    name: 'Mentor',
    subtitle: 'Reflective',
    icon: '🧭',
    description: 'Mirrors back what it hears before offering anything. One small step at a time. Speaks slowly, on purpose. Use when you know the answer but need to hear yourself think.',
    image: 'assets/advisor-mentor.png',
    strengths: ['Active listening', 'Clarity through reflection', 'Gentle guidance', 'Emotional intelligence', 'Self-awareness'],
    bestFor: 'Personal growth, mindset shifts, difficult decisions, career & life transitions, and moments of self-doubt or mental clutter.',
    color: '#34d399'
  },
  {
    id: 'skeptic',
    number: '06',
    name: 'Skeptic',
    subtitle: 'Adversarial',
    icon: '❌',
    description: 'Finds the hidden assumption. Respectfully cutting. Calibrated to disagree, not to please. Use before a board meeting, investor call, or any decision you\'re too close to.',
    image: 'assets/advisor-skeptic.png',
    strengths: ['Assumption detection', 'Risk identification', 'Logical rigor', 'Devil\'s advocate', 'Bias interruption', 'Decision resilience'],
    bestFor: 'High-stakes decisions, strategy validation, risk reviews, investor presentations, board meetings, and moments of overconfidence.',
    color: '#f87171'
  }
];

function ExpandedAdvisor({ advisor, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#000',
          border: '1px solid rgba(52, 211, 153, 0.2)',
          borderRadius: '16px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
        }}
      >
        <div style={{ position: 'sticky', top: 0, height: 'fit-content' }}>
          <img
            src={advisor.image}
            alt={advisor.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '16px',
              display: 'block',
            }}
          />
        </div>

        <div style={{ padding: '40px 40px 40px 0' }}>
          <div style={{ fontSize: '12px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--em-bright)', marginBottom: '12px' }}>
            {advisor.number}
          </div>
          <h2 style={{ fontSize: '48px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px', margin: '0 0 8px 0' }}>
            {advisor.name}
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--em-bright)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>
            {advisor.subtitle}
          </p>

          <p style={{ fontSize: '15px', color: 'var(--text-dim)', lineHeight: '1.7', marginBottom: '32px' }}>
            {advisor.description}
          </p>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', marginBottom: '12px', margin: '0 0 12px 0' }}>
              Strengths
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
              {advisor.strengths.map((strength, i) => (
                <li key={i} style={{ fontSize: '14px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--em-bright)' }}>✓</span> {strength}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', marginBottom: '12px', margin: '0 0 12px 0' }}>
              Best For
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.6', margin: 0 }}>
              {advisor.bestFor}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              color: 'var(--text)',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.15)';
              e.target.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function AdvisorGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 640);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => direction === 'next' ? (prev + 1) % ADVISORS.length : (prev - 1 + ADVISORS.length) % ADVISORS.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 'next' : 'prev');
    }
  };

  const getRole = (index) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex - 1 + ADVISORS.length) % ADVISORS.length) return 'left';
    if (index === (activeIndex + 1) % ADVISORS.length) return 'right';
    return 'back';
  };

  const getStyles = (role) => {
    const baseTransition = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)';
    
    if (role === 'center') {
      return {
        transform: `translateX(-50%) scale(1.5)`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: '75%',
        bottom: '8%',
        transition: baseTransition,
        willChange: 'transform, filter, opacity',
      };
    } else if (role === 'left') {
      return {
        transform: 'translateX(-50%) scale(0.9)',
        filter: 'blur(1.5px)',
        opacity: 0.7,
        zIndex: 10,
        left: '22%',
        height: '45%',
        bottom: '18%',
        transition: baseTransition,
        willChange: 'transform, filter, opacity',
      };
    } else if (role === 'right') {
      return {
        transform: 'translateX(-50%) scale(0.9)',
        filter: 'blur(1.5px)',
        opacity: 0.7,
        zIndex: 10,
        left: '78%',
        height: '45%',
        bottom: '18%',
        transition: baseTransition,
        willChange: 'transform, filter, opacity',
      };
    } else {
      return {
        transform: 'translateX(-50%) scale(0.75)',
        filter: 'blur(3px)',
        opacity: 0.4,
        zIndex: 5,
        left: '50%',
        height: '30%',
        bottom: '15%',
        transition: baseTransition,
        willChange: 'transform, filter, opacity',
      };
    }
  };

  const expandedAdvisor = ADVISORS.find(a => a.id === expandedId);

  if (isMobile) {
    return (
      <section style={{ padding: '60px 0', background: '#000' }}>
        <div className="shell">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              fontSize: '10px',
              fontFamily: 'var(--mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--text-mute)',
              marginBottom: '20px',
            }}>
              ADVISORS
            </div>
            <h2 className="section-title" style={{ marginBottom: '20px' }}>
              Synthetic Executive Intelligence
            </h2>
            <p style={{
              fontSize: '15px',
              color: 'var(--text-dim)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              Six specialized cognitive perspectives designed to challenge assumptions and improve decision quality.
            </p>
          </div>

          <div
            style={{
              position: 'relative',
              height: '520px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              onClick={() => setExpandedId(ADVISORS[activeIndex].id)}
              style={{
                position: 'relative',
                zIndex: 10,
                width: '85%',
                maxWidth: '340px',
                height: '450px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 'var(--r-xl)',
                  overflow: 'hidden',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  boxShadow: '0 20px 60px rgba(16,185,129,0.2)',
                  transition: 'all 0.3s ease-out',
                }}
              >
                <img
                  src={ADVISORS[activeIndex].image}
                  alt={ADVISORS[activeIndex].name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{
                position: 'absolute',
                bottom: '-70px',
                left: 0,
                right: 0,
                textAlign: 'center',
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'var(--text)',
                  margin: '0 0 4px 0',
                }}>
                  {ADVISORS[activeIndex].name}
                </h3>
                <p style={{
                  fontSize: '12px',
                  fontFamily: 'var(--mono)',
                  color: 'var(--em-bright)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  margin: 0,
                }}>
                  {ADVISORS[activeIndex].subtitle}
                </p>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '90px',
          }}>
            {ADVISORS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: i === activeIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === activeIndex ? 'var(--em)' : 'var(--border)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          <p style={{
            fontSize: '12px',
            color: 'var(--text-mute)',
            textAlign: 'center',
            marginTop: '24px',
          }}>
            Tap dots to explore · Click card to expand
          </p>
        </div>

        {expandedAdvisor && (
          <ExpandedAdvisor advisor={expandedAdvisor} onClose={() => setExpandedId(null)} />
        )}
      </section>
    );
  }

  return (
    <section style={{ padding: '80px 0', background: '#000', position: 'relative', overflow: 'hidden' }}>
      <div className="shell">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            fontSize: '10px',
            fontFamily: 'var(--mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-mute)',
            marginBottom: '20px',
          }}>
            ADVISORS
          </div>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>
            Synthetic Executive Intelligence
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-dim)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Six specialized cognitive perspectives designed to challenge assumptions and improve decision quality.
          </p>
        </div>

        <div style={{
          position: 'relative',
          height: '650px',
          marginBottom: '60px',
          perspective: '1000px',
          cursor: 'grab',
          userSelect: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
          {ADVISORS.map((advisor, index) => {
            const role = getRole(index);
            const styles = getStyles(role);
            return (
              <div
                key={advisor.id}
                onClick={() => role === 'center' && setExpandedId(advisor.id)}
                style={{
                  position: 'absolute',
                  aspectRatio: '1 / 1',
                  cursor: role === 'center' ? 'pointer' : 'default',
                  ...styles,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 'var(--r-xl)',
                    overflow: 'hidden',
                    border: '1px solid rgba(52, 211, 153, 0.2)',
                    background: '#0a0a0a',
                  }}
                >
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      draggable: false,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '40px',
        }}>
          {ADVISORS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === activeIndex ? 'var(--em)' : 'var(--border)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        <p style={{
          fontSize: '12px',
          color: 'var(--text-mute)',
          textAlign: 'center',
        }}>
          Swipe or tap dots to explore · Click center card to expand
        </p>
      </div>

      {expandedAdvisor && (
        <ExpandedAdvisor advisor={expandedAdvisor} onClose={() => setExpandedId(null)} />
      )}
    </section>
  );
}

Object.assign(window, { AdvisorGallery });
