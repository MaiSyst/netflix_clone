import { IMaiAbonmentData } from "../utils/interfaces/IMaiCardAbonment";

const abonnementData = [
  {
    type: "Prime",
    amount: "9.99 USD",
    color: "#224e9d,#be1431",
    options: [
      {
        title: "Prix mensuel",
        subtitle: "9,99 USD",
      },
      {
        title: "Resolution",
        subtitle: "4K (Ultra HD) + HDR",
      },
      {
        title: "Qualite video",
        subtitle: "Meilleur",
      },
      {
        title: "Peripheriques compoatibles",
        subtitle: "TV , Ordinateur@Telephone , Tablette",
      },
    ],
  },
  {
    type: "Standard",
    amount: "7,99 USD",
    color: "#214f9d, #9e39d2",
    options: [
      {
        title: "Prix mensuel",
        subtitle: "7,99 USD",
      },
      {
        title: "Resolution",
        subtitle: "1080p (Full HD)",
      },
      {
        title: "Qualite video",
        subtitle: "Mieux",
      },
      {
        title: "Peripheriques compoatibles",
        subtitle: "TV , Ordinateur@Telephone , Tablette",
      },
    ],
  },
  {
    type: "Basique",
    amount: "3,99 USD",
    color: "#20509d, #663cda",
    options: [
      {
        title: "Prix mensuel",
        subtitle: "3,99 USD",
      },
      {
        title: "Resolution",
        subtitle: "720p (HD)",
      },
      {
        title: "Qualite video",
        subtitle: "Bien",
      },
      {
        title: "Peripheriques compoatibles",
        subtitle: "TV , Ordinateur@Telephone , Tablette",
      },
    ],
  },
  {
    type: "Mobile",
    amount: "2,99 USD",
    color: "#1e519c, #236cda",
    options: [
      {
        title: "Prix mensuel",
        subtitle: "2,99 USD",
      },
      {
        title: "Resolution",
        subtitle: "480p",
      },
      {
        title: "Qualite video",
        subtitle: "Bien",
      },
      {
        title: "Peripheriques compoatibles",
        subtitle: "TV , Ordinateur@Telephone , Tablette",
      },
    ],
  },
] as IMaiAbonmentData[];

export default abonnementData;