const PDFDocument = require('pdfkit');
const { response } = require('express');

// stream can be either an express.Response object or an fs.createWriteStream object
function exportOrderToPdf(order, stream) {

    const doc = new PDFDocument();
    doc.pipe(stream);

    doc
        .fontSize(20)
        .text('My Order List');

    doc.moveDown();

    order.forEach(item =>
        doc
            .fontSize(10)
            .text(item.description)
            .text(`item Price :${item.salePrice}€`)
            .moveDown()
    );

    doc.end();
}

module.exports = { exportOrderToPdf }