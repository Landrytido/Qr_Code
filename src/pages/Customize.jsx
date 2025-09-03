import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { theme } from '../theme';

function Customize() {
    const [text, setText] = useState('');
    const [fgColor, setFgColor] = useState(theme.primary);
    const [bgColor, setBgColor] = useState('#fff');

    return (
        <div>
            <h2 style={{ color: theme.primary }}>Personnaliser le QR Code</h2>
            <input
                type="text"
                placeholder="Texte ou URL à encoder"
                value={text}
                onChange={e => setText(e.target.value)}
                style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
            />
            <div style={{ marginBottom: 20 }}>
                <label>Couleur des pixels : </label>
                <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} style={{ marginRight: 16 }} />
                <label>Fond : </label>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
            </div>
            <div style={{ margin: '20px' }}>
                {text && (
                    <QRCodeSVG value={text} size={220} fgColor={fgColor} bgColor={bgColor} />
                )}
            </div>
        </div>
    );
}

export default Customize;
