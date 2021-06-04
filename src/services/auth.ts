import { v4 as uuid } from 'uuid';

interface SignInRequestData {
  email: string;
  password: string;
}

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Vinícius Alves',
      email: 'viniciusfariaresende@gmail.com',
      avatar_url: 'https://github.com/ViniciusResende.png',
    },
  };
}

export async function recoveryUserInformation() {
  await delay();

  return {
    user: {
      name: 'Vinícius Alves',
      email: 'viniciusfariaresende@gmail.com',
      avatar_url: 'https://github.com/ViniciusResende.png',
    },
  };
}
