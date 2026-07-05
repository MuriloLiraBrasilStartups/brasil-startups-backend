import { AppError } from '../../shared/errors/app-error'
import { getPagination, getPaginationMeta } from '../../utils/pagination'
import { UserRepository } from './user.repository'
import type { CreateUserInput, ListUsersQuery } from './user.schemas'

export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async listUsers(query: ListUsersQuery) {
    const pagination = getPagination(query)
    const [users, total] = await Promise.all([
      this.userRepository.findMany(pagination),
      this.userRepository.count(),
    ])

    return {
      users,
      meta: getPaginationMeta(total, query),
    }
  }

  async createUser(data: CreateUserInput) {
    const userWithSameEmail = await this.userRepository.findByEmail(data.email)

    if (userWithSameEmail) {
      throw new AppError('User already exists', 409)
    }

    return this.userRepository.create(data)
  }
}
