// import { Backspace, DeleteOutline, ModeEditOutline } from "@mui/icons-material";
// import {
//   Autocomplete,
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   FormControl,
//   Grid,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Popper,
//   PopperProps,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import banks from "assets/banks";
// import professions from "assets/professions";
// import statesAndCities from "assets/states-cities";
// import {
//   AppBar,
//   Drawer,
//   DropZone,
//   Limit,
//   Rating,
//   SubtitleForm,
// } from "components";
// import { useAlert } from "contexts";
// import { CustomerController } from "controllers";
// import { IBankAccountInputModel, ICustomerInputModel } from "inputModels";
// import moment from "moment";
// import { serialize } from "object-to-formdata";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Controller, useFieldArray, useForm } from "react-hook-form";
// import InputMask from "react-input-mask";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useTheme } from "styled-components";
// import { BankAccountType, ContactType } from "types/enums";
// import { v4 as uuid } from "uuid";

import { Backspace } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { TextField } from "components";
import { useAlert } from "contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import contactsApi from "store/contacts/api";

// const CustomPopper = (props: PopperProps) => {
//   return (
//     <Popper {...props} style={{ minWidth: 250 }} placement="bottom-start" />
//   );
// };

// const accountTableHeaders = [
//   "#",
//   "Banco",
//   "Agência",
//   "Tipo",
//   "Nº Conta",
//   "Ações",
// ];
// const accountTypeNames = ["Conta Poupança", "Conta Corrente", "Conta Salário"];

// interface IContactPageProps {
//   action: "new" | "view" | "edit";
// }

// type RouteParams = {
//   contactId?: string;
// };

// const ContactPage: React.FC<IContactPageProps> = ({
//   action,
// }: IContactPageProps) => {
//   const routeParams = useLocation()?.state as RouteParams;

//   const theme = useTheme();
//   const navigate = useNavigate();

//   const confirm = useAlert();

//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [usedLimit, setUsedLimit] = useState(0);
//   const [availableLimit, setAvailableLimit] = useState(0);
//   const [editingBankAccount, setEditingBankAccount] = useState(false);
//   const [profilePictureChanged, setProfilePictureChanged] = useState(false);

//   const [defaultValues, setDefaultValues] = useState<ICustomerInputModel>({
//     contacts: [
//       {
//         id: uuid(),
//         text: "",
//       },
//     ],
//     pixKeys: [
//       {
//         id: uuid(),
//         key: "",
//       },
//     ],
//   } as ICustomerInputModel);

//   const {
//     reset,
//     watch,
//     control,
//     register,
//     setValue,
//     clearErrors,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: useMemo(() => defaultValues, [defaultValues]),
//   });

//   const {
//     fields: contacts,
//     append: appendContact,
//     remove: removeContact,
//   } = useFieldArray({
//     control,
//     name: "contacts",
//   });

//   const {
//     fields: pixKeys,
//     append: appendPixKey,
//     remove: removePixKey,
//   } = useFieldArray({
//     control,
//     name: "pixKeys",
//   });

//   const {
//     fields: bankAccounts,
//     append: appendBankAccount,
//     remove: removeBankAccount,
//     update: updateBankAccount,
//   } = useFieldArray({
//     control,
//     name: "bankAccounts",
//   });

//   const document = watch("document");
//   const selectedUf = watch("uf");
//   const currentContacts = watch("contacts");

//   const { ...bankForm } = useForm({
//     defaultValues: {
//       id: uuid(),
//     } as IBankAccountInputModel,
//   });

//   const bankFormState = bankForm.watch();

//   const [ufInput, setUfInput] = useState(defaultValues.uf ?? undefined);

//   useEffect(() => {
//     if (routeParams?.customerId) {
//       CustomerController.getById(routeParams?.customerId)
//         .then((res) => {
//           if (res.success) {
//             const data = {
//               ...res.data,
//               contacts: res?.data?.contacts?.length
//                 ? res?.data?.contacts
//                 : [
//                     {
//                       id: uuid(),
//                       type: ContactType.WHATSAPP,
//                       text: "",
//                     },
//                   ],
//               pixKeys: res?.data?.pixKeys?.length
//                 ? res?.data?.pixKeys?.map((p) => ({ id: uuid(), key: p }))
//                 : [
//                     {
//                       id: uuid(),
//                       key: "",
//                     },
//                   ],
//             };
//             reset(data);
//             setUfInput(data.uf);
//             setDefaultValues(data);
//             setUsedLimit(res.data.usedLimit);
//             setAvailableLimit(res.data.availableLimit);
//           }
//         })
//         .catch(() => {
//           confirm.show({
//             type: "error",
//             title: "Falha ao carregar",
//             description: "Não foi possível carregar os dados do cliente.",
//           });
//           navigate("/customer");
//         })
//         .finally(() => setLoading(false));
//     } else setLoading(false);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [navigate, reset, routeParams]);

//   const handleAddBankAccount = () => {
//     appendBankAccount(bankFormState);
//     bankForm.reset({
//       id: uuid(),
//       agency: "",
//       bankCode: "",
//       accountNumber: "",
//     } as IBankAccountInputModel);
//   };

//   const handleSaveChangeBankAccount = () => {
//     const idx = bankAccounts.findIndex((b) => b.id === bankFormState.id);
//     if (idx !== -1) {
//       updateBankAccount(idx, bankFormState);
//       bankForm.reset({
//         id: uuid(),
//         agency: "",
//         bankCode: "",
//         accountNumber: "",
//       } as IBankAccountInputModel);

//       setEditingBankAccount(false);
//     }
//   };

//   const getCpfOrCnpjMask = () => {
//     if (!document || document.length === 0) return "999999999999999999";

//     if (document.replace(/\D/g, "").length < 12) {
//       return "999.999.999-999999";
//     } else {
//       return "99.999.999/9999-99";
//     }
//   };

//   const getContactMask = (input: string, type: "phone" | "email") => {
//     if (type === "email")
//       return Array.from({ length: 100 }, () => /^([a-zA-Z0-9-@.])+$/);
//     if (input.replace(/\D/g, "").length <= 10) {
//       return "(99) 9999-99999";
//     } else {
//       return "(99) 9 9999-9999";
//     }
//   };

//   const handleReduce = (inputToReduce: ICustomerInputModel) => {
//     const result: ICustomerInputModel = { ...inputToReduce };

//     result.contacts = result.contacts?.filter(
//       (c) => c.type > -1 && !!c.text && c.text !== "",
//     );
//     result.pixKeys = result.pixKeys?.filter((p) => !!p.key && p.key !== "");

//     return result;
//   };

//   const handleSave = useCallback(
//     (data: ICustomerInputModel) => {
//       const reduced = handleReduce(data);
//       const customerData = serialize(
//         {
//           ...reduced,
//           document: reduced?.document?.replace(/\D/g, ""),
//           zipCode: reduced?.zipCode?.replace(/\D/g, ""),
//           pixKeys: reduced?.pixKeys?.map((p) => p.key),
//           birthday: moment(reduced?.birthday).toDate(),
//           contacts: reduced?.contacts?.map((c) => ({
//             ...c,
//             text: c?.text?.replace(/\D/g, ""),
//           })),
//           rg: reduced?.rg?.replace(/\D/g, ""),
//         },
//         { indices: true },
//       );

//       const object: { [key: string]: FormDataEntryValue } = {};
//       customerData.forEach((value, key) => {
//         object[key] = value;
//       });

//       //console.log({ object, customerData });

//       if (saving) return;
//       setSaving(true);

//       if (action === "edit") {
//         customerData.append(
//           "profilePictureChanged",
//           JSON.stringify(profilePictureChanged),
//         );
//         CustomerController.update(customerData)
//           .then(async () => {
//             await confirm.show({
//               type: "alert",
//               title: "Sucesso!",
//               description: "Os dados do cliente foram atualizados.",
//               timeout: 5000,
//             });
//             navigate("/customer");
//           })
//           .catch(async () => {
//             await confirm.show({
//               type: "error",
//               title: "Falha ao atualizar",
//               description: "Não foi possível salvar as alterações do cliente.",
//               timeout: 5000,
//             });
//           })
//           .finally(() => setSaving(false));
//       } else
//         CustomerController.insert(customerData)
//           .then(async () => {
//             await confirm.show({
//               type: "alert",
//               title: "Sucesso!",
//               description: "Os dados do cliente foram salvos.",
//               timeout: 5000,
//             });
//             navigate("/customer");
//           })
//           .catch(async () => {
//             await confirm.show({
//               type: "error",
//               title: "Falha ao salvar",
//               description: "Não foi possível salvar os dados do cliente.",
//             });
//           })
//           .finally(() => setSaving(false));
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [saving, action, profilePictureChanged, navigate],
//   );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar />
//       <Drawer />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           height: "100vh",
//           overflow: "auto",
//         }}
//       >
//         <Toolbar />
//         <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//           <Typography
//             component="p"
//             variant="h4"
//             color="primary"
//             sx={{ flexGrow: 1 }}
//           >
//             {action === "edit"
//               ? "Editar "
//               : action === "view"
//               ? "Visualizar "
//               : "Novo "}
//             cliente
//           </Typography>
//           {loading ? (
//             <Grid
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "calc(100vh - 180px)",
//               }}
//             >
//               <CircularProgress />
//               <Typography sx={{ pt: 2 }} variant="body1">
//                 Carregando dados do cliente
//               </Typography>
//               <Typography variant="subtitle2">
//                 <em>Por favor aguarde...</em>
//               </Typography>

//               <Button
//                 sx={{ mt: 2 }}
//                 variant="outlined"
//                 color="primary"
//                 size="small"
//                 onClick={() => navigate("/customer")}
//               >
//                 Cancelar
//               </Button>
//             </Grid>
//           ) : (
//             <form onSubmit={handleSubmit(handleSave, console.log)}>
//               <Paper sx={{ p: 2 }}>
//                 <Grid
//                   container
//                   spacing={2}
//                   sx={{
//                     justifyContent: "flex-start",
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <Grid
//                     item
//                     container
//                     xs={12}
//                     sm={8}
//                     spacing={2}
//                     sx={{ mt: -1 }}
//                   >
//                     <SubtitleForm>Dados de identificação</SubtitleForm>
//                     <Grid
//                       container
//                       item
//                       xs={12}
//                       sm={12}
//                       md={3}
//                       rowSpacing={1}
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Grid item xs>
//                         <Controller
//                           name="profilePicture"
//                           control={control}
//                           render={({ field: { onChange, value } }) => (
//                             <DropZone
//                               onDrop={(profilePicture) => {
//                                 onChange(profilePicture);
//                                 setProfilePictureChanged(action === "edit");
//                               }}
//                               disabled={action === "view"}
//                               defaultValue={value}
//                               label={
//                                 <p>
//                                   Arraste e solte a <strong>foto</strong> aqui
//                                 </p>
//                               }
//                             />
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs>
//                         <Controller
//                           name="rating"
//                           control={control}
//                           render={({ field: { onChange, value } }) => (
//                             <Rating
//                               name="rating"
//                               value={value}
//                               precision={0.5}
//                               size="large"
//                               disabled={action === "view"}
//                               onChange={(_, v) => onChange(v)}
//                             />
//                           )}
//                         />
//                       </Grid>
//                     </Grid>
//                     <Grid item container xs={12} sm={12} md={9} spacing={2}>
//                       <Grid item xs={12} sm={12} md={8}>
//                         <Controller
//                           name="name"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={Array.from(
//                                 { length: 100 },
//                                 () => /^([ \u00c0-\u01ffa-zA-Z'-.])+$/,
//                               )}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value?.trimStart()}
//                               {...rest}
//                             >
//                               <TextField
//                                 required
//                                 fullWidth
//                                 size="small"
//                                 label="Nome"
//                                 placeholder="Digite o nome do cliente..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4}>
//                         <FormControl fullWidth disabled={action === "view"}>
//                           <InputLabel id="gender-label">Sexo</InputLabel>
//                           <Controller
//                             name="gender"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 {...field}
//                                 size="small"
//                                 label="Sexo"
//                                 defaultValue={-1}
//                                 labelId="gender-label"
//                               >
//                                 <MenuItem value={-1} disabled>
//                                   <em>Selecione</em>
//                                 </MenuItem>
//                                 <MenuItem value={1}>Masculino</MenuItem>
//                                 <MenuItem value={2}>Feminino</MenuItem>
//                                 <MenuItem value={0}>Outro</MenuItem>
//                               </Select>
//                             )}
//                           />
//                         </FormControl>
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4}>
//                         <FormControl fullWidth disabled={action === "view"}>
//                           <InputLabel id="type-label">Tipo</InputLabel>
//                           <Controller
//                             name="type"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 {...field}
//                                 size="small"
//                                 label="Tipo"
//                                 defaultValue={-1}
//                                 labelId="type-label"
//                               >
//                                 <MenuItem value={-1} disabled>
//                                   <em>Selecione</em>
//                                 </MenuItem>
//                                 <MenuItem value={0}>Pessoa Física</MenuItem>
//                                 <MenuItem value={1}>Pessoa Jurídica</MenuItem>
//                               </Select>
//                             )}
//                           />
//                         </FormControl>
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4}>
//                         <Controller
//                           name="document"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={getCpfOrCnpjMask()}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value}
//                               {...rest}
//                             >
//                               <TextField
//                                 required
//                                 fullWidth
//                                 size="small"
//                                 label="CPF/CNPJ"
//                                 placeholder="Informe CPF/CNPJ..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4}>
//                         <FormControl fullWidth disabled={action === "view"}>
//                           <InputLabel id="civil-status-label">
//                             Estado civil
//                           </InputLabel>
//                           <Controller
//                             name="maritalStatus"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 {...field}
//                                 size="small"
//                                 label="Estado civil"
//                                 defaultValue={-1}
//                                 labelId="civil-status-label"
//                               >
//                                 <MenuItem value={-1} disabled>
//                                   <em>Selecione</em>
//                                 </MenuItem>
//                                 <MenuItem value={0}>Solteiro(a)</MenuItem>
//                                 <MenuItem value={1}>Casado(a)</MenuItem>
//                                 <MenuItem value={2}>Separado(a)</MenuItem>
//                                 <MenuItem value={3}>Divorciado(a)</MenuItem>
//                                 <MenuItem value={4}>Viúvo(a)</MenuItem>
//                               </Select>
//                             )}
//                           />
//                         </FormControl>
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4}>
//                         <Controller
//                           name="tradeName"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={Array.from(
//                                 { length: 50 },
//                                 () => /^([ \u00c0-\u01ffa-zA-Z'-])+$/,
//                               )}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value?.trimStart()}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Nome Fantasia"
//                                 placeholder="Nome Fantasia..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4}>
//                         <Controller
//                           name="rg"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask="99.999.999-999"
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 label="RG"
//                                 size="small"
//                                 placeholder="Informe o RG..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4}>
//                         <Controller
//                           name="birthday"
//                           control={control}
//                           render={({ field: { onChange, ...restField } }) => (
//                             <DesktopDatePicker
//                               disabled={action === "view"}
//                               label="Data de nascimento"
//                               inputFormat="DD/MM/YYYY"
//                               maxDate={new Date()}
//                               onChange={onChange}
//                               renderInput={(params) => (
//                                 <TextField {...params} size="small" fullWidth />
//                               )}
//                               {...restField}
//                             />
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={6}>
//                         <Controller
//                           name="fathersName"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={Array.from(
//                                 { length: 50 },
//                                 () => /^([ \u00c0-\u01ffa-zA-Z'-.])+$/,
//                               )}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value?.trimStart()}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Nome do Pai"
//                                 placeholder="Informe o Nome do Pai..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={6}>
//                         <Controller
//                           name="mothersName"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={Array.from(
//                                 { length: 50 },
//                                 () => /^([ \u00c0-\u01ffa-zA-Z'-.])+$/,
//                               )}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value?.trimStart()}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Nome da Mãe"
//                                 placeholder="Informe o Nome da Mãe..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                     </Grid>
//                     <Grid item container xs={12} spacing={2}>
//                       <Grid item xs={12} sm={12} md={6}>
//                         <Controller
//                           name="street"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={Array.from(
//                                 { length: 100 },
//                                 () => /^([ \u00c0-\u01ffa-zA-Z0-9'.,-])+$/,
//                               )}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value?.trimStart()}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Endereço"
//                                 placeholder="Informe o endereço..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={6}>
//                         <Controller
//                           name="district"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={Array.from(
//                                 { length: 100 },
//                                 () => /^([ \u00c0-\u01ffa-zA-Z0-9'.,-])+$/,
//                               )}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value?.trimStart()}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Bairro"
//                                 placeholder="Informe o bairro..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={2}>
//                         <Controller
//                           name="uf"
//                           control={control}
//                           render={({
//                             field: { onChange, value, ...restField },
//                           }) => (
//                             <Autocomplete
//                               {...restField}
//                               disabled={action === "view"}
//                               options={statesAndCities}
//                               fullWidth
//                               size="small"
//                               autoHighlight
//                               inputValue={
//                                 ufInput === "string"
//                                   ? statesAndCities.find(
//                                       (s) => s.uf === ufInput,
//                                     )?.uf
//                                   : ufInput ?? ""
//                               }
//                               noOptionsText="Sem opções"
//                               PopperComponent={CustomPopper}
//                               getOptionLabel={(option) =>
//                                 `${option.uf} - ${option.name}`
//                               }
//                               renderOption={(props, o) => (
//                                 <li {...props}>
//                                   {o.uf} - {o.name}
//                                 </li>
//                               )}
//                               value={statesAndCities.find(
//                                 (s) => s.uf === value,
//                               )}
//                               onInputChange={(_, v, r) => {
//                                 if (r !== "reset") {
//                                   setUfInput(v);
//                                   setValue("uf", undefined);
//                                   setValue("city", "");
//                                 }
//                               }}
//                               onChange={(_, v) => {
//                                 setValue("uf", v?.uf);
//                                 setValue("city", "");
//                                 setUfInput(v?.uf);
//                                 onChange(v?.uf);
//                               }}
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   label="Estado"
//                                   onBlur={({ target }) => {
//                                     const selected = statesAndCities.find(
//                                       (s) =>
//                                         s.uf?.toLocaleLowerCase() ===
//                                         target.value?.toLocaleLowerCase(),
//                                     );
//                                     if (!selected) setUfInput("");
//                                     else if (
//                                       selected.uf?.toLocaleLowerCase() !==
//                                       selectedUf?.toLocaleLowerCase()
//                                     ) {
//                                       setUfInput(selected.uf);
//                                       setValue("uf", selected.uf);
//                                       setValue("city", "");
//                                     }
//                                   }}
//                                   inputProps={{
//                                     ...params.inputProps,
//                                     autoComplete: "new-password", // disable autocomplete and autofill
//                                   }}
//                                 />
//                               )}
//                             />
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4}>
//                         <Controller
//                           name="city"
//                           control={control}
//                           render={({
//                             field: { onChange, value, ...restField },
//                           }) => (
//                             <Autocomplete
//                               {...restField}
//                               disabled={action === "view"}
//                               options={
//                                 statesAndCities.find((s) => s.uf === selectedUf)
//                                   ?.cities ?? []
//                               }
//                               fullWidth
//                               clearOnBlur
//                               size="small"
//                               autoHighlight
//                               PopperComponent={CustomPopper}
//                               noOptionsText={
//                                 selectedUf && selectedUf !== ""
//                                   ? "Sem opções"
//                                   : "Selecione o estado primeiro"
//                               }
//                               getOptionLabel={(option) => option}
//                               value={
//                                 typeof value === "string"
//                                   ? (
//                                       statesAndCities.find(
//                                         (s) => s.uf === selectedUf,
//                                       )?.cities ?? []
//                                     ).find((c) => c === value)
//                                   : value || null
//                               }
//                               onChange={(_, v) => onChange(v ?? "")}
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   label="Cidade"
//                                   inputProps={{
//                                     ...params.inputProps,
//                                     autoComplete: "new-password", // disable autocomplete and autofill
//                                   }}
//                                 />
//                               )}
//                             />
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={3}>
//                         <Controller
//                           name="zipCode"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask="99999-999"
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 label="CEP"
//                                 size="small"
//                                 placeholder="Informe o CEP..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={3}>
//                         <Controller
//                           name="complement"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={Array.from(
//                                 { length: 50 },
//                                 () => /^([ \u00c0-\u01ffa-zA-Z0-9'.,-])+$/,
//                               )}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value?.trimStart()}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Complemento"
//                                 placeholder="Informe o complemento..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                     </Grid>
//                     <Grid item container xs={12} spacing={2}>
//                       <SubtitleForm>Dados profissionais</SubtitleForm>
//                       <Grid item xs={12} sm={12} md={3}>
//                         <FormControl fullWidth disabled={action === "view"}>
//                           <InputLabel id="professional-situation-label">
//                             Situação
//                           </InputLabel>
//                           <Controller
//                             name="professionalSituation"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 {...field}
//                                 size="small"
//                                 label="Situação"
//                                 defaultValue={-1}
//                                 labelId="professional-situation-label"
//                               >
//                                 <MenuItem value={-1} disabled>
//                                   <em>Selecione</em>
//                                 </MenuItem>
//                                 <MenuItem value={0}>Desempregado(a)</MenuItem>
//                                 <MenuItem value={1}>Empregado(a) CLT</MenuItem>
//                                 <MenuItem value={2}>Trab. Temporário</MenuItem>
//                                 <MenuItem value={3}>Trab. Autônomo</MenuItem>
//                                 <MenuItem value={4}>Freelancer</MenuItem>
//                                 <MenuItem value={5}>Estagiário(a)</MenuItem>
//                                 <MenuItem value={6}>Jovem aprendiz</MenuItem>
//                                 <MenuItem value={7}>Trab. Parcial</MenuItem>
//                                 <MenuItem value={8}>Terceirizado(a)</MenuItem>
//                                 <MenuItem value={9}>Trab. Remoto</MenuItem>
//                                 <MenuItem value={10}>
//                                   Trab. Intermitente
//                                 </MenuItem>
//                               </Select>
//                             )}
//                           />
//                         </FormControl>
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={3}>
//                         <Controller
//                           name="profession"
//                           control={control}
//                           render={({ field: { onChange, ...restField } }) => (
//                             <Autocomplete
//                               {...restField}
//                               disabled={action === "view"}
//                               options={professions}
//                               fullWidth
//                               clearOnBlur
//                               size="small"
//                               autoHighlight
//                               PopperComponent={CustomPopper}
//                               noOptionsText="Sem opções"
//                               getOptionLabel={(option) => option}
//                               onChange={(_, v) => onChange(v ?? "")}
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   label="Profissão"
//                                   inputProps={{
//                                     ...params.inputProps,
//                                     autoComplete: "new-password", // disable autocomplete and autofill
//                                   }}
//                                 />
//                               )}
//                             />
//                           )}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={6}>
//                         <Controller
//                           name="companyName"
//                           control={control}
//                           render={({ field: { onChange, value, ...rest } }) => (
//                             <InputMask
//                               disabled={action === "view"}
//                               mask={Array.from(
//                                 { length: 100 },
//                                 () => /^([ \u00c0-\u01ffa-zA-Z'&.0-9-])+$/,
//                               )}
//                               maskPlaceholder={null}
//                               onChange={onChange}
//                               value={value?.trimStart()}
//                               {...rest}
//                             >
//                               <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Empresa"
//                                 placeholder="Informe a empresa..."
//                               />
//                             </InputMask>
//                           )}
//                         />
//                       </Grid>
//                     </Grid>
//                     <Grid item container xs={12} spacing={2}>
//                       <SubtitleForm>Limite de crédito</SubtitleForm>
//                       <Grid item xs={12}>
//                         <Controller
//                           name="limit"
//                           control={control}
//                           render={({ field: { onChange, value } }) => (
//                             <Limit
//                               limit={value}
//                               usedLimit={usedLimit}
//                               availableLimit={availableLimit}
//                               disabled={action === "view"}
//                               onChange={(v) => onChange(v)}
//                             />
//                           )}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid
//                     item
//                     container
//                     xs={12}
//                     sm={4}
//                     spacing={2}
//                     alignContent="flex-start"
//                   >
//                     <SubtitleForm>Dados de contato</SubtitleForm>
//                     <Grid
//                       container
//                       spacing={2}
//                       sx={{
//                         mt: 1,
//                         pl: 2,
//                         maxHeight: 250,
//                         overflowY: "auto",
//                       }}
//                     >
//                       {contacts?.map((contact, idx) => (
//                         <Grid key={contact?.id} container item spacing={2}>
//                           <Grid item xs={12} sm={12} md={6}>
//                             <FormControl fullWidth disabled={action === "view"}>
//                               <InputLabel id="contact-type-label">
//                                 Tipo
//                               </InputLabel>
//                               <Controller
//                                 name={`contacts.${idx}.type`}
//                                 control={control}
//                                 render={({
//                                   field: { onChange, ...filedProps },
//                                 }) => (
//                                   <Select
//                                     {...filedProps}
//                                     onChange={(e) => {
//                                       setValue(`contacts.${idx}.text`, "");
//                                       onChange(e);
//                                     }}
//                                     size="small"
//                                     label="Tipo"
//                                     defaultValue={-1}
//                                     labelId="contact-type-label"
//                                   >
//                                     <MenuItem value={-1} disabled>
//                                       <em>Selecione</em>
//                                     </MenuItem>
//                                     <MenuItem value={0}>Telefone</MenuItem>
//                                     <MenuItem value={1}>Celular</MenuItem>
//                                     <MenuItem value={2}>WhatsApp</MenuItem>
//                                     <MenuItem value={3}>Email</MenuItem>
//                                   </Select>
//                                 )}
//                               />
//                             </FormControl>
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={6}>
//                             <Controller
//                               name={`contacts.${idx}.text`}
//                               control={control}
//                               render={({
//                                 field: { onChange, value, ...rest },
//                               }) => (
//                                 <InputMask
//                                   disabled={
//                                     (currentContacts?.[idx]?.type ?? -1) ===
//                                       -1 || action === "view"
//                                   }
//                                   mask={getContactMask(
//                                     value,
//                                     currentContacts?.[idx]?.type ===
//                                       ContactType.EMAIL
//                                       ? "email"
//                                       : "phone",
//                                   )}
//                                   maskPlaceholder={null}
//                                   onChange={onChange}
//                                   value={value?.trimStart()}
//                                   {...rest}
//                                 >
//                                   <TextField
//                                     fullWidth
//                                     size="small"
//                                     label="Contato"
//                                     placeholder="Informe o contato..."
//                                     InputProps={{
//                                       endAdornment:
//                                         action !== "view" &&
//                                         (contacts?.length ?? 0) > 1 ? (
//                                           <IconButton
//                                             size="small"
//                                             color="primary"
//                                             onClick={() => removeContact(idx)}
//                                           >
//                                             <Backspace />
//                                           </IconButton>
//                                         ) : undefined,
//                                     }}
//                                   />
//                                 </InputMask>
//                               )}
//                             />
//                           </Grid>
//                         </Grid>
//                       ))}
//                     </Grid>
//                     {action !== "view" && (
//                       <Grid item xs={12}>
//                         <Button
//                           fullWidth
//                           variant="contained"
//                           color="primary"
//                           onClick={() =>
//                             appendContact({
//                               id: uuid(),
//                               text: "",
//                               type: -1,
//                             })
//                           }
//                         >
//                           Adicionar contato
//                         </Button>
//                       </Grid>
//                     )}
//                     <SubtitleForm>Dados bancários</SubtitleForm>
//                     <Grid
//                       container
//                       spacing={2}
//                       sx={{
//                         mt: 1,
//                         pl: 2,
//                         maxHeight: 250,
//                         overflowY: "auto",
//                       }}
//                     >
//                       {pixKeys?.map(({ id }, idx) => (
//                         <Grid key={id} item xs={12}>
//                           <TextField
//                             fullWidth
//                             size="small"
//                             label="Chave PIX"
//                             disabled={action === "view"}
//                             {...register(`pixKeys.${idx}.key`)}
//                             placeholder="Digite a chave PIX..."
//                             InputProps={{
//                               endAdornment:
//                                 (pixKeys?.length ?? 0) > 1 ? (
//                                   <IconButton
//                                     size="small"
//                                     color="primary"
//                                     onClick={() => removePixKey(idx)}
//                                   >
//                                     <Backspace />
//                                   </IconButton>
//                                 ) : undefined,
//                             }}
//                           />
//                         </Grid>
//                       ))}
//                     </Grid>
//                     {action !== "view" && (
//                       <Grid item xs={12}>
//                         <Button
//                           fullWidth
//                           variant="contained"
//                           color="primary"
//                           onClick={() =>
//                             appendPixKey({
//                               id: uuid(),
//                               key: "",
//                             })
//                           }
//                         >
//                           Adicionar chave
//                         </Button>
//                       </Grid>
//                     )}
//                     <SubtitleForm>Contas bancárias</SubtitleForm>
//                     {action !== "view" && (
//                       <Grid container item spacing={2}>
//                         <Grid item xs={12} sm={12} md={6}>
//                           <Controller
//                             name="bankCode"
//                             control={bankForm.control}
//                             render={({
//                               field: { onChange, value, ...restField },
//                             }) => (
//                               <Autocomplete
//                                 {...restField}
//                                 fullWidth
//                                 clearOnBlur
//                                 size="small"
//                                 autoHighlight
//                                 noOptionsText="Sem opções"
//                                 PopperComponent={CustomPopper}
//                                 options={banks.map((b) => b.bankCode)}
//                                 onChange={(_, v) => onChange(v ?? "")}
//                                 value={
//                                   banks.find((b) => b.bankCode === value)
//                                     ?.bankCode ?? ""
//                                 }
//                                 getOptionLabel={(option) =>
//                                   option !== ""
//                                     ? `${option} - ${
//                                         banks.find((b) => b.bankCode === option)
//                                           ?.name ?? option
//                                       }`
//                                     : ""
//                                 }
//                                 renderInput={(params) => (
//                                   <TextField
//                                     {...params}
//                                     label="Banco"
//                                     inputProps={{
//                                       ...params.inputProps,
//                                       autoComplete: "new-password", // disable autocomplete and autofill
//                                     }}
//                                   />
//                                 )}
//                               />
//                             )}
//                           />
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={6}>
//                           <Controller
//                             name="agency"
//                             control={bankForm.control}
//                             render={({
//                               field: { onChange, value, ...rest },
//                             }) => (
//                               <InputMask
//                                 mask="999999"
//                                 maskPlaceholder={null}
//                                 onChange={onChange}
//                                 value={value}
//                                 {...rest}
//                               >
//                                 <TextField
//                                   fullWidth
//                                   size="small"
//                                   label="Agencia"
//                                   placeholder="Digite a agencia..."
//                                 />
//                               </InputMask>
//                             )}
//                           />
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={4}>
//                           <FormControl fullWidth>
//                             <InputLabel id="account-type-label">
//                               Tipo
//                             </InputLabel>
//                             <Controller
//                               name="type"
//                               control={bankForm.control}
//                               render={({ field: { value, ...rest } }) => (
//                                 <Select
//                                   {...rest}
//                                   size="small"
//                                   label="Tipo"
//                                   defaultValue={-1}
//                                   value={value ?? -1}
//                                   labelId="account-type-label"
//                                 >
//                                   <MenuItem value={-1} disabled>
//                                     <em>Selecione</em>
//                                   </MenuItem>
//                                   <MenuItem value={0}>Poupança</MenuItem>
//                                   <MenuItem value={1}>Corrente</MenuItem>
//                                   <MenuItem value={2}>Salário</MenuItem>
//                                 </Select>
//                               )}
//                             />
//                           </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={5}>
//                           <Controller
//                             name="accountNumber"
//                             control={bankForm.control}
//                             render={({
//                               field: { onChange, value, ...rest },
//                             }) => (
//                               <InputMask
//                                 mask="999999999999"
//                                 maskPlaceholder={null}
//                                 onChange={onChange}
//                                 value={value}
//                                 {...rest}
//                               >
//                                 <TextField
//                                   fullWidth
//                                   size="small"
//                                   label="Conta"
//                                   placeholder="Digite o nº da conta..."
//                                 />
//                               </InputMask>
//                             )}
//                           />
//                         </Grid>
//                         <Grid item xs={1}>
//                           <Button
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             onClick={() =>
//                               editingBankAccount
//                                 ? handleSaveChangeBankAccount()
//                                 : handleAddBankAccount()
//                             }
//                           >
//                             {editingBankAccount ? "Ok" : "+"}
//                           </Button>
//                         </Grid>
//                       </Grid>
//                     )}
//                     {!bankAccounts?.length ? (
//                       <Grid item xs={12}>
//                         <Typography
//                           component="p"
//                           variant="body2"
//                           color="text.secondary"
//                         >
//                           <em>Nenhuma conta bancária cadastrada...</em>
//                         </Typography>
//                       </Grid>
//                     ) : (
//                       <Grid item xs={12}>
//                         <TableContainer
//                           component={Paper}
//                           sx={{ maxHeight: 570, overflowY: "auto" }}
//                         >
//                           <Table
//                             size="small"
//                             stickyHeader
//                             sx={{ minWidth: 250 }}
//                             aria-label="list-bank-accounts"
//                           >
//                             <TableHead>
//                               <TableRow>
//                                 {accountTableHeaders.map((columnName) => (
//                                   <TableCell
//                                     key={columnName}
//                                     sx={{ whiteSpace: "nowrap" }}
//                                   >
//                                     <Typography
//                                       color={theme.colors.primary}
//                                       fontWeight="600"
//                                     >
//                                       {columnName}
//                                     </Typography>
//                                   </TableCell>
//                                 ))}
//                               </TableRow>
//                             </TableHead>
//                             <TableBody>
//                               {bankAccounts?.map((account, idx) => (
//                                 <TableRow
//                                   key={account.id}
//                                   sx={{
//                                     "&:last-child td, &:last-child th": {
//                                       border: 0,
//                                     },
//                                   }}
//                                 >
//                                   <TableCell
//                                     align="right"
//                                     sx={{
//                                       maxWidth: 60,
//                                       width: "fit-content",
//                                       pr: 0,
//                                       fontWeight: "bold",
//                                       whiteSpace: "pre",
//                                     }}
//                                   >
//                                     {account.bankCode} -{" "}
//                                   </TableCell>
//                                   <TableCell
//                                     align="left"
//                                     sx={{
//                                       pl: 0,
//                                       maxWidth: 150,
//                                       textOverflow: "ellipsis",
//                                       overflow: "hidden",
//                                       whiteSpace: "nowrap",
//                                     }}
//                                   >
//                                     {banks.find(
//                                       (b) => b.bankCode === account.bankCode,
//                                     )?.name ?? "Banco desconhecido"}
//                                   </TableCell>
//                                   <TableCell>{account.agency}</TableCell>
//                                   <TableCell
//                                     sx={{
//                                       textTransform: "uppercase",
//                                       whiteSpace: "nowrap",
//                                     }}
//                                   >
//                                     {accountTypeNames[account.type] ??
//                                       BankAccountType[account.type]}
//                                   </TableCell>
//                                   <TableCell>{account.accountNumber}</TableCell>
//                                   <TableCell
//                                     align="right"
//                                     sx={{
//                                       display: "flex",
//                                       alignItems: "center",
//                                     }}
//                                   >
//                                     <IconButton
//                                       color="primary"
//                                       size="small"
//                                       disabled={action === "view"}
//                                       onClick={() => removeBankAccount(idx)}
//                                     >
//                                       <DeleteOutline />
//                                     </IconButton>
//                                     <IconButton
//                                       color="primary"
//                                       size="small"
//                                       disabled={action === "view"}
//                                       onClick={() => {
//                                         bankForm.reset(account);
//                                         setEditingBankAccount(true);
//                                       }}
//                                     >
//                                       <ModeEditOutline />
//                                     </IconButton>
//                                   </TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </TableContainer>
//                       </Grid>
//                     )}
//                   </Grid>
//                 </Grid>
//               </Paper>
//               <Grid
//                 container
//                 spacing={2}
//                 sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
//               >
//                 <Grid item sm={12} md={3}>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => navigate("/customer")}
//                   >
//                     {action === "view" ? "Voltar" : "Cancelar"}
//                   </Button>
//                 </Grid>
//                 {action !== "view" && (
//                   <Grid item sm={12} md={3}>
//                     <Button
//                       fullWidth
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                     >
//                       Salvar
//                     </Button>
//                   </Grid>
//                 )}
//               </Grid>
//             </form>
//           )}
//         </Container>
//       </Box>
//     </Box>
//   );
// };

interface IContactPageProps {
  action: "new" | "view" | "edit";
}

type RouteParams = {
  contactId?: number;
};

const ContactPage: React.FC<IContactPageProps> = ({
  action,
}: IContactPageProps) => {
  const routeParams = useLocation()?.state as RouteParams;
  const navigate = useNavigate();
  const confirm = useAlert();

  const [saving, setSaving] = useState(false);
  const [defaultValues] = useState({} as IContact);

  const [addContact] = contactsApi.useAddContactMutation();
  const [updateContact] = contactsApi.useUpdateContactMutation();
  const { data: contactData, isLoading } = contactsApi.useGetContactByIdQuery(
    routeParams?.contactId ?? -1,
  );

  const {
    reset,
    watch,
    control,
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const {
    fields: infos,
    append: appendInfo,
    remove: removeInfo,
  } = useFieldArray({
    control,
    name: "contactInfo",
  });

  const currentInfos = watch("contactInfo");

  /*const {
     fields: addresses,
     append: appendAddress,
     remove: removeAddress,
   } = useFieldArray({
     control,
     name: "addresses",
   });*/

  useEffect(() => {
    if (contactData) {
      reset(contactData);
    }
  }, [contactData, reset]);

  const handleSave = useCallback(
    (data: IContact) => {
      if (saving) return;
      setSaving(true);

      if (action === "edit") {
        updateContact(data)
          .then(async () => {
            await confirm.show({
              type: "alert",
              title: "Sucesso!",
              description: "Os dados do contato foram atualizados.",
              timeout: 5000,
            });
            navigate("/home");
          })
          .catch(async () => {
            await confirm.show({
              type: "error",
              title: "Falha ao atualizar",
              description: "Não foi possível salvar as alterações do contato.",
              timeout: 5000,
            });
          })
          .finally(() => setSaving(false));
      } else
        addContact(data)
          .then(async () => {
            await confirm.show({
              type: "alert",
              title: "Sucesso!",
              description: "Os dados do contato foram salvos.",
              timeout: 5000,
            });
            navigate("/home");
          })
          .catch(async () => {
            await confirm.show({
              type: "error",
              title: "Falha ao salvar",
              description: "Não foi possível salvar os dados do contato.",
            });
          })
          .finally(() => setSaving(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, addContact, navigate, saving, updateContact],
  );

  const getContactMask = (input: string, type: "phone" | "email") => {
    if (type === "email")
      return Array.from({ length: 100 }, () => /^([a-zA-Z0-9-@.])+$/);
    if (input.replace(/\D/g, "").length <= 10) {
      return "(99) 9999-99999";
    } else {
      return "(99) 9 9999-9999";
    }
  };

  return (
    <Container sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Typography
            component="p"
            variant="h4"
            color="primary"
            sx={{ flexGrow: 1, mb: 2 }}
          >
            {action === "edit"
              ? "Editar "
              : action === "view"
              ? "Visualizar "
              : "Novo "}
            contato
          </Typography>
          {action !== "new" && isLoading ? (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 180px)",
              }}
            >
              <CircularProgress />
              <Typography sx={{ pt: 2 }} variant="body1">
                Carregando dados do contato
              </Typography>
              <Typography variant="subtitle2">
                <em>Por favor aguarde...</em>
              </Typography>

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => navigate("/home")}
              >
                Cancelar
              </Button>
            </Grid>
          ) : (
            <form onSubmit={handleSubmit(handleSave, console.log)}>
              <Paper sx={{ p: 2 }}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Informações básicas
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <TextField
                          required
                          fullWidth
                          size="small"
                          label="Nome"
                          mask={Array.from(
                            { length: 100 },
                            () => /^([ \u00c0-\u01ffa-zA-Z'-.])+$/,
                          )}
                          onChange={onChange}
                          value={value?.trimStart()}
                          disabled={action === "view"}
                          placeholder="Digite o nome do contato..."
                          {...rest}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <TextField
                          required
                          fullWidth
                          size="small"
                          label="Categoria"
                          mask={Array.from(
                            { length: 100 },
                            () => /^([ \u00c0-\u01ffa-zA-Z'-.])+$/,
                          )}
                          onChange={onChange}
                          value={value?.trimStart()}
                          disabled={action === "view"}
                          placeholder="Digite a categoria..."
                          {...rest}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Dados de contato
                    </Typography>
                  </Grid>
                  {infos?.map((info, idx) => (
                    <Grid key={info?.id} container item spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl fullWidth disabled={action === "view"}>
                          <InputLabel id="info-type-label">Tipo</InputLabel>
                          <Controller
                            name={`contactInfo.${idx}.type`}
                            control={control}
                            render={({
                              field: { onChange, ...filedProps },
                            }) => (
                              <Select
                                {...filedProps}
                                variant="standard"
                                onChange={(e) => {
                                  setValue(`contactInfo.${idx}.value`, "");
                                  onChange(e);
                                }}
                                size="small"
                                label="Tipo"
                                defaultValue=""
                                labelId="contact-type-label"
                              >
                                <MenuItem value={""} disabled>
                                  <em>Selecione</em>
                                </MenuItem>
                                <MenuItem value="phone">Telefone</MenuItem>
                                <MenuItem value="cell">Celular</MenuItem>
                                <MenuItem value="whatsapp">WhatsApp</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                              </Select>
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Controller
                          name={`contactInfo.${idx}.value`}
                          control={control}
                          render={({ field: { onChange, value, ...rest } }) => (
                            <TextField
                              fullWidth
                              size="small"
                              label="Contato"
                              disabled={
                                (currentInfos?.[idx]?.type ?? -1) === -1 ||
                                action === "view"
                              }
                              onChange={onChange}
                              value={value?.trimStart()}
                              {...rest}
                              mask={getContactMask(
                                value,
                                currentInfos?.[idx]?.type === "email"
                                  ? "email"
                                  : "phone",
                              )}
                              placeholder="Informe o contato..."
                              endAdornment={
                                action !== "view" &&
                                (infos?.length ?? 0) > 1 ? (
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => removeInfo(idx)}
                                  >
                                    <Backspace />
                                  </IconButton>
                                ) : undefined
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ))}
                  {action !== "view" && (
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          appendInfo({
                            id: (currentInfos?.length ?? 0) + 1,
                            value: "",
                            type: "",
                          })
                        }
                      >
                        Adicionar contato
                      </Button>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Endereço
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              <Grid
                container
                spacing={2}
                sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
              >
                <Grid item sm={12} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/home")}
                  >
                    {action === "view" ? "Voltar" : "Cancelar"}
                  </Button>
                </Grid>
                {action !== "view" && (
                  <Grid item sm={12} md={3}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Salvar
                    </Button>
                  </Grid>
                )}
              </Grid>
            </form>
          )}
        </Container>
      </Box>
    </Container>
  );
};
export default ContactPage;
