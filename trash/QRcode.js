app.get('/doctor/:doctorId', async (req, res) => {
    const doctorId = req.params.doctorId;
    const qrCodePath = `/QRcodes/${doctorId}_qr.png`;

    res.send(`
        <h1>Doctor Profile: ${doctorId}</h1>
        <img src="${qrCodePath}" alt="QR Code for ${doctorId}">
        <a href="${qrCodePath}" download>Download QR Code</a>
    `);
});