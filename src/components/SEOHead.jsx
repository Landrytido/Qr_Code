import { useEffect } from 'react';

const SEOHead = ({ title, description, keywords, path = '' }) => {
    useEffect(() => {
        // Mise à jour du titre
        document.title = title || 'QR Studio - Générateur de QR Code Gratuit';

        // Mise à jour de la description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || 'Créez des QR codes personnalisés gratuitement avec QR Studio. Générateur moderne, rapide et intuitif.');
        }

        // Mise à jour des keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && keywords) {
            metaKeywords.setAttribute('content', keywords);
        }

        // Mise à jour de l'URL canonique
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute('href', `https://qr-code-kappa-flame.vercel.app${path}`);
        }

        // Mise à jour Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');

        if (ogTitle) ogTitle.setAttribute('content', title);
        if (ogDescription) ogDescription.setAttribute('content', description);
        if (ogUrl) ogUrl.setAttribute('href', `https://qr-code-kappa-flame.vercel.app${path}`);

        // Mise à jour Twitter
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        const twitterUrl = document.querySelector('meta[property="twitter:url"]');

        if (twitterTitle) twitterTitle.setAttribute('content', title);
        if (twitterDescription) twitterDescription.setAttribute('content', description);
        if (twitterUrl) twitterUrl.setAttribute('href', `https://qr-code-kappa-flame.vercel.app${path}`);
    }, [title, description, keywords, path]);

    return null;
};

export default SEOHead;
