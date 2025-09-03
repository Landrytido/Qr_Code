import { useApp } from '../../hooks/useApp'
import ContentCard from '../UI/ContentCard'
import FeatureCard from '../UI/FeatureCard'

const Customize = () => {
    const { qrOptions, setQrOptions } = useApp()

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

    return (
        <ContentCard>
            <h1 className="page-title">Personnaliser le Style</h1>
            <p className="main-description">
                Personnalisez l'apparence de vos QR codes avec des couleurs et styles uniques
            </p>

            <div className="customization-grid">
                <FeatureCard title="Couleurs">
                    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)', minWidth: '100px' }}>QR Code:</span>
                            <input
                                type="color"
                                className="color-picker"
                                value={qrOptions.fgColor}
                                onChange={(e) => handleOptionChange('fgColor', e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)', minWidth: '100px' }}>Arrière-plan:</span>
                            <input
                                type="color"
                                className="color-picker"
                                value={qrOptions.bgColor}
                                onChange={(e) => handleOptionChange('bgColor', e.target.value)}
                            />
                        </div>
                    </div>
                </FeatureCard>

                <FeatureCard title="Taille">
                    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                        <input
                            type="range"
                            min="128"
                            max="1024"
                            step="32"
                            value={qrOptions.size}
                            onChange={(e) => handleOptionChange('size', parseInt(e.target.value))}
                        />
                        <div style={{ textAlign: 'center' }}>
                            <strong>{qrOptions.size}px</strong>
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
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                <span style={{ color: 'var(--text-secondary)' }}>
                    Les paramètres sont sauvegardés automatiquement
                </span>
            </div>
        </ContentCard>
    )
}

export default Customize