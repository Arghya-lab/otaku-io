import { Maximize } from 'lucide-react'

function MaximizeBtn() {
  return (
    <div className="w-12 h-12 cursor-pointer flex justify-center items-center rounded-[10px] opacity-65 text-slate-300  hover:bg-slate-600 hover:opacity-100 hover:text-slate-100">
      <Maximize size={24} strokeWidth={2.5} />
    </div>
  )
}

export default MaximizeBtn