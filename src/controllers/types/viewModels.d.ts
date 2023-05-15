declare module "viewModels" {
  export interface IContactViewModel {
    id: string;
    name: string;
    category?: string;
    addresses?: IAddress[];
    contactInfo?: IContactInfo[];
  }

  interface IAddressViewModel {
    id: string;
    street: string;
    number: string;
    province: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
  }

  interface IContactInfoViewModel {
    id: string;
    type: string;
    value: string;
  }
}
