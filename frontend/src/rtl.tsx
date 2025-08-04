import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"
import rtlPlugin from "stylis-plugin-rtl"


// Create rtl cache
const CacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
})

// Create ltr cache
const CacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
})

export function DirectionalProvider(props: {
  children?: React.ReactNode | undefined
  direction: "rtl" | "ltr"
}) {
  const cache = props.direction === "rtl" ? CacheRtl : CacheLtr
  return <CacheProvider value={cache}>{props.children}</CacheProvider>
}
