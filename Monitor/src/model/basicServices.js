const { UNQFY_API_HOST, LOGGING_API_HOST, NEWSLETTER_API_HOST } = process.env;
const Service = require('../model/service_enum');
const ServiceClient = require("./service_client");

const unqfyService = new ServiceClient(Service.UNQfy, UNQFY_API_HOST);
const loggingService = new ServiceClient(Service.Logging, LOGGING_API_HOST);
const newsletterService = new ServiceClient(Service.Newsletter, NEWSLETTER_API_HOST);

const basicServices = [
    unqfyService,
    loggingService,
    newsletterService
];

module.exports = basicServices;