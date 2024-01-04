import { check } from 'express-validator';

export const credentialsValidator = () => {        
    return [
        check('firstname')
            .exists().withMessage("Your firstname needs to be filled").bail()
            .notEmpty().withMessage("Your firstname needs to be filled").bail()
            .isString().trim().withMessage("Your firstname needs to be in a valid format").bail(),

        check('lastname')
            .exists().withMessage("Your lastname needs to be filled").bail()
            .notEmpty().withMessage("Your lastname needs to be filled").bail()
            .isString().trim().withMessage("Your lastname needs to be in a valid format").bail(),

        check('email')
            .exists().withMessage("Email needs to be filled").bail()
            .notEmpty().withMessage("Email needs to be filled").bail()
            .isEmail().normalizeEmail().withMessage("Email is invalid").bail(),

        check('password')
            .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$").bail()
            .withMessage("Your password must be 8 characters long, an uppercase letter, a lowercase letter, a number or a special character").bail(),
    ];
}

export const loginValidator = () => {        
    return [
        check('email')
            .exists().withMessage("Email needs to be filled").bail()
            .notEmpty().withMessage("Email needs to be filled").bail()
            .isEmail().normalizeEmail().withMessage("Email is invalid").bail(),

        check('password')
            .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$").bail()
            .withMessage("Your password must be 8 characters long, an uppercase letter, a lowercase letter, a number or a special character").bail(),
    ];
}
