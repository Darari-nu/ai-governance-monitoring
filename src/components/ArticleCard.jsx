import React from 'react';
import { motion } from 'framer-motion';

function ArticleCard({ article, index }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            style={{
                background: 'var(--color-bg-card)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid transparent'
            }}
        >
            <div style={{ padding: '1.5rem 1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                    backgroundColor: '#F0F9FF',
                    color: 'var(--color-primary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {article.country}
                </span>
                <time style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>
                    {article.date}
                </time>
            </div>

            <div style={{ padding: '0 1.5rem 1.5rem', flexGrow: 1 }}>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--color-text-main)',
                    lineHeight: 1.4
                }}>
                    {article.title}
                </h2>
                <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.95rem', color: '#334155', marginBottom: '0.5rem', lineHeight: 1.6 }}>
                        {article.summary_en}
                    </p>
                    <p style={{
                        fontSize: '0.85rem',
                        color: '#64748B',
                        lineHeight: 1.6,
                        paddingTop: '0.5rem',
                        borderTop: '1px dashed var(--color-border)'
                    }}>
                        {article.summary_ja}
                    </p>
                </div>
            </div>

            <div style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#F8FAFC',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: 'var(--color-primary)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}
                >
                    Read Source / 情報源 →
                </a>
            </div>
        </motion.article>
    );
}

export default ArticleCard;
