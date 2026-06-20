import { useApp } from '../../hooks/useApp'
import { useRef, useEffect, useCallback } from 'react'
import qrCode from 'qrcode-generator'
import ContentCard from '../UI/ContentCard'
import FeatureCard from '../UI/FeatureCard'
import SEOHead from '../SEOHead'
import './Customize.css'

const Customize = () => {
    const { qrOptions, setQrOptions, setCurrentPage } = useApp()
    const canvasRef = useRef(null)

    const generatePreview = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const demoText = "QR Studio Demo"

        try {
            const qr = qrCode(0, qrOptions.level || 'M')
            qr.addData(demoText)
            qr.make()

            const moduleCount = qr.getModuleCount()
            const margin = qrOptions.includeMargin ? 4 : 0
            const totalSize = moduleCount + (margin * 2)
            const cellSize = qrOptions.size / totalSize

            canvas.width = qrOptions.size
            canvas.height = qrOptions.size

            ctx.fillStyle = qrOptions.bgColor || '#ffffff'
            ctx.fillRect(0, 0, qrOptions.size, qrOptions.size)

            ctx.fillStyle = qrOptions.fgColor || '#000000'

            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        const x = (col + margin) * cellSize
                        const y = (row + margin) * cellSize
                        ctx.fillRect(x, y, cellSize, cellSize)
                    }
                }
            }
        } catch (error) {
            console.error('Erreur génération aperçu:', error)
        }
    }, [qrOptions])

    const handleOptionChange = (key, value) => {
        setQrOptions({ [key]: value })
    }

    const resetToDefaults = () => {
        localStorage.removeItem('qr-options')
        setQrOptions({
            size: 256,
            bgColor: '#ffffff',
            fgColor: '#000000',
            level: 'M',
            includeMargin: true
        })
    }

    useEffect(() => {
        generatePreview()
    }, [generatePreview])

    return (
        <ContentCard>
            <SEOHead
                title="Personnaliser QR Code - QR Studio"
                description="Personnalisez vos QR codes avec des couleurs, tailles et styles uniques. Aperçu en temps réel et téléchargement en haute qualité."
                keywords="personnaliser QR code, QR code couleur, QR code style, customiser QR code"
                path="/customize"
            />
            <h1 className="page-title">Personnaliser le Style</h1>
            <p className="main-description">
                Personnalisez l'apparence de vos QR codes et voyez le résultat en temps réel
            </p>

            <div className="customize-layout">
                <div className="customize-controls">
                    <div className="customization-grid">
                        <FeatureCard title="Couleurs">
                            <div className="card-field-group">
                                <div className="color-row">
                                    <span className="color-label">QR Code:</span>
                                    <input
                                        type="color"
                                        className="color-picker"
                                        value={qrOptions.fgColor}
                                        onChange={(e) => handleOptionChange('fgColor', e.target.value)}
                                    />
                                    <span className="color-hex">{qrOptions.fgColor}</span>
                                </div>
                                <div className="color-row">
                                    <span className="color-label">Arrière-plan:</span>
                                    <input
                                        type="color"
                                        className="color-picker"
                                        value={qrOptions.bgColor}
                                        onChange={(e) => handleOptionChange('bgColor', e.target.value)}
                                    />
                                    <span className="color-hex">{qrOptions.bgColor}</span>
                                </div>
                            </div>
                        </FeatureCard>

                        <FeatureCard title="Taille">
                            <div className="card-field-group">
                                <input
                                    type="range"
                                    min="128"
                                    max="512"
                                    step="32"
                                    value={qrOptions.size}
                                    onChange={(e) => handleOptionChange('size', parseInt(e.target.value))}
                                    className="size-slider"
                                />
                                <div className="size-value">
                                    <strong>{qrOptions.size}px</strong>
                                </div>
                            </div>
                        </FeatureCard>

                        <FeatureCard title="Niveau de correction">
                            <div className="card-field-group">
                                <select
                                    className="form-select"
                                    value={qrOptions.level}
                                    onChange={(e) => handleOptionChange('level', e.target.value)}
                                >
                                    <option value="L">Faible (~7%)</option>
                                    <option value="M">Moyen (~15%)</option>
                                    <option value="Q">Élevé (~25%)</option>
                                    <option value="H">Très élevé (~30%)</option>
                                </select>
                            </div>
                        </FeatureCard>

                        <FeatureCard title="Options">
                            <div className="card-field-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={qrOptions.includeMargin}
                                        onChange={(e) => handleOptionChange('includeMargin', e.target.checked)}
                                    />
                                    <span>Inclure une marge</span>
                                </label>
                            </div>
                        </FeatureCard>
                    </div>

                    <div className="customize-footer">
                        <button className="btn btn-generate-cta" onClick={() => setCurrentPage('generate')}>
                            ✦ Générer un QR code avec ce style
                        </button>
                        <button className="btn btn-reset" onClick={resetToDefaults}>
                            Réinitialiser
                        </button>
                        {qrOptions.fgColor === qrOptions.bgColor && (
                            <div className="color-warning">
                                ⚠️
                                <span>Les couleurs de premier plan et d'arrière-plan sont identiques. Le QR code ne sera pas lisible.</span>
                            </div>
                        )}
                        <span className="autosave-hint">
                            Les paramètres sont sauvegardés automatiquement
                        </span>
                    </div>
                </div>

                <div className="customize-preview">
                    <div className="preview-container">
                        <h3 className="preview-title">Aperçu en temps réel</h3>
                        <div className="preview-qr">
                            <canvas ref={canvasRef} className="preview-canvas" />
                        </div>
                        <div className="preview-info">
                            <div className="preview-detail">
                                <span>Taille: </span>
                                <strong>{qrOptions.size}×{qrOptions.size}px</strong>
                            </div>
                            <div className="preview-detail">
                                <span>Niveau: </span>
                                <strong>{qrOptions.level} ({
                                    qrOptions.level === 'L' ? '~7%' :
                                        qrOptions.level === 'M' ? '~15%' :
                                            qrOptions.level === 'Q' ? '~25%' : '~30%'
                                })</strong>
                            </div>
                            <div className="preview-detail">
                                <span>Marge: </span>
                                <strong>{qrOptions.includeMargin ? 'Activée' : 'Désactivée'}</strong>
                            </div>
                            <div className="preview-detail">
                                <span>Couleurs: </span>
                                <div className="color-swatches">
                                    <div
                                        className="color-swatch"
                                        style={{ backgroundColor: qrOptions.fgColor }}
                                    />
                                    <span className="color-swatch-sep">sur</span>
                                    <div
                                        className="color-swatch"
                                        style={{ backgroundColor: qrOptions.bgColor }}
                                    />
                                </div>
                            </div>
                            <div className="preview-detail">
                                <span>Contenu: </span>
                                <strong>"QR Studio Demo"</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContentCard>
    )
}

export default Customize
