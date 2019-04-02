import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';

import { Table } from './permissions.styles';

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const QUERY_ALL_USERS = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const QUERY_PERMISSIONS = gql`
  query {
    __type(name: "Permission") {
      name
      enumValues {
        name
      }
    }
  }
`;

const queryPermissions = ({ render }) => (
  <Query query={QUERY_PERMISSIONS}>
    {(query, data) => render({ query, data })}
  </Query>
);

const queryUsers = ({ render }) => (
  <Query query={QUERY_ALL_USERS}>
    {(query, data) => render({ query, data })}
  </Query>
);

const mutationPermissions = ({ render, permissions, userId }) => (
  <Mutation
    mutation={UPDATE_PERMISSIONS_MUTATION}
    variables={{ permissions, userId }}>
    {(mutation, data) => render({ mutation, data })}
  </Mutation>
);


const Composed = adopt({
  queryPermissions,
  queryUsers,
  mutationPermissions,
});

const Permissions = props => (
  <Composed>
    {({ queryPermissions, queryUsers }) => {
      return (
        <div>
          <h2>Manage User Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {queryPermissions.query.data.__type.enumValues.map(permission => <th key={permission.name}>{permission.name}</th>)}
                <th>👇🏻</th>
              </tr>
            </thead>
            <tbody>{queryUsers.query.data.users.map(user => <UserPermissions user={user} key={user.id} />)}</tbody>
          </Table>
        </div>
      )
    }}
  </Composed>
);

class UserPermissions extends Component {
  state = {
    permissions: this.props.user.permissions,
  };
  updateUsersPermission = e => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    if(checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    this.setState({ permissions: updatedPermissions });
  }
  render() {
    const user = this.props.user;
    console.log(user);
    return (
      <Composed userId={user.id} permissions={this.state.permissions}>
        {({ queryPermissions, mutationPermissions }) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {queryPermissions.query.data.__type.enumValues.map(permission => (
              <td key={permission.name}>
                <label htmlFor={`${user.id}-permission-${permission.name}`}>
                  <input
                    id={`${user.id}-permission-${permission.name}`}
                    type="checkbox"
                    checked={this.state.permissions.includes(permission.name)}
                    value={permission.name}
                    onChange={this.updateUsersPermission}
                  />
                </label>
              </td>
            ))}
            <td>
              <button disabled={mutationPermissions.data.loading} onClick={mutationPermissions.mutation}>
                Updat{mutationPermissions.data.loading ? 'ing' : 'e'}
              </button>
            </td>
          </tr>
        )}
      </Composed>
    );
  }
}

export default Permissions;
