import axios from "axios";
import { OPENVIDU_SERVER_SECRET, OPENVIDU_SERVER_URL } from "./url";

export function getToken(roomId: string): Promise<any> {
    return createSession(roomId).then((roomId) => createToken(roomId));
};

function createSession(roomId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({ customSessionId: roomId });
        axios
            .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('CREATE SESION', response);
                resolve(response.data.id);
            })
            .catch((response) => {
                var error = Object.assign({}, response);
                if (error?.response?.status === 409) {
                    resolve(roomId);
                } else {
                    console.log(error);
                    console.warn(
                        'No connection to OpenVidu Server. This may be a certificate error at ' +
                        OPENVIDU_SERVER_URL,
                    );
                    if (
                        window.confirm(
                            'No connection to OpenVidu Server. This may be a certificate error at "' +
                            OPENVIDU_SERVER_URL +
                            '"\n\nClick OK to navigate and accept it. ' +
                            'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                            OPENVIDU_SERVER_URL +
                            '"',
                        )
                    ) {
                        window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                    }
                }
            });
    });
}

function createToken(roomId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        var data = {};
        axios
            .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + roomId + "/connection", data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('TOKEN', response);
                resolve(response.data.token);
            })
            .catch((error) => reject(error));
    });
}