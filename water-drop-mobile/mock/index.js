import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { addMocksToSchema } from "@graphql-tools/mock"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { faker } from "@faker-js/faker/locale/zh_CN"

const typeDefs = `#graphql
type UserType {
    id: String!
    name: String!
    desc: String!
  
    """账户信息"""
    account: String!
  }
  
  type Query {
    """使用ID查询用户"""
    find(id: String!): UserType!
  }
  
  type Mutation {
    """新增用户"""
    create(params: UserInput!): Boolean!
  
    """更新用户"""
    update(id: String!, params: UserInput!): Boolean!
  
    """删除用户"""
    del(id: String!): Boolean!
  }
  
  input UserInput {
    name: String!
    desc: String!
  }
`

const resolvers = {
  UserType: {
    name: () => faker.name.fullName(),
  },
}

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "hello",
}

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
})

startStandaloneServer(server, { listen: { port: 5173 } })
