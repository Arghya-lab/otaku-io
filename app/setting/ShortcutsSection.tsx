"use client";

import {
  ArrowBigDownDash,
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ArrowBigUpDash,
  Space,
} from "lucide-react";

function ShortcutsSection() {
  return (
    <section className="flex flex-col gap-4 pb-16 pt-6">
      <h3 className="pb-6 text-xl">Shortcuts</h3>
      <div className="max-w-lg xs:pl-12">
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Toggle Play/Pause</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">
              <Space />( SPACE )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Full Screen</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">f</div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Close Full Screen</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">
              <span>Esc</span>( ESCAPE )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Toggle Pip</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">p</div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Toggle Mute</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">m</div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Fast Forward</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">
              <ArrowBigRightDash />( RIGHT ARROW )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Rewind</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">
              <ArrowBigLeftDash />( LEFT ARROW )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Volume Up</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">
              <ArrowBigUpDash />( UP ARROW )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">Volume Down</p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">
              <ArrowBigDownDash />( DOWN ARROW )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-shrink flex-grow basis-1/2">
            Seek to specific point in the video (7 advances to 70% of duration)
          </p>
          <div className="shortcut-btn-container">
            <div className="shortcut-btn bg-muted">0..9</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShortcutsSection;
