import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

function GooeyTextDemo() {
  return (
    <div className="h-[100px] flex items-center justify-center">
      <GooeyText
        texts={["Python", "Java", "C++", "VBScript", "Lua", "Html", "CSS", "TypeScript", "React Native", "React", "Teamcenter", "Hyprland", "Arch Linux", "Windows"]}
        morphTime={1}
        cooldownTime={0.5}
        className="font-bold"
      />
    </div>
  );
}

export { GooeyTextDemo };
