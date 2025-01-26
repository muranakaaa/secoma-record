"use client"
import { useSnackbarState } from '@/app/hooks/useGlobalState';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const SuccessSnackbar = () => {
  const [snackbar, setSnackbar] = useSnackbarState()
  const { toast } = useToast()

useEffect(() => {
  if (snackbar.severity != null) {
    toast({
      title: snackbar.severity === 'success' ? '成功しました' : '通知',
      description: snackbar.message,
      variant: snackbar.severity === 'success' ? 'default' : 'destructive',
    });

    setSnackbar({ message: null, severity: null, pathname: null });
  }
}, [snackbar, toast, setSnackbar]);

  return null
}

export default SuccessSnackbar
