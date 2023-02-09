"use client"

import React from "react"

export function Tabs({ children }) {
  const [currentTab, setCurrentTab] = React.useState(0)
  const filenames = Object.keys(children)
  const currentTitle = filenames[currentTab]
  const currentContent = children[currentTitle]

  return (
    <div>
      <ul>
        {filenames.map((title, index) => (
          <li key={index}>
            <button onClick={() => setCurrentTab(index)}>{title}</button>
          </li>
        ))}
      </ul>
      <div>{currentContent}</div>
    </div>
  )

  // const titles = []
  // return (
  //   <Tabs.Root>
  //     <Tabs.List>
  //       {titles.map((title, index) => () => (
  //         <Tabs.Trigger key={index} value={title}>
  //           {title}
  //         </Tabs.Trigger>
  //       ))}
  //     </Tabs.List>
  //     {titles.map((title, index) => () => (
  //       <Tabs.Content key={index} value={title}>
  //         {title}
  //       </Tabs.Content>
  //     ))}
  //   </Tabs.Root>
  // )
}
