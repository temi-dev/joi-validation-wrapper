# joi-validation-wrapper

Validation wrapper built on [Joi](https://www.npmjs.com/package/joi)

## Installation

```` npm i joi````

```` npm i @temi.dev/joi-validation-wrapper````

## Validation options

| Option | Description |
| --- | --- |
| allowEmpty | Field is allowed to have empty value |
| integer | Value of a number field must be an integer  |
| items | Allowed items of an array  |
| min | The minimum characters for a password field |
| optional | Field is optional  |
| valids | An array of strings  a string field is allowed to have.  |

## Usage

````
import Joi from "joi";
import { ValidationResult } from "joi";

import express, { Request, response, Response } from "express";
const app = express();

import Validations from "@temi.dev/joi-validation-wrapper";
const validations = new Validations();


app.post("/helloworld", async (req: Request, res: Response) => {
  const schema = Joi.object({
    emailAddress: validations.email({ required: true }), //validating an email field
    password: validations.password({ required: true, min: 8}), //validating a password field
    interests: validations.array({required: true, items: ["singing","dancing"]}), //validating an array field,
    bio: validations.string({optional:true }), //validating a string field
    age: validations.number({required:true, integer: true}), //validating a number field
    dateOfBirth: validations.date({required:true}), //validating a date field
  });
  const errorResult: ValidationResult = schema.validate(req.body);
  if (errorResult.error) {
    res
      .status(400)
      .send(errorResult.error?.details[0].message);
  } else {
    res.send('alidated);
  }
});
````
