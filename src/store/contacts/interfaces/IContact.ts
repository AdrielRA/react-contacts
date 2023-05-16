interface IContact {
  id: string;
  name: string;
  category: string;
  addresses?: IAddress[];
  contactInfo?: IContactInfo[];
}
