import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Trash2 } from "lucide-react"
import { useDeleteCodeMutation } from "@/redux/slices/api"


const CodeItem = ({data}: {data: codeType}) => {
  const [deleteCode] = useDeleteCodeMutation()
  const handleDelete = async() => {
     const response = await deleteCode(data._id!)
     console.log(response);
     
  }
  return (
    <div className="p-3 rounded cursor-pointer bg-slate-900 flex justify-start items-center flex-col gap-3">
      <div className="__top flex justify-center items-center gap-3 w-full">
    <p className="font-mono font-bold text-lg">{data.title}</p>
    </div>
    <Separator/>
    <div className="flex gap-2">
    <Link target="_blank" to={`/compiler/${data._id}`}>
          <Button variant="secondary">Open</Button>
        </Link>
        <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="p-3">
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Trash2 />
                  Delete Code confirmation!
                </DialogTitle>
                <div className="__url flex justify-center items-center flex-col gap-1">
                  <p className="text-neutral-700">
                    Are you sure, that you want to delete this code, this action
                    is not reversible.
                  </p>
                  <Button
                    variant="destructive"
                    className="h-full"
                    onClick={handleDelete}
                  >
                    Confirm Delete
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </div>
    </div>
  )
}

export default CodeItem
