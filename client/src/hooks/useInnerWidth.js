
import { useState } from "react";
import useEventListener from "./useEventListener";

export default function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEventListener("resize", () => {
        setWidth(window.innerWidth)
      })

    return width;
}