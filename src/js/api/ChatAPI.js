import Entity from './Entity';
import createRequest from './createRequest';

export default class ChatAPI extends Entity {

    constructor(URL) {
        super(URL)
        this.URL = URL;
    }
    async create(name){
        const response = await createRequest(super.create("new-user",`${name}`));
        const result = await response;
    }
}
