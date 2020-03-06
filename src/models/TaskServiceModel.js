import GOBALS from '../GOBALS';
export default class TaskServiceModel {

    async insertTaskService(task,service) {
        return fetch(GOBALS.URL + 'taskService/insertTaskService', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_id:task,
                service_id : service
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
}