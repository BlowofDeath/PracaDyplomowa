import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { useRecoilValue, useRecoilState } from "recoil";
import validator from "validator";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";

import css from "./Profile.module.css";
import Page from "@components/Page";
import Container from "@components/Container";
import LoadingSpinner from "@components/LoadingSpinner";
import Input from "@components/Input";
import {
  companyAtom,
  studentAtom,
  practiceSuperviserAtom,
} from "@config/userRecoilAtoms";
import {
  UPDATE_STUDENT,
  UPDATE_COMPANY,
  UPDATE_PRACTICE_SUPERVISER,
} from "./queries.js";
import useSnackGraphql from "@hooks/useSnackGraphql";

const Profile = () => {
  const { register, errors, handleSubmit } = useForm();
  const [company, setCompany] = useRecoilState(companyAtom);
  const [student, setStudent] = useRecoilState(studentAtom);
  const [practiceSuperviser, setPracticeSuperviser] = useRecoilState(
    practiceSuperviserAtom
  );
  const [isLoading, setIsLoading] = useState();

  const [updateStudentProfile] = useMutation(UPDATE_STUDENT);
  const [updateCompanyProfile] = useMutation(UPDATE_COMPANY);
  const [updatePracticeSuperviserProfile] = useMutation(
    UPDATE_PRACTICE_SUPERVISER
  );

  const [enqueueGraphqlError, enqueueSnackbar] = useSnackGraphql();

  const onSubmit = (data) => {
    setIsLoading(true);
    if (student) {
      if (data.password !== data.confirmPassword) {
        enqueueSnackbar("Hasła muszą być takie same.", { variant: "error" });
      } else if (data.password.length < 8 && data.password.length > 0) {
        enqueueSnackbar("Hasło musi mieć przynajmniej 8 znaków.", {
          variant: "error",
        });
      } else if (data.first_name.length < 3 || data.last_name.length < 3) {
        enqueueSnackbar("Imię i nazwisko, muszą mieć przynajmniej 3 znaki.", {
          variant: "error",
        });
      } else {
        const variables = {};
        if (student.first_name !== data.first_name)
          variables.first_name = data.first_name;
        if (student.last_name !== data.last_name)
          variables.last_name = data.last_name;
        if (data.password.length > 0) {
          variables.password = data.password;
          variables.confirmPassword = data.confirmPassword;
        }
        if (student.index_number !== data.index_number)
          variables.index_number = data.index_number;

        if (
          !variables.first_name &&
          !variables.last_name &&
          !variables.password &&
          !variables.index_number
        ) {
          enqueueSnackbar("Nie dokonano żadnych zmian", {
            variant: "warning",
          });
          setIsLoading(false);
          return;
        }
        updateStudentProfile({ variables: variables })
          .then((res) => {
            if (res?.data?.updateStudentProfile) {
              console.log(res);
              enqueueSnackbar("Zauktualizowano pomyślnie.", {
                variant: "success",
              });
              setStudent(res?.data?.updateStudentProfile);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            enqueueGraphqlError(err);
          });
      }
    }
    if (company) {
      console.log(data);
      if (data.password !== data.confirmPassword) {
        enqueueSnackbar("Hasła muszą być takie same.", { variant: "error" });
      } else if (data.password.length < 8 && data.password.length > 0) {
        enqueueSnackbar("Hasło musi mieć przynajmniej 8 znaków.", {
          variant: "error",
        });
      } else if (data.first_name.length < 3 || data.last_name.length < 3) {
        enqueueSnackbar("Imię i nazwisko, muszą mieć przynajmniej 3 znaki.", {
          variant: "error",
        });
      } else {
        const variables = {};
        if (company.first_name !== data.first_name)
          variables.first_name = data.first_name;
        if (company.last_name !== data.last_name)
          variables.last_name = data.last_name;
        if (data.password.length > 0) {
          variables.password = data.password;
          variables.confirmPassword = data.confirmPassword;
        }
        if (company.name !== data.name) variables.name = data.name;
        if (company.phone !== data.phone) variables.phone = data.phone;
        if (company.city !== data.city) variables.city = data.city;
        if (company.address !== data.address) variables.address = data.address;

        console.log(variables);
        if (
          !variables.first_name &&
          !variables.last_name &&
          !variables.password &&
          !variables.phone &&
          !variables.name &&
          !variables.city &&
          !variables.address
        ) {
          enqueueSnackbar("Nie dokonano żadnych zmian", {
            variant: "warning",
          });
          setIsLoading(false);
          return;
        }
        updateCompanyProfile({ variables: variables })
          .then((res) => {
            if (res?.data?.updateCompanyProfile) {
              console.log(res);
              enqueueSnackbar("Zauktualizowano pomyślnie.", {
                variant: "success",
              });
              setCompany(res?.data?.updateCompanyProfile);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            enqueueGraphqlError(err);
          });
      }
    }
    if (practiceSuperviser) {
      if (data.password !== data.confirmPassword) {
        enqueueSnackbar("Hasła muszą być takie same.", { variant: "error" });
      } else if (data.password.length < 8 && data.password.length > 0) {
        enqueueSnackbar("Hasło musi mieć przynajmniej 8 znaków.", {
          variant: "error",
        });
      } else if (data.first_name.length < 3 || data.last_name.length < 3) {
        enqueueSnackbar("Imię i nazwisko, muszą mieć przynajmniej 3 znaki.", {
          variant: "error",
        });
      } else {
        const variables = {};
        if (practiceSuperviser.first_name !== data.first_name)
          variables.first_name = data.first_name;
        if (practiceSuperviser.last_name !== data.last_name)
          variables.last_name = data.last_name;
        if (data.password.length > 0) {
          variables.password = data.password;
          variables.confirmPassword = data.confirmPassword;
        }

        if (
          !variables.first_name &&
          !variables.last_name &&
          !variables.password
        ) {
          enqueueSnackbar("Nie dokonano żadnych zmian", {
            variant: "warning",
          });
          setIsLoading(false);
          return;
        }
        updatePracticeSuperviserProfile({ variables: variables })
          .then((res) => {
            if (res?.data?.updatePracticeSuperviserProfile) {
              console.log(res);
              enqueueSnackbar("Zauktualizowano pomyślnie.", {
                variant: "success",
              });
              setPracticeSuperviser(res?.data?.updatePracticeSuperviserProfile);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            enqueueGraphqlError(err);
          });
      }
    }
  };
  return (
    <Page title="Profil">
      {isLoading && <LoadingSpinner global />}
      <Container>
        {" "}
        <div className={css.container}>
          <div className={css.content}>
            {student && (
              <>
                <div className={css.formGroup}>
                  <Input
                    inputRef={register()}
                    label="Imię"
                    labelOnTop
                    name="first_name"
                    defaultValue={student.first_name}
                  />

                  <Input
                    label="Nazwisko"
                    labelOnTop
                    inputRef={register()}
                    name="last_name"
                    defaultValue={student.last_name}
                  />
                  <Input
                    label="Numer indeksu"
                    labelOnTop
                    inputRef={register()}
                    name="index_number"
                    defaultValue={student.index_number}
                  />
                </div>
                <div className={css.formGroup}>
                  <Input
                    label="Hasło"
                    type="password"
                    labelOnTop
                    inputRef={register()}
                    name="password"
                  />
                  <Input
                    label="Powtórz hasło"
                    type="password"
                    labelOnTop
                    inputRef={register()}
                    name="confirmPassword"
                  />
                </div>
              </>
            )}
            {company && (
              <>
                <div className={css.formGroup}>
                  <Input
                    inputRef={register()}
                    label="Imię"
                    labelOnTop
                    name="first_name"
                    defaultValue={company.first_name}
                  />

                  <Input
                    label="Nazwisko"
                    labelOnTop
                    inputRef={register()}
                    name="last_name"
                    defaultValue={company.last_name}
                  />
                  <Input
                    label="Telefon"
                    labelOnTop
                    inputRef={register()}
                    name="phone"
                    defaultValue={company.phone}
                  />
                </div>
                <div className={css.formGroup}>
                  <Input
                    label="Nazwa firmy"
                    labelOnTop
                    inputRef={register()}
                    name="name"
                    defaultValue={company.name}
                  />
                  <Input
                    label="Miasto i kod pocztowy"
                    labelOnTop
                    inputRef={register()}
                    name="city"
                    defaultValue={company.city}
                  />
                  <Input
                    label="Ulica"
                    labelOnTop
                    inputRef={register()}
                    name="address"
                    defaultValue={company.address}
                  />
                </div>
                <div className={css.formGroup}>
                  <Input
                    label="Hasło"
                    type="password"
                    labelOnTop
                    inputRef={register()}
                    name="password"
                  />
                  <Input
                    label="Powtórz hasło"
                    type="password"
                    labelOnTop
                    inputRef={register()}
                    name="confirmPassword"
                  />
                </div>
              </>
            )}
            {practiceSuperviser && (
              <>
                <div className={css.formGroup}>
                  <Input
                    inputRef={register()}
                    label="Imię"
                    labelOnTop
                    name="first_name"
                    defaultValue={practiceSuperviser.first_name}
                  />

                  <Input
                    label="Nazwisko"
                    labelOnTop
                    inputRef={register()}
                    name="last_name"
                    defaultValue={practiceSuperviser.last_name}
                  />
                </div>
                <div className={css.formGroup}>
                  <Input
                    label="Hasło"
                    type="password"
                    labelOnTop
                    inputRef={register()}
                    name="password"
                  />
                  <Input
                    label="Powtórz hasło"
                    type="password"
                    labelOnTop
                    inputRef={register()}
                    name="confirmPassword"
                  />
                </div>
              </>
            )}
          </div>

          <div className={css.buttons}>
            <button onClick={handleSubmit(onSubmit)}>Zapisz</button>
          </div>
        </div>
        <div className={css.errors}>
          {errors.header && (
            <Alert variant="filled" severity="error">
              Nagłówek jest wymagany
            </Alert>
          )}
          {errors.company_name && (
            <Alert variant="filled" severity="error">
              Nazwa firmy jest wymagana
            </Alert>
          )}
          {errors.slots && (
            <Alert variant="filled" severity="error">
              Miejsca są wymagane
            </Alert>
          )}
          {errors.technologies && (
            <Alert variant="filled" severity="error">
              Technologie są wymagane
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
      </Container>
    </Page>
  );
};

export default Profile;
