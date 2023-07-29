import { Response, Request } from "express";
import { MainRouter } from "./MainRouter";
import bcrypt from "bcrypt";
import { User, IUser } from "../models/User";
import { sign } from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken";
import { IMovies } from "../models/Movies";
import nodemailer from 'nodemailer';
import multer, { Multer } from "multer";
import path from "path";
export class UserRouter extends MainRouter {
  private randomSecret;
  constructor() {
    super();
    this.init();
    this.randomSecret = 0
  }
  public static getInstance = (): UserRouter => new UserRouter();
  private init() {
    this.add();
    this.signIn();
    this.edit();
    this.stats();
    this.fetchAll();
    this.fetchById();
    this.remove();
    this.fetchFavorites();
    this.verifyUserToConnect();
    this.addFavorites();
    this.removeFavorites();
    this.sendEmailConfirmation();
    this.confirmedEmail();
    this.updateImageProfile();
  }
  add(): void {
    this.router.post("/auth/register", (req: Request, res: Response) => {
      try {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let isAdmin = req.body.isAdmin;
        let profilPic = req.body.profilPic;
        let favorites = new Array<IMovies>()
        if (
          username.trim() !== "" &&
          password.trim() !== "" &&
          email.trim() !== "" &&
          this.isValidateEmail(email.trim())
        ) {
          password = bcrypt.hashSync(password, 10);
          let newUser = new User({
            username,
            password,
            email,
            profilPic,
            isAdmin,
            favorites
          });
          newUser
            .save()
            .then((response) => res.json({ message: "success", response }).status(200))
            .catch(_ =>
              res.json({ message: "Username or email exist", response: {} }).status(500)
            );
        } else {
          res
            .json({ message: "Check your field is correctly fill", response: {} })
            .status(404);
        }
      } catch (error) {
        res.json({ message: "Error " + error }).status(404);
      }
    });
  }
  private signIn() {
    this.router.post("/auth/signIn", (req: Request, res: Response) => {
      try {
        let password = req.body.password;
        let email = req.body.email;
        if (password !== "" && email !== "" && this.isValidateEmail(email)) {
          User.findOne({ email })
            .then((result: IUser | null) => {
              if (result !== null) {
                let isCheckPassword = bcrypt.compareSync(
                  password,
                  result.password
                );
                if (isCheckPassword) {
                  if (result.confirm) {
                    const token = process.env.SECRET_TOKEN;

                    const jwtToken = sign(
                      {
                        id: result._id,
                        username: result.username,
                        isAdmin: result.isAdmin,
                      },
                      `${token}`,
                      { expiresIn: "3h" }
                    );
                    res.json({
                      message: "Connected",
                      id: result._id,
                      username: result.username,
                      email: result.email,
                      isAdmin: result.isAdmin,
                      profile:result.profilPic,
                      token: jwtToken,
                      isError: false,
                    });
                  } else {
                    res.json({ message: "Your account not confirm", isError: true });
                  }
                } else {
                  res.json({ message: "Password is wrong", isError: true });
                }
              } else {
                res.json({ message: "User don't exist", isError: true });
              }
            })
            .catch(_ =>
              res.json({ message: `Error Server`, isError: true })
            );
        } else {
          res.json({ message: "password or email error", isError: true });
        }
      } catch (error) {
        res.json({ message: "password or email error", isError: true });
      }
    });
  }
  private stats() {
    this.router.get("/user/stats", async (_, res: Response) => {
      try {
        const data = await User.aggregate([
          { $project: { month: { $month: "$createdAt" } } },
          { $group: { _id: "$month", total: { $sum: 1 } } }
        ])
        res.json({ "message": "success", data })
      } catch (error) {
        res.json({ "message": "Error" })
      }
    })
  }
  remove() {
    this.router.delete(
      "/user/remove/:idUser",
      verifyToken,
      (req: any, res: Response) => {
        let idUser = req.params.idUser;
        if (req.user.isAdmin) {
          User.findByIdAndDelete(idUser)
            .then((result) => {
              if (result !== null) {
                res.json({ message: `User ${req.user.username} is deleted` });
              } else {
                res.json({
                  message: `User not found`,
                });
              }
            })
            .catch(_ => res.json({ message: "Error" }));
        } else {
          res.json({ message: `User unauthorized` });
        }
      }
    );
  }
  edit() {
    this.router.put(
      "/user/edit/:idUser",
      verifyToken,
      (req: any, res: Response) => {
        let idUser = req.params.idUser;
        if (req.user.id === idUser || req.user.isAdmin) {
          if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
          }
        }
        try {
          User.findByIdAndUpdate(idUser, { $set: { favorites: [] } }, { new: true })
            .then((result) => {
              if (result !== null) {
                res.json({ message: "User edited with success" });
              } else {
                res.json({ message: "User not found" });
              }
            })
            .catch(_ => res.json({ message: "User not found" }));
        } catch (error) {
          res.json({ message: "Error" });
        }
      }
    );
  }
  fetchById() {
    this.router.get(
      "/user/fetch/:idUser",
      verifyToken,
      (req: Request, res: Response) => {
        try {
          let _id = req.params["idUser"];
          User.findById({ _id })
            .select("-password")
            .then((result: IUser | null) => {
              if (result !== null) {
                res.json(result);
              } else {
                res.json({ message: "User don't exist" });
              }
            })
            .catch(_ => res.json({ message: "Error ID" }));
        } catch (error) {
          res.json({ message: error });
        }
      }
    );
  }
  fetchAll() {
    this.router.get("/user/fetchAll", (req: Request, res: Response) => {
      let query = req.query.limit as string;
      if (query) {
        let limit = parseInt(query);
        User.find()
          .limit(limit)
          .select("-password")
          .then((result: IUser[]) => res.json(result))
          .catch(_ => res.json({ message: "Error" }));
      } else {
        User.find()
          .select("-password")
          .then((result: IUser[]) => res.json(result))
          .catch(_ => res.json({ message: "Error" }));
      }
    });
  }
  private verifyUserToConnect() {
    this.router.post("/auth", verifyToken, (_, res: Response) => {
      res.status(200).send({ auth: true });
    });
  }
  private fetchFavorites() {
    this.router.get("/user/favorites/:idUser",
      verifyToken,
      (req: any, res: Response) => {
        let idUser = req.params.idUser;
        if (req.user.id === idUser || req.user.isAdmin) {
          try {
            User.findById({ _id: idUser })
              .select("-password -_id -username -email -password -profilPic -isAdmin")
              .then((result: IUser | null) => {
                if (result !== null) {
                  res.json(result.favorites)
                } else {
                  res.json(new Array<IMovies>())
                }
              })
              .catch(_ => res.json({ message: "Error" }));
          } catch (error) {
            res.json({ message: "Error" });
          }
        }
      }
    );
  }
  private removeFavorites() {
    this.router.delete("/user/favorites/:idUser/:idMovies",
      verifyToken,
      async (req: any, res: Response) => {
        let idUser = req.params.idUser;
        let idMovies = req.params.idMovies;
        console.log(idMovies)
        if (req.user.id === idUser || req.user.isAdmin) {
          try {
            let user = await User.findOne({ _id: idUser })
            if (user !== null) {
              let index = user.favorites.findIndex(item => item.id === idMovies)
              user.favorites.splice(index, 1)
              user.save()
                .then(_ => res.json({ message: "success" }))
                .catch(err => res.json({ message: err }))
            } else {
              res.json({ message: "Unauthenticated" })
            }
          } catch (error) {
            res.json({ message: "Unauthenticated" });
          }
        } else {
          res.json({ message: "Unauthenticated" });
        }
      }
    );
  }
  private addFavorites() {
    this.router.post("/user/favorites/:idUser",
      verifyToken,
      async (req: any, res: Response) => {
        let idUser = req.params.idUser;
        let movies = req.body as IMovies;
        if (req.user.id === idUser || req.user.isAdmin) {
          try {
            let user = await User.findOne({ _id: idUser })
            if (user !== null) {
              user.favorites.push(movies)
              user.save().then(_ => res.json({ message: "success" })).catch(_ => res.json({ message: "error" }))
            } else {
              res.json({ message: "Unauthenticated" })
            }
          } catch (error) {
            res.json({ message: "error" });
          }
        }
      }
    );
  }
  private isValidateEmail(email: string): boolean {
    let regExp = new RegExp(/^(\w)+([\.-\w*])*@(\w)+(\.){1}(\w){2,3}$/g);
    return regExp.test(email);
  }

  private sendEmailConfirmation() {
    this.router.post("/user/sendConfirm", async (req: Request, res: Response) => {
      let email = req.body.email as string;
      let user = await User.findOne({ email })
      const code = this.randomNumberEmail();
      if (user !== null) {
        user.confirmCode = code;
        user.save().then(ok => {
          const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USER_MAIL,
              pass: process.env.PASS_MAIL
            }
          });
          type senderInfo = {
            from: string,
            to: string,
            subject: string,
            text?: string,
            html?: string
          }
          let dataMail: senderInfo = {
            from: process.env.USER_MAIL as string,
            to: email,
            subject: "Message de confirmation",
            html: `<h2>Code de confirmation par MaiFlix</h2><h1>${code}</h1>`
          } as senderInfo
          smtpTransport.sendMail(dataMail, (err: any, info: any) => {
            if (err) {
              console.error(err);
              res.status(404).send({ success: false, message: "error" })
            
            } else {
          
              res.status(200).send({ success: true, message: "success" })
            }
          })
        }).catch(err => console.error(err))
      }
    })
  }
  private randomNumberEmail(length = 5): number {
    const ref = "0123456789";
    let result = ""
    for (let i = 0; i < length; i++) {
      result += ref[Math.round(Math.random() * ref.length)]
    }
    return parseInt(result);
  }

  private updateImageProfile() {
    this.router.put("/auth/updateProfil", this.moveFileConfig().single("image"), (req: Request, res: Response) => {
      let email = req.body.email;
      let username = req.body.username;
      if (req.file !== undefined && email !== null && email !== "") {
        if (username !== null) {
          User.findOneAndUpdate({ email }, { $set: { profilPic: req.file.filename, username: username } })
            .then(result => {
              if (result !== null) {
                res.json({ message: "success" });
              } else {
                res.json({ message: "error" });
              }
            })
            .catch(err => console.error(err))
        } else {
          User.findOneAndUpdate({ email }, { $set: { profilPic: req.file.filename } })
            .then(result => {
              if (result !== null) {
                res.json({ message: "success" });
              } else {
                res.json({ message: "error" });
              }
            })
            .catch(err => console.error(err))
        }
      }
    })
  } 
  private confirmedEmail() {
    this.router.put("/auth/confirm", async (req: Request, res: Response) => {
      const email = req.body.email;
      const confirmEmail = req.body.confirm as number
      if (email !== null && email !== "" && confirmEmail !== null) {
        const user = await User.findOne({ email })
        if (user !== null) {
          if (confirmEmail === user.confirmCode) {
           
            user.confirm = true
            user.save().then(result=>{
               res.json({ message: "success",username:user.username });
            }).catch(err=>console.error(err))
          } else {
              res.json({ message: "error",username:"" });
          }
        }
      } else {
        res.json({ message: "error",username:"" });
      }
    })
  }
  /**
   * Generate unique key
   * **/
  private uuid(): string {
    let word =
      "qwerrtyuiopasdfghjklzxcvnbmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let result = "";
    for (let i = 0; i < word.length / 3; i++) {
      let length = parseInt((Math.random() * word.length).toFixed(0));
      result += word[length - 1];
    }
    return result;
  }
  /**
   * Configuration multer
   * */
  private moveFileConfig(): Multer {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(path.dirname(__dirname), "/media"));
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = this.uuid();

        cb(null, "image-" + uniqueSuffix + path.extname(file.originalname));
      },
    });

    const upload = multer({ storage: storage });
    return upload;
  }
}
