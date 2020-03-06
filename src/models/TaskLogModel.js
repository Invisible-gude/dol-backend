import GOBALS from '../GOBALS';
export default class TaskLogModel {

    async insertTaskLog(task,service,process) {
        return fetch(GOBALS.URL + 'taskLog/insertTaskLog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_id:task,
                service_id : service,
                process_id : process
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
}