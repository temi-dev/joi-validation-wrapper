import Joi from 'joi';
interface IValidationConfiguration {
    allowEmpty?: boolean;
    optional?: boolean;
    integer?: number;
    items?: any;
    required?: boolean;
    valids?: Array<string | number>;
}
declare class Validations {
    errorMessenger(errors: any, config: IValidationConfiguration): any;
    array(config: IValidationConfiguration): Joi.ArraySchema;
    date(config: IValidationConfiguration): Joi.DateSchema;
    email(config: IValidationConfiguration): Joi.StringSchema;
    string(config: IValidationConfiguration): Joi.StringSchema;
    number(config: IValidationConfiguration): Joi.NumberSchema;
    object(config: IValidationConfiguration): Joi.ObjectSchema<any>;
    password(config: IValidationConfiguration): Joi.StringSchema;
}
export default Validations;
