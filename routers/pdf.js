const PDFDocument = require('pdfkit');
const { response } = require('express');

// stream can be either an express.Response object or an fs.createWriteStream object
function exportOrderToPdf(order, stream) {

    const doc = new PDFDocument();
    doc.pipe(stream);

    doc
        .fontSize(20)
        .text('My Order List', {
            align: 'center',
            underline: true
        });

    doc.moveDown();

    order.forEach(item =>
        doc
            .fontSize(10)
            .text(item.quantity, {
                align: 'justify'
            })
            .text(item.description, {
                align: 'justify'
            })
            .text(`item Price :${item.salePrice}€ .`, {
                align: 'justify'
            })
            .moveDown(0.4)
    );
    doc.moveDown(5)

    doc.fontSize(12)
        .fillColor('blue')
        .text('WhiskyShop.com', 20, 5);

    const width = doc.widthOfString('WhiskyShop.com');
    const height = doc.currentLineHeight();

    doc
        .underline(20, 5, width, height, { color: 'blue' })
        .link(20, 5, width, height, 'http://localhost:3000/');

    doc.end();
}

module.exports = { exportOrderToPdf }