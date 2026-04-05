import { Access, FieldAccess } from 'payload'

export const isSelfOrAdmin: Access = ({ req: { user }, id }) => {
  if (user?.role?.includes('admin')) return true
  return user?.id === id
}

export const isSelfOrAdminField: FieldAccess = ({ req: { user }, id }) => {
  if (user?.role?.includes('admin')) return true
  return user?.id === id
}
