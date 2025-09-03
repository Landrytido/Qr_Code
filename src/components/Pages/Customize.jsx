import { useState } from 'react'
import ContentCard from '../UI/ContentCard'
import FeatureCard from '../UI/FeatureCard'

const Customize = () => {
    const [settings, setSettings] = useState({
        foregroundColor: '#000000',
        backgroundColor: '#ffffff',
        moduleStyle: 'square',
        errorCorrection: 'medium'
    })

    const handleColorChange = (colorType, color) => {
        setSettings(prev => ({
            ...prev,
            [colorType]: color
        }))
    }

    const handleApplyChanges = () => {
        console.log('Applying customization:', settings)
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
                            <span style={{ color: 'var(--text-secondary)', minWidth: '100px' }}>Premier plan:</span>
                            <input
                                type="color"
                                className="color-picker"
                                value={settings.foregroundColor}
                                onChange={(e) => handleColorChange('foregroundColor', e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)', minWidth: '100px' }}>Arrière-plan:</span>
                            <input
                                type="color"
                                className="color-picker"
                                value={settings.backgroundColor}
                                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                            />
                        </div>
                    </div>
                </FeatureCard>

                <FeatureCard title="Style des modules">
                    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                        <select
                            className="form-select"
                            value={settings.moduleStyle}
                            onChange={(e) => setSettings(prev => ({ ...prev, moduleStyle: e.target.value }))}
                        >
                            <option value="square">Carrés classiques</option>
                            <option value="rounded">Carrés arrondis</option>
                            <option value="circle">Cercles</option>
                            <option value="diamond">Losanges</option>
                        </select>
                    </div>
                </FeatureCard>

                <FeatureCard title="Logo central">
                    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            Télécharger un logo
                        </button>
                        <small style={{ color: 'var(--text-secondary)' }}>
                            Formats acceptés: PNG, JPG, SVG
                        </small>
                    </div>
                </FeatureCard>

                <FeatureCard title="Niveau de correction">
                    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                        <select
                            className="form-select"
                            value={settings.errorCorrection}
                            onChange={(e) => setSettings(prev => ({ ...prev, errorCorrection: e.target.value }))}
                        >
                            <option value="low">Faible (7%)</option>
                            <option value="medium">Moyen (15%)</option>
                            <option value="high">Élevé (25%)</option>
                            <option value="max">Maximum (30%)</option>
                        </select>
                    </div>
                </FeatureCard>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button className="btn" onClick={handleApplyChanges}>
                    Appliquer les changements
                </button>
            </div>
        </ContentCard>
    )
}

export default Customize