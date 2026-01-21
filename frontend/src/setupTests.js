//Freeze Date.now to be 23/2/2021
Date = class extends Date {
    constructor(...options) {
        if (options.length) {
            super(...options);
        } else {
            super(2021, 2, 23);
        }
    }
};