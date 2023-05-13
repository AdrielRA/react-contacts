import { IRequestInputModel } from "inputModels";
import { api } from "services";
import { IContactViewModel } from "viewModels";

const getContacts = ({ field, term, ...input }: IRequestInputModel) =>
  new Promise<IContactViewModel[]>((resolve, reject) => {
    api
      .get("contacts", {
        params: {
          ...input,
          ...(field && term
            ? { [`${field}_like`]: term }
            : {
                q: term,
              }),
        },
      })
      .then(({ data }) => resolve(data))
      .catch(reject);
  });

const ContactController = {
  getContacts,
};

export default ContactController;
