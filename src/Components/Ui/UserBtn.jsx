import { UserRound } from "lucide-react";

function UserBtn() {
  return (
    <div className="w-12 h-12 cursor-pointer flex justify-center items-center rounded-[10px] opacity-65 text-slate-300  bg-white bg-opacity-0 hover:bg-opacity-10 hover:opacity-100 hover:text-slate-100">
      <UserRound size={24} strokeWidth={2.5} />
    </div>
  );
}

export default UserBtn;
