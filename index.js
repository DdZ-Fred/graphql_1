const {
  getVideoById,
  getVideos,
  createVideo,
} = require('./src/data');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');


const PORT = process.env.PORT || 3000;
const server = express();



const videoType = new GraphQLObjectType({
  name: 'VideoType',
  description: 'The video type',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'A unique identifier',
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
      description: 'Whether it has been watched or not'
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether it has been released or not'
    }
  }
});

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
          description: 'The id of a video'
        }
      },
      resolve: (_, args) => getVideoById(args.id),
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type',
  fields: {
    createVideo: {
      type: videoType,
      args: {
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
          description: 'Whether it has been released or not'
        }
      },
      resolve: (_, args) => createVideo(args),
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});


const query = `
query myFirstQuery {
  videos {
    id,
    title
  }w
}
`;

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  // rootValue: resolvers,
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})