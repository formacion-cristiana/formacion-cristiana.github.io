// prerender/prerender.js
import fs from "fs/promises";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import AppServer from "./AppServer.js"; // rename .jsx → .js
import { qIds } from "../src/data/quizInfo.js";

// site URL for absolute OG links (adjust for GitHub Pages)
const SITE_URL = "https://formacion-cristiana.github.io";

/**
 * Node-friendly prerender function
 * data: { url?: string }
 */
export async function prerender(data) {
  const url = data?.url || "/";

  // Home page
  if (url === "/" || url === "/index.html") {
    const links = new Set(qIds.map((id) => `/quizzes/${id}`));

    const html = renderToString(
      React.createElement(AppServer, { url })
    );

    return {
      html: `<div id="root">${html}</div>`,
      links,
      head: {
        title: "FC",
        elements: new Set([
          { type: "meta", props: { name: "description", content: "Preguntas para repasar lo estudiado." } },
          { type: "meta", props: { property: "og:title", content: "FC" } },
          { type: "meta", props: { property: "og:description", content: "Preguntas para repasar lo estudiado." } },
          { type: "meta", props: { property: "og:image", content: `${SITE_URL}/logo-titulo.png` } },
        ]),
      },
    };
  }

  // Quiz pages
  if (url.startsWith("/quizzes/")) {
    const id = url.split("/").pop();
    try {
      const jsonPath = path.resolve(process.cwd(), "public", "quizzes", `${id}.json`);
      const raw = await fs.readFile(jsonPath, "utf-8");
      const quiz = JSON.parse(raw);

      const html = renderToString(
        React.createElement(AppServer, { url })
      );

      return {
        html: `<div id="root">${html}</div>`,
        head: {
          title: quiz.title || `Quiz ${id}`,
          elements: new Set([
            { type: "meta", props: { name: "description", content: `Preguntas del quiz: ${quiz.title || ""}` } },
            { type: "meta", props: { property: "og:title", content: quiz.title || "" } },
            { type: "meta", props: { property: "og:description", content: quiz.comment || "" } },
            { type: "meta", props: { property: "og:image", content: `${SITE_URL}/logo-titulo.png` } },
            { type: "meta", props: { property: "og:type", content: "article" } },
            { type: "meta", props: { property: "og:url", content: `${SITE_URL}${url}` } },
          ]),
        },
      };
    } catch (err) {
      console.error("Failed to prerender quiz", id, err);
      return { html: '<div id="root"></div>' };
    }
  }

  // fallback
  const html = renderToString(
    React.createElement(AppServer, { url })
  );
  return { html: `<div id="root">${html}</div>` };
}
