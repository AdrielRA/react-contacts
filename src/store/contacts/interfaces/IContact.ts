interface IContact {
  id: number;
  name: string;
  category?: string;
  addresses?: IAddress[];
  contactInfo?: IContactInfo[];
}
