
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} = require('graphql');
const express = require('express');
const bodyParser = require('body-parser');
const {
  graphqlExpress,
  graphiqlExpress,
} = require('apollo-server-express');

const {
  getVideoById,
  getVideos,
  createVideo,
} = require('./src/data');
const nodeInterface = require('./src/data/node');


const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'VideoType',
  description: 'The video type',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the video',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the video',
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the video in seconds',
    },
    watched: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether it has been watched or not',
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether it has been released or not',
    },
  },
  interfaces: [nodeInterface],
});

module.exports.videoType = videoType;


const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      description: 'A list of videos',
      resolve: () => getVideos(),
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of a video',
        },
      },
      resolve: (_, args) => getVideoById(args.id),
    },
  },
});

const videoInputType = new GraphQLInputObjectType({
  name: 'VideoInput',
  description: 'The video input type',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the video',
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the video in seconds',
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether it has been released or not',
    },
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType),
        },
      },
      resolve: (_, args) => createVideo(args.video),
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

function getUserId(req) {
  // Get user id from Token or anywhere else
  // Return user Id
  return 1;
}


server.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
  const requestUserId = getUserId(req);
  return {
    schema,
    // Context: Object that is accessible in every resolver as the 3rd argument
    context: {
      userId: requestUserId,
    },
    formatError: (err) => {
      // Do special error formatting
      // err.originalError = thrown error
      return err;
    },
  };
}));
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
