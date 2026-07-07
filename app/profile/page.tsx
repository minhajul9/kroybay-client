import React, { Suspense } from 'react'
import { LoadingOverlay } from '@/components/custom/LoadingOverlay/LoadingOverlay'
import ProfileComponent from './ProfileEdit'

const Profile = () => {
  return (
    <Suspense fallback={<LoadingOverlay visible blur />}>
        <ProfileComponent />
    </Suspense>
  )
}

export default Profile