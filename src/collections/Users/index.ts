import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { isAdmin, isAdminField } from '@/access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => Boolean(user?.role?.includes('admin')),
    create: anyone,
    delete: isAdmin,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'role'],
    useAsTitle: 'firstName',
  },
  auth: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Uppgradera automatiskt till athlete om profilfält är ifyllda
        if (data.role === 'admin') return data

        const hasAthleteProfile = data.dateOfBirth && data.gender && data.nationality

        if (hasAthleteProfile && data.role !== 'athlete') {
          data.role = 'athlete'
        }

        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Konto',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'firstName',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'lastName',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'personnummer',
              type: 'text',
              admin: {
                description: 'Platshållare för BankID — används i fas 2',
              },
            },
            {
              name: 'profileImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Idrottsprofil',
          description: 'Fyll i din idrottsprofil för att anmäla dig till event.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'dateOfBirth',
                  type: 'date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'dayOnly' },
                    description: 'Krävs för anmälan till event',
                  },
                },
                {
                  name: 'gender',
                  type: 'select',
                  options: [
                    { label: 'Man', value: 'male' },
                    { label: 'Kvinna', value: 'female' },
                    { label: 'Annat', value: 'other' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'nationality',
              type: 'text',
              admin: {
                description: 'T.ex. Sverige, Norge',
              },
            },
            {
              name: 'club',
              type: 'text',
              admin: {
                description: 'Frivilligt — idrottsklubb eller förening',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'emergencyContact',
                  type: 'text',
                  label: 'Anhörigs namn',
                  admin: { width: '50%' },
                },
                {
                  name: 'emergencyPhone',
                  type: 'text',
                  label: 'Anhörigs telefon',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Användare', value: 'user' },
        { label: 'Athlet', value: 'athlete' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'user',
      required: true,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      admin: {
        position: 'sidebar',
        description: 'Sätts automatiskt till "Athlet" när idrottsprofilen är ifylld.',
      },
    },
  ],
  timestamps: true,
}
