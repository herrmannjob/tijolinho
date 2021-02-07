// // import { API } from 'aws-amplify';
// import { API, graphqlOperation, Auth } from 'aws-amplify';
// import * as queries from '../../front/graphql/queries';
// // import * as mutations from '../../front/graphql/mutations';
// // import * as subscriptions from '../../front/graphql/subscriptions';
// async function signIn() {
//     try {
//         const user = await Auth.signIn('ygorsansone@gmail.com', 'T3ste123456789!');
//         console.log(user);
//     } catch (error) {
//         console.log('error signing in', error);
//     }
// }
// async function query(){
//     signIn();
//     const todos = await API.graphql(graphqlOperation(queries.listTarefas));
//       console.log(todos);
// }

// query();