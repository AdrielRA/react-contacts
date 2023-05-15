import { IRequestInputModel } from "inputModels";
import { api } from "services";
import { IContactViewModel } from "viewModels";

const getContacts = ({
  field,
  term,
  sort,
  order,
  ...input
}: IRequestInputModel) =>
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
          _sort: sort,
          _order: order,
        },
      })
      .then(({ data }) => resolve(data))
      .catch(reject);
  });

const ContactController = {
  getContacts,
};

export default ContactController;
