
import crypto from 'crypto';

const BASE_ENDPOINT = 'https://gateway.marvel.com/v1/public';
const ts = new Date().getTime();
const PUBLIC_KEY = '347b9c34badaa0f275b097837faae27a';
const PRIVATE_KEY = '2c08fb75918d296b101f13c0537ec7a73634781f';
const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
const MARVEL = {
    CHARACTERS_URL: `${BASE_ENDPOINT}/characters`,
    PARAMS_MARVEL: {
        apikey: '347b9c34badaa0f275b097837faae27a',
        hash,
        ts
    }
};

export { MARVEL };