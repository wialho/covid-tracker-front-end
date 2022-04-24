import { IsEmailValid, IsPasswordValid, IsPhoneValid } from "./Validators"

test('phone number is valid', () => {
    expect(IsPhoneValid('1111111')).toBe(true); //7
    expect(IsPhoneValid('11111111')).toBe(false); //8
    expect(IsPhoneValid('1111111111')).toBe(true); //10
    expect(IsPhoneValid('11111111111')).toBe(false); //11
    expect(IsPhoneValid('111x111')).toBe(false); //letter
});

test('email is valid', () => {
    expect(IsEmailValid('email')).toBe(false);
    expect(IsEmailValid('email@email')).toBe(true);
});

test('password', () => {
    expect(IsPasswordValid('Password1!')).toBe(true); 
    expect(IsPasswordValid('Passw!1')).toBe(false); //< 8  
    expect(IsPasswordValid('password1!')).toBe(false); //no caps 
    expect(IsPasswordValid('Password!')).toBe(false); // no number 
    expect(IsPasswordValid('Password1')).toBe(false); //no special char
    expect(IsPasswordValid('P111!11!')).toBe(false); //no lower case 
})