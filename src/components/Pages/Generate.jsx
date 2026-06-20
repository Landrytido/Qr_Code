import { useState, useRef, useEffect, useCallback } from 'react'
import { useApp } from '../../hooks/useApp'
import useToast from '../../hooks/useToast'
import qrCode from 'qrcode-generator'
import ContentCard from '../UI/ContentCard'
import './Generate.css'

// ─── helpers ──────────────────────────────────────────────────────────────────

const VALIDATORS = {
    url: (v) => {
        if (!v) return null
        try { new URL(v.startsWith('http') ? v : `https://${v}`); return null }
        catch { return 'URL invalide' }
    },
    email: (v) => {
        if (!v) return null
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Email invalide'
    },
    phone: (v) => {
        if (!v) return null
        return /^[+\d\s\-().]{6,}$/.test(v) ? null : 'Numéro invalide'
    }
}

function buildQRString(contentType, localData, wifiData, contactData) {
    switch (contentType) {
        case 'url':    return localData.startsWith('http') ? localData : `https://${localData}`
        case 'email':  return `mailto:${localData}`
        case 'phone':  return `tel:${localData}`
        case 'wifi':   return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? 'true' : 'false'};;`
        case 'contact':
            return `BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.name}\nTEL:${contactData.phone}\nEMAIL:${contactData.email}\nORG:${contactData.organization}\nEND:VCARD`
        default:       return localData
    }
}

function renderToCanvas(canvas, data, options) {
    const qr = qrCode(0, options.level || 'M')
    qr.addData(data)
    qr.make()
    const moduleCount = qr.getModuleCount()
    const margin = options.includeMargin ? 4 : 0
    const totalSize = moduleCount + margin * 2
    const cellSize = options.size / totalSize
    const ctx = canvas.getContext('2d')
    canvas.width = options.size
    canvas.height = options.size
    ctx.fillStyle = options.bgColor || '#ffffff'
    ctx.fillRect(0, 0, options.size, options.size)
    ctx.fillStyle = options.fgColor || '#000000'
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
                ctx.fillRect((col + margin) * cellSize, (row + margin) * cellSize, cellSize, cellSize)
            }
        }
    }
    return qr
}

function buildSVG(data, options) {
    const qr = qrCode(0, options.level || 'M')
    qr.addData(data)
    qr.make()
    const moduleCount = qr.getModuleCount()
    const margin = options.includeMargin ? 4 : 0
    const totalSize = moduleCount + margin * 2
    const cellSize = 10
    const size = totalSize * cellSize
    let rects = ''
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
                const x = (col + margin) * cellSize
                const y = (row + margin) * cellSize
                rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${options.fgColor || '#000000'}"/>`
            }
        }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${options.bgColor || '#ffffff'}"/>${rects}</svg>`
}

// ─── component ────────────────────────────────────────────────────────────────

const Generate = () => {
    const { qrData, qrOptions, setQrData, setQrOptions, generateQR } = useApp()
    const toast = useToast()

    const [localData, setLocalData] = useState(qrData || '')
    const [contentType, setContentType] = useState('text')
    const [errors, setErrors] = useState({})
    const [previewDataUrl, setPreviewDataUrl] = useState(null)
    const [generatedDataUrl, setGeneratedDataUrl] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const canvasRef = useRef(null)
    const debounceRef = useRef(null)

    const [wifiData, setWifiData] = useState({ ssid: '', password: '', security: 'WPA', hidden: false })
    const [contactData, setContactData] = useState({ name: '', phone: '', email: '', organization: '' })

    const contentTypes = [
        { id: 'text', label: 'Texte libre', icon: '📝' },
        { id: 'url', label: 'Site web', icon: '🌐' },
        { id: 'email', label: 'Email', icon: '✉️' },
        { id: 'phone', label: 'Téléphone', icon: '📞' },
        { id: 'wifi', label: 'WiFi', icon: '📶' },
        { id: 'contact', label: 'Contact', icon: '👤' }
    ]

    // Validation inline
    const validate = useCallback((type, value) => {
        const validator = VALIDATORS[type]
        const error = validator ? validator(value) : null
        setErrors(prev => ({ ...prev, [type]: error }))
        return !error
    }, [])

    // Aperçu temps réel (debounce 400ms)
    const updatePreview = useCallback((data, opts) => {
        clearTimeout(debounceRef.current)
        if (!data.trim()) { setPreviewDataUrl(null); return }
        debounceRef.current = setTimeout(() => {
            try {
                const canvas = document.createElement('canvas')
                renderToCanvas(canvas, data, { ...opts, size: 280 })
                setPreviewDataUrl(canvas.toDataURL())
            } catch { setPreviewDataUrl(null) }
        }, 400)
    }, [])

    // Recalcul préview quand options changent
    useEffect(() => {
        const data = buildQRString(contentType, localData, wifiData, contactData)
        updatePreview(data, qrOptions)
    }, [qrOptions]) // eslint-disable-line react-hooks/exhaustive-deps

    // Si on revient ici depuis l'historique (qrData rempli depuis le context)
    useEffect(() => {
        if (qrData && qrData !== localData) {
            setLocalData(qrData)
            updatePreview(qrData, qrOptions)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleDataChange = (value) => {
        setLocalData(value)
        setQrData(value)
        validate(contentType, value)
        const data = buildQRString(contentType, value, wifiData, contactData)
        updatePreview(data, qrOptions)
    }

    const handleContentTypeChange = (type) => {
        setContentType(type)
        setLocalData('')
        setQrData('')
        setErrors({})
        setPreviewDataUrl(null)
        setGeneratedDataUrl(null)
    }

    const handleGenerate = async () => {
        const dataToGenerate = buildQRString(contentType, localData, wifiData, contactData)
        if (!dataToGenerate.trim()) {
            toast.warning('Veuillez remplir les champs requis')
            return
        }
        if (errors[contentType]) {
            toast.warning('Corrigez les erreurs avant de générer')
            return
        }
        setIsGenerating(true)
        setQrData(dataToGenerate)
        try {
            const canvas = canvasRef.current
            renderToCanvas(canvas, dataToGenerate, qrOptions)
            setGeneratedDataUrl(canvas.toDataURL())
            generateQR(dataToGenerate, qrOptions)
            toast.success('QR code généré !')
        } catch (e) {
            console.error(e)
            toast.error('Erreur lors de la génération')
        } finally {
            setIsGenerating(false)
        }
    }

    const currentDataUrl = generatedDataUrl || previewDataUrl

    const downloadPNG = () => {
        if (!currentDataUrl) return
        const link = document.createElement('a')
        link.download = `qr-code-${Date.now()}.png`
        link.href = currentDataUrl
        link.click()
        toast.success('PNG téléchargé !')
    }

    const downloadSVG = () => {
        const data = buildQRString(contentType, localData, wifiData, contactData)
        if (!data.trim()) return
        const svg = buildSVG(data, qrOptions)
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `qr-code-${Date.now()}.svg`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
        toast.success('SVG téléchargé !')
    }

    const copyToClipboard = async () => {
        if (!currentDataUrl) return
        try {
            const res = await fetch(currentDataUrl)
            const blob = await res.blob()
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
            toast.success('Copié dans le presse-papier !')
        } catch {
            toast.error('Copie non supportée par ce navigateur')
        }
    }

    const shareQR = async () => {
        if (!navigator.share || !currentDataUrl) {
            toast.info('Partage non disponible sur ce navigateur')
            return
        }
        try {
            const res = await fetch(currentDataUrl)
            const blob = await res.blob()
            const file = new File([blob], 'qr-code.png', { type: 'image/png' })
            await navigator.share({ title: 'Mon QR Code', files: [file] })
        } catch (e) {
            if (e.name !== 'AbortError') toast.error('Erreur lors du partage')
        }
    }

    const renderField = (label, child, errorKey) => (
        <div className="form-group">
            <label className="form-label">{label}</label>
            {child}
            {errors[errorKey] && <span className="field-error">{errors[errorKey]}</span>}
        </div>
    )

    const renderContentForm = () => {
        switch (contentType) {
            case 'text':
                return renderField('Texte libre',
                    <textarea className="form-input" rows="4" placeholder="Entrez votre texte..."
                        value={localData} onChange={(e) => handleDataChange(e.target.value)} />
                )
            case 'url':
                return renderField('URL du site web',
                    <input className={`form-input${errors.url ? ' form-input--error' : ''}`} type="text"
                        placeholder="exemple.com ou https://exemple.com"
                        value={localData} onChange={(e) => handleDataChange(e.target.value)} />,
                    'url'
                )
            case 'email':
                return renderField('Adresse email',
                    <input className={`form-input${errors.email ? ' form-input--error' : ''}`} type="email"
                        placeholder="contact@exemple.com"
                        value={localData} onChange={(e) => handleDataChange(e.target.value)} />,
                    'email'
                )
            case 'phone':
                return renderField('Numéro de téléphone',
                    <input className={`form-input${errors.phone ? ' form-input--error' : ''}`} type="tel"
                        placeholder="+33 1 23 45 67 89"
                        value={localData} onChange={(e) => handleDataChange(e.target.value)} />,
                    'phone'
                )
            case 'wifi':
                return (
                    <div className="form-group">
                        <label className="form-label">Configuration WiFi</label>
                        <input className="form-input" placeholder="Nom du réseau (SSID)"
                            value={wifiData.ssid}
                            onChange={(e) => { const d = { ...wifiData, ssid: e.target.value }; setWifiData(d); updatePreview(buildQRString('wifi', '', d, contactData), qrOptions) }}
                            style={{ marginBottom: '1rem' }} />
                        <input className="form-input" type="password" placeholder="Mot de passe"
                            value={wifiData.password}
                            onChange={(e) => { const d = { ...wifiData, password: e.target.value }; setWifiData(d); updatePreview(buildQRString('wifi', '', d, contactData), qrOptions) }}
                            style={{ marginBottom: '1rem' }} />
                        <select className="form-select" value={wifiData.security}
                            onChange={(e) => { const d = { ...wifiData, security: e.target.value }; setWifiData(d); updatePreview(buildQRString('wifi', '', d, contactData), qrOptions) }}>
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
                        {['name', 'phone', 'email', 'organization'].map((field, i) => (
                            <input key={field} className="form-input"
                                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                placeholder={['Nom complet', 'Téléphone', 'Email', 'Organisation'][i]}
                                value={contactData[field]}
                                onChange={(e) => {
                                    const d = { ...contactData, [field]: e.target.value }
                                    setContactData(d)
                                    updatePreview(buildQRString('contact', '', wifiData, d), qrOptions)
                                }}
                                style={i < 3 ? { marginBottom: '1rem' } : {}} />
                        ))}
                    </div>
                )
            default: return null
        }
    }

    return (
        <ContentCard>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <h1 className="page-title">Générer un QR Code</h1>
            <p className="main-description">Choisissez le type de contenu et remplissez les informations</p>

            <div className="generate-layout">
                <div className="generator-form">
                    <div className="content-type-grid">
                        {contentTypes.map(t => (
                            <button
                                key={t.id}
                                className={`content-type-btn${contentType === t.id ? ' content-type-btn--active' : ''}`}
                                onClick={() => handleContentTypeChange(t.id)}
                                type="button"
                            >
                                <span className="content-type-btn__icon">{t.icon}</span>
                                <span className="content-type-btn__label">{t.label}</span>
                            </button>
                        ))}
                    </div>

                    {renderContentForm()}

                    <button className="btn generate-btn" onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? 'Génération...' : 'Générer & sauvegarder'}
                    </button>
                </div>

                <div className="qr-preview">
                    {currentDataUrl ? (
                        <div className="qr-result">
                            <div className="qr-result__badge">
                                {generatedDataUrl ? '✓ Sauvegardé' : '👁 Aperçu'}
                            </div>
                            <img src={currentDataUrl} alt="QR Code" className="qr-result__img" />
                            <div className="qr-actions">
                                <button onClick={downloadPNG} className="qr-action-btn">
                                    📥 PNG
                                </button>
                                <button onClick={downloadSVG} className="qr-action-btn">
                                    📐 SVG
                                </button>
                                <button onClick={copyToClipboard} className="qr-action-btn">
                                    📋 Copier
                                </button>
                                {navigator.share && (
                                    <button onClick={shareQR} className="qr-action-btn">
                                        ↗ Partager
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="qr-placeholder">
                            Aperçu en temps réel<br />
                            <small>Commencez à taper pour voir le résultat</small>
                        </div>
                    )}
                </div>
            </div>
        </ContentCard>
    )
}

export default Generate
