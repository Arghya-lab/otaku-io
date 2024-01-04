import { ChevronLeft } from 'lucide-react'

function BackBtn() {
  return (
    <div className="w-12 h-12 cursor-pointer flex justify-center items-center rounded-[10px] opacity-65 text-slate-300  hover:bg-slate-600 hover:opacity-100 hover:text-slate-100">
      <ChevronLeft size={24} strokeWidth={2.5} />
    </div>
  )
}

export default BackBtn