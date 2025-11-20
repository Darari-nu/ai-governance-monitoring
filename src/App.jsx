import React, { useState, useEffect } from 'react';
import Hero3D from './components/Hero3D';
import ArticleCard from './components/ArticleCard';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <header className="hero-section" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 10,
          padding: '0 1rem',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.05em', color: '#0F172A' }}>
              AI Governance Monitor
            </div>
            <nav style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ fontSize: '0.9rem', fontWeight: 500, color: '#64748B' }}>Home</a>
              <a href="#" style={{ fontSize: '0.9rem', fontWeight: 500, color: '#64748B' }}>About</a>
            </nav>
          </div>
        </div>
        <Hero3D />
      </header>

      <main style={{ padding: '4rem 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '0.5rem'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            color: 'var(--color-text-main)',
            borderLeft: '4px solid var(--color-accent)',
            paddingLeft: '0.5rem'
          }}>
            Latest Updates
          </h2>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Last Updated: {articles.length > 0 ? articles[0].date : '--'}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading updates...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {articles.map((article, index) => (
              <ArticleCard key={article.id || index} article={article} index={index} />
            ))}
          </div>
        )}
      </main>

      <footer style={{
        backgroundColor: '#F1F5F9',
        color: '#64748B',
        padding: '2rem 0',
        textAlign: 'center',
        fontSize: '0.875rem',
        marginTop: '4rem',
        borderTop: '1px solid var(--color-border)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>&copy; 2025 AI Governance Monitor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
