import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { updateFullCode } from "@/redux/slices/compilerSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const Compiler = () => {
  const { urlId } = useParams()
  const dispatch = useDispatch()

  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/load", {
        urlId: urlId
      })
      dispatch(updateFullCode(response.data.fullCode))
    } catch (error) {
     if (axios.isAxiosError(error)) {
      if (error?.response?.status === 500) {
        toast("Invalid URl, Default Code Loaded")
      }
     }
    }
  }

  useEffect(() => {
    if (urlId) {
      loadCode()
    }
  }, [urlId])

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={50} className="min-w-[350px] h-[calc(100dvh-60px)]">
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} className="min-w-[350px] h-[calc(100dvh-60px)]">
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Compiler
