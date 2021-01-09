
const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //get a user by username
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("books");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.input } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;



// const { User, Book } = require('../models');
// const { AuthenticationError } = require("apollo-server-express");
// const { signToken } = require('../utils/auth');

// const resolvers = {
//     Query: {
//         getSingleUser: async ({ user = null, params }, res) =>{
//             const foundUser = await User.findOne({
//               $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
//             });
        
//             if (!foundUser) {
//               return res.status(400).json({ message: 'Cannot find a user with this id!' });
//             }
        
//             res.json(foundUser);
//           },
//     },
//     Mutation: {
//         createUser: async (parent, args) => {
//             const user = await User.create(args);
//             const token = signToken(user);
          
//             return { token, user };
//         },

//         login: async ({ body }, res) =>{
//             const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
//             if (!user) {
//               return res.status(400).json({ message: "Can't find this user" });
//             }
        
//             const correctPw = await user.isCorrectPassword(body.password);
        
//             if (!correctPw) {
//               return res.status(400).json({ message: 'Wrong password!' });
//             }
//             const token = signToken(user);
//             res.json({ token, user });
//         },

       
//         saveBook: async ({ user, body }, res) =>{
//             console.log(user);
//             try {
//               const updatedUser = await User.findOneAndUpdate(
//                 { _id: user._id },
//                 { $addToSet: { savedBooks: body } },
//                 { new: true, runValidators: true }
//               );
//               return res.json(updatedUser);
//             } catch (err) {
//               console.log(err);
//               return res.status(400).json(err);
//             }
//         }, 
//            // remove a book from `savedBooks`
//         deleteBook: async ({ user, params }, res) => {
//             const updatedUser = await User.findOneAndUpdate(
//             { _id: user._id },
//             { $pull: { savedBooks: { bookId: params.bookId } } },
//             { new: true }
//             );
//             if (!updatedUser) {
//             return res.status(404).json({ message: "Couldn't find user with this id!" });
//             }
//             return res.json(updatedUser);
//         }, 

     
//     }
// };
  
// module.exports = resolvers;