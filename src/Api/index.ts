import feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import axios from "axios";

const feathersClient = feathers();
const restClient = rest('http://localhost:3030');

feathersClient.configure(restClient.axios(axios));
feathersClient.configure(feathers.authentication());
feathersClient.configure(auth({
    storage: window.localStorage,
    storageKey: "feathers-react-jwt"
}));

export default feathersClient;