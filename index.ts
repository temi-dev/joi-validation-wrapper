import Joi from 'joi'

interface IValidationconfigurationuration {
    allowEmpty?: boolean;
    optional?: boolean;
    integer?: number;
    items?: any;
    required?: boolean;
    valids?: Array<string | number>;
    min?: number
}

class Validations {

    // Error messages formmating
    errorMessenger(errors: any, configuration?: IValidationconfigurationuration) {
        errors.forEach((error: any) => {
            switch (error.code) {

                //General error messages
                case "any.required":
                    error.message = " `" + error.local.label + "` is required. ";
                    break;
                case "any.only":
                    error.message = " `" + error.local.label + "` must be any of {" + configuration?.valids + "} . ";
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
                    break;
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

    //Validaing an array field
    array(configuration?: IValidationconfigurationuration) {
        let validation = Joi.array();
        if (configuration?.required)
            validation = validation.required()
        if (configuration?.optional)
            validation = validation.optional();
        if (configuration?.items)
            validation = validation.items(configuration.items);
        return validation.error((errors: any) => {
            return this.errorMessenger(errors, configuration)
        });
    }

    //Validating a date field
    date(configuration?: IValidationconfigurationuration) {
        let validation = Joi.date();
        if (configuration?.required)
            validation = validation.required();
        return validation.error((errors: any) => {
            return this.errorMessenger(errors, configuration)
        });
    }

    //Validating an email field
    email(configuration?: IValidationconfigurationuration) {
        let validation = Joi.string().email();
        if (configuration?.required)
            validation = validation.required();
        return validation.error((errors: any) => {
            return this.errorMessenger(errors, configuration)
        });
    }

    //Validating a string field
    string(configuration?: IValidationconfigurationuration) {
        let validation = Joi.string();
        if (configuration?.allowEmpty)
            validation = validation.allow('');
        if (configuration?.optional)
            validation = validation.optional();
        if (configuration?.required)
            validation = validation.required();
        if (configuration?.valids)
            validation = validation.valid(...configuration.valids);
        return validation.error((errors: any) => {
            return this.errorMessenger(errors, configuration)
        });
    }

    //Validating a number field
    number(configuration?: IValidationconfigurationuration) {
        let validation = Joi.number();
        if (configuration?.required)
            validation = validation.required();
        if (configuration?.optional)
            validation = validation.optional();
        if (configuration?.integer)
            validation = validation.integer();
        return validation.error((errors: any) => {
            return this.errorMessenger(errors, configuration)
        });
    }

    //Validating an object
    object(configuration?: IValidationconfigurationuration) {
        let validation = Joi.object();
        if (configuration?.required)
            validation = validation.required();
        return validation.error((errors: any) => {
            return this.errorMessenger(errors, configuration)
        });
    }
  
    //Password validation
    password(configuration?: IValidationconfigurationuration) {
        let validation = Joi.string();
        if (configuration?.min)
            validation = validation.min(configuration.min)
        if (configuration?.required)
            validation = validation.required();
        return validation.error((errors: any) => {
            return this.errorMessenger(errors, configuration)
        });
    }
}

export default Validations;