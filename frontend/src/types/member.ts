export interface Member {
  id?: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string | null
  dateOfBirth?: string | null
  address?: string | null
  membershipDate?: string | null
  baptismDate?: string | null
  isActive?: boolean
  familyId?: number | null
  userId?: string | null
  createdAt?: string
  updatedAt?: string | null
}
