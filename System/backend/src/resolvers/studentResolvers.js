import Student from "../models/Student";

const studentResolvers = {
  Query: {
    me: async (_, args, context) => {
      const id = 1; //id z token auth
      const me = await Student.findOne({ id });
      return me;
    },
    student: async (_, { id }, context) => {
      const student = await Student.findOne({ id });
      return student;
    },
  },
};

export default studentResolvers;
