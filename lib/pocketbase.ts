import Pocketbase from 'pocketbase';

const url = process.env.POCKET_BASE_URL

const pb = new Pocketbase(url);

export default pb;
