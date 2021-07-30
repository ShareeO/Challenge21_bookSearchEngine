const { AuthenticationError } = require("apollo-server-express");
const { User, Thought } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        throw new AuthenticationError("Could not find user");
      }
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new AuthenticationError("Could not log in");
      }
  
      const correctPw = await user.isCorrectPassword(body.password);
  
      if (!correctPw) {
        throw new AuthenticationError("Wrong password");
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.book } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("Could not save book");
      }
    },

    removeBook: async (parent, args, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError("Could not delete book");
      }
      return updatedUser;

    }
  },
};

module.exports = resolvers;
