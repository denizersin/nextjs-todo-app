
interface User{
    id: number;
    password: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    tcNum: string;
    phoneNum: string;
    adress: string;
    isAdmin: boolean;
    events?: Event[];

}

interface IEvent{
    id: number;
    startTime: Date;
    finishTime: Date;
    eventType: string;
    eventAction: string;
    eventStatus: string;
    owner?: User;
    ownerId: number;
}
