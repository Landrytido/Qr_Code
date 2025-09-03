import { useState, useRef } from 'react'
import { useApp } from '../../hooks/useApp'
import qrCode from 'qrcode-generator'
import ContentCard from '../UI/ContentCard'

const Generate = () => {
    const { qrData, qrOptions, setQrData, generateQR } = useApp()
    const [localData, setLocalData] = useState(qrData || '')
    const [contentType, setContentType] = useState('text')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedQR, setGeneratedQR] = useState(null)
    const canvasRef = useRef(null)

    const [wifiData, setWifiData] = useState({
        ssid: '',
        password: '',
        security: 'WPA',
        hidden: false
    })

    const [contactData, setContactData] = useState({
        name: '',
        phone: '',
        email: '',
        organization: ''
    })

    const contentTypes = [
        { id: 'text', label: 'Texte libre', icon: '📝' },
        { id: 'url', label: 'Site web', icon: '🌐' },
        { id: 'email', label: 'Email', icon: '✉️' },
        { id: 'phone', label: 'Téléphone', icon: '📞' },
        { id: 'wifi', label: 'WiFi', icon: '📶' },
        { id: 'contact', label: 'Contact', icon: '👤' }
    ]

    const handleContentTypeChange = (type) => {
        setContentType(type)
        setLocalData('')
        setQrData('')
    }

    const buildQRData = () => {
        switch (contentType) {
            case 'url':
                return localData.startsWith('http') ? localData : `https://${localData}`
            case 'email':
                return `mailto:${localData}`
            case 'phone':
                return `tel:${localData}`
            case 'wifi':
                return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? 'true' : 'false'};;`
            case 'contact':
                return `BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.name}\nTEL:${contactData.phone}\nEMAIL:${contactData.email}\nORG:${contactData.organization}\nEND:VCARD`
            default:
                return localData
        }
    }

    const handleGenerate = async () => {
        const dataToGenerate = buildQRData()

        if (!dataToGenerate.trim()) {
            alert('Veuillez remplir les champs requis pour générer le QR code')
            return
        }

        setIsGenerating(true)
        setQrData(dataToGenerate)

        try {
            const startTime = Date.now()

            const qr = qrCode(0, qrOptions.level || 'M')
            qr.addData(dataToGenerate)
            qr.make()

            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            const moduleCount = qr.getModuleCount()
            const cellSize = qrOptions.size / moduleCount

            canvas.width = qrOptions.size
            canvas.height = qrOptions.size

            ctx.fillStyle = qrOptions.bgColor || '#ffffff'
            ctx.fillRect(0, 0, qrOptions.size, qrOptions.size)

            ctx.fillStyle = qrOptions.fgColor || '#000000'

            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
                    }
                }
            }

            // Attendre au minimum 1.5 secondes pour l'animation
            const elapsedTime = Date.now() - startTime
            const remainingTime = Math.max(0, 1500 - elapsedTime)

            setTimeout(() => {
                setGeneratedQR(canvas.toDataURL())
                generateQR()
                setIsGenerating(false)
            }, remainingTime)

        } catch (error) {
            console.error('Erreur lors de la génération:', error)
            alert('Erreur lors de la génération du QR code')
            setIsGenerating(false)
        }
    }

    const downloadQR = () => {
        if (generatedQR) {
            const link = document.createElement('a')
            link.download = `qr-code-${Date.now()}.png`
            link.href = generatedQR
            link.click()
        }
    }

    const renderContentForm = () => {
        switch (contentType) {
            case 'text':
                return (
                    <div className="form-group">
                        <label className="form-label">Texte libre</label>
                        <textarea
                            className="form-input"
                            rows="4"
                            placeholder="Entrez votre texte..."
                            value={localData}
                            onChange={(e) => {
                                setLocalData(e.target.value)
                                setQrData(e.target.value)
                            }}
                        />
                    </div>
                )

            case 'url':
                return (
                    <div className="form-group">
                        <label className="form-label">URL du site web</label>
                        <input
                            className="form-input"
                            type="url"
                            placeholder="exemple.com ou https://exemple.com"
                            value={localData}
                            onChange={(e) => {
                                setLocalData(e.target.value)
                                setQrData(e.target.value)
                            }}
                        />
                    </div>
                )

            case 'email':
                return (
                    <div className="form-group">
                        <label className="form-label">Adresse email</label>
                        <input
                            className="form-input"
                            type="email"
                            placeholder="contact@exemple.com"
                            value={localData}
                            onChange={(e) => {
                                setLocalData(e.target.value)
                                setQrData(e.target.value)
                            }}
                        />
                    </div>
                )

            case 'phone':
                return (
                    <div className="form-group">
                        <label className="form-label">Numéro de téléphone</label>
                        <input
                            className="form-input"
                            type="tel"
                            placeholder="+33 1 23 45 67 89"
                            value={localData}
                            onChange={(e) => {
                                setLocalData(e.target.value)
                                setQrData(e.target.value)
                            }}
                        />
                    </div>
                )

            case 'wifi':
                return (
                    <div className="form-group">
                        <label className="form-label">Configuration WiFi</label>
                        <input
                            className="form-input"
                            placeholder="Nom du réseau (SSID)"
                            value={wifiData.ssid}
                            onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                            style={{ marginBottom: '1rem' }}
                        />
                        <input
                            className="form-input"
                            type="password"
                            placeholder="Mot de passe"
                            value={wifiData.password}
                            onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                            style={{ marginBottom: '1rem' }}
                        />
                        <select
                            className="form-select"
                            value={wifiData.security}
                            onChange={(e) => setWifiData({ ...wifiData, security: e.target.value })}
                        >
                            <option value="WPA">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="nopass">Aucune sécurité</option>
                        </select>
                    </div>
                )

            case 'contact':
                return (
                    <div className="form-group">
                        <label className="form-label">Informations de contact</label>
                        <input
                            className="form-input"
                            placeholder="Nom complet"
                            value={contactData.name}
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            style={{ marginBottom: '1rem' }}
                        />
                        <input
                            className="form-input"
                            type="tel"
                            placeholder="Téléphone"
                            value={contactData.phone}
                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                            style={{ marginBottom: '1rem' }}
                        />
                        <input
                            className="form-input"
                            type="email"
                            placeholder="Email"
                            value={contactData.email}
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            style={{ marginBottom: '1rem' }}
                        />
                        <input
                            className="form-input"
                            placeholder="Organisation"
                            value={contactData.organization}
                            onChange={(e) => setContactData({ ...contactData, organization: e.target.value })}
                        />
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <ContentCard>
            <h1 className="page-title">Générer un QR Code</h1>
            <p className="main-description">
                Choisissez le type de contenu et remplissez les informations
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div className="generator-form">
                    <div className="form-group">
                        <label className="form-label">Type de contenu</label>
                        <select
                            className="form-select"
                            value={contentType}
                            onChange={(e) => handleContentTypeChange(e.target.value)}
                        >
                            {contentTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.icon} {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {renderContentForm()}

                    <button
                        className="btn"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        style={{ marginTop: '1rem' }}
                    >
                        {isGenerating ? 'Génération...' : 'Générer le QR Code'}
                    </button>
                </div>

                <div className="qr-preview">
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'none' }}
                    />

                    {isGenerating ? (
                        <div className="qr-loading">
                            <div className="loading-spinner"></div>
                            <div className="loading-text">Génération en cours...</div>
                            <div className="loading-subtext">Création de votre QR code</div>
                        </div>
                    ) : generatedQR ? (
                        <div className="qr-result">
                            <img
                                src={generatedQR}
                                alt="QR Code généré"
                                style={{
                                    width: '100%',
                                    maxWidth: '300px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px'
                                }}
                            />
                            <button
                                onClick={downloadQR}
                                className="btn"
                                style={{ marginTop: '1rem' }}
                            >
                                Télécharger PNG
                            </button>
                        </div>
                    ) : (
                        <div className="qr-placeholder">
                            Aperçu du QR Code<br />
                            <small>Remplissez le formulaire pour voir le résultat</small>
                        </div>
                    )}
                </div>
            </div>
        </ContentCard>
    )
}

export default Generate