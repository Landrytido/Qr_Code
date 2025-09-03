import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { theme } from '../theme';

function Generate() {
    const [type, setType] = useState('text');
    const [input, setInput] = useState('');
    const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });

    let qrValue = input;
    if (type === 'wifi') {
        qrValue = `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
    }

    return (
        <div>
            <h2 style={{ color: theme.primary }}>Générer un QR Code</h2>
            <div style={{ marginBottom: 24 }}>
                <label>
                    <input type="radio" checked={type === 'text'} onChange={() => setType('text')} /> Texte/URL
                </label>
                <label style={{ marginLeft: 16 }}>
                    <input type="radio" checked={type === 'wifi'} onChange={() => setType('wifi')} /> WiFi
                </label>
            </div>
            {type === 'text' ? (
                <input
                    type="text"
                    placeholder="Entrez le texte ou l'URL"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
                />
            ) : (
                <div style={{ marginBottom: 20 }}>
                    <input
                        type="text"
                        placeholder="Nom du réseau (SSID)"
                        value={wifi.ssid}
                        onChange={e => setWifi({ ...wifi, ssid: e.target.value })}
                        style={{ padding: '8px', width: '200px', marginRight: 8 }}
                    />
                    <input
                        type="text"
                        placeholder="Mot de passe"
                        value={wifi.password}
                        onChange={e => setWifi({ ...wifi, password: e.target.value })}
                        style={{ padding: '8px', width: '200px', marginRight: 8 }}
                    />
                    <select
                        value={wifi.encryption}
                        onChange={e => setWifi({ ...wifi, encryption: e.target.value })}
                        style={{ padding: '8px', width: '100px' }}
                    >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">Aucun</option>
                    </select>
                </div>
            )}
            <div style={{ margin: '20px' }}>
                {qrValue && (
                    <QRCodeSVG value={qrValue} size={220} />
                )}
            </div>
        </div>
    );
}

export default Generate;
