import { highlight } from "bright"

export default async (req, res) => {
  const { code, lang, theme } = req.query
  try {
    const response = highlight(code, lang, theme)
    res.status(200).json(response)
  } catch (promise) {
    console.log(promise)
    promise.then(() => {
      const response = highlight(code, lang, theme)
      res.status(200).json(response)
    })
  }
}
