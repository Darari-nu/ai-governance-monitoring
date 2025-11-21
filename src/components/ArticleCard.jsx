import React from 'react';
import { motion } from 'framer-motion';

function ArticleCard({ article, index }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: 2,
                rotateY: 2,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
            }}
            style={{
                background: 'var(--color-bg-card)',
                borderRadius: '20px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            <div style={{ padding: '1.75rem 1.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                    backgroundColor: '#E0F2FE',
                    color: '#0284C7',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {article.country}
                </span>
                <time style={{ fontSize: '0.85rem', color: '#94A3B8', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                    {article.date}
                </time>
            </div>

            <div style={{ padding: '0 1.75rem 1.75rem', flexGrow: 1 }}>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: '#1E293B',
                    lineHeight: 1.3
                }}>
                    {article.title}
                </h2>
                <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                        {article.summary_en}
                    </p>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#64748B',
                        lineHeight: 1.6,
                        paddingTop: '0.75rem',
                        borderTop: '1px dashed #CBD5E1'
                    }}>
                        {article.summary_ja}
                    </p>
                </div>
            </div>

            <div style={{
                padding: '1.25rem 1.75rem',
                backgroundColor: '#F8FAFC',
                borderTop: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: '#0EA5E9',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        transition: 'color 0.2s'
                    }}
                >
                    Read Source / 情報源 →
                </a>
            </div>
        </motion.article>
    );
}

export default ArticleCard;
