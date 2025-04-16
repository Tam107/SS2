
export const generateRandomNumber = (length)=>{
    var chars = '0123456789';
    var token = '';
    for(var i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}