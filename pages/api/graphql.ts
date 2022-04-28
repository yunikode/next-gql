import {ApolloServer} from "apollo-server-micro"
import "reflect-metadata"
import {buildSchema, Resolver, Query, Arg, ObjectType, Field, ID} from "type-graphql"

import { DogsResolver } from "../../src/schema/dogs.resolver"

const schema = await buildSchema({
  resolvers: [DogsResolver]
})

const server = new ApolloServer({
schema
})

export const config ={
  api: {
    bodyParser: false
  }
}

const startServer = server.start()

export default async function hander(req, res) {
  await startServer
  await server.createHandler({path: "/api/graphql"})(req, res)
}