import { BrightComponents } from "./types"

const components: BrightComponents = {
  WrapperComponent: ({ brightProps, ...props }) => <div {...props} />,
  TitleComponent: ({ brightProps, ...props }) => <div {...props} />,
  TabComponent: ({ brightProps, ...props }) => <code {...props} />,
}

export default components
