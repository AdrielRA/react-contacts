declare module "viewModels" {
  export interface IContactViewModel {
    id: number;
    name: string;
    category?: string;
    addresses?: IAddress[];
    contactInfo?: IContactInfo[];
  }

  interface IAddressViewModel {
    id: number;
    street: string;
    number: string;
    province: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
  }

  interface IContactInfoViewModel {
    id: number;
    type: string;
    value: string;
  }
}
