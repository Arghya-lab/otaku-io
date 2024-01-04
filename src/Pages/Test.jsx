import chroma from "chroma-js";
import { shade } from "../utils/color"


function Test() {
  const color = "#bbd6f1"
  console.log(shade(color, 50));
  return (
    <div className="m-24">
    <div className="flex flex-wrap gap-2">
      <div className="w-20 h-20" style={{backgroundColor: shade(color, -4)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, -3)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, -2)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, -1)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 0)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 1)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 2)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 3)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 4)}}></div>
    </div>
      
    <div className="flex flex-wrap gap-2">
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(-4)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(-3)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(-2)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(-1)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(0)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(1)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(2)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(3)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: chroma(color).darken(4)}}></div>
    </div>

      {/* <div className="w-20 h-20" style={{backgroundColor: shade(color, 50)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 100)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 200)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 300)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 400)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 500)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 600)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 700)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 800)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 900)}}></div>
      <div className="w-20 h-20" style={{backgroundColor: shade(color, 950)}}></div> */}
    </div>
  )
}

export default Test