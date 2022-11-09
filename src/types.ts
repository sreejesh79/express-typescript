
export interface IResponse {
    error: boolean;
    statusCode: number;
    statusText?: string;
    data?: any;
    message: string;
}

export interface IUser {
    uid: number;
    email: string;

}

export interface IAccess {
    user: IUser;
    refresh_token: string;
    access_token: string;
}

export interface IOtpAccess {
    otp_token: string;
    otp: string;
}