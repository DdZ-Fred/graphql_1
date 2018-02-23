const { getVideoById } = require('./src/data');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
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
      type: GraphQLID,
      description: 'A unique identifier',

    },
    title: {
      type: GraphQLString,
      description: 'title',
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video in seconds',
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether it has been watched or not'
    },
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description: 'The id of a video'
        }
      },
      resolve: (_, args) => getVideoById(args.id),
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
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