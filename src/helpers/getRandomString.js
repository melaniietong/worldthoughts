export default function getRandomString() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let string = "";
    
    for (let i = 0; i < 10; i++) {
        string += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return string;
  }