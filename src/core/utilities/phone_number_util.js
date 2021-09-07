import {PhoneNumberUtil, PhoneNumberFormat} from 'google-libphonenumber'
import _ from 'lodash'

export const phoneUtils = {

    /**
     * Returns a formatted E164 phonenumber if number and country code is valid;
     * otherwise, the original number is returned. 
     * 
     * @function format
     * @param {string} phoneNumber
     * @param {string} countryCode - ISO2
     * @returns {string}
     */
    format(phoneNumber, countryCode) {

        const phoneUtil = PhoneNumberUtil.getInstance()
        
        let pn = phoneNumber,
            
            valid = false,
            pnumber

        try {

            if (!_.startsWith(pn, '+')){
                pn = '+'.concat(pn)
            }

            // Determine the phone number if valid.
            pnumber = phoneUtil.parse(pn)
            valid = phoneUtil.isValidNumber(pnumber)
        }
        catch(e) {
            // Invalid country calling code when parsing number without country code(+##).
        }        
            
        try {

            // If phone number is invalid, fix by adding a country code. 
            if (!valid) {

                if (_.startsWith(pn, '+')){
                    pn = pn.slice(1)
                }

                pnumber = phoneUtil.parse(pn, countryCode)
                valid = phoneUtil.isValidNumber(pnumber)
            }

            // Return formatted E164 phone number if valid.
            if (valid) {
                return phoneUtil.format(pnumber, PhoneNumberFormat.E164)
            }

        }
        catch(e) {
            // Invalid country calling code
        }

        // Return original phone number if not valid.        
        return phoneNumber
    },

    /**
     * Tests whether a phone number matches a valid pattern. Note this doesn't
     * verify the number is actually in use, which is impossible to tell by just
     * looking at a number itself.
     * 
     * @function isValidNumber
     * @param {i18n.phonenumbers.PhoneNumber} number the phone number that we want to validate.
     * @returns {boolean} a boolean that indicates whether the number is of a valid pattern.
     */
    isValidNumber(number) {
        
        const phoneUtil = PhoneNumberUtil.getInstance()
        
        let pnumber = phoneUtil.parse(number)

        return phoneUtil.isValidNumber(pnumber)
    }
}