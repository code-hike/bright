import { Pre } from "./code"
import { BrightComponents } from "./types"

const components: BrightComponents = {
  RootComponent: ({ brightProps, ...props }) => <div {...props} />,
  PreComponent: ({ brightProps, ...props }) => <Pre {...brightProps} />,
  TitleComponent: ({ brightProps, ...props }) => <div {...props} />,
  TabComponent: ({ brightProps, ...props }) => <code {...props} />,
}

export default components
