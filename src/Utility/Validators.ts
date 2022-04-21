export function IsPhoneValid(phoneNumber: string): boolean {
    return (phoneNumber.length === 7 || phoneNumber.length === 10) 
        &&  !!phoneNumber.match("[0-9]+");
}

export function IsEmailValid(email: string): boolean {
    return email.includes("@");
}

//for a good regex 
//https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
export function IsPasswordValid(password: string): boolean {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}