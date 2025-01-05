import { hash, verify } from '@node-rs/argon2'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './db/prisma'

const opts = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    password: {
      hash: async (password) => {
        return hash(password, opts)
      },
      verify: async (data) => {
        return verify(data.hash, data.password, opts)
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days,
  },
  advanced: {
    generateId: false,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        fieldName: 'role',
      },
      address: {
        type: 'string',
        fieldName: 'address',
        input: false,
        returned: false,
      },
      paymentMethod: {
        type: 'string',
        fieldName: 'paymentMethod',
        input: false,
        returned: false,
      },
    },
  },
})
