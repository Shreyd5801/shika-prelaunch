/**
 * BelowFold — newspaper-style homepage sections.
 * Styled like the front page of a broadsheet: masthead repeats,
 * columns, classifieds, pull-quotes, a waitlist signup styled as
 * a coupon tear-out.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import JaggedSeparator from './JaggedSeparator';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function NpRule({ thick = false }) {
  return (
    <div style={{
      borderTop:    thick ? '3px solid #1a1208' : '1px solid rgba(26,18,8,0.25)',
      margin:       '14px 0',
    }} />
  );
}

function NpLabel({ children }) {
  return (
    <div style={{
      fontFamily:    'Oswald, sans-serif',
      fontWeight:    700,
      fontSize:      '10px',
      letterSpacing: '0.35em',
      color:         'rgba(26,18,8,0.5)',
      marginBottom:  6,
      textTransform: 'uppercase',
    }}>
      {children}
    </div>
  );
}

/* ── WAITLIST COUPON ─────────────────────────────────── */
function WaitlistCoupon() {
  return (
    <div style={{
      border:       '2px dashed #D81E2C',
      padding:      'clamp(24px,4vw,48px)',
      background:   '#ECE3CF',
      position:     'relative',
      maxWidth:     560,
      margin:       '0 auto',
    }}>
      {/* scissors icon */}
      <div style={{
        position:     'absolute',
        top:          -14,
        left:         '50%',
        transform:    'translateX(-50%)',
        background:   '#ECE3CF',
        padding:      '0 8px',
        fontSize:     20,
        color:        '#D81E2C',
      }}>✂</div>

      <div style={{
        fontFamily:    'Caveat, cursive',
        fontSize:      'clamp(13px,1.5vw,17px)',
        color:         '#8B3A3A',
        marginBottom:  8,
        textAlign:     'center',
      }}>
        — clip &amp; redeem your spot —
      </div>

      <div style={{
        fontFamily:    'Anton, sans-serif',
        fontSize:      'clamp(24px,3.5vw,44px)',
        lineHeight:     1,
        textAlign:     'center',
        letterSpacing: '0.03em',
        color:         '#1a1208',
        marginBottom:  4,
      }}>
        GET IN BEFORE<br/>
        <span style={{ color: '#E81B86' }}>IT'S TOO LATE.</span>
      </div>

      <div style={{
        fontFamily: 'Spectral, serif',
        fontStyle:  'italic',
        fontSize:   'clamp(12px,1.2vw,15px)',
        textAlign:  'center',
        color:      'rgba(26,18,8,0.6)',
        marginBottom: 24,
      }}>
        The cult has limited founding seats. Waitlist closes when we hit 10,000.
      </div>

      <form
        onSubmit={e => e.preventDefault()}
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <input
          type="email"
          placeholder="YOUR EMAIL ADDRESS"
          style={{
            background:    'transparent',
            border:        '1.5px solid rgba(26,18,8,0.4)',
            padding:       '12px 16px',
            fontFamily:    'Oswald, sans-serif',
            fontSize:      13,
            letterSpacing: '0.1em',
            color:         '#1a1208',
            outline:       'none',
          }}
          onFocus={e  => (e.target.style.borderColor = '#E81B86')}
          onBlur={e   => (e.target.style.borderColor = 'rgba(26,18,8,0.4)')}
        />
        <motion.button
          type="submit"
          whileHover={{ backgroundColor: '#c50f74' }}
          whileTap={{ scale: 0.97 }}
          style={{
            background:    '#E81B86',
            border:        'none',
            color:         '#ECE3CF',
            fontFamily:    'Anton, sans-serif',
            fontSize:      'clamp(14px,1.5vw,18px)',
            letterSpacing: '0.14em',
            padding:       '13px 0',
            cursor:        'pointer',
          }}
        >
          CLAIM MY SPOT ↗
        </motion.button>
      </form>

      <div style={{
        fontFamily:  'Spectral, serif',
        fontSize:    '9px',
        textAlign:   'center',
        marginTop:   12,
        color:       'rgba(26,18,8,0.35)',
        letterSpacing: '0.06em',
      }}>
        NO SPAM. JUST HEAT. UNSUBSCRIBE ANYTIME.
      </div>
    </div>
  );
}

/* ── PULL QUOTE ──────────────────────────────────────── */
function PullQuote({ quote, attr }) {
  return (
    <div style={{
      borderLeft:  '4px solid #E81B86',
      paddingLeft: 20,
      margin:      '24px 0',
    }}>
      <div style={{
        fontFamily:  'Playfair Display, serif',
        fontStyle:   'italic',
        fontSize:    'clamp(18px,2.2vw,28px)',
        lineHeight:  1.25,
        color:       '#1a1208',
        marginBottom: 8,
      }}>
        "{quote}"
      </div>
      {attr && (
        <div style={{
          fontFamily:    'Oswald, sans-serif',
          fontSize:      11,
          letterSpacing: '0.2em',
          color:         '#E81B86',
        }}>
          — {attr}
        </div>
      )}
    </div>
  );
}

/* ── MAIN BELOW FOLD ─────────────────────────────────── */
export default function BelowFold() {
  return (
    <div style={{ background: '#ECE3CF', color: '#1a1208' }}>

      {/* top separator — cream into dark newspaper header */}
      <JaggedSeparator topColor="#ECE3CF" />

      {/* ── MASTHEAD REPEAT ─────────────────── */}
      <div style={{
        background:  '#1a1208',
        color:       '#ECE3CF',
        textAlign:   'center',
        padding:     '20px 24px 16px',
        borderBottom: '3px solid #E81B86',
      }}>
        <div style={{
          fontFamily:    'Oswald, sans-serif',
          fontSize:      10,
          letterSpacing: '0.4em',
          color:         'rgba(236,227,207,0.4)',
          marginBottom:  4,
        }}>
          ✦ SPECIAL PRE-LAUNCH EDITION ✦
        </div>
        <div style={{
          fontFamily:  'Anton, sans-serif',
          fontSize:    'clamp(36px,6vw,80px)',
          letterSpacing: '0.05em',
          lineHeight:   1,
        }}>
          SPICY NEWS
        </div>
        <div style={{
          height:    2,
          background:'#D81E2C',
          width:     120,
          margin:    '8px auto',
        }} />
        <div style={{
          fontFamily: 'Spectral, serif',
          fontStyle:  'italic',
          fontSize:   'clamp(11px,1.2vw,14px)',
          color:      'rgba(236,227,207,0.5)',
        }}>
          "No bland people allowed past this point"
        </div>
      </div>

      {/* ── MAIN GRID ───────────────────────── */}
      <div style={{
        maxWidth: 1100,
        margin:   '0 auto',
        padding:  'clamp(32px,5vw,72px) clamp(20px,4vw,60px)',
      }}>

        {/* Lead story + sidebar */}
        <div style={{
          display:              'grid',
          gridTemplateColumns:  '1fr 1fr 1fr',
          gap:                  '0 28px',
        }}>

          {/* Col 1 — lead story */}
          <FadeUp>
            <div style={{ gridColumn: 'span 2' }}>
              <NpLabel>Lead Story</NpLabel>
              <NpRule thick />
              <h2 style={{
                fontFamily:  'Playfair Display, serif',
                fontWeight:   900,
                fontSize:    'clamp(28px,3.5vw,52px)',
                lineHeight:   1.05,
                marginBottom: 12,
                color:        '#1a1208',
              }}>
                India Has Had Enough Of Playing It Safe.<br/>
                <span style={{ color: '#E81B86' }}>SHIKA Changes Everything.</span>
              </h2>
              <div className="np-col-body">
                <p>
                  For too long, "spicy" in India meant a vague warning label slapped on a packet of chips that tastes
                  like salt with ambition. SHIKA was born from a simple, dangerous idea: what if a snack brand
                  actually delivered on the promise?
                </p>
                <p>
                  Founded by Jashika, a woman who grew up eating things that made her family nervous, SHIKA is the
                  first snack brand built around a cult, not a category. There are no "mild" options. There is no
                  middle ground. You either want the heat or you don't belong here.
                </p>
                <p>
                  "I was tired of snacks that apologised for existing," says the founder. "Every packet was hedging.
                  SHIKA doesn't hedge." The result is a product line that's already generating a waitlist before
                  a single packet has hit shelves.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Col 3 — sidebar */}
          <FadeUp delay={0.15}>
            <div style={{ borderLeft: '1px solid rgba(26,18,8,0.2)', paddingLeft: 20 }}>
              <NpLabel>Inside This Edition</NpLabel>
              <NpRule />
              {[
                { n:'A01', t:'Why mild snacks are a public health crisis' },
                { n:'A02', t:'The 10,000 founding members: who gets in?' },
                { n:'A03', t:"Jashika's origin story — from family kitchen to cult brand" },
                { n:'B01', t:'What makes SHIKA different from every other hot snack' },
                { n:'B02', t:'The waitlist: how to secure your founding seat' },
              ].map(item => (
                <div key={item.n} style={{ marginBottom: 12 }}>
                  <span style={{
                    fontFamily:    'Oswald, sans-serif',
                    fontSize:      10,
                    letterSpacing: '0.15em',
                    color:         '#E81B86',
                    marginRight:   6,
                  }}>
                    {item.n}
                  </span>
                  <span style={{
                    fontFamily: 'Spectral, serif',
                    fontSize:   'clamp(11px,1.1vw,13px)',
                    lineHeight:  1.4,
                    color:      '#2a1f10',
                  }}>
                    {item.t}
                  </span>
                  <div style={{ height:1, background:'rgba(26,18,8,0.12)', marginTop:10 }} />
                </div>
              ))}

              <PullQuote
                quote="If you're scared of the spice level, you're exactly who we're not building this for."
                attr="JASHIKA, FOUNDER"
              />

              {/* SPICE CULT badge */}
              <div style={{
                background:    '#E81B86',
                color:         '#ECE3CF',
                padding:       '14px 16px',
                textAlign:     'center',
                marginTop:     16,
              }}>
                <div style={{ fontFamily:'Oswald,sans-serif', fontSize:10, letterSpacing:'0.3em', marginBottom:4, opacity:0.7 }}>
                  FOUNDING STATUS
                </div>
                <div style={{ fontFamily:'Anton,sans-serif', fontSize:'clamp(18px,2vw,24px)', letterSpacing:'0.05em' }}>
                  SPICE CULT<br/>MEMBER
                </div>
                <div style={{ fontFamily:'Spectral,serif', fontStyle:'italic', fontSize:11, marginTop:6, opacity:0.75 }}>
                  First 10,000 only
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        <NpRule thick />

        {/* 3-column opinion section */}
        <FadeUp delay={0.1}>
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '0 24px',
          }}>
            {[
              {
                tag:  'BOLD',
                head: 'The audacity of full heat.',
                body: 'In a market terrified of alienating the mildly-intolerant, SHIKA made the first rational move: stop trying to be for everyone. Build for the 15% who actually want to feel something.',
              },
              {
                tag:  'REBELLIOUS',
                head: 'No warning labels. No apologies.',
                body: "Every mainstream snack brand writes \"may contain traces of flavour.\" SHIKA's position is simpler. If you need a warning label, you're already too late. This is not for the cautious.",
              },
              {
                tag:  'SPICY',
                head: "It's not a snack. It's a declaration.",
                body: 'When you reach for SHIKA, you\'re not just buying something to eat. You are announcing, publicly, that you\'re a person with standards. Spicy standards.',
              },
            ].map((col, i) => (
              <div key={i} style={{ borderTop: `3px solid #D81E2C`, paddingTop: 12 }}>
                <NpLabel>{col.tag}</NpLabel>
                <div style={{
                  fontFamily:  'Playfair Display, serif',
                  fontWeight:   700,
                  fontSize:    'clamp(14px,1.6vw,20px)',
                  lineHeight:   1.2,
                  marginBottom: 8,
                }}>
                  {col.head}
                </div>
                <p style={{
                  fontFamily: 'Spectral, serif',
                  fontSize:   'clamp(11px,1.05vw,13px)',
                  lineHeight:  1.6,
                  color:      '#3a2a18',
                }}>
                  {col.body}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        <NpRule thick />

        {/* CLASSIFIEDS / WAITLIST ──────────────── */}
        <FadeUp delay={0.1}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <NpLabel>Classifieds — Limited Openings</NpLabel>
            <div style={{
              fontFamily:    'Anton, sans-serif',
              fontSize:      'clamp(28px,4vw,56px)',
              lineHeight:     1,
              letterSpacing: '0.03em',
              marginBottom:   8,
            }}>
              FOUNDING SEATS NOW OPEN.
            </div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle:  'italic',
              fontSize:   'clamp(14px,1.5vw,18px)',
              color:      'rgba(26,18,8,0.6)',
            }}>
              Waitlist closes at 10,000 members.
            </div>
          </div>
          <WaitlistCoupon />
        </FadeUp>

      </div>

      {/* ── FOOTER MASTHEAD ─────────────────── */}
      <div style={{
        background:    '#1a1208',
        color:         '#ECE3CF',
        padding:       '32px clamp(20px,4vw,60px)',
        display:       'flex',
        justifyContent:'space-between',
        alignItems:    'center',
        flexWrap:      'wrap',
        gap:           16,
        borderTop:     '3px solid #E81B86',
      }}>
        <div style={{ fontFamily:'Anton,sans-serif', fontSize:'clamp(24px,3vw,36px)', color:'#C6F000', letterSpacing:'0.05em' }}>
          SHIKA
        </div>
        <div style={{ fontFamily:'Spectral,serif', fontStyle:'italic', fontSize:'clamp(11px,1.1vw,13px)', color:'rgba(236,227,207,0.4)' }}>
          © 2024 SHIKA. All rights reserved to the spicy ones.
        </div>
        <div style={{ display:'flex', gap:24 }}>
          {['Instagram','TikTok','About','Contact'].map(l => (
            <a key={l} href="#" style={{
              fontFamily:    'Oswald, sans-serif',
              fontSize:      11,
              letterSpacing: '0.15em',
              color:         'rgba(236,227,207,0.4)',
              textDecoration:'none',
              textTransform: 'uppercase',
            }}
              onMouseEnter={e => (e.target.style.color = '#C6F000')}
              onMouseLeave={e => (e.target.style.color = 'rgba(236,227,207,0.4)')}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
