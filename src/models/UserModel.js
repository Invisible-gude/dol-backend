import GOBALS from '../GOBALS';
export default class UserModel {

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
    async getEmployeeByEmployeeCode(data) {
        return fetch(GOBALS.URL + 'employee/getEmployeeByEmployeeCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async insertEmployee(data) {
        return fetch(GOBALS.URL + 'employee/insertEmployee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async checkUsernameEmployee(data) {
        return fetch(GOBALS.URL + 'employee/checkUsernameEmployee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async updateEmployeeByEmployeeCode(data) {
        return fetch(GOBALS.URL + 'employee/updateEmployeeByEmployeeCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async deleteEmployeeByEmployeeCode(code) {
        return fetch(GOBALS.URL + 'employee/deleteEmployeeByEmployeeCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employee_id: code
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
}