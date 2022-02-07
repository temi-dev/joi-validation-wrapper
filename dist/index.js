"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Validations {
    // Error messages formmating
    errorMessenger(errors, configuration) {
        errors.forEach((error) => {
            switch (error.code) {
                //General error messages
                case "any.required":
                    error.message = " `" + error.local.label + "` is required. ";
                    break;
                case "any.only":
                    error.message = " `" + error.local.label + "` must be any of {" + (configuration === null || configuration === void 0 ? void 0 : configuration.valids) + "} . ";
                    break;
                //Array error messages
                case "array.includesRequiredUnknowns":
                    error.message = " `" + error.local.label + "` does not contain 1 required value(s) . ";
                    break;
                case "array.base":
                    error.message = " `" + error.local.label + "` must be an array. ";
                    break;
                //Boolean error messages
                case "boolean.base":
                    error.message = " `" + error.local.label + "` must be a boolean. ";
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
                    break;
                //Number error messages
                // case "number.base":
                //     error.message = " `" + error.local.label + "` must be a number . ";
                //     break;
                case "number.empty":
                    error.message = " `" + error.local.label + "`  must not be empty. ";
                    break;
            }
        });
        return errors;
    }
    //Validaing an array field
    array(configuration) {
        let validation = joi_1.default.array();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.required)
            validation = validation.required();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.optional)
            validation = validation.optional();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.items)
            validation = validation.items(configuration.items);
        return validation.error((errors) => {
            return this.errorMessenger(errors, configuration);
        });
    }
    boolean(configuration) {
        let validation = joi_1.default.boolean();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, configuration);
        });
    }
    //Validating a date field
    date(configuration) {
        let validation = joi_1.default.date();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, configuration);
        });
    }
    //Validating an email field
    email(configuration) {
        let validation = joi_1.default.string().email();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, configuration);
        });
    }
    //Validating a string field
    string(configuration) {
        let validation = joi_1.default.string();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.allowEmpty)
            validation = validation.allow('');
        if (configuration === null || configuration === void 0 ? void 0 : configuration.optional)
            validation = validation.optional();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.required)
            validation = validation.required();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.valids)
            validation = validation.valid(...configuration.valids);
        return validation.error((errors) => {
            return this.errorMessenger(errors, configuration);
        });
    }
    //Validating a number field
    number(configuration) {
        let validation = joi_1.default.number();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.required)
            validation = validation.required();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.optional)
            validation = validation.optional();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.integer)
            validation = validation.integer();
        return validation.error((errors) => {
            return this.errorMessenger(errors, configuration);
        });
    }
    //Validating an object
    object(configuration) {
        let validation = joi_1.default.object();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, configuration);
        });
    }
    //Password validation
    password(configuration) {
        let validation = joi_1.default.string();
        if (configuration === null || configuration === void 0 ? void 0 : configuration.min)
            validation = validation.min(configuration.min);
        if (configuration === null || configuration === void 0 ? void 0 : configuration.required)
            validation = validation.required();
        return validation.error((errors) => {
            return this.errorMessenger(errors, configuration);
        });
    }
}
exports.default = Validations;
