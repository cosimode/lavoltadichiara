import { useState } from 'react';

export default function WifiCard({ network, password }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(password);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                return;
            } catch (err) {}
        }
        const textArea = document.createElement("textarea");
        textArea.value = password;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {}
        document.body.removeChild(textArea);
    };

    return (
        <div className="bg-white rounded-sm p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] border border-slate-100 text-center" role="region" aria-label="Informazioni Wi-Fi">
            <div className="flex flex-col items-center mb-8 text-slate-900">
                <div className="p-4 bg-[#fdfcf9] rounded-full text-[#c5a368] mb-4 border border-[#c5a368]/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.5 9.5 0 0113.436 0m-17.678-4.242a14.5 14.5 0 0120.486 0" />
                    </svg>
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c5a368] mb-2 font-sans">Connessione Wi-Fi</h3>
                <p className="font-light text-xl italic tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{network}</p>
            </div>

            <button
                onClick={handleCopy}
                aria-label={copied ? "Password copiata con successo" : "Copia la password del Wi-Fi"}
                className={`w-full py-4 rounded-sm font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 font-sans ${
                    copied ? 'bg-green-600 text-white' : 'bg-[#0f172a] text-white active:scale-95'
                }`}
            >
                {copied ? 'Password Copiata' : 'Copia Password'}
            </button>
        </div>
    );
}