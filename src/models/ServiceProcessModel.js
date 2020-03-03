import GOBALS from '../GOBALS';
export default class ServiceProcessModel {

    constructor() {
    }
 
    async getServiceProcessBy() {
        return fetch(GOBALS.URL + 'serviceProcess/getServiceProcessBy', {
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
    async checkServiceProcessname(data) {
        return fetch(GOBALS.URL + 'serviceProcess/checkServiceProcessname', {
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
    async insertServiceProcess(data) {
        return fetch(GOBALS.URL + 'serviceProcess/insertServiceProcess', {
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
    async deleteServiceProcessByCode(code) {
        return fetch(GOBALS.URL + 'serviceProcess/deleteServiceProcessByCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_process_id: code
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async updateServiceProcessByCode(data) {
        return fetch(GOBALS.URL + 'serviceProcess/updateServiceProcessByCode', {
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
    async getServiceProcessByCode(data) {
        return fetch(GOBALS.URL + 'serviceProcess/getServiceProcessByCode', {
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
  
}