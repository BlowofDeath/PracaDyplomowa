import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import css from "./Invitation.module.css";
import LoadingSpinner from "@components/LoadingSpinner";
import { CONFIRM_INVITATION_TOKEN, REGISTER_COMPANY } from "./queries";
import useSnackGraphql from "@hooks/useSnackGraphql";
import Input from "@components/Input";
import USER_TYPES from "@config/userTypes";
import Logo from "@assets/Logo";
import Statement from "@components/Statement";
import useAuth from "@hooks/useAuth";

const Invitation = () => {
  const { token } = useParams();
  const history = useHistory();
  const [getInvitationConfirm, { loading }] = useMutation(
    CONFIRM_INVITATION_TOKEN
  );
  const [invitationError, setInvitationError] = useState(false);
  // const [registerStudent, { loading: studentLoading }] = useMutation(
  //   REGISTER_STUDENT
  // );
  const [registerCompany] = useMutation(REGISTER_COMPANY);
  // const [registerPracticeSuperviser, { loading: practiceSuperviserLoading }] = useMutation(
  //   REGISTER_PRACTICE_SUPERVISER
  // );
  const [invitationData, setInvitationData] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [enqueueError, enqueueSnackbar] = useSnackGraphql();
  const { register, handleSubmit, watch, errors } = useForm();
  const { removeToken, removeUserType } = useAuth();

  const onSubmit = (data) => {
    if (invitationData) {
      const { userType } = invitationData;
      switch (userType) {
        case USER_TYPES.student:
          break;
        case USER_TYPES.company:
          registerCompany({ variables: { ...data, token } })
            .then((data) => {
              if (data) {
                enqueueSnackbar("Zarejestrowana pomyślnie", {
                  variant: "success",
                });

                setRegisterSuccess(true);

                setTimeout(() => {
                  removeToken();
                  removeUserType();
                  history.push("/login");
                }, 5000);
              }
            })
            .catch((error) => {
              enqueueError(error);
            });
          break;
        case USER_TYPES.practiceSuperviser:
          break;
        default:
          console.log("UserType error");
      }
    }
  };

  useEffect(() => {
    if (token) {
      getInvitationConfirm({ variables: { token } })
        .then(({ data }) => {
          console.log(data);
          if (data.confirmInvitationToken) {
            setInvitationData(data.confirmInvitationToken);
          }
        })
        .catch((err) => {
          setInvitationError(true);
          enqueueError(err);
        });
    }
  }, [token]);

  if (loading) return <LoadingSpinner />;
  if (registerSuccess) {
    return (
      <>
        <Statement title="Zarejestrowano pomyślnie" isLoading={true}>
          Zarejestrowano pomyślnie. <br />
          za chwilę nastąpi przekierowanie do strony logowania.
        </Statement>
      </>
    );
  }

  if (invitationError) {
    return (
      <Statement title="Wystąpił błąd">
        Link z zaproszeniem wygasł, lub został wykorzystany, skontaktuj się z
        opiekunem praktyk.
      </Statement>
    );
  }

  return (
    <div className={css.outerContainer}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>Stwórz konto</h2>
          <Logo />
        </div>
        <div className={css.content}>
          <div>
            <label>Adres email</label>
            <br />
            <span>{invitationData?.email}</span>
            <Input
              name="first_name"
              inputRef={register({ required: "Musisz podać imię" })}
              labelOnTop
              label="Imię"
            />
            {errors.first_name && (
              <Alert variant="filled" severity="error">
                {errors.first_name.message}
              </Alert>
            )}
            <Input
              name="last_name"
              inputRef={register({ required: "Musisz podać nazwisko" })}
              labelOnTop
              label="Nazwisko"
            />
            {errors.last_name && (
              <Alert variant="filled" severity="error">
                {errors.last_name.message}
              </Alert>
            )}
            <Input
              name="password"
              type="password"
              inputRef={register({
                required: "Musisz podać hasło",
                minLength: {
                  value: 8,
                  message: "Hasło musi mieć przynajmniej 8 znaków",
                },
              })}
              labelOnTop
              label="Hasło"
            />
            {errors.password && (
              <Alert variant="filled" severity="error">
                {errors.password.message}
              </Alert>
            )}
            <Input
              name="confirm_password"
              type="password"
              inputRef={register({
                validate: (value) =>
                  value === watch("password") || "Hasła się nie zgadzają",
              })}
              labelOnTop
              label="Powtórz hasło"
            />
            {errors.confirm_password && (
              <Alert variant="filled" severity="error">
                {errors.confirm_password.message}
              </Alert>
            )}
          </div>
          <div>
            <label>Typ konta</label>
            <br />
            {invitationData?.userType === USER_TYPES.student && (
              <>
                <span>Student</span>
                <Input
                  name="index_number"
                  inputRef={register({
                    required: "Musisz podać numer indeksu",
                  })}
                  labelOnTop
                  label="Numer indeksu"
                />
                {errors.index_number && (
                  <Alert variant="filled" severity="error">
                    {errors.index_number.message}
                  </Alert>
                )}
              </>
            )}

            {invitationData?.userType === USER_TYPES.company && (
              <>
                <span>Firma</span>
                <Input
                  name="name"
                  inputRef={register({
                    required: "Musisz podać nazwę firmy",
                  })}
                  labelOnTop
                  label="Nazwa firmy"
                />
                {errors.name && (
                  <Alert variant="filled" severity="error">
                    {errors.name.message}
                  </Alert>
                )}
                <Input
                  name="city"
                  inputRef={register({
                    required: "Musisz podać miasto",
                  })}
                  labelOnTop
                  label="Miasto"
                />
                {errors.city && (
                  <Alert variant="filled" severity="error">
                    {errors.city.message}
                  </Alert>
                )}
                <Input
                  name="address"
                  inputRef={register({
                    required: "Musisz podać adres",
                  })}
                  labelOnTop
                  label="Adres"
                />
                {errors.address && (
                  <Alert variant="filled" severity="error">
                    {errors.address.message}
                  </Alert>
                )}
                <Input
                  name="phone"
                  inputRef={register}
                  labelOnTop
                  label="Phone"
                />
              </>
            )}
            {invitationData?.userType === USER_TYPES.practiceSuperviser && (
              <>
                <span>Opiekun praktyk</span>
              </>
            )}
          </div>
        </div>
        <div className={css.footer}>
          <button onClick={handleSubmit(onSubmit)}>Stwórz konto</button>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
