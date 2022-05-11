import { connect } from 'mongoose';

export async function connectToDb() {
  await connect("mongodb+srv://paychex-demo:paychex-demo@cluster0.h6qjc.mongodb.net/paychex_demo?retryWrites=true&w=majority").catch((err) => {
    console.log('err');
  }).then(() => {
    console.log('Connected to database!')
  });
}
