import GOBALS from '../GOBALS';
export default class UserModel {

    constructor() {
    }
    async getLogin(data) {
        return fetch(GOBALS.URL + 'employee/getLogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson.data[0];
            }).catch((error) => {
                console.error(error);
            });
    }
    async getEmployeeBy() {
        return fetch(GOBALS.URL + 'employee/getEmployeeBy', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
}