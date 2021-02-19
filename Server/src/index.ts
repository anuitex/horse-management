import App from './app';
import { Socket } from 'socket.io';
import * as config from './config/config';
import { RequestStartMonitoringHorseModel, ResponseStartMonitoringHorseModelItem } from './features/horse-management/models';

const PORT = process.env.PORT || "3001";

App.io.on(config.default.SOCKET_IO_CONNECTION, (socket: Socket) => {
    console.log("socket io connection", socket.id);
    let interval: any;

    socket.on(config.default.SERVER_HORSE_HEART_RATE, ({ request }) => {
        const res: string[] = [...request.items];

        console.log(res);
        interval = setInterval((): void => {
            const newArray: any = {};
            res.forEach(id => {
                return newArray[id] = Math.floor(Math.random() * (60 - 30 + 1) + 30)
            })
            App.io.emit(config.default.CLIENT_HORSE_HEART_RATE, { ...newArray });
        }, 5000)
    });

    socket.on(config.default.SOCKET_IO_DISCONNECTION, (socket: any) => {
        clearInterval(interval);
        console.log('socket io disconnect', socket.id);
    });
});

App.server.listen(PORT, () => {
    console.log(`Server Started at Port, ${PORT}`);
});


