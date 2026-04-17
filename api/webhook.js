module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'POST') {
        const event = req.body?.meta?.event_name;
        console.log('Webhook received:', event);
        res.status(200).json({ received: true, event });
    } else {
        res.status(200).json({ message: 'Webhook endpoint ready' });
    }
};
