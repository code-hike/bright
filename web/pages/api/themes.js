import { NextResponse } from "next/server";
import { fetchLabels } from "../../src/theme-fetcher";

export default async (req) => {
  const x = await getLabels();
  return NextResponse.json(x);
};

export const config = {
  runtime: "experimental-edge",
};

async function getLabels() {
  // from https://github.com/microsoft/vscode/blob/12ae331012923024bedaf873ba4259a8c64db020/src/vs/platform/extensionManagement/common/extensionGalleryService.ts
  const resp = await fetch(
    "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
    {
      method: "POST",
      body: JSON.stringify({
        assetTypes: [],
        flags: 0,
        filters: [
          {
            criteria: [
              {
                filterType: 8,
                value: "Microsoft.VisualStudio.Code",
              },
              {
                filterType: 5,
                value: "Themes",
              },
            ],
            pageNumber: 1,
            pageSize: 100,
            sortBy: 0,
            sortOrder: 0,
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
        accept: "application/json;api-version=3.0-preview.1",
      },
    }
  );

  const { results } = await resp.json();
  const themes = [];

  for (const ext of results[0].extensions) {
    const id = ext.publisher.publisherName + "." + ext.extensionName;
    console.log(id);
    const labels = await fetchLabels(id);
    if (labels && labels.length) {
      themes.push({
        extensionId: id,
        lastUpdated: ext.lastUpdated,
        labels,
      });
    }
  }

  const labels = [];
  for (const theme of themes) {
    for (const label of theme.labels) {
      labels.push({
        extensionId: theme.extensionId,
        label: label.label,
        parent: label.uiTheme,
      });
    }
  }

  return { themes, labels };
}
