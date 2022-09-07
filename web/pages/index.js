export async function getStaticProps() {
  const { labels } = require("../data/themes.json");
  return {
    props: {
      labels: labels.map((x) => x.label),
    },
  };
}

export default function Page({ labels }) {
  return (
    <div>
      {" "}
      See{" "}
      <a href="https://github.com/code-hike/bright">
        https://github.com/code-hike/bright
      </a>
      <hr />
      Included themes:
      <ul>
        {labels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </div>
  );
}
