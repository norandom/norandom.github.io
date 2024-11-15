import { QuartzComponentProps } from "./types";

const ObsidianPropertyTableComponent = (props: QuartzComponentProps) => {
  const { fileData } = props;
  const { frontmatter } = fileData || {};

  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return null;
  }

  const displayValue = (value: any): string => {
    return value === undefined || value === null || value === "" ? "-" : String(value);
  };

  return (
    <div className="properties-table">
      <h3 className="properties-heading">Properties</h3>
      <div className="properties-container">
        {Object.entries({
          title: frontmatter.title,
          source: frontmatter.source,
          author: frontmatter.author,
          published: frontmatter.published,
          created: frontmatter.created,
          description: frontmatter.description,
          tags: frontmatter.tags,
        }).map(([key, value]) => (
          <div key={key} className="property-row">
            <div className="property-key">
              <span className="property-icon">
                {key === "tags"
                  ? "🏷️"
                  : key === "created"
                  ? "📅"
                  : key === "title"
                  ? "📝"
                  : key === "source"
                  ? "🔗"
                  : key === "author"
                  ? "👤"
                  : key === "published"
                  ? "📢"
                  : key === "description"
                  ? "📋"
                  : "≡"}
              </span>
              {key}
            </div>
            <div className="property-value">{displayValue(value)}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .properties-table {
          margin: 1rem 0 2rem 0;
          padding: 1.5rem;
          background: var(--bg);
          border: 1px solid var(--lightgray);
          border-radius: 8px;
        }

        .properties-heading {
          color: var(--dark);
          font-size: 1.2rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .properties-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .property-row {
          display: flex;
          padding: 0.25rem 0;
          gap: 1.5rem;
          align-items: flex-start;
          line-height: 1.5;
        }

        .property-key {
          flex: 0 0 150px;
          color: var(--gray);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .property-icon {
          opacity: 0.8;
          font-size: 1.1em;
        }

        .property-value {
          flex: 1;
          color: var(--dark);
        }

        .external-link {
          color: var(--secondary);
          text-decoration: none;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .external-link:hover {
          text-decoration: underline;
        }

        .tag-item {
          display: inline-block;
          padding: 0.1em 0.4em;
          margin: 0 0.2em;
          background: var(--lightgray);
          border-radius: 4px;
          font-size: 0.9em;
        }

        @media (prefers-color-scheme: dark) {
          .properties-table {
            border-color: var(--darkgray);
          }

          .property-value {
            color: var(--light);
          }

          .external-link {
            color: var(--secondary);
          }
        }
      `}</style>
    </div>
  );
};

export default ObsidianPropertyTableComponent;
