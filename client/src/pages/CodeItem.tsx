import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"


const CodeItem = ({data}: {data: codeType}) => {
  return (
    <div className="p-3 rounded cursor-pointer bg-slate-900 flex justify-start items-center flex-col gap-3">
      <div className="__top flex justify-start items-start gap-3 w-full">
    <p className="font-mono font-bold text-lg text-center">{data.title}</p>
    </div>
    <Separator/>
    <div>
    <Link target="_blank" to={`/compiler/${data._id}`}>
          <Button variant="secondary">Open Code</Button>
        </Link>
    </div>
    </div>
  )
}

export default CodeItem
