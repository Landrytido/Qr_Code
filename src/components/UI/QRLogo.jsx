import React from 'react'
import './QRLogo.css'

const QRLogo = () => {
    const qrPattern = [
        [1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 1, 1]
    ]

    return (
        <div className="qr-logo">
            <div className="qr-grid">
                {qrPattern.map((row, rowIndex) =>
                    row.map((module, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`qr-module ${module ? 'qr-module-dark' : 'qr-module-light'}`}
                            style={{
                                animationDelay: `${(rowIndex * 9 + colIndex) * 0.05}s`
                            }}
                        />
                    ))
                )}
            </div>
            <div className="qr-scan-line"></div>
        </div>
    )
}

export default QRLogo
