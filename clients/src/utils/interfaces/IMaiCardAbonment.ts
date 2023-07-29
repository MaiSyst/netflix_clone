export interface IMaiAbonmentData {
  type: string;
  amount: string;
  color:string,
  options: IMaiAbonmentOptions[];
}
export interface IMaiAbonmentOptions {
  title: string;
  subtitle: string;
}
