import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero3D from './components/Hero3D';
import ArticleCard from './components/ArticleCard';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();

  // Parallax effect for Hero - Subtle
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    fetch('/data/articles.json')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch articles:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <motion.header
        className="hero-section"
        style={{ position: 'relative', y: heroY }}
      >
        <div style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          padding: '0 1rem',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#0F172A' }}>
              AI Governance Monitor
            </div>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>Home</a>
              <a href="#" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>About</a>
            </nav>
          </div>
        </div>
        <Hero3D />
      </motion.header>

      <main style={{
        padding: '6rem 0',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        position: 'relative',
        zIndex: 10,
        background: 'transparent'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '3rem',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            paddingBottom: '1rem'
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#1E293B',
            letterSpacing: '-0.03em'
          }}>
            Latest Updates
          </h2>
          <div style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>
            Last Updated: {articles.length > 0 ? articles[0].date : '--'}
          </div>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#94A3B8', padding: '4rem' }}>Loading updates...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}>
            {articles.map((article, index) => (
              <ArticleCard key={article.id || index} article={article} index={index} />
            ))}
          </div>
        )}
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: '#F8FAFC',
          color: '#64748B',
          padding: '4rem 0',
          textAlign: 'center',
          fontSize: '0.875rem',
          marginTop: '6rem',
          borderTop: '1px solid #E2E8F0',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>&copy; 2025 AI Governance Monitor. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
