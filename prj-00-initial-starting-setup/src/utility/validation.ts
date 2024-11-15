
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validate(validatableInput: Validatable) {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength != undefined) {
            isValid = isValid && validatableInput.value.toString().length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != undefined) {
            isValid = isValid && validatableInput.value.toString().length <= validatableInput.maxLength;
        }
        if (validatableInput.min != undefined) {
            isValid = isValid && +validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != undefined) {
            isValid = isValid && +validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
