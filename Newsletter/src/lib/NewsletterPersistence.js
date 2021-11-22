const fs = require('fs'); 
const newslettermod = require('../model/newsletter'); 

function getNewsletter(filename = 'data.json') {
    let newsletter = new newslettermod.Newsletter();
    if (fs.existsSync(filename)) {
        newsletter = newslettermod.Newsletter.load(filename);
    }
    return newsletter;
}

function saveNewsletter(newsletter, filename = 'data.json') {
    newsletter.save(filename);
}

module.exports = {
    getNewsletter,
    saveNewsletter
};
