import { check } from 'express-validator';

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
