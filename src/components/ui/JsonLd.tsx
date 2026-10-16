type JsonLdProps = {
  /** One graph object, or several to emit as separate script tags. */
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * Emits structured data. Server-rendered, so crawlers see it in the HTML.
 *
 * `</` is escaped rather than the whole string: JSON.stringify already
 * produces valid JSON, and the only sequence that could break out of a script
 * element is a closing tag.
 */
export function JsonLd({ schema }: JsonLdProps) {
  const graphs = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {graphs.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
