import { UserStateType } from '@/types'
import useSWR from 'swr'

export const useUserState = () => {
  const fallbackData: UserStateType = {
    id: 0,
    name: '',
    email: '',
    client: '',
    accessToken: '',
    isSignedIn: false,
    isFetched: false,
  }

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [UserStateType, (value: UserStateType) => void]
}

 export const useSnackbarState = () => {
   type snackbarStateType = {
     message: null | string
     severity: null | 'success' | 'error'
     pathname: null | string
   }

   const fallbackData: snackbarStateType = {
     message: null,
     severity: null,
     pathname: null,
   }
   const { data: state, mutate: setState } = useSWR('snackbar', null, {
     fallbackData: fallbackData,
   })
   return [state, setState] as [
     snackbarStateType,
     (value: snackbarStateType) => void,
   ]
 }