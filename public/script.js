/**
 * AI Governance Monitoring - Interactive Features
 * Inspired by hicard.studio with smooth animations and interactions
 */

// ========================================
// Header Scroll Effect
// ========================================

class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.scrollThreshold = 50;
        this.init();
    }

    init() {
        if (!this.header) return;

        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        this.handleScroll(); // Initial check
    }

    handleScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

// ========================================
// Article Fade-In Animation
// ========================================

class ArticleAnimator {
    constructor() {
        this.articles = document.querySelectorAll('.article-item');
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        this.init();
    }

    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for browsers without IntersectionObserver
            this.articles.forEach(article => {
                article.classList.add('fade-in');
            });
            return;
        }

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        this.articles.forEach((article, index) => {
            // Stagger animation delay
            article.style.animationDelay = `${index * 0.1}s`;
            this.observer.observe(article);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Stop observing once animated
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// ========================================
// Modal (Article Detail) Handler
// ========================================

class ModalHandler {
    constructor() {
        this.modals = document.querySelectorAll('.article-detail');
        this.closeButtons = document.querySelectorAll('.detail-close');
        this.init();
    }

    init() {
        if (this.modals.length === 0) return;

        // Close button handlers
        this.closeButtons.forEach(button => {
            button.addEventListener('click', (e) => this.closeModal(e));
        });

        // Close on background click
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(e);
                }
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Prevent body scroll when modal is open
        this.handleModalScroll();
    }

    closeModal(e) {
        e.preventDefault();
        // Remove hash to close modal
        history.pushState('', document.title, window.location.pathname + window.location.search);
    }

    closeAllModals() {
        if (window.location.hash) {
            this.closeModal({ preventDefault: () => {} });
        }
    }

    handleModalScroll() {
        // Monitor hash changes to toggle body scroll
        window.addEventListener('hashchange', () => {
            const hasModal = document.querySelector('.article-detail:target');
            if (hasModal) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement && !targetElement.classList.contains('article-detail')) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// ========================================
// Article Count Updater
// ========================================

class ArticleCounter {
    constructor() {
        this.countElement = document.querySelector('.articles-count');
        this.articlesContainer = document.querySelector('.articles');
        this.init();
    }

    init() {
        if (!this.countElement || !this.articlesContainer) return;
        this.updateCount();

        // Watch for DOM changes (when new articles are added)
        this.observeArticles();
    }

    updateCount() {
        const articleCount = document.querySelectorAll('.article-item').length;
        this.countElement.textContent = `(${articleCount})`;
    }

    observeArticles() {
        const observer = new MutationObserver(() => {
            this.updateCount();
        });

        observer.observe(this.articlesContainer, {
            childList: true,
            subtree: true
        });
    }
}

// ========================================
// Performance: Debounce Utility
// ========================================

function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// Performance: Throttle Utility
// ========================================

function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Initialize All Features
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive features
    new HeaderScroll();
    new ArticleAnimator();
    new ModalHandler();
    new SmoothScroll();
    new ArticleCounter();

    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');

    // Log initialization (remove in production)
    console.log('✨ AI Governance Monitoring - Initialized');
});

// ========================================
// Utility: Create Article Element
// ========================================

/**
 * Utility function for /check command to create new article elements
 * @param {Object} data - Article data
 * @param {string} data.title - Article title
 * @param {string} data.country - Country code/name
 * @param {string} data.date - ISO date string
 * @param {Array<string>} data.tags - Article tags
 * @param {string} data.summary - Article summary
 * @param {string} data.excerpt - Article excerpt
 * @param {string} data.url - Source URL
 * @returns {HTMLElement} Article element
 */
function createArticleElement(data) {
    const article = document.createElement('article');
    article.className = 'article-item';

    const uniqueId = `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    article.innerHTML = `
        <h3 class="article-title">${escapeHtml(data.title)}</h3>

        <div class="article-thumbnail">
            <div class="article-icon">
                ${getCountryIcon(data.country)}
            </div>
        </div>

        <div class="article-meta">
            <time datetime="${data.date}">${formatDate(data.date)}</time>
            <ul class="article-tags">
                ${data.tags.map(tag => `<li>${escapeHtml(tag)}</li>`).join('')}
            </ul>
        </div>

        <a href="#${uniqueId}" class="article-link" aria-label="記事を読む">
            <span aria-hidden="true">→</span>
        </a>
    `;

    // Create detail modal
    const detailModal = createDetailModal(uniqueId, data);

    return { article, detailModal };
}

/**
 * Create detail modal for article
 */
function createDetailModal(id, data) {
    const section = document.createElement('section');
    section.id = id;
    section.className = 'article-detail';

    section.innerHTML = `
        <button class="detail-close" aria-label="閉じる">×</button>
        <div class="detail-content">
            <div class="detail-header">
                <span class="country-badge">${escapeHtml(data.country)}</span>
                <time datetime="${data.date}">${formatDate(data.date)}</time>
            </div>
            <h2 class="detail-title">${escapeHtml(data.title)}</h2>
            <p class="detail-summary">${escapeHtml(data.summary)}</p>
            <blockquote class="detail-excerpt">
                ${escapeHtml(data.excerpt)}
            </blockquote>
            <div class="detail-footer">
                <a href="${escapeHtml(data.url)}" class="detail-source" target="_blank" rel="noopener">
                    情報源を見る
                    <span aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    `;

    return section;
}

/**
 * Get icon SVG for country
 */
function getCountryIcon(country) {
    // Default icon - can be customized per country
    return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
}

/**
 * Format date to readable format
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '-');
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Export for use in other scripts (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createArticleElement,
        formatDate,
        escapeHtml
    };
}
