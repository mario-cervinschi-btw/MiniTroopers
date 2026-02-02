export interface PassengerData {
    passengerId: number;
    survived: number;
    pclass: number;
    name: string;
    sex: string;
    age: number | null;
    sibsp: number;
    parch: number;
    ticket: string;
    fare: number;
    cabin: string | null;
    embarked: string | null;
}
