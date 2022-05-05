import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
async function main() {
    const app = express();
    if (process.env.CLEARDB_DATABASE_URL) {
        let config = {
            type: 'mysql',
            synchronize: false,
            logging: false,
            entities: ['src/graphql/entity/**/*.ts']
        };
        Object.assign(config, { url: process.env.DATABASE_URL });
        await createConnection(config);
    }
    else {
        await createConnection();
    }
    const schema = await buildSchema({
        // resolvers: [
        //   __dirname + '@entity/**/*.query.ts',
        //   __dirname + '@entity/**/*.mutation.ts',
        //   __dirname + '@entity/**/*.fieldResolver.ts'
        // ],
        resolvers: [path.resolve('./src/graphql/entity/**/index.ts')],
        dateScalarMode: 'isoDate',
        nullableByDefault: true,
        validate: false
    });
    const server = new ApolloServer({ schema });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(4100, () => {
        console.log('Server has started at http://localhost:4100/graphql');
    });
}
main();
//# sourceMappingURL=app.js.map