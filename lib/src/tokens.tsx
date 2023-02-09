import { Token, TokenGroup, Tokens } from "@code-hike/lighter"
import { BrightProps } from "./types"

export function TokensRenderer({
  tokens,
  brightProps,
}: {
  tokens: Tokens
  brightProps: BrightProps
}) {
  return (
    <>
      {tokens.map((token, i) =>
        "content" in token ? (
          <TokenRenderer key={i} token={token} brightProps={brightProps} />
        ) : (
          <TokenGroupRenderer
            key={i}
            tokens={token}
            brightProps={brightProps}
          />
        )
      )}
    </>
  )
}

function TokenGroupRenderer({
  tokens,
  brightProps,
}: {
  tokens: TokenGroup
  brightProps: BrightProps
}) {
  const { extensions } = brightProps
  const extension = extensions[tokens.annotationName]
  const Wrapper = extension?.InlineAnnotation
  if (!Wrapper) {
    return <TokensRenderer tokens={tokens.tokens} brightProps={brightProps} />
  }
  return (
    <Wrapper
      query={tokens.annotationQuery}
      tokens={tokens.tokens}
      brightProps={brightProps}
    >
      <TokensRenderer tokens={tokens.tokens} brightProps={brightProps} />
    </Wrapper>
  )
}

function TokenRenderer({
  token,
  brightProps,
}: {
  token: Token
  brightProps: BrightProps
}) {
  return <span style={token.style}>{token.content}</span>
}

export function tokensToTokenList(tokens: Tokens): Token[] {
  return tokens
    .map((token) => {
      if ("content" in token) {
        return token
      } else {
        return tokensToTokenList(token.tokens)
      }
    })
    .flat()
}

export function tokensToContent(tokens: Tokens): string {
  return tokens
    .map((token) => {
      if ("content" in token) {
        return token.content
      } else {
        return tokensToContent(token.tokens)
      }
    })
    .join("")
}
