module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
        status: 'healthy',
        service: 'css-to-tailwind',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
};
