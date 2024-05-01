"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import { themeEnum, themes } from "@/theme";
import chroma from "chroma-js";
import {
  ArrowBigDownDash,
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ArrowBigUpDash,
  Space,
} from "lucide-react";

function ShortcutsSection() {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <section className="flex flex-col gap-4 pb-16 pt-6">
      <h3 className="text-xl pb-6" style={{ color: theme.textColor }}>
        Shortcuts
      </h3>
      <div className="max-w-lg xs:pl-12">
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Toggle Play/Pause</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              <Space />( SPACE )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Full Screen</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              f
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Close Full Screen</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              <span>Esc</span>( ESCAPE )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Toggle Pip</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              p
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Toggle Mute</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              m
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Fast Forward</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              <ArrowBigRightDash />( RIGHT ARROW )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Rewind</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              <ArrowBigLeftDash />( LEFT ARROW )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Volume Up</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              <ArrowBigUpDash />( UP ARROW )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">Volume Down</p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              <ArrowBigDownDash />( DOWN ARROW )
            </div>
          </div>
        </div>
        <div className="shortcut-container">
          <p className="flex-grow flex-shrink basis-1/2">
            Seek to specific point in the video (7 advances to 70% of duration)
          </p>
          <div className="shortcut-btn-container">
            <div
              className="shortcut-btn"
              style={{
                backgroundColor: chroma(theme.primaryColor)
                  .darken(1)
                  .alpha(0.2)
                  .hex(),
              }}>
              0..9
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShortcutsSection;
