const studentResolvers = {
  Query: {
    student: (_, args, context) => {
      return "Test";
    },
  },
};

export default studentResolvers;
