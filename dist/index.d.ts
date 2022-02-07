import Joi from 'joi';
interface IValidationconfigurationuration {
    allowEmpty?: boolean;
    optional?: boolean;
    integer?: boolean;
    items?: any;
    required?: boolean;
    valids?: Array<string | number>;
    min?: number;
}
declare class Validations {
    errorMessenger(errors: any, configuration?: IValidationconfigurationuration): any;
    array(configuration?: IValidationconfigurationuration): Joi.ArraySchema;
    boolean(configuration?: IValidationconfigurationuration): Joi.BooleanSchema;
    date(configuration?: IValidationconfigurationuration): Joi.DateSchema;
    email(configuration?: IValidationconfigurationuration): Joi.StringSchema;
    string(configuration?: IValidationconfigurationuration): Joi.StringSchema;
    number(configuration?: IValidationconfigurationuration): Joi.NumberSchema;
    object(configuration?: IValidationconfigurationuration): Joi.ObjectSchema<any>;
    password(configuration?: IValidationconfigurationuration): Joi.StringSchema;
}
export default Validations;
