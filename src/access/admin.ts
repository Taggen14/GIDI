import { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req: { user } }): boolean => {
  return Boolean(user?.role?.includes('admin'))
}

export const isAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.role?.includes('admin'))
}
