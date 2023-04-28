export interface IPassengers {
    name: string;
    desc: string;
    value: number;
}

export interface ILocation {
    location: string;
}

export interface ISearchMain {
    destination: ILocation;
    origin: ILocation;
    type: string;
    startDate: Date;
    endData: Date
    passengers: IPassengers[];
}