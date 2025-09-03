import { useApp } from '../../hooks/useApp'
import { useRef, useEffect, useCallback } from 'react'
import qrCode from 'qrcode-generator'
import ContentCard from '../UI/ContentCard'
import FeatureCard from '../UI/FeatureCard'

const Customize = () => {
    const { qrOptions, setQrOptions } = useApp()
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
            <h1 className="page-title">Personnaliser le Style</h1>
            <p className="main-description">
                Personnalisez l'apparence de vos QR codes et voyez le résultat en temps réel
            </p>

            <div className="customize-layout">
                <div className="customize-controls">
                    <div className="customization-grid">
                        <FeatureCard title="Couleurs">
                            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: '#e2e8f0', minWidth: '100px', fontWeight: '500' }}>QR Code:</span>
                                    <input
                                        type="color"
                                        className="color-picker"
                                        value={qrOptions.fgColor}
                                        onChange={(e) => handleOptionChange('fgColor', e.target.value)}
                                    />
                                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontFamily: 'monospace' }}>{qrOptions.fgColor}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: '#e2e8f0', minWidth: '100px', fontWeight: '500' }}>Arrière-plan:</span>
                                    <input
                                        type="color"
                                        className="color-picker"
                                        value={qrOptions.bgColor}
                                        onChange={(e) => handleOptionChange('bgColor', e.target.value)}
                                    />
                                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontFamily: 'monospace' }}>{qrOptions.bgColor}</span>
                                </div>
                            </div>
                        </FeatureCard>

                        <FeatureCard title="Taille">
                            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                                <input
                                    type="range"
                                    min="128"
                                    max="512"
                                    step="32"
                                    value={qrOptions.size}
                                    onChange={(e) => handleOptionChange('size', parseInt(e.target.value))}
                                    className="size-slider"
                                />
                                <div style={{ textAlign: 'center' }}>
                                    <strong style={{ color: '#00d4aa' }}>{qrOptions.size}px</strong>
                                </div>
                            </div>
                        </FeatureCard>

                        <FeatureCard title="Niveau de correction">
                            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
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
                            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>
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

                    <div style={{ marginTop: '2rem' }}>
                        <button className="btn" onClick={resetToDefaults} style={{ marginRight: '1rem' }}>
                            Réinitialiser
                        </button>
                        {qrOptions.fgColor === qrOptions.bgColor && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                background: 'rgba(255, 59, 48, 0.1)',
                                border: '1px solid rgba(255, 59, 48, 0.3)',
                                borderRadius: '8px',
                                color: '#ff6b6b',
                                fontSize: '0.9rem'
                            }}>
                                ⚠️ Les couleurs de premier plan et d'arrière-plan sont identiques. Le QR code ne sera pas lisible.
                            </div>
                        )}
                        <div style={{ marginTop: '1rem' }}>
                            <span style={{ color: '#cbd5e1' }}>
                                Les paramètres sont sauvegardés automatiquement
                            </span>
                        </div>
                    </div>
                </div>

                <div className="customize-preview">
                    <div className="preview-container">
                        <h3 className="preview-title">Aperçu en temps réel</h3>
                        <div className="preview-qr">
                            <canvas
                                ref={canvasRef}
                                className="preview-canvas"
                            />
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
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        backgroundColor: qrOptions.fgColor,
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '2px'
                                    }}></div>
                                    <span style={{ fontSize: '0.8rem' }}>sur</span>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        backgroundColor: qrOptions.bgColor,
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '2px'
                                    }}></div>
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