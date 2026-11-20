export default async function handler(req, res) {
    // السماح فقط بطلبات POST لحماية السيرفر
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // التوكن ومعرّف الشات الخاص بك محفوظين بأمان تام في السيرفر الوسيط
    const BOT_TOKEN = '9032113024:AAEqpxKqvOJI_yoFk57Ys0gxB5GHwlHP4L0';
    const CHAT_ID = '9032113024';

    try {
        const telegramUrl = https://api.telegram.org/bot${BOT_TOKEN}/sendMessage;
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({ success: true, message: 'تم إرسال الشكوى بنجاح' });
        } else {
            return res.status(500).json({ success: false, error: data.description });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}