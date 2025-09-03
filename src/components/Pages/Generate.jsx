import { useState } from 'react'
import ContentCard from '../UI/ContentCard'

const Generate = () => {
    const [formData, setFormData] = useState({
        type: 'text',
        content: '',
        size: 'medium'
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleGenerate = () => {
        console.log('Generating QR code with:', formData)
        // Ici vous pourriez ajouter la logique de génération
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
                        <label className="form-label">Type de contenu</label>
                        <select
                            className="form-select"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            <option value="text">Texte simple</option>
                            <option value="url">URL / Site web</option>
                            <option value="email">Email</option>
                            <option value="phone">Téléphone</option>
                            <option value="wifi">WiFi</option>
                            <option value="sms">SMS</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Contenu</label>
                        <textarea
                            className="form-input"
                            name="content"
                            rows="4"
                            placeholder="Entrez votre texte, URL ou autres données..."
                            value={formData.content}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Taille</label>
                        <select
                            className="form-select"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                        >
                            <option value="small">Petite (200x200)</option>
                            <option value="medium">Moyenne (400x400)</option>
                            <option value="large">Grande (600x600)</option>
                            <option value="xl">Extra large (800x800)</option>
                        </select>
                    </div>

                    <button className="btn" onClick={handleGenerate}>
                        Générer le QR Code
                    </button>
                </div>

                <div className="qr-preview">
                    <div className="qr-placeholder">
                        Aperçu du QR Code<br />
                        <small>Remplissez le formulaire pour voir le résultat</small>
                    </div>
                </div>
            </div>
        </ContentCard>
    )
}

export default Generate