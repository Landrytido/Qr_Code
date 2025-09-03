import { useApp } from '../../hooks/useApp'
import qrCode from 'qrcode-generator'
import ContentCard from '../UI/ContentCard'

const History = () => {
    const { history } = useApp()

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    const downloadQR = (item) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const qr = qrCode(0, item.options.level || 'M')
        qr.addData(item.data)
        qr.make()

        const moduleCount = qr.getModuleCount()
        const cellSize = item.options.size / moduleCount

        canvas.width = item.options.size
        canvas.height = item.options.size

        ctx.fillStyle = item.options.bgColor || '#ffffff'
        ctx.fillRect(0, 0, item.options.size, item.options.size)

        ctx.fillStyle = item.options.fgColor || '#000000'

        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (qr.isDark(row, col)) {
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
                }
            }
        }

        const link = document.createElement('a')
        link.download = `qr-code-${item.id}.png`
        link.href = canvas.toDataURL()
        link.click()
    }

    const clearHistory = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique ?')) {
            localStorage.removeItem('qr-history')
            window.location.reload()
        }
    }

    if (history.length === 0) {
        return (
            <ContentCard>
                <h1 className="page-title">Historique des QR Codes</h1>
                <p className="main-description">
                    Retrouvez tous vos QR codes créés et téléchargez-les à nouveau
                </p>

                <div style={{
                    textAlign: 'center',
                    padding: '3rem 1rem',
                    color: 'var(--text-secondary)'
                }}>
                    <h3>Aucun QR code généré</h3>
                    <p>Commencez par générer votre premier QR code !</p>
                </div>
            </ContentCard>
        )
    }

    return (
        <ContentCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="page-title">Historique des QR Codes</h1>
                    <p className="main-description">
                        {history.length} QR code{history.length > 1 ? 's' : ''} généré{history.length > 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={clearHistory}
                    className="btn"
                    style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                >
                    Vider l'historique
                </button>
            </div>

            <div className="history-grid">
                {history.map(item => (
                    <div key={item.id} className="history-card">
                        <div className="history-qr">
                            QR Code<br />
                            <small>{formatDate(item.createdAt)}</small>
                        </div>
                        <div className="history-info">
                            <div className="history-title">
                                {item.data.length > 30
                                    ? `${item.data.substring(0, 30)}...`
                                    : item.data
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    {item.options.size}px
                                </span>
                                <button
                                    onClick={() => downloadQR(item)}
                                    className="btn"
                                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                                >
                                    Télécharger
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ContentCard>
    )
}

export default History