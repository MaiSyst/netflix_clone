import { API } from "./Core";

class MaiLogin {
  static register = async (
    email: string,
    password: string,
    abonnement: string
  ) => {
    try {
      const username = email.split("@")[0];
      const data = { username, email, password, abonnement };
      const response = await API.post("/auth/register", data);
      return response.data as Promise<{ message: string }>;
    } catch (error) {
      console.error(error);
    }
  };
  static updateusernameProfil = async (
    email: string,
    username: string,
    image: File
  ) => {
    try {
      const data = { email,username, image };
      const response = await API.put("/auth/updateProfil", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data as Promise<{message:string}>;
    } catch (error) {
      console.error(error);
    }
  };
  static sendEmailConfirmation = async (email: string) => {
    try {
      const data = { email };
      const response = await API.post("/user/sendConfirm", data);
      return response.data as Promise<{ message: string }>;
    } catch (error) {
      console.error(error);
    }
  };
  static confirmedEmail = async (email: string, confirm: number) => {
    try {
      const data = { email, confirm };
      const response = await API.put("/auth/confirm", data);
      console.log(response.data);
      return response.data as Promise<{ message: string; username: string }>;
    } catch (error) {
      console.error(error);
    }
  };
}

export default MaiLogin;
