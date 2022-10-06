import { highlight, Code } from "bright"

// Code.api = "http://localhost:3000/api"

// todo  runtime: "experimental-edge"

export default async (req, res) => {
  const { code, lang, theme } = req.query
  try {
    const response = highlight(code, lang, theme)
    res.status(200).json(response)
  } catch (promise) {
    if (promise.then) {
      promise.then(() => {
        const response = highlight(code, lang, theme)
        res.status(200).json(response)
      })
    } else {
      console.log(promise)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
