import { GraphQLSchema,
         GraphQLObjectType,
         GraphQLString,
         GraphQLList,
         GraphQLNonNull } from 'graphql';

import { getAllYears,
         getAuthorByName} from '../services/my_service.js';
import Author from '../models/Author.js';
import Year from '../models/Year.js';

let my_schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            author: {
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                type: Author,
                resolve: async (root, args) => {
                    console.log(args);
                    console.log(args.name);
                    let result = await getAuthorByName(args.name)
                    //console.log(result);
                    return result
                }
            },
            year: {
                type: new GraphQLList(Year),
                resolve: async (root) => {
                    return await getAllYears();
                }
            }
        })
    })
})

export default my_schema;