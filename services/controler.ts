// const API_URL = "https://api.github.com";
const API_URL = "https://jsonplaceholder.typicode.com/";


class Controller {
  request = async (method: any, endpoint: string, data?: any) =>
    new Promise(async (resolve, reject) => {
      const req: any = new XMLHttpRequest();
      req.open(method, `${API_URL}${endpoint}`, true);
      req.setRequestHeader("Content-Type", "application/json");
      req.responseType = "json";
      req.send(JSON.stringify(data));
      req.onload = async () => {
        if (Number(req?.status) >= 400) {
          // Error
          console.log("ERROR =>", req);
          reject(JSON.parse(req._response));
        } else {
          // Success
          resolve(JSON.parse(req._response));
        }
      };
    });
}

const controller = new Controller();
export default controller;
