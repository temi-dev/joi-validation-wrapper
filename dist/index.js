"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Validations {
    errorMessenger(errors, config) {
        errors.forEach((error) => {
            switch (error.code) {
                //General error messages
                case "any.required":
                    error.message = " `" + error.local.label + "` is required. ";
                    break;
                case "any.only":
                    error.message = " `" + error.local.label + "` must be any of {" + config.valids + "} . ";
                    break;
                //Array error messages
                case "array.includesRequiredUnknowns":
                    error.message = " `" + error.local.label + "` does not contain 1 required value(s) . ";
                    break;
                case "array.base":
                    error.message = " `" + error.local.label + "` must be an array. ";
                    break;
                //Date error messages
                case "date.base":
                    error.message = " `" + error.local.label + "` must be a valid date. ";
                    break;
                //String error messages
                case "string.base":
                    error.message = " `" + error.local.label + "` must be a string. ";
                    break;
                case "string.empty":
                    error.message = " `" + error.local.label + "`  must not be empty. ";
                    break;
                case "string.email":
                    error.message = " '" + error.local.label + "' must be a valid email address. ";
                    break;
                case "string.min":
                    error.message = "'" + error.local.label + "' should be at least 8 characters.";
                //Number error messages
                case "number.base":
                    error.message = " `" + error.local.label + "` must be a number . ";
                    break;
                case "number.empty":
                    error.message = " `" + error.local.label + "`  must not be empty. ";
                    break;
            }
        });
        return errors;
    }
    array(config) {
        let validation = joi_1.default.array();
        if (config.required)
            validation = validation.required();
        if (config.optional)
            validation = validation.optional();
        if (config.items)
            validation = validation.items(config.items);
        return validation.error((errors) => {
            return this.errorMessenger(errors, config);
        });
    }
    date(config) {
        let validation = joi_1.default.date();
        if (config.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, config);
        });
    }
    email(config) {
        let validation = joi_1.default.string().email();
        if (config.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, config);
        });
    }
    string(config) {
        let validation = joi_1.default.string();
        if (config.allowEmpty)
            validation = validation.allow('');
        if (config.optional)
            validation = validation.optional();
        if (config.required)
            validation = validation.required();
        if (config.valids)
            validation = validation.valid(...config.valids);
        return validation.error((errors) => {
            return this.errorMessenger(errors, config);
        });
    }
    number(config) {
        let validation = joi_1.default.number();
        if (config.required)
            validation = validation.required();
        if (config.optional)
            validation = validation.optional();
        if (config.integer)
            validation = validation.integer();
        return validation.error((errors) => {
            return this.errorMessenger(errors, config);
        });
    }
    object(config) {
        let validation = joi_1.default.object();
        if (config.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, config);
        });
    }
    password(config) {
        let validation = joi_1.default.string().min(8);
        if (config.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, config);
        });
    }
}
exports.default = Validations;
