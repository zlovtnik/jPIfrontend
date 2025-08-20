export type DonationType = 'TITHE' | 'SPECIAL' | 'OTHER'

export interface Donation {
  id?: string
  amount: string
  donationType: DonationType
  memberId?: string | null
  isAnonymous?: boolean
  notes?: string | null
  donationDate?: string
  createdAt?: string
}
