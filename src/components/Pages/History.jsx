import { useState, useEffect } from 'react'
import ContentCard from '../UI/ContentCard'

const History = () => {
    const [qrHistory, setQrHistory] = useState([])

    useEffect(() => {
        // Simulation de données d'historique
        const mockHistory = [
            { id: 1, title: 'Mon site portfolio', type: 'Site Web', date: '15 Jan 2024' },
            { id: 2, title: 'WiFi Bureau', type: 'WiFi', date: '12 Jan 2024' },
            { id: 3, title: 'Contact professionnel', type: 'Email', date: '10 Jan 2024' },
            { id: 4, title: 'Message d\'accueil', type: 'Texte', date: '8 Jan 2024' },
            { id: 5, title: 'Numéro support', type: 'Téléphone', date: '5 Jan 2024' },
            { id: 6, title: 'Message automatique', type: 'SMS', date: '3 Jan 2024' }
        ]
        setQrHistory(mockHistory)
    }, [])

    return (
        <ContentCard>
            <h1 className="page-title">Historique des QR Codes</h1>
            <p className="main-description">
                Retrouvez tous vos QR codes créés et téléchargez-les à nouveau
            </p>

            <div className="history-grid">
                {qrHistory.map(item => (
                    <div key={item.id} className="history-card">
                        <div className="history-qr">
                            QR Code<br />
                            <small>{item.type}</small>
                        </div>
                        <div className="history-info">
                            <div className="history-title">{item.title}</div>
                            <div className="history-date">Créé le {item.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </ContentCard>
    )
}

export default History