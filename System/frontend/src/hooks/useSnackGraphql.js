import { useSnackbar } from "notistack";

const useSnackGraphql = (variant = "error") => {
  const { enqueueSnackbar } = useSnackbar();
  const enqueueError = (errors) => {
    errors.graphQLErrors.map(({ message }) => {
      enqueueSnackbar(message, { variant });
    });
  };
  return [enqueueError];
};

export default useSnackGraphql;
