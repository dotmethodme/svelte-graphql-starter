import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};




export enum ApplyPolicy {
  BeforeResolver = 'BEFORE_RESOLVER',
  AfterResolver = 'AFTER_RESOLVER'
}


export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<User>;
  login?: Maybe<UserTokenResult>;
  createReminder?: Maybe<Reminder>;
};


export type MutationRegisterArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationCreateReminderArgs = {
  title?: Maybe<Scalars['String']>;
  schedule?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  reminders?: Maybe<Array<Maybe<Reminder>>>;
};

export type Reminder = {
  __typename?: 'Reminder';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  schedule?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserToken = {
  __typename?: 'UserToken';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type UserTokenResult = {
  __typename?: 'UserTokenResult';
  rawToken?: Maybe<UserToken>;
  token?: Maybe<Scalars['String']>;
};

export type UserPartFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserTokenResult' }
    & Pick<UserTokenResult, 'token'>
    & { rawToken?: Maybe<(
      { __typename?: 'UserToken' }
      & Pick<UserToken, 'id' | 'name' | 'email'>
    )> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'User' }
    & UserPartFragment
  )> }
);

export type ReminderPartFragment = (
  { __typename?: 'Reminder' }
  & Pick<Reminder, 'id' | 'title' | 'schedule'>
);

export type CreateReminderMutationVariables = Exact<{
  title: Scalars['String'];
  schedule: Scalars['String'];
}>;


export type CreateReminderMutation = (
  { __typename?: 'Mutation' }
  & { createReminder?: Maybe<(
    { __typename?: 'Reminder' }
    & ReminderPartFragment
  )> }
);

export type RemindersQueryVariables = Exact<{ [key: string]: never; }>;


export type RemindersQuery = (
  { __typename?: 'Query' }
  & { reminders?: Maybe<Array<Maybe<(
    { __typename?: 'Reminder' }
    & ReminderPartFragment
  )>>> }
);

export const UserPartFragmentDoc = gql`
    fragment UserPart on User {
  id
  name
  email
}
    `;
export const ReminderPartFragmentDoc = gql`
    fragment ReminderPart on Reminder {
  id
  title
  schedule
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    rawToken {
      id
      name
      email
    }
    token
  }
}
    `;
export const RegisterDocument = gql`
    mutation register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    ...UserPart
  }
}
    ${UserPartFragmentDoc}`;
export const CreateReminderDocument = gql`
    mutation createReminder($title: String!, $schedule: String!) {
  createReminder(title: $title, schedule: $schedule) {
    ...ReminderPart
  }
}
    ${ReminderPartFragmentDoc}`;
export const RemindersDocument = gql`
    query reminders {
  reminders {
    ...ReminderPart
  }
}
    ${ReminderPartFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(LoginDocument, variables, requestHeaders));
    },
    register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper(() => client.request<RegisterMutation>(RegisterDocument, variables, requestHeaders));
    },
    createReminder(variables: CreateReminderMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateReminderMutation> {
      return withWrapper(() => client.request<CreateReminderMutation>(CreateReminderDocument, variables, requestHeaders));
    },
    reminders(variables?: RemindersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemindersQuery> {
      return withWrapper(() => client.request<RemindersQuery>(RemindersDocument, variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;