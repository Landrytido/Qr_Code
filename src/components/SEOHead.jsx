import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const BASE_URL = 'https://qr-code-kappa-flame.vercel.app'

const SEOHead = ({ title, description, keywords, path = '' }) => {
    const fullTitle = title || 'QR Studio - Générateur de QR Code Gratuit'
    const fullDesc = description || 'Créez des QR codes personnalisés gratuitement avec QR Studio. Générateur moderne, rapide et intuitif.'
    const url = `${BASE_URL}${path}`

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={fullDesc} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDesc} />
            <meta property="og:url" content={url} />

            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDesc} />
            <meta name="twitter:url" content={url} />
        </Helmet>
    )
}

SEOHead.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    path: PropTypes.string
}

export default SEOHead
