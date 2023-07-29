import MaiLogin from "../utils/MaiLogin";

export const useMaiRgister = (email: string, password: string, abonnement:string) => {
  return MaiLogin.register(email, password, abonnement);
};
export const useMaiProfilUsername = (email: string, username:string,image:File) => {
    return MaiLogin.updateusernameProfil(email, username,image);
};
export const useMaiConfirmedEmail = (email: string, confirmCode: number) => {
  return MaiLogin.confirmedEmail(email, confirmCode);
};
export const useMaiSendConfirmation = (email: string) => {
    return MaiLogin.sendEmailConfirmation(email)
};