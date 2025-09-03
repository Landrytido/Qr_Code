import { useState, useRef } from 'react'
import { useApp } from '../../hooks/useApp'
import qrCode from 'qrcode-generator'
import ContentCard from '../UI/ContentCard'

const Generate = () => {
    const { qrData, qrOptions, setQrData, generateQR } = useApp()
    const [localData, setLocalData] = useState(qrData || '')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedQR, setGeneratedQR] = useState(null)
    const canvasRef = useRef(null)

    const handleInputChange = (e) => {
        const value = e.target.value
        setLocalData(value)
        setQrData(value)
    }

    const handleGenerate = async () => {
        if (!localData.trim()) {
            alert('Veuillez entrer du texte pour générer le QR code')
            return
        }

        setIsGenerating(true)

        try {
            const qr = qrCode(0, qrOptions.level || 'M')
            qr.addData(localData)
            qr.make()

            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            const moduleCount = qr.getModuleCount()
            const cellSize = qrOptions.size / moduleCount

            canvas.width = qrOptions.size
            canvas.height = qrOptions.size

            // Fond
            ctx.fillStyle = qrOptions.bgColor || '#ffffff'
            ctx.fillRect(0, 0, qrOptions.size, qrOptions.size)

            // QR code
            ctx.fillStyle = qrOptions.fgColor || '#000000'

            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
                    }
                }
            }

            setGeneratedQR(canvas.toDataURL())
            generateQR()

        } catch (error) {
            console.error('Erreur lors de la génération:', error)
            alert('Erreur lors de la génération du QR code')
        } finally {
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

    return (
        <ContentCard>
            <h1 className="page-title">Générer un QR Code</h1>
            <p className="main-description">
                Créez votre QR code personnalisé en remplissant les informations ci-dessous
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div className="generator-form">
                    <div className="form-group">
                        <label className="form-label">Contenu</label>
                        <textarea
                            className="form-input"
                            rows="4"
                            placeholder="Entrez votre texte, URL ou autres données..."
                            value={localData}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        className="btn"
                        onClick={handleGenerate}
                        disabled={!localData.trim()}
                    >
                        {isGenerating ? 'Génération...' : 'Générer le QR Code'}
                    </button>
                </div>

                <div className="qr-preview">
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'none' }}
                    />

                    {generatedQR ? (
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