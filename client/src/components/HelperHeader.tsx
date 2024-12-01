import {  Container, Copy, Download, Loader, Save} from "lucide-react"
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
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useSaveCodeMutation } from "@/redux/slices/api"



const HelperHeader = () => {
  const [shareBtn, setShareBtn] = useState<boolean>(false)
  const { urlId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [saveCode, {isLoading}] = useSaveCodeMutation()
  const currentLanguage = useSelector((store: RootState) => store.compilerSlice.currentLanguage)
  const fullCode = useSelector((store: RootState) => store.compilerSlice.fullCode)

  useEffect(() => {
    if (urlId) {
      setShareBtn(true)
    }
    else {
      setShareBtn(false)
    }
  }, [urlId])

  const handleSave = async () => {
 
    try {
      // if (isLoggedIn) {
      //   const response = await saveCode(fullCode).unwrap()
      // navigate(`/compiler/${response.url}`, { replace: true })
      // } else {
      //   toast("Please log in to save your code.");
      // }
      const response = await saveCode(fullCode).unwrap()
      navigate(`/compiler/${response.url}`, { replace: true })
    } catch (error) {
      handleError(error)
    }

  }

const handleDownload = () => {
  if (
    fullCode.html === "" &&
    fullCode.css === "" &&
    fullCode.javascript === ""
  ) {
    toast("Error: Code is Empty");
  } else {
    const htmlCode = new Blob([fullCode.html], { type: "text/html" });
    const cssCode = new Blob([fullCode.css], { type: "text/css" });
    const javascriptCode = new Blob([fullCode.javascript], {
      type: "text/javascript",
    });

    const htmlLink = document.createElement("a");
    const cssLink = document.createElement("a");
    const javascriptLink = document.createElement("a");

    htmlLink.href = URL.createObjectURL(htmlCode);
    htmlLink.download = "index.html";
    document.body.appendChild(htmlLink);

    cssLink.href = URL.createObjectURL(cssCode);
    cssLink.download = "style.css";
    document.body.appendChild(cssLink);

    javascriptLink.href = URL.createObjectURL(javascriptCode);
    javascriptLink.download = "script.js";
    document.body.appendChild(javascriptLink);

    if (fullCode.html !== "") {
      htmlLink.click();
    }
    if (fullCode.css !== "") {
      cssLink.click();
    }
    if (fullCode.javascript !== "") {
      javascriptLink.click();
    }

    document.body.removeChild(htmlLink);
    document.body.removeChild(cssLink);
    document.body.removeChild(javascriptLink);

    toast("Code Downloaded Successfully!");
  }
}

  return (
    <div className='h-[50px] flex justify-between items-center bg-background/95 p-2'>
      <div className="btn_container flex justify-between items-center gap-1">
        <Button
          variant="success"
          size="icon"
          onClick={handleSave}
          className="flex items-center justify-center gap-1"
          disabled={isLoading}
          >
          {isLoading? <Loader /> : <Save />}
        </Button>

        <Button
          variant="blue"
          size="icon"
          onClick={handleDownload}
          className="flex items-center justify-center gap-1"
          >
          <Download />
        </Button>


        {shareBtn && <Dialog>
          <DialogTrigger asChild><Button size = "icon" variant="default"><Copy /></Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-2 justify-center items-center"><Container/>Share Your Code!</DialogTitle>
              <DialogDescription className="flex flex-col gap-2">
                <div className="share_btn flex gap-2">
                  <input type="text" disabled className="w-full px-4 py-2 rounded-sm bg-slate-800 text-slate-400 select-none"
                    value={window.location.href}
                  />
                  <Button
                    variant="success"
                    onClick={() => {
                      window.navigator.clipboard.writeText(window.location.href)
                      toast("URL copied to your clipboard !")
                    }}
                  ><Copy size={12} /></Button>
                </div>
                <p className="text-center">Share code with your friends to collaborate.</p>

              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        }
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
