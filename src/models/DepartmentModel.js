import GOBALS from '../GOBALS';
export default class DepartmentModel {

    constructor() {
    }
 
    async getDepartmentBy() {
        return fetch(GOBALS.URL + 'Department/getDepartmentBy', {
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