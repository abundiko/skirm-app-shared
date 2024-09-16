# Route structure and response values

## Keep in mind
- `camelCase` is to be used for all type keys and fields for FormData
- Type: is represent the models to be returned
```ts
type User{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    createdAt: string;
}
```
- TypeMini: is a smaller version of the model (mostly used for population)
```ts
type UserMini{
    _id: string;
    userName: string;
    email: string;
}
```
- TypeDetailed: includes populated fields from model
```ts
type PaymentDetailed{
    _id: string;
    user: User;
    // ...other fields
}
```
- TypeWithField: is a model that includes field(s) from another model
```ts
type UserWithWallet = User & {
    wallet: Wallet
}
```
- Paginated<Type>: is response that consist of a list of model paginated