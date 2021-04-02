import { useSnackbar } from "notistack";

const useSnackGraphql = (variant = "error") => {
  const { enqueueSnackbar } = useSnackbar();
  const enqueueError = (errors) => {
    if (errors.graphQLErrors)
      errors.graphQLErrors.map(({ message }) => {
        enqueueSnackbar(message, { variant });
      });
  };
  return [enqueueError];
};

export default useSnackGraphql;
