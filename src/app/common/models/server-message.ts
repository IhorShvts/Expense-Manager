export interface ServerMessage {
    errcode: string;
    message: string;
    success: boolean;
    data?;
}
