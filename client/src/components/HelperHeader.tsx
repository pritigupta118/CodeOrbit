import { Download, Loader, Share2 } from "lucide-react"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { compilerStateType, updateCurrentLanguage } from "@/redux/slices/compilerSlice"
import { RootState } from "@/redux/store"
import handleError from "@/utils/handleError"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const HelperHeader = () => {
  const [saveLoading, setSaveLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentLanguage = useSelector((store: RootState) => store.compilerSlice.currentLanguage)
  const fullCode = useSelector((store: RootState) => store.compilerSlice.fullCode)
  const handleSave = async () => {
    setSaveLoading(true)
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode: fullCode
      })
      navigate(`/compiler/${response.data.url}`, { replace: true })
    } catch (error) {
      handleError(error)
    }
    finally {
      setSaveLoading(false)
    }
  }

  return (
    <div className='h-[50px] flex justify-between items-center bg-background/95 p-2'>
      <div className="btn_container flex justify-between items-center gap-1">
        <Button
          variant="success"
          onClick={handleSave}
          className="flex items-center justify-center gap-1">
          {saveLoading ? <Loader/> : <Download />}
        </Button>
        <Button variant='default' className="flex items-center justify-center gap-1"><Share2 />Share</Button>
      </div>
      <div className="tab_container">
        <Select defaultValue={currentLanguage} onValueChange={(value) => dispatch(updateCurrentLanguage(value as compilerStateType["currentLanguage"]))}>
          <SelectTrigger className="w-[180px] outline-none focus:ring-0 bg-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default HelperHeader
