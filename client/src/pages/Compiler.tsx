import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import Loading from "@/components/loader/Loading"
import RenderCode from "@/components/RenderCode"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useLoadCodeMutation } from "@/redux/slices/api"
import { updateFullCode } from "@/redux/slices/compilerSlice"
import { RootState } from "@/redux/store"
import handleError from "@/utils/handleError"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"


const Compiler = () => {
  const { urlId } = useParams()
  const [loadExistingCode, {isLoading}] = useLoadCodeMutation()
  const dispatch = useDispatch()
  const windowWidth = useSelector((store: RootState)=> store.appSlice.windowWidth)

  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({urlId}).unwrap()
        dispatch(updateFullCode(response.fullCode))
      }

    } catch (error) {
     handleError(error)
    }
  }

  useEffect(() => {
    if (urlId) {
      loadCode()
    }
  }, [urlId])

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
      <Loading/>
      </div>
    )
  }

  return (
    <ResizablePanelGroup
    direction={windowWidth > 640 ? "horizontal" : "vertical"}
       className="w-full !h-[calc(100vh-60px)]"
    >
      <ResizablePanel defaultSize={50} className="!h-[calc(100vh-60px)]">
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
