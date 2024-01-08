import { check } from 'express-validator';
import { passwordRegex } from '../utils/constants/regex';

export const subscribeValidator = () => {        
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
            .matches(passwordRegex).bail()
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
            .matches(passwordRegex).bail()
            .withMessage("Your password must be 8 characters long, an uppercase letter, a lowercase letter, a number or a special character").bail(),
    ];
}

export const updateProfileValidator = () => {        
    return [
        check('firstname')
            .optional()
            .notEmpty().withMessage("Your firstname needs to be filled").bail()
            .isString().trim().withMessage("Your firstname needs to be in a valid format").bail(),

        check('lastname')
            .optional()
            .notEmpty().withMessage("Your lastname needs to be filled").bail()
            .isString().trim().withMessage("Your lastname needs to be in a valid format").bail(),

    ];
}
