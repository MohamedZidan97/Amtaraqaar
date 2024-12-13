export interface IGetTokenResponse {
    token :string,
    isAuthentication: boolean,
    message : string,
    roles? : string[],
}
