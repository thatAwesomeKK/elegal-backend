console.log(process.env.COOKIE_DOMAIN);
const cookieConfig = { sameSite: 'none', secure: true, httpOnly: true, domain: process.env.COOKIE_DOMAIN }
export default cookieConfig