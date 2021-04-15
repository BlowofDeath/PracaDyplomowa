import React, { useState } from "react";
import validator from "validator";
import { useRecoilValue } from "recoil";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import css from "./ReportPracticeModal.module.css";
import Modal from "@components/Modal";
import Alert from "@material-ui/lab/Alert";
import Input from "@components/Input";
import { companyAtom } from "@config/userRecoilAtoms";
import { CREATE_PRACTICE_AGREEMENT } from "./queries.js";
import useSnackGraphql from "@hooks/useSnackGraphql";

const ReportPracticeModal = (props) => {
  const { setOpenModal, refetch } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const [createPracticeAgreement] = useMutation(CREATE_PRACTICE_AGREEMENT);
  const [showGraphqlErrors, enqueueSnackbar] = useSnackGraphql();

  const onSubmit = (data) => {
    setIsLoading(true);
    createPracticeAgreement({
      variables: {
        city: data.city,
        address: data.address,
        from: data.from,
        to: data.to,
        phone: data.phone,
        email: data.email,
        company_name: data.company_name,
      },
    })
      .then(() => {
        setIsLoading(false);
        // refetch();
        enqueueSnackbar("Praktyka zgłoszona pomyślnie", { variant: "success" });
        refetch();
        setOpenModal(false);
      })
      .catch((err) => {
        console.log(err);
        showGraphqlErrors(err);
        setIsLoading(false);
      });
  };
  return (
    <Modal
      {...props}
      header="Zgłoś praktykę"
      isLoading={isLoading}
      buttons={
        <>
          <button preset="bright" onClick={() => setOpenModal(false)}>
            Zamknij
          </button>
          <button onClick={handleSubmit(onSubmit)}>Wyślij zgłoszenie</button>
        </>
      }
    >
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.inputGroup}>
            <Input
              label="Nazwa firmy*"
              labelOnTop
              inputRef={register({ required: true })}
              name="company_name"
              placeholder="Example z.o.o"
            />

            <Input
              label="Email*"
              labelOnTop
              inputRef={register({
                validate: (value) => (value ? validator.isEmail(value) : true),
              })}
              name="email"
              placeholder="jk@example.com"
            />

            <Input
              label="Telefon*"
              labelOnTop
              inputRef={register({ required: true })}
              name="phone"
              placeholder="678 890 ..."
            />
            <Input
              label="Miejscowość i kod pocztowy*"
              labelOnTop
              inputRef={register({ required: true })}
              name="city"
              placeholder="Olsztyn, 10-089"
            />
            <Input
              label="Adres*"
              labelOnTop
              inputRef={register({ required: true })}
              name="address"
              placeholder="Wyspiańskiego 18"
            />
          </div>
        </div>
        <div>
          <div className={css.fromToWrapper}>
            <label>Przedział czasowy</label>
            <Input
              type="date"
              label="Od*"
              inputRef={register({ required: true })}
              name="from"
            />
            <Input
              type="date"
              label="Do*"
              inputRef={register({ required: true })}
              name="to"
            />
          </div>
        </div>
      </div>
      <div className={css.errors}>
        {errors.city && (
          <Alert variant="filled" severity="error">
            Miejscowość i kod pocztowy są wymagane
          </Alert>
        )}
        {errors.company_name && (
          <Alert variant="filled" severity="error">
            Nazwa firmy jest wymagana
          </Alert>
        )}
        {errors.address && (
          <Alert variant="filled" severity="error">
            Adres jest wymagany
          </Alert>
        )}
        {errors.phone && (
          <Alert variant="filled" severity="error">
            Telefon jest wymagany
          </Alert>
        )}
        {(errors.from || errors.to) && (
          <Alert variant="filled" severity="error">
            Podaj poprawny przedział czasowy
          </Alert>
        )}
        {errors.email && (
          <Alert variant="filled" severity="error">
            Adres email jest niepoprawny
          </Alert>
        )}
      </div>
    </Modal>
  );
};

export default ReportPracticeModal;
