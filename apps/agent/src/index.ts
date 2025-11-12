import Fastify from "fastify";
import { makeCitation } from "@personal/shared";

const app = Fastify();

app.get("/health", async () => ({ ok: true, service: "agent" }));

// ← 追加：shared の zod スキーマを利用
app.get("/shared-check", async () => {
  const c = makeCitation({ title: "Agent", url: "https://example.com" });
  return { ok: true, sample: c };
});

const port = Number(process.env.PORT ?? 8787);
app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`[agent] listening on http://localhost:${port}`);
});
