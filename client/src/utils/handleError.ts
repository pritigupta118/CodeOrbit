import { toast } from 'sonner';

export const handleError = (error: any) => {
 toast("Error: " + error.data.message)
}

export default handleError
